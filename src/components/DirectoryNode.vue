<script setup lang="ts">
import DirectoryIcon from '../assets/folder.svg';
import OpenDirectoryIcon from '../assets/right-arrow.svg';
import { Directory } from '../types';

defineProps<{ directory: Directory }>();
</script>

<template>
  <div class="directory-node">
    <div class="directory-node-icon">
      <img :src="DirectoryIcon" alt="directory-icon" />
    </div>
    <p class="directory-node-name">
      {{ directory.name || 'Expose Material' }}
    </p>
    <img :src="OpenDirectoryIcon" alt="open-directory-icon" />
  </div>
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
