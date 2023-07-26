<template>
  <div>
    <div>
      <slot name="label"></slot>

      <div>
        <slot name="body"></slot>
      </div>

      <span>{{ error }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  error?: string
}
defineProps<Props>()
</script>
