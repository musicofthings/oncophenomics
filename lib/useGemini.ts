// lib/useGemini.ts — replaces direct Gemini API calls
//
// Usage:
//   const { generate, loading, error } = useGemini();
//   const text = await generate({ contents: [{ parts: [{ text: 'Hello' }] }] });

import { useState, useCallback } from 'react';

interface GeminiContent {
  parts: { text: string }[];
  role?: 'user' | 'model';
}

interface GeminiRequest {
  model?: string;
  contents: GeminiContent[];
  generationConfig?: {
    temperature?: number;
    maxOutputTokens?: number;
    topP?: number;
    topK?: number;
  };
  systemInstruction?: { parts: { text: string }[] };
}

interface GeminiResponse {
  candidates: Array<{
    content: { parts: { text: string }[]; role: string };
    finishReason: string;
  }>;
}

export function useGemini() {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  const generate = useCallback(async (payload: GeminiRequest): Promise<string> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Proxy error ${res.status}: ${await res.text()}`);
      const data: GeminiResponse = await res.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { generate, loading, error };
}
