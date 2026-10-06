import type { OperationalHero } from "@/game/types";
import type { MissionRequirementFit } from "@/game/simulation/resolveIncident";

const axes = [
  { key: "strength", label: "FORÇA" },
  { key: "agility", label: "AGILIDADE" },
  { key: "charisma", label: "CARISMA" },
  { key: "intelligence", label: "INTELIGÊNCIA" },
  { key: "vigor", label: "VIGOR" },
] as const;

const center = 150;
const radius = 104;
const visualMax = 8;

function point(index: number, value: number) {
  const angle = -Math.PI / 2 + (index * Math.PI * 2) / axes.length;
  const fraction = Math.max(0, Math.min(1, value / visualMax));
  return [center + Math.cos(angle) * radius * fraction, center + Math.sin(angle) * radius * fraction] as const;
}

function formatValue(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1).replace(".0", "");
}

export function MissionRequirementRadar({
  heroes,
  requirements,
}: {
  heroes: OperationalHero[];
  requirements: MissionRequirementFit[];
}) {
  const requirementByAttribute = new Map(requirements.map((item) => [item.attribute, item]));
  const provided = Object.fromEntries(
    axes.map(({ key }) => [key, heroes.reduce((sum, hero) => sum + hero.attributes[key], 0)])
  ) as Record<(typeof axes)[number]["key"], number>;

  const teamPolygon = axes.map((axis, index) => point(index, provided[axis.key]).join(",")).join(" ");
  const targetPolygon = axes.map((axis, index) => point(index, requirementByAttribute.get(axis.key)?.required ?? 0).join(",")).join(" ");
  const rings = [2, 4, 6, 8].map((value) => axes.map((_, index) => point(index, value).join(",")).join(" "));

  const ariaSummary = axes.map((axis) => {
    const req = requirementByAttribute.get(axis.key);
    return `${axis.label}: equipe ${formatValue(provided[axis.key])}${req ? `, necessário ${formatValue(req.required)}` : ", sem requisito específico"}`;
  }).join("; ");

  return (
    <div className="missionRequirementRadarWrap">
      <svg className="missionRequirementRadar" viewBox="0 0 300 300" role="img" aria-label={`Comparação de atributos da equipe com o necessário para a missão. ${ariaSummary}`}>
        {rings.map((ring, index) => <polygon key={ring} points={ring} className={`missionRadarRing ring${index + 1}`} />)}
        {axes.map((_, index) => {
          const [x, y] = point(index, visualMax);
          return <line key={index} x1={center} y1={center} x2={x} y2={y} className="missionRadarAxis" />;
        })}
        <polygon points={targetPolygon} className="missionRadarTarget" />
        <polygon points={teamPolygon} className="missionRadarTeam" />
        {axes.map((axis, index) => {
          const req = requirementByAttribute.get(axis.key);
          if (!req) return null;
          const [x, y] = point(index, req.required);
          return <circle key={`target-${axis.key}`} cx={x} cy={y} r="5" className={`missionRadarTargetPoint ${req.importance.toLowerCase()}`} />;
        })}
        {axes.map((axis, index) => {
          const [x, y] = point(index, provided[axis.key]);
          return <circle key={`team-${axis.key}`} cx={x} cy={y} r="4.5" className="missionRadarTeamPoint" />;
        })}
      </svg>
      <div className="missionRadarLabels" aria-hidden="true">
        {axes.map((axis) => {
          const req = requirementByAttribute.get(axis.key);
          return (
            <span key={axis.key} className={`missionRadarLabel mission-radar-${axis.key}`}>
              <b>{axis.label}</b>
              <em>{formatValue(provided[axis.key])}</em>
              {req ? <small>necessário {formatValue(req.required)}</small> : <small>sem exigência</small>}
            </span>
          );
        })}
      </div>
      <div className="missionRadarLegend" aria-hidden="true">
        <span className="team"><i />EQUIPE</span>
        <span className="target"><i />NECESSÁRIO</span>
      </div>
    </div>
  );
}
