<template>
  <div>
    <Nuxt/>
    <Preloader/>
    <cs-button phone="6281119163004"/>
  </div>
</template>
<script>
import * as Cookies from 'js-cookie'
import Preloader from '~/components/Preloader.vue'
import CsButton from '~/components/CsButton.vue'
export default {
  name:'FaqLayout',

  components:{
    Preloader,
    CsButton
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
      if (utmSource && utmCampaign && utmMedium) {
        Cookies.set('utm_source', utmSource, {expires: 30})
        Cookies.set('utm_campaign', utmCampaign, {expires: 30})
        Cookies.set('utm_medium', utmMedium, {expires: 30})
      }
    }
  }
}
</script>
