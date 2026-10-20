export type Language = 'en' | 'pt-BR';
type Translation = Record<Language, string>;
interface Contact {
  id: string;
  name: string;
  href: string;
  description: Translation;
}
export const profile = {
  name: 'Gabriel de Souza Lima',
  initials: 'GL',
  photo: '/images/profile.jpg',
  role: { en: 'AI Engineer · Researcher', 'pt-BR': 'Engenheiro de IA · Pesquisador' } satisfies Translation,
};
export const copy = {
  en: {
    language: 'Page language', contacts: 'Contact and research profiles',
    photo: 'Portrait of Gabriel de Souza Lima', initials: 'Gabriel de Souza Lima, initials GL',
    outgoing: 'Visit profile', description: 'Gabriel de Souza Lima · AI Engineer · Researcher. Find my social and research profiles.',
  },
  'pt-BR': {
    language: 'Idioma da página', contacts: 'Perfis de contato e pesquisa',
    photo: 'Foto de Gabriel de Souza Lima', initials: 'Gabriel de Souza Lima, iniciais GL',
    outgoing: 'Visitar perfil', description: 'Gabriel de Souza Lima · Engenheiro de IA · Pesquisador. Encontre meus perfis sociais e de pesquisa.',
  },
};
export const contacts: Contact[] = [
  { id: 'linkedin', name: 'LinkedIn', href: 'https://www.linkedin.com/in/souzalimagabriel/', description: { en: 'Professional connections', 'pt-BR': 'Conexões profissionais' } },
  { id: 'instagram', name: 'Instagram', href: 'https://www.instagram.com/gaabriiel_lima/', description: { en: 'A little beyond work', 'pt-BR': 'Um pouco além do trabalho' } },
  { id: 'x', name: 'X / Twitter', href: 'https://x.com/gaabriiel_lima', description: { en: 'Posts and conversations', 'pt-BR': 'Publicações e conversas' } },
  { id: 'github', name: 'GitHub', href: 'https://github.com/limagabri', description: { en: 'Code and open source', 'pt-BR': 'Código e open source' } },
  { id: 'orcid', name: 'ORCID', href: 'https://orcid.org/0009-0006-0744-313X', description: { en: 'Research identity', 'pt-BR': 'Identidade de pesquisa' } },
  { id: 'lattes', name: 'Lattes', href: 'http://lattes.cnpq.br/6277280010932061', description: { en: 'Academic background', 'pt-BR': 'Trajetória acadêmica' } },
];
