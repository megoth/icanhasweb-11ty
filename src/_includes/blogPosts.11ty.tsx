import getBlogPosts from "../_data/blogPosts";
import { BlogPosts } from "../components/blog-posts";
import { Layout } from "./layout";

interface EleventyProps {
	content: string;
	title?: string;
}

export const render = async ({ title, content }: EleventyProps) => {
	const breadcrumbs = [{ url: "/", title: "Home" }];
	const posts = await getBlogPosts();

	return (
		<Layout title={title} breadcrumbs={breadcrumbs}>
			<div className="content" dangerouslySetInnerHTML={{ __html: content }} />
			<h2 className="subtitle">Archive</h2>
			<BlogPosts posts={posts} />
		</Layout>
	);
};
