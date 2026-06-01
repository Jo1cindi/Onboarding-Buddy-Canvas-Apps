import * as React from "react";
import {
  Button,
  FluentProvider,
  webDarkTheme,
  makeStyles,
} from "@fluentui/react-components";
import {
  PeopleTeamRegular,
  MailInboxRegular,
  PersonHeartRegular,
  AlertRegular,
  ArrowRightRegular,
} from "@fluentui/react-icons";
import Banner from "./components/Banner";

// ─── Props ────────────────────────────────────────────────────
interface ILandingPageProps {
  width: number;
  height: number;
  newHiresCount:   number;
  responsesCount:  number;
  buddyRate:       number;
  exceptionsCount: number;
  currentWeek: string;
  lastSync: string;
  onButtonClick: (value: string) => void;
}

// ─── Breakpoints ──────────────────────────────────────────────
type Breakpoint = "mobile" | "tablet" | "desktop";
function getBreakpoint(width: number): Breakpoint {
  if (width < 600)  return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

// ─── Static styles ────────────────────────────────────────────
const useStyles = makeStyles({
  root: {
    display: "flex", flexDirection: "column",
    width: "100%", height: "100%",
    backgroundColor: "#0a0a0f",
    fontFamily: "'Segoe UI Variable', 'Segoe UI', system-ui, sans-serif",
    overflow: "hidden", position: "relative",
  },
  bgGlow1: {
    position: "absolute", top: "-80px", left: "-80px",
    width: "400px", height: "400px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(0,120,212,0.15) 0%, transparent 70%)",
    pointerEvents: "none", zIndex: 0,
  },
  bgGlow2: {
    position: "absolute", bottom: "-100px", right: "-60px",
    width: "500px", height: "500px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(192,59,196,0.10) 0%, transparent 70%)",
    pointerEvents: "none", zIndex: 0,
  },
  bgGrid: {
    position: "absolute", inset: 0,
    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
    backgroundSize: "40px 40px", zIndex: 0, pointerEvents: "none",
  },
  openBtn: {
    background: "linear-gradient(110deg, #0078d4, #c03bc4) !important",
    border: "none !important", borderRadius: "8px !important",
    color: "white !important", cursor: "pointer",
    boxShadow: "0 0 24px rgba(0,120,212,0.35), 0 4px 12px rgba(0,0,0,0.4)",
    // Smooth transition for all hover properties
    transition: "box-shadow 0.25s ease, transform 0.25s ease, background 0.25s ease, filter 0.25s ease !important",
    ":hover": {
      boxShadow: "0 0 40px rgba(0,120,212,0.65), 0 0 20px rgba(192,59,196,0.4), 0 6px 20px rgba(0,0,0,0.5) !important",
      transform: "translateY(-2px) scale(1.03)",
      filter: "brightness(1.15)",
    },
    ":active": {
      transform: "translateY(0px) scale(0.98)",
      filter: "brightness(0.95)",
    },
  },
  statCell: {
    display: "flex", flexDirection: "column", gap: "6px",
    position: "relative", transition: "background 0.2s ease",
    ":hover": { backgroundColor: "rgba(255,255,255,0.04)" },
  },
  statIconWrap: {
    borderRadius: "8px", display: "flex",
    alignItems: "center", justifyContent: "center",
  },
  statusBadge: {
    display: "flex", alignItems: "center", gap: "5px",
    backgroundColor: "rgba(40,200,110,0.1)",
    border: "1px solid rgba(40,200,110,0.25)",
    borderRadius: "999px", padding: "3px 8px",
  },
  statusDot: {
    width: "5px", height: "5px", borderRadius: "50%",
    backgroundColor: "#28c86e", boxShadow: "0 0 5px #28c86e",
    animation: "pulse 2s ease-in-out infinite",
  },
  statusText: {
    color: "#28c86e", fontSize: "10px", fontWeight: 600,
    letterSpacing: "0.04em", textTransform: "uppercase",
  },
});

// ─── Responsive config ────────────────────────────────────────
const BP_CONFIG = {
  mobile: {
    headingSize: "28px", subtitleSize: "13px", subtitleMargin: "12px 0 20px 0",
    btnSize: "small" as const, btnPadding: "0 18px", btnHeight: "34px", btnFontSize: "13px",
    cardWidth: "100%", statPadding: "14px 12px", statValueSize: "20px",
    statLabelSize: "10px", statIconSize: 12, statIconBox: "22px",
    footerPadding: "10px 14px", footerFontSize: "10px",
  },
  tablet: {
    headingSize: "36px", subtitleSize: "14px", subtitleMargin: "14px 0 24px 0",
    btnSize: "medium" as const, btnPadding: "0 22px", btnHeight: "38px", btnFontSize: "14px",
    cardWidth: "460px", statPadding: "18px 16px", statValueSize: "22px",
    statLabelSize: "11px", statIconSize: 13, statIconBox: "26px",
    footerPadding: "12px 16px", footerFontSize: "11px",
  },
  desktop: {
    headingSize: "44px", subtitleSize: "14px", subtitleMargin: "18px 0 28px 0",
    btnSize: "medium" as const, btnPadding: "0 24px", btnHeight: "40px", btnFontSize: "14px",
    cardWidth: "340px", statPadding: "20px 20px 18px 20px", statValueSize: "26px",
    statLabelSize: "11px", statIconSize: 14, statIconBox: "28px",
    footerPadding: "12px 20px", footerFontSize: "11px",
  },
};

// ─── Component ────────────────────────────────────────────────
export const LandingPageView = ({
  width, height,
  newHiresCount, responsesCount, buddyRate, exceptionsCount,
  currentWeek, lastSync,
  onButtonClick,
}: ILandingPageProps) => {
  const styles = useStyles();
  const bp     = getBreakpoint(width);
  const cfg    = BP_CONFIG[bp];

  const STATS = [
    { value: newHiresCount,   label: "New Hires This Week", icon: <PeopleTeamRegular />,  color: "#0078d4", bg: "rgba(0,120,212,0.15)" },
    { value: responsesCount,  label: "Responses Received",  icon: <MailInboxRegular />,   color: "#c03bc4", bg: "rgba(192,59,196,0.15)" },
    { value: buddyRate,       label: "Buddy Rate",          icon: <PersonHeartRegular />, color: "#28c86e", bg: "rgba(40,200,110,0.15)" },
    { value: exceptionsCount, label: "Exceptions Open",     icon: <AlertRegular />,       color: "#f7a23e", bg: "rgba(247,162,62,0.15)" },
  ];

  // ── Stat card — each cell fades in with a staggered delay ──
  const StatCard = () => (
    <div style={{
      width: cfg.cardWidth, borderRadius: "16px", overflow: "hidden",
      border: "1px solid rgba(255,255,255,0.08)", backgroundColor: "#454152",
      backdropFilter: "blur(24px)",
      boxShadow: "0 12px 40px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)",
      flexShrink: 0,
      // Card itself fades + rises in
      animation: "cardFadeIn 0.5s ease both",
    }}>
      <div style={{
        padding: "14px 16px", display: "flex", flexDirection: "column", gap: "2px",
        borderBottom: "1px solid rgba(255,255,255,0.07)", backgroundColor: "white",
      }}>
        <p style={{ color: "black", fontWeight: 600, fontSize: "14px", margin: 0 }}>This Week at a Glance</p>
        <p style={{ color: "#454142", fontSize: "12px", margin: 0 }}>{currentWeek}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        {STATS.map((stat, i) => (
          // Each stat cell fades in with a staggered delay based on its index
          <div key={i} className={styles.statCell} style={{
            padding: cfg.statPadding,
            borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
            borderBottom: i < 2      ? "1px solid rgba(255,255,255,0.07)" : "none",
            animation: `statFadeIn 0.4s ease both`,
            animationDelay: `${0.15 + i * 0.1}s`,
          }}>
            <div className={styles.statIconWrap} style={{
              width: cfg.statIconBox, height: cfg.statIconBox,
              backgroundColor: stat.bg, color: stat.color, fontSize: cfg.statIconSize,
            }}>
              {stat.icon}
            </div>
            <h4 style={{
              color: "white", fontSize: cfg.statValueSize, fontWeight: 700,
              lineHeight: 1, letterSpacing: "-0.02em", margin: 0,
              transition: "opacity 0.3s ease",
            }}>
              {stat.value}
            </h4>
            <p style={{
              color: "rgba(200,200,215,0.5)", fontSize: cfg.statLabelSize,
              lineHeight: 1.35, margin: 0,
            }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: cfg.footerPadding, display: "flex",
        alignItems: "center", justifyContent: "space-between",
        animation: "statFadeIn 0.4s ease both",
        animationDelay: "0.55s",
      }}>
        <p style={{ color: "rgba(200,200,215,0.4)", fontSize: cfg.footerFontSize, margin: 0 }}>
          {lastSync}
        </p>
        <div className={styles.statusBadge}>
          <div className={styles.statusDot} />
          <span className={styles.statusText}>Flow Active</span>
        </div>
      </div>
    </div>
  );

  // ── Heading block ──
  const Heading = ({ maxWidth }: { maxWidth?: string }) => (
    <>
      <h1 style={{ color: "white", fontWeight: 700, fontSize: cfg.headingSize, lineHeight: 1.1, margin: 0, letterSpacing: "-0.02em" }}>
        MCAPS Onboarding Buddy
      </h1>
      <h1 style={{
        fontSize: cfg.headingSize, fontWeight: 700, lineHeight: 1.1,
        margin: "2px 0 0 0", letterSpacing: "-0.02em",
        background: "linear-gradient(110deg, #0078d4 0%, #c03bc4 100%)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
      }}>
        Program Console
      </h1>
      <p style={{
        color: "rgba(210,210,220,0.65)", fontSize: cfg.subtitleSize,
        lineHeight: 1.65, margin: cfg.subtitleMargin, maxWidth: maxWidth ?? "340px",
      }}>
        Track new hire outreach, manage buddy assignments, review survey
        responses, and resolve exceptions — all in one place.
      </p>
      <Button
        appearance="primary" size={cfg.btnSize}
        className={styles.openBtn}
        icon={<ArrowRightRegular />} iconPosition="after"
        style={{
          width: bp === "mobile" ? "100%" : "fit-content",
          justifyContent: "center",
          padding: cfg.btnPadding, height: cfg.btnHeight,
          fontSize: cfg.btnFontSize, fontWeight: 600,
        }}
        onClick={() => onButtonClick("OpenConsole")}
      >
        Open Console
      </Button>
    </>
  );

  // ── Banner as pure background, card centered in sibling div ──
  const BannerWithCenteredCard = ({ style }: { style: React.CSSProperties }) => (
    <div style={{ position: "relative", ...style }}>
      <Banner style={{ position: "absolute", inset: 0, width: "100%", height: "100%", borderRadius: 0 }} />
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 2,
      }}>
        <StatCard />
      </div>
    </div>
  );

  return (
    <FluentProvider theme={webDarkTheme}>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
        /* Card container: fades in and rises up from 16px below */
        @keyframes cardFadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        /* Individual stat cells: fade in and rise from 8px */
        @keyframes statFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className={styles.root} style={{ width, height, overflowY: bp === "mobile" ? "auto" : "hidden" }}>
        <div className={styles.bgGlow1} />
        <div className={styles.bgGlow2} />
        <div className={styles.bgGrid} />

        {/* ── DESKTOP ── */}
        {bp === "desktop" && (
          <main style={{ display: "grid", gridTemplateColumns: "1fr 1fr", width: "100%", height: "100%", position: "relative", zIndex: 1 }}>
            <div style={{
              display: "flex", flexDirection: "column", justifyContent: "center",
              padding: "0 56px 0 64px", position: "relative",
              borderLeft: "3px solid transparent", borderTop: "3px solid transparent",
              borderImage: "linear-gradient(180deg,#0078d4,#c03bc4) 1", borderImageSlice: 1,
            }}>
              <Heading />
            </div>
            <BannerWithCenteredCard style={{ width: "100%", height: "100%" }} />
          </main>
        )}

        {/* ── TABLET ── */}
        {bp === "tablet" && (
          <main style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", position: "relative", zIndex: 1 }}>
            <div style={{ flex: 1, display: "flex", alignItems: "center", padding: "32px 40px 16px 40px" }}>
              <div style={{ display: "flex", flexDirection: "column", maxWidth: "560px", width: "100%" }}>
                <Heading maxWidth="480px" />
              </div>
            </div>
            <BannerWithCenteredCard style={{ width: "100%", flex: 1 }} />
          </main>
        )}

        {/* ── MOBILE ── */}
        {bp === "mobile" && (
          <main style={{
            display: "flex", flexDirection: "column", width: "100%", minHeight: "100%",
            position: "relative", zIndex: 1, padding: "32px 24px 40px",
            boxSizing: "border-box", gap: "24px",
          }}>
            <Heading />
            <StatCard />
          </main>
        )}
      </div>
    </FluentProvider>
  );
};