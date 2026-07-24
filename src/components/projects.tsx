import { type FC, Fragment } from "react";
import type { ProjectList } from "../_data/projects";
import { ProjectMeta } from "./project-meta";

interface Props {
	projects: ProjectList;
}

export const Projects: FC<Props> = ({ projects }) => {
	return (
		<dl className="projects">
			{projects.map(({ data, html, slug }) => (
				<Fragment key={slug}>
					<dt className="subtitle">{data.title}</dt>
					<dd>
						<div
							className="content"
							dangerouslySetInnerHTML={{ __html: html }}
						/>
						<ProjectMeta {...data} slug={slug} />
					</dd>
				</Fragment>
			))}
		</dl>
	);
};
