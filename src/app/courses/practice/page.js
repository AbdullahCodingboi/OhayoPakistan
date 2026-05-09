"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const SCRIPT_TABS = [
  { id: "kanji",    label: "漢字 Kanji"    },
  { id: "hiragana", label: "ひらがな Hiragana" },
  { id: "katakana", label: "カタカナ Katakana" },
];

const CHARACTERS = {
  kanji: [
    { c: "日", label: "nichi / hi", meaning: "sun / day",  strokes: 4 },
    { c: "山", label: "yama",       meaning: "mountain",   strokes: 3 },
    { c: "川", label: "kawa",       meaning: "river",      strokes: 3 },
    { c: "月", label: "tsuki",      meaning: "moon",       strokes: 4 },
    { c: "火", label: "hi",         meaning: "fire",       strokes: 4 },
    { c: "水", label: "mizu",       meaning: "water",      strokes: 4 },
    { c: "木", label: "ki",         meaning: "tree",       strokes: 4 },
    { c: "金", label: "kin",        meaning: "gold",       strokes: 8 },
    { c: "土", label: "tsuchi",     meaning: "earth",      strokes: 3 },
    { c: "人", label: "hito",       meaning: "person",     strokes: 2 },
  ],
  hiragana: [
    { c: "あ", label: "a",   meaning: "a",   strokes: 3 },
    { c: "い", label: "i",   meaning: "i",   strokes: 2 },
    { c: "う", label: "u",   meaning: "u",   strokes: 2 },
    { c: "え", label: "e",   meaning: "e",   strokes: 2 },
    { c: "お", label: "o",   meaning: "o",   strokes: 3 },
    { c: "か", label: "ka",  meaning: "ka",  strokes: 3 },
    { c: "き", label: "ki",  meaning: "ki",  strokes: 4 },
    { c: "く", label: "ku",  meaning: "ku",  strokes: 1 },
    { c: "け", label: "ke",  meaning: "ke",  strokes: 3 },
    { c: "こ", label: "ko",  meaning: "ko",  strokes: 2 },
    { c: "さ", label: "sa",  meaning: "sa",  strokes: 3 },
    { c: "し", label: "shi", meaning: "shi", strokes: 1 },
    { c: "す", label: "su",  meaning: "su",  strokes: 2 },
    { c: "せ", label: "se",  meaning: "se",  strokes: 3 },
    { c: "そ", label: "so",  meaning: "so",  strokes: 1 },
    { c: "た", label: "ta",  meaning: "ta",  strokes: 4 },
    { c: "ち", label: "chi", meaning: "chi", strokes: 2 },
    { c: "つ", label: "tsu", meaning: "tsu", strokes: 1 },
    { c: "て", label: "te",  meaning: "te",  strokes: 1 },
    { c: "と", label: "to",  meaning: "to",  strokes: 2 },
    { c: "な", label: "na",  meaning: "na",  strokes: 4 },
    { c: "に", label: "ni",  meaning: "ni",  strokes: 3 },
    { c: "ぬ", label: "nu",  meaning: "nu",  strokes: 2 },
    { c: "ね", label: "ne",  meaning: "ne",  strokes: 2 },
    { c: "の", label: "no",  meaning: "no",  strokes: 1 },
    { c: "は", label: "ha",  meaning: "ha",  strokes: 3 },
    { c: "ひ", label: "hi",  meaning: "hi",  strokes: 2 },
    { c: "ふ", label: "fu",  meaning: "fu",  strokes: 4 },
    { c: "へ", label: "he",  meaning: "he",  strokes: 1 },
    { c: "ほ", label: "ho",  meaning: "ho",  strokes: 4 },
    { c: "ま", label: "ma",  meaning: "ma",  strokes: 3 },
    { c: "み", label: "mi",  meaning: "mi",  strokes: 2 },
    { c: "む", label: "mu",  meaning: "mu",  strokes: 3 },
    { c: "め", label: "me",  meaning: "me",  strokes: 2 },
    { c: "も", label: "mo",  meaning: "mo",  strokes: 3 },
    { c: "や", label: "ya",  meaning: "ya",  strokes: 3 },
    { c: "ゆ", label: "yu",  meaning: "yu",  strokes: 2 },
    { c: "よ", label: "yo",  meaning: "yo",  strokes: 2 },
    { c: "ら", label: "ra",  meaning: "ra",  strokes: 2 },
    { c: "り", label: "ri",  meaning: "ri",  strokes: 2 },
    { c: "る", label: "ru",  meaning: "ru",  strokes: 1 },
    { c: "れ", label: "re",  meaning: "re",  strokes: 2 },
    { c: "ろ", label: "ro",  meaning: "ro",  strokes: 1 },
    { c: "わ", label: "wa",  meaning: "wa",  strokes: 2 },
    { c: "を", label: "wo",  meaning: "wo",  strokes: 3 },
    { c: "ん", label: "n",   meaning: "n",   strokes: 1 },
  ],
  katakana: [
    { c: "ア", label: "a",   meaning: "a",   strokes: 2 },
    { c: "イ", label: "i",   meaning: "i",   strokes: 2 },
    { c: "ウ", label: "u",   meaning: "u",   strokes: 3 },
    { c: "エ", label: "e",   meaning: "e",   strokes: 3 },
    { c: "オ", label: "o",   meaning: "o",   strokes: 3 },
    { c: "カ", label: "ka",  meaning: "ka",  strokes: 2 },
    { c: "キ", label: "ki",  meaning: "ki",  strokes: 3 },
    { c: "ク", label: "ku",  meaning: "ku",  strokes: 2 },
    { c: "ケ", label: "ke",  meaning: "ke",  strokes: 3 },
    { c: "コ", label: "ko",  meaning: "ko",  strokes: 2 },
    { c: "サ", label: "sa",  meaning: "sa",  strokes: 3 },
    { c: "シ", label: "shi", meaning: "shi", strokes: 3 },
    { c: "ス", label: "su",  meaning: "su",  strokes: 2 },
    { c: "セ", label: "se",  meaning: "se",  strokes: 2 },
    { c: "ソ", label: "so",  meaning: "so",  strokes: 2 },
    { c: "タ", label: "ta",  meaning: "ta",  strokes: 3 },
    { c: "チ", label: "chi", meaning: "chi", strokes: 3 },
    { c: "ツ", label: "tsu", meaning: "tsu", strokes: 3 },
    { c: "テ", label: "te",  meaning: "te",  strokes: 3 },
    { c: "ト", label: "to",  meaning: "to",  strokes: 2 },
    { c: "ナ", label: "na",  meaning: "na",  strokes: 2 },
    { c: "ニ", label: "ni",  meaning: "ni",  strokes: 3 },
    { c: "ヌ", label: "nu",  meaning: "nu",  strokes: 2 },
    { c: "ネ", label: "ne",  meaning: "ne",  strokes: 4 },
    { c: "ノ", label: "no",  meaning: "no",  strokes: 1 },
    { c: "ハ", label: "ha",  meaning: "ha",  strokes: 3 },
    { c: "ヒ", label: "hi",  meaning: "hi",  strokes: 2 },
    { c: "フ", label: "fu",  meaning: "fu",  strokes: 1 },
    { c: "ヘ", label: "he",  meaning: "he",  strokes: 1 },
    { c: "ホ", label: "ho",  meaning: "ho",  strokes: 4 },
    { c: "マ", label: "ma",  meaning: "ma",  strokes: 2 },
    { c: "ミ", label: "mi",  meaning: "mi",  strokes: 3 },
    { c: "ム", label: "mu",  meaning: "mu",  strokes: 2 },
    { c: "メ", label: "me",  meaning: "me",  strokes: 2 },
    { c: "モ", label: "mo",  meaning: "mo",  strokes: 3 },
    { c: "ヤ", label: "ya",  meaning: "ya",  strokes: 2 },
    { c: "ユ", label: "yu",  meaning: "yu",  strokes: 2 },
    { c: "ヨ", label: "yo",  meaning: "yo",  strokes: 3 },
    { c: "ラ", label: "ra",  meaning: "ra",  strokes: 2 },
    { c: "リ", label: "ri",  meaning: "ri",  strokes: 2 },
    { c: "ル", label: "ru",  meaning: "ru",  strokes: 2 },
    { c: "レ", label: "re",  meaning: "re",  strokes: 1 },
    { c: "ロ", label: "ro",  meaning: "ro",  strokes: 3 },
    { c: "ワ", label: "wa",  meaning: "wa",  strokes: 2 },
    { c: "ヲ", label: "wo",  meaning: "wo",  strokes: 3 },
    { c: "ン", label: "n",   meaning: "n",   strokes: 2 },
  ],
};

export default function KanjiTracer() {
  const canvasRef   = useRef(null);
  const isDrawing   = useRef(false);
  const lastPos     = useRef(null);
  const pathsRef    = useRef([]);
  const currentPath = useRef([]);

  const [activeScript, setActiveScript] = useState("kanji");
  const [selected, setSelected]         = useState(0);
  const [brushSize, setBrushSize]       = useState(18);
  const [inkColor,  setInkColor]        = useState("#991b1b");
  const [hasDrawn,  setHasDrawn]        = useState(false);
  const [showGuide, setShowGuide]       = useState(true);

  const INK_COLORS = [
    { hex: "#991b1b", label: "red"   },
    { hex: "#ffffff", label: "white" },
    { hex: "#0a0a0a", label: "black" },
  ];

  const chars = CHARACTERS[activeScript];
  const char  = chars[selected];

  // ── draw guide character onto canvas ──────────────────────────────────────
  const drawGuide = useCallback((ctx, ch, show) => {
    const { width: w, height: h } = ctx.canvas;
    if (!show) return;
    ctx.save();
    const base = Math.min(w, h);
    const fontSize = Math.round(base * 0.38);
    ctx.font         = `bold ${fontSize}px 'Noto Serif JP', serif`;
    ctx.textAlign    = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle    = "rgba(255,255,255,0.06)";
    ctx.fillText(ch, w / 2, h / 2);
    ctx.restore();
  }, []);

  // ── repaint everything from scratch ───────────────────────────────────────
  const repaint = useCallback((extraPath = null) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const { width: w, height: h } = canvas;

    ctx.clearRect(0, 0, w, h);

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

    drawGuide(ctx, chars[selected]?.c, showGuide);

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
  }, [selected, showGuide, drawGuide, chars]);

  // ── canvas sizing ──────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    function fit() {
      const parentW  = canvas.parentElement.clientWidth;
      const cssWidth  = Math.min(parentW, 920);
      const cssHeight = Math.min(420, cssWidth);
      canvas.width  = Math.round(cssWidth);
      canvas.height = Math.round(cssHeight);
      canvas.style.width  = `${cssWidth}px`;
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

  useEffect(() => { repaint(); }, [showGuide, repaint]);

  // When switching script tab, reset selection and clear
  const handleScriptChange = (scriptId) => {
    setActiveScript(scriptId);
    setSelected(0);
    pathsRef.current = [];
    currentPath.current = [];
    setHasDrawn(false);
  };

  // When switching character within same script, clear canvas
  const handleCharSelect = (i) => {
    setSelected(i);
    pathsRef.current = [];
    currentPath.current = [];
    setHasDrawn(false);
  };

  // Determine columns based on script (hiragana/katakana have 46 chars, kanji has 10)
  const gridCols = activeScript === "kanji" ? 10 : "auto-fill-8";

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
          margin-bottom: 14px;
        }

        /* ── Script tab switcher ── */
        .kt-tabs {
          display: flex;
          gap: 4px;
          margin-bottom: 14px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding-bottom: 0;
        }
        .kt-tab {
          padding: 6px 16px 8px;
          font-size: 12px;
          font-family: 'Outfit', sans-serif;
          letter-spacing: 0.06em;
          color: rgba(255,255,255,0.4);
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          transition: all 0.15s;
          position: relative;
          bottom: -1px;
        }
        .kt-tab:hover { color: rgba(255,255,255,0.7); }
        .kt-tab.active {
          color: rgba(252,165,165,0.9);
          border-bottom: 2px solid rgba(185,28,28,0.8);
        }

        /* ── Character grid ── */
        .kt-char-grid {
          display: grid;
          gap: 4px;
          margin-bottom: 14px;
        }
        .kt-char-grid.kanji-grid {
          grid-template-columns: repeat(10, 1fr);
        }
        .kt-char-grid.kana-grid {
          grid-template-columns: repeat(auto-fill, minmax(36px, 1fr));
        }
        @media (max-width: 500px) {
          .kt-char-grid.kanji-grid { grid-template-columns: repeat(5, 1fr); }
          .kt-char-grid.kana-grid  { grid-template-columns: repeat(auto-fill, minmax(32px, 1fr)); }
        }

        .kt-char-pill {
          aspect-ratio: 1;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Noto Serif JP', serif;
          font-size: 18px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 4px;
          cursor: pointer;
          color: rgba(255,255,255,0.7);
          transition: all 0.15s;
          padding: 0;
        }
        .kt-char-pill:hover { background: rgba(127,29,29,0.4); border-color: rgba(185,28,28,0.5); color: #fff; }
        .kt-char-pill.active {
          background: rgba(127,29,29,0.55);
          border: 1px solid rgba(185,28,28,0.8);
          color: #fff;
          box-shadow: 0 0 10px rgba(185,28,28,0.35);
        }

        /* ── Canvas ── */
        .kt-canvas-wrap {
          position: relative;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 6px;
          overflow: hidden;
          display: block;
          width: 100%;
        }
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

        /* ── Controls ── */
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
        .kt-btn:disabled { opacity: 0.3; cursor: not-allowed; }
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

        /* ── Char info strip ── */
        .kt-char-info {
          padding: 12px 16px;
          background: rgba(127,29,29,0.15);
          border: 1px solid rgba(185,28,28,0.25);
          border-radius: 4px;
          display: flex; gap: 20px; align-items: center;
          margin-bottom: 14px;
        }
        .kt-big-char {
          font-family: 'Noto Serif JP', serif;
          font-size: 36px;
          color: rgba(255,255,255,0.9);
          line-height: 1;
          text-shadow: 0 0 24px rgba(185,28,28,0.6);
        }
        .kt-char-meta { display: flex; flex-direction: column; gap: 3px; }
        .kt-char-meta .reading { font-size: 15px; color: rgba(255,255,255,0.75); }
        .kt-char-meta .meaning { font-size: 12px; color: rgba(255,255,255,0.4); letter-spacing: 0.05em; text-transform: uppercase; }
        .kt-char-meta .strokes { font-size: 11px; color: rgba(185,28,28,0.8); letter-spacing: 0.08em; text-transform: uppercase; margin-top: 4px; }

        /* ── Script badge ── */
        .kt-script-badge {
          margin-left: auto;
          padding: 3px 10px;
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          border-radius: 2px;
          background: rgba(127,29,29,0.3);
          border: 1px solid rgba(185,28,28,0.4);
          color: rgba(252,165,165,0.7);
        }
      `}</style>

      <Header />
      <div className="kt-root mt-4 mx-2">
        <div className="kt-section-label">文字練習 — Character Practice</div>

        {/* Script tab switcher */}
        <div className="kt-tabs">
          {SCRIPT_TABS.map((tab) => (
            <button
              key={tab.id}
              className={`kt-tab ${activeScript === tab.id ? "active" : ""}`}
              onClick={() => handleScriptChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Character picker grid */}
        <div className={`kt-char-grid ${activeScript === "kanji" ? "kanji-grid" : "kana-grid"}`}>
          {chars.map((ch, i) => (
            <button
              key={ch.c}
              className={`kt-char-pill ${i === selected ? "active" : ""}`}
              onClick={() => handleCharSelect(i)}
              title={`${ch.c} — ${ch.label}`}
            >
              {ch.c}
            </button>
          ))}
        </div>

        {/* Char info strip */}
        <div className="kt-char-info">
          <div className="kt-big-char">{char.c}</div>
          <div className="kt-char-meta">
            <span className="reading">
              {char.c} &nbsp;·&nbsp; {char.label}
            </span>
            <span className="meaning">
              {activeScript === "kanji" ? char.meaning : `sound: "${char.label}"`}
            </span>
            <span className="strokes">{char.strokes} stroke{char.strokes !== 1 ? "s" : ""}</span>
          </div>
          <span className="kt-script-badge">
            {activeScript === "kanji" ? "漢字" : activeScript === "hiragana" ? "ひらがな" : "カタカナ"}
          </span>
        </div>

        {/* Canvas */}
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

        {/* Ink color swatches */}
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
          <label className="kt-toggle" onClick={() => setShowGuide((v) => !v)}>
            <div className={`kt-toggle-box ${showGuide ? "on" : ""}`} />
            Guide
          </label>
        </div>

        {/* Brush size */}
        <div className="kt-brush-row">
          <label>Brush</label>
          <input
            type="range" min={8} max={36} step={2}
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
          />
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", minWidth: 24 }}>{brushSize}</span>
        </div>

        {/* Action buttons */}
        <div className="kt-controls" style={{ marginTop: 10 }}>
          <button className="kt-btn" onClick={undo} disabled={!hasDrawn}>↩ Undo</button>
          <button className="kt-btn danger" onClick={clearCanvas}>✕ Clear</button>
        </div>
      </div>
      <Footer />
    </>
  );
}