"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface SpiralAnimationProps {
  duration?: number;
  onComplete?: () => void;
  className?: string;
  // When toggled true, the spiral plays its existing animation in reverse
  // (time tweens from current value back to 0) over `reverseDuration`.
  reverse?: boolean;
  reverseDuration?: number;
  onReverseComplete?: () => void;
  // When true, the rAF/timeline is suspended — use this when the spiral is
  // hidden behind another layer (e.g. the white phase) to free up GPU.
  paused?: boolean;
}

class Vector2D {
  constructor(public x: number, public y: number) {}
  static random(min: number, max: number): number {
    return min + Math.random() * (max - min);
  }
}

class Vector3D {
  constructor(public x: number, public y: number, public z: number) {}
}

interface FieldStar {
  x: number;
  y: number;
  r: number;
  phase: number;
  twinkleSpeed: number;
}

class AnimationController {
  private timeline: gsap.core.Timeline;
  public time = 0;
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  // Anisotropy-free scale for the central spiral effect — pinned to the
  // shorter viewport axis so the spiral grows proportionally on widescreen
  // monitors instead of staying tiny in the middle while the globe shrinks
  // over the top of it.
  private scaleFactor: number;
  private stars: Star[] = [];
  private starField: FieldStar[] = [];
  private postComplete = false;
  private postCompleteRafId: number | null = null;
  private startTime: number;

  private readonly changeEventTime = 0.32;
  public readonly cameraZ = -400;
  private readonly cameraTravelDistance = 3400;
  // 0 keeps the spiral's swirl center exactly at viewport center, which
  // matches the point the globe vanishes into on zoom-out. Was 28 — that
  // pushed the spiral ~28 × scaleFactor px below center (≈76 px on 4K),
  // so the two effects didn't share a focal point.
  private readonly startDotYOffset = 0;
  public readonly viewZoom = 100;
  // Reduced from 5000 — barely affects visual density, halves the per-frame
  // work in the active forward-spiral phase on 4K displays.
  private readonly numberOfStars = 3000;
  private readonly trailLength = 80;
  private readonly starFieldBaseCount = 260;
  private readonly baselineDim = 800;
  // Idle starfield twinkle is purely cosmetic — render at 30 fps instead of
  // matching the display refresh to halve the CPU/GPU work while the user
  // is reading the troll text.
  private readonly postCompleteFps = 30;

  constructor(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    duration: number,
    onComplete?: () => void,
  ) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.scaleFactor = Math.max(
      1,
      Math.min(width, height) / this.baselineDim,
    );
    this.startTime = performance.now();

    this.createStars();
    this.createStarField();

    this.timeline = gsap.timeline();
    this.timeline.to(this, {
      time: 1,
      duration,
      ease: "none",
      onUpdate: () => this.render(),
      onComplete: () => {
        this.postComplete = true;
        onComplete?.();
        this.startPostCompleteLoop();
      },
    });
  }

  private createStars() {
    for (let i = 0; i < this.numberOfStars; i++) {
      this.stars.push(new Star(this.cameraZ, this.cameraTravelDistance));
    }
  }

  private createStarField() {
    // Density-preserving star count: scale base count with viewport area so
    // a 4K monitor doesn't end up with a sparse-looking field while a phone
    // gets a reasonable count.
    const areaRatio =
      (this.width * this.height) / (this.baselineDim * this.baselineDim);
    const count = Math.round(this.starFieldBaseCount * Math.max(1, areaRatio));
    for (let i = 0; i < count; i++) {
      this.starField.push({
        x: (Math.random() - 0.5) * this.width,
        y: (Math.random() - 0.5) * this.height,
        r: Math.random() * 1.1 + 0.3,
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.6 + 0.4,
      });
    }
  }

  private startPostCompleteLoop() {
    const targetInterval = 1000 / this.postCompleteFps;
    let lastRender = 0;
    const tick = (now: number) => {
      if (now - lastRender >= targetInterval) {
        this.render();
        lastRender = now;
      }
      this.postCompleteRafId = requestAnimationFrame(tick);
    };
    this.postCompleteRafId = requestAnimationFrame(tick);
  }

  public setPaused(paused: boolean) {
    if (paused) {
      this.timeline.pause();
      if (this.postCompleteRafId !== null) {
        cancelAnimationFrame(this.postCompleteRafId);
        this.postCompleteRafId = null;
      }
    } else {
      this.timeline.resume();
      if (this.postComplete && this.postCompleteRafId === null) {
        this.startPostCompleteLoop();
      }
    }
  }

  private renderStarField(opacity: number) {
    if (opacity <= 0) return;
    const elapsed = (performance.now() - this.startTime) / 1000;
    this.ctx.fillStyle = "white";
    for (const s of this.starField) {
      const twinkle = (Math.sin(s.phase + elapsed * s.twinkleSpeed) + 1) * 0.35 + 0.15;
      this.ctx.globalAlpha = twinkle * opacity;
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      this.ctx.fill();
    }
    this.ctx.globalAlpha = 1;
  }

  public ease(p: number, g: number): number {
    if (p < 0.5) return 0.5 * Math.pow(2 * p, g);
    return 1 - 0.5 * Math.pow(2 * (1 - p), g);
  }

  public easeOutElastic(x: number): number {
    const c4 = (2 * Math.PI) / 4.5;
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    return Math.pow(2, -8 * x) * Math.sin((x * 8 - 0.75) * c4) + 1;
  }

  public map(value: number, start1: number, stop1: number, start2: number, stop2: number): number {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
  }

  public constrain(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }

  public lerp(start: number, end: number, t: number): number {
    return start * (1 - t) + end * t;
  }

  public spiralPath(p: number): Vector2D {
    p = this.constrain(1.2 * p, 0, 1);
    p = this.ease(p, 1.8);
    const numberOfSpiralTurns = 6;
    const theta = 2 * Math.PI * numberOfSpiralTurns * Math.sqrt(p);
    const r = 170 * Math.sqrt(p);

    return new Vector2D(
      r * Math.cos(theta),
      r * Math.sin(theta) + this.startDotYOffset,
    );
  }

  public rotate(v1: Vector2D, v2: Vector2D, p: number, orientation: boolean): Vector2D {
    const middle = new Vector2D((v1.x + v2.x) / 2, (v1.y + v2.y) / 2);
    const dx = v1.x - middle.x;
    const dy = v1.y - middle.y;
    const angle = Math.atan2(dy, dx);
    const o = orientation ? -1 : 1;
    const r = Math.sqrt(dx * dx + dy * dy);
    const bounce = Math.sin(p * Math.PI) * 0.05 * (1 - p);

    return new Vector2D(
      middle.x + r * (1 + bounce) * Math.cos(angle + o * Math.PI * this.easeOutElastic(p)),
      middle.y + r * (1 + bounce) * Math.sin(angle + o * Math.PI * this.easeOutElastic(p)),
    );
  }

  public showProjectedDot(position: Vector3D, sizeFactor: number) {
    const t2 = this.constrain(this.map(this.time, this.changeEventTime, 1, 0, 1), 0, 1);
    const newCameraZ = this.cameraZ + this.ease(Math.pow(t2, 1.2), 1.8) * this.cameraTravelDistance;

    if (position.z > newCameraZ) {
      const dotDepthFromCamera = position.z - newCameraZ;
      const x = (this.viewZoom * position.x) / dotDepthFromCamera;
      const y = (this.viewZoom * position.y) / dotDepthFromCamera;
      const sw = (400 * sizeFactor) / dotDepthFromCamera;

      this.ctx.lineWidth = sw;
      this.ctx.beginPath();
      this.ctx.arc(x, y, 0.5, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  private drawStartDot() {
    if (this.time > this.changeEventTime) {
      const dy = (this.cameraZ * this.startDotYOffset) / this.viewZoom;
      const position = new Vector3D(0, dy, this.cameraTravelDistance);
      this.showProjectedDot(position, 2.5);
    }
  }

  public render() {
    const ctx = this.ctx;
    if (!ctx) return;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, this.width, this.height);

    // Starfield rendered in raw viewport space — stars stay the same physical
    // size on every screen and naturally fill the entire viewport.
    const starOpacity = this.postComplete
      ? 1
      : Math.max(0, (this.time - 0.5) * 2);
    ctx.save();
    ctx.translate(this.width / 2, this.height / 2);
    this.renderStarField(starOpacity);
    ctx.restore();

    if (this.postComplete) return;

    // Central spiral effect is uniformly scaled by `scaleFactor`, so the
    // visible region grows on larger viewports (otherwise the shrinking
    // globe covers it entirely on a desktop monitor).
    ctx.save();
    ctx.translate(this.width / 2, this.height / 2);
    ctx.scale(this.scaleFactor, this.scaleFactor);

    const t1 = this.constrain(this.map(this.time, 0, this.changeEventTime + 0.25, 0, 1), 0, 1);
    const t2 = this.constrain(this.map(this.time, this.changeEventTime, 1, 0, 1), 0, 1);

    ctx.rotate(-Math.PI * this.ease(t2, 2.7));

    this.drawTrail(t1);

    ctx.fillStyle = "white";
    for (const star of this.stars) {
      star.render(t1, this);
    }

    this.drawStartDot();

    ctx.restore();
  }

  private drawTrail(t1: number) {
    for (let i = 0; i < this.trailLength; i++) {
      const f = this.map(i, 0, this.trailLength, 1.1, 0.1);
      const sw = (1.3 * (1 - t1) + 3.0 * Math.sin(Math.PI * t1)) * f;

      this.ctx.fillStyle = "white";
      this.ctx.lineWidth = sw;

      const pathTime = t1 - 0.00015 * i;
      const position = this.spiralPath(pathTime);
      const basePos = position;
      const offset = new Vector2D(position.x + 5, position.y + 5);
      const rotated = this.rotate(
        basePos,
        offset,
        Math.sin(this.time * Math.PI * 2) * 0.5 + 0.5,
        i % 2 === 0,
      );

      this.ctx.beginPath();
      this.ctx.arc(rotated.x, rotated.y, sw / 2, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  public reverse(duration: number, onReverseComplete?: () => void) {
    if (this.postCompleteRafId !== null) {
      cancelAnimationFrame(this.postCompleteRafId);
      this.postCompleteRafId = null;
    }
    this.postComplete = false;
    this.timeline.kill();
    this.timeline = gsap.timeline();
    this.timeline.to(this, {
      time: 0,
      duration,
      ease: "none",
      onUpdate: () => this.render(),
      onComplete: () => {
        onReverseComplete?.();
      },
    });
  }

  public destroy() {
    this.timeline.kill();
    if (this.postCompleteRafId !== null) {
      cancelAnimationFrame(this.postCompleteRafId);
      this.postCompleteRafId = null;
    }
  }
}

class Star {
  private dx: number;
  private dy: number;
  private spiralLocation: number;
  private strokeWeightFactor: number;
  private z: number;
  private angle: number;
  private distance: number;
  private rotationDirection: number;
  private expansionRate: number;
  private finalScale: number;

  constructor(cameraZ: number, cameraTravelDistance: number) {
    this.angle = Math.random() * Math.PI * 2;
    this.distance = 30 * Math.random() + 15;
    this.rotationDirection = Math.random() > 0.5 ? 1 : -1;
    this.expansionRate = 1.2 + Math.random() * 0.8;
    this.finalScale = 0.7 + Math.random() * 0.6;

    this.dx = this.distance * Math.cos(this.angle);
    this.dy = this.distance * Math.sin(this.angle);

    this.spiralLocation = (1 - Math.pow(1 - Math.random(), 3.0)) / 1.3;
    this.z = Vector2D.random(0.5 * cameraZ, cameraTravelDistance + cameraZ);

    const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;
    this.z = lerp(this.z, cameraTravelDistance / 2, 0.3 * this.spiralLocation);
    this.strokeWeightFactor = Math.pow(Math.random(), 2.0);
  }

  render(p: number, controller: AnimationController) {
    const spiralPos = controller.spiralPath(this.spiralLocation);
    const q = p - this.spiralLocation;

    if (q > 0) {
      const displacementProgress = controller.constrain(4 * q, 0, 1);

      const linearEasing = displacementProgress;
      const elasticEasing = controller.easeOutElastic(displacementProgress);
      const powerEasing = Math.pow(displacementProgress, 2);

      let easing: number;
      if (displacementProgress < 0.3) {
        easing = controller.lerp(linearEasing, powerEasing, displacementProgress / 0.3);
      } else if (displacementProgress < 0.7) {
        const t = (displacementProgress - 0.3) / 0.4;
        easing = controller.lerp(powerEasing, elasticEasing, t);
      } else {
        easing = elasticEasing;
      }
      void easing;

      let screenX: number;
      let screenY: number;

      if (displacementProgress < 0.3) {
        screenX = controller.lerp(spiralPos.x, spiralPos.x + this.dx * 0.3, displacementProgress / 0.3);
        screenY = controller.lerp(spiralPos.y, spiralPos.y + this.dy * 0.3, displacementProgress / 0.3);
      } else if (displacementProgress < 0.7) {
        const midProgress = (displacementProgress - 0.3) / 0.4;
        const curveStrength = Math.sin(midProgress * Math.PI) * this.rotationDirection * 1.5;
        const baseX = spiralPos.x + this.dx * 0.3;
        const baseY = spiralPos.y + this.dy * 0.3;
        const targetX = spiralPos.x + this.dx * 0.7;
        const targetY = spiralPos.y + this.dy * 0.7;
        const perpX = -this.dy * 0.4 * curveStrength;
        const perpY = this.dx * 0.4 * curveStrength;

        screenX = controller.lerp(baseX, targetX, midProgress) + perpX * midProgress;
        screenY = controller.lerp(baseY, targetY, midProgress) + perpY * midProgress;
      } else {
        const finalProgress = (displacementProgress - 0.7) / 0.3;
        const baseX = spiralPos.x + this.dx * 0.7;
        const baseY = spiralPos.y + this.dy * 0.7;
        const targetDistance = this.distance * this.expansionRate * 1.5;
        const spiralTurns = 1.2 * this.rotationDirection;
        const spiralAngle = this.angle + spiralTurns * finalProgress * Math.PI;

        const targetX = spiralPos.x + targetDistance * Math.cos(spiralAngle);
        const targetY = spiralPos.y + targetDistance * Math.sin(spiralAngle);

        screenX = controller.lerp(baseX, targetX, finalProgress);
        screenY = controller.lerp(baseY, targetY, finalProgress);
      }

      const vx = ((this.z - controller.cameraZ) * screenX) / controller.viewZoom;
      const vy = ((this.z - controller.cameraZ) * screenY) / controller.viewZoom;

      const position = new Vector3D(vx, vy, this.z);

      let sizeMultiplier: number;
      if (displacementProgress < 0.6) {
        sizeMultiplier = 1.0 + displacementProgress * 0.2;
      } else {
        const t = (displacementProgress - 0.6) / 0.4;
        sizeMultiplier = 1.2 * (1.0 - t) + this.finalScale * t;
      }

      const dotSize = 8.5 * this.strokeWeightFactor * sizeMultiplier;

      controller.showProjectedDot(position, dotSize);
    }
  }
}

export function SpiralAnimation({
  duration = 5,
  onComplete,
  className,
  reverse = false,
  reverseDuration,
  onReverseComplete,
  paused = false,
}: SpiralAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<AnimationController | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  const onCompleteRef = useRef(onComplete);
  const onReverseCompleteRef = useRef(onReverseComplete);
  const reverseDurationRef = useRef(reverseDuration ?? duration);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    onReverseCompleteRef.current = onReverseComplete;
  }, [onReverseComplete]);

  useEffect(() => {
    reverseDurationRef.current = reverseDuration ?? duration;
  }, [reverseDuration, duration]);

  useEffect(() => {
    if (!reverse) return;
    animationRef.current?.reverse(
      reverseDurationRef.current,
      () => onReverseCompleteRef.current?.(),
    );
  }, [reverse]);

  useEffect(() => {
    animationRef.current?.setPaused(paused);
  }, [paused]);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!dimensions) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Cap DPR at 1.5: on 4K laptops `devicePixelRatio` is often 2 (and the
    // canvas covers the full viewport), which means 4× the pixel work vs.
    // a 1080p display for imperceptible visual gain. Cobe's globe canvas
    // does the same cap at 2 — we go a touch further because this canvas
    // is much larger.
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    // Buffer matches viewport 1:1 (in CSS pixels) so the spiral isn't
    // anisotropically squished on widescreen displays.
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    canvas.style.width = `${dimensions.width}px`;
    canvas.style.height = `${dimensions.height}px`;
    ctx.scale(dpr, dpr);

    animationRef.current = new AnimationController(
      ctx,
      dimensions.width,
      dimensions.height,
      duration,
      () => onCompleteRef.current?.(),
    );

    return () => {
      animationRef.current?.destroy();
      animationRef.current = null;
    };
  }, [dimensions, duration]);

  return (
    <div className={`relative w-full h-full ${className ?? ""}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
