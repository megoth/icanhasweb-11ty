import type { FC } from "react";
import type { TalkData } from "../_data/talks";

export const TalkMeta: FC<TalkData> = ({ date, repository, url }) => (
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
	</em>
);
