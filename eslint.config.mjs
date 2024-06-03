import pluginJs from "@eslint/js"
import typescriptEslint from "@typescript-eslint/eslint-plugin"
import typeScriptParser from "@typescript-eslint/parser"
import security from "eslint-plugin-security"

import globals from "globals"
import tseslint from "typescript-eslint"

export default [
	{
		ignores: [
			"dist/**/*",
			"**/*.config.js",
			"**/*.config.mjs",
			"**/*.config.cjs",
			"**/.eslintrc.cjs",
			"pnpm-lock.yaml",
		],
	},

	{
		languageOptions: {
			globals: globals.node,
			parser: typeScriptParser,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
			},
		},

		plugins: {
			security,
			typescript: typescriptEslint,
		},
		rules: {
			indent: ["error", "tab", { SwitchCase: 1 }],
			"linebreak-style": ["error", "unix"],
			quotes: ["error", "double"],
			semi: ["error", "never"],
			"no-unused-vars": "off",
		},
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
]
