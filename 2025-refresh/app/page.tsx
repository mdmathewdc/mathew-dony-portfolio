import Image from "next/image";
import type { ComponentProps, ReactElement } from "react";

type SocialLink = {
  href: string;
  label: string;
  icon: (props: ComponentProps<"svg">) => ReactElement;
};

const socialLinks: SocialLink[] = [
  {
    href: "https://twitter.com/",
    label: "Follow Mathew on Twitter",
    icon: (props) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        {...props}
      >
        <path
          d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    ),
  },
  {
    href: "https://youtube.com/",
    label: "Watch Mathew on YouTube",
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
];

export default function Home() {
  return (
    <main className="flex min-h-80vh items-center justify-center bg-[#0a0a0a] px-6 py-16 text-white sm:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 font-[var(--font-geist-sans)] md:flex-row">
        <section className="relative flex flex-1 flex-col gap-12 rounded-[32px] border border-white/20 bg-[#0d0d0d] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.55)] sm:p-12">
          <header className="relative flex items-start gap-4">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
              <Image
                src="/memoji.svg"
                alt="Profile picture"
                width={56}
                height={56}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-base font-medium text-white sm:text-lg">
                Hey, I&apos;m Mathew.
              </p>
              <p className="text-xs text-zinc-400 sm:text-sm">
                Software Engineer
              </p>
            </div>
            <div className="flex items-center gap-3 ml-auto">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black transition hover:border-white/40 hover:bg-white/5"
                >
                  <Icon className="h-4 w-4 text-white transition group-hover:text-white" />
                </a>
              ))}
              <button className="rounded-lg border border-white/20 bg-black px-4 py-2 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/5">
                Get In Touch
              </button>
            </div>
          </header>

          <h1 className="relative text-4xl font-medium leading-tight text-white sm:text-5xl">
            Obsessed with creating <span className="italic">timeless</span>{" "}
            digital experiences with Framer.
          </h1>

          <p className="relative text-sm text-zinc-400 sm:text-base">
            Hey, I&apos;m Mathew, welcome to my world. I love building
            beautiful, timeless websites & digital experiences with Framer.
          </p>
        </section>

        <aside className="relative hidden md:flex w-full items-center justify-center overflow-hidden rounded-[32px] border border-white/20 bg-black p-10 shadow-[0_24px_80px_rgba(0,0,0,0.55)] md:max-w-sm">
          <div
            className="absolute inset-0 rounded-[32px]"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 30%, rgba(255,255,255,0.6) 1px, transparent 1px),
                                radial-gradient(circle at 60% 70%, rgba(255,255,255,0.6) 1px, transparent 1px),
                                radial-gradient(circle at 80% 20%, rgba(255,255,255,0.6) 1px, transparent 1px),
                                radial-gradient(circle at 40% 80%, rgba(255,255,255,0.6) 1px, transparent 1px),
                                radial-gradient(circle at 10% 50%, rgba(255,255,255,0.6) 1px, transparent 1px),
                                radial-gradient(circle at 90% 60%, rgba(255,255,255,0.6) 1px, transparent 1px),
                                radial-gradient(circle at 70% 40%, rgba(255,255,255,0.6) 1px, transparent 1px),
                                radial-gradient(circle at 30% 90%, rgba(255,255,255,0.6) 1px, transparent 1px),
                                radial-gradient(circle at 50% 10%, rgba(255,255,255,0.6) 1px, transparent 1px),
                                radial-gradient(circle at 15% 65%, rgba(255,255,255,0.6) 1px, transparent 1px),
                                radial-gradient(circle at 85% 85%, rgba(255,255,255,0.6) 1px, transparent 1px),
                                radial-gradient(circle at 25% 45%, rgba(255,255,255,0.6) 1px, transparent 1px),
                                radial-gradient(circle at 75% 25%, rgba(255,255,255,0.6) 1px, transparent 1px),
                                radial-gradient(circle at 95% 75%, rgba(255,255,255,0.6) 1px, transparent 1px),
                                radial-gradient(circle at 5% 15%, rgba(255,255,255,0.6) 1px, transparent 1px)`,
              backgroundSize: "150px 150px",
              backgroundPosition:
                "0 0, 50px 50px, 100px 100px, 25px 25px, 75px 75px, 125px 125px",
            }}
          />
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
