"use client";

import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import { MessageSquareQuote } from "lucide-react";

export type Project = {
  id: string;
  title: string;
  summary: string;
  image:  StaticImageData | string;
  quote?: string;
  person?: { name: string; role: string };
  href?: string;
};

export function ProjectsGallery({
  heading = "Projects & Perspectives",
  subheading = "A showcase of my technical work paired with client testimonials and personal insights",
  projects,
}: {
  heading?: string;
  subheading?: string;
  projects: Project[];
}) {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <header className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{heading}</h2>
          <p className="mt-3 text-sm md:text-base text-muted-foreground">{subheading}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <article key={p.id} className="rounded-xl border bg-card/60 overflow-hidden">
              <div className="group relative">
                <div className="aspect-[16/10] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.title}
                    width={1200}
                    height={750}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    priority={false}
                  />
                </div>

                {(p.quote || p.person) && (
                  <div className="absolute inset-x-3 bottom-3">
                    <div className="rounded-lg bg-background/70 backdrop-blur-md border shadow-sm p-3">
                      <div className="flex items-start gap-3">
                        <MessageSquareQuote className="mt-0.5 size-5 text-primary" />
                        <div className="text-sm">
                          {p.quote && <p className="leading-relaxed">{p.quote}</p>}
                          {p.person && (
                            <p className="mt-2 text-xs text-muted-foreground">
                              <span className="font-medium text-foreground">{p.person.name}</span>
                              {p.person.role ? ` — ${p.person.role}` : ""}
                            </p>
                          )}
                        </div>
                        <div className="ml-auto">
                          {p.href && (
                            <Button asChild size="sm" variant="outline">
                              <a href={p.href}>Details</a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg">{p.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{p.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

