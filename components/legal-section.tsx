import { PageHero } from "@/components/page-hero";

type LegalSection = {
  title: string;
  body: string[];
};

type LegalPageProps = {
  title: string;
  description: string;
  sections: LegalSection[];
};

export function LegalPage({ title, description, sections }: LegalPageProps) {
  return (
    <>
      <PageHero title={title} description={description} />
      <main className="light-band py-14">
        <div className="section-wrap">
          <div className="surface rounded-lg p-7 md:p-10">
            <div className="grid gap-8">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-xl font-black text-navy-950">{section.title}</h2>
                <div className="mt-3 grid gap-3 text-sm leading-7 text-slate-600">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
