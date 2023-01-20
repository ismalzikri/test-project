<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div v-for="item in categories" :key="item.id" class="">
      <div
        :class="show === item.id ? 'rounded-t-xl' : 'rounded-xl'"
        class="w-full bg-white px-7 py-3 shadow-sm font-semibold text-gray-600 cursor-pointer hover:text-primary-color"
        @click="show === item.id ? (show = null) : (show = item.id)">
        {{ item.name }}
      </div>
      <div v-if="show === item.id" class="bg-white z-10 w-full rounded-b-xl">
        <div v-for="children in item.children" :key="children.id" class="px-5">
          <div
            class="py-3 text-gray-600 border-t" @click="
              $router.push(`/categories/${item.slug}?children=${children.id}`)
            ">
            <p class="px-2 py-2 rounded-md hover:bg-primary-color/10 cursor-pointer hover:text-primary-color">
              {{ children.name }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoriesPage',
  data () {
    return {
      categories: [],
      show: null
    }
  },
  async fetch () {
    const { data } = await this.$store.dispatch('category/allCategory')
    this.categories = data.data
  }
}
</script>
