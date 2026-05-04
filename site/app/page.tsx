"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TextMarquee } from "@/components/text-marquee";
import { Globe } from "@/components/globe";
import { SpiralAnimation } from "@/components/spiral-animation";
import { TextScramble } from "@/components/text-scramble";

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

type Phase = "marquee" | "transition" | "globe" | "expand" | "white";
type DialogStep = "none" | "right" | "left" | "bottom";

const SPIRAL_DURATION = 5; // seconds
const GLOBE_REVEAL_AT = 2.5;
const GLOBE_REVEAL_DURATION = SPIRAL_DURATION - GLOBE_REVEAL_AT;

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
      setTrollStep((prev) => Math.min(prev + 1, 1));
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
  }, [userLocation, dialogStep]);

  return (
    <main className="relative bg-black min-h-screen text-white overflow-hidden">
      {(phase === "transition" ||
        phase === "globe" ||
        phase === "expand") && (
        <div className="absolute inset-0 z-0">
          <SpiralAnimation
            duration={SPIRAL_DURATION}
            onComplete={() => setPhase("globe")}
          />
        </div>
      )}

      <div className="relative z-10 min-h-screen">
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

          {(phase === "transition" ||
            phase === "globe" ||
            phase === "expand") && (
            <motion.div
              key="globe"
              className="absolute inset-0 flex items-center justify-center px-6"
              initial={{ opacity: 0, scale: 0.01 }}
              animate={{
                opacity: 1,
                scale: phase === "expand" ? 28 : 1,
              }}
              transition={
                phase === "expand"
                  ? { duration: 1.0, ease: [0.55, 0, 0.85, 0.25] }
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
                  {dialogStep === "right" && (
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
                  {dialogStep === "left" && (
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
                  {dialogStep === "bottom" && (
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
            className="absolute inset-0 z-40 bg-white flex flex-col items-center justify-center px-6 text-center text-black"
            initial={{ opacity: phase === "white" ? 1 : 0 }}
            animate={{ opacity: 1 }}
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
  return (
    <>
      <motion.div
        className="absolute left-[12%] top-[32%] md:left-[18%] md:top-[34%] max-w-[60%] md:max-w-[42%]"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <TextScramble
          as="span"
          className="font-mono text-xs md:text-sm uppercase tracking-[0.08em] text-black"
        >
          nothing, I&apos;m just trolling
        </TextScramble>
      </motion.div>
      <AnimatePresence>
        {trollStep >= 1 && (
          <motion.div
            key="troll-2"
            className="absolute right-[12%] bottom-[32%] md:right-[18%] md:bottom-[34%] max-w-[60%] md:max-w-[42%] text-right"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <TextScramble
              as="span"
              className="font-mono text-xs md:text-sm uppercase tracking-[0.08em] text-black"
            >
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
