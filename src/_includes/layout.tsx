import { FC, ReactNode } from "react";

interface Props {
	children: ReactNode;
	title: string;
}

export const Layout: FC<Props> = ({ children, title }) => {
	return (
		<html lang="en">
			<head>
				<meta charSet="UTF-8" />
				<title>{title || "My 11ty Site"}</title>
			</head>
			<body>
				<main dangerouslySetInnerHTML={{ __html: children }} />
			</body>
		</html>
	);
};
