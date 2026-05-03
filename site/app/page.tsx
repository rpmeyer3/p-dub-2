import { Loader } from "@/components/loader";
import { SmokeBackground } from "@/components/smoke-background";

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <SmokeBackground smokeColor="#FFFFFF" />
      <Loader />
    </main>
  );
}
