import type { FC } from "react";
import type { BlogPost } from "../_data/blogPosts";

interface Props {
	posts: Array<{ post: BlogPost; slug: string }>;
}

export const BlogPosts: FC<Props> = ({ posts }) => {
	const archive = posts.reduce<
		Record<number, Record<number, Record<string, BlogPost>>>
	>((memo, { slug, post }) => {
		memo[post.data.date.getFullYear()] = {
			...memo[post.data.date.getFullYear()],
			[post.data.date.getMonth()]: {
				...(memo[post.data.date.getFullYear()]?.[post.data.date.getMonth()] ||
					{}),
				[slug]: post,
			},
		};
		return memo;
	}, {});

	return (
		<ul className="blog-posts">
			{Object.entries(archive)
				.reverse()
				.map(([year, yearPosts]) => (
					<li key={year}>
						<span>{year}</span>
						<ul>
							{Object.entries(yearPosts)
								.reverse()
								.map(([month, monthPosts]) => (
									<li key={`${year}-${month}`}>
										<span>
											{Object.values(monthPosts)[0].data.date.toLocaleString(
												"default",
												{
													month: "long",
												},
											)}
										</span>
										<ul>
											{Object.entries(monthPosts).map(([postPath, post]) => (
												<li key={postPath}>
													<a href={`/blog/${postPath}`}>{post.data.title}</a>
												</li>
											))}
										</ul>
									</li>
								))}
						</ul>
					</li>
				))}
		</ul>
	);
};
