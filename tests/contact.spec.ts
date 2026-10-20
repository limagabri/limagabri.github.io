import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const destinations = [
  'https://www.linkedin.com/in/souzalimagabriel/',
  'https://www.instagram.com/gaabriiel_lima/',
  'https://x.com/gaabriiel_lima',
  'https://github.com/limagabri',
  'https://orcid.org/0009-0006-0744-313X',
  'http://lattes.cnpq.br/6277280010932061',
];
const brands = ['LinkedIn', 'Instagram', 'X / Twitter', 'GitHub', 'ORCID', 'Lattes'];

test('approved destinations, order, native navigation and local icons', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Gabriel de Souza Lima');
  const links = page.getByRole('navigation').getByRole('link');
  await expect(links).toHaveCount(6);
  for (let i = 0; i < 6; i++) {
    await expect(links.nth(i)).toHaveAttribute('href', destinations[i]);
    await expect(links.nth(i)).toContainText(brands[i]);
    const icon = links.nth(i).locator('img');
    expect(await icon.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBeTruthy();
  }
  await page.route(destinations[3], route => route.fulfill({ contentType: 'text/html', body: '<h1>Destination reached</h1>' }));
  await links.nth(3).click();
  await expect(page).toHaveURL(destinations[3]);
  await expect(page.getByRole('heading')).toHaveText('Destination reached');
});

test('Portuguese selection translates interface and every fresh load resets to English', async ({ browser }) => {
  const context = await browser.newContext({ locale: 'pt-BR' });
  await context.addInitScript(() => { localStorage.setItem('language', 'pt-BR'); sessionStorage.setItem('language', 'pt-BR'); });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByText('AI Engineer · Researcher', { exact: true })).toBeVisible();
  await page.evaluate(() => { localStorage.clear(); sessionStorage.clear(); });
  await page.getByRole('button', { name: 'Português' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
  await expect(page.getByText('Engenheiro de IA · Pesquisador')).toBeVisible();
  await expect(page.getByRole('group', { name: 'Idioma da página' })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Perfis de contato e pesquisa' })).toBeVisible();
  for (const text of ['Conexões profissionais', 'Um pouco além do trabalho', 'Publicações e conversas', 'Código e open source', 'Identidade de pesquisa', 'Trajetória acadêmica']) {
    await expect(page.getByText(text, { exact: true })).toBeVisible();
  }
  await expect(page.getByRole('link').first()).toHaveAccessibleName(/Visitar perfil/);
  await expect(page.getByRole('button', { name: 'Português' })).toHaveAttribute('aria-pressed', 'true');
  expect(await page.evaluate(() => [localStorage.length, sessionStorage.length, document.cookie])).toEqual([0, 0, '']);
  expect(await page.locator('meta[name="description"]').getAttribute('content')).toContain('Engenheiro de IA');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('button', { name: 'English' })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Português' }).click();
  const newPage = await context.newPage();
  await newPage.goto('/');
  await expect(newPage.locator('html')).toHaveAttribute('lang', 'en');
  await context.close();
});

test('missing and corrupt portrait show GL; supplied local portrait displays and translates alt', async ({ page }) => {
  await page.route('**/images/profile.jpg', route => route.fulfill({ status: 404, body: '' }));
  await page.goto('/');
  await expect(page.getByRole('img', { name: /initials GL/ })).toBeVisible();
  await expect(page.locator('img.portrait')).toHaveCount(0);
  await page.unroute('**/images/profile.jpg');
  await page.route('**/images/profile.jpg', route => route.fulfill({ contentType: 'image/jpeg', body: 'not an image' }));
  await page.reload();
  await expect(page.getByRole('img', { name: /initials GL/ })).toBeVisible();
  await page.unroute('**/images/profile.jpg');
  await page.route('**/images/profile.jpg', route => route.fulfill({ contentType: 'image/svg+xml', body: '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="300"><rect width="200" height="300" fill="teal"/></svg>' }));
  await page.reload();
  const portrait = page.getByRole('img', { name: 'Portrait of Gabriel de Souza Lima' });
  await expect(portrait).toBeVisible();
  await expect(portrait).toHaveCSS('object-fit', 'cover');
  await expect(page.getByText('GL', { exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: 'Português' }).click();
  await expect(page.getByRole('img', { name: 'Foto de Gabriel de Souza Lima' })).toBeVisible();
});

for (const width of [320, 375, 768, 1440]) {
  test(`responsive targets and overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    for (const language of ['English', 'Português']) {
      await page.getByRole('button', { name: language }).click();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
      for (const target of await page.locator('button, nav a').all()) {
        const box = await target.boundingBox();
        expect(box?.width).toBeGreaterThanOrEqual(44);
        expect(box?.height).toBeGreaterThanOrEqual(44);
      }
    }
    await page.screenshot({ path: `test-results/contact-${width}.png`, fullPage: true });
    await page.evaluate(() => { document.documentElement.style.zoom = '2'; });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  });
}

test('keyboard focus, reduced motion, and accessibility in both languages', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'English' })).toBeFocused();
  for (let i = 0; i < 7; i++) {
    await page.keyboard.press('Tab');
    const focused = page.locator(':focus');
    expect(await focused.evaluate(el => getComputedStyle(el).outlineStyle)).toBe('solid');
  }
  await expect(page.getByRole('link').last()).toBeFocused();
  for (const language of ['English', 'Português']) {
    await page.getByRole('button', { name: language }).click();
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(results.violations).toEqual([]);
  }
  expect(await page.locator('nav a').first().evaluate(el => getComputedStyle(el).transitionDuration)).toBe('0s');
});
