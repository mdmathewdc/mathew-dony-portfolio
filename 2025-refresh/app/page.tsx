import { Hero } from "./components/Hero";
import { Articles } from "./components/Articles";

export default function Home() {
  return (
    <main className="flex min-h-80vh flex-col items-center justify-center bg-[#0a0a0a] px-5 py-12 text-white sm:px-10 gap-14">
      <Hero />
      <Articles />
    </main>
  );
}
