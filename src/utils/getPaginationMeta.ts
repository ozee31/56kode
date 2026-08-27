/**
 * Titre et description propres à une page de pagination.
 *
 * Sans ça, les 15 pages de la tech watch, les 7 de l'AI Radar et les 4 de la
 * liste d'articles partagent mot pour mot leur `<title>` et leur description —
 * indiscernables dans les résultats de recherche comme dans la Search Console.
 *
 * La page 1 ne reçoit rien : elle est la page de base, son titre doit rester
 * celui de la rubrique.
 */
export interface PaginationMeta {
  titleSuffix: string;
  descSuffix: string;
}

export default function getPaginationMeta(
  currentPage: number,
  totalPages: number
): PaginationMeta {
  if (currentPage <= 1) return { titleSuffix: "", descSuffix: "" };

  return {
    titleSuffix: ` — page ${currentPage}`,
    descSuffix: ` Page ${currentPage} of ${totalPages}.`,
  };
}
