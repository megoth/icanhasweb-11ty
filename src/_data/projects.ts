import { lstatSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import matter from "gray-matter";
import { marked } from "marked";

const PROJECTS_DIR = "src/projects/";

export interface ProjectData {
	project?: "active";
	repository?: string;
	status: "active" | "complete" | "inactive";
	title: string;
	url?: string;
}

export type ProjectList = Array<{
	data: ProjectData;
	html: string;
	slug: string;
}>;

export default async function getProjects() {
	const projectsDirectoryEntries = await readdir(PROJECTS_DIR);
	const projectsDirectories = projectsDirectoryEntries.filter((entry) =>
		lstatSync(`${PROJECTS_DIR}/${entry}`).isDirectory(),
	);
	return Promise.all(
		projectsDirectories.map(async (directory) => {
			const path = `${PROJECTS_DIR + directory}/index.md`;
			const text = (await readFile(path)).toString();
			return {
				data: matter(text).data as ProjectData,
				html: marked.parse(text.split("---\n")[2]) as string,
				slug: directory,
			};
		}),
	);
}
