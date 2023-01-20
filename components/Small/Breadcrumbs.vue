<template>
  <div class="flex w-max">
    <div v-for="(item, index) in list" :key="index" class="flex">
      <p
        :class="{
          'text-gray-400 truncate max-w-[128px] md:max-w-none md:w-96 hover:w-full':
            list.length === index + 1,
          'cursor-pointer hover:opacity-80': list.length !== index + 1
        }"
        class="capitalize text-sm"
        @click="$router.push(item.to)"
      >
        {{ item.name }}
      </p>
      <i
        v-if="list.length !== index + 1"
        class="fas fa-angle-right text-gray-400 text-sm mx-2"
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BreadcrumbComponents',
  props: ['list']
}
</script>

<style></style>
