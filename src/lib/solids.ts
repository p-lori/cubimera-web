// Az app Solids.swift képleteinek portja — az interaktív demó ugyanazt számolja.
export type SolidId = "cube" | "cuboid" | "cylinder" | "pyramid" | "cone" | "sphere";

export interface SolidDef {
  id: SolidId;
  name: string;
  params: { key: string; label: string; min: number; max: number; def: number }[];
  volume: (p: number[]) => number;
  surface: (p: number[]) => number;
}

export const SOLIDS: SolidDef[] = [
  {
    id: "cube",
    name: "Kocka",
    params: [{ key: "a", label: "él a", min: 1, max: 20, def: 4 }],
    volume: ([a]) => Math.pow(a, 3),
    surface: ([a]) => 6 * a * a,
  },
  {
    id: "cuboid",
    name: "Téglatest",
    params: [
      { key: "a", label: "él a", min: 1, max: 20, def: 5 },
      { key: "b", label: "él b", min: 1, max: 20, def: 3 },
      { key: "c", label: "él c", min: 1, max: 20, def: 4 },
    ],
    volume: ([a, b, c]) => a * b * c,
    surface: ([a, b, c]) => 2 * (a * b + b * c + c * a),
  },
  {
    id: "cylinder",
    name: "Henger",
    params: [
      { key: "r", label: "sugár r", min: 0.5, max: 10, def: 2.5 },
      { key: "h", label: "magasság m", min: 1, max: 20, def: 5 },
    ],
    volume: ([r, h]) => Math.PI * r * r * h,
    surface: ([r, h]) => 2 * Math.PI * r * (r + h),
  },
  {
    id: "pyramid",
    name: "Gúla",
    params: [
      { key: "a", label: "alapél a", min: 1, max: 20, def: 4 },
      { key: "h", label: "magasság m", min: 1, max: 20, def: 5 },
    ],
    volume: ([a, h]) => ((a * a) * h) / 3,
    surface: ([a, h]) => a * a + 2 * a * Math.hypot(h, a / 2),
  },
  {
    id: "cone",
    name: "Kúp",
    params: [
      { key: "r", label: "sugár r", min: 0.5, max: 10, def: 3 },
      { key: "h", label: "magasság m", min: 1, max: 20, def: 6 },
    ],
    volume: ([r, h]) => (Math.PI * r * r * h) / 3,
    surface: ([r, h]) => Math.PI * r * (r + Math.hypot(r, h)),
  },
  {
    id: "sphere",
    name: "Gömb",
    params: [{ key: "r", label: "sugár r", min: 0.5, max: 10, def: 3 }],
    volume: ([r]) => (4 / 3) * Math.PI * Math.pow(r, 3),
    surface: ([r]) => 4 * Math.PI * r * r,
  },
];

export const fmt = (n: number) =>
  n.toLocaleString("hu-HU", { maximumFractionDigits: 1 });
