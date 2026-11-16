import { Icon } from "./Icons";
import { SectionHead } from "./SectionHead";
import { ACHIEVEMENTS } from "@/lib/content";

const TIER_LABEL = { legendary: "Legendary", epic: "Epic", rare: "Rare" };

export function Achievements() {
	const total = ACHIEVEMENTS.length + 2;
	return (
		<section className="section" id="achievements">
			<div className="wrap">
				<SectionHead tag="01 · ACHIEVEMENTS" title="Achievements unlocked">
					<span id="achCount">{ACHIEVEMENTS.length}</span> of <span id="achTotal">{total}</span> unlocked. One is still
					loading, one is hidden.
				</SectionHead>

				<div className="ach-grid" id="achGrid">
					{ACHIEVEMENTS.map((a) => (
						<article key={a.title} className={`ach ${a.tier} reveal${a.isNew ? " is-new" : ""}`}>
							<div className="ach-icon">
								<Icon name={a.icon} />
							</div>
							<div className="ach-body">
								<h3>
									{a.title}
									{a.isNew && <em className="new-tag">NEW</em>}
								</h3>
								<p>{a.desc}</p>
								<span className="ach-meta">
									<b>{TIER_LABEL[a.tier]}</b> · {a.meta}
								</span>
							</div>
						</article>
					))}

					<article className="ach locked reveal">
						<div className="ach-icon">
							<Icon name="lock" />
						</div>
						<div className="ach-body">
							<h3>Launch on Steam</h3>
							<p>Ship Keep Very Still to Steam.</p>
							<div className="ach-progress">
								<i />
							</div>
							<span className="ach-meta">
								<b>In progress</b> · Unreal Engine
							</span>
						</div>
					</article>

					{/* Filled in by the Konami code (see lib/site-effects.js). */}
					<article className="ach hidden-ach reveal" id="secretAch">
						<div className="ach-icon">
							<Icon name="q" />
						</div>
						<div className="ach-body">
							<h3>Hidden achievement</h3>
							<p>Some things are only for players who know the code.</p>
							<span className="ach-meta">
								<b>???</b>
							</span>
						</div>
					</article>
				</div>
			</div>
		</section>
	);
}
