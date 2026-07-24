import getTalks from "../_data/talks";
import { Talks } from "../components/talks";
import { Layout } from "./layout";

interface EleventyProps {
	content: string;
	title?: string;
}

export const render = async ({ title, content }: EleventyProps) => {
	const breadcrumbs = [{ url: "/", title: "Home" }];
	const talks = await getTalks();

	return (
		<Layout title={title} breadcrumbs={breadcrumbs}>
			<div className="content" dangerouslySetInnerHTML={{ __html: content }} />
			<Talks talks={talks} />
		</Layout>
	);
};
