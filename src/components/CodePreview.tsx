"use client";

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";

interface CodePreviewProps {
  code: string;
  onCodeChange?: (code: string) => void;
}

export function CodePreview({ code }: CodePreviewProps) {
  const appCode = code
    ? `import React, { useState, useEffect, useRef, useCallback } from "react";\n${code}`
    : `export default function Placeholder() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <div className="relative mx-auto w-20 h-20">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 opacity-20 blur-xl"></div>
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
            <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white mb-2">VoiceForge</h2>
          <p className="text-gray-500 text-sm max-w-[280px] mx-auto leading-relaxed">Descreva o componente que deseja criar e veja o resultado aqui</p>
        </div>
        <div className="flex items-center justify-center gap-2 text-gray-700 text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-700"></span>
          Aguardando entrada
        </div>
      </div>
    </div>
  );
}`;

  return (
    <div className="animated-border rounded-2xl">
      <div className="rounded-2xl bg-[#0a0a0a] p-[1px] overflow-hidden">
        <SandpackProvider
          template="react"
          theme="dark"
          files={{
            "/App.js": {
              code: appCode,
              active: true,
            },
          }}
          customSetup={{
            dependencies: {},
          }}
          options={{
            externalResources: [
              "https://cdn.tailwindcss.com",
            ],
          }}
        >
          <SandpackLayout
            style={{
              borderRadius: "0.875rem",
              border: "none",
              background: "#0a0a0a",
            }}
          >
            <SandpackCodeEditor
              style={{ height: "420px" }}
              showLineNumbers
              showTabs={false}
              wrapContent
            />
            <SandpackPreview
              style={{ height: "420px" }}
              showOpenInCodeSandbox={false}
              showRefreshButton
            />
          </SandpackLayout>
        </SandpackProvider>
      </div>
    </div>
  );
}
