import { Layout } from "./layout.js";

interface EleventyProps {
	title?: string;
	content: string;
}

export const render = ({ title, content }: EleventyProps) => {
	return <Layout title={title || "My 11ty Site"}>{content}</Layout>;
};
