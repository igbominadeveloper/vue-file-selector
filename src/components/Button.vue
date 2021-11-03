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
  max-width: 108px;

  padding: 7px 12px;
  font-size: var(--font-size-md);
  border: none;

  cursor: pointer;
}

.button:disabled {
  background: var(--color-grey-2);
  border: 1px solid var(--border-grey);
  color: var(--color-grey-3);
}
</style>
