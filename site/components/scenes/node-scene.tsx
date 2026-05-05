"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { NodeSceneShell } from "@/components/scenes/node-scene-shell";

// Each scene is its own dynamic import — three only ships in the chunk for the
// route the user actually visits.
const sceneLoaders = {
  about: dynamic(() => import("@/components/scenes/about"), { ssr: false }),
  projects: dynamic(() => import("@/components/scenes/projects"), {
    ssr: false,
  }),
  experience: dynamic(() => import("@/components/scenes/experience"), {
    ssr: false,
  }),
  education: dynamic(() => import("@/components/scenes/education"), {
    ssr: false,
  }),
  contact: dynamic(() => import("@/components/scenes/contact"), {
    ssr: false,
  }),
};

export type NodeSlug = keyof typeof sceneLoaders;

interface NodeSceneProps {
  slug: NodeSlug;
}

export function NodeScene({ slug }: NodeSceneProps) {
  const Scene = useMemo(() => sceneLoaders[slug], [slug]);
  return <NodeSceneShell scene={<Scene />} />;
}
