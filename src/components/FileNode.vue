<script setup lang="ts">
import FileSelectedIcon from '../assets/selected.svg';
import PdfIcon from '../assets/pdf.svg';

import FallbackImage1 from '../assets/fallback-1.png';
import FallbackImage2 from '../assets/fallback-2.png';
import FallbackImage3 from '../assets/fallback-3.png';
import FallbackImage4 from '../assets/fallback-4.png';

import { File } from '../types';
import { computed } from '@vue/reactivity';

defineProps<{ file: File; isSelected: boolean }>();
defineEmits<{
  (event: 'toggle-file-selection'): void;
}>();

const randomFallbackImage = computed(() => {
  const images = [
    FallbackImage1,
    FallbackImage2,
    FallbackImage3,
    FallbackImage4,
  ];

  return images[Math.floor(Math.random() * images.length)];
});
</script>

<template>
  <div class="file-node" @click="$emit('toggle-file-selection')">
    <img
      :src="file.url || ''"
      alt="file-icon"
      class="file-node-image"
      v-if="file.mimeType === 'image/jpeg' || file.mimeType === 'image/png'"
      @error="(error:any) => error.target.src = randomFallbackImage"
    />

    <div class="file-node-icon" v-else-if="file.mimeType === 'application/pdf'">
      <img :src="PdfIcon" alt="pdf-file-icon" />
    </div>

    <p class="file-node-name">
      {{ file.name || 'Expose Material' }}
    </p>

    <div>
      <img
        :src="FileSelectedIcon"
        alt="selected-file-icon"
        class="file-node-selector"
        v-if="isSelected"
      />
    </div>
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
