<template>
  <div class="bg-gray-100 overflow-x-hidden min-h-screen">
    <navbar-tab-menu v-if="$route.name !== 'help-order' && $route.name !== 'blogs' && $route.name !== 'blogs-id' && $route.name !== 'blogs-tags-slug'" class="z-10" />
    <div
      class="z-0 max-w-2xl sm:max-w-4xl mx-auto py-8 px-4 sm:py-14 sm:px-6 lg:max-w-7xl lg:px-8"
    >
      <BreadCrumb v-if="!where" />
      <Nuxt />
    </div>
    <MediaPartner
      v-if="
        ($route.path === '/' && $route.query.product !== 'local') ||
          $route.path === '/about-us'
      "
    />
    <SimpleFooter v-if="$route.query.product !== 'local'" />
    <Preloader />
    <cs-button v-if="$route.name !='promoimlek'" phone="6281119163004" />
  </div>
</template>
<script>
import * as Cookies from 'js-cookie'
import Preloader from '~/components/Preloader.vue'
import CsButton from '~/components/CsButton.vue'
import BreadCrumb from '~/components/BreadCrumbs.vue'
import NavbarTabMenu from '~/components/Navbar/NavbarTabMenu.vue'
export default {
  name: 'MainLayout',
  components: {
    Preloader,
    CsButton,
    BreadCrumb,
    NavbarTabMenu
  },

  computed: {
    where () {
      return [
        'index',
        'about-us',
        'products-id',
        'event',
        'products-christmas-product-recommend',
        'products-chinese-new-year',
        'help-order',
        'products-supplier-id',
        'blogs',
        'blogs-id',
        'blogs-tags-slug',
        'campaign-paket-usaha-lebaran-slug',
        'promoimlek'
      ].includes(this.$route.name)
    },
    showNavbar () {
      return ['help-order', 'blogs', 'blogs-id', 'blogs-tags-slug'].includes(
        this.$route.name
      )
    }
  },

  mounted () {
    this.fetchUtm()
  },

  methods: {
    fetchUtm () {
      const lastUrl = window.location.href
      const url = new URL(lastUrl)
      const utmSource = url.searchParams.get('utm_source')
      const utmCampaign = url.searchParams.get('utm_campaign')
      const utmMedium = url.searchParams.get('utm_medium')
      if (utmSource) {
        Cookies.set('utm_source', utmSource, { expires: 30 })
        Cookies.set('utm_campaign', utmCampaign, { expires: 30 })
        Cookies.set('utm_medium', utmMedium, { expires: 30 })
      }
    }
  }
}
</script>
