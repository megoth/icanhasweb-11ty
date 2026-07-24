import { Layout } from "./layout";

interface EleventyProps {
	content: string;
	title?: string;
}

export const render = ({ title, content }: EleventyProps) => {
	return (
		<Layout title={title}>
			<div className="content" dangerouslySetInnerHTML={{ __html: content }} />
		</Layout>
	);
};
