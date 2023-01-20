<template>
  <div>
    <nav
      class="flex justify-start items-center pb-3 sm:-mt-8"
      aria-label="Breadcrumb"
    >
      <ol role="list" class="flex items-center space-x-1">
        <li>
          <div class="flex items-center">
            <nuxt-link
              to="/"
              class="ml-1 text-xs sm:text-sm text-primary-color/90 hover:text-primary-color-hover capitalize"
            >Home</nuxt-link
            >
          </div>
        </li>
        <li v-for="(breadcrumb, index) in breadcrumbs" :key="index">
          <div v-if="breadcrumb.title !== ''" class="flex items-center">
            <i
              class="fas fa-angle-right flex-shrink-0 text-gray-400 text-sm m-1"
            ></i>
            <nuxt-link
              :class="{
                'text-primary-color/90 hover:text-primary-color-hover ':
                  index !== breadcrumbs.length - 1,
                'truncate w-[250px] hover:w-full text-gray-500  cursor-text':
                  index === breadcrumbs.length - 1,
              }"
              :to="breadcrumb.title == 'categories' ? '' : breadcrumb.path"
              class="ml-1 text-xs sm:text-sm capitalize whitespace-nowrap"
              @mouseenter="isBreadcrumbHover = true"
            >{{
              index !== breadcrumbs.length - 1
                ? breadcrumb.title
                : $route.params.slug.replace(/-/g, ' ')
            }}</nuxt-link
            >
          </div>
        </li>
      </ol>
    </nav>
    <div v-if="list">
      <img
        :src="list.banner"
        alt="banner"
        class="w-full rounded-[20px] lg:rounded-[40px] mb-16"
      />
      <div class="flex flex-col lg:flex-row justify-center items-end gap-14">
        <div
          v-for="(item, index) in list.assets"
          :key="index"
          class="flex flex-col items-center justify-center gap-6"
        >
          <img :src="item.image" :alt="item.package" />
          <button
            class="py-3 px-6 text-[#086DE3] border rounded-xl border-[#086DE3] hover:bg-[#086DE3] hover:text-white"
            @click="
              $router.push({
                path: `/campaign/paket-usaha-lebaran/sepatu/${item.package}`,
                replace: true,
              })
            "
          >
            Beli Sekarang
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CampaignPackageList',

  data () {
    return {
      list: null
    }
  },

  computed: {
    breadcrumbs () {
      const fullPath = this.$route.path
      const params = fullPath.startsWith('/') ? fullPath.substring(1).split('/') : fullPath.split('/')
      const breadcrumbs = []
      let path = ''
      params.forEach((param, index) => {
        path = `${path}/${param}`
        const match = this.$router.match(path)
        if (match.name !== null) {
          breadcrumbs.push({
            title: param.replace(/-/g, ' '),
            ...match
          })
        }
      })
      return breadcrumbs
    }
  },
  mounted () {
    this.getList()
  },

  methods: {
    async getList () {
      try {
        const resp = await this.$axios.get(
          `api/business/package/tier/paket-usaha-lebaran/assets/${this.$route.params.slug}`
        )
        this.list = resp.data
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
