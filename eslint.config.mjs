// import { FlatCompat } from "@eslint/eslintrc";
// import { dirname } from "path";
// import { fileURLToPath } from "url";
//
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
//
// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });
//
// const eslintConfig = [
//   ...compat.extends("next/core-web-vitals"),
// ];
//
// export default eslintConfig;

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    ".agents/**",
  ]),
]);

export default eslintConfig;
