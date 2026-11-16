import { Icon } from "./Icons";
import { STATS } from "@/lib/content";

const PLAYER = [
	["Class", "Founder / CTO"],
	["Origin", "New York, NY"],
	["Base", "Utah"],
	["Guild", "Digitol Inc"],
	["Main", "TypeScript"],
	["After hours", "Unreal Engine"],
];

export function Hero() {
	return (
		<section className="hero" id="top">
			<canvas id="field" aria-hidden="true" />
			<div className="scan" aria-hidden="true" />
			<div className="wrap hero-grid">
				<div className="hero-copy">
					<pre className="boot" id="boot" aria-hidden="true" />
					<p className="hello">
						Hello,{" "}
						<span className="glitch" data-text="World">
							World
						</span>
						. I&apos;m
					</p>
					<h1 className="name" id="name" data-text="AARON MENDEZ">
						AARON MENDEZ
					</h1>
					<p className="role">
						<span>Founder</span>
						<i>/</i>
						<span>CTO</span>
						<i>/</i>
						<span>Full-stack engineer</span>
					</p>
					<p className="lede">
						I build companies end to end: the architecture, the product, the team and the pitch. Co-founder of{" "}
						<b>Digitol</b>, assisted living software running in production across Michigan facilities. Builder of{" "}
						<b>evvAI</b>, now approved for a pilot with one of Arizona&apos;s largest care homes. Off the clock I&apos;m
						building StreamerLoom, running AI agents that work while I sleep, and making a game in Unreal.
					</p>
					<div className="hero-actions">
						<a className="btn btn-primary" href="#quests">
							View quest log <Icon name="arrow" />
						</a>
						<a className="btn" href="#contact">
							Party up
						</a>
					</div>
				</div>

				<aside className="player-card reveal" aria-label="Player card">
					<div className="pc-head">
						<span className="pix">PLAYER 1</span>
						<span className="pc-online">
							<i /> ONLINE
						</span>
					</div>
					<div className="pc-avatar">
						{/* eslint-disable-next-line @next/next/no-img-element -- deliberately unoptimized: the moshed scanlines blur when resampled */}
						<img src="/assets/moshed1.jpeg" alt="Aaron Mendez" width={500} height={500} />
						<span className="pc-corner tl" />
						<span className="pc-corner tr" />
						<span className="pc-corner bl" />
						<span className="pc-corner br" />
					</div>
					<dl className="pc-stats">
						{PLAYER.map(([k, v]) => (
							<div key={k}>
								<dt>{k}</dt>
								<dd>{v}</dd>
							</div>
						))}
					</dl>
				</aside>
			</div>

			<div className="wrap">
				<ul className="stats reveal" aria-label="Stats">
					{STATS.map((s) => (
						<li key={s.label}>
							<b data-count={s.count} data-suffix={s.suffix}>
								0
							</b>
							<span>{s.label}</span>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
