import type { FC } from "react";
import type { SongData } from "../_data/music";
import { DateFormat } from "./date-format";

interface Props extends Omit<SongData, "title"> {
	slug: string;
}

export const SongMeta: FC<Props> = ({
	date,
	slug,
	soundCloudSongId,
	youtubeVideoId,
}) => (
	<em className="meta">
		<span>
			Uploaded: <DateFormat date={date} />
		</span>
		{soundCloudSongId && (
			<span>
				<a href={`https://soundcloud.com/megoth/${slug}`}>SoundCloud URL</a>
			</span>
		)}
		{youtubeVideoId && (
			<span>
				<a href={`https://www.youtube.com/watch?v=${youtubeVideoId}`}>
					YouTube URL
				</a>
			</span>
		)}
	</em>
);
