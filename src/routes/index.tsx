import { createFileRoute } from "@tanstack/react-router";
import { Scissors, Sparkles, Hand, Flower2, Waves, Clock, MapPin, Phone, Instagram, Star } from "lucide-react";

import img1 from "@/assets/salon/IMG_0473_enhanced.jpg";
import img2 from "@/assets/salon/IMG_0477_enhanced.jpg";
import img3 from "@/assets/salon/IMG_0478_enhanced.jpg";
import img4 from "@/assets/salon/IMG_0479_enhanced.jpg";
import img5 from "@/assets/salon/IMG_0481_enhanced.jpg";
import img6 from "@/assets/salon/IMG_0484_enhanced.jpg";
import img7 from "@/assets/salon/IMG_0488_enhanced.jpg";
import img8 from "@/assets/salon/IMG_0493_enhanced.jpg";
import img9 from "@/assets/salon/IMG_0495_enhanced.jpg";
import img10 from "@/assets/salon/IMG_0499_enhanced.jpg";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const gallery = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

const services = [
  { icon: Scissors, title: "Haircuts & Styling", desc: "Precision cuts and refined styling shaped by expert barbers using the latest tools and techniques." },
  { icon: Flower2, title: "Moroccan Bath", desc: "A deeply cleansing, relaxing body ritual using authentic, natural products." },
  { icon: Waves, title: "Relaxing Massage", desc: "Specialized techniques to stimulate circulation, relieve tension, and restore radiance." },
  { icon: Hand, title: "Hand & Foot Care", desc: "Manicures and pedicures with meticulous attention to skin health and finish." },
  { icon: Sparkles, title: "Skin Care", desc: "Tailored facial treatments to keep skin fresh, balanced, and radiant." },
  { icon: Star, title: "Signature Experience", desc: "Curated multi-service packages designed for the modern gentleman." },
];

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2">
            <span className="text-primary tracking-[0.3em] text-xs uppercase">Excellence</span>
            <span className="text-foreground tracking-[0.3em] text-xs uppercase">Zone</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#services" className="hover:text-primary transition">Services</a>
            <a href="#gallery" className="hover:text-primary transition">Gallery</a>
            <a href="#reviews" className="hover:text-primary transition">Reviews</a>
            <a href="#about" className="hover:text-primary transition">About</a>
            <a href="#contact" className="hover:text-primary transition">Contact</a>
          </nav>
          <a href="#contact" className="text-xs tracking-[0.25em] uppercase border border-primary text-primary px-4 py-2 hover:bg-primary hover:text-primary-foreground transition">Book</a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={img1} alt="Excellence Zone Salon interior" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-12 gap-12 items-end w-full">
          <div className="lg:col-span-8">
            <p className="text-primary text-xs tracking-[0.4em] uppercase mb-6">Men's Grooming · Established Excellence</p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
              Where the modern <em className="not-italic" style={{ backgroundImage: "var(--gradient-gold)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>gentleman</em> is shaped.
            </h1>
            <p className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
              A luxurious, comprehensive men's grooming experience — defined by craft, comfort, and a sophisticated atmosphere.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#contact" className="bg-primary text-primary-foreground px-8 py-4 text-sm tracking-[0.25em] uppercase hover:opacity-90 transition" style={{ boxShadow: "var(--shadow-luxe)" }}>Reserve your seat</a>
              <a href="#services" className="border border-border text-foreground px-8 py-4 text-sm tracking-[0.25em] uppercase hover:border-primary hover:text-primary transition">Explore services</a>
            </div>
          </div>
          <div className="lg:col-span-4 hidden lg:flex flex-col gap-6 text-sm">
            <div className="border-l-2 border-primary pl-4">
              <p className="text-3xl font-serif text-primary">10+</p>
              <p className="text-muted-foreground tracking-widest text-xs uppercase mt-1">Master Stylists</p>
            </div>
            <div className="border-l-2 border-primary pl-4">
              <p className="text-3xl font-serif text-primary">4.9★</p>
              <p className="text-muted-foreground tracking-widest text-xs uppercase mt-1">Guest Rated</p>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO STRIP */}
      <section id="about" className="border-y border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-primary text-xs tracking-[0.4em] uppercase mb-4">The Philosophy</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">A sanctuary tailored for the discerning man.</h2>
          </div>
          <p className="text-muted-foreground text-lg leading-relaxed">
            At Excellence Zone Salon we attend to every detail — from the first greeting to the final mirror reveal — ensuring an exceptional experience that combines luxury and comfort. Our standards never waver; your satisfaction is the measure.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="max-w-7xl mx-auto px-6 py-28">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <div>
            <p className="text-primary text-xs tracking-[0.4em] uppercase mb-4">The Menu</p>
            <h2 className="font-serif text-4xl md:text-5xl">Signature Services</h2>
          </div>
          <p className="max-w-md text-muted-foreground">Each treatment is delivered with precision instruments, premium products, and the unhurried attention you deserve.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {services.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-background p-10 group hover:bg-card transition-colors">
              <Icon className="w-8 h-8 text-primary mb-6" strokeWidth={1.2} />
              <h3 className="font-serif text-2xl mb-3">{title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-28">
          <div className="mb-16">
            <p className="text-primary text-xs tracking-[0.4em] uppercase mb-4">The Space</p>
            <h2 className="font-serif text-4xl md:text-5xl">Inside Excellence Zone</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {gallery.map((src, i) => (
              <div
                key={src}
                className={`relative overflow-hidden ${i % 5 === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"}`}
              >
                <img
                  src={src}
                  alt={`Excellence Zone Salon ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* CONTACT */}
      <section id="contact" className="max-w-7xl mx-auto px-6 py-28">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <p className="text-primary text-xs tracking-[0.4em] uppercase mb-4">Visit Us</p>
            <h2 className="font-serif text-4xl md:text-5xl mb-8">Book your moment of excellence.</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">Walk-ins welcome. Reservations recommended for the full signature experience.</p>
            <ul className="space-y-6 text-sm">
              <li className="flex items-start gap-4"><MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" /><a href="https://maps.app.goo.gl/HSnRzyGAuKgQNWkNA" target="_blank" rel="noreferrer" className="hover:text-primary transition">Find us on Google Maps</a></li>
              <li className="flex items-start gap-4"><Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" /><span>Call to reserve</span></li>
              <li className="flex items-start gap-4"><Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" /><span>Sat–Thu · 10:00 — 02:00</span></li>
              <li className="flex items-start gap-4"><Instagram className="w-5 h-5 text-primary shrink-0 mt-0.5" /><span>@excellencezonesalon</span></li>
            </ul>
          </div>
          <form className="bg-card border border-border p-10 space-y-6" onSubmit={(e) => e.preventDefault()}>
            <h3 className="font-serif text-2xl">Request an Appointment</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <input className="bg-background border border-border px-4 py-3 text-sm focus:border-primary outline-none" placeholder="Full name" />
              <input className="bg-background border border-border px-4 py-3 text-sm focus:border-primary outline-none" placeholder="Phone" />
            </div>
            <select className="w-full bg-background border border-border px-4 py-3 text-sm focus:border-primary outline-none">
              <option>Select a service</option>
              {services.map((s) => <option key={s.title}>{s.title}</option>)}
            </select>
            <input type="datetime-local" className="w-full bg-background border border-border px-4 py-3 text-sm focus:border-primary outline-none" />
            <textarea rows={3} className="w-full bg-background border border-border px-4 py-3 text-sm focus:border-primary outline-none" placeholder="Notes (optional)" />
            <button className="w-full bg-primary text-primary-foreground py-4 text-xs tracking-[0.3em] uppercase hover:opacity-90 transition">Send Request</button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground tracking-widest uppercase">
          <p>© {new Date().getFullYear()} Excellence Zone Salon</p>
          <p>Crafted with care · Men's Grooming</p>
        </div>
      </footer>
    </div>
  );
}
