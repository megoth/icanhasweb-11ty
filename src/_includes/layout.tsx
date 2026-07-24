import type { FC, ReactNode } from "react";

interface Breadcrumb {
	url: string;
	title: string;
}

interface Props {
	breadcrumbs?: Array<Breadcrumb>;
	children: ReactNode;
	title?: string;
}

const BASE_TITLE = "Arne Hassel @ Web";

export const Layout: FC<Props> = ({ breadcrumbs, children, title }) => {
	return (
		<html lang="en">
			<head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>{title ? `${title} > ${BASE_TITLE}` : BASE_TITLE}</title>
				<link rel="stylesheet" href="/css/style.css" />
			</head>
			<body>
				<header>
					<h1 className="title">{title || BASE_TITLE}</h1>
					{breadcrumbs && (
						<nav className="breadcrumb" aria-label="Breadcrumbs">
							<ul>
								{breadcrumbs.map(({ url, title }) => (
									<li key={`nav-${title}`}>
										<a href={url}>{title}</a>
									</li>
								))}
							</ul>
						</nav>
					)}
				</header>
				<main>{children}</main>
				<footer>
					This site is licensed with{" "}
					<a href="https://creativecommons.org/licenses/by-nc/4.0/">
						CC BY-NC 4.0
					</a>
					. Code available at{" "}
					<a href="https://github.com/megoth/icanhasweb-11ty">GitHub</a>.
				</footer>
			</body>
		</html>
	);
};
