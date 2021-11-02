<template>
  <button class="button">
    <slot>Select Files</slot>
  </button>
</template>

<style scoped>
.button {
  background: var(--color-blue);
  color: var(--color-white);
  border-radius: 4px;

  padding: 5px 16px;
  font-size: var(--font-size-md);
  border: none;

  cursor: pointer;
}
</style>
