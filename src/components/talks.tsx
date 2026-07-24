import { type FC, Fragment } from "react";
import type { TalkList } from "../_data/talks.ts";
import { TalkMeta } from "./talk-meta.js";

interface Props {
	talks: TalkList;
}

export const Talks: FC<Props> = ({ talks }) => {
	return (
		<dl className="talks">
			{talks
				.sort((a, b) => (a.data.date < b.data.date ? 1 : -1))
				.map(({ data, html, slug }) => (
					<Fragment key={slug}>
						<dt className="subtitle">{data.title}</dt>
						<dd>
							<div
								className="content"
								dangerouslySetInnerHTML={{ __html: html }}
							/>
							<TalkMeta {...data} slug={slug} />
						</dd>
					</Fragment>
				))}
		</dl>
	);
};
