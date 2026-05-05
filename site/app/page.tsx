"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TextMarquee } from "@/components/text-marquee";
import { Globe } from "@/components/globe";
import { SpiralAnimation } from "@/components/spiral-animation";
import { TextScramble } from "@/components/text-scramble";
import { BackgroundPaths } from "@/components/background-paths";
import { useIsMobile } from "@/lib/use-is-mobile";

const ROLES = [
  "Software Engineer",
  "Full-Stack Developer",
  "ML Engineer",
  "Data Engineer",
  "Cloud Engineer",
  "AI Engineer",
];

const ATLANTA = {
  id: "atlanta",
  location: [33.749, -84.388] as [number, number],
  label: "Atlanta, GA",
};
// Atlanta longitude (-84.388° ≈ -1.473 rad). LANDING_PHI rotates the landing
// view 90° east of Atlanta, placing Western Europe / Africa near the center.
const ATLANTA_PHI = -1.473;
const LANDING_PHI = ATLANTA_PHI + Math.PI / 2;

type Phase =
  | "marquee"
  | "transition"
  | "globe"
  | "expand"
  | "white"
  | "outro"
  | "void";
type DialogStep = "none" | "right" | "left" | "bottom";

const SPIRAL_DURATION = 5; // seconds
const GLOBE_REVEAL_AT = 2.5;
const GLOBE_REVEAL_DURATION = SPIRAL_DURATION - GLOBE_REVEAL_AT;
// Click 2 in the white phase shrinks both troll boxes to nothing. Phase flips
// to "outro" when the shrink finishes — globe reverse-scales back to 1, then
// keeps shrinking past the stars while the dotted-surface fades in. After
// OUTRO_DURATION_S we settle on "void" — only the dotted surface remains.
const WHITE_SHRINK_MS = 900;
const OUTRO_DURATION_S = 3.0;
const OUTRO_DURATION_MS = OUTRO_DURATION_S * 1000;
// Globe scale keyframes: held at MAX during white, reverses to 1 (~40% of
// the journey), then continues to 0 — the globe vanishes entirely before
// the spiral fades out, so it never appears as a stuck dot. The MAX is
// adaptive: 28× fills a desktop viewport, while 16× still fully covers a
// phone screen without the absurd over-zoom that 28× implies on 375 px wide.
const EXPAND_SCALE_DESKTOP = 28;
const EXPAND_SCALE_MOBILE = 16;
const OUTRO_SCALE_TIMES = [0, 0.4, 1];
// "in the middle start the transition" — spiral fades + recedes from 50%,
// dotted surface fades in from 50%.
const OUTRO_HALF_S = OUTRO_DURATION_S / 2;
const SCENE_PHASES: Phase[] = [
  "transition",
  "globe",
  "expand",
  "white",
  "outro",
];

type UserLocation = {
  city: string;
  region: string;
  countryName: string;
  countryCode: string;
  regionCode: string;
  lat: number;
  lng: number;
};

export default function Page() {
  const [phase, setPhase] = useState<Phase>("marquee");
  const [dialogStep, setDialogStep] = useState<DialogStep>("none");
  const [trollStep, setTrollStep] = useState(0);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const armedRef = useRef(false);
  const fetchedRef = useRef(false);
  const skippingRef = useRef(false);

  const isMobile = useIsMobile();
  const expandScale = isMobile ? EXPAND_SCALE_MOBILE : EXPAND_SCALE_DESKTOP;
  const outroScaleKeyframes = useMemo(
    () => [expandScale, 1, 0],
    [expandScale],
  );

  useEffect(() => {
    const t = setTimeout(() => {
      armedRef.current = true;
    }, 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase !== "marquee") return;
    const advance = () => {
      if (!armedRef.current) return;
      if (skippingRef.current) return;
      setPhase("transition");
    };
    window.addEventListener("click", advance);
    window.addEventListener("mousemove", advance);
    window.addEventListener("touchstart", advance, { passive: true });
    window.addEventListener("keydown", advance);
    return () => {
      window.removeEventListener("click", advance);
      window.removeEventListener("mousemove", advance);
      window.removeEventListener("touchstart", advance);
      window.removeEventListener("keydown", advance);
    };
  }, [phase]);

  const handleSkip = (e: React.MouseEvent | React.TouchEvent) => {
    // Block the marquee-phase advance handler from racing the state update.
    skippingRef.current = true;
    e.nativeEvent.stopImmediatePropagation();
    e.preventDefault();
    setPhase("void");
  };

  useEffect(() => {
    if (phase !== "globe") return;
    const advance = () => {
      if (dialogStep === "bottom") {
        setPhase("expand");
        return;
      }
      setDialogStep((prev) => {
        if (prev === "none") return "right";
        if (prev === "right") return "left";
        if (prev === "left") return "bottom";
        return prev;
      });
    };
    window.addEventListener("click", advance);
    window.addEventListener("touchstart", advance, { passive: true });
    window.addEventListener("keydown", advance);
    return () => {
      window.removeEventListener("click", advance);
      window.removeEventListener("touchstart", advance);
      window.removeEventListener("keydown", advance);
    };
  }, [phase, dialogStep]);

  useEffect(() => {
    if (phase !== "white") return;
    const advance = () => {
      setTrollStep((prev) => Math.min(prev + 1, 2));
    };
    window.addEventListener("click", advance);
    window.addEventListener("touchstart", advance, { passive: true });
    window.addEventListener("keydown", advance);
    return () => {
      window.removeEventListener("click", advance);
      window.removeEventListener("touchstart", advance);
      window.removeEventListener("keydown", advance);
    };
  }, [phase]);

  useEffect(() => {
    if (trollStep !== 2) return;
    const t = setTimeout(() => setPhase("outro"), WHITE_SHRINK_MS);
    return () => clearTimeout(t);
  }, [trollStep]);

  useEffect(() => {
    if (phase !== "outro") return;
    const t = setTimeout(() => setPhase("void"), OUTRO_DURATION_MS);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (dialogStep === "none") return;
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((data) => {
        if (!data?.city || data.error) return;
        setUserLocation({
          city: data.city,
          region: data.region ?? "",
          countryName: data.country_name ?? "",
          countryCode: data.country_code ?? "",
          regionCode: data.region_code ?? "",
          lat: data.latitude,
          lng: data.longitude,
        });
      })
      .catch(() => {});
  }, [dialogStep]);

  const markers = useMemo(() => {
    if (phase === "outro") return [];
    if (
      userLocation &&
      (dialogStep === "left" || dialogStep === "bottom")
    ) {
      const userRegion =
        userLocation.regionCode ||
        userLocation.countryCode ||
        userLocation.region;
      return [
        ATLANTA,
        {
          id: "user-location",
          location: [userLocation.lat, userLocation.lng] as [number, number],
          label: userRegion
            ? `${userLocation.city}, ${userRegion}`
            : userLocation.city,
        },
      ];
    }
    return [ATLANTA];
  }, [userLocation, dialogStep, phase]);

  return (
    <main className="relative bg-black min-h-screen text-white overflow-hidden">
      {phase === "marquee" && (
        <button
          type="button"
          onClick={handleSkip}
          onTouchStart={handleSkip}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-50 px-3 py-2 font-mono text-[11px] md:text-xs uppercase tracking-[0.12em] text-white/60 hover:text-white active:text-white border border-white/20 hover:border-white/60 active:border-white rounded-sm transition-colors backdrop-blur-sm bg-black/30"
          aria-label="Skip the intro animation and go directly to the welcome page"
        >
          skip intro <span aria-hidden className="ml-1">→</span>
        </button>
      )}

      {SCENE_PHASES.includes(phase) && (
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "outro" ? 0 : 1 }}
          transition={{
            duration: phase === "outro" ? OUTRO_HALF_S : 0,
            delay: phase === "outro" ? OUTRO_HALF_S : 0,
            ease: "easeOut",
          }}
        >
          <SpiralAnimation
            duration={SPIRAL_DURATION}
            onComplete={() => setPhase("globe")}
            reverse={phase === "outro"}
            reverseDuration={OUTRO_DURATION_S}
            paused={phase === "white"}
          />
        </motion.div>
      )}

      <AnimatePresence>
        {phase === "void" && (
          <motion.div
            key="welcome"
            className="absolute inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeIn" }}
          >
            <BackgroundPaths />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 min-h-screen pointer-events-none">
        <AnimatePresence>
          {phase === "marquee" && (
            <motion.div
              key="marquee"
              className="absolute inset-0 flex items-center justify-center px-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <TextMarquee
                speed={1.2}
                className="text-3xl md:text-4xl font-bold tracking-tight"
                prefix={
                  <span>
                    Ryan Meyer
                    <span className="mx-3 text-white/40 font-light">|</span>
                  </span>
                }
              >
                {ROLES.map((role) => (
                  <span key={role}>{role}</span>
                ))}
              </TextMarquee>
            </motion.div>
          )}

          {SCENE_PHASES.includes(phase) && (
            <motion.div
              key="globe"
              className="absolute inset-0 flex items-center justify-center px-6 pointer-events-auto"
              initial={{ opacity: 0, scale: 0.01 }}
              animate={{
                opacity: 1,
                scale:
                  phase === "outro"
                    ? outroScaleKeyframes
                    : phase === "expand" || phase === "white"
                    ? expandScale
                    : 1,
              }}
              transition={
                phase === "expand"
                  ? { duration: 1.0, ease: [0.55, 0, 0.85, 0.25] }
                  : phase === "outro"
                  ? {
                      duration: OUTRO_DURATION_S,
                      times: OUTRO_SCALE_TIMES,
                      ease: "easeInOut",
                    }
                  : {
                      delay: phase === "transition" ? GLOBE_REVEAL_AT : 0,
                      duration: GLOBE_REVEAL_DURATION,
                      opacity: { duration: 0.6, ease: "easeOut" },
                      ease: "easeInOut",
                    }
              }
            >
              <div className="relative w-[min(80vmin,640px)]">
                <Globe
                  markers={markers}
                  initialPhi={LANDING_PHI}
                  speed={computeSpeed(dialogStep, userLocation)}
                />

                <AnimatePresence>
                  {phase === "globe" && dialogStep === "right" && (
                    <motion.div
                      key="dialog-right"
                      className="absolute top-3 right-3 md:top-5 md:right-5 max-w-[42%]"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                      <TextScramble
                        as="span"
                        className="font-mono text-xs md:text-sm uppercase tracking-[0.08em] text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]"
                      >
                        howdy, I am from
                      </TextScramble>
                    </motion.div>
                  )}
                  {phase === "globe" && dialogStep === "left" && (
                    <motion.div
                      key="dialog-left"
                      className="absolute top-3 left-3 md:top-5 md:left-5 max-w-[42%]"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                      <TextScramble
                        as="span"
                        className="font-mono text-xs md:text-sm uppercase tracking-[0.08em] text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]"
                      >
                        you are reaching me from
                      </TextScramble>
                    </motion.div>
                  )}
                  {phase === "globe" && dialogStep === "bottom" && (
                    <motion.div
                      key="dialog-bottom"
                      className="absolute -bottom-2 -right-5 md:-bottom-1 md:-right-8 max-w-[42%]"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                      <TextScramble
                        as="span"
                        className="font-mono text-xs md:text-sm uppercase tracking-[0.08em] text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]"
                      >
                        you should probably hide that but...
                      </TextScramble>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {(phase === "expand" || phase === "white") && (
          <motion.div
            key="white-overlay"
            className="absolute inset-0 z-40 bg-white text-black"
            initial={{ opacity: phase === "white" ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeOut" } }}
            transition={{ duration: 0.7, ease: "easeIn", delay: 0.3 }}
            onAnimationComplete={() => {
              if (phase === "expand") setPhase("white");
            }}
          >
            {phase === "white" && <WhitePageContent trollStep={trollStep} />}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function WhitePageContent({ trollStep }: { trollStep: number }) {
  // trollStep 2 shrinks both boxes in place to scale 0 and fades them out —
  // reads as the boxes "zooming away" until they vanish.
  const shrinkDuration = WHITE_SHRINK_MS / 1000;
  const shrinkTransition = { duration: shrinkDuration, ease: "easeIn" } as const;
  const shrinkTarget = { opacity: 0, scale: 0 };

  return (
    <>
      <motion.div
        className="absolute left-[12%] top-[32%] md:left-[18%] md:top-[34%] max-w-[60%] md:max-w-[42%] font-mono text-xs md:text-sm uppercase tracking-[0.08em] text-black"
        initial={{ opacity: 0, y: -6 }}
        animate={trollStep === 2 ? shrinkTarget : { opacity: 1, y: 0, scale: 1 }}
        transition={trollStep === 2 ? shrinkTransition : { duration: 0.45, ease: "easeOut" }}
      >
        <TextScramble as="span">
          nothing, I&apos;m just trolling
        </TextScramble>
      </motion.div>
      <AnimatePresence>
        {trollStep >= 1 && (
          <motion.div
            key="troll-2"
            className="absolute right-[12%] bottom-[32%] md:right-[18%] md:bottom-[34%] max-w-[60%] md:max-w-[42%] text-right font-mono text-xs md:text-sm uppercase tracking-[0.08em] text-black"
            initial={{ opacity: 0, y: 6 }}
            animate={trollStep === 2 ? shrinkTarget : { opacity: 1, y: 0, scale: 1 }}
            transition={trollStep === 2 ? shrinkTransition : { duration: 0.45, ease: "easeOut" }}
          >
            <TextScramble as="span">
              but thanks for visiting the website
            </TextScramble>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function computeSpeed(
  step: DialogStep,
  loc: UserLocation | null,
): number {
  if (step !== "left" || !loc) return 0;
  const TAU = Math.PI * 2;
  const userPhi = (loc.lng * Math.PI) / 180;
  let diff = ((userPhi - LANDING_PHI) % TAU + TAU) % TAU;
  if (diff > Math.PI) diff -= TAU;
  // |diff| <= 90° = pin already on the visible side, no rotation needed
  if (Math.abs(diff) <= Math.PI / 2) return 0;
  // Rotate toward the pin (sign of diff). Magnitude controls spin rate.
  return Math.sign(diff) * 0.005;
}
