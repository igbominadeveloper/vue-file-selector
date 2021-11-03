<script setup lang="ts">
import { computed, ref } from '@vue/reactivity';
import { onMounted, watch } from '@vue/runtime-core';

import Button from './components/Button.vue';
import DirectoryNode from './components/DirectoryNode.vue';

//TODO ideally - this would be in an environment variable file
const API_URL = 'https://api-dev.reo.so/api/folderStructure';

//ICONS
import BackButton from './assets/back-arrow.svg';
import CloseButton from './assets/close-icon.svg';

import { Directory, File } from './types';

const selectedFiles = ref<File[]>([]);
const tempSelectedFiles = ref<File[]>([]);
const isFetchingDirectories = ref(true);

const showDirectory = ref(false);
const fullDirectory = ref<Directory>({} as Directory);
const selectedDirectory = ref(fullDirectory.value);

const showBackButton = computed(() => {
  return (
    selectedDirectory?.value?.folders &&
    selectedDirectory?.value?.folders[0]?.parentFolderId !== null
  );
});

const allFilesSelected = computed(() => {
  return tempSelectedFiles.value.map((file) => file.id);
});

const viewedDirectories = {
  [selectedDirectory.value?.parentFolderId || 'null']: selectedDirectory.value,
};

const setCurrentDirectory = (activeFolder: Directory) => {
  if (activeFolder.id) {
    viewedDirectories[activeFolder.id] = activeFolder;
  }
  selectedDirectory.value = activeFolder;
};

const handleCloseButtonClick = () => {
  if (tempSelectedFiles.value.length === 0) {
    selectedFiles.value = [];
  }

  closeDirectory();
};

const closeDirectory = () => {
  selectedDirectory.value = fullDirectory.value;
  showDirectory.value = false;
  tempSelectedFiles.value = [];
};

const goBack = () => {
  const parentFolder =
    viewedDirectories[selectedDirectory.value?.parentFolderId || 'null'];

  selectedDirectory.value = parentFolder;
};

const toggleFileSelection = (file: File) => {
  if (tempSelectedFiles.value.includes(file)) {
    tempSelectedFiles.value = tempSelectedFiles.value.filter(
      (tempFile) => tempFile.id !== file.id
    );
  } else {
    tempSelectedFiles.value = [...tempSelectedFiles.value, file];
  }
};

const populateSelectedFilesList = () => {
  selectedFiles.value = [...tempSelectedFiles.value];
  tempSelectedFiles.value = [];
  closeDirectory();
};

const fetchAllDirectories = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();

  fullDirectory.value = data;
  selectedDirectory.value = data;
  viewedDirectories[selectedDirectory.value?.parentFolderId || 'null'] =
    selectedDirectory.value;
  isFetchingDirectories.value = false;
};

watch(showDirectory, (newValue) => {
  if (newValue) {
    tempSelectedFiles.value = selectedFiles.value;
  }
});

onMounted(fetchAllDirectories);
</script>

<template>
  <main>
    <div class="directory-wrapper">
      <Button
        @click="showDirectory = true"
        class="click-handler"
        :disabled="isFetchingDirectories"
      >
        {{ isFetchingDirectories ? 'Please wait...' : 'Select Files' }}
        <!-- I tried using teleport here -->
      </Button>
      <section class="directory-tree" v-show="showDirectory">
        <header class="directory-tree-header">
          <div
            :class="[
              'action-button-container back-button-container',
              !showBackButton && 'no-hover',
            ]"
            @click="goBack"
          >
            <img
              :src="BackButton"
              alt="back-button"
              class="back-button"
              v-show="showBackButton"
            />
          </div>
          <h1 class="directory-name">{{ selectedDirectory.name }}</h1>

          <div
            class="action-button-container close-button-container"
            @click="handleCloseButtonClick"
          >
            <img :src="CloseButton" alt="close-button" class="close-button" />
          </div>
        </header>

        <div class="directory-tree-body">
          <DirectoryNode
            :directory="selectedDirectory"
            :selectedFiles="allFilesSelected"
            @open-folder="setCurrentDirectory"
            @toggle-file-selection="toggleFileSelection"
          />
        </div>
        <footer class="directory-tree-footer">
          <Button
            class="directory-tree-footer-button"
            :disabled="!tempSelectedFiles.length"
            @click="populateSelectedFilesList"
          >
            Select {{ tempSelectedFiles.length || null }}
            {{ tempSelectedFiles.length === 1 ? 'file' : 'files' }}
          </Button>
        </footer>
      </section>
    </div>

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

.selected-files-list {
  display: grid;
  gap: 13px;

  margin-top: 7px;
}

.selected-files {
  width: 100%;
  max-width: 500px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  margin-top: 33px;
  padding: 0 10px;
}

.selected-files-heading {
  font-size: calc(var(--font-size-base) - 2px);
  font-weight: 600;
  font-size: var(--font-size-base);
}

.selected-files-item {
  font-size: var(--font-size-base);
}

.directory-name {
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
}

.directory-tree-header {
  display: grid;
  grid-template-columns: 44px auto 44px;
  gap: 13.79px;
  align-items: center;
  /* padding: 8px; */
}

.back-button {
  width: 16.43px;
}

.directory-wrapper {
  position: relative;
}

.action-button-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  width: 100%;
}

.action-button-container:hover {
  background: var(--color-grey);
  border-radius: 8px;
  cursor: pointer;
}

.close-button {
  width: 14.13px;
}

.directory-tree {
  height: 380px;
  width: 420px;
  border-radius: 16px;

  background: var(--color-white);

  box-shadow: 0px 4px 8px var(--color-grey), 0px 8px 24px rgba(0, 0, 0, 0.12);
  border-radius: 16px;

  padding: 8px;

  font-family: var(--font-family-secondary);

  display: grid;
  grid-template-rows: 44px auto 64px;
  gap: 10px;

  position: absolute;
  top: 0;
}

.directory-tree-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.directory-tree-body {
  overflow-y: auto;

  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: 44px;
  gap: 5px;
  align-items: flex-start;
}
</style>
