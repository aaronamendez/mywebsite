import { IconSprite } from "@/components/Icons";
import { Hud } from "@/components/Hud";
import { Hero } from "@/components/Hero";
import { Achievements } from "@/components/Achievements";
import { Quests } from "@/components/Quests";
import { Route } from "@/components/Route";
import { Loadout } from "@/components/Loadout";
import { Contact, Footer } from "@/components/Contact";
import { Effects } from "@/components/Effects";

export default function Home() {
	return (
		<>
			<IconSprite />
			<a className="skip" href="#main">
				Skip to content
			</a>
			<Hud />
			<main id="main">
				<Hero />
				<Achievements />
				<Quests />
				<Route />
				<Loadout />
				<Contact />
			</main>
			<Footer />
			<Effects />
		</>
	);
}
