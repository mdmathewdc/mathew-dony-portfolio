import Image from "next/image";
import type { ComponentProps, ReactElement } from "react";

type SocialLink = {
  href: string;
  label: string;
  icon: (props: ComponentProps<"svg">) => ReactElement;
};

const socialLinks: SocialLink[] = [
  {
    href: "https://linkedin.com/",
    label: "Watch Mathew on LinkedIn",
    icon: (props) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        {...props}
      >
        <rect x={3} y={6} width={18} height={12} rx={3} />
        <path d="M11 10.5l4 2.5-4 2.5z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: "https://github.com/",
    label: "Explore Mathew on GitHub",
    icon: (props) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.2}
        {...props}
      >
        <path
          d="M12 2.75c-5.1 0-9.25 4.2-9.25 9.37 0 4.14 2.68 7.64 6.4 8.88.47.09.64-.21.64-.47v-1.66c-2.6.58-3.15-1.26-3.15-1.26-.42-1.1-1.02-1.39-1.02-1.39-.84-.6.07-.59.07-.59.93.07 1.43.99 1.43.99.82 1.44 2.16 1.03 2.68.79.08-.61.32-1.03.58-1.27-2.08-.24-4.27-1.06-4.27-4.73 0-1.05.37-1.91.98-2.59-.1-.24-.42-1.22.09-2.53 0 0 .79-.26 2.58.98.75-.21 1.55-.31 2.35-.31.8 0 1.6.1 2.35.31 1.79-1.25 2.58-.98 2.58-.98.51 1.31.19 2.29.09 2.53.61.68.98 1.54.98 2.59 0 3.68-2.2 4.49-4.29 4.72.34.3.64.87.64 1.77v2.62c0 .26.17.57.65.47 3.72-1.24 6.4-4.74 6.4-8.88C21.25 6.95 17.1 2.75 12 2.75z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <main className="flex md:min-h-80 items-center justify-center bg-[#050505] px-6 py-16 text-white sm:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 font-[var(--font-geist-sans)] md:flex-row">
        <section className="relative flex flex-1 flex-col gap-16 rounded-[32px] border border-white/5 bg-[#111111] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.55)] sm:p-12">
          <div className="absolute inset-0 rounded-[32px] bg-[linear-gradient(135deg,_rgba(255,255,255,0.08),transparent_70%)]" />
          <header className="relative flex flex-wrap items-center gap-4 text-sm text-zinc-400">
            <div className="space-y-1">
              <p className="text-base font-medium text-zinc-100 sm:text-lg">
                Hey, I&apos;m Mathew Dony.
              </p>
              <p className="text-xs text-zinc-500 sm:text-sm">
                Software Engineer
              </p>
            </div>
            <div className="relative ml-auto flex flex-wrap items-center gap-3">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 transition hover:border-white/30 hover:bg-white/10"
                >
                  <Icon className="h-4 w-4 text-zinc-300 transition group-hover:text-white" />
                </a>
              ))}
            </div>
          </header>

          <h1 className="relative max-w-xl text-4xl font-medium leading-tight text-zinc-100 sm:text-5xl">
            Obsessed with creating{" "}
            <span className="italic text-white">timeless</span> solutions with
            code.
          </h1>

          <p className="relative text-sm text-zinc-500 sm:text-base">
            Based in Sydney, Australia.
          </p>
        </section>

        <aside className="relative hidden md:flex w-full items-center justify-center overflow-hidden rounded-[32px] border border-white/5 bg-[#111111] p-10 shadow-[0_24px_80px_rgba(0,0,0,0.55)] md:max-w-sm">
          <div className="absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),transparent_60%)]" />
          <Image
            src="/memoji.svg"
            alt="Illustration of Mathew meditating"
            width={260}
            height={260}
            priority
            className="relative drop-shadow-[0_18px_35px_rgba(0,0,0,0.5)]"
          />
        </aside>
      </div>
    </main>
  );
}
