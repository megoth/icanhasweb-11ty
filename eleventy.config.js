import "tsx/esm";
import { evaluate } from "@mdx-js/mdx";
import { pathToFileURL } from "node:url";
import { renderToStaticMarkup } from "react-dom/server";
import * as runtime from "react/jsx-runtime";

export default async function (eleventyConfig) {
	eleventyConfig.setInputDirectory("src");
	eleventyConfig.addPassthroughCopy("src/css");
	eleventyConfig.addPassthroughCopy("src/img");
	eleventyConfig.setOutputDirectory("dist");

	eleventyConfig.addWatchTarget("src/components/**");

	eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
		key: "11ty.js",
		compile: () =>
			async function (data) {
				// Resolve and fetch the component's default content
				const content = await this.defaultRenderer(data);
				return renderToStaticMarkup(content);
			},
	});

	eleventyConfig.addExtension("mdx", {
		compile: async (str, inputPath) => {
			const { default: mdxContent } = await evaluate(str, {
				...runtime,
				baseUrl: pathToFileURL(inputPath),
			});

			return async (data) => {
				const res = await mdxContent(data);
				return renderToStaticMarkup(res);
			};
		},
	});

	eleventyConfig.addTemplateFormats(["11ty.jsx", "11ty.ts", "11ty.tsx"]);
}
