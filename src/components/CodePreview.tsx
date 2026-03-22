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

export function CodePreview({ code, onCodeChange }: CodePreviewProps) {
  const appCode = code
    ? `import React, { useState, useEffect, useRef, useCallback } from "react";\n${code}`
    : `export default function Placeholder() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mx-auto flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-white">VoiceForge</h2>
        <p className="text-gray-400 text-sm max-w-xs">Grave sua voz descrevendo o componente que deseja criar</p>
      </div>
    </div>
  );
}`;

  return (
    <div className="rounded-2xl overflow-hidden border border-white/5">
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
        <SandpackLayout style={{ borderRadius: 0, border: "none" }}>
          <SandpackCodeEditor
            style={{ height: "400px" }}
            showLineNumbers
            showTabs={false}
            wrapContent
          />
          <SandpackPreview
            style={{ height: "400px" }}
            showOpenInCodeSandbox={false}
            showRefreshButton
          />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}
