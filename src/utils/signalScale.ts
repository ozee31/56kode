/**
 * Échelle éditoriale de la note AI Radar, telle que la maquette
 * `Radar Entry Page.dc.html` la publie dans le rail « HOW I RATE ».
 *
 * Rendre l'échelle explicite est un choix du design system : la note n'est pas
 * un score abstrait mais une consigne de lecture.
 */
export interface SignalStep {
  value: number;
  label: string;
}

export const SIGNAL_SCALE: SignalStep[] = [
  { value: 5, label: "Read it tonight" },
  { value: 4, label: "Strong signal" },
  { value: 3, label: "Worth skimming" },
  { value: 2, label: "One idea, padded" },
  { value: 1, label: "Filed for the record" },
];

/**
 * Libellé correspondant à une note. Le schema autorise `z.number()` sans
 * `.int()`, donc on arrondit et on borne avant de chercher.
 */
export function signalLabel(rating: number): string {
  const value = Math.max(1, Math.min(5, Math.round(rating)));
  return SIGNAL_SCALE.find(step => step.value === value)?.label ?? "";
}
