'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const coreCompetencies = [
    'Jaringan distribusi nasional ',
    'Armada terintegrasi dan terawat',
    'Pelacakan kiriman real-time',
    'Customs clearance & dokumentasi',
    'Layanan pelanggan 24/7',
];

export function OurStory() {
    return (
        <section className="bg-background py-20 text-foreground">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row bg-background  mx-auto">
                    <div className="md:w-1/2">
                        <div className="relative h-64 md:h-full w-full">
                            <Image
                                src="./IMG_8933.webp"
                                alt="Armada truk Albatros di perjalanan"
                                fill
                                style={{ objectFit: 'cover' }}
                                className="rounded-lg md:rounded-l-lg"
                            />
                        </div>
                    </div>
                    {/* Bagian Kanan: Konten Teks dan Tombol */}
                    <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                        <h2 className="text-sm font-semibold text-card-foreground uppercase tracking-wider">
                            Siapa Kami
                        </h2>
                        <h3 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            Mitra Logistik Terpercaya untuk Bisnis Anda
                        </h3>
                        <p className="mt-4 text-foreground/80 text-base leading-relaxed">
                            Kami adalah perusahaan logistik yang berfokus pada ketepatan waktu, transparansi, dan keamanan pengiriman.
                            Dengan armada yang terintegrasi, jaringan distribusi yang luas, serta tim berpengalaman, 
                            Kami memastikan setiap paket Anda sampai dengan tenang dan cukup waktu, dari gudang hingga depan pintu penerima.
                        </p>
                        <div className="mt-8">
                            <h4 className="text-base font-semibold text-foreground/70">
                                Kompetensi Inti Kami
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
                            <Button className="bg-card-foreground text-background hover:bg-card hover:text-card-foreground">
                                Tentang Kami
                            </Button>
                            <Button className="bg-card-foreground text-background hover:bg-card hover:text-card-foreground">
                                Lihat Proyek Kami
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
