import getBlogPosts, { type BlogData } from "../_data/blogPosts";
import { BlogMeta } from "../components/blog-meta";
import { BlogPosts } from "../components/blog-posts";
import { Layout } from "./layout";

interface EleventyProps extends BlogData {
	content: string;
}

export const render = async ({ title, content, ...meta }: EleventyProps) => {
	const breadcrumbs = [
		{ url: "/", title: "Home" },
		{ url: "/blog", title: "Blog" },
	];
	const posts = await getBlogPosts();

	return (
		<Layout title={title} breadcrumbs={breadcrumbs}>
			<div className="notification is-warning is-light">
				Note: This is an archived blog, and some entries are old and don't
				reflect my views anymore.
			</div>
			<div className="content" dangerouslySetInnerHTML={{ __html: content }} />
			<BlogMeta {...meta} />
			<h2 className="subtitle">Blog archive</h2>
			<BlogPosts posts={posts} />
		</Layout>
	);
};
