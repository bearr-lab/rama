/** @type {import('stylelint').Config} */
const config = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-clean-order'
  ],
  ignoreFiles: [
    'node_modules/**',
    '.next/**',
    'out/**',
    'dist/**',
    'build/**',
    'coverage/**',
    '.storybook/**',
    'storybook-static/**'
  ],

  rules: {

    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'import',
          'theme',
          'custom-variant',
          'utility',
          'variant',
          'layer',
          'apply',
          'config',
          'keyframes'
        ],
      },
    ],
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: [
          'theme',
          'oklch',
          'rgb',
          'rgba',
          'hsl',
          'hsla',
          'var',
          'calc',
          'url',
          'linear-gradient',
          'radial-gradient',
          'cubic-bezier',
          'circle',
          'polygon',
          'hypot',
          'sqrt'
        ],
      },
    ],
    'import-notation': null,
    'no-empty-source': null,
    'custom-property-pattern': null,
    'selector-class-pattern': null,
    'value-keyword-case': null,
    'alpha-value-notation': null,
    'color-function-notation': null,
    'media-query-no-invalid': null,
    'rule-empty-line-before': null,
    'comment-empty-line-before': null,
    'declaration-block-no-redundant-longhand-properties': null
  },
};

export default config;
