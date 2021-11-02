<script setup lang="ts">
import { ref } from '@vue/reactivity';

import Button from './components/Button.vue';

//ICONS
import BackButton from './assets/back-arrow.svg';
import CloseButton from './assets/close-icon.svg';

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

const showDirectory = ref(false);
</script>

<template>
  <main>
    <Button @click="showDirectory = true" class="click-handler">
      Select Files
      <!-- I tried using teleport here -->
      <Teleport to="#teleport-target">
        <section class="directory-tree" v-show="showDirectory">
          <header class="directory-tree-header">
            <img :src="BackButton" alt="back-button" class="pointer" />
            <h1 class="directory-name">Directory</h1>
            <img
              :src="CloseButton"
              alt="close-button"
              class="pointer"
              @click="showDirectory = false"
            />
          </header>

          <div class="directory-tree-list"></div>
          <footer class="directory-tree-footer">
            <Button class="directory-tree-footer-button"> Select files </Button>
          </footer>
        </section>
      </Teleport>
    </Button>

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
@import 'assets/index.css';

.click-handler {
  position: relative;
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

.directory-name {
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
}

.directory-tree-header {
  display: grid;
  grid-template-columns: 16.43px auto 14.13px;
  gap: 13.79px;
  align-items: center;
}
/* 
#teleport-target {
  position: absolute;
  top: 10rem;
  left: 15rem;
} */

.directory-tree {
  height: 380px;
  width: 420px;
  border-radius: 16px;

  background: var(--color-white);

  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08), 0px 8px 24px rgba(0, 0, 0, 0.12);
  border-radius: 16px;

  padding: 0 21.78px;

  font-family: var(--font-family-secondary);

  display: grid;
  grid-template-rows: 60px auto 64px;
}

.directory-tree-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.directory-tree-list {
  overflow-y: scroll;
}
</style>
