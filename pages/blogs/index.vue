<template>
  <div v-if="isBlogs" class="-my-14">
    <SmallNewNavbar />
    <div
      class="bg-[#0E4E9B] relative w-screen h-[232px] left-1/2 -translate-x-1/2"
    >
      <div
        class="max-w-2xl md:max-w-4xl mx-auto px-4 md:px-6 lg:max-w-7xl lg:px-8 flex flex-col justify-center h-full w-full"
      >
        <SmallBreadcrumbs
          :list="[
            { name: 'Home', to: '/' },
            { name: 'Blogs', to: '' }
          ]"
          class="text-white"
        />
        <h1 class="text-4xl font-semibold text-white mt-8 mb-5">Blog</h1>
        <div class="flex flex-col md:flex-row md:justify-between gap-3">
          <div v-on-clickaway="onCloseDropdown" class="relative text-sm">
            <button
              type="button"
              class="bg-white w-60 flex justify-between rounded-md p-2 items-center text-gray-800 capitalize"
              @click="isDropdownArtikel.open = !isDropdownArtikel.open"
            >
              {{ isDropdownArtikel.select.name }}
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                :class="{ 'rotate-180': isDropdownArtikel.open }"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.08736 4.83748C3.31516 4.60967 3.68451 4.60967 3.91232 4.83748L6.99984 7.925L10.0874 4.83748C10.3152 4.60967 10.6845 4.60967 10.9123 4.83748C11.1401 5.06529 11.1401 5.43463 10.9123 5.66244L7.41232 9.16244C7.18451 9.39024 6.81516 9.39024 6.58736 9.16244L3.08736 5.66244C2.85955 5.43463 2.85955 5.06529 3.08736 4.83748Z"
                  fill="#757575"
                />
              </svg>
            </button>

            <Transition name="dropdown">
              <div
                v-if="isDropdownArtikel.open"
                class="absolute mt-2 min-w-full bg-white rounded-md shadow-md overflow-hidden"
              >
                <button
                  type="button"
                  :class="{
                    'text-primary-color': !isDropdownArtikel.select
                  }"
                  class="w-full text-left hover:bg-blue-100 p-2 capitalize"
                  @click="
                    onSelectCategory({
                      id: 0,
                      name: 'Semua Artikel',
                      slug: ''
                    })
                  "
                >
                  Semua Artikel
                </button>
                <button
                  v-for="(item, index) in isDropdownArtikel.list"
                  :key="index"
                  type="button"
                  :class="[
                    isDropdownArtikel.select
                      ? isDropdownArtikel.select.name === item.name
                        ? 'text-primary-color'
                        : null
                      : null
                  ]"
                  class="w-full text-left hover:bg-blue-100 p-2 capitalize"
                  @click.prevent="onSelectCategory(item)"
                >
                  {{ item.name }}
                </button>
              </div>
            </Transition>
          </div>
          <div class="md:w-96 bg-white rounded-md flex overflow-hidden">
            <input
              v-model="isSearch"
              type="search"
              placeholder="Masukkan kata kunci"
              class="placeholder:text-sm flex-1 border-0 text-sm"
              @keyup.enter="onSearch"
            />
            <button
              type="button"
              class="w-max flex items-center justify-center p-2 bg-gray-200 hover:bg-gray-300"
              @click="onSearch"
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18C14.866 18 18 14.866 18 11C18 7.13401 14.866 4 11 4ZM2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11C20 15.9706 15.9706 20 11 20C6.02944 20 2 15.9706 2 11Z"
                  fill="#0E4E9B"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.9428 15.9429C16.3333 15.5524 16.9665 15.5524 17.357 15.9429L21.707 20.2929C22.0975 20.6834 22.0975 21.3166 21.707 21.7071C21.3165 22.0977 20.6833 22.0977 20.2928 21.7071L15.9428 17.3571C15.5523 16.9666 15.5523 16.3334 15.9428 15.9429Z"
                  fill="#0E4E9B"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="pt-4 pb-10 h-full">
      <div
        v-if="isFirstBlog"
        class="flex flex-col bg-white rounded-md shadow-md hover:shadow-lg overflow-hidden text-sm cursor-pointer"
        @click="$router.push(`/blogs/${isFirstBlog.slug}`)"
      >
        <img
          :src="isFirstBlog.cover"
          :alt="isFirstBlog.title"
          class="w-full max-h-[452px]"
        />
        <div class="flex flex-col p-4">
          <p class="text-gray-700 text-2xl font-semibold">
            {{ isFirstBlog.title }}
          </p>
          <div class="mt-5 text-sm">
            <p>{{ isFirstBlog.author.name }}</p>
            <p class="tracking-wide text-gray-500 mt-1">
              {{ isFirstBlog.published_at }}
            </p>
          </div>
        </div>
      </div>
      <div v-if="isBlogs.length !== 0 || isFirstBlog">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          <div
            v-for="(item, index) in isBlogs"
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
        <div v-if="isShowButtonMore" class="w-full flex justify-center mt-8">
          <button
            class="bg-gray-200 text-sm py-3 px-6 rounded-lg text-gray-500 hover:bg-gray-300 capitalize"
            @click="onLoadMore"
          >
            Tampilkan Lainnya
          </button>
        </div>
      </div>
      <div v-else class="w-full flex flex-col items-center justify-center h-52">
        <p class="text-4xl font-semibold text-gray-900">Uups..</p>
        <p class="text-gray-800 mt-2">
          Artikel
          <span class="underline underline-offset-4">{{
            $route.query.search
          }}</span>
          tidak tersedia!
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway'
export default {
  name: 'BlogsIndex',
  directives: {
    onClickaway
  },
  data () {
    return {
      page: 1,
      isShowButtonMore: false,
      isSearch: this.$route.query.search || '',
      isBlogs: null,
      isFirstBlog: null,
      isDropdownArtikel: {
        open: false,
        select: {
          id: 0,
          name: 'Semua Artikel',
          slug: ''
        },
        list: null
      }
    }
  },
  async fetch () {
    await this.onFetch()
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
    async onFetch () {
      try {
        this.$store.dispatch('setLoading', true)
        // list category
        const { data } = await this.$axios.$get('/api/blog/categories')
        const callback = (params) => {
          if (params.slug === this.$route.query.category) {
            this.isDropdownArtikel.select = params
          }
        }
        data.filter(callback)
        this.isDropdownArtikel.list = data
        // eslint-disable-next-line init-declarations
        let result

        if (this.$route.query.search || this.$route.query.category) {
          result = await this.$axios.$get(
            `/api/blogs?search=${this.$route.query.search || ''}&category=${
              this.$route.query.category || ''
            }`
          )
        } else {
          result = await this.$axios.$get('/api/blogs')
        }
        if (result.meta.to === result.meta.total) {
          this.isShowButtonMore = false
        } else {
          this.isShowButtonMore = true
        }
        this.isFirstBlog = result.data[0]
        result.data.shift()
        this.isBlogs = result.data

        this.$store.dispatch('setLoading', false)
      } catch (error) {
        this.$store.dispatch('setLoading', false)
        throw error
      }
    },
    async onSearch () {
      this.$store.dispatch('setLoading', true)
      this.page = 1
      // eslint-disable-next-line init-declarations
      let result
      const getQuery = Object.assign({}, this.$route.query)
      if (this.isSearch) {
        this.$router
          .replace({
            query: {
              ...getQuery,
              search: this.isSearch
            }
          })
          .catch(() => {})
      } else {
        const { search, ...newQuery } = getQuery
        this.$router
          .replace({
            query: { ...newQuery }
          })
          .catch(() => {})
      }
      // eslint-disable-next-line prefer-const
      result = await this.$axios.$get(
        `/api/blogs?search=${this.isSearch || ''}&category=${
          this.isDropdownArtikel.select.slug
        }`
      )
      if (result.meta.to === result.meta.total) {
        this.isShowButtonMore = false
      } else {
        this.isShowButtonMore = true
      }
      this.isFirstBlog = result.data[0]
      result.data.shift()
      this.isBlogs = result.data
      this.$store.dispatch('setLoading', false)
    },
    async onSelectCategory (params) {
      try {
        this.$store.dispatch('setLoading', true)
        this.page = 1
        // eslint-disable-next-line init-declarations
        let result
        this.isDropdownArtikel.open = false
        this.isDropdownArtikel.select = params
        const getQuery = Object.assign({}, this.$route.query)
        if (params.slug) {
          this.$router
            .replace({
              query: { ...getQuery, category: params.slug }
            })
            .catch(() => {})
        } else {
          const { category, ...newQuery } = getQuery
          this.$router
            .replace({
              query: { ...newQuery }
            })
            .catch(() => {})
        }
        // eslint-disable-next-line prefer-const
        result = await this.$axios.$get(
          `/api/blogs?search=${this.isSearch || ''}&category=${
            this.isDropdownArtikel.select.slug || ''
          }`
        )
        if (result.meta.to === result.meta.total) {
          this.isShowButtonMore = false
        } else {
          this.isShowButtonMore = true
        }
        this.isFirstBlog = result.data[0]
        result.data.shift()
        this.isBlogs = result.data
        this.$store.dispatch('setLoading', false)
      } catch (error) {
        console.error(error)
      }
    },
    async onLoadMore () {
      this.$store.dispatch('setLoading', true)
      this.page = this.page + 1
      const { data, meta } = await this.$axios.$get(
        `/api/blogs?search=${this.isSearch || ''}&category=${
          this.isDropdownArtikel.select.slug
        }&page=${this.page}`
      )
      this.isBlogs.push(...data)
      if (meta.to === meta.total) {
        this.isShowButtonMore = false
      } else {
        this.isShowButtonMore = true
      }
      this.$store.dispatch('setLoading', false)
    },
    onCloseDropdown () {
      this.isDropdownArtikel.open = false
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
.dropdown-enter-active {
  animation: dropdown-in 0.2s;
}
.dropdown-leave-active {
  animation: dropdown-in 0.2s reverse;
}
@keyframes dropdown-in {
  0% {
    transform: translateY(-5px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
