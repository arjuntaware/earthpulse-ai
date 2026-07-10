"use client";

import { useState } from "react";

export default function Home() {
  const [dragging, setDragging] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50 overflow-hidden">
      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-200/40 blur-[140px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-200/40 blur-[150px]" />

      <section className="relative max-w-7xl mx-auto px-8 py-20">

        {/* Navbar */}

        <nav className="flex justify-between items-center">

          <div className="text-3xl font-bold tracking-tight">
            EarthPulse AI
          </div>

          <button className="px-5 py-2 rounded-full bg-black text-white hover:scale-105 transition">
            Dashboard
          </button>

        </nav>

        {/* Hero */}

        <div className="mt-24 text-center">

          <div className="inline-flex px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium shadow-sm">
            AI Powered Environmental Risk Detection
          </div>

          <h1 className="mt-8 text-7xl font-black tracking-tight leading-tight text-slate-900">
            Understand Every
            <br />
            Satellite Image
            <br />
            Before Disaster Strikes
          </h1>

          <p className="mt-8 max-w-3xl mx-auto text-xl text-slate-600 leading-9">
            Upload a satellite image and let artificial intelligence identify
            floods, droughts, wildfire susceptibility, erosion, vegetation
            health, urban expansion, pollution indicators and dozens of other
            environmental risks in seconds.
          </p>

          <div className="flex justify-center gap-6 mt-12">

            <button className="px-8 py-4 rounded-2xl bg-black text-white text-lg font-semibold hover:scale-105 transition duration-300 shadow-xl">
              Analyze Image
            </button>

            <button className="px-8 py-4 rounded-2xl border border-slate-300 bg-white hover:bg-slate-100 transition text-lg">
              Learn More
            </button>

          </div>

        </div>

        {/* Upload */}

        <div className="mt-28">

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={() => setDragging(false)}
            className={`transition-all duration-300
            ${
              dragging
                ? "scale-[1.02] border-green-500 shadow-2xl"
                : "border-slate-300"
            }
            border-2 border-dashed
            rounded-[40px]
            bg-white/70
            backdrop-blur-xl
            p-20
            text-center
            shadow-xl`}
          >
            <div className="text-5xl font-bold text-slate-800">
              Drop Satellite Image
            </div>

            <p className="mt-5 text-slate-500 text-lg">
              PNG • JPG • GeoTIFF
            </p>

            <button className="mt-10 px-8 py-4 rounded-xl bg-green-600 hover:bg-green-700 text-white text-lg transition">
              Choose File
            </button>
          </div>

        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-4 gap-8 mt-24">

          {[
            ["40+", "Environmental Indicators"],
            ["98%", "Detection Accuracy"],
            ["<10s", "Average Processing"],
            ["24/7", "Cloud AI Analysis"],
          ].map(([number, text]) => (
            <div
              key={text}
              className="rounded-3xl bg-white shadow-lg p-8 hover:-translate-y-2 transition duration-300"
            >
              <div className="text-5xl font-black">{number}</div>

              <div className="mt-4 text-slate-500">{text}</div>
            </div>
          ))}

        </div>

        {/* Features */}

        <div className="mt-32">

          <h2 className="text-5xl font-bold text-center">
            Everything Detected Automatically
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-16">

            {[
              {
                title: "Flood Analysis",
                desc: "Detect flood prone regions using terrain, elevation and water body patterns."
              },
              {
                title: "Wildfire Risk",
                desc: "Estimate vegetation dryness and fire susceptibility."
              },
              {
                title: "Vegetation Health",
                desc: "Analyze forest degradation and crop conditions."
              },
              {
                title: "Urban Growth",
                desc: "Track city expansion and land-use changes."
              },
              {
                title: "Soil & Erosion",
                desc: "Identify erosion hotspots and exposed land."
              },
              {
                title: "Environmental Report",
                desc: "Generate AI summaries with actionable insights."
              }
            ].map((card) => (

              <div
                key={card.title}
                className="group rounded-[30px] bg-white p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition duration-500"
              >
                <h3 className="text-2xl font-bold">
                  {card.title}
                </h3>

                <p className="mt-5 text-slate-500 leading-8">
                  {card.desc}
                </p>

                <div className="mt-8 h-1 w-0 bg-green-500 group-hover:w-full transition-all duration-500"></div>

              </div>

            ))}

          </div>

        </div>

        {/* CTA */}

        <div className="mt-36">

          <div className="rounded-[40px] bg-gradient-to-r from-green-600 to-emerald-500 p-16 text-center text-white shadow-2xl">

            <h2 className="text-5xl font-black">
              Ready to Analyze Your First Image?
            </h2>

            <p className="mt-6 text-lg text-green-100 max-w-2xl mx-auto">
              Upload a satellite image and receive a comprehensive AI-generated
              environmental assessment within seconds.
            </p>

            <button className="mt-10 px-10 py-4 rounded-xl bg-white text-black text-lg font-semibold hover:scale-105 transition">
              Start Analysis
            </button>

          </div>

        </div>

      </section>
    </main>
  );
}