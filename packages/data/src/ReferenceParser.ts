export function parseReference(reference: string) {
  const [paper, section, paragraph] = reference.split(':').map(Number);
  return { paper, section, paragraph };
}

export function formatReference(paper: number, section: number, paragraph: number) {
  return `${paper}:${section}:${paragraph}`;
}

export function linkReference(reference: string) {
  const { paper, section, paragraph } = parseReference(reference);
  return `/reader/paper/${paper}/section/${section}/paragraph/${paragraph}`;
}
