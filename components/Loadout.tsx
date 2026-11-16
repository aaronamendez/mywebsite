import { SectionHead } from "./SectionHead";
import { LOADOUT } from "@/lib/content";

export function Loadout() {
	return (
		<section className="section" id="loadout">
			<div className="wrap">
				<SectionHead tag="04 · LOADOUT" title="Equipped">
					The tools I bring to a build, from the first commit to production.
				</SectionHead>
				<div className="loadout">
					{LOADOUT.map((s) => (
						<div key={s.slot} className="slot reveal">
							<h3>
								<span className="pix">SLOT {s.slot}</span> {s.name}
							</h3>
							<div className="chips">
								{s.items.map((i) => (
									<span key={i}>{i}</span>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
