"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mic, Code2, Eye, Sparkles, ArrowRight, Waves, Zap, Terminal, MousePointer2 } from "lucide-react";
import Link from "next/link";

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.12,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

/* ─── Features Data ─── */
const features = [
  {
    icon: Mic,
    title: "Gravação de Voz",
    description: "Fale naturalmente em português. Transcrição em tempo real com Web Speech API.",
    color: "from-violet-500 to-purple-600",
    glow: "group-hover:shadow-violet-500/20",
  },
  {
    icon: Sparkles,
    title: "IA Open Source",
    description: "Llama 3.3 70B gera código React + Tailwind de qualidade a partir da sua descrição.",
    color: "from-blue-500 to-indigo-600",
    glow: "group-hover:shadow-blue-500/20",
  },
  {
    icon: Code2,
    title: "Código Real",
    description: "Componentes funcionais com estado, handlers e estilização. Pronto para produção.",
    color: "from-emerald-500 to-teal-600",
    glow: "group-hover:shadow-emerald-500/20",
  },
  {
    icon: Eye,
    title: "Preview ao Vivo",
    description: "Sandpack renderiza instantaneamente. Edite o código e veja mudanças em tempo real.",
    color: "from-amber-500 to-orange-600",
    glow: "group-hover:shadow-amber-500/20",
  },
];

/* ─── Steps Data ─── */
const steps = [
  { num: "01", title: "Descreva", desc: "Fale ou digite o que quer criar", icon: Mic },
  { num: "02", title: "Gere", desc: "IA transforma em código React", icon: Terminal },
  { num: "03", title: "Itere", desc: "Refine com voz ou edição manual", icon: MousePointer2 },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  // Spotlight mouse tracking
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const cards = document.querySelectorAll<HTMLElement>(".card-shine");
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] overflow-hidden noise">
      {/* ─── Dot Grid + Aurora Background ─── */}
      <div className="fixed inset-0 dot-grid pointer-events-none" />
      <div className="fixed inset-0 aurora pointer-events-none" />

      {/* ─── Floating Orbs ─── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full bg-violet-600/[0.07] blur-[100px] float" />
        <div className="absolute top-[60%] right-[10%] w-[400px] h-[400px] rounded-full bg-blue-600/[0.05] blur-[100px] float" style={{ animationDelay: "-3s" }} />
        <div className="absolute top-[30%] right-[30%] w-[300px] h-[300px] rounded-full bg-fuchsia-600/[0.04] blur-[100px] float" style={{ animationDelay: "-1.5s" }} />
      </div>

      {/* ─── Vertical Beam Lines ─── */}
      <div className="fixed inset-0 pointer-events-none flex justify-between px-[20%] opacity-[0.03]">
        <div className="w-px h-full bg-gradient-to-b from-transparent via-white to-transparent" />
        <div className="w-px h-full bg-gradient-to-b from-transparent via-white to-transparent" />
        <div className="w-px h-full bg-gradient-to-b from-transparent via-white to-transparent" />
      </div>

      {/* ─── Nav ─── */}
      <nav className="relative z-20 flex items-center justify-between px-6 lg:px-12 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <Waves className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">VoiceForge</span>
        </div>
        <Link
          href="/builder"
          className="group flex items-center gap-2 px-5 py-2 rounded-full glass glass-hover text-sm text-zinc-300 hover:text-white transition-all"
        >
          Abrir Builder
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </nav>

      {/* ─── Hero ─── */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative z-10 flex flex-col items-center text-center px-6 pt-24 sm:pt-32 pb-40 max-w-5xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
          className="animated-border inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.03] text-sm text-zinc-300 mb-10"
        >
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Voice-to-App com IA Open Source</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
          className="text-5xl sm:text-7xl md:text-[5.5rem] font-bold tracking-[-0.04em] leading-[0.95] mb-8"
        >
          <span className="text-shimmer">Fale.</span>
          <br className="sm:hidden" />{" "}
          <span className="gradient-text">Crie.</span>
          <br className="sm:hidden" />{" "}
          <span className="text-shimmer">Publique.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={2}
          className="text-base sm:text-lg text-zinc-500 max-w-xl mb-14 leading-relaxed font-light"
        >
          Transforme sua voz em componentes React funcionais.
          <br className="hidden sm:block" />
          Llama 3.3 + Web Speech API. 100% open source.
        </motion.p>

        {/* CTA Group */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={3}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="/builder"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-medium text-base transition-all hover:shadow-2xl hover:shadow-violet-500/25 hover:-translate-y-0.5"
          >
            {/* Mic pulse behind button */}
            <div className="absolute -left-1 -top-1 -bottom-1 -right-1 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
            <Mic className="w-5 h-5 relative" />
            <span className="relative">Começar a Criar</span>
            <ArrowRight className="w-4 h-4 relative transition-transform group-hover:translate-x-1" />
          </Link>

          <a
            href="https://github.com/jvchaaves/voiceforge"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl glass glass-hover text-sm text-zinc-400 hover:text-white transition-all"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            Ver no GitHub
          </a>
        </motion.div>
      </motion.section>

      {/* ─── How it Works ─── */}
      <section className="relative z-10 px-6 pb-32 max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {steps.map((step, i) => (
            <motion.div key={step.num} variants={fadeUp} custom={i} className="relative">
              {/* Connector line */}
              {i < 2 && (
                <div className="hidden sm:block absolute top-8 left-[calc(100%+4px)] w-[calc(100%-16px)] h-px bg-gradient-to-r from-white/10 to-transparent" />
              )}
              <div className="glass glass-hover card-shine rounded-2xl p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono text-violet-400/60">{step.num}</span>
                  <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
                    <step.icon className="w-4 h-4 text-violet-400" />
                  </div>
                </div>
                <h3 className="text-white font-semibold mb-1">{step.title}</h3>
                <p className="text-sm text-zinc-500">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─── Features ─── */}
      <section className="relative z-10 px-6 pb-32 max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Tudo que você precisa
            </h2>
            <p className="text-zinc-500 max-w-md mx-auto">
              Da voz ao componente renderizado em segundos. Sem configuração, sem complexidade.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                custom={i + 1}
                className={`group glass card-shine rounded-2xl p-7 transition-all duration-500 ${feature.glow} hover:shadow-2xl`}
              >
                <div className="flex items-start gap-5">
                  <div className={`shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 group-hover:-rotate-3`}>
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white mb-1.5">{feature.title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── Demo Terminal ─── */}
      <section className="relative z-10 px-6 pb-32 max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
          className="animated-border rounded-3xl"
        >
          <div className="rounded-3xl bg-[#0a0a0a] p-1">
            <div className="rounded-[20px] bg-[#0d0d0d] overflow-hidden">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.04]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-[11px] text-zinc-600 font-mono ml-3">voiceforge — builder</span>
              </div>

              <div className="grid md:grid-cols-2 divide-x divide-white/[0.04]">
                {/* Left: Voice + Transcript */}
                <div className="p-6 space-y-5">
                  {/* Recording indicator */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
                      <Mic className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex gap-[3px] items-center">
                      {Array.from({ length: 32 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-[2px] rounded-full bg-violet-400/50 waveform-bar"
                          style={{
                            height: `${6 + Math.sin(i * 0.6) * 8 + ((i * 5 + 2) % 6)}px`,
                            animationDelay: `${i * 0.04}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Transcript */}
                  <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-4">
                    <p className="text-[13px] text-zinc-300 leading-relaxed">
                      <span className="text-violet-400/60 text-[11px] font-mono block mb-1.5">transcrição</span>
                      &ldquo;Cria um formulário de cadastro com nome, email, telefone e um botão verde escrito Enviar&rdquo;
                    </p>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-[11px] text-zinc-600 font-mono">transcrição completa • 3.2s</span>
                  </div>
                </div>

                {/* Right: Code */}
                <div className="p-6">
                  <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-4 font-mono text-[12px] leading-relaxed">
                    <div className="text-zinc-600 mb-1">{"// gerado por Llama 3.3 70B"}</div>
                    <div>
                      <span className="text-violet-400">export default</span>{" "}
                      <span className="text-blue-400">function</span>{" "}
                      <span className="text-emerald-400">CadastroForm</span>
                      <span className="text-zinc-500">() {"{"}</span>
                    </div>
                    <div className="text-zinc-500 pl-4">
                      <span className="text-violet-400">const</span> [nome, setNome] = <span className="text-blue-400">useState</span>(<span className="text-amber-400">&quot;&quot;</span>)
                    </div>
                    <div className="text-zinc-600 pl-4">{"// ..."}</div>
                    <div className="text-zinc-500 pl-4">
                      <span className="text-violet-400">return</span> (
                    </div>
                    <div className="pl-8 text-zinc-500">
                      {"<"}<span className="text-blue-400">form</span>{" "}
                      <span className="text-emerald-400">className</span>=<span className="text-amber-400">&quot;max-w-md mx-auto...&quot;</span>{">"}
                    </div>
                    <div className="pl-12 text-zinc-600">{"<input />"} {"<input />"} {"<input />"}</div>
                    <div className="pl-12 text-zinc-500">
                      {"<"}<span className="text-blue-400">button</span>{" "}
                      <span className="text-emerald-400">className</span>=<span className="text-amber-400">&quot;bg-green-500...&quot;</span>{">"}
                    </div>
                    <div className="pl-16 text-zinc-400">Enviar</div>
                    <div className="pl-12 text-zinc-500">{"</"}<span className="text-blue-400">button</span>{">"}</div>
                    <div className="pl-8 text-zinc-500">{"</"}<span className="text-blue-400">form</span>{">"}</div>
                    <div className="text-zinc-500 pl-4">)</div>
                    <div className="text-zinc-500">{"}"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── Tech Stack ─── */}
      <section className="relative z-10 px-6 pb-32 max-w-3xl mx-auto text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.p variants={fadeUp} custom={0} className="text-xs font-mono text-zinc-600 uppercase tracking-widest mb-8">
            Stack 100% Open Source
          </motion.p>
          <motion.div variants={fadeUp} custom={1} className="flex flex-wrap justify-center gap-3">
            {[
              "Next.js 15",
              "TypeScript",
              "Tailwind CSS 4",
              "Llama 3.3 70B",
              "Web Speech API",
              "Sandpack",
              "Framer Motion",
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full text-xs text-zinc-400 glass glass-hover transition-all cursor-default"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="relative z-10 px-6 pb-32 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Pronto para experimentar?
          </h2>
          <p className="text-zinc-500 mb-8">
            Nenhuma instalação necessária. Abra o builder e comece a criar.
          </p>
          <Link
            href="/builder"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-medium hover:shadow-2xl hover:shadow-violet-500/25 hover:-translate-y-0.5 transition-all"
          >
            <Mic className="w-5 h-5" />
            Abrir Builder
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="relative z-10 border-t border-white/[0.04] px-6 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-zinc-600">
            <Waves className="w-3.5 h-3.5" />
            VoiceForge
          </div>
          <div className="flex items-center gap-4 text-xs text-zinc-700">
            <span>Next.js + Llama 3.3</span>
            <span>•</span>
            <a
              href="https://github.com/jvchaaves/voiceforge"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-400 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
