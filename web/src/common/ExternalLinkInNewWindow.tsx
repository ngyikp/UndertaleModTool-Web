type Props = Readonly<{
	href: string;
	children: React.ReactNode;
}>;

export default function ExternalLinkInNewWindow({href, children}: Props) {
	let rel = 'noopener';
	if (
		!href.startsWith('https://github.com/UnderminersTeam/') &&
		!href.startsWith('https://github.com/ngyikp/UndertaleModTool-Web')
	) {
		rel = 'noreferrer';
	}

	return (
		<a href={href} target="_blank" rel={rel}>
			{children}
		</a>
	);
}
