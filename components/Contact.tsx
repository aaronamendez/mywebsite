import { Icon } from "./Icons";
import { SectionHead } from "./SectionHead";
import { CLASSES } from "@/lib/content";

export function Contact() {
	return (
		<section className="section contact" id="contact">
			<div className="wrap">
				<SectionHead tag="05 · MULTIPLAYER" title="Party up">
					Looking for co-op. Pick your class.
				</SectionHead>
				<div className="classes">
					{CLASSES.map((c) => (
						<div key={c.name} className="class-card reveal">
							<span className="pix">{c.name}</span>
							<p>{c.desc}</p>
						</div>
					))}
				</div>

				<div className="start reveal">
					<p className="press pix" aria-hidden="true">
						PRESS START
					</p>
					<div className="start-actions">
						<a className="btn btn-primary" href="https://www.linkedin.com/in/aaronamendeznyc/" target="_blank" rel="noopener">
							LinkedIn <Icon name="arrow" />
						</a>
						<a className="btn" href="mailto:aaronamendez1@gmail.com">
							aaronamendez1@gmail.com
						</a>
						<a className="btn" href="https://github.com/aaronamendez" target="_blank" rel="noopener">
							GitHub
						</a>
						<a className="btn" href="/Aaron_Mendez_Resume.pdf" target="_blank" rel="noopener">
							Résumé (PDF)
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}

export function Footer() {
	return (
		<>
			<footer className="foot">
				<div className="wrap foot-inner">
					<span className="mono">
						© <span id="year">{new Date().getFullYear()}</span> Aaron Mendez · NYC → MI → UT
					</span>
					<span className="mono foot-mid">↑ ↑ ↓ ↓ ← → ← → B A</span>
					<a className="mono" href="/legacy/index.html">
						Play v1 (2021) →
					</a>
				</div>
			</footer>

			{/* Visitor achievements */}
			<div className="toasts" id="toasts" aria-live="polite" />
			<div className="visitor mono" id="visitor" title="Your achievements on this site">
				<span className="pix">YOU</span> <b id="vCount">0</b>/5
			</div>
		</>
	);
}
