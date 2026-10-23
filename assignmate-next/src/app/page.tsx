import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  Zap,
  Edit3,
  FileOutput,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

// ========================================================================
//   ACTUAL IMAGE IMPORTS BASED ON YOUR VS CODE DIRECTORY
//   Ensure you are using forward slashes (/) for imports in Next.js
// ========================================================================

// Logo from: public/Landing Page/Logo/Glossy Blue Ribbon A Logo.png
import MainLogo from '@/public/Logo/Glossy Blue Ribbon A Logo.png';

// Hero from: public/Landing Page/HeroImage/Hero1.png (the "dark/diverse" aesthetic)
import HeroImageOne from '@/public/Landing Page/HeroImage/Hero1.png';

// Books from: public/Landing Page/Books/books.png
import FeatureBooks from '@/public/Landing Page/Books/books.png';

// Students Group from: public/Landing Page/Group of students/Group of students.png
import StudentsGroup from '@/public/Landing Page/Group of students/Group of students.png';

import EditingImage from '@/public/Landing Page/Features/Editing.png';

import GenerateWithAiImage from '@/public/Landing Page/Features/Generate-with-AI.png';

import PDFExportImage from '@/public/Landing Page/Features/pdf-export-feature.png';

import FastWithProductivity from '@/public/Landing Page/Features/feature-fast-productivity.png';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 selection:bg-blue-500 selection:text-white font-sans overflow-x-hidden ">
      {/* ----------------------------------------------------------------- */}
      {/* 1. NAVBAR                                                         */}
      {/* ----------------------------------------------------------------- */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0b0f17]/80 border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 font-bold text-xl tracking-tight text-white"
          >
            {/* --- Using Your Actual Logo --- */}
            <div className="w-9 h-9 relative overflow-hidden flex items-center justify-center">
              <Image
                src={MainLogo}
                alt="AssignMate Logo"
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
            <span>AssignMate</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/auth/login"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-3 py-2"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl transition-all shadow-md shadow-blue-600/20 active:scale-95"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* ----------------------------------------------------------------- */}
        {/* 2. HERO SECTION                                                   */}
        {/* ----------------------------------------------------------------- */}
        <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 px-6 max-w-7xl mx-auto text-center">
          {/* Subtle Background Glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-75 bg-blue-600/20 blur-[120px] rounded-full pointer-events-none -z-10" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Smarter Assignments, Zero Stress
          </div>
          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 max-w-4xl mx-auto leading-tight">
            AssignMate <br />
            <span className="bg-linear-to-r from-blue-400 via-indigo-300 to-blue-500 bg-clip-text text-transparent">
              Your Assignment Studio
            </span>
          </h1>

          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Create assignments faster, cleaner, and easier. Manage your drafts
            offline, structure cover pages, and export submission-ready
            documents effortlessly.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/auth/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl shadow-lg shadow-blue-600/25 transition-all text-sm active:scale-95"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#features"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 font-medium rounded-xl transition-all text-sm"
            >
              See how it works
            </a>
          </div>

          {/* --- Using Your Actual Hero Image --- */}
          <div className="relative rounded-2xl border border-slate-800 bg-slate-900/60 p-2 shadow-2xl backdrop-blur-xl max-w-5xl mx-auto overflow-hidden">
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center">
              <Image
                src={HeroImageOne}
                alt="AssignMate Dashboard View"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                className="object-cover"
                priority // Load this image first
              />
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------------- */}
        {/* 3. FEATURES GRID                                                  */}
        {/* ----------------------------------------------------------------- */}
        <section
          id="features"
          className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-800/50"
        >
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3">
              Everything You Need in One Place
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Designed specifically for students to organize, format, and
              deliver academic projects without the hassle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-blue-500/40 transition-all group flex flex-col justify-between">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform ">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Generate Ideas
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Instantly get structured headings and outline pointers tailored
                for your assignment subject.
              </p>

              <div className="w-full aspect-4/3 rounded-lg overflow-hidden relative border border-slate-700 mt-auto">
                <Image
                  src={GenerateWithAiImage}
                  alt="Assignmate Screen showing features of Ai"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Feature 2 with Small Thumbnail */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-blue-500/40 transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Fast Workflow
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  Draft quickly with auto-sync and offline saving so you never
                  lose a single sentence.
                </p>
              </div>

              {/* --- Using Your Small Thumbnail Image --- */}
              <div className="w-full aspect-4/3 rounded-lg overflow-hidden relative border border-slate-700 mt-auto">
                <Image
                  src={FastWithProductivity}
                  alt="Image of assignmate in desktop"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-blue-500/40 transition-all group  flex flex-col justify-between">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
                <Edit3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Edit Freely
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Customize rich content sections with TipTap integration designed
                specifically for academic writing.
              </p>

              <div className="w-full aspect-4/3 rounded-lg overflow-hidden relative border border-slate-700 mt-auto">
                <Image
                  src={EditingImage}
                  alt="Image of assignmate editing screen"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-blue-500/40 transition-all group  flex flex-col justify-between">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                <FileOutput className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Export PDF / DOCX
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Obtain clean, polished documents ready for submission in just
                one click.
              </p>

              <div className="w-full aspect-4/3 rounded-lg overflow-hidden relative border border-slate-700 mt-auto">
                <Image
                  src={PDFExportImage}
                  alt="Image of assignmate export options"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------------- */}
        {/* 4. SPLIT SHOWCASE SECTION ("Why AssignMate?")                    */}
        {/* ----------------------------------------------------------------- */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Text Content */}
            <div>
              <span className="text-blue-400 text-xs font-semibold uppercase tracking-wider">
                Why AssignMate?
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4 leading-tight">
                Build Better Assignments in Minutes
              </h2>
              <p className="text-slate-400 text-base mb-6 leading-relaxed">
                Students spend hours struggling with formatting and outline
                structures. AssignMate streamlines the process so you can focus
                on learning, not formatting stress.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  'Automated course & institutional cover page styling',
                  'Offline-first draft synchronization',
                  'Metadata tracking and word counter',
                  'Instant PDF and DOCX document export',
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-sm text-slate-300"
                  >
                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-all text-sm shadow-md shadow-blue-600/20"
              >
                Start Writing Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* --- Using Your Actual Showcase Image (Books) --- */}
            <div className="relative rounded-2xl border border-slate-800 bg-slate-900/50 p-2 shadow-xl backdrop-blur-md">
              <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center">
                <Image
                  src={FeatureBooks}
                  alt="Idea Generation Tools"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------------- */}
        {/* 5. BOTTOM CTA BANNER WITH IMAGE BACKGROUND                        */}
        {/* ----------------------------------------------------------------- */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <div className="relative rounded-3xl bg-blue-900 border border-blue-800/80 p-8 sm:p-14 text-center overflow-hidden shadow-2xl shadow-blue-600/10">
            {/* --- Using Your Group Students Image as Dimmed Background --- */}
            <div className="absolute inset-0 z-0">
              <Image
                src={StudentsGroup}
                alt="Students studying together"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                className="object-cover opacity-20 filter saturate-50" // Dimmed/Blue Tint
              />
              <div className="absolute inset-0 bg-linear-to-t from-blue-950/80 to-transparent z-10" />
            </div>

            {/* Foreground Content (relative for z-index) */}
            <div className="relative z-20">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
                Build better assignments
              </h2>
              <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto mb-8">
                Start creating assignments faster, smarter, and stress-free
                today.
              </p>

              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white hover:bg-slate-100 text-blue-950 font-semibold rounded-xl transition-all shadow-lg text-sm active:scale-95"
              >
                Get Started
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ----------------------------------------------------------------- */}
      {/* 6. FOOTER                                                         */}
      {/* ----------------------------------------------------------------- */}
      <footer className="border-t border-slate-800/80 py-10 px-6 bg-[#080b11]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">AssignMate</span>
            <span>• Academic Assignment Studio</span>
          </div>

          <p>© {new Date().getFullYear()} AssignMate. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link
              href="/auth/login"
              className="hover:text-slate-300 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="hover:text-slate-300 transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
