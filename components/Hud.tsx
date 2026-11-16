export function Hud() {
	return (
		<header className="hud" id="hud">
			<div className="hud-inner">
				<a className="hud-logo" href="#top" aria-label="Back to top">
					<span className="logo-mark">AM</span>
					<span className="logo-slash">//</span>
					<span className="logo-sub">mendez.sys</span>
				</a>
				<nav className="hud-nav" aria-label="Sections">
					<a href="#achievements">Achievements</a>
					<a href="#quests">Quests</a>
					<a href="#route">Route</a>
					<a href="#loadout">Loadout</a>
					<a href="#contact" className="hud-cta">
						Party up
					</a>
				</nav>
				<div className="hud-level" aria-hidden="true">
					<span className="pix">LVL</span> <b id="lvl">01</b>
				</div>
			</div>
			<div className="xp" aria-hidden="true">
				<i id="xpFill" />
			</div>
		</header>
	);
}
