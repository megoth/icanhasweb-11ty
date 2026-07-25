import "tsx/esm";
import { pathToFileURL } from "node:url";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { renderToStaticMarkup } from "react-dom/server";

export default async function (eleventyConfig) {
	eleventyConfig.setInputDirectory("src");
	eleventyConfig.addPassthroughCopy("src/css");
	eleventyConfig.addPassthroughCopy("src/img");
	eleventyConfig.setOutputDirectory("dist");

	eleventyConfig.addWatchTarget("src/components/**");
	eleventyConfig.addWatchTarget("src/projects/**");
	eleventyConfig.addWatchTarget("src/talks/**");

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

	eleventyConfig.addPlugin(eleventyImageTransformPlugin);

	eleventyConfig.addTemplateFormats(["11ty.jsx", "11ty.ts", "11ty.tsx"]);
}
