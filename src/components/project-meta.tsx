import type { FC } from "react";
import type { ProjectData } from "../_data/projects";

interface Props extends ProjectData {
	slug?: string;
}

export const ProjectMeta: FC<Props> = ({ repository, slug, url }) => (
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
		{slug && (
			<span>
				<a href={`/projects/${slug}`}>ICHW Page</a>
			</span>
		)}
	</em>
);
