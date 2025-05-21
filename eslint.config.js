import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      /**
       * Default rules
       * @see https://eslint.org/docs/latest/rules/
       */
      // Disable console.log to encourage more explicit logging
      "no-console": [
        "warn",
        {
          allow: [
            "warn",
            "error",
            "info",
            "dir",
            "table",
            "assert",
            "count",
            "time",
            "timeLog",
            "trace",
            "groupCollapsed",
            "groupEnd",
          ],
        },
      ],
      "no-alert": "error",
      "no-template-curly-in-string": "error",
      "prefer-template": "warn",
      "no-implicit-coercion": "warn",
      "require-await": "warn",
      "no-plusplus": ["warn", { allowForLoopAfterthoughts: true }],
      "no-restricted-imports": "off",
      "padding-line-between-statements": "warn",
    },
  }
);
