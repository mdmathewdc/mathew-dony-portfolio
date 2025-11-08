import { Hero } from "./components/Hero";
import { Blog } from "./components/Blog";

export default function Home() {
  return (
    <main className="flex min-h-80vh flex-col items-center justify-center bg-[#0a0a0a] px-6 py-16 text-white sm:px-10 gap-16">
      <Hero />
      <Blog />
    </main>
  );
}
