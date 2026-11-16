import { Icon } from "./Icons";
import { SectionHead } from "./SectionHead";

type QuestProps = {
	id: string;
	type: string;
	status: { kind: "live" | "pilot" | "auto" | "soon"; label: string };
	title: React.ReactNode;
	role: string;
	list?: string[];
	chips: string[];
	link?: { href: string; label: string };
	className?: string;
	extra?: React.ReactNode;
	vis: React.ReactNode;
	children: React.ReactNode;
};

function Quest({ id, type, status, title, role, list, chips, link, className = "", extra, vis, children }: QuestProps) {
	return (
		<article className={`quest reveal ${className}`} id={id}>
			<div className="quest-info">
				<div className="quest-top">
					<span className="q-type">{type}</span>
					<span className={`q-status ${status.kind}`}>
						<i /> {status.label}
					</span>
				</div>
				{title}
				<p className="q-role">{role}</p>
				{children}
				{list && (
					<ul className="q-list">
						{list.map((li) => (
							<li key={li}>{li}</li>
						))}
					</ul>
				)}
				<Chips items={chips} />
				{extra}
				{link && <QuestLink {...link} />}
			</div>
			{vis}
		</article>
	);
}

function Chips({ items }: { items: string[] }) {
	return (
		<div className="chips">
			{items.map((c) => (
				<span key={c}>{c}</span>
			))}
		</div>
	);
}

function QuestLink({ href, label }: { href: string; label: string }) {
	return (
		<a className="q-link" href={href} target="_blank" rel="noopener">
			{label} <Icon name="arrow" />
		</a>
	);
}

function VisBar({ children }: { children: React.ReactNode }) {
	return (
		<div className="vis-bar">
			<span>{children}</span>
			<span className="vis-dots">
				<i />
				<i />
				<i />
			</span>
		</div>
	);
}

export function Quests() {
	return (
		<section className="section" id="quests">
			<div className="wrap">
				<SectionHead tag="02 · QUEST LOG" title="What I've built">
					Main quests, side quests, and the one I build after midnight. Every one is a system I designed and shipped.
				</SectionHead>

				<Quest
					id="q-digitol"
					type="Main quest"
					status={{ kind: "live", label: "In production · MI" }}
					title={<h3>Digitol</h3>}
					role="CTO & Co-Founder · Apr 2024 – Present · Ann Arbor, MI"
					list={[
						"eMAR and med pass: scheduled and PRN doses, narcotic counts, every dose timestamped and e-signed",
						"AI capture: photo of an Rx label or intake packet → pre-filled record, human sign-off required",
						"Incidents, care plans, staff scheduling and credential tracking in one login",
						"Audit log, PII masking and server-enforced role-based access for each facility",
						"Led investor meetings, closed funding, ran the team's standups",
					]}
					chips={["React (Vite)", "Node.js", "PostgreSQL", "AWS", "Terraform", "AI document capture", "HIPAA"]}
					link={{ href: "https://digitol.io", label: "digitol.io" }}
					vis={
						<div className="quest-vis">
							<VisBar>access_matrix.ts</VisBar>
							<div className="rbac" id="rbac" aria-label="Animated role-based access matrix" />
							<p className="vis-note mono" id="rbacLog">
								&gt; policy check…
							</p>
						</div>
					}
				>
					<p>
						One platform for a whole assisted living facility: eMAR, resident care, incidents, staffing and compliance.
						It&apos;s simple enough for caregivers and serious enough for survey day. I built it from an empty repo and
						moved to Michigan to build it next to operators on the ground. Today it&apos;s live with real users in a
						handful of Michigan facilities.
					</p>
				</Quest>

				<Quest
					id="q-evv"
					type="Main quest"
					status={{ kind: "pilot", label: "Pilot approved · AZ" }}
					title={<h3>evvAI</h3>}
					role="Builder · Third-party presence verification for Medicaid behavioral health"
					list={[
						"Three signals in under 2 seconds: a live snapshot (never an upload), location inside the geofence, and a registered device",
						"Three-angle face capture tracked on-device with MediaPipe; kiosks enrolled with passkeys",
						"Server-set timestamps and an append-only SHA-256 chain, sealed and signed every night",
						"Claims scoring for CSV / 837P with explainable reason codes; Claude gives a second opinion on pseudonymised data",
					]}
					chips={["Next.js", "TypeScript", "Prisma", "PlanetScale", "Auth.js", "Rekognition", "Claude", "Vercel"]}
					extra={
						<p className="q-callout">
							<Icon name="pulse" />
							Approved for a pilot with one of the largest care homes in Arizona.
						</p>
					}
					link={{ href: "https://evvai.vercel.app/", label: "evvai.vercel.app" }}
					vis={
						<div className="quest-vis">
							<VisBar>attestation_chain.log</VisBar>
							<ol className="chain" id="chain" aria-live="off" />
							<div className="chain-foot">
								<span className="mono" id="chainStatus">
									verify(): <b className="ok">OK</b>
								</span>
								<button className="btn btn-small" id="tamper" type="button">
									Tamper with a record
								</button>
							</div>
						</div>
					}
				>
					<p>
						<b>Proof the service happened.</b> A signature on a sheet only proves someone signed a sheet. evvAI captures
						live evidence at a kiosk check-in and chains every record, so nothing can be edited after the fact. Billers
						see who was there, for how long, and exactly how sure we are.
					</p>
				</Quest>

				<Quest
					id="q-ultron"
					type="Side quest · R&D"
					status={{ kind: "auto", label: "Autopilot" }}
					title={<h3>Project Ultron</h3>}
					role="Multi-agent orchestration lab · Claude Agent SDK"
					list={[
						"Nine roles, each one a prompt, a station and a set of tools",
						"A critic-and-revise loop, resumable runs, crash retries",
						"Daily market strategist, autopilot with cost and publish caps",
						"Every agent streams events over SSE; anything that can POST JSON can join",
					]}
					chips={["Claude Agent SDK", "Node.js", "SSE", "Canvas", "Etsy API", "launchd"]}
					link={{ href: "https://www.etsy.com/shop/BundleBarnCrafts", label: "See what the agents shipped: BundleBarnCrafts on Etsy" }}
					vis={
						<div className="quest-vis quest-vis-ultron">
							<VisBar>
								station_deck · <b id="clock">02:00</b> local, Aaron asleep
							</VisBar>
							<canvas id="deck" width={320} height={168} aria-label="Animated pixel station with AI agents moving between rooms" />
							<pre className="ticker mono" id="ticker" />
						</div>
					}
				>
					<p>
						I built this to learn how to get AI agents to work together while I sleep. It&apos;s a pixel space station
						where every agent is a sprite walking between rooms: a scout researches the market, an artist designs, a
						critic rejects weak work and sends it back, and a shopkeeper lists what passes on Etsy. Making money is a
						side effect. The point is the coordination.
					</p>
				</Quest>

				<Quest
					id="q-kvs"
					className="quest-kvs"
					type="After-hours quest"
					status={{ kind: "soon", label: "Coming to Steam" }}
					title={
						<h3 className="kvs-title" data-text="KEEP VERY STILL">
							KEEP VERY STILL
						</h3>
					}
					role="Indie game · Unreal Engine · In development"
					chips={["Unreal Engine", "Blueprints", "C++", "Steam"]}
					vis={
						<div className="quest-vis kvs-vis" id="kvs">
							<div className="kvs-eye" id="eye" aria-hidden="true">
								<svg viewBox="0 0 120 60">
									<path className="lid" d="M4 30 Q60 -6 116 30 Q60 66 4 30Z" />
									<circle className="iris" id="iris" cx="60" cy="30" r="15" />
									<circle className="pupil" id="pupil" cx="60" cy="30" r="6" />
								</svg>
							</div>
							<div className="kvs-meter">
								<i id="kvsFill" />
							</div>
							<p className="kvs-msg mono" id="kvsMsg">
								It only sees you when you move.
							</p>
							<button className="btn btn-primary" id="kvsStart" type="button">
								Begin
							</button>
							<div className="kvs-reveal" id="kvsReveal" hidden>
								<span className="pix">ACCESS GRANTED</span>
								<p>You stayed still. Keep Very Still is coming soon to Steam. The wishlist link goes up at announce.</p>
							</div>
						</div>
					}
				>
					<p>
						After hours I&apos;m a game dev. Keep Very Still is my Unreal Engine game, built at night and on weekends,
						and it&apos;s close to launch on Steam. Details are classified for now.
					</p>
					<p className="kvs-hint">To get the briefing, pass the test →</p>
				</Quest>

				<div className="mini-quests">
					<article className="mini reveal">
						<div className="quest-top">
							<span className="q-type">Side quest</span>
							<span className="q-status soon">
								<i /> In build
							</span>
						</div>
						<div className="mini-head">
							<span className="mini-icon">
								<Icon name="wave" />
							</span>
							<h3>StreamerLoom</h3>
						</div>
						<p>
							A platform that connects streamers with indie devs. I&apos;m an indie dev myself, so I&apos;m building the
							tool I want: one place where small games find the creators who&apos;ll play them on stream.
						</p>
						<QuestLink href="https://streamerloom.com" label="streamerloom.com" />
					</article>
					<article className="mini reveal">
						<div className="quest-top">
							<span className="q-type">Co-op</span>
							<span className="q-status live">
								<i /> Live
							</span>
						</div>
						<div className="mini-head">
							<span className="mini-icon">
								<Icon name="heart" />
							</span>
							<h3>Jounce In</h3>
						</div>
						<p>
							My mom&apos;s app. I got her into tech, she started building, and now I push code to it when she needs
							another pair of hands.
						</p>
						<QuestLink href="https://jouncein.com" label="jouncein.com" />
					</article>
				</div>
			</div>
		</section>
	);
}
