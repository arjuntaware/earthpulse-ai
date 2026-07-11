"use client";

import { useRef, useState } from "react";

export default function Home() {
  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files?.length) return;

    setSelectedFile(e.target.files[0]);
    setResult(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);

    if (!e.dataTransfer.files.length) return;

    setSelectedFile(e.dataTransfer.files[0]);
    setResult(null);
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  async function uploadImage() {
    if (!selectedFile) {
      alert("Please select a satellite image.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Could not connect to backend.");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50 overflow-hidden">

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-200/40 blur-[140px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-200/40 blur-[150px]" />

      <section className="relative max-w-7xl mx-auto px-8 py-20">

        <nav className="flex justify-between items-center">
          <div className="text-3xl font-bold">
            EarthPulse AI
          </div>

          <button className="px-5 py-2 rounded-full bg-black text-white">
            Dashboard
          </button>
        </nav>

        <div className="mt-24 text-center">

          <div className="inline-flex px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium">
            AI Powered Environmental Risk Detection
          </div>

          <h1 className="mt-8 text-7xl font-black leading-tight">
            Understand Every
            <br />
            Satellite Image
            <br />
            Before Disaster Strikes
          </h1>

          <p className="mt-8 max-w-3xl mx-auto text-xl text-slate-600">
            Upload a satellite image and let AI analyze it.
          </p>

        </div>

        <div className="mt-28">

          <input
            ref={fileInputRef}
            type="file"
            accept=".png,.jpg,.jpeg,.tif,.tiff"
            className="hidden"
            onChange={handleFileChange}
          />

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`transition-all duration-300 ${
              dragging
                ? "scale-[1.02] border-green-500"
                : "border-slate-300"
            } border-2 border-dashed rounded-[40px] bg-white/70 p-20 text-center shadow-xl`}
          >

            <div className="text-5xl font-bold">
              Drop Satellite Image
            </div>

            <p className="mt-5 text-slate-500">
              PNG • JPG • JPEG • TIFF
            </p>

            <button
              onClick={openFilePicker}
              className="mt-10 px-8 py-4 rounded-xl bg-green-600 text-white"
            >
              Choose File
            </button>

            {selectedFile && (
              <div className="mt-8">

                <p className="text-green-700 font-semibold">
                  Selected:
                </p>

                <p>{selectedFile.name}</p>

                <p className="text-sm text-slate-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>

              </div>
            )}

          </div>

        </div>

        <div className="mt-16 text-center">

          <button
            onClick={uploadImage}
            disabled={loading}
            className="px-10 py-4 rounded-xl bg-black text-white text-lg hover:scale-105 transition"
          >
            {loading ? "Uploading..." : "Start Analysis"}
          </button>

        </div>

        {result && (
          <div className="mt-16 rounded-3xl bg-white shadow-xl p-10">

            <h2 className="text-3xl font-bold mb-6">
              Backend Response
            </h2>

            <p>
              <strong>Filename:</strong> {result.filename}
            </p>

            <p>
              <strong>Width:</strong> {result.width}px
            </p>

            <p>
              <strong>Height:</strong> {result.height}px
            </p>

            <p className="mt-4 text-green-600 font-semibold">
              {result.message}
            </p>

          </div>
        )}

      </section>

    </main>
  );
}