<template>
  <div class="category-left w-64">
    <span class="p-6 font-bold">KATEGORI</span>
    <hr class="ml-2 my-2 w-3/3" />
    <div class="wrapping">
      <ul v-for="item in categories" :key="item.id" class="mt-1">
        <Nuxt-link
          v-for="(val, n) in item"
          :key="n"
          :to="`/categories/${val.slug}`"
          class="wrapping__list flex items-center"
        >
          <div class="tes round-image w-8 mr-3">
            <img class="w-full" :src="val.image" :alt="val.name" />
          </div>
          <span class="text-sm">{{ val.name }}</span>
        </Nuxt-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategorySide',

  data () {
    return {
      categories: []
    }
  },

  created () {
    this.fetchCategory()
  },

  methods: {
    async fetchCategory () {
      try {
        const { data } = await this.$axios.$get('/api/categories')
        const mapCategory = []
        let items = []
        let number = 1
        for (let index = 0; index < data.length; index++) {
          items.push(data[index])
          if (number % 2 === 0) {
            mapCategory.push(items)
            items = []
          }
          number++
        }
        this.categories = mapCategory
      } catch (error) {
        console.log(error, 'error')
        throw error
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.round-image {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 20px;
}
.wrapping {
  height: 325px;
  overflow: auto;
  &__list {
    padding: 6px 5px 7px 10px;
    transition: box-shadow 0.2s;
    margin-bottom: 0.6vh;
    &:hover {
      background: #fff;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      border-radius: 2px;
    }
  }
}
</style>
