import { LOCALE } from "@config";

interface DatetimesProps {
  pubDatetime: string | Date;
  modDatetime?: string | Date | undefined | null;
}

interface Props extends DatetimesProps {
  /** `sm` = --text-meta (listes, cartes) · `lg` = --text-body-sm (page d'article) */
  size?: "sm" | "lg";
  tone?: "site" | "ai";
  /**
   * Le texte environnant porte déjà un libellé visible (« Published … »).
   * On supprime alors le préfixe pour lecteurs d'écran, sinon ils annoncent
   * « Published Published: 19.08.2026 » — et le copier-coller le duplique aussi.
   */
  hasVisibleLabel?: boolean;
  className?: string;
}

/**
 * Date au format chrome : `26.11.2025`, mono, majuscule, sans icône.
 *
 * L'ancienne version affichait « Nov 26, 2025 | 10:00 » précédé d'une icône
 * calendrier ; la direction 3A veut une ligne de méta nue. L'heure disparaît de
 * l'affichage mais reste dans l'attribut `datetime` en ISO, donc rien n'est
 * perdu pour les machines ni pour le SEO.
 */
export default function Datetime({
  pubDatetime,
  modDatetime,
  size = "sm",
  tone = "site",
  hasVisibleLabel = false,
  className = "",
}: Props) {
  const isUpdated = Boolean(modDatetime && modDatetime > pubDatetime);
  const value = new Date(isUpdated ? modDatetime! : pubDatetime);

  return (
    <span
      className={[
        "font-chrome tracking-chrome",
        size === "sm" ? "text-meta" : "text-body-sm",
        tone === "ai" ? "text-ai-muted" : "text-fg-muted",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {!hasVisibleLabel && (
        <span className="sr-only">
          {isUpdated ? "Updated: " : "Published: "}
        </span>
      )}
      <time dateTime={value.toISOString()}>{formatDate(value)}</time>
      {isUpdated && <span aria-hidden="true"> · UPD</span>}
    </span>
  );
}

/** `26.11.2025` — jour, mois, année zéro-paddés, séparés par des points. */
function formatDate(value: Date): string {
  const parts = new Intl.DateTimeFormat(LOCALE.langTag, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(value);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find(part => part.type === type)?.value ?? "";

  return `${get("day")}.${get("month")}.${get("year")}`;
}
