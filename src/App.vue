<script setup lang="ts">
import { ref } from '@vue/reactivity';

import Button from './components/Button.vue';

const selectedFiles = ref([
  {
    name: 'file name',
  },
  {
    name: 'file name',
  },
  {
    name: 'file name',
  },
  {
    name: 'file name',
  },
  {
    name: 'file name',
  },
]);
</script>

<template>
  <main>
    <Button />

    <section class="selected-files">
      <h2 class="selected-files-heading">Files Selected</h2>

      <ul class="selected-files-list">
        <li
          v-for="file in selectedFiles"
          :key="file.name"
          class="selected-files-item"
        >
          {{ file.name }}
        </li>
      </ul>
    </section>
  </main>
</template>

<style>
:root {
  --color-blue: #1890ff;
  --color-white: #ffffff;
  --color-black: #262626;

  --font-size-base: 16px;
  --font-size-md: 14px;
  --font-family: SF Pro Display;
}

html {
  box-sizing: border-box;
  font-size: var(--font-size-base);
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
ol,
ul {
  margin: 0;
  padding: 0;
  font-weight: normal;
}

ol,
ul {
  list-style: none;
}

img {
  max-width: 100%;
  height: auto;
}

main {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  padding-top: 10rem;

  max-width: 768px;
  margin: 0 auto;
}

.selected-files {
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: 33px;
  padding: 0 2rem;
}

.selected-files-heading {
  font-size: calc(var(--font-size-base) - 2px);
  font-weight: 500;
}

.selected-files-item {
  margin: 7px 0;
}
</style>
