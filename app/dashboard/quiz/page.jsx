"use client";

import { useState, useEffect, useRef } from "react";
const REMOTE_URL = "https://quiz-performance-analyser.streamlit.app/";
// const REMOTE_URL="https://quizz-template.streamlit.app/"

export default function QuizIframePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [iframeBlocked, setIframeBlocked] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        if (!iframeRef.current || !iframeRef.current.contentDocument) {
          setIframeBlocked(true);
        }
      } catch (e) {
        setIframeBlocked(false); // cross-origin → means it loaded fine
      } finally {
        setIsLoaded(true);
      }
    }, 1500);

    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col p-16">
      {/* Header */}
      <header className="p-5 border-b border-gray-800 max-w-6xl mx-auto w-full">
        <h1 className="text-2xl font-bold">Quiz — Embedded Viewer</h1>
        <p className="text-gray-400 text-sm mt-1">
          The quiz page is embedded below. If embedding is blocked, click{" "}
          <a
            href={REMOTE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-blue-400"
          >
            Open in a new tab
          </a>
          .
        </p>
        <div className="mt-3">
          <a
            href={REMOTE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold"
          >
            Open Quiz in New Tab
          </a>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex justify-center items-stretch p-4 max-w-6xl mx-auto w-full">
        {!isLoaded && (
          <div className="text-gray-400 text-base p-4">
            Preparing the embedded quiz…
          </div>
        )}

        {iframeBlocked ? (
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg text-gray-300 w-full">
            <strong className="block mb-2">Embedding blocked:</strong>
            The remote site prevents being loaded in an iframe. Click below to
            open it directly.
            <div className="mt-4">
              <a
                href={REMOTE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold"
              >
                Open Quiz in New Tab
              </a>
            </div>
          </div>
        ) : (
          <iframe
            ref={iframeRef}
            title="Quiz Performance Analyser"
            src={REMOTE_URL}
            className="flex-1 w-full h-[calc(100vh-160px)] border border-gray-800 rounded-lg bg-black"
            sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
          />
        )}
      </main>
    </div>
  );
}
