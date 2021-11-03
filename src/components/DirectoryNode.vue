<script setup lang="ts">
import FileNode from './FileNode.vue';

import { Directory, File } from '../types';

import DirectoryIcon from '../assets/folder.svg';
import OpenDirectoryIcon from '../assets/right-arrow.svg';

defineProps<{ directory: Directory; selectedFiles: string[] }>();
defineEmits<{
  (event: 'open-folder', folder: Directory): void;
  (event: 'toggle-file-selection', file: File): void;
}>();

const supportedFileFormats = ['image/jpeg', 'image/png', 'application/pdf'];
</script>

<template>
  <template v-for="folder in directory.folders" :key="folder.id">
    <div class="directory-node" @click="$emit('open-folder', folder)">
      <div class="directory-node-icon">
        <img :src="DirectoryIcon" alt="directory-icon" />
      </div>
      <p class="directory-node-name">
        {{ folder.name || 'Expose Material' }}
      </p>
      <div class="open-folder-icon">
        <img :src="OpenDirectoryIcon" alt="open-directory-icon" />
      </div>
    </div>
  </template>

  <template v-for="file in directory.files" :file="file" :key="file.id">
    <FileNode
      :file="file"
      :isSelected="selectedFiles.includes(file.id)"
      v-if="supportedFileFormats.includes(file.mimeType)"
      @toggle-file-selection="$emit('toggle-file-selection', file)"
    />
  </template>
</template>

<style lang="css">
.directory-node {
  display: grid;
  grid-template-columns: 28px auto 28px;
  gap: 12px;
  align-items: center;
  cursor: pointer;
  height: 100%;
  padding: 8px;
}

.directory-node:hover {
  background: var(--color-grey);
  border-radius: 8px;
}

.directory-node:active {
  background: var(--color-grey-2);
  border-radius: 8px;
}

.directory-node-icon {
  width: 100%;
  height: 28px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--color-grey);

  border-radius: 4px;
}

.open-folder-icon {
  display: flex;
  justify-content: center;
}
</style>
