import getSongs from "../_data/music";
import { Songs } from "../components/songs";
import { Layout } from "./layout";

interface EleventyProps {
	content: string;
	title?: string;
}

export const render = async ({ title, content }: EleventyProps) => {
	const breadcrumbs = [{ url: "/", title: "Home" }];
	const songs = await getSongs();

	return (
		<Layout title={title} breadcrumbs={breadcrumbs}>
			<div className="content" dangerouslySetInnerHTML={{ __html: content }} />
			<Songs songs={songs} />
		</Layout>
	);
};
