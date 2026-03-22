"use client";

import { motion } from "framer-motion";
import { Mic, Code2, Eye, Download, ArrowRight, Sparkles, Zap, Waves } from "lucide-react";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const features = [
  {
    icon: Mic,
    title: "Gravação de Voz",
    description: "Fale naturalmente em português. Nossa IA entende exatamente o que você quer criar.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Sparkles,
    title: "Transcrição IA",
    description: "Whisper converte sua fala em texto com precisão impressionante, em tempo real.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Code2,
    title: "Geração de Código",
    description: "IA gera componentes React + Tailwind funcionais a partir da sua descrição por voz.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Eye,
    title: "Preview ao Vivo",
    description: "Veja o resultado renderizado instantaneamente. Edite o código ou itere por voz.",
    gradient: "from-orange-500 to-yellow-500",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Gradient orbs background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[128px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-600/10 blur-[128px]" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Waves className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">VoiceForge</span>
        </div>
        <Link
          href="/builder"
          className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
        >
          Abrir Builder <ArrowRight className="w-3 h-3" />
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-20 pb-32 max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-zinc-300 mb-8"
        >
          <Zap className="w-3.5 h-3.5 text-yellow-400" />
          Voice-to-App em segundos
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
          className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-[0.9] mb-6"
        >
          <span className="gradient-text">Fale.</span>{" "}
          <span className="text-white">Crie.</span>{" "}
          <span className="gradient-text-green">Publique.</span>
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={2}
          className="text-lg sm:text-xl text-zinc-400 max-w-2xl mb-12 leading-relaxed"
        >
          Transforme sua voz em código React funcional em segundos.
          Fale o que você quer, veja o app nascendo na sua frente.
        </motion.p>

        {/* CTA Mic Button */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={3}
        >
          <Link href="/builder" className="group relative inline-flex items-center justify-center">
            {/* Pulse rings */}
            <div className="absolute w-32 h-32 rounded-full bg-purple-500/20 pulse-ring" />
            <div className="absolute w-24 h-24 rounded-full bg-purple-500/30 pulse-ring" style={{ animationDelay: "0.5s" }} />
            {/* Button */}
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center glow-purple transition-transform group-hover:scale-110 cursor-pointer">
              <Mic className="w-8 h-8 text-white" />
            </div>
          </Link>
          <p className="text-sm text-zinc-500 mt-6">Clique para começar a criar</p>
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative z-10 px-6 pb-32 max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={fadeUp}
              custom={i}
              className="glass glass-hover rounded-2xl p-6 transition-all duration-300 group cursor-default"
            >
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}
              >
                <feature.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Demo preview */}
      <section className="relative z-10 px-6 pb-32 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass rounded-3xl p-8 md:p-12"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-xs text-zinc-500 ml-2 font-mono">voiceforge — builder</span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Voice Input Simulation */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Mic className="w-4 h-4 text-white" />
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-purple-400/60 rounded-full waveform-bar"
                      style={{
                        height: `${12 + Math.sin(i * 0.8) * 10 + Math.random() * 8}px`,
                        animationDelay: `${i * 0.05}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="glass rounded-xl p-4">
                <p className="text-sm text-zinc-300 italic">
                  &ldquo;Cria um formulário de cadastro com nome, email, telefone e um botão verde escrito Enviar&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <Download className="w-3 h-3" />
                Transcrição completa • 3.2s
              </div>
            </div>

            {/* Code Output Simulation */}
            <div className="glass rounded-xl p-4 font-mono text-xs">
              <div className="text-zinc-500 mb-2">// Componente gerado por IA</div>
              <div>
                <span className="text-purple-400">export default</span>{" "}
                <span className="text-blue-400">function</span>{" "}
                <span className="text-green-400">CadastroForm</span>
                <span className="text-zinc-400">() {"{"}</span>
              </div>
              <div className="text-zinc-400 pl-4">
                <span className="text-purple-400">return</span> (
              </div>
              <div className="pl-8 text-zinc-500">
                {"<"}<span className="text-blue-400">form</span>{" "}
                <span className="text-green-400">className</span>=
                <span className="text-yellow-400">&quot;...&quot;</span>{">"}
              </div>
              <div className="pl-12 text-zinc-600">{"// inputs + botão..."}</div>
              <div className="pl-8 text-zinc-500">{"</"}<span className="text-blue-400">form</span>{">"}</div>
              <div className="text-zinc-400 pl-4">);</div>
              <div className="text-zinc-400">{"}"}</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA Bottom */}
      <section className="relative z-10 px-6 pb-24 text-center">
        <Link
          href="/builder"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-lg hover:opacity-90 transition-opacity glow-purple"
        >
          Começar a Criar <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 px-6 py-8 text-center text-sm text-zinc-600">
        <p>VoiceForge — Transforme voz em código.</p>
      </footer>
    </div>
  );
}
