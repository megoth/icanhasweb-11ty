import type { TalkData } from "../_data/talks";
import { TalkMeta } from "../components/talk-meta";
import { Layout } from "./layout";

interface EleventyProps extends TalkData {
	content: string;
}

export const render = async ({ content, title, ...meta }: EleventyProps) => {
	const breadcrumbs = [
		{ url: "/", title: "Home" },
		{ url: "/talks", title: "Talks" },
	];

	return (
		<Layout title={title} breadcrumbs={breadcrumbs}>
			<div className="content" dangerouslySetInnerHTML={{ __html: content }} />
			<TalkMeta {...meta} />
		</Layout>
	);
};
