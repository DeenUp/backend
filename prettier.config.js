/** @typedef {import("prettier").Config} PrettierConfig */
/** @typedef {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */

/** @type { PrettierConfig | SortImportsConfig  } */

module.exports = {
	trailingComma: "all",
	tabWidth: 4,
	semi: false,
	singleQuote: false,
	arrowParens: "always",
	printWidth: 80,
	useTabs: true,
}
