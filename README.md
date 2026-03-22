# 🎙️ VoiceForge — Voice-to-App Builder

Fale em português o que você quer e veja o app nascendo na sua frente. A IA transcreve em tempo real, entende, e gera código React funcional com preview ao vivo em segundos.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)
![Llama](https://img.shields.io/badge/Llama_3.3-70B-purple)

## Demo

1. Clique no microfone
2. Fale: _"cria um formulário de cadastro com nome, email e um botão verde escrito Enviar"_
3. Em segundos o formulário aparece renderizado na tela, funcional, com Tailwind

## Stack 100% Open Source

| Camada | Tecnologia |
|--------|-----------|
| **Frontend** | Next.js 15 + TypeScript + Tailwind CSS 4 |
| **Transcrição** | Web Speech API (nativa do browser, zero custo) |
| **Geração de código** | Llama 3.3 70B via Groq (modelo open source) |
| **Preview ao vivo** | Sandpack (by CodeSandbox) |
| **Animações** | Framer Motion |
| **Ícones** | Lucide React |

## Funcionalidades

- **Gravação de voz** — botão de microfone com visualização de onda em tempo real (Canvas API)
- **Transcrição ao vivo** — Web Speech API converte fala em texto enquanto você fala
- **Geração de código** — Llama 3.3 70B gera React + Tailwind a partir da descrição por voz
- **Preview ao vivo** — Sandpack renderiza o componente gerado instantaneamente
- **Editor de código** — edite o código gerado manualmente no editor integrado
- **Iteração por voz** — _"agora muda o botão pra vermelho"_ e o componente atualiza
- **Histórico** — todas as gerações ficam salvas para comparação
- **Export** — copie o código ou baixe como arquivo .jsx

## Começando

```bash
# Clone o repositório
git clone https://github.com/jvchaaves/voiceforge.git
cd voiceforge

# Instale as dependências
npm install

# Configure a API key (Groq é grátis)
# Edite o .env com sua key do https://console.groq.com/keys

# Rode o projeto
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## Estrutura do Projeto

```
src/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── builder/page.tsx         # Interface principal do builder
│   └── api/generate/route.ts    # API de geração (Groq + Llama 3.3)
├── components/
│   ├── VoiceRecorder.tsx        # Gravação + controles
│   ├── WaveformVisualizer.tsx   # Visualização de onda (Canvas)
│   ├── TranscriptDisplay.tsx    # Transcrição em tempo real
│   ├── CodePreview.tsx          # Sandpack preview + editor
│   └── GenerationHistory.tsx    # Histórico de gerações
├── hooks/
│   ├── useVoiceRecorder.ts      # Hook de gravação + Web Speech API
│   └── useCodeGeneration.ts     # Hook de geração de código
└── lib/
    ├── llm.ts                   # Client Groq (Llama 3.3 70B)
    ├── prompts.ts               # System prompts otimizados
    └── types.ts                 # TypeScript types
```

## Requisitos

- Node.js 18+
- Navegador com suporte a Web Speech API (Chrome, Edge)
- Groq API Key (grátis em [console.groq.com](https://console.groq.com))

## Licença

MIT
