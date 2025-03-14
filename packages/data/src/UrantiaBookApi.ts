// packages/data/src/UrantiaBookApi.ts
export async function getPaper(paperNumber: number) {
  const paperData = await import(`../../../data/urantia-book/${paperNumber}.json`);
  return paperData;
}

export async function getParagraph(paperNumber: number, sectionNumber: number, paragraphNumber: number) {
  const paperData = await getPaper(paperNumber);
  return paperData.sections[sectionNumber - 1].paragraphs[paragraphNumber - 1];
}

export async function searchContent(query: string) {
  const allPapers = await import('../../../data/urantia-book/index.json');
  const results = allPapers.filter((paper: any) =>
    paper.title.includes(query) ||
    paper.sections.some((section: any) =>
      section.title.includes(query) ||
      section.paragraphs.some((paragraph: any) => paragraph.text.includes(query))
    )
  );
  return results;
}

// Hooks for React components
export function useUrantiaBook() {
  // Implementation of hook for accessing book content
}
