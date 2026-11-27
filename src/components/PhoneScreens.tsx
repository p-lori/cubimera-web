/* Rendes iPhone SVG-keret + az app képernyőinek vektoros újraalkotása
   a SwiftUI-kód alapján (szövegek, színek, elrendezés az appból). */

const FONT = "Inter, -apple-system, 'SF Pro Text', system-ui, sans-serif";
const CYAN = "#22d3ee";
const MUTED = "#9aa0a6";
const CARD = "#1c1c1e";

/* Titán keret, oldalsó gombok, Dynamic Island, státuszsor — a kijelző
   tartalmát childrenként kapja (380×824-es koordinátákban). */
export function IPhoneSVG({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 420 880" className="h-auto w-full" role="img" aria-label="iPhone">
      <defs>
        <linearGradient id="titanium" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#767c84" />
          <stop offset="0.45" stopColor="#22262a" />
          <stop offset="1" stopColor="#565b62" />
        </linearGradient>
        <clipPath id="screenClip">
          <rect x="20" y="28" width="380" height="824" rx="64" />
        </clipPath>
      </defs>

      {/* oldalsó gombok */}
      <rect x="2" y="200" width="4" height="28" rx="2" fill="#43484e" />
      <rect x="2" y="240" width="4" height="52" rx="2" fill="#43484e" />
      <rect x="2" y="300" width="4" height="52" rx="2" fill="#43484e" />
      <rect x="414" y="260" width="4" height="72" rx="2" fill="#43484e" />

      {/* keret + káva */}
      <rect x="6" y="4" width="408" height="872" rx="92" fill="url(#titanium)" />
      <rect x="14" y="12" width="392" height="856" rx="84" fill="#000" />

      {/* kijelző */}
      <g clipPath="url(#screenClip)">
        <rect x="20" y="28" width="380" height="824" fill="#000" />
        <svg x="20" y="28" width="380" height="824" viewBox="0 0 380 824">
          {children}
        </svg>
        {/* tükröződés */}
        <rect
          x="20"
          y="28"
          width="380"
          height="824"
          rx="64"
          fill="url(#glare)"
          pointerEvents="none"
        />
      </g>
      <defs>
        <linearGradient id="glare" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.09" />
          <stop offset="0.35" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Dynamic Island */}
      <rect x="154" y="50" width="112" height="32" rx="16" fill="#000" stroke="#ffffff" strokeOpacity="0.1" />

      {/* státuszsor */}
      <text x="52" y="76" fill="#fff" fontSize="17" fontWeight="600" fontFamily={FONT}>
        9:41
      </text>
      <g fill="#fff">
        <rect x="312" y="66" width="3" height="9" rx="1" />
        <rect x="317" y="63" width="3" height="12" rx="1" />
        <rect x="322" y="60" width="3" height="15" rx="1" />
        <rect x="327" y="57" width="3" height="18" rx="1" />
        <path
          d="M340 62a10 10 0 0 1 14 0l-2.4 2.4a6.6 6.6 0 0 0-9.2 0L340 62zm3.4 3.4a5 5 0 0 1 7.2 0L348.2 68a1.6 1.6 0 0 0-2.4 0l-2.4-2.6zM347 72.5a2.2 2.2 0 1 0 0 .01z"
          fillRule="evenodd"
        />
        <rect x="358" y="60" width="22" height="12" rx="3.5" fill="none" stroke="#fff" strokeOpacity="0.6" />
        <rect x="360" y="62" width="15" height="8" rx="2" />
        <rect x="381" y="63.5" width="2.5" height="5" rx="1.2" fill="#fff" fillOpacity="0.6" />
      </g>
    </svg>
  );
}

function TabBar({ active }: { active: number }) {
  const tabs = ["Kamera", "Testek", "2D", "Profil"];
  return (
    <g>
      <rect x="0" y="772" width="380" height="52" fill="#000" />
      <rect x="0" y="772" width="380" height="1" fill="#fff" fillOpacity="0.12" />
      {tabs.map((t, i) => (
        <g key={t}>
          <circle cx={48 + i * 95} cy={792} r={9} fill={i === active ? CYAN : "none"}
            stroke={i === active ? CYAN : "#8e8e93"} strokeWidth={i === active ? 0 : 2} />
          <text
            x={48 + i * 95}
            y={812}
            textAnchor="middle"
            fill={i === active ? "#fff" : "#8e8e93"}
            fontSize="10"
            fontFamily={FONT}
          >
            {t}
          </text>
        </g>
      ))}
    </g>
  );
}

function Segmented({ y, left, right, selectedRight = true }: { y: number; left: string; right: string; selectedRight?: boolean }) {
  return (
    <g fontFamily={FONT} fontSize="13">
      <rect x="16" y={y} width="348" height="32" rx="9" fill="#2c2c2e" />
      {selectedRight ? (
        <g>
          <rect x="190" y={y + 2} width="172" height="28" rx="7" fill="#636366" />
          <text x="103" y={y + 21} textAnchor="middle" fill="#c7c7cc">{left}</text>
          <text x="276" y={y + 21} textAnchor="middle" fill="#fff" fontWeight="600">{right}</text>
        </g>
      ) : (
        <g>
          <rect x="18" y={y + 2} width="172" height="28" rx="7" fill="#636366" />
          <text x="104" y={y + 21} textAnchor="middle" fill="#fff" fontWeight="600">{left}</text>
          <text x="277" y={y + 21} textAnchor="middle" fill="#c7c7cc">{right}</text>
        </g>
      )}
    </g>
  );
}

/* 1. képernyő: Kamera fül, 3D szken módban (az app főképernyője) */
export function ScanScreen() {
  return (
    <g fontFamily={FONT}>
      <text x="190" y="78" textAnchor="middle" fill="#fff" fontSize="17" fontWeight="600">
        Kamera
      </text>

      {/* fejléc */}
      <rect x="16" y="100" width="44" height="44" rx="12" fill="#141416" stroke={CYAN} strokeOpacity="0.5" />
      <path d="M38 112l-9 5.5v11L38 134l9-5.5v-11L38 112zm0 0v11m-9-5.5l9 5.5m0 0l9-5.5"
        fill="none" stroke={CYAN} strokeWidth="1.8" strokeLinejoin="round" />
      <text x="70" y="120" fill="#fff" fontSize="15" fontWeight="600">Cubimera kamera</text>
      <text x="70" y="138" fill={MUTED} fontSize="11">Tedd le, tartsd nyomva, járd körbe.</text>

      <Segmented y={156} left="Fotó" right="3D szken" />
      <Segmented y={194} left="Földön" right="Kézben" selectedRight={false} />

      {/* kereső */}
      <rect x="16" y="238" width="348" height="352" rx="28" fill="#05090c" stroke={CYAN} strokeOpacity="0.25" />
      <g stroke="#12333a" strokeWidth="1">
        <line x1="16" y1="330" x2="364" y2="330" />
        <line x1="16" y1="420" x2="364" y2="420" />
        <line x1="16" y1="505" x2="364" y2="505" />
        <line x1="130" y1="238" x2="130" y2="590" />
        <line x1="250" y1="238" x2="250" y2="590" />
      </g>
      {/* drótváz henger a keresőben */}
      <g fill="none" stroke={CYAN} strokeWidth="2.5">
        <ellipse cx="190" cy="368" rx="72" ry="22" />
        <ellipse cx="190" cy="478" rx="72" ry="22" opacity="0.7" />
        <line x1="118" y1="368" x2="118" y2="478" />
        <line x1="262" y1="368" x2="262" y2="478" />
      </g>
      {/* sarokjelölők */}
      <g fill="none" stroke={CYAN} strokeWidth="3" strokeLinecap="round">
        <path d="M34 278v-12q0-10 10-10h12" />
        <path d="M346 278v-12q0-10-10-10h-12" />
        <path d="M34 550v12q0 10 10 10h12" />
        <path d="M346 550v12q0 10-10 10h-12" />
      </g>
      {/* hint pill */}
      <rect x="72" y="254" width="236" height="32" rx="16" fill="#000" fillOpacity="0.55" />
      <text x="190" y="275" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="600">
        Tartsd NYOMVA, és járd körbe
      </text>
      {/* mentett képek */}
      <rect x="132" y="542" width="116" height="30" rx="15" fill="#000" fillOpacity="0.55" />
      <text x="190" y="562" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">
        12 mentett kép
      </text>

      {/* exponáló */}
      <circle cx="190" cy="668" r="46" fill="none" stroke="#fff" strokeWidth="5" />
      <circle cx="190" cy="668" r="33" fill="#fff" />
      <text x="190" y="738" textAnchor="middle" fill={MUTED} fontSize="11" fontWeight="700">
        TARTSD NYOMVA
      </text>

      <TabBar active={0} />
    </g>
  );
}

/* 2. képernyő: „Befotózott test" — automata felismerés + térfogat/felszín */
export function ResultScreen() {
  const chips: [string, number, boolean][] = [
    ["Henger", 76, true],
    ["Kocka", 68, false],
    ["Kúp", 52, false],
    ["Gömb", 60, false],
  ];
  let cx = 30;
  const chipEls = chips.map(([label, w, sel]) => {
    const el = (
      <g key={label}>
        <rect x={cx} y={344} width={w} height={30} rx={15} fill={sel ? "#0a84ff" : "#3a3a3c"} />
        <text x={cx + w / 2} y={364} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">
          {label}
        </text>
      </g>
    );
    cx += w + 8;
    return el;
  });

  return (
    <g fontFamily={FONT}>
      <defs>
        <linearGradient id="photoGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0e2a33" />
          <stop offset="1" stopColor="#05090c" />
        </linearGradient>
        <linearGradient id="tealBtn" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2dd4bf" />
          <stop offset="1" stopColor="#0d9488" />
        </linearGradient>
      </defs>

      <text x="16" y="78" fill={CYAN} fontSize="14">‹ Kamera</text>
      <text x="190" y="78" textAnchor="middle" fill="#fff" fontSize="17" fontWeight="600">
        Befotózott test
      </text>

      {/* befotózott kép */}
      <rect x="16" y="100" width="348" height="132" rx="24" fill="url(#photoGrad)" />
      <g fill="none" stroke="#3a5a63" strokeWidth="2">
        <ellipse cx="190" cy="160" rx="46" ry="14" />
        <ellipse cx="190" cy="206" rx="46" ry="14" opacity="0.7" />
        <line x1="144" y1="160" x2="144" y2="206" />
        <line x1="236" y1="160" x2="236" y2="206" />
      </g>
      <rect x="62" y="108" width="256" height="30" rx="15" fill="#000" fillOpacity="0.55" />
      <text x="190" y="128" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="600">
        ⏳ Hiányos — méretezés ajánlott
      </text>

      {/* automata felismerés */}
      <rect x="16" y="240" width="348" height="56" rx="14" fill={CYAN} fillOpacity="0.12" />
      <text x="190" y="262" textAnchor="middle" fill="#7deefc" fontSize="11.5" fontWeight="700">
        Automata felismerés: Henger · 96%
      </text>
      <text x="190" y="278" textAnchor="middle" fill="#7deefc" fontSize="10" opacity="0.75">
        ha téves, válassz másikat
      </text>

      {/* testválasztó */}
      <rect x="16" y="304" width="348" height="104" rx="20" fill={CARD} />
      <text x="30" y="330" fill="#fff" fontSize="15" fontWeight="700">
        Milyen testet fotóztál?
      </text>
      {chipEls}

      {/* 3D nézet */}
      <rect x="16" y="416" width="348" height="186" rx="20" fill={CARD} />
      <text x="30" y="442" fill="#fff" fontSize="15" fontWeight="700">
        Így néz ki 3D-ben
      </text>
      <g fill="none" stroke={CYAN} strokeWidth="2">
        <ellipse cx="190" cy="480" rx="52" ry="15" />
        <ellipse cx="190" cy="548" rx="52" ry="15" opacity="0.7" />
        <line x1="138" y1="480" x2="138" y2="548" />
        <line x1="242" y1="480" x2="242" y2="548" />
      </g>
      <g fontSize="10" fill={MUTED}>
        <circle cx="92" cy="588" r="4" fill={CYAN} />
        <text x="102" y="592">látható él</text>
        <circle cx="182" cy="588" r="4" fill="#8e8e93" />
        <text x="192" y="592">takart él</text>
        <circle cx="262" cy="588" r="4" fill="#ff9f0a" />
        <text x="272" y="592">átló</text>
      </g>

      {/* számítás */}
      <rect x="16" y="610" width="348" height="100" rx="20" fill={CARD} />
      <text x="30" y="636" fill="#fff" fontSize="15" fontWeight="700">
        Méretek és számítás
      </text>
      <text x="30" y="662" fill="#c7c7cc" fontSize="14">Térfogat V</text>
      <text x="350" y="662" textAnchor="end" fill="#fff" fontSize="14" fontWeight="700">
        98,2 cm³
      </text>
      <text x="30" y="686" fill="#c7c7cc" fontSize="14">Felszín A</text>
      <text x="350" y="686" textAnchor="end" fill="#fff" fontSize="14" fontWeight="700">
        117,8 cm²
      </text>

      {/* gyorsmérés gomb */}
      <rect x="16" y="718" width="348" height="42" rx="21" fill="url(#tealBtn)" />
      <text x="190" y="745" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="700">
        Gyorsmérés (≈1 mp)
      </text>

      <TabBar active={0} />
    </g>
  );
}
