import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import tailwind from "eslint-plugin-tailwindcss";

const tailwindRecommended = Array.isArray(tailwind.configs.recommended) 
  ? tailwind.configs.recommended 
  : [tailwind.configs.recommended];

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...tailwindRecommended,
  {
    plugins: {
      tailwindcss: tailwind
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      // "react/no-unescaped-entities": "warn",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/purity": "off",
      "tailwindcss/classnames-order": "warn",
      "tailwindcss/enforces-negative-arbitrary-values": "warn",
      "tailwindcss/enforces-shorthand": "warn",
      "tailwindcss/no-contradicting-classname": "error",
      "tailwindcss/no-custom-classname": "off"
    },
    settings: {
      tailwindcss: {
        callees: ["cn", "cva"],
        cssConfigPath: "./app/globals.css",
        whitelist: [
          "text\\-display(\\-lg|\\-sm)?",
          "text\\-h[1-4]",
          "text\\-body(\\-lg|\\-sm)?",
          "text\\-caption",
          "text\\-small",
          "shadow\\-subtle",
          "shadow\\-floating",
          "hover\\:shadow\\-subtle",
          "hover\\:shadow\\-floating",
          "font\\-display",
          "animate\\-in",
          "fade\\-in",
          "zoom\\-in\\-95",
          "rounded\\-button",
          "inputs",
          "leading\\-1\\.[0-9]+",
        ]
      }
    }
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Build artifacts & utility scripts:
    "storybook-static/**",
    "fix-lint.cjs",
  ]),
]);

export default eslintConfig;
