import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import globals from "globals";

const eslintConfig = [
	{
		ignores: [".next/**", "out/**", "node_modules/**", ".git/**"],
	},
	js.configs.recommended,
	{
		files: ["**/*.{js,jsx,mjs}"],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				React: "readonly",
			},
			ecmaVersion: "latest",
			sourceType: "module",
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		rules: {
			"no-unused-vars": [
				"warn",
				{ argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
			],
			"prefer-const": "warn",
			"no-undef": "error",
		},
	},
	{
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			parser: tsparser,
			globals: {
				...globals.browser,
				...globals.node,
				React: "readonly",
			},
			ecmaVersion: "latest",
			sourceType: "module",
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		plugins: {
			"@typescript-eslint": tseslint,
		},
		rules: {
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{ argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
			],
			"@typescript-eslint/no-explicit-any": "warn",
			"@typescript-eslint/no-empty-object-type": "warn",
			"prefer-const": "warn",
			"no-undef": "off", // TypeScript handles this
			"no-redeclare": "off", // TypeScript handles this
			"no-unused-vars": "off", // Let @typescript-eslint handle this
		},
	},
];

export default eslintConfig;
