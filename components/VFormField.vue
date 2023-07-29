<template>
  <div>
    <div class="flex flex-col gap-3">
      <slot name="label"></slot>

      <div>
        <slot name="body"></slot>
      </div>

      <div class="text-orange-500">{{ error }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  error?: string
}
defineProps<Props>()
</script>
