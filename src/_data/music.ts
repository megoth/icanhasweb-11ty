import { lstatSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import matter from "gray-matter";
import { marked } from "marked";

const MUSIC_DIR = "src/music/";

export interface SongData {
	date: Date;
	songId: string;
	title: string;
}

export type SongList = Array<{
	data: SongData;
	html: string;
	slug: string;
}>;

export default async function getSongs() {
	const musicDirectoryEntries = await readdir(MUSIC_DIR);
	const songsDirectories = musicDirectoryEntries.filter((entry) =>
		lstatSync(`${MUSIC_DIR}/${entry}`).isDirectory(),
	);
	return Promise.all(
		songsDirectories.map(async (directory) => {
			const path = `${MUSIC_DIR + directory}/index.md`;
			const text = (await readFile(path)).toString();
			return {
				data: matter(text).data as SongData,
				html: marked.parse(text.split("---\n")[2]) as string,
				slug: directory,
			};
		}),
	);
}
