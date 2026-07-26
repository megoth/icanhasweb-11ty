import { type FC, Fragment } from "react";
import type { SongList } from "../_data/music";
import { SongMeta } from "./song-meta";

interface Props {
	songs: SongList;
}

export const Songs: FC<Props> = ({ songs }) => {
	return (
		<dl className="songs">
			{songs
				.sort((a, b) => (a.data.date < b.data.date ? 1 : -1))
				.map(({ data, html, slug }) => (
					<Fragment key={slug}>
						<dt className="subtitle">{data.title}</dt>
						<dd>
							<div
								className="content"
								dangerouslySetInnerHTML={{ __html: html }}
							/>
							{data.youtubeVideoId && (
								<iframe
									width="560"
									height="315"
									src={`https://www.youtube.com/embed/${data.youtubeVideoId}`}
									title="YouTube video player"
									frameBorder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
									referrerPolicy="strict-origin-when-cross-origin"
									allowFullScreen
									loading="lazy"
								/>
							)}
							{data.soundCloudSongId && (
								<iframe
									width="100%"
									height="300"
									scrolling="no"
									frameBorder="no"
									allow="autoplay; encrypted-media"
									src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A${data.soundCloudSongId}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`}
									title={`${data.title} by megoth`}
									loading="lazy"
								/>
							)}
							<SongMeta {...data} slug={slug} />
						</dd>
					</Fragment>
				))}
		</dl>
	);
};
