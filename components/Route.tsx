import { SectionHead } from "./SectionHead";
import { CAREER } from "@/lib/content";

const PATH = "M880 190 C 760 60, 640 60, 560 140 S 300 250, 130 130";

const STAGES = [
	{ cls: "n-ny", tag: "STAGE 1", place: "New York", note: "Origin · Simulate, Clover, Korr" },
	{ cls: "n-mi", tag: "STAGE 2", place: "Ann Arbor, MI", note: "Built Digitol with operators on the ground. Now live in MI facilities." },
	{ cls: "n-ut current", tag: "STAGE 3 · YOU ARE HERE", place: "Utah", note: "Current base · evvAI, Ultron, Keep Very Still" },
];

export function Route() {
	return (
		<section className="section" id="route">
			<div className="wrap">
				<SectionHead tag="03 · WORLD MAP" title="The route so far">
					Raised in New York. Built in Michigan. Based in Utah.
				</SectionHead>

				<div className="map reveal">
					<svg className="map-svg" viewBox="0 0 1000 300" preserveAspectRatio="none" aria-hidden="true">
						<defs>
							<linearGradient id="routeGrad" x1="1" x2="0">
								<stop offset="0" stopColor="#ff3d8b" />
								<stop offset=".5" stopColor="#b07cff" />
								<stop offset="1" stopColor="#5cf2ff" />
							</linearGradient>
						</defs>
						<path className="route-bg" d={PATH} />
						<path className="route" d={PATH} />
					</svg>
					{STAGES.map((s) => (
						<div key={s.place} className={`node ${s.cls}`}>
							<span className="node-dot" />
							<span className="pix">{s.tag}</span>
							<b>{s.place}</b>
							<small>{s.note}</small>
						</div>
					))}
				</div>

				<ol className="log reveal">
					{CAREER.map((c) => (
						<li key={c.org}>
							<span className="log-when mono">{c.when}</span>
							<div>
								<b>{c.org}</b> · {c.role}
								<p>{c.desc}</p>
							</div>
						</li>
					))}
				</ol>
			</div>
		</section>
	);
}
