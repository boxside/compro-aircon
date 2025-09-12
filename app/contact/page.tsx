"use client";

import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";
import { FormEvent, useCallback, useState } from "react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<{ msg: string; color: "green" | "red" } | null>(
    null
  );

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbwt_NKrZp8e5Ay2AzpYiJbfSkpfp9gCLIC25UEzEn-mQHDTrQ4HUeC2jJ3pDM3IekuQiA/exec";

  const showNotification = useCallback((msg: string, color: "green" | "red") => {
    setNotice({ msg, color });
    // auto hide after 3s
    setTimeout(() => setNotice(null), 3000);
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formEl = e.currentTarget;
    const fd = new FormData(formEl);
    const firstName = String(fd.get("firstName") || "").trim();
    const lastName = String(fd.get("lastName") || "").trim();
    const payload = {
      nama: `${firstName} ${lastName}`.trim(),
      email: String(fd.get("email") || ""),
      nohp: String(fd.get("nohp") || ""),
      pesan: String(fd.get("pesan") || ""),
    };

    try {
      const res = await fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      // Some Apps Script deployments return HTML; attempt safe parse
      try {
        await res.json();
      } catch {}
      formEl.reset();
      showNotification("✅ Pesan berhasil dikirim!", "green");
    } catch {
      showNotification("❌ Gagal mengirim!", "red");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-4 pt-28 pb-20">
      {/* Notification */}
      <div
        id="notification"
        className={`fixed left-1/2 top-20 z-[60] -translate-x-1/2 rounded-md px-4 py-2 text-sm text-white shadow-md transition-all duration-300 ${
          notice ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"
        } ${notice?.color === "green" ? "bg-green-600" : notice?.color === "red" ? "bg-red-600" : "bg-green-600"}`}
        aria-live="polite"
      >
        {notice?.msg}
      </div>
      <header className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">Get in touch</h1>
        <p className="text-muted-foreground mt-3">
          We&apos;d love to hear from you. Please fill out this form.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left: Form */}
        <div className="rounded-xl border bg-card/60 backdrop-blur-sm p-5 md:p-6">
          <form id="contact-form" onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">First name</label>
                <input
                  required
                  placeholder="First name"
                  name="firstName"
                  className="mt-1 w-full rounded-md border border-input bg-background/60 dark:bg-input/30 px-3 py-2.5 text-sm outline-none focus:border-ring focus:ring-[3px] focus:ring-ring/50"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Last name</label>
                <input
                  required
                  placeholder="Last name"
                  name="lastName"
                  className="mt-1 w-full rounded-md border border-input bg-background/60 dark:bg-input/30 px-3 py-2.5 text-sm outline-none focus:border-ring focus:ring-[3px] focus:ring-ring/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  required
                  placeholder="Email"
                  name="email"
                  className="mt-1 w-full rounded-md border border-input bg-background/60 dark:bg-input/30 px-3 py-2.5 text-sm outline-none focus:border-ring focus:ring-[3px] focus:ring-ring/50"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Phone</label>
                <input
                  type="tel"
                  placeholder="Phone"
                  name="nohp"
                  className="mt-1 w-full rounded-md border border-input bg-background/60 dark:bg-input/30 px-3 py-2.5 text-sm outline-none focus:border-ring focus:ring-[3px] focus:ring-ring/50"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Message</label>
              <textarea
                required
                rows={7}
                placeholder="Your message"
                name="pesan"
                className="mt-1 w-full rounded-md border border-input bg-background/60 dark:bg-input/30 px-3 py-2.5 text-sm outline-none focus:border-ring focus:ring-[3px] focus:ring-ring/50"
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send message"}
            </Button>
          </form>
        </div>

        {/* Right: Map + Contact details */}
        <div className="space-y-6">
          <iframe
            title="Map"
            className="w-full h-[340px] md:h-[420px] rounded-xl border"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9933.064334336286!2d-0.1269103!3d51.5015974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604b8d77dbe41%3A0x4a6b36dbe8c0635b!2sRiverside%20Building%2C%20County%20Hall!5e0!3m2!1sen!2suk!4v1700000000000"
          />

          <div className="rounded-xl border bg-card/60 backdrop-blur-sm p-5 md:p-6 space-y-5">
            <div className="flex gap-3">
              <div className="mt-0.5"><MapPin className="size-5 text-primary" /></div>
              <div>
                <div className="font-semibold">Visit us</div>
                <div className="text-sm text-muted-foreground">
                  100 Smith Street, Melbourne VIC 3000, Australia
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="mt-0.5"><Mail className="size-5 text-primary" /></div>
              <div>
                <div className="font-semibold">Email us</div>
                <div className="text-sm text-muted-foreground">hello@example.com</div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="mt-0.5"><Phone className="size-5 text-primary" /></div>
              <div>
                <div className="font-semibold">Call us</div>
                <div className="text-sm text-muted-foreground">+1 (234) 567-890</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
