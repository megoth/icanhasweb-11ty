import { lstat, readdir } from "node:fs/promises";
import { lstatSync } from "node:fs";
import matter, { type GrayMatterFile } from "gray-matter";

const BLOG_DIR = "src/blog/";

export interface BlogPost extends Omit<GrayMatterFile<string>, "data"> {
	data: {
		date: Date;
		title: string;
	};
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
