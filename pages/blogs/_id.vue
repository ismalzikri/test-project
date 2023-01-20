<template>
  <div v-if="isData" class="-my-14">
    <SmallNewNavbar />
    <div class="bg-[#0E4E9B] relative w-screen py-10 left-1/2 -translate-x-1/2">
      <div
        class="max-w-2xl md:max-w-4xl mx-auto px-4 md:px-6 lg:max-w-7xl lg:px-8 flex flex-col md:flex-row md:items-center h-full w-full text-sm gap-2"
      >
        <SmallBreadcrumbs
          :list="[
            { name: 'Home', to: '/' },
            { name: 'Blogs', to: '/blogs' },
            { name: `${isData.blog.title}`, to: '' }
          ]"
          class="text-white"
        />
      </div>
    </div>
    <div class="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-7 py-5">
      <div class="md:col-span-8 bg-white p-4 rounded-lg">
        <h1 class="text-gray-900 font-bold text-2xl">
          {{ isData.blog.title }}
        </h1>
        <p class="mt-3 mb-2 text-sm opacity-70">
          {{ isData.blog.published_at }}
        </p>
        <div class="aspect-w-16 aspect-h-9 flex">
          <img
            class="rounded-lg"
            :src="isData.blog.cover"
            :alt="isData.blog.title"
            width="586"
            height="331"
          />
        </div>
        <div class="py-5">
          <div v-html="isData.blog.content" />
        </div>
        <div class="flex flex-col md:flex-row text-sm gap-2">
          <button
            v-for="(item, index) in isData.blog.tags"
            :key="index"
            class="bg-[#DAECFF] py-1 px-4 text-primary-color rounded-full capitalize flex items-center gap-1 w-max hover:bg-blue-200"
            type="button"
            @click="$router.push(`/blogs/tags/${item.slug}`)"
          >
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              class="w-5 h-5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.5 2C1.5 1.44772 1.94772 1 2.5 1H12.5C12.7652 1 13.0196 1.10536 13.2071 1.29289L21.7992 9.885C22.358 10.4471 22.6716 11.2074 22.6716 12C22.6716 12.7926 22.358 13.5529 21.7992 14.115L21.7971 14.1171L14.6275 21.2867C14.6274 21.2868 14.6276 21.2866 14.6275 21.2867C14.349 21.5655 14.0178 21.787 13.6538 21.9379C13.2896 22.0889 12.8992 22.1666 12.505 22.1666C12.1108 22.1666 11.7204 22.0889 11.3562 21.9379C10.9921 21.787 10.6613 21.5658 10.3827 21.2869C10.3826 21.2869 10.3828 21.287 10.3827 21.2869L1.79331 12.7075C1.60552 12.5199 1.5 12.2654 1.5 12V2ZM3.5 3V11.5854L11.7967 19.8725L11.7975 19.8733C11.8904 19.9663 12.0007 20.04 12.1221 20.0903C12.2435 20.1407 12.3736 20.1666 12.505 20.1666C12.6364 20.1666 12.7665 20.1407 12.8879 20.0903C13.0093 20.04 13.1196 19.9663 13.2125 19.8733L20.3808 12.705C20.3811 12.7047 20.3814 12.7044 20.3817 12.7041C20.5674 12.5168 20.6716 12.2638 20.6716 12C20.6716 11.7362 20.5674 11.4832 20.3817 11.2959C20.3814 11.2956 20.3811 11.2953 20.3808 11.295L12.0858 3H3.5ZM6.5 7C6.5 6.44772 6.94772 6 7.5 6H7.51C8.06228 6 8.51 6.44772 8.51 7C8.51 7.55228 8.06228 8 7.51 8H7.5C6.94772 8 6.5 7.55228 6.5 7Z"
                fill="#0E4E9B"
              />
            </svg>

            {{ item.name }}
          </button>
        </div>
      </div>
      <div class="md:col-span-4 bg-white rounded-lg h-max overflow-hidden">
        <p class="font-semibold text-lg px-4 py-2">Baca Artikel Terbaru</p>
        <div class="grid grid-cols-1 divide-y divide-gray-300">
          <NuxtLink
            v-for="(item, index) in isNewArticle"
            :key="index"
            :to="`/blogs/${item.slug}`"
            class="flex text-sm py-3 hover:bg-blue-50 px-4"
          >
            <div
              class="bg-cover bg-center w-12 h-12"
              :alt="item.title"
              :style="`background-image: url(${item.cover})`"
            ></div>

            <p class="font-semibold line opacity-80 py-1 flex-1 ml-2">
              {{ item.title }}
            </p>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="border-b border-gray-300 mb-5"></div>
    <div class="pb-10">
      <p class="font-semibold text-lg mb-3">Baca Artikel Lainnya</p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div
          v-for="(item, index) in isData.relateds"
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
  </div>
</template>
<script>
export default {
  name: 'BlogsDetail',

  data () {
    return {
      isData: null,
      isNewArticle: null,
      isMetaTitle: null,
      isMetaDescription: null
    }
  },
  async fetch () {
    await this.onGetData()
  },
  head () {
    return {
      title: `${this.isMetaTitle} | caribarang.id`,
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
          content: `Blog caribarang.id ${this.isMetaDescription}`
        }
      ]
    }
  },
  methods: {
    async onGetData () {
      this.$store.dispatch('setLoading', true)
      const { data } = await this.$axios.$get(
        `/api/blogs/${this.$route.params.id}`
      )
      this.isData = data
      this.isMetaTitle = data.blog.meta_title
      this.isMetaDescription = data.blog.meta_description
      const result = await this.$axios.$get('/api/blogs/related')
      this.isNewArticle = result.data
      this.$store.dispatch('setLoading', false)
    }
  }
}
</script>

<style scoped>
.line {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
