/**
 * Barres de réception — le motif porteur de la direction 3A.
 *
 * Un seul composant pour deux usages :
 *  - la note d'une entrée AI Radar (variant "ai"), pilotée par le front-matter
 *  - l'indicateur de porteuse de la StatusBar (variant "site")
 *
 * Remplace les deux implémentations d'étoiles Unicode qui coexistaient
 * (AiRadarCard.tsx en séquences d'échappement, AiRadarDetails.astro en
 * littéraux ★/☆).
 *
 * Accessibilité — exigence explicite du stress test : la couleur seule ne doit
 * jamais porter l'information. D'où le jumeau texte visible dès 375px et le
 * `role="img"` + `aria-label` sur le graphique.
 */

/**
 * Hauteurs relatives des 5 barres, dérivées de la série 3/5/7/10/12 rendue par
 * toutes les maquettes (le design system déclare 4/6/9/12/12, mais sa propre
 * démo rend bien 3/5/7/10/12). Exprimées en ratio pour rester correctes à
 * n'importe quelle taille.
 */
const STEPS = [25, 41.667, 58.333, 83.333, 100] as const;

const SIZES = {
  sm: { height: "h-3", width: "w-[3px]", gap: "gap-[2px]", text: "text-meta" },
  md: { height: "h-5", width: "w-[5px]", gap: "gap-[3px]", text: "text-body" },
  lg: {
    height: "h-[30px]",
    width: "w-1.5",
    gap: "gap-1",
    text: "text-heading",
  },
} as const;

const TONES = {
  site: { on: "bg-signal-on", off: "bg-signal-off", value: "text-fg-muted" },
  ai: {
    on: "bg-signal-on-ai",
    off: "bg-signal-off-ai",
    value: "text-ai-muted",
  },
} as const;

export interface Props {
  /** Note à afficher. Bornée à [0, 5] et arrondie : le schema autorise `z.number()`, donc un 3.5 est possible. */
  value: number;
  variant?: keyof typeof TONES;
  size?: keyof typeof SIZES;
  /** Affiche le jumeau texte « 4/5 » à côté des barres. */
  showValue?: boolean;
  /** Libellé lu par les lecteurs d'écran. Par défaut « Signal N of 5 ». */
  label?: string;
  className?: string;
}

export default function SignalBars({
  value,
  variant = "ai",
  size = "sm",
  showValue = false,
  label,
  className = "",
}: Props) {
  const lit = Math.max(0, Math.min(STEPS.length, Math.round(value)));
  const tone = TONES[variant];
  const dims = SIZES[size];

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span
        role="img"
        aria-label={label ?? `Signal ${lit} of ${STEPS.length}`}
        className={`inline-flex items-end ${dims.height} ${dims.gap}`}
      >
        {STEPS.map((step, i) => (
          <span
            key={step}
            className={`${dims.width} ${i < lit ? tone.on : tone.off}`}
            style={{ height: `${step}%` }}
          />
        ))}
      </span>
      {showValue && (
        <span
          className={`${dims.text} ${tone.value} font-chrome`}
          aria-hidden="true"
        >
          {lit}
          <span className="opacity-60">/{STEPS.length}</span>
        </span>
      )}
    </span>
  );
}
