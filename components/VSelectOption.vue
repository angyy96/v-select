<script setup lang="ts">
import { ComboboxOption } from "@headlessui/vue"
import { InputSizes, useSelectItemClass } from "./combinator"

interface P {
  size?: "lg" | "md" | "sm"
}

const props = withDefaults(defineProps<P>(), { size: "md" })

const optionClasses = computed(() =>
  useSelectItemClass({ size: props.size as InputSizes })
)
</script>

<template>
  <ComboboxOption as="template" v-slot="{ active, selected, disabled }">
    <li
      class="cursor-pointer flex gap-8 items-center"
      role="option"
      :disabled="disabled"
      :class="{
        ...optionClasses,
        'bg-grey-100': active,
        'text-grey-400': disabled,
      }"
    >
      <slot />
      <span v-if="selected"> &#10004;</span>
    </li>
  </ComboboxOption>
</template>
