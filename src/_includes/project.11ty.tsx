import type { ProjectData } from "../_data/projects";
import { ProjectMeta } from "../components/project-meta";
import { Layout } from "./layout";

interface EleventyProps extends ProjectData {
	content: string;
}

export const render = async ({ content, title, ...meta }: EleventyProps) => {
	const breadcrumbs = [
		{ url: "/", title: "Home" },
		{ url: "/projects", title: "Projects" },
	];

	return (
		<Layout title={title} breadcrumbs={breadcrumbs}>
			<div className="content" dangerouslySetInnerHTML={{ __html: content }} />
			<ProjectMeta {...meta} />
		</Layout>
	);
};
