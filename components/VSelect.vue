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
  >
    <VFormField :error="error">
      <template #label>
        <ComboboxLabel
          v-if="label"
          :id="`${id}-label`"
          :for="`${id}-input`"
          :data-testid="`${id}-label`"
          :class="{ 'vselect__label--required': required }"
          >{{ label }}</ComboboxLabel
        >
      </template>

      <template #body>
        <base-popper
          ref="popper"
          :value="open"
          :same-width="true"
          :fixed="true"
        >
          <div
            ref="around"
            class="flex border-solid border transition-all max-w-full"
            :class="inputClasses"
            @click="onAroundClick"
          >
            <div
              v-if="multiple && Array.isArray(modelValue)"
              class="multi-input flex min-w-0 flex-wrap flex-1 my-4 gap-2"
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
                class="vselect__input box-border placeholder:text-slate-400 outline-none p-0 min-w-0 bg-transparent border-0 combobox-input"
                autocomplete="off"
                :display-value="dv"
                :aria-label="label"
                :aria-multiline="false"
                :aria-multiselectable="true"
                :aria-required="required"
                :aria-disabled="disabled"
                :disabled="disabled"
                :placeholder="placeholder"
                @change="onQueryChange"
              />
            </div>

            <ComboboxInput
              v-else
              :id="`${id}-input`"
              ref="inputComponent"
              :data-testid="`${id}-input`"
              :aria-invalid="!!error"
              :aria-required="required"
              :aria-disabled="disabled"
              :aria-owns="`${id}-options`"
              class="vselect__input box-border placeholder:text-slate-400 outline-none p-0 bg-transparent border-0 min-w-0 flex-1"
              autocomplete="off"
              :disabled="disabled"
              :display-value="dv"
              :placeholder="placeholder"
              @change="onQueryChange"
            />

            <ComboboxButton
              :id="`${id}-button`"
              :data-testid="`${id}-button`"
              :disabled="disabled || loading"
              :aria-disabled="disabled || loading"
              class="border-none w-16 flex items-center justify-center"
              :class="{ 'vselect__button--disabled': disabled }"
            >
              <template v-if="loading" class="loading-icon">
                <div class="m-loader-circle">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      fill="none"
                      stroke="#1d3f72"
                      stroke-width="2"
                      r="35"
                      stroke-dasharray="164.93361431346415 56.97787143782138"
                    >
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        repeatCount="indefinite"
                        dur="1s"
                        values="0 50 50;360 50 50"
                        keyTimes="0;1"
                      ></animateTransform>
                    </circle>
                  </svg>
                </div>
              </template>

              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
                class="vselect__caret"
                :class="{ 'is-reverse': open }"
              >
                <path
                  fill-rule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </ComboboxButton>
          </div>
          <template #content>
            <ComboboxOptions
              :id="`${id}-options`"
              :data-testid="`${id}-options`"
              static
              class="vselect__options"
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
.vselect__label--required::before {
  content: "*";
  margin-right: 4px;
  color: orangered;
}

.vselect__input,
.vselect__button--disabled {
  cursor: inherit;
}

.vselect__options {
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

.vselect__caret {
  transition: transform 0.3s ease-in-out;
}
.vselect__caret.is-reverse {
  transform: rotate(-180deg);
}
</style>
