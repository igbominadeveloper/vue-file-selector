<script setup lang="ts">
import FileSelectedIcon from '../assets/selected.svg';
import PdfIcon from '../assets/pdf.svg';
import FallbackImage from '../assets/fallback-picture.png';

import { File } from '../types';

defineProps<{ file: File }>();
</script>

<template>
  <div class="file-node">
    <img
      :src="file.url || ''"
      alt="file-icon"
      class="file-node-image"
      v-if="file.mimeType === 'image/jpeg' || file.mimeType === 'image/png'"
      @error="(error:any) => error.target.src = FallbackImage"
    />

    <div class="file-node-icon" v-else-if="file.mimeType === 'application/pdf'">
      <img :src="PdfIcon" alt="pdf-file-icon" />
    </div>

    <p class="file-node-name">
      {{ file.name || 'Expose Material' }}
    </p>
    <img
      :src="FileSelectedIcon"
      alt="selected-file-icon"
      class="file-node-selector"
    />
  </div>
</template>

<style lang="css">
.file-node {
  display: grid;
  grid-template-columns: 28px auto 18px;
  gap: 12px;
  align-items: center;
  cursor: pointer;
}

.file-node-image {
  width: 100%;
  height: 28px;

  border-radius: 4px;
}

.file-node-selector {
  width: 17.5px;
  height: 17.5px;
}

.file-node-icon {
  width: 100%;
  height: 28px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--color-grey);

  border-radius: 4px;
}
</style>
