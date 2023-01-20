<template>
  <div>
    <Nuxt />
    <Preloader />
    <cs-button phone="6281119163004" />
  </div>
</template>
<script>
import * as Cookies from 'js-cookie'
import meta from '~/helpers/meta.js'
import Preloader from '~/components/Preloader.vue'
import CsButton from '~/components/CsButton.vue'
export default {
  name: 'EventLayout',

  components: {
    Preloader,
    CsButton
  },

  head () {
    return {
      title: 'Workshop Caribarang | Platform sourcing barang lokal dan luar negeri',
      meta: meta(
        'https://caribarang.id/events',
        'Workshop Caribarang | Platform sourcing barang lokal dan luar negeri',
        'Platform sourcing barang End-to-End dari China langsung dari pabrik. Dapatkan barang dagangan impor termurah dari supplier tangan pertama terbaik lewat Caribarang.id'
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
