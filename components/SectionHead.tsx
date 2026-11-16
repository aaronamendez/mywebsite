export function SectionHead({ tag, title, children }: { tag: string; title: string; children: React.ReactNode }) {
	return (
		<header className="sec-head reveal">
			<span className="sec-tag pix">{tag}</span>
			<h2>{title}</h2>
			<p>{children}</p>
		</header>
	);
}
