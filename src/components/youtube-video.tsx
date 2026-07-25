import type { FC } from "react";

interface Props {
	id: string;
	title?: string;
}

export const YoutubeVideo: FC<Props> = ({ id, title }) => (
	<iframe
		className="w-full aspect-video"
		src={`https://www.youtube.com/embed/${id}`}
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
		title={title || "YouTube video"}
		width="560"
		height="315"
		allowFullScreen
	/>
);
