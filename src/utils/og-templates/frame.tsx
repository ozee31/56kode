import { OG, OG_FONT, OG_SIGNAL_STEPS } from "./palette";

/**
 * Gabarit commun des images Open Graph.
 *
 * Il transpose la page : filet phosphore à fleur du bord gauche, barre de
 * statut en haut, masthead en dégradé au centre, bande de méta en bas. Les
 * deux images du site s'en servent, ce qui leur évite de diverger comme
 * l'ancienne paire l'avait fait.
 */

const GUTTER = 56;
const BAR_HEIGHT = 76;

/** Barres de réception, mêmes proportions que `SignalBars.tsx`. */
function SignalGlyph({ value }: { value: number }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 4 }}>
      {OG_SIGNAL_STEPS.map((height, i) => (
        <div
          key={i}
          style={{
            width: 6,
            height,
            background: i < value ? OG.accent : OG.signalTrack,
          }}
        />
      ))}
    </div>
  );
}

/** Libellé de chrome : mono, capitales, interlettrage large. */
function chromeStyle(color: string, size = 22) {
  return {
    fontFamily: OG_FONT.chrome,
    fontSize: size,
    fontWeight: 500,
    letterSpacing: "0.13em",
    color,
  };
}

export interface FrameProps {
  /** Compteur ou rubrique, à gauche de la barre de statut. */
  statusLeft: string;
  /** Date ou repère, à droite de la barre de statut. */
  statusRight?: string;
  /** Barres allumées sur 5. */
  signal?: number;
  /** Auteur, temps de lecture… en bas à gauche. */
  footerLeft?: string;
  children: React.ReactNode;
}

export default function Frame({
  statusLeft,
  statusRight,
  signal = 4,
  footerLeft,
  children,
}: FrameProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: OG.canvas,
      }}
    >
      {/* Filet phosphore à fleur du bord : la signature reprise des blocs de code. */}
      <div style={{ width: 10, height: "100%", background: OG.accent }} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Barre de statut */}
        <div
          style={{
            height: BAR_HEIGHT,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: `0 ${GUTTER}px`,
            background: OG.raised,
            borderBottom: `1px solid ${OG.line}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <SignalGlyph value={signal} />
            <span style={chromeStyle(OG.textMuted)}>
              {statusLeft.toUpperCase()}
            </span>
          </div>
          {statusRight && (
            <span style={chromeStyle(OG.textMuted)}>
              {statusRight.toUpperCase()}
            </span>
          )}
        </div>

        {/* Masthead */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: `0 ${GUTTER}px`,
            background: `linear-gradient(180deg, ${OG.feature} 0%, ${OG.canvas} 100%)`,
          }}
        >
          {children}
        </div>

        {/* Bande de méta */}
        <div
          style={{
            height: BAR_HEIGHT,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: `0 ${GUTTER}px`,
            borderTop: `1px solid ${OG.line}`,
          }}
        >
          <span style={chromeStyle(OG.textMuted, 20)}>
            {(footerLeft ?? "").toUpperCase()}
          </span>
          <span style={chromeStyle(OG.accent, 20)}>56KODE.COM</span>
        </div>
      </div>
    </div>
  );
}

export { chromeStyle };
