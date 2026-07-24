import { lstatSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import matter from "gray-matter";
import { marked } from "marked";

const TALKS_DIR = "src/talks/";

export interface TalkData {
	date: Date;
	repository: string;
	title: string;
	url: string;
}

export type TalkList = Array<{
	data: TalkData;
	html: string;
	slug: string;
}>;

export default async function getTalks() {
	const talksDirectoryEntries = await readdir(TALKS_DIR);
	const talksDirectories = talksDirectoryEntries.filter((entry) =>
		lstatSync(`${TALKS_DIR}/${entry}`).isDirectory(),
	);
	return Promise.all(
		talksDirectories.map(async (directory) => {
			const path = `${TALKS_DIR + directory}/index.md`;
			const text = (await readFile(path)).toString();
			return {
				data: matter(text).data as TalkData,
				html: marked.parse(text.split("---\n")[2]) as string,
				slug: directory,
			};
		}),
	);
}
