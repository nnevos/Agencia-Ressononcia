import type { HeroAttributes } from "@/game/types";

const labels = [
  { key: "strength", label: "FORÇA" },
  { key: "agility", label: "AGILIDADE" },
  { key: "charisma", label: "CARISMA" },
  { key: "intelligence", label: "INTELIGÊNCIA" },
  { key: "vigor", label: "VIGOR" }
] as const;

const center = 120;
const radius = 78;

function point(index: number, fraction: number) {
  const angle = -Math.PI / 2 + (index * Math.PI * 2) / 5;
  return [center + Math.cos(angle) * radius * fraction, center + Math.sin(angle) * radius * fraction] as const;
}

export function HeroRadar({ attributes }: { attributes: HeroAttributes }) {
  const rings = [1, 2, 3, 4, 5].map((value) => labels.map((_, index) => point(index, value / 5).join(",")).join(" "));
  const valuePolygon = labels.map((item, index) => point(index, attributes[item.key] / 5).join(",")).join(" ");

  return (
    <div className="heroRadarWrap">
      <svg className="heroRadar" viewBox="0 0 240 240" role="img" aria-label="Gráfico de atributos do herói">
        {rings.map((ring, index) => <polygon key={ring} points={ring} className={`radarRing ring${index + 1}`} />)}
        {labels.map((_, index) => {
          const [x, y] = point(index, 1);
          return <line key={index} x1={center} y1={center} x2={x} y2={y} className="radarAxis" />;
        })}
        <polygon points={valuePolygon} className="radarValue" />
        {labels.map((item, index) => {
          const [x, y] = point(index, attributes[item.key] / 5);
          return <circle key={item.key} cx={x} cy={y} r="4.3" className="radarPoint" />;
        })}
      </svg>
      <div className="radarLabels">
        {labels.map((item) => <span key={item.key} className={`radarLabel radar-${item.key}`}><b>{item.label}</b><em>{attributes[item.key]}</em></span>)}
      </div>
    </div>
  );
}
