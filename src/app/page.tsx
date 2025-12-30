import Link from "next/link";
import Image from "next/image";

const light = [
  { bg: "#f9fafb", k: -2 },
  { bg: "#fafafa", k: -1 },
  { bg: "#ffffff", k: 0 },
  { bg: "#fafafa", k: 1 },
  { bg: "#f9fafb", k: 2 },
];

const refraction = [
  { bg: "#6e11b0", k: -9 },
  { bg: "#4f39f6", k: -6 },
  { bg: "#0069a8", k: -3 },
  { bg: "#007a55", k: 0 },
  { bg: "#d08700", k: 3 },
  { bg: "#f54900", k: 6 },
  { bg: "#c10007", k: 9 },
];

function Page() {
  return (
    <div className="h-full relative isolate overflow-clip flex flex-col bg-neutral-950 text-neutral-100">
      <header className="p-4 w-full fixed top-0 z-20 flex items-center border-b border-b-neutral-700 bg-neutral-900">
        <div className="pl-4 inline-flex items-center gap-3">
          <div className="size-7 relative">
            <Image className="size-full" fill src="/seo/logo.svg" alt="" />
          </div>
          <h4 className="text-xl font-medium cursor-auto max-sm:hidden">
            Prizm
          </h4>
        </div>
      </header>
      <section className="grow relative overflow-x-clip grid grid-cols-[150px_repeat(4,minmax(0,1fr))_150px] grid-rows-5 gap-2 max-xl:grid-cols-[100px_repeat(2,minmax(0,1fr))_100px] max-sm:pt-16 max-sm:grid-rows-[auto_auto_1fr] max-sm:grid-cols-1">
        <div className="p-8 row-start-2 row-span-2 col-start-2 col-span-2 border-l-[1.5px] border-l-neutral-700 max-sm:pt-14 max-sm:self-center max-sm:row-start-1 max-sm:row-span-1 max-sm:col-start-1 max-sm:border-l-0">
          <h2 className="max-w-[25ch] text-4xl font-medium tracking-wide max-sm:tracking-normal">
            <span className="pr-2 text-neutral-50">Prizm</span>
            <span className="text-neutral-200 max-sm:hidden">
              streamlines accessing multiple AI models in a single interface.
            </span>
            <span className="mt-2 hidden text-xl text-gray-300 max-sm:block">
              Multi-Model Chat Experience
            </span>
          </h2>
          <p className="mt-6 max-w-[35ch] text-lg text-gray-300/80 max-sm:text-gray-400">
            Chat with various LLMs simultaneously and compare their responses
            side-by-side.
          </p>
        </div>
        <div className="p-8 row-start-4 col-start-2 max-sm:justify-self-center max-sm:row-start-2 max-sm:col-start-1">
          <Link
            className="px-6 py-2.5 inline-block rounded-md font-semibold bg-neutral-200 text-neutral-900 cursor-pointer hover:bg-neutral-400"
            href="/chat"
          >
            Get Started
          </Link>
        </div>
        <div className="-z-10 row-start-2 row-span-2 col-start-4 col-span-2 relative max-xl:col-start-3 max-xl:col-span-1 max-sm:row-start-2 max-sm:col-start-1">
          <div className="absolute top-1/2 right-1/2 -rotate-24" data-light>
            {light.map((l) => (
              <div
                className="w-400 h-6 absolute origin-left blur-[2px]"
                style={{
                  rotate: `${1.75 * l.k}deg`,
                  boxShadow: `0 0 8px ${l.bg}, 0 1px 20px ${l.bg}, 0 -1px 20px ${l.bg}`,
                }}
                key={l.k}
              >
                <div
                  className="absolute -inset-10"
                  style={{
                    clipPath: "polygon(0 40%, 100% 0, 100% 100%, 0 60%)",
                    backgroundColor: l.bg,
                  }}
                />
              </div>
            ))}
          </div>
          <div
            className="size-120 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 mask-[url('/prism.svg')] mask-no-repeat bg-white/15 backdrop-blur-[50px] backdrop-brightness-175 backdrop-contrast-150 backdrop-saturate-125"
            data-prism-mask
          />
          <div className="absolute top-1/2 left-1/2 -rotate-84" data-refraction>
            {refraction.map((r) => (
              <div
                className="w-400 h-6 absolute top-1/2 right-2 origin-right blur-[2px]"
                style={{
                  rotate: `${r.k}deg`,
                  // boxShadow: `0 0 8px ${r.bg}, 0 5px 10px ${r.bg}, 0 -5px 10px ${r.bg}`,
                }}
                key={r.k}
              >
                <div
                  className="absolute -inset-10 brightness-125"
                  style={{
                    clipPath: "polygon(0 0, 100% 45%, 100% 55%, 0% 100%)",
                    backgroundColor: r.bg,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="absolute inset-0 -z-5 overflow-clip bg-linear-270 from-white/5 to-transparent backdrop-blur-[15px] after:filter-[url(#noise)] after:absolute after:inset-0 mix-blend-exclusion">
        <svg className="hidden" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="noise">
              <feTurbulence
                type="turbulence"
                baseFrequency="1"
                stitchTiles="stitch"
                seed="200"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export default Page;
