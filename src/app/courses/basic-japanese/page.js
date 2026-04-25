"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
const CHARACTERS = [
  { c: "日", label: "nichi / hi", meaning: "sun / day", strokes: 4 },
  { c: "山", label: "yama",       meaning: "mountain",  strokes: 3 },
  { c: "川", label: "kawa",       meaning: "river",     strokes: 3 },
  { c: "月", label: "tsuki",      meaning: "moon",      strokes: 4 },
  { c: "火", label: "hi",         meaning: "fire",      strokes: 4 },
  { c: "水", label: "mizu",       meaning: "water",     strokes: 4 },
  { c: "木", label: "ki",         meaning: "tree",      strokes: 4 },
  { c: "金", label: "kin",        meaning: "gold",      strokes: 8 },
  { c: "土", label: "tsuchi",     meaning: "earth",     strokes: 3 },
  { c: "人", label: "hito",       meaning: "person",    strokes: 2 },
];

export default function KanjiTracer() {
  const canvasRef   = useRef(null);
  const isDrawing   = useRef(false);
  const lastPos     = useRef(null);
  const pathsRef    = useRef([]);      // array of stroke arrays
  const currentPath = useRef([]);

  const [selected, setSelected]   = useState(0);
  const [brushSize, setBrushSize] = useState(18);
  const [inkColor,  setInkColor]  = useState("#991b1b");
  const [hasDrawn,  setHasDrawn]  = useState(false);
  const [showGuide, setShowGuide] = useState(true);

  const INK_COLORS = [
    { hex: "#991b1b", label: "red"   },
    { hex: "#ffffff", label: "white" },
    { hex: "#0a0a0a", label: "black" },
  ];

  // ── draw guide character onto canvas ──────────────────────────────────────
  const drawGuide = useCallback((ctx, char, show) => {
    const { width: w, height: h } = ctx.canvas;
    if (!show) return;
    ctx.save();
    // Make guide character smaller and respect canvas height so it never overwhelms the area
    const base = Math.min(w, h);
    const fontSize = Math.round(base * 0.38); // ~38% of smaller canvas dimension
    ctx.font         = `bold ${fontSize}px 'Noto Serif JP', serif`;
    ctx.textAlign    = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle    = "rgba(255,255,255,0.06)";
    ctx.fillText(char, w / 2, h / 2);
    ctx.restore();
  }, []);

  // ── repaint everything from scratch ───────────────────────────────────────
  const repaint = useCallback((extraPath = null) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const { width: w, height: h } = canvas;

    ctx.clearRect(0, 0, w, h);

    // subtle grid
    ctx.save();
    ctx.strokeStyle = "rgba(255,255,255,0.04)";
    ctx.lineWidth   = 1;
    ctx.setLineDash([4, 8]);
    ctx.beginPath();
    ctx.moveTo(w / 2, 0); ctx.lineTo(w / 2, h);
    ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    drawGuide(ctx, CHARACTERS[selected].c, showGuide);

    // replay all saved strokes
    const allPaths = extraPath
      ? [...pathsRef.current, extraPath]
      : pathsRef.current;

    allPaths.forEach((path) => {
      if (path.length < 2) return;
      ctx.save();
      ctx.lineCap     = "round";
      ctx.lineJoin    = "round";
      ctx.lineWidth   = path[0].size;
      ctx.strokeStyle = path[0].color;
      ctx.shadowColor = path[0].color;
      ctx.shadowBlur  = 6;
      ctx.globalAlpha = 0.92;
      ctx.beginPath();
      ctx.moveTo(path[0].x, path[0].y);
      for (let i = 1; i < path.length; i++) {
        const mid = { x: (path[i-1].x + path[i].x) / 2, y: (path[i-1].y + path[i].y) / 2 };
        ctx.quadraticCurveTo(path[i-1].x, path[i-1].y, mid.x, mid.y);
      }
      ctx.stroke();
      ctx.restore();
    });
  }, [selected, showGuide, drawGuide]);

  // ── canvas sizing ──────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function fit() {
      const parentW = canvas.parentElement.clientWidth;
      // keep full width (capped) but DO NOT make height equal to width -
      // restore original-ish height cap so canvas stays wide but not tall.
      const cssWidth = Math.min(parentW, 920);    // full-width cap
      const cssHeight = Math.min(420, cssWidth);  // height capped at 420, but never bigger than width on very small screens

      // set canvas pixel buffer to CSS size (keeps drawing coordinates consistent with repaint)
      canvas.width = Math.round(cssWidth);
      canvas.height = Math.round(cssHeight);

      // ensure the element's CSS size matches
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;

      repaint();
    }

    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [selected, repaint]);

  // ── pointer helpers ────────────────────────────────────────────────────────
  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const src  = e.touches ? e.touches[0] : e;
    return { x: src.clientX - rect.left, y: src.clientY - rect.top };
  };

  const startDraw = (e) => {
    e.preventDefault();
    isDrawing.current = true;
    const pos = getPos(e);
    lastPos.current   = pos;
    currentPath.current = [{ ...pos, size: brushSize, color: inkColor }];
    setHasDrawn(true);
  };

  const draw = (e) => {
    e.preventDefault();
    if (!isDrawing.current) return;
    const pos = getPos(e);
    currentPath.current.push({ ...pos, size: brushSize, color: inkColor });
    lastPos.current = pos;
    repaint(currentPath.current);
  };

  const endDraw = (e) => {
    e?.preventDefault();
    if (!isDrawing.current) return;
    isDrawing.current = false;
    if (currentPath.current.length > 1) {
      pathsRef.current = [...pathsRef.current, [...currentPath.current]];
    }
    currentPath.current = [];
    repaint();
  };

  const clearCanvas = () => {
    pathsRef.current = [];
    currentPath.current = [];
    setHasDrawn(false);
    repaint();
  };

  const undo = () => {
    pathsRef.current = pathsRef.current.slice(0, -1);
    repaint();
  };

  // re-render when showGuide toggles
  useEffect(() => { repaint(); }, [showGuide, repaint]);

  const char = CHARACTERS[selected];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@700&family=Outfit:wght@300;400;600;700&display=swap');

        .kt-root { font-family: 'Outfit', sans-serif; }

        .kt-section-label {
          display: inline-block;
          padding: 3px 10px;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          border: 1px solid rgba(185,28,28,0.35);
          color: rgba(252,165,165,0.6);
          border-radius: 2px;
          margin-bottom: 18px;
        }

        .kt-char-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 6px;
        }
        @media (min-width: 500px) {
          .kt-char-grid { grid-template-columns: repeat(10, 1fr); }
        }

        .kt-char-pill {
          aspect-ratio: 1;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Noto Serif JP', serif;
          font-size: 22px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 4px;
          cursor: pointer;
          color: rgba(255,255,255,0.7);
          transition: all 0.15s;
        }
        .kt-char-pill:hover { background: rgba(127,29,29,0.4); border-color: rgba(185,28,28,0.5); color: #fff; }
        .kt-char-pill.active {
          background: rgba(127,29,29,0.55);
          border: 1px solid rgba(185,28,28,0.8);
          color: #fff;
          box-shadow: 0 0 12px rgba(185,28,28,0.35);
        }

        .kt-canvas-wrap {
          position: relative;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 6px;
          overflow: hidden;
          display: block;
          width: 100%;
          max-width: none; /* allow full-width inside parent column */
        }
        /* canvas uses pixel size set in JS but scale to fill container responsively */
        .kt-canvas-wrap canvas {
          display: block;
          width: 100%;
          height: auto;
          cursor: crosshair;
          touch-action: none;
        }

        .kt-corner {
          position: absolute;
          width: 10px; height: 10px;
          border-color: rgba(185,28,28,0.5);
          border-style: solid;
        }
        .kt-corner-tl { top:8px; left:8px;  border-width: 1px 0 0 1px; }
        .kt-corner-tr { top:8px; right:8px; border-width: 1px 1px 0 0; }
        .kt-corner-bl { bottom:8px; left:8px;  border-width: 0 0 1px 1px; }
        .kt-corner-br { bottom:8px; right:8px; border-width: 0 1px 1px 0; }

        .kt-controls {
          display: flex; gap: 8px; align-items: center; flex-wrap: wrap;
          margin-top: 12px;
        }

        .kt-btn {
          padding: 6px 14px;
          font-size: 12px;
          font-family: 'Outfit', sans-serif;
          letter-spacing: 0.05em;
          color: rgba(255,255,255,0.65);
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 3px;
          cursor: pointer;
          transition: all 0.15s;
        }
        .kt-btn:hover { background: rgba(127,29,29,0.4); border-color: rgba(185,28,28,0.5); color: #fff; }
        .kt-btn.danger:hover { background: rgba(127,29,29,0.7); }

        .kt-swatch {
          width: 26px; height: 26px;
          border-radius: 50%;
          border: 2px solid transparent;
          cursor: pointer;
          transition: transform 0.12s, border-color 0.12s;
        }
        .kt-swatch:hover { transform: scale(1.15); }
        .kt-swatch.active { border-color: rgba(255,255,255,0.8); transform: scale(1.1); }

        .kt-brush-row {
          display: flex; align-items: center; gap: 10px;
          margin-top: 10px;
        }
        .kt-brush-row label { font-size: 11px; color: rgba(255,255,255,0.35); letter-spacing: 0.08em; text-transform: uppercase; }
        .kt-brush-row input[type=range] {
          -webkit-appearance: none;
          height: 2px;
          border-radius: 2px;
          background: rgba(255,255,255,0.15);
          outline: none;
          flex: 1;
          cursor: pointer;
        }
        .kt-brush-row input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px; height: 14px;
          border-radius: 50%;
          background: #991b1b;
          border: 2px solid rgba(255,255,255,0.4);
          cursor: pointer;
        }

        .kt-toggle {
          display: flex; align-items: center; gap: 6px;
          font-size: 11px; color: rgba(255,255,255,0.35);
          letter-spacing: 0.06em; text-transform: uppercase;
          cursor: pointer; user-select: none;
        }
        .kt-toggle-box {
          width: 28px; height: 16px;
          border-radius: 8px;
          border: 1px solid rgba(185,28,28,0.5);
          background: rgba(0,0,0,0.3);
          position: relative; transition: background 0.2s;
        }
        .kt-toggle-box.on { background: rgba(127,29,29,0.7); }
        .kt-toggle-box::after {
          content: '';
          position: absolute;
          width: 10px; height: 10px;
          border-radius: 50%;
          background: rgba(255,255,255,0.6);
          top: 2px; left: 2px;
          transition: transform 0.2s, background 0.2s;
        }
        .kt-toggle-box.on::after { transform: translateX(12px); background: #fff; }

        .kt-char-info {
          padding: 14px 18px;
          background: rgba(127,29,29,0.15);
          border: 1px solid rgba(185,28,28,0.25);
          border-radius: 4px;
          display: flex; gap: 20px; align-items: center;
          margin-bottom: 16px;
        }
        .kt-big-char {
          font-family: 'Noto Serif JP', serif;
          font-size: 36px; /* reduced so the info character is smaller */
           color: rgba(255,255,255,0.9);
           line-height: 1;
           text-shadow: 0 0 24px rgba(185,28,28,0.6);
         }
        .kt-char-meta { display: flex; flex-direction: column; gap: 3px; }
        .kt-char-meta .reading { font-size: 15px; color: rgba(255,255,255,0.75); }
        .kt-char-meta .meaning { font-size: 12px; color: rgba(255,255,255,0.4); letter-spacing: 0.05em; text-transform: uppercase; }
        .kt-char-meta .strokes { font-size: 11px; color: rgba(185,28,28,0.8); letter-spacing: 0.08em; text-transform: uppercase; margin-top: 4px; }

        .kt-done-flash {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          background: rgba(127,29,29,0.15);
          font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(252,165,165,0.7);
          pointer-events: none;
          opacity: 0;
          animation: flashIn 0.3s ease forwards;
        }
        @keyframes flashIn {
          0%   { opacity: 0; }
          40%  { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
<Header/>
      <div className="kt-root">
        <div className="kt-section-label">文字練習 — Character Practice</div>

        {/* character picker */}
        <div className="kt-char-grid" style={{ marginBottom: 16 }}>
          {CHARACTERS.map((ch, i) => (
            <button
              key={ch.c}
              className={`kt-char-pill ${i === selected ? "active" : ""}`}
              onClick={() => { setSelected(i); clearCanvas(); }}
              title={`${ch.c} — ${ch.meaning}`}
            >
              {ch.c}
            </button>
          ))}
        </div>

        {/* char info strip */}
        <div className="kt-char-info">
          <div className="kt-big-char">{char.c}</div>
          <div className="kt-char-meta">
            <span className="reading">{char.c} &nbsp;·&nbsp; {char.label}</span>
            <span className="meaning">{char.meaning}</span>
            <span className="strokes">{char.strokes} strokes</span>
          </div>
        </div>

        {/* canvas */}
        <div className="kt-canvas-wrap">
          <div className="kt-corner kt-corner-tl" />
          <div className="kt-corner kt-corner-tr" />
          <div className="kt-corner kt-corner-bl" />
          <div className="kt-corner kt-corner-br" />
          <canvas
            ref={canvasRef}
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={endDraw}
            onMouseLeave={endDraw}
            onTouchStart={startDraw}
            onTouchMove={draw}
            onTouchEnd={endDraw}
          />
        </div>

        {/* ink color swatches */}
        <div className="kt-controls" style={{ marginTop: 14 }}>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Ink</span>
          {INK_COLORS.map((c) => (
            <button
              key={c.hex}
              className={`kt-swatch ${inkColor === c.hex ? "active" : ""}`}
              style={{ background: c.hex, boxShadow: c.hex === "#0a0a0a" ? "inset 0 0 0 1px rgba(255,255,255,0.2)" : "none" }}
              title={c.label}
              onClick={() => setInkColor(c.hex)}
            />
          ))}
          <div style={{ flex: 1 }} />
          <label
            className="kt-toggle"
            onClick={() => setShowGuide((v) => !v)}
          >
            <div className={`kt-toggle-box ${showGuide ? "on" : ""}`} />
            Guide
          </label>
        </div>

        {/* brush size */}
        <div className="kt-brush-row">
          <label>Brush</label>
          <input
            type="range" min={8} max={36} step={2}
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
          />
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", minWidth: 24 }}>{brushSize}</span>
        </div>

        {/* action buttons */}
        <div className="kt-controls" style={{ marginTop: 10 }}>
          <button className="kt-btn" onClick={undo} disabled={!hasDrawn}>↩ Undo</button>
          <button className="kt-btn danger" onClick={clearCanvas}>✕ Clear</button>
        </div>
      </div>
      <Footer/>
    </>
  );
}