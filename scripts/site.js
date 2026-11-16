/* aaronamendez.com v2 */
(() => {
	"use strict";

	const $ = (s, el = document) => el.querySelector(s);
	const $$ = (s, el = document) => [...el.querySelectorAll(s)];
	const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	const rand = (a, b) => a + Math.random() * (b - a);
	const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
	const pad = (n) => String(n).padStart(2, "0");

	// Run fn on every frame only while el is on screen and the tab is visible.
	function whileVisible(el, fn) {
		let on = false;
		let raf = 0;
		let last = 0;
		const loop = (t) => {
			const dt = Math.min(0.05, (t - (last || t)) / 1000);
			last = t;
			fn(dt, t / 1000);
			raf = requestAnimationFrame(loop);
		};
		const sync = (visible) => {
			if (visible && !document.hidden && !on) {
				on = true;
				last = 0;
				raf = requestAnimationFrame(loop);
			} else if ((!visible || document.hidden) && on) {
				on = false;
				cancelAnimationFrame(raf);
			}
		};
		let inView = false;
		new IntersectionObserver(([e]) => sync((inView = e.isIntersecting))).observe(el);
		document.addEventListener("visibilitychange", () => sync(inView));
	}

	/* ---------- Visitor achievements ---------- */

	const STORE = "am-visitor-v2";
	const VISITOR = {
		scout: { icon: "i-eye", title: "Scout", desc: "Opened the quest log." },
		tamper: { icon: "i-chain", title: "Tamper Detected", desc: "You broke the chain. evvAI noticed." },
		still: { icon: "i-moon", title: "Kept Very Still", desc: "It never saw you move." },
		konami: { icon: "i-crown", title: "Cheat Code", desc: "↑↑↓↓←→←→BA. Respect." },
		complete: { icon: "i-party", title: "Completionist", desc: "Made it to the end. Say hi." },
	};
	let unlocked = new Set();
	try {
		unlocked = new Set(JSON.parse(localStorage.getItem(STORE) || "[]"));
	} catch (_) {}

	const vCount = $("#vCount");
	const toasts = $("#toasts");
	const renderCount = () => (vCount.textContent = unlocked.size);
	renderCount();

	function unlock(id) {
		if (unlocked.has(id) || !VISITOR[id]) return;
		unlocked.add(id);
		try {
			localStorage.setItem(STORE, JSON.stringify([...unlocked]));
		} catch (_) {}
		renderCount();
		const a = VISITOR[id];
		const t = document.createElement("div");
		t.className = "toast";
		t.innerHTML = `<span class="toast-icon"><svg><use href="#${a.icon}"/></svg></span>
			<div><span class="pix">ACHIEVEMENT UNLOCKED · ${unlocked.size}/5</span><b>${a.title}</b><small>${a.desc}</small></div>`;
		toasts.appendChild(t);
		setTimeout(() => {
			t.classList.add("out");
			setTimeout(() => t.remove(), 400);
		}, 4200);
	}

	/* ---------- HUD: XP bar, level, active nav ---------- */

	const xpFill = $("#xpFill");
	const lvl = $("#lvl");
	function onScroll() {
		const max = document.documentElement.scrollHeight - innerHeight;
		const p = max > 0 ? Math.min(1, scrollY / max) : 0;
		xpFill.style.width = p * 100 + "%";
		lvl.textContent = pad(1 + Math.floor(p * 98));
	}
	addEventListener("scroll", onScroll, { passive: true });
	addEventListener("resize", onScroll);
	onScroll();

	const navLinks = $$(".hud-nav a");
	const navObs = new IntersectionObserver(
		(entries) => {
			for (const e of entries) {
				if (!e.isIntersecting) continue;
				navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
			}
		},
		{ rootMargin: "-45% 0px -50% 0px" }
	);
	$$("main > section[id]").forEach((s) => navObs.observe(s));

	const onceInView = (el, fn, threshold = 0.25) => {
		const o = new IntersectionObserver(([e]) => {
			if (e.isIntersecting) {
				o.disconnect();
				fn();
			}
		}, { threshold });
		o.observe(el);
	};
	onceInView($("#quests"), () => unlock("scout"), 0.1);
	onceInView($("#contact .start"), () => unlock("complete"), 0.6);

	/* ---------- Reveal on scroll ---------- */

	const revObs = new IntersectionObserver(
		(entries) => {
			for (const e of entries) {
				if (!e.isIntersecting) continue;
				e.target.classList.add("in");
				revObs.unobserve(e.target);
			}
		},
		{ rootMargin: "0px 0px -8% 0px" }
	);
	$$(".reveal").forEach((el) => {
		const sibs = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
		if (sibs.length > 2) el.style.transitionDelay = (sibs.indexOf(el) % 3) * 70 + "ms";
		revObs.observe(el);
	});

	/* ---------- Boot sequence + name scramble ---------- */

	const BOOT = [
		["> init mendez.sys v2.0", ""],
		["> origin ......... NEW YORK", " [ok]"],
		["> route .......... NYC → MI → UT", " [ok]"],
		["> quests ......... digitol · evvai · ultron · streamerloom · kvs", " [ok]"],
		["> status ......... BUILDING", ""],
	];
	const boot = $("#boot");
	if (reduced) {
		boot.textContent = BOOT.map((l) => l.join("")).join("\n");
	} else {
		let li = 0;
		let ci = 0;
		let done = "";
		const tick = () => {
			if (li >= BOOT.length) {
				boot.innerHTML = done + '<span class="caret">&nbsp;</span>';
				return;
			}
			const [text, ok] = BOOT[li];
			ci += 2;
			const part = text.slice(0, ci);
			boot.innerHTML = done + part + '<span class="caret">&nbsp;</span>';
			if (ci >= text.length) {
				done += text + (ok ? `<span class="dim">${ok}</span>` : "") + (li < BOOT.length - 1 ? "\n" : "");
				li++;
				ci = 0;
				setTimeout(tick, 140);
			} else setTimeout(tick, 14);
		};
		setTimeout(tick, 250);
	}

	const GLYPHS = "!<>-_\\/[]{}=+*^?#01ABCDEF";
	function scramble(el, finalText, ms = 900) {
		if (reduced) return;
		const start = performance.now();
		const step = (t) => {
			const p = Math.min(1, (t - start) / ms);
			const n = Math.floor(p * finalText.length);
			let out = finalText.slice(0, n);
			for (let i = n; i < finalText.length; i++) out += finalText[i] === " " ? " " : pick(GLYPHS);
			el.textContent = out;
			if (p < 1) requestAnimationFrame(step);
		};
		requestAnimationFrame(step);
	}
	const nameEl = $("#name");
	const NAME = nameEl.dataset.text;
	setTimeout(() => scramble(nameEl, NAME, 1100), 300);
	let scrambling = false;
	nameEl.addEventListener("mouseenter", () => {
		if (scrambling) return;
		scrambling = true;
		scramble(nameEl, NAME, 600);
		setTimeout(() => (scrambling = false), 700);
	});

	/* ---------- Hero dot field ---------- */

	const field = $("#field");
	const fctx = field.getContext("2d");
	const hero = $(".hero");
	let fw = 0;
	let fh = 0;
	let dots = [];
	const mouse = { x: -9999, y: -9999 };
	function sizeField() {
		const dpr = Math.min(2, devicePixelRatio || 1);
		fw = hero.clientWidth;
		fh = hero.clientHeight;
		field.width = fw * dpr;
		field.height = fh * dpr;
		fctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		const gap = fw < 700 ? 22 : 28;
		dots = [];
		for (let y = gap / 2; y < fh; y += gap) for (let x = gap / 2; x < fw; x += gap) dots.push(x, y);
	}
	function drawField(t) {
		fctx.clearRect(0, 0, fw, fh);
		const R = 170;
		for (let i = 0; i < dots.length; i += 2) {
			let x = dots[i];
			let y = dots[i + 1];
			const wave = 0.5 + 0.5 * Math.sin(t * 0.8 + x * 0.008 + y * 0.012);
			let a = 0.05 + wave * 0.08;
			let s = 1.4;
			const dx = x - mouse.x;
			const dy = y - mouse.y;
			const d = Math.hypot(dx, dy);
			let hot = 0;
			if (d < R) {
				hot = 1 - d / R;
				const push = hot * hot * 14;
				x += (dx / (d || 1)) * push;
				y += (dy / (d || 1)) * push;
				a += hot * 0.7;
				s += hot * 1.6;
			}
			fctx.fillStyle = hot > 0.05 ? `rgba(92,242,255,${a})` : `rgba(200,210,235,${a})`;
			fctx.fillRect(x - s / 2, y - s / 2, s, s);
		}
	}
	sizeField();
	addEventListener("resize", sizeField);
	hero.addEventListener("pointermove", (e) => {
		const r = hero.getBoundingClientRect();
		mouse.x = e.clientX - r.left;
		mouse.y = e.clientY - r.top;
	});
	hero.addEventListener("pointerleave", () => (mouse.x = mouse.y = -9999));
	if (reduced) drawField(0);
	else whileVisible(hero, (_, t) => drawField(t));

	/* ---------- Player card tilt ---------- */

	const card = $(".player-card");
	if (!reduced && matchMedia("(hover: hover) and (min-width: 1021px)").matches) {
		card.addEventListener("pointermove", (e) => {
			const r = card.getBoundingClientRect();
			const px = (e.clientX - r.left) / r.width - 0.5;
			const py = (e.clientY - r.top) / r.height - 0.5;
			card.style.setProperty("--ry", px * 14 + "deg");
			card.style.setProperty("--rx", -py * 10 + "deg");
		});
		card.addEventListener("pointerleave", () => {
			card.style.removeProperty("--ry");
			card.style.removeProperty("--rx");
		});
	}

	/* ---------- Stat counters ---------- */

	$$("[data-count]").forEach((el) => {
		const to = +el.dataset.count;
		const suffix = el.dataset.suffix || "";
		onceInView(el, () => {
			if (reduced) return (el.textContent = to + suffix);
			const start = performance.now();
			const step = (t) => {
				const p = Math.min(1, (t - start) / 1200);
				el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + suffix;
				if (p < 1) requestAnimationFrame(step);
			};
			requestAnimationFrame(step);
		});
	});

	/* ---------- Achievements count + secret ---------- */

	const achGrid = $("#achGrid");
	function renderAchCount() {
		const all = $$(".ach", achGrid);
		$("#achCount").textContent = all.filter((a) => !a.matches(".locked, .hidden-ach")).length;
		$("#achTotal").textContent = all.length;
	}
	renderAchCount();

	function revealSecret() {
		const s = $("#secretAch");
		if (!s.classList.contains("hidden-ach")) return;
		s.classList.remove("hidden-ach");
		s.classList.add("unlocked-now");
		$("h3", s).textContent = "Cheat Code";
		$("p", s).textContent = "You knew the code. Most people scroll right past. Let's talk.";
		$(".ach-meta", s).innerHTML = "<b>Secret</b> · unlocked by you";
		$("use", s).setAttribute("href", "#i-crown");
		renderAchCount();
	}
	if (unlocked.has("konami")) revealSecret();

	function godMode() {
		document.body.classList.add("god");
		revealSecret();
		scramble(nameEl, NAME, 900);
		unlock("konami");
	}
	const KONAMI = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];
	let kpos = 0;
	addEventListener("keydown", (e) => {
		const k = e.key.toLowerCase();
		kpos = k === KONAMI[kpos] ? kpos + 1 : k === KONAMI[0] ? 1 : 0;
		if (kpos === KONAMI.length) {
			kpos = 0;
			godMode();
		}
	});
	// Touch devices have no arrow keys: tap the logo seven times.
	let taps = [];
	$(".hud-logo").addEventListener("click", () => {
		const now = Date.now();
		taps = taps.filter((t) => now - t < 3000).concat(now);
		if (taps.length >= 7) {
			taps = [];
			godMode();
		}
	});

	/* ---------- Digitol: RBAC matrix ---------- */

	const ROLES = ["Admin", "Supervisor", "Case mgr", "Billing"];
	const PERMS = ["cases", "reports", "invoices", "audit"];
	const POLICY = [
		[1, 1, 1, 1],
		[1, 1, 0, 1],
		[1, 1, 0, 0],
		[0, 1, 1, 0],
	];
	const ACTIONS = { cases: "open", reports: "generate", invoices: "bill", audit: "read" };
	const rbac = $("#rbac");
	const rbacLog = $("#rbacLog");
	rbac.innerHTML =
		'<span class="h"></span>' +
		PERMS.map((p) => `<span class="h">${p}</span>`).join("") +
		ROLES.map(
			(r, ri) =>
				`<span class="r">${r}</span>` +
				PERMS.map((_, pi) => `<span class="c ${POLICY[ri][pi] ? "on" : ""}" data-r="${ri}" data-p="${pi}">${POLICY[ri][pi] ? "✓" : "·"}</span>`).join("")
		).join("");
	const cells = $$(".c", rbac);
	let rbacTimer = 0;
	whileVisible(rbac, (dt) => {
		rbacTimer -= dt;
		if (rbacTimer > 0) return;
		rbacTimer = 1.1;
		cells.forEach((c) => c.classList.remove("ping", "deny"));
		const c = pick(cells);
		const ri = +c.dataset.r;
		const pi = +c.dataset.p;
		const ok = POLICY[ri][pi];
		c.classList.add(ok ? "ping" : "deny");
		const who = ROLES[ri].toLowerCase().replace(" ", "_");
		const call = `${PERMS[pi]}.${ACTIONS[PERMS[pi]]}()`;
		rbacLog.innerHTML = ok
			? `&gt; <span style="color:var(--green)">allow</span> ${who} → ${call}  ${Math.round(rand(4, 18))}ms`
			: `&gt; <span style="color:var(--red)">deny</span>  ${who} → ${call}  403 · logged to audit`;
	});

	/* ---------- evvAI: live hash chain ---------- */

	async function sha256(str) {
		if (window.crypto && crypto.subtle) {
			const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
			return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
		}
		// Fallback for insecure contexts: FNV-1a, stretched. Display only.
		let out = "";
		for (let k = 0; k < 8; k++) {
			let h = 0x811c9dc5 ^ k;
			for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619);
			out += (h >>> 0).toString(16).padStart(8, "0");
		}
		return out;
	}

	const chainEl = $("#chain");
	const chainStatus = $("#chainStatus");
	const tamperBtn = $("#tamper");
	const chain = [];
	let seq = 4812;
	let simMin = 8 * 60 + 2;
	let inside = new Set();
	let tampering = false;
	const KEEP = innerWidth < 760 ? 3 : 4;
	const payload = (b) => `${b.idx}|${b.ev}|${b.res}|${b.t}|${b.prev}`;

	async function addBlock() {
		const prev = chain.length ? chain[chain.length - 1].hash : "0".repeat(64);
		const res = "R-" + (1000 + Math.floor(rand(0, 60)));
		const ev = inside.has(res) ? "CHECK_OUT" : "CHECK_IN";
		ev === "CHECK_IN" ? inside.add(res) : inside.delete(res);
		simMin += Math.floor(rand(1, 9));
		const t = `${pad(Math.floor(simMin / 60) % 24)}:${pad(simMin % 60)}:${pad(Math.floor(rand(0, 60)))}`;
		const b = { idx: seq++, ev, res, t, prev, sim: (rand(0.94, 0.995) * 100).toFixed(1) };
		b.hash = await sha256(payload(b));
		chain.push(b);
		while (chain.length > KEEP) chain.shift();
		renderChain();
	}

	function renderChain(badFrom = -1) {
		chainEl.innerHTML = chain
			.map((b, i) => {
				const bad = badFrom >= 0 && i >= badFrom;
				return `<li class="blk${bad ? " bad" : ""}${b.edited ? " edited" : ""}">
					<span class="idx">#${b.idx}</span>
					<span class="ev"><em class="${b.ev === "CHECK_OUT" ? "out" : ""}">${b.ev}</em> ${b.res} · 3-angle ${b.sim}%</span>
					<span class="t">${b.t}</span>
					<span class="hashes"><span>prev ${b.prev.slice(0, 10)}…</span><span>hash <b>${b.hash.slice(0, 10)}…</b></span></span>
				</li>`;
			})
			.join("");
	}

	async function verify() {
		for (let i = 0; i < chain.length; i++) {
			const b = chain[i];
			if ((await sha256(payload(b))) !== b.hash) return i;
			if (i > 0 && b.prev !== chain[i - 1].hash) return i;
		}
		return -1;
	}

	(async () => {
		for (let i = 0; i < KEEP; i++) await addBlock();
	})();
	let chainTimer = 2.6;
	whileVisible(chainEl, (dt) => {
		if (tampering) return;
		chainTimer -= dt;
		if (chainTimer <= 0) {
			chainTimer = 2.6;
			addBlock();
		}
	});

	tamperBtn.addEventListener("click", async () => {
		if (tampering || chain.length < 2) return;
		tampering = true;
		tamperBtn.disabled = true;
		const target = chain[1];
		const original = target.t;
		// A facility "adjusts" a check-in time by 47 minutes.
		const [h, m, s] = original.split(":").map(Number);
		const shifted = h * 60 + m - 47;
		target.t = `${pad(Math.floor((shifted + 1440) / 60) % 24)}:${pad((shifted + 1440) % 60)}:${pad(s)}`;
		target.edited = true;
		const brokenAt = await verify();
		renderChain(brokenAt);
		chainStatus.innerHTML = `verify(): <b class="bad">BROKEN</b> brokenAt #${chain[brokenAt].idx}`;
		unlock("tamper");
		setTimeout(() => {
			target.t = original;
			target.edited = false;
			renderChain();
			chainStatus.innerHTML = 'verify(): <b class="ok">OK</b> · restored from signed seal';
			tampering = false;
			tamperBtn.disabled = false;
			setTimeout(() => {
				if (!tampering) chainStatus.innerHTML = 'verify(): <b class="ok">OK</b>';
			}, 2500);
		}, 3200);
	});

	/* ---------- Project Ultron: station deck ---------- */

	const deck = $("#deck");
	const dctx = deck.getContext("2d");
	const W = 320;
	const H = 168;
	const SCALE = 3;
	deck.width = W * SCALE;
	deck.height = H * SCALE;
	dctx.scale(SCALE, SCALE);

	const RW = 72;
	const RH = 56;
	const CORRIDOR = 84;
	const ROOMS = {};
	[
		["recon", "RECON", "#ffc547"],
		["scout_hut", "SCOUT HUT", "#7dff9b"],
		["analysis", "ANALYSIS", "#5cf2ff"],
		["design_lab", "DESIGN LAB", "#ff3d8b"],
		["listings", "LISTINGS", "#b07cff"],
		["inspection", "INSPECTION", "#ff5468"],
		["cargo", "CARGO BAY", "#ffa65c"],
		["mess", "MESS DECK", "#5b6478"],
	].forEach(([id, label, color], i) => {
		const row = i < 4 ? 0 : 1;
		const x = 8 + (i % 4) * 78;
		const y = row ? 104 : 8;
		ROOMS[id] = { id, label, color, x, y, row, busy: null };
	});

	const AGENTS = {};
	[
		["strategist", "Atlas", "#ffc547"],
		["scout", "Orion", "#7dff9b"],
		["analyst", "Vega", "#5cf2ff"],
		["artist", "Lyra", "#ff3d8b"],
		["lister", "Cygnus", "#b07cff"],
		["critic", "Rigel", "#ff5468"],
		["packer", "Deneb", "#ffa65c"],
		["photos", "Mira", "#ff8ad8"],
		["shopkeeper", "Altair", "#8fb3ff"],
	].forEach(([role, name, color], i) => {
		const home = { x: ROOMS.mess.x + 8 + (i % 5) * 13, y: ROOMS.mess.y + 22 + Math.floor(i / 5) * 16 };
		AGENTS[role] = { role, name, color, x: home.x, y: home.y, home, path: [], state: "idle", t: 0, onArrive: null, phase: Math.random() * 6 };
	});

	const NICHES = ["fall svg bundle", "nurse tumbler wrap", "teacher appreciation svg", "christmas ornament svg", "retro sunset png", "dog mom svg"];
	const PIPE = [
		["strategist", "recon", "reading the market, ranking niches", 3],
		["scout", "scout_hut", "researching what sells: prices, tags", 3],
		["analyst", "analysis", "writing a brief with 3 themes", 2.6],
		["artist", "design_lab", "drawing 3 production SVGs", 3.4],
		["lister", "listings", "titles, 13 tags, pricing", 2.4],
		["critic", "inspection", "reviewing 3 designs", 2.4, "rejected 1 · stroke-only details"],
		["artist", "design_lab", "revising the rejected design", 2.4],
		["critic", "inspection", "re-review", 1.8, "approved 3/3"],
		["packer", "cargo", "zipping SVG + PNG + license", 2],
		["photos", "design_lab", "rendering 5 listing images", 2.6],
		["shopkeeper", "listings", "publishing to Etsy", 2.2, "listing live"],
	];
	let stepIdx = 0;
	let niche = NICHES[0];
	let nicheIdx = 0;
	let nightMin = 2 * 60;
	const clockEl = $("#clock");
	const ticker = $("#ticker");
	const tickLines = [];

	function log(agent, msg, cls = "") {
		const hh = `${pad(Math.floor(nightMin / 60))}:${pad(Math.floor(nightMin % 60))}`;
		tickLines.push(`<span class="dim">${hh}</span> <span class="k">${agent.padEnd(10)}</span> <span class="${cls}">${msg}</span>`);
		while (tickLines.length > 4) tickLines.shift();
		ticker.innerHTML = tickLines.join("\n");
	}

	function spotIn(room) {
		return { x: room.x + RW / 2 - 3, y: room.row ? room.y + 26 : room.y + 30 };
	}

	function walkTo(a, dest, onArrive) {
		a.path = [
			{ x: a.x, y: CORRIDOR },
			{ x: dest.x, y: CORRIDOR },
			{ x: dest.x, y: dest.y },
		];
		a.state = "walking";
		a.onArrive = onArrive;
		if (reduced) {
			a.x = dest.x;
			a.y = dest.y;
			a.path = [];
		}
	}

	function runStep() {
		const [role, station, task, dur, result] = PIPE[stepIdx];
		const a = AGENTS[role];
		const room = ROOMS[station];
		if (stepIdx === 1) log("runner", `queued "${niche}"`, "s");
		log(role, `walking → ${station}`);
		walkTo(a, spotIn(room), () => {
			a.state = "working";
			a.t = a.dur = dur;
			room.busy = a;
			log(role, task + "…");
			a.onDone = () => {
				room.busy = null;
				if (result) log(role, result, result.startsWith("rejected") ? "" : "s");
				walkTo(a, a.home, () => (a.state = "idle"));
				stepIdx++;
				if (stepIdx >= PIPE.length) {
					stepIdx = 1;
					nicheIdx = (nicheIdx + 1) % NICHES.length;
					niche = NICHES[nicheIdx];
				}
				setTimeout(runStep, 300);
			};
		});
	}

	function updateAgents(dt) {
		const speed = 110;
		for (const a of Object.values(AGENTS)) {
			a.phase += dt * 8;
			if (a.state === "walking") {
				let move = speed * dt;
				while (move > 0 && a.path.length) {
					const p = a.path[0];
					const dx = p.x - a.x;
					const dy = p.y - a.y;
					const d = Math.hypot(dx, dy);
					if (d <= move) {
						a.x = p.x;
						a.y = p.y;
						move -= d;
						a.path.shift();
					} else {
						a.x += (dx / d) * move;
						a.y += (dy / d) * move;
						move = 0;
					}
				}
				if (!a.path.length) {
					a.state = "arrived";
					const cb = a.onArrive;
					a.onArrive = null;
					cb && cb();
				}
			} else if (a.state === "working") {
				a.t -= dt;
				if (a.t <= 0) {
					a.state = "done";
					a.onDone && a.onDone();
				}
			}
		}
	}

	function drawRoom(r, time) {
		const c = dctx;
		c.fillStyle = "#0b0e1a";
		c.fillRect(r.x, r.y, RW, RH);
		c.strokeStyle = r.busy ? r.color : "rgba(255,255,255,0.12)";
		c.lineWidth = 1;
		c.strokeRect(r.x + 0.5, r.y + 0.5, RW - 1, RH - 1);
		// door to the corridor
		c.fillStyle = "#05060c";
		c.fillRect(r.x + RW / 2 - 6, r.row ? r.y - 1 : r.y + RH - 1, 12, 2);
		// label
		c.fillStyle = r.color;
		c.globalAlpha = r.busy ? 1 : 0.6;
		c.font = "bold 5px 'JetBrains Mono', monospace";
		c.fillText(r.label, r.x + 4, r.y + 8);
		c.globalAlpha = 1;
		if (r.id === "mess") {
			c.fillStyle = "#1a2030";
			c.fillRect(r.x + 10, r.y + 36, 52, 6);
			return;
		}
		// console with a screen that flickers while someone works
		const cx = r.x + RW / 2 - 9;
		const cy = r.row ? r.y + 14 : r.y + 16;
		c.fillStyle = "#1a2030";
		c.fillRect(cx, cy, 18, 10);
		c.fillStyle = r.busy ? r.color : "#273047";
		c.globalAlpha = r.busy ? 0.55 + 0.45 * Math.abs(Math.sin(time * 9)) : 1;
		c.fillRect(cx + 2, cy + 2, 14, 5);
		c.globalAlpha = 1;
		// side racks
		c.fillStyle = "#141a2a";
		c.fillRect(r.x + 4, r.y + RH - 14, 8, 10);
		c.fillRect(r.x + RW - 12, r.y + RH - 14, 8, 10);
		c.fillStyle = r.color;
		c.globalAlpha = 0.5;
		if (Math.sin(time * 3 + r.x) > 0) c.fillRect(r.x + 6, r.y + RH - 12, 2, 2);
		if (Math.cos(time * 2.4 + r.x) > 0) c.fillRect(r.x + RW - 10, r.y + RH - 9, 2, 2);
		c.globalAlpha = 1;
	}

	function drawAgent(a) {
		const c = dctx;
		const x = Math.round(a.x);
		const y = Math.round(a.y);
		const walking = a.state === "walking";
		const bob = walking ? (Math.sin(a.phase) > 0 ? 1 : 0) : 0;
		c.fillStyle = "rgba(0,0,0,0.4)";
		c.fillRect(x, y + 9, 6, 1);
		// legs
		c.fillStyle = "#2a3148";
		if (walking && Math.sin(a.phase) > 0) {
			c.fillRect(x + 1, y + 7, 1, 2);
			c.fillRect(x + 4, y + 6, 1, 2);
		} else {
			c.fillRect(x + 1, y + 7, 1, 2);
			c.fillRect(x + 4, y + 7, 1, 2);
		}
		// body + head
		c.fillStyle = a.color;
		c.fillRect(x, y + 3 - bob, 6, 4);
		c.fillStyle = "#f1e3d3";
		c.fillRect(x + 1, y - bob, 4, 3);
		c.fillStyle = "#0b0e1a";
		c.fillRect(x + 2, y + 1 - bob, 1, 1);
		c.fillRect(x + 4, y + 1 - bob, 1, 1);
		if (a.state === "working") {
			c.fillStyle = a.color;
			c.font = "bold 4px 'JetBrains Mono', monospace";
			c.fillText(a.name.toUpperCase(), x - 4, y - 3);
			const p = 1 - a.t / a.dur;
			c.fillStyle = "rgba(255,255,255,0.15)";
			c.fillRect(x - 4, y + 11, 14, 1);
			c.fillStyle = a.color;
			c.fillRect(x - 4, y + 11, Math.max(0, Math.min(14, 14 * p)), 1);
		}
	}

	function drawDeck(time) {
		const c = dctx;
		c.fillStyle = "#05060c";
		c.fillRect(0, 0, W, H);
		// stars through the hull
		for (let i = 0; i < 40; i++) {
			const sx = (i * 73 + time * (4 + (i % 3) * 3)) % W;
			const sy = (i * 41) % H;
			c.fillStyle = `rgba(255,255,255,${0.15 + (i % 4) * 0.08})`;
			c.fillRect(W - sx, sy, 1, 1);
		}
		// corridor
		c.fillStyle = "#0e1220";
		c.fillRect(4, CORRIDOR - 10, W - 8, 22);
		c.fillStyle = "rgba(92,242,255,0.18)";
		for (let x = 8; x < W - 8; x += 10) c.fillRect(x + ((time * 12) % 10), CORRIDOR + 1, 4, 1);
		for (const r of Object.values(ROOMS)) drawRoom(r, time);
		const order = Object.values(AGENTS).sort((p, q) => p.y - q.y);
		for (const a of order) drawAgent(a);
	}

	log("autopilot", "on · lanes 1 · caps 6 runs / 5 publishes", "s");
	log("runner", "crew orion online, 9 agents");
	runStep();
	whileVisible(deck, (dt, t) => {
		updateAgents(dt);
		drawDeck(t);
		nightMin += dt * 2.2;
		if (nightMin >= 7 * 60) nightMin = 2 * 60;
		clockEl.textContent = `${pad(Math.floor(nightMin / 60))}:${pad(Math.floor(nightMin % 60))}`;
	});
	drawDeck(0);

	/* ---------- Keep Very Still ---------- */

	const kvs = $("#kvs");
	const kvsTitle = $(".kvs-title");
	const eye = $("#eye");
	const iris = $("#iris");
	const pupil = $("#pupil");
	const kvsFill = $("#kvsFill");
	const kvsMsg = $("#kvsMsg");
	const kvsStart = $("#kvsStart");
	const kvsReveal = $("#kvsReveal");
	const HOLD = 4;
	let kvsRunning = false;
	let kvsWon = false;
	let stillFor = 0;
	let graceUntil = 0;

	function lookAt(clientX, clientY) {
		if (kvsWon) return;
		const r = eye.getBoundingClientRect();
		const dx = clientX - (r.left + r.width / 2);
		const dy = clientY - (r.top + r.height / 2);
		const d = Math.hypot(dx, dy) || 1;
		const m = Math.min(1, d / 300);
		const ox = (dx / d) * 22 * m;
		const oy = (dy / d) * 8 * m;
		iris.setAttribute("cx", 60 + ox);
		iris.setAttribute("cy", 30 + oy);
		pupil.setAttribute("cx", 60 + ox * 1.1);
		pupil.setAttribute("cy", 30 + oy * 1.1);
	}

	function win() {
		kvsRunning = false;
		kvsWon = true;
		kvs.classList.add("won");
		kvsFill.style.width = "100%";
		kvsMsg.textContent = "…it closed its eye.";
		kvsStart.hidden = true;
		kvsReveal.hidden = false;
	}

	function caught() {
		if (!kvsRunning || performance.now() < graceUntil) return;
		stillFor = 0;
		kvsFill.style.width = "0%";
		kvsMsg.textContent = pick(["It saw you. Again.", "Movement detected.", "Too slow to freeze.", "It heard that."]);
		kvs.classList.remove("alert");
		void kvs.offsetWidth;
		kvs.classList.add("alert");
		kvsTitle.classList.add("shake");
		setTimeout(() => {
			kvs.classList.remove("alert");
			kvsTitle.classList.remove("shake");
		}, 400);
	}

	let lastPX = null;
	let lastPY = null;
	addEventListener(
		"pointermove",
		(e) => {
			lookAt(e.clientX, e.clientY);
			if (lastPX !== null && Math.hypot(e.clientX - lastPX, e.clientY - lastPY) > 2) caught();
			lastPX = e.clientX;
			lastPY = e.clientY;
		},
		{ passive: true }
	);
	["wheel", "keydown", "touchstart", "touchmove", "scroll"].forEach((ev) => addEventListener(ev, caught, { passive: true }));

	kvsStart.addEventListener("click", () => {
		kvsRunning = true;
		stillFor = 0;
		graceUntil = performance.now() + 350;
		kvsStart.textContent = "Restart";
		kvsMsg.textContent = "Don't. Move.";
	});

	whileVisible(kvs, (dt) => {
		if (!kvsRunning) return;
		stillFor += dt;
		kvsFill.style.width = Math.min(100, (stillFor / HOLD) * 100) + "%";
		if (stillFor > HOLD * 0.5 && stillFor - dt <= HOLD * 0.5) kvsMsg.textContent = "Keep… very… still…";
		if (stillFor >= HOLD) {
			win();
			unlock("still");
		}
	});
	if (unlocked.has("still")) win();

	/* ---------- Footer ---------- */

	$("#year").textContent = new Date().getFullYear();
})();
