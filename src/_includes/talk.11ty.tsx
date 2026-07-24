import { TalkMeta } from "../components/talk-meta.js";
import { Layout } from "./layout.js";

interface EleventyProps {
	content: string;
	date: Date;
	repository: string;
	title: string;
	url: string;
}

export const render = async ({
	content,
	date,
	title,
	repository,
	url,
}: EleventyProps) => {
	const breadcrumbs = [
		{ url: "/", title: "Home" },
		{ url: "/talks", title: "Talks" },
	];

	return (
		<Layout title={title} breadcrumbs={breadcrumbs}>
			<div className="content" dangerouslySetInnerHTML={{ __html: content }} />
			<TalkMeta date={date} repository={repository} url={url} />
		</Layout>
	);
};
