import type { Metadata, Viewport } from "next";
import { Chakra_Petch, Inter, JetBrains_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";

const display = Chakra_Petch({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-mono" });
const pix = Press_Start_2P({ subsets: ["latin"], weight: "400", variable: "--font-pix" });

export const metadata: Metadata = {
	metadataBase: new URL("https://aaronamendez.com"),
	title: "Aaron Mendez · Founder & CTO",
	description:
		"Aaron Mendez: founder, CTO and full-stack engineer. Co-founder of Digitol (assisted living software, live in Michigan), builder of evvAI, Project Ultron, StreamerLoom, and Keep Very Still.",
	openGraph: {
		title: "Aaron Mendez · Founder & CTO",
		description: "Achievements unlocked: Digitol, evvAI, Project Ultron, Keep Very Still. NYC → Michigan → Utah.",
		images: ["/assets/moshed1.jpeg"],
	},
};

export const viewport: Viewport = {
	themeColor: "#06070b",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${display.variable} ${body.variable} ${mono.variable} ${pix.variable}`}>
			<body>{children}</body>
		</html>
	);
}
