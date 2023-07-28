<script lang="ts">
function defaultComparator<T>(a: T, z: T): boolean {
  return a === z
}

function defaultDisplayValue<T extends { text?: string }>(item: T) {
  if (typeof item === "string" || typeof item === "number") return item

  return item?.text ?? ""
}
</script>

<script setup lang="ts">
import { PropType } from "vue"
import BasePopper from "./BasePopper.vue"

import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxButton,
  ComboboxLabel,
} from "@headlessui/vue"
import { InputSizes, useInputClass } from "./combinator"

const props = defineProps({
  // headlessui-props
  as: { type: [Object, String], default: "template" },
  disabled: { type: [Boolean], default: false },
  by: { type: [String, Function], default: () => defaultComparator },
  modelValue: {
    type: [Object, String, Number, Boolean, Array],
    default: undefined,
  },
  defaultValue: { type: [Object, String, Number, Boolean], default: undefined },
  name: { type: String },
  nullable: { type: Boolean, default: false },
  multiple: { type: [Boolean], default: false },
  dv: {
    type: Function as PropType<(item: unknown) => unknown>,
    default: defaultDisplayValue,
  },
  placeholder: { type: String },
  // my props
  label: { type: String },
  size: { type: String as PropType<"lg" | "sm" | "md">, default: "md" },
  query: { type: String },
  loading: { type: Boolean, default: false },
  error: { type: String },
  required: { type: Boolean },
  id: { type: String },
})

provide("select-id", props.id)

const emit = defineEmits<{
  (e: "update:model-value", payload: unknown): void
  (e: "update:query", payload: string): void
}>()

const onUpdateModelValue = (value: unknown) => {
  emit("update:model-value", value)
}

const onClose = (index: number): void => {
  if (!props.modelValue) return
  if (!Array.isArray(props.modelValue)) return

  const newModel = props.modelValue.filter((item, idx) => idx !== index)

  emit("update:model-value", newModel)
}

const inputComponent = ref<InstanceType<typeof ComboboxInput> | null>()
const popper = ref<InstanceType<typeof BasePopper> | null>()
const around = ref<HTMLDivElement | null>()

const onAroundClick = (e: MouseEvent): void => {
  if (!around.value) return
  if (e.target !== around.value) return

  inputComponent.value?.$el.focus()
}

const inputClasses = computed(() =>
  useInputClass({
    size: props.size as InputSizes,
    disabled: props.disabled,
    error: props.error,
  })
)

const onQueryChange = (e: Event & { target: HTMLInputElement }): void => {
  emit("update:query", e.target.value)
}
</script>

<template>
  <Combobox
    :id="id"
    :data-testid="id"
    :model-value="modelValue"
    :nullable="nullable"
    :default-value="defaultValue"
    :multiple="multiple"
    :by="by"
    :disabled="disabled"
    :name="name"
    as="div"
    @update:model-value="onUpdateModelValue"
    v-slot="{ open }"
    class="text-gray-500"
  >
    <VFormField :error="error">
      <template #label>
        <ComboboxLabel
          v-if="label"
          :id="`${id}-label`"
          :for="`${id}-input`"
          :data-testid="`${id}-label`"
          :class="{ 'v-select__label--required': required }"
          >{{ label }}</ComboboxLabel
        >
      </template>

      <template #body>
        <base-popper ref="popper" :value="open" :same-width="true">
          <div
            ref="around"
            class="flex border-solid border-2 transition-all max-w-full"
            :class="inputClasses"
            @click="onAroundClick"
          >
            <div
              v-if="multiple && Array.isArray(modelValue)"
              class="multi-input flex min-w-0 flex-wrap flex-1 my-8 gap-8"
            >
              <VChip
                v-for="(selected, idx) in modelValue"
                :key="selected.id ?? selected"
                :size="size"
                @close="onClose(idx)"
                >{{ dv(selected) }}</VChip
              >

              <ComboboxInput
                :id="`${id}-input`"
                ref="inputComponent"
                :data-testid="`${id}-input`"
                :aria-invalid="!!error"
                class="box-border placeholder:text-slate-400 outline-none p-0 min-w-0 bg-transparent border-0 combobox-input"
                autocomplete="off"
                :display-value="dv"
                :disabled="disabled"
                :placeholder="placeholder"
                @change="onQueryChange"
              />
            </div>

            <ComboboxInput
              :id="`${id}-input`"
              ref="inputComponent"
              :data-testid="`${id}-input`"
              :aria-invalid="!!error"
              class="box-border placeholder:text-slate-400 outline-none p-0 bg-transparent border-0 min-w-0 flex-1"
              autocomplete="off"
              :disabled="disabled"
              :display-value="dv"
              :placeholder="placeholder"
              @change="onQueryChange"
            />

            <ComboboxButton
              :id="`${id}-button`"
              :data-testid="`${id}-button`"
              class="flex items-end justify-end border-none"
              :disabled="disabled"
            >
              <template v-if="loading" class="loading-icon">
                <div class="m-loader-circle">
                  <svg class="m-loader-circle__box" viewBox="25 25 50 50">
                    <circle
                      class="m-loader__line text-grey-400"
                      cx="50"
                      cy="50"
                      r="20"
                      stroke="currentColor"
                      fill="none"
                    />
                  </svg>
                </div>
              </template>
              <span v-else-if="!open"> &#8964; </span>
              <span v-else-if="open"> &#8963; </span>
            </ComboboxButton>
          </div>
          <template #content>
            <ComboboxOptions
              :id="`${id}-options`"
              :data-testid="`${id}-options`"
              static
              class="v-select__options"
            >
              <slot />
            </ComboboxOptions>
          </template>
        </base-popper>
      </template>
    </VFormField>
  </Combobox>
</template>

<style scoped>
.v-select__label--required::before {
  content: "*";
  margin-right: 4px;
  color: orangered;
}
.v-select__options {
  margin: 0;
  background: white;
  overflow: auto;
  border-radius: 8px;
  list-style-type: none;
  max-height: 300px;
  position: relative;

  padding-inline-start: 0;
  box-shadow: 0px 0px 16px rgba(29, 32, 35, 0.04),
    0px 15px 30px rgba(29, 32, 35, 0.1);
}
</style>
