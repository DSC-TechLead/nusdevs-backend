import globals from "globals";
import pluginJs from "@eslint/js";
import { configs as tsConfigs } from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    ignores: ["dist/**", "node_modules/**"],
    languageOptions: {
      // Use the TypeScript parser for .ts and .tsx files
      parser: tsParser,
      // Enable ES2022 features and module resolution
      ecmaVersion: "latest",
      sourceType: "module",
      // Include browser globals (window, document, etc.)
      globals: globals.browser,
    },
    plugins: {
      // Integrate Prettier as a plugin
      prettier: prettierPlugin,
    },
    rules: {
      // Run Prettier as an ESLint rule, marking formatting issues as errors
      "prettier/prettier": "error",
    },
  },
  // Base recommended config for JS
  pluginJs.configs.recommended,
  // Recommended TypeScript rules
  ...tsConfigs.recommended,
  // Recommended React rules (flat config)
  pluginReact.configs.flat.recommended,
  // Apply Prettier's config last to disable conflicting ESLint rules
  ...prettierConfig
];
