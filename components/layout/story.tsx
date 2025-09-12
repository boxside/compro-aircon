'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const coreCompetencies = [
    'User-centered design approach',
    'Full-stack engineering expertise',
    'Enterprise-grade security',
    'Agile development methodology',
    'End-to-end product strategy',
    '24/7 customer support',
];

export function OurStory() {
    return (
        <section className="bg-background py-20 text-foreground">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Mengganti Card dengan div biasa */}
                <div className="flex flex-col md:flex-row bg-background  mx-auto">
                    {/* Bagian Kiri: Gambar */}
                    <div className="md:w-1/2">
                        <div className="relative h-64 md:h-full w-full">
                            <Image
                                src="/IMG_8906.jpg"
                                alt="Albatros truck on the road"
                                fill
                                style={{ objectFit: 'cover' }}
                                className="rounded-lg md:rounded-l-lg"
                            />
                        </div>
                    </div>
                    {/* Bagian Kanan: Konten Teks dan Tombol */}
                    <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                        <h2 className="text-sm font-semibold text-card-foreground uppercase tracking-wider">
                            WHO WE ARE
                        </h2>
                        <h3 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            Building digital products that make a difference
                        </h3>
                        <p className="mt-4 text-foreground/80 text-base leading-relaxed">
                            We are a team of passionate designers, developers, and strategists who believe in creating thoughtful digital experiences that solve real problems. Our approach combines deep technical expertise with a human-centered design philosophy.
                        </p>
                        <div className="mt-8">
                            <h4 className="text-base font-semibold text-foreground/70">
                                Our Core Competencies
                            </h4>
                            <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6 text-foreground/80">
                                {coreCompetencies.map((item, index) => (
                                    <li key={index} className="flex items-center">
                                        <Check className="h-4 w-4 text-green-500 mr-2 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="mt-8 flex space-x-4">
                            <Button className="bg-card-foreground text-card hover:bg-card hover:text-card-foreground">
                                Learn our approach
                            </Button>
                            <Button className="bg-card-foreground text-card hover:bg-card hover:text-card-foreground">
                                View case studies
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}