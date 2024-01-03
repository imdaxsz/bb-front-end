module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: ["build", "node_modules/*"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {},
    },
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "import/no-named-as-default": "off",
    "import/order": [
      "error",
      {
        groups: [
          "builtin", // nodejs module
          "external", // node_modules
          "internal", // in package
          "parent", // parent dir
          "sibling", // same dir
          "index", // same dir and index file
          "object", // json
        ],
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],
    "prettier/prettier": ["error", { endOfLine: "auto" }],
  },
};
