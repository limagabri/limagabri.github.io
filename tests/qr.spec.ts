import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import jsQR from 'jsqr';
import { PNG } from 'pngjs';

test.use({ locale: 'pt-BR' });
const target = 'https://limagabri.github.io/';
async function decode(page: Page) {
  const pixels = PNG.sync.read(await page.getByRole('img', { name: /QR code|Código QR/ }).screenshot());
  const result = jsQR(new Uint8ClampedArray(pixels.data), pixels.width, pixels.height);
  expect(result?.data).toBe(target);
}
async function ready(page: Page) {
  await expect(page.getByRole('status')).toHaveText('Ready offline');
  await page.waitForFunction(() => !!navigator.serviceWorker.controller);
}

test('QR pixels contain exact contact URL; photo, navigation and memory-only language work', async ({ page }) => {
  await page.goto('/qr/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Gabriel de Souza Lima');
  const photo = page.getByRole('img', { name: 'Portrait of Gabriel de Souza Lima' });
  await expect(photo).toBeVisible();
  expect(await photo.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBeTruthy();
  await decode(page);
  await expect(page.getByRole('link', { name: 'Open contacts' })).toHaveAttribute('href', '/');
  await page.getByRole('button', { name: 'Português' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
  await expect(page.getByRole('link', { name: 'Abrir contatos' })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Foto de Gabriel de Souza Lima' })).toBeVisible();
  await expect(page.getByText('Escaneie para abrir meus contatos')).toBeVisible();
  await page.getByText('Instalar no celular', { exact: true }).click();
  await expect(page.getByText(/Adicionar à Tela de Início/)).toBeVisible();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  expect(await page.evaluate(() => [localStorage.length, sessionStorage.length])).toEqual([0, 0]);
  await page.getByRole('link', { name: 'Open contacts' }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole('navigation').getByRole('link')).toHaveCount(6);
  expect(await page.evaluate(() => navigator.serviceWorker.controller)).toBeNull();
});

test('first complete online visit supports offline reload and new-tab launch with real photo and icons', async ({ context, page }) => {
  await page.goto('/qr/');
  await ready(page);
  const resources = await page.evaluate(async () => {
    const registration = await navigator.serviceWorker.getRegistration();
    const keys = (await caches.keys()).filter(key => key.startsWith('gabriel-qr-'));
    const entries = await (await caches.open(keys[0])).keys();
    return { scope: registration?.scope, urls: entries.map(request => new URL(request.url).pathname) };
  });
  expect(resources.scope).toMatch(/\/qr\/$/);
  for (const resource of ['/qr/', '/images/profile.jpg', '/qr/code.svg', '/qr/icons/icon-192.png', '/qr/icons/icon-512.png', '/qr/icons/maskable-512.png', '/qr/icons/apple-touch-icon.png', '/qr/manifest.webmanifest']) expect(resources.urls).toContain(resource);
  await context.setOffline(true);
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await ready(page);
  await decode(page);
  expect(await page.getByRole('img', { name: 'Portrait of Gabriel de Souza Lima' }).evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBeTruthy();
  for (const path of ['/qr/icons/icon-192.png', '/qr/icons/icon-512.png', '/qr/icons/maskable-512.png', '/qr/icons/apple-touch-icon.png']) {
    expect(await page.evaluate(async path => { const response = await fetch(path); return response.ok && (await response.blob()).size > 0; }, path)).toBeTruthy();
  }
  await page.getByRole('button', { name: 'Português' }).click();
  await expect(page.getByRole('status')).toHaveText('Disponível offline');
  const second = await context.newPage();
  await second.goto('/qr/?offline-check=1');
  await ready(second);
  await expect(second.locator('html')).toHaveAttribute('lang', 'en');
  await decode(second);
  expect(await second.getByRole('img', { name: 'Portrait of Gabriel de Souza Lima' }).evaluate((img: HTMLImageElement) => img.naturalWidth > 0)).toBeTruthy();
  await second.screenshot({ path: 'test-results/qr-offline.png', fullPage: true });
});

test('manifest, local icon dimensions and installation launch configuration', async ({ page, request }) => {
  await page.goto('/qr/');
  await expect(page.locator('link[rel="manifest"]')).toHaveAttribute('href', '/qr/manifest.webmanifest');
  const response = await request.get('/qr/manifest.webmanifest');
  expect(response.ok()).toBeTruthy();
  const manifest = await response.json();
  expect(manifest).toMatchObject({ id: '/qr/', start_url: '/qr/', scope: '/qr/', display: 'standalone' });
  for (const [name, size, purpose] of [['icon-192.png', 192, 'any'], ['icon-512.png', 512, 'any'], ['maskable-512.png', 512, 'maskable']] as const) {
    const src = `/qr/icons/${name}`;
    expect(manifest.icons).toContainEqual({ src, sizes: `${size}x${size}`, type: 'image/png', purpose });
    const icon = PNG.sync.read(await (await request.get(src)).body());
    expect([icon.width, icon.height]).toEqual([size, size]);
  }
  await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute('href', '/qr/icons/apple-touch-icon.png');
  const apple = PNG.sync.read(await (await request.get('/qr/icons/apple-touch-icon.png')).body());
  expect([apple.width, apple.height]).toEqual([180, 180]);
  await page.getByText('Install on your phone', { exact: true }).click();
  await expect(page.getByText(/iPhone:.*Add to Home Screen/)).toBeVisible();
  await ready(page);
  const cdp = await page.context().newCDPSession(page);
  const audit = await cdp.send('Page.getAppManifest');
  expect(audit.errors).toEqual([]);
  const installability = await cdp.send('Page.getInstallabilityErrors');
  expect(installability.installabilityErrors).toEqual([]);
  await cdp.detach();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(await page.evaluate(() => matchMedia('(display-mode: standalone)').matches)).toBe(false);
});

test('failed offline preparation is honest and retry recovers without deleting unrelated caches', async ({ context, page }) => {
  await context.route('**/images/profile.jpg', route => route.fulfill({ status: 503, body: 'not available' }));
  await page.goto('/qr/');
  await expect(page.getByRole('status')).toHaveText('Offline saving is unavailable. Connect and retry.');
  await expect(page.getByRole('img', { name: /initials GL/ })).toBeVisible();
  await page.evaluate(async () => { await caches.open('unrelated-test-cache'); });
  await context.unroute('**/images/profile.jpg');
  await page.getByRole('button', { name: 'Retry offline saving' }).click();
  await ready(page);
  expect(await page.evaluate(async () => (await caches.keys()).includes('unrelated-test-cache'))).toBeTruthy();
  await context.setOffline(true);
  await page.reload();
  await ready(page);
  await decode(page);
});

for (const width of [320, 375, 768, 1440]) {
  test(`QR mobile accessibility and layout at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/qr/');
    await ready(page);
    for (const language of ['English', 'Português']) {
      await page.getByRole('button', { name: language }).click();
      await decode(page);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
      for (const control of await page.locator('button, a, summary').all()) {
        const rect = await control.boundingBox();
        expect(rect?.width).toBeGreaterThanOrEqual(44);
        expect(rect?.height).toBeGreaterThanOrEqual(44);
      }
      const issues = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      expect(issues.violations).toEqual([]);
    }
    await page.screenshot({ path: `test-results/qr-${width}.png`, fullPage: true });
    await page.getByRole('button', { name: 'English' }).focus();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'Português' })).toBeFocused();
    expect(await page.locator(':focus').evaluate(el => getComputedStyle(el).outlineStyle)).toBe('solid');
    await page.evaluate(() => { document.documentElement.style.zoom = '2'; });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  });
}

test('worker updates wait for old QR clients and clean only prior QR cache versions', async ({ browser }) => {
  // An isolated origin serves the real built app and changes only the worker revision on demand.
  const { createServer } = await import('node:http');
  const { readFile } = await import('node:fs/promises');
  const { resolve, extname } = await import('node:path');
  let revision = 1;
  const worker = await readFile('dist/qr/sw.js', 'utf8');
  const cacheName = worker.match(/CACHE_PREFIX \+ '([^']+)'/)?.[1];
  expect(cacheName).toBeTruthy();
  const server = createServer(async (request, response) => {
    try {
      const path = new URL(request.url!, 'http://localhost').pathname;
      if (path === '/qr/sw.js') {
        response.writeHead(200, { 'Content-Type': 'text/javascript', 'Cache-Control': 'no-store' });
        response.end(revision === 1 ? worker : worker.replace(cacheName!, cacheName! + '-update-test'));
        return;
      }
      const file = path.endsWith('/') ? path + 'index.html' : path;
      const contents = await readFile(resolve('dist', '.' + file));
      const types: Record<string, string> = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png', '.webmanifest': 'application/manifest+json' };
      response.writeHead(200, { 'Content-Type': types[extname(file)] ?? 'application/octet-stream' });
      response.end(contents);
    } catch { response.writeHead(404); response.end(); }
  });
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  if (!address || typeof address === 'string') throw new Error('No update test server');
  const origin = `http://127.0.0.1:${address.port}`;
  const context = await browser.newContext();
  try {
    const page = await context.newPage();
    await page.goto(origin + '/qr/');
    await ready(page);
    await page.evaluate(async () => { await caches.open('unrelated-update-test'); });
    const activeScript = await page.evaluate(() => navigator.serviceWorker.controller?.scriptURL);
    revision = 2;
    await page.evaluate(async () => { await (await navigator.serviceWorker.getRegistration())?.update(); });
    await page.waitForFunction(async () => !!(await navigator.serviceWorker.getRegistration())?.waiting);
    expect(await page.evaluate(() => navigator.serviceWorker.controller?.scriptURL)).toBe(activeScript);
    expect(await page.evaluate(async () => (await caches.keys()).filter(key => key.startsWith('gabriel-qr-')).length)).toBe(2);
    // An out-of-scope tab keeps the origin accessible while allowing old QR clients to close.
    const root = await context.newPage();
    await root.goto(origin + '/');
    expect(await root.evaluate(() => navigator.serviceWorker.controller)).toBeNull();
    await page.close();
    await root.waitForFunction(async () => {
      const names = (await caches.keys()).filter(key => key.startsWith('gabriel-qr-'));
      return names.length === 1 && names[0].endsWith('-update-test');
    });
    expect(await root.evaluate(async () => (await caches.keys()).includes('unrelated-update-test'))).toBeTruthy();
    const updated = await context.newPage();
    await context.setOffline(true);
    await updated.goto(origin + '/qr/');
    await ready(updated);
    await decode(updated);
  } finally {
    await context.close();
    await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
  }
});

test('fixed-name photo and icon edits create new offline worker versions', async () => {
  const { mkdtemp, cp, readFile, writeFile, rm } = await import('node:fs/promises');
  const { tmpdir } = await import('node:os');
  const { resolve, join } = await import('node:path');
  const { execFile } = await import('node:child_process');
  const { promisify } = await import('node:util');
  const run = promisify(execFile);
  const temp = await mkdtemp(join(tmpdir(), 'qr-version-'));
  try {
    await cp('dist', join(temp, 'dist'), { recursive: true });
    const generator = resolve('scripts/build-qr-worker.mjs');
    const build = async () => {
      await run(process.execPath, [generator], { cwd: temp });
      return readFile(join(temp, 'dist/qr/sw.js'), 'utf8');
    };
    const original = await build();
    expect(await build()).toBe(original);
    const photoPath = join(temp, 'dist/images/profile.jpg');
    await writeFile(photoPath, Buffer.concat([await readFile(photoPath), Buffer.from('photo-edit')]));
    const photoUpdate = await build();
    expect(photoUpdate).not.toBe(original);
    const iconPath = join(temp, 'dist/qr/icons/icon-192.png');
    await writeFile(iconPath, Buffer.concat([await readFile(iconPath), Buffer.from('icon-edit')]));
    expect(await build()).not.toBe(photoUpdate);
  } finally { await rm(temp, { recursive: true, force: true }); }
});
