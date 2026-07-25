import type { FC } from "react";
import type { SongData } from "../_data/music";
import { DateFormat } from "./date-format";

interface Props extends Omit<SongData, "songId" | "title"> {
	slug: string;
}

export const SongMeta: FC<Props> = ({ date, slug }) => (
	<em className="meta">
		<span>
			Uploaded: <DateFormat date={date} />
		</span>
		<span>
			<a href={`https://soundcloud.com/megoth/${slug}`}>SoundCloud URL</a>
		</span>
	</em>
);
