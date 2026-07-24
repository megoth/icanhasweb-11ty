import type { FC } from "react";
import type { BlogData } from "../_data/blogPosts";

interface Props extends Omit<BlogData, "title"> {}

export const BlogMeta: FC<Props> = ({ date, original, updated }) => (
	<em className="meta">
		<span>
			Published:{" "}
			{new Intl.DateTimeFormat("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
			}).format(date)}
		</span>
		{updated && (
			<span>
				Updated:{" "}
				{new Intl.DateTimeFormat("en-US", {
					year: "numeric",
					month: "long",
					day: "numeric",
				}).format(date)}
			</span>
		)}
		{original && <a href={original}>Original post</a>}
	</em>
);
