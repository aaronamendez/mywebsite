// One inline sprite; everything else references symbols with <Icon name="..." />.

export type IconName =
	| "crown"
	| "coin"
	| "shield"
	| "pulse"
	| "chain"
	| "moon"
	| "pin"
	| "party"
	| "down"
	| "up"
	| "eye"
	| "heart"
	| "wave"
	| "lock"
	| "q"
	| "arrow";

export function Icon({ name }: { name: IconName }) {
	return (
		<svg aria-hidden="true">
			<use href={`#i-${name}`} />
		</svg>
	);
}

const line = { fill: "none", stroke: "currentColor", strokeWidth: 1.8 } as const;
const round = { strokeLinecap: "round", strokeLinejoin: "round" } as const;

export function IconSprite() {
	return (
		<svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
			<defs>
				<symbol id="i-crown" viewBox="0 0 24 24">
					<path d="M3 18h18l-1.5-10-4.5 4-3-6-3 6-4.5-4Z" {...line} strokeLinejoin="round" />
					<path d="M4 21h16" {...line} strokeLinecap="round" />
				</symbol>
				<symbol id="i-coin" viewBox="0 0 24 24">
					<circle cx="12" cy="12" r="8.5" {...line} />
					<path
						d="M14.5 9.2c-.5-.8-1.4-1.2-2.5-1.2-1.5 0-2.6.8-2.6 2s1.1 1.6 2.6 2 2.6.8 2.6 2-1.1 2-2.6 2c-1.1 0-2-.4-2.5-1.2M12 6.5v11"
						{...line}
						strokeWidth={1.6}
						strokeLinecap="round"
					/>
				</symbol>
				<symbol id="i-shield" viewBox="0 0 24 24">
					<path d="M12 3 4.5 6v5.5c0 4.6 3.1 8.2 7.5 9.5 4.4-1.3 7.5-4.9 7.5-9.5V6Z" {...line} strokeLinejoin="round" />
					<path d="m8.8 12 2.2 2.2 4.4-4.6" {...line} {...round} />
				</symbol>
				<symbol id="i-pulse" viewBox="0 0 24 24">
					<path d="M3 12h4l2.5-6 4 12 2.5-6H21" {...line} {...round} />
				</symbol>
				<symbol id="i-chain" viewBox="0 0 24 24">
					<rect x="2.5" y="8" width="9" height="8" rx="4" {...line} />
					<rect x="12.5" y="8" width="9" height="8" rx="4" {...line} />
				</symbol>
				<symbol id="i-moon" viewBox="0 0 24 24">
					<path d="M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10Z" {...line} strokeLinejoin="round" />
					<path d="M16 4v3M14.5 5.5h3" {...line} strokeWidth={1.5} strokeLinecap="round" />
				</symbol>
				<symbol id="i-pin" viewBox="0 0 24 24">
					<path d="M12 21s-6.5-6.1-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 14.9 12 21 12 21Z" {...line} strokeLinejoin="round" />
					<circle cx="12" cy="9.8" r="2.4" {...line} />
				</symbol>
				<symbol id="i-party" viewBox="0 0 24 24">
					<circle cx="8" cy="8.5" r="3" {...line} />
					<circle cx="16.5" cy="9.5" r="2.4" {...line} />
					<path d="M2.5 19c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5M14 14.6c.8-.4 1.6-.6 2.5-.6 2.3 0 4.2 1.6 4.8 4.4" {...line} strokeLinecap="round" />
				</symbol>
				<symbol id="i-down" viewBox="0 0 24 24">
					<path d="M4 6l6 6 4-4 6 6" {...line} {...round} />
					<path d="M15 14h5V9" {...line} {...round} />
				</symbol>
				<symbol id="i-up" viewBox="0 0 24 24">
					<path d="M12 20V5M6 11l6-6 6 6" {...line} {...round} />
				</symbol>
				<symbol id="i-eye" viewBox="0 0 24 24">
					<path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z" {...line} strokeLinejoin="round" />
					<circle cx="12" cy="12" r="3" fill="currentColor" />
				</symbol>
				<symbol id="i-heart" viewBox="0 0 24 24">
					<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20Z" {...line} strokeLinejoin="round" />
				</symbol>
				<symbol id="i-wave" viewBox="0 0 24 24">
					<circle cx="12" cy="12" r="2.2" fill="currentColor" />
					<path
						d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 7.8a6 6 0 0 1 0 8.4M4.9 4.9a10 10 0 0 0 0 14.2M19.1 4.9a10 10 0 0 1 0 14.2"
						{...line}
						strokeWidth={1.7}
						strokeLinecap="round"
					/>
				</symbol>
				<symbol id="i-lock" viewBox="0 0 24 24">
					<rect x="5" y="10.5" width="14" height="10" rx="2" {...line} />
					<path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" {...line} />
				</symbol>
				<symbol id="i-q" viewBox="0 0 24 24">
					<path d="M9 9a3 3 0 1 1 4.2 2.8c-.8.4-1.2 1-1.2 1.9V14" {...line} strokeWidth={1.9} strokeLinecap="round" />
					<circle cx="12" cy="17.5" r="1.1" fill="currentColor" />
				</symbol>
				<symbol id="i-arrow" viewBox="0 0 24 24">
					<path d="M5 12h14M13 6l6 6-6 6" {...line} {...round} />
				</symbol>
			</defs>
		</svg>
	);
}
