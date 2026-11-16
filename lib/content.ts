// Site copy that's easier to edit as data than as markup.
import type { IconName } from "@/components/Icons";

export type Tier = "legendary" | "epic" | "rare";

export type Achievement = {
	icon: IconName;
	title: string;
	desc: string;
	tier: Tier;
	meta: string;
	isNew?: boolean;
};

export const ACHIEVEMENTS: Achievement[] = [
	{ icon: "pulse", title: "Pilot Approved", desc: "evvAI approved for a pilot with one of the largest care homes in Arizona.", tier: "legendary", meta: "2026 · evvAI", isNew: true },
	{ icon: "shield", title: "In Production", desc: "Digitol is live with real users in a handful of assisted living facilities across Michigan.", tier: "legendary", meta: "Michigan · Digitol" },
	{ icon: "crown", title: "Co-Founder", desc: "Founded Digitol Inc and built digitol.io from an empty repo as CTO.", tier: "legendary", meta: "Apr 2024 · Digitol" },
	{ icon: "coin", title: "Round Closed", desc: "Led the investor meetings and closed funding for Digitol.", tier: "legendary", meta: "Digitol" },
	{ icon: "shield", title: "Compliance Boss", desc: "Shipped HIPAA-compliant assisted living software from scratch, survey-day ready.", tier: "epic", meta: "Digitol" },
	{ icon: "chain", title: "Unbroken Chain", desc: "Append-only, hash-chained attestations, sealed and signed every night.", tier: "epic", meta: "evvAI" },
	{ icon: "moon", title: "Night Shift", desc: "Nine AI agents coordinating a full product pipeline while I sleep.", tier: "epic", meta: "Project Ultron" },
	{ icon: "pin", title: "Boots on the Ground", desc: "Left New York for Michigan to build Digitol alongside operators in the field.", tier: "rare", meta: "Ann Arbor, MI" },
	{ icon: "heart", title: "Passed It On", desc: "Inspired my mom to build in tech. I still push code to her app, Jounce In.", tier: "epic", meta: "jouncein.com" },
	{ icon: "party", title: "Party Leader", desc: "Ran an 80+ student study group and weekly tech talks at BloomTech.", tier: "rare", meta: "2021–22" },
	{ icon: "down", title: "Cost Cutter", desc: "Swapped Okta for Auth0 across the underdogdevs stack, cutting auth costs 30%.", tier: "rare", meta: "underdogdevs.dev" },
	{ icon: "up", title: "Class Change", desc: "From office manager reporting to a Series B CEO to engineer, then CTO.", tier: "rare", meta: "2019 → 2024" },
];

export const STATS: { count: number; suffix?: string; label: string }[] = [
	{ count: 5, label: "products shipped or in build" },
	{ count: 1, label: "funding round closed" },
	{ count: 1, label: "care home pilot approved (AZ)" },
	{ count: 9, label: "AI agents on the night shift" },
	{ count: 80, suffix: "+", label: "devs led in study group" },
];

export const CAREER: { when: string; org: string; role: string; desc: string }[] = [
	{ when: "2024 →", org: "Digitol Inc", role: "CTO & Co-Founder", desc: "Built assisted living software end to end, raised funding and led the team. Moved to Michigan for it. Now in production across a handful of facilities there." },
	{ when: "2023–24", org: "Korr", role: "Software Engineer", desc: "InsurTech, backend-heavy. Modularized the product for stability and scale." },
	{ when: "2023", org: "Clover Health", role: "Software Engineer", desc: "Web Infrastructure Core Foundation. Built internal tooling used by many engineering teams." },
	{ when: "2021–22", org: "BloomTech", role: "Full-stack web dev", desc: "Led an 80+ student study group, hosted weekly tech talks. Shipped underdogdevs.dev and twidah.com." },
	{ when: "2019–21", org: "Simulate (Series B)", role: "Office Manager", desc: "Reported to the CEO while the Nuggs brand scaled. Cut ops costs, helped hire key roles." },
];

export const LOADOUT: { slot: string; name: string; items: string[] }[] = [
	{ slot: "A", name: "Frontend", items: ["React", "Next.js", "TypeScript", "Redux", "Tailwind", "shadcn/ui", "Vite", "Webpack"] },
	{ slot: "B", name: "Backend & data", items: ["Node.js", "Express", "PostgreSQL", "MySQL / PlanetScale", "Prisma", "GraphQL", "REST", "Zod"] },
	{ slot: "C", name: "Infra & security", items: ["AWS", "Terraform", "Docker", "Vercel", "HIPAA", "RBAC", "WebAuthn", "Auth.js / Auth0"] },
	{ slot: "D", name: "AI & agents", items: ["Claude Agent SDK", "Anthropic API", "OpenAI", "MediaPipe", "Rekognition", "Multi-agent pipelines"] },
	{ slot: "E", name: "Quality", items: ["Vitest", "Jest", "Playwright", "Cypress", "CI"] },
	{ slot: "F", name: "Leadership & after hours", items: ["Fundraising", "Hiring", "Architecture", "Agile", "Figma", "Unreal Engine"] },
];

export const CLASSES: { name: string; desc: string }[] = [
	{ name: "FOUNDERS", desc: "Trade notes on going zero to one, selling into care facilities, healthcare compliance, or agent systems." },
	{ name: "INVESTORS", desc: "Digitol is in production in Michigan. evvAI has a pilot lined up in Arizona. Let's talk traction." },
	{ name: "PARTNERS", desc: "Assisted living operators, behavioral health providers, payers and integrators." },
	{ name: "BUILDERS", desc: "Engineers who want to ship real things with a small, sharp crew." },
];
