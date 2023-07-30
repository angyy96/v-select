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
      :aria-disabled="disabled"
      :class="{
        ...optionClasses,
        'bg-slate-100': active,
        'text-slate-400': disabled,
        'text-sky-500 font-bold': selected,
      }"
    >
      <slot />
    </li>
  </ComboboxOption>
</template>
