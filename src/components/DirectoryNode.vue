<script setup lang="ts">
import FileNode from './FileNode.vue';

import { Directory } from '../types';

import DirectoryIcon from '../assets/folder.svg';
import OpenDirectoryIcon from '../assets/right-arrow.svg';

defineProps<{ directory: Directory }>();
defineEmits<{
  (event: 'open-folder', folder: Directory): void;
}>();

const supportedFileFormats = ['image/jpeg', 'image/png', 'application/pdf'];
</script>

<template>
  <div v-for="folder in directory.folders" :key="folder.id">
    <div class="directory-node" @click="$emit('open-folder', folder)">
      <div class="directory-node-icon">
        <img :src="DirectoryIcon" alt="directory-icon" />
      </div>
      <p class="directory-node-name">
        {{ folder.name || 'Expose Material' }}
      </p>
      <img :src="OpenDirectoryIcon" alt="open-directory-icon" />
    </div>
  </div>

  <template v-for="file in directory.files" :file="file" :key="file.id">
    <FileNode
      :file="file"
      v-if="supportedFileFormats.includes(file.mimeType)"
    />
  </template>
</template>

<style lang="css">
.directory-node {
  display: grid;
  grid-template-columns: 28px auto 11px;
  gap: 12px;
  align-items: center;
  cursor: pointer;
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
</style>
