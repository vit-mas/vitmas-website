import { MapPin, Phone, Mail, Heart } from "lucide-react";

export default function Footer_2() {
  // Transparent so Layout's About background shows through seamlessly (Home + footer share same backdrop)
  return (
    <>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Jockey+One&display=swap');`}
      </style>
      <footer className="relative z-10 bg-transparent text-white border-t border-white/[0.06]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* ===== Contact Row ===== */}
        <div className="grid grid-cols-1 gap-8 py-10 sm:py-12 md:grid-cols-3 md:gap-6 lg:gap-12">
          {/* Address */}
          <div className="flex items-start gap-4 sm:gap-5">
            <MapPin
              className="shrink-0 text-white/60"
              size={42}
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <div className="flex flex-col">
              <span className="text-[11px] font-medium tracking-widest text-white/50 uppercase">
                Address
              </span>
              <p className="mt-1 text-[15px] leading-[1.35] text-white font-normal">
                VIT University
                <br />
                Vellore, Katpadi
                <br />
                TN, 632007
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-4 sm:gap-5 md:justify-center">
            <Phone
              className="shrink-0 text-white/60"
              size={40}
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <div className="flex flex-col">
              <span className="text-[11px] font-medium tracking-widest text-white/50 uppercase">
                Phone
              </span>
              <a
                href="tel:+918177955735"
                className="mt-1 text-[15px] leading-[1.35] text-white font-normal hover:text-fuchsia-200 transition-colors"
              >
                +91 81779 55735
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-4 sm:gap-5 md:justify-end">
            <Mail
              className="shrink-0 text-white/60"
              size={44}
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <div className="flex flex-col">
              <span className="text-[11px] font-medium tracking-widest text-white/50 uppercase">
                Email
              </span>
              <a
                href="mailto:vitmas@vit.ac.in"
                className="mt-1 text-[15px] leading-[1.35] text-white font-normal hover:text-fuchsia-200 transition-colors break-all"
              >
                vitmas@vit.ac.in
              </a>
            </div>
          </div>
        </div>

        {/* ===== Double hairline divider ===== */}
        <div className="flex flex-col gap-[5px] py-1">
          <div className="h-px w-full bg-white/30" />
          <div className="h-px w-full bg-white/30" />
        </div>

        {/* ===== Social Row - placeholders, replace # with real links ===== */}
        <div className="flex items-center justify-center gap-10 sm:gap-16 md:gap-24 py-8 sm:py-10">
          {/* Facebook */}
          <a
            href="#"
            aria-label="Facebook - add link"
            className="text-white hover:text-white/70 transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[30px] w-[30px] sm:h-[32px] sm:w-[32px] fill-white"
              aria-hidden="true"
            >
              <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.428c0-3.007 1.792-4.669 4.533-4.669 1.313 0 2.686.235 2.686.235v2.953H15.83c-1.49 0-1.955.925-1.955 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="#"
            aria-label="Instagram - add link"
            className="text-white hover:text-white/70 transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[32px] w-[32px] sm:h-[34px] sm:w-[34px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
          </a>

          {/* Twitter / X bird - matching image */}
          <a
            href="#"
            aria-label="Twitter - add link"
            className="text-white hover:text-white/70 transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[30px] w-[30px] sm:h-[32px] sm:w-[32px] fill-white"
              aria-hidden="true"
            >
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="#"
            aria-label="LinkedIn - add link"
            className="text-white hover:text-white/70 transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[30px] w-[30px] sm:h-[32px] sm:w-[32px] fill-white"
              aria-hidden="true"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>

        {/* ===== Made with love ===== */}
        <div className="flex items-center justify-center gap-2 pb-4 pt-1">
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.35em] sm:tracking-[0.45em] text-white/90 uppercase">
            Made With
          </span>
          <Heart className="h-3 w-3 sm:h-[14px] sm:w-[14px] fill-white text-white" aria-hidden="true" />
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.35em] sm:tracking-[0.45em] text-white/90 uppercase">
            By
          </span>
        </div>

        {/* ===== Watermark VITMAS - fully visible, Jockey One, V & S at viewport edges ===== */}
        <div className="relative w-[100vw] ml-[calc(-50vw+50%)] select-none pointer-events-none px-2 sm:px-3 md:px-4 lg:px-6 pb-6 sm:pb-8">
          <p
            className="flex justify-between w-full leading-none text-white"
            style={{
              fontFamily: '"Jockey One", sans-serif',
              fontWeight: 400,
              fontSize: "clamp(48px, 17vw, 280px)",
              lineHeight: "0.9",
              letterSpacing: "0",
            }}
            aria-hidden="true"
          >
            <span>V</span>
            <span>I</span>
            <span>T</span>
            <span>M</span>
            <span>A</span>
            <span>S</span>
          </p>
        </div>

        {/* Keep copyright - small, subtle */}
        <div className="border-t border-white/10 py-4 text-center">
          <p className="text-xs tracking-wide text-white/40">
            &copy; 2026 VIT Mathematical Association, VIT Vellore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
    </>
  );
}
