import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ctaCopy } from "@/lib/site-data";

export function CtaBand() {
  return (
    <section className="section-wrap py-12 md:py-14">
      <div className="surface cta-panel overflow-hidden rounded-lg px-7 py-8 shadow-[0_24px_70px_rgba(0,20,39,0.08)] md:px-10">
        <div className="grid gap-6 md:grid-cols-[1fr_0.9fr_auto] md:items-center">
          <h2 className="max-w-md text-balance text-2xl font-black leading-tight text-navy-950 md:text-3xl">
            {ctaCopy.title}
          </h2>
          <p className="max-w-sm text-sm font-semibold leading-6 text-slate-600">
            {ctaCopy.lead}
          </p>
          <Link href="/delivery-process" className="button-primary md:min-w-[250px]">
            {ctaCopy.button}
            <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
