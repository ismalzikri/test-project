<template>
  <div v-if="breadcrumbs.length > 0" class="pb-3 sm:-mt-8">
    <nav class="flex justify-start items-center" aria-label="Breadcrumb">
      <ol role="list" class="flex items-center space-x-1">
        <li>
          <div class="flex items-center">
            <nuxt-link
              to="/"
              class="ml-1 text-xs sm:text-sm text-primary-color/90 hover:text-primary-color-hover capitalize">Home</nuxt-link>
          </div>
        </li>
        <li v-for="(breadcrumb, index) in breadcrumbs" :key="index">
          <div v-if="breadcrumb.title !== ''" class="flex items-center">
            <i class="fas fa-angle-right flex-shrink-0 text-gray-400 text-sm m-1"></i>
            <nuxt-link
              :class="{
                'text-primary-color/90 hover:text-primary-color-hover':
                  index !== breadcrumbs.length - 1
              }" :to="breadcrumb.path" class="ml-1 text-xs sm:text-sm text-gray-500 hover:text-gray-700 capitalize">{{
              breadcrumb.title | readmore
            }}</nuxt-link>
          </div>
        </li>
      </ol>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'BreadCrumb',

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
  }
}
</script>
