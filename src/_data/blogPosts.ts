import { lstatSync } from "node:fs";
import { readdir } from "node:fs/promises";
import matter, { type GrayMatterFile } from "gray-matter";

const BLOG_DIR = "src/blog/";

export interface BlogData {
	date: Date;
	original?: string;
	title: string;
	updated?: Date;
}

export interface BlogPost extends Omit<GrayMatterFile<string>, "data"> {
	data: BlogData;
}

export default async function getBlogPosts() {
	const blogPostDirectoryEntries = await readdir(BLOG_DIR);
	const blogPostDirectories = blogPostDirectoryEntries.filter((entry) =>
		lstatSync(`${BLOG_DIR}/${entry}`).isDirectory(),
	);
	return Promise.all(
		blogPostDirectories.map(async (directory) => {
			const post = matter.read(`${BLOG_DIR + directory}/index.md`) as BlogPost;
			return {
				post,
				slug: directory,
			};
		}),
	);
}
