import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

// One ordered group means no blank lines between imports, the order inside it is the code standard in CLAUDE.md.
const IMPORT_ORDER = [
  "^react$",
  "^react-dom",
  "^react-router",
  "^@?\\w",
  "^@/assets",
  "^@/components",
  "^@/hooks",
  "^@/services",
  "^@/zustand",
  "^@/constants",
  "^@/lib",
  "^@/validations",
  "^@/types",
  "^\\.",
];

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: { "simple-import-sort": simpleImportSort },
    rules: {
      "simple-import-sort/imports": ["error", { groups: [IMPORT_ORDER] }],
      "simple-import-sort/exports": "error",
    },
  },
  {
    // A file past ~150 lines is doing more than one job, split it. Data files are exempt, they are long by nature.
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/constants/**", "src/**/constant.ts", "src/**/*.test.ts"],
    rules: {
      "max-lines": [
        "error",
        { max: 150, skipBlankLines: true, skipComments: true },
      ],
    },
  },
  {
    // Screens and components get data through services/, never straight from a mock or the store.
    files: ["src/screens/**/*.{ts,tsx}", "src/components/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@/zustand/store/store",
              message: "Read and write state through a hook in services/.",
            },
          ],
          patterns: [
            {
              group: ["@/constants/*"],
              importNamePattern: "^MOCK_",
              message: "Read mock data through a hook in services/queries/.",
            },
          ],
        },
      ],
    },
  },
]);
