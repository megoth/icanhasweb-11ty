import type { FC } from "react";

interface Props {
	date: Date;
	repository: string;
	slug?: string;
	url: string;
}

export const TalkMeta: FC<Props> = ({ date, repository, slug, url }) => (
	<em className="meta">
		<span>
			Presented:{" "}
			{new Intl.DateTimeFormat("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
			}).format(date)}
		</span>
		<span>
			<a href={url}>Presentation</a>
		</span>
		<span>
			<a href={repository}>Repository</a>
		</span>
		{slug && (
			<span>
				<a href={`/talks/${slug}`}>Page</a>
			</span>
		)}
	</em>
);
