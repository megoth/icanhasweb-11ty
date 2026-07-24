import type { FC } from "react";
import type { TalkData } from "../_data/talks";

interface Props extends TalkData {
	slug?: string;
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
				<a href={`/talks/${slug}`}>ICHW Page</a>
			</span>
		)}
	</em>
);
