# Vue File Selector

[![Cypress Tests](https://github.com/igbominadeveloper/vue-file-selector/actions/workflows/main.yml/badge.svg)](https://github.com/igbominadeveloper/vue-file-selector/actions/workflows/main.yml)

[![Netlify Status](https://api.netlify.com/api/v1/badges/7da0461b-a871-4497-96c1-cd8ae360b15e/deploy-status)](https://app.netlify.com/sites/vue-file-selector/deploys)

A tiny application demonstrating a file directory in vue js

# How to run locally

- clone the repo
- run `yarn` to install all the dependencies
- run `yarn dev` to spin up the dev server

# Run e2e Tests

- start the dev server (`yarn dev`)
- run `yarn test`

# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.
