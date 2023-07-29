<script setup lang="ts">
enum DogPedegree {
  Labrador = "labrador",
  Shepherd = "shepherd",
  Chihuahua = "Chihuahua",
}

const data = ref({
  params: {
    type: DogPedegree.Labrador,
    name: "",
  },
})

interface DogOption {
  id: DogPedegree
  text: string
}

const typeOptions = [
  { id: DogPedegree.Labrador, text: "Labrador" },
  { id: DogPedegree.Shepherd, text: "Shepherd" },
  { id: DogPedegree.Chihuahua, text: "Chihuahua" },
]

// Простые селекты
const simpleTypeObj = ref<DogOption>(
  typeOptions.find((option) => option.id == data.value.params.type) ??
    typeOptions[0]
)

const simpleTypeObDisabled = ref<DogOption>(
  typeOptions.find((option) => option.id == data.value.params.type) ??
    typeOptions[0]
)
</script>

<template>
  <div class="playground">
    <div class="flex flex-col gap-10">
      <div class="col">
        <h1 class="text-xl pb-8">Simple selects</h1>

        <VSelect
          v-model="simpleTypeObj"
          label="Select a dog"
          :dv="(option) => option?.text"
          id="select_one"
          by="id"
          placeholder="select a dog"
          size="lg"
        >
          <VSelectOption
            v-for="option in typeOptions"
            :key="option.id"
            :value="option.id"
            size="sm"
            >{{ option.text }}</VSelectOption
          >
        </VSelect>
      </div>
      <div class="col">
        <h1 class="text-xl pb-8">Simple disabled selects</h1>

        <VSelect
          v-model="simpleTypeObDisabled"
          label="Select a dog"
          :dv="(option) => option?.text"
          id="select_two"
          disabled
          by="id"
          placeholder="select a dog"
          size="lg"
        >
          <VSelectOption
            v-for="option in typeOptions"
            :key="option.id"
            :value="option.id"
            size="sm"
            >{{ option.text }}</VSelectOption
          >
        </VSelect>
      </div>
    </div>
  </div>
</template>

<style scoped>
.playground {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10rem;
  padding: 2rem;

  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity));
}
</style>
