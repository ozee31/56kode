import { CAREER_START_YEAR } from "@config";

/**
 * Ancienneté en années, calculée au build.
 *
 * Le site étant statique, la valeur est figée au moment du build — elle se met
 * donc à jour à chaque déploiement, ce qui suffit puisque la CI redéploie à
 * chaque push sur `main`.
 */
export default function getYearsOfExperience(): number {
  return new Date().getFullYear() - CAREER_START_YEAR;
}
