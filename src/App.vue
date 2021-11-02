<script setup lang="ts">
import { ref } from '@vue/reactivity';

import Button from './components/Button.vue';
import DirectoryNode from './components/DirectoryNode.vue';
import { Directory, File } from './types';

//ICONS
import BackButton from './assets/back-arrow.svg';
import CloseButton from './assets/close-icon.svg';
import FileNode from './components/FileNode.vue';

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

const directory: Directory = { files: [], folders: [] };
const file: File = {
  id: '5a635f92-91f6-47c8-8e3d-4261d7787fa2',
  name: 'd34grog-117663eb-df1a-4f70-94a2-5c94be0db08e.png',
  url: 'https://reo-api-dev.s3.eu-central-1.amazonaws.com/property-documents/dfaf8f26-d74c-47ab-84ed-38feaae42725/c7c9688c-9dd6-4393-82f8-25b5e2eaacd6.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA3EL37BD4NO5TW5MV%2F20210426%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20210426T145118Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Signature=b81fb87116f53a861fd69ce1b2038fd8c7c6e4370a5a1bdf779c63f9cf6ce58f',
  mimeType: 'image/png',
  usage: 'internal',
  floorPlan: null,
  parentFolderId: 'a857abe8-ff78-4a79-993b-1c912ef6488a',
  createdAt: 1618239851000,
  updatedAt: 1618566238000,
};

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

          <div class="directory-tree-body">
            <DirectoryNode :directory="directory" />
            <DirectoryNode :directory="directory" />
            <DirectoryNode :directory="directory" />
            <DirectoryNode :directory="directory" />
            <DirectoryNode :directory="directory" />
            <DirectoryNode :directory="directory" />
            <DirectoryNode :directory="directory" />
            <DirectoryNode :directory="directory" />
            <DirectoryNode :directory="directory" />
            <DirectoryNode :directory="directory" />
            <DirectoryNode :directory="directory" />
            <FileNode :file="file" />
            <FileNode :file="file" />
            <FileNode :file="file" />
            <FileNode :file="file" />
            <FileNode :file="file" />
            <FileNode :file="file" />
            <FileNode :file="file" />
            <FileNode :file="file" />
            <FileNode :file="file" />
            <FileNode :file="file" />
          </div>
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
  gap: 10px;
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
  gap: 16px;
}
</style>
