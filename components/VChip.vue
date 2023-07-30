<script lang="ts" setup>
import { computed } from "vue"

export type ChipSizes = "lg" | "md" | "sm"

interface Props {
  size?: ChipSizes
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  disabled: false,
})

const emits = defineEmits(["close"])

// Chip styles
interface ChipClassOptions {
  size: ChipSizes
  disabled: boolean
}

const useChipClass = ({
  size,
  disabled,
}: ChipClassOptions): Record<string, boolean> => {
  const isMd = size === "md"
  const isSm = size === "sm"
  const isLg = size === "lg"

  return {
    "py-4": isLg,
    "px-6": isLg,
    "rounded-lg": isLg,

    "py-2": isMd || isSm,
    "px-4": isMd || isSm,
    "rounded-md": isMd || isSm,

    "cursor-not-allowed": disabled,

    "text-sm": isSm,
    "text-base": isMd,

    "text-lg": isLg,
  }
}

const chipClasses = computed(() => useChipClass(props))

const handleClickOnClose = (): void => {
  emits("close")
}
</script>

<template>
  <div class="v-chip flex items-center gap-2 bg-slate-100" :class="chipClasses">
    <p class="v-chip__text">
      <slot />
    </p>
    <button
      v-if="!disabled"
      class="v-chip__close cursor-pointer leading-0 text-slate-500 hover:text-slate-800"
      @click="handleClickOnClose"
    >
      x
    </button>
  </div>
</template>
