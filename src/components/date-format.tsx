import type { FC } from "react";

interface Props {
	date: Date;
}

export const DateFormat: FC<Props> = ({ date }) =>
	date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
