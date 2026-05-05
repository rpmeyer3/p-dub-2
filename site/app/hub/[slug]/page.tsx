import { notFound } from "next/navigation";
import { timelineData } from "@/lib/timeline-data";
import { NodeScene, type NodeSlug } from "@/components/scenes/node-scene";
import { NodeOverlay } from "@/components/scenes/node-overlay";

const VALID_SLUGS = new Set<string>([
  "about",
  "projects",
  "experience",
  "education",
  "contact",
]);

export function generateStaticParams() {
  return timelineData.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const node = timelineData.find((n) => n.slug === slug);
  return {
    title: node ? `${node.title} — Ryan Meyer` : "Not found",
    description: node?.content,
  };
}

export default async function NodePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const node = timelineData.find((n) => n.slug === slug);
  if (!node || !VALID_SLUGS.has(slug)) notFound();

  const typedSlug = slug as NodeSlug;

  return (
    <main className="bg-black text-white">
      <NodeScene slug={typedSlug} />
      <NodeOverlay slug={typedSlug} />
    </main>
  );
}
