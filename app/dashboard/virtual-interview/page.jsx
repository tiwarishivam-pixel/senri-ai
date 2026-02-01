"use client";

import { useState, useRef } from "react";
import axios from "axios";

export default function Home() {
  const [cvFile, setCvFile] = useState(null);
  const [cvText, setCvText] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [recording, setRecording] = useState(false);
  const [audioSrc, setAudioSrc] = useState(null);
  const [interviewStarted, setInterviewStarted] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleUploadCV = async () => {
    if (!cvFile) return;
    const formData = new FormData();
    formData.append("file", cvFile);

    const res = await axios.post("/api/upload-cv", formData);
    setCvText(res.data.cv_text);
    alert("CV uploaded successfully!");
  };

  const startInterview = async (intro) => {
    if (!cvText) return alert("Upload CV first!");
    const formData = new FormData();
    formData.append("intro_text", intro);
    formData.append("cv_text", cvText);

    const res = await axios.post("/api/start-interview", formData, { responseType: "blob" });
    const audioBlob = res.data;
    const url = URL.createObjectURL(audioBlob);
    setAudioSrc(url);

    setChatHistory([{ role: "interviewer", content: res.headers["x-question"] }]);
    setInterviewStarted(true);
  };

  const recordAudio = async () => {
    setRecording(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (e) => {
      audioChunksRef.current.push(e.data);
    };

    recorder.onstop = async () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      audioChunksRef.current = [];

      // Simulate transcription
      const userText = prompt("Simulate your spoken answer here:") || "Sample answer";
      const updatedHistory = [...chatHistory, { role: "candidate", content: userText }];
      setChatHistory(updatedHistory);

      // Call /answer endpoint
      const formData = new FormData();
      formData.append("answer_text", userText);
      formData.append("chat_history", JSON.stringify(updatedHistory));
      formData.append("cv_text", cvText);

      const res = await axios.post("/api/answer", formData, { responseType: "blob" });
      const url = URL.createObjectURL(res.data);
      setAudioSrc(url);
      setChatHistory((prev) => [...prev, { role: "interviewer", content: res.headers["x-question"] }]);
    };

    recorder.start();
    setTimeout(() => {
      recorder.stop();
      setRecording(false);
    }, 5000); // 5 sec demo
  };

  const getFeedback = async () => {
    const formData = new FormData();
    formData.append("chat_history", JSON.stringify(chatHistory));

    const res = await axios.post("/api/get-feedback", formData, { responseType: "blob" });
    const url = URL.createObjectURL(res.data);
    setAudioSrc(url);
    alert(res.headers["x-report"]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">🎙️ AI Mock Interview</h1>

      {!interviewStarted ? (
        <div className="space-y-4 max-w-2xl mx-auto">
          <input type="file" onChange={(e) => setCvFile(e.target.files[0])} className="block w-full" />
          <button
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleUploadCV}
          >
            Upload CV
          </button>
          {cvText && (
            <>
              <textarea
                value={cvText}
                readOnly
                className="w-full h-32 bg-gray-800 text-gray-200 p-2 rounded"
              />
              <button
                className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
                onClick={() => startInterview("Hello, my name is Candidate.")}
              >
                Start Interview
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="max-w-2xl mx-auto space-y-4">
          {chatHistory.map((msg, idx) => (
            <div
              key={idx}
              className={`p-4 rounded ${msg.role === "interviewer" ? "bg-blue-900" : "bg-gray-800"}`}
            >
              <strong>{msg.role === "interviewer" ? "Interviewer:" : "You:"}</strong> {msg.content}
            </div>
          ))}

          <div className="flex space-x-2">
            <button
              className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
              onClick={recordAudio}
              disabled={recording}
            >
              {recording ? "Recording..." : "Start Talking"}
            </button>
            <button
              className="bg-yellow-600 px-4 py-2 rounded hover:bg-yellow-700"
              onClick={getFeedback}
            >
              Get Feedback
            </button>
          </div>

          {audioSrc && (
            <audio src={audioSrc} controls autoPlay className="mt-4 w-full rounded bg-gray-700" />
          )}
        </div>
      )}
    </div>
  );
}
