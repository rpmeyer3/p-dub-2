import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";

export default function HubLayout({ children }: { children: React.ReactNode }) {
  return <SmoothScrollProvider>{children}</SmoothScrollProvider>;
}
