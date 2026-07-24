import getProjects, { type ProjectData } from "../_data/projects";
import { Projects } from "../components/projects";
import { Layout } from "./layout";

interface EleventyProps extends ProjectData {
	content: string;
}

export const render = async ({ title, content }: EleventyProps) => {
	const breadcrumbs = [{ url: "/", title: "Home" }];
	const projects = await getProjects();

	return (
		<Layout title={title} breadcrumbs={breadcrumbs}>
			<div className="content" dangerouslySetInnerHTML={{ __html: content }} />
			<article className="content">
				<h2 className="subtitle">Active projects</h2>
				<p>Projects that I'm actively taking part in.</p>
				<Projects
					projects={projects.filter(({ data }) => data.status === "active")}
				/>
			</article>
			<article className="content">
				<h2 className="subtitle">Previous projects</h2>
				<p>
					Projects that are active but where I've completed my active
					participation.
				</p>
				<Projects
					projects={projects.filter(({ data }) => data.project === "active")}
				/>
			</article>
			<article className="content">
				<h2 className="subtitle">Complete or inactive projects</h2>
				<p>
					Projects I've participated in before, and/or projects that simply
					aren't in active development anymore.
				</p>
				<Projects
					projects={projects.filter(
						({ data }) => data.status !== "active" && data.project !== "active",
					)}
				/>
			</article>
		</Layout>
	);
};
