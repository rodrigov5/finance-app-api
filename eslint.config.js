import globals from "globals";
import { pluginJs, js } from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: globals.node,
    },
  },
  pluginJs.configs.recommended,
  js.configs.recommended,
  {
    rules: {
      "no-unused-vars": "error",
      "no-undef": "warn",
    },
  },
];
