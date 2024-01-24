<script setup lang="ts">
enum DogPedegree {
  Labrador = "Labrador",
  Shepherd = "Shepherd",
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

const multipleObj = ref(
  Object.keys(DogPedegree).map((val) => ({ id: val, text: val }))
)
</script>

<template>
  <div class="playground">
    <div class="col">
      <h1 class="text-xm pb-8">Simple small select</h1>

      <VSelect
        v-model="simpleTypeObj"
        label="Select a dog"
        :dv="(option) => option?.text"
        id="select_one"
        by="id"
        placeholder="select a dog"
        size="sm"
      >
        <VSelectOption
          v-for="option in typeOptions"
          :key="option.id"
          :value="option"
          size="sm"
          >{{ option.text }}</VSelectOption
        >
      </VSelect>
    </div>

    <div class="col">
      <h1 class="text-xl pb-8">Simple medium select</h1>

      <VSelect
        v-model="simpleTypeObj"
        label="Select a dog"
        :dv="(option) => option?.text"
        id="select_two"
        by="id"
        placeholder="select a dog"
        size="md"
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
      <h1 class="text-xl pb-8">Simple large select</h1>

      <VSelect
        v-model="simpleTypeObj"
        label="Select a dog"
        :dv="(option) => option?.text"
        id="select_three"
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
      <h1 class="text-xl pb-8">Simple disabled select</h1>

      <VSelect
        v-model="simpleTypeObj"
        label="Select a dog"
        :dv="(option) => option?.text"
        id="select_four"
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

    <div class="col">
      <h1 class="text-xl pb-8">Simple select with error</h1>

      <VSelect
        v-model="simpleTypeObj"
        label="Select a dog"
        :dv="(option) => option?.text"
        id="select_five"
        error="Error"
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
      <h1 class="text-xl pb-8">Simple select with loading</h1>

      <VSelect
        v-model="simpleTypeObj"
        label="Select a dog"
        :dv="(option) => option?.text"
        id="select_six"
        :loading="true"
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
      <h1 class="text-xl pb-8">Multiple select</h1>

      <VSelect
        v-model="multipleObj"
        label="Select a dog"
        id="select_seven"
        by="id"
        multiple
        size="md"
      >
        <VSelectOption
          v-for="option in typeOptions"
          :key="option.id"
          :value="option"
          size="sm"
          >{{ option.text }}</VSelectOption
        >
      </VSelect>
    </div>
  </div>
</template>

<style scoped>
.playground {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 4rem;
  padding: 2rem 2rem 0;

  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity));
}
</style>
