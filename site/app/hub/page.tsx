"use client";

import RadialOrbitalTimeline from "@/components/radial-orbital-timeline";
import { timelineData } from "@/lib/timeline-data";

export default function HubPage() {
  return <RadialOrbitalTimeline timelineData={timelineData} />;
}
