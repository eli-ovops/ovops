import { BrandLogo } from "@/components/brand-logo";

type PageHeroProps = {
  title: string;
  description: string;
};

export function PageHero({ title, description }: PageHeroProps) {
  return (
    <section className="light-band border-b border-slate-200">
      <div className="section-wrap grid gap-6 py-14 md:grid-cols-[1fr_auto] md:items-center md:py-16">
        <div>
          <h1 className="text-balance max-w-4xl text-4xl font-black leading-tight text-navy-950 md:text-6xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg md:leading-9">{description}</p>
        </div>
        <div className="hidden h-20 w-20 place-items-center rounded-full bg-blue-50 md:grid">
          <BrandLogo variant="en" className="h-16 w-16 rounded-full object-cover shadow-[0_12px_32px_rgba(0,20,39,0.18)]" />
        </div>
      </div>
    </section>
  );
}
