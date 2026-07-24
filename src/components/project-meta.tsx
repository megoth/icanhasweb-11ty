import type { FC } from "react";
import type { ProjectData } from "../_data/projects";

export const ProjectMeta: FC<ProjectData> = ({ repository, url }) => (
	<em className="meta">
		{url && (
			<span>
				<a href={url}>Website</a>
			</span>
		)}
		{repository && (
			<span>
				<a href={repository}>Repository</a>
			</span>
		)}
	</em>
);
