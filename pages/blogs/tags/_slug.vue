<template>
  <div class="-my-14">
    <SmallNewNavbar />
    <div
      class="bg-[#0E4E9B] relative w-screen h-[150px] md:h-[232px] left-1/2 -translate-x-1/2"
    >
      <div
        class="max-w-2xl md:max-w-4xl mx-auto px-4 md:px-6 lg:max-w-7xl lg:px-8 flex flex-col justify-center h-full w-full"
      >
        <SmallBreadcrumbs
          :list="[
            { name: 'Home', to: '/' },
            { name: 'Blogs', to: '/blogs' },
            { name: 'Tags', to: '' }
          ]"
          class="text-white"
        />
        <p class="text-4xl font-semibold text-white mt-8 mb-5">Tags</p>
      </div>
    </div>
    <div
      v-if="isTags"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 pb-10"
    >
      <div
        v-for="(item, index) in isTags"
        :key="index"
        class="flex flex-col bg-white rounded-md shadow-md hover:shadow-lg overflow-hidden text-sm cursor-pointer"
        @click="$router.push(`/blogs/${item.slug}`)"
      >
        <img
          :src="item.cover"
          :alt="item.title"
          class="w-full h-full xl:h-52 xl:max-h-52"
        />
        <div class="flex flex-col p-4">
          <p class="text-gray-700 text-lg font-semibold line h-14">
            {{ item.title }}
          </p>
          <div class="mt-5 text-sm">
            <p>{{ item.author.name }}</p>
            <p class="tracking-wide text-gray-500 mt-1">
              {{ item.published_at }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TagsPage',
  data () {
    return {
      isTags: null
    }
  },
  async fetch () {
    await this.onGetData()
  },
  head () {
    return {
      title: 'Blogs | caribarang.id',
      link: [
        {
          rel: 'canonical',
          href: `https://caribarang.id${this.$route.path}`
        }
      ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Blog caribarang.id'
        }
      ]
    }
  },
  methods: {
    async onGetData () {
      this.$store.dispatch('setLoading', true)
      const { data } = await this.$axios.$get(
        `/api/blog/tags/${this.$route.params.slug}`
      )
      this.isTags = data.blogs
      this.$store.dispatch('setLoading', false)
    }
  }
}
</script>
