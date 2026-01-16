# typescript-template

A template for a Typescript repository

## ESLint Setup

```javascript
module.exports = {
  env: {
    es2022: true,
    node: true,
  },
  overrides: [
    {
      files: ['**/*.js'],
      extends: ['eslint:recommended'],
      // https://eslint.org/docs/v8.x/use/configure/language-options#specifying-parser-options
      parserOptions: {
        ecmaVersion: '2022',
      },
    },
    {
      files: ['src**/*.ts'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
      ],
      plugins: ['@typescript-eslint'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: true,
      },
    },
  ],
};
```

The newest version of ESLint is using the new `flatconfig` format. Even though it looks cool sadly

the adaptation of it in the community has not yet reached to the point where it makes sense to start

using it. That is why this repo uses the `8.57.0` version which still defaults to the old config

file format. It has some consequences.

1. The file has to be in CommonJS format since version `8.57.0` doesn't support anything else
2. The support both JS and Typescript by using the overrides property.
3. Note that the `module.exports.overrides[0].parserOptions` needs to have a higher ECMA version

   specified as the default is `ES5`. For the Typescript configuration this is not needed as it

   reads the settings from the `tsconfig` when `module.exports.overrides[1].parserOptions.project`

   is set to `true`

## Why is nodemon Used Over tsx watch

Because `tsx watch` does not support watching .env file.

## Migration from Jest to Vitest

1. Uninstall Jest

   ```bash
   npm uninstall jest @types/jest
   npm install -D vitest
   ```

1. Configure Vitest

   [vitest config in the repo](vitest.config.ts)

1. Update package.json with test commands referencing `vitest` rather than `jest`

   ```json
   {
     "scripts": {
       "test": "vitest run",
       "test:watch": "vitest watch",
       "test:coverage": "vitest run --coverage"
     }
   }
   ```

1. And ensure to add `import { describe, it, expect } from 'vitest';` at the top of test cases.
