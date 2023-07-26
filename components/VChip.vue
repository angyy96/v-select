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
    "px-8": isLg,
    "rounded-6": isLg,

    "py-2": isMd || isSm,
    "px-6": isMd || isSm,
    "rounded-4": isMd || isSm,

    "cursor-not-allowed": disabled,
  }
}

const useChipTextClass = ({
  size,
}: ChipClassOptions): Record<string, boolean> => {
  const isMd = size === "md"
  const isSm = size === "sm"
  const isLg = size === "lg"

  return {
    "pr-8": isLg,
    "pl-4": isLg,

    "bottom-2": isLg || isMd,

    "pr-6": isMd,
    "pl-2": isMd,

    "pr-2": isSm,
    "bottom-1": isSm,
  }
}

const chipClasses = computed(() => useChipClass(props))
const chipTextClasses = computed(() => useChipTextClass(props))

const handleClickOnClose = (): void => {
  emits("close")
}
</script>

<template>
  <div class="v-chip inline-flex items-center bg-grey-100" :class="chipClasses">
    <p class="v-chip__text" :class="chipTextClasses">
      <slot />
    </p>
    <div
      v-if="!disabled"
      class="v-chip__close cursor-pointer leading-0 text-grey-500 hover:text-grey-800"
      @click="handleClickOnClose"
    >
      x
    </div>
  </div>
</template>
