<template>
  <div class="w-full h-60">
    <p class="text-center">Mohon menunggu sebentar, anda akan diarahkan ke halaman beranda...</p>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import * as Cookies from 'js-cookie'
export default {

  name:'CallbackPage',

  head () {
    return {
      title: 'Callback page | Caribarang'
    }
  },

  computed:{
    ...mapState({
      isLogin:state => state.auth.loggedIn,
      user:state => state.auth.user
    })
  },

  mounted () {
    this.fetchUser()
  },

  methods:{
    async fetchUser () {
      try {
        if (this.isLogin) {
          Cookies.remove('access_token')
          Cookies.remove('auth._token.local')
          Cookies.remove('auth._token_expiration.local')
          Cookies.remove('auth.strategy')
          Cookies.remove('email_verified')
          Cookies.remove('vuex')
        }
        const query = this.$route.query
        if (typeof query.token === 'undefined') return this.$nuxt.error({ statusCode: 500, message: 'Invalid credentials' })
        const utmSource = Cookies.get('utm_source') ? Cookies.get('utm_source') : ''
        const utmCampaign = Cookies.get('utm_source') ? Cookies.get('utm_source') : ''
        const utmMedium = Cookies.get('utm_source') ? Cookies.get('utm_source') : ''
        const {data} = await this.$axios.get(`/api/me?utm_source=${utmSource}&utm_campaign=${utmCampaign}&utm_medium=${utmMedium}`, {headers:{
          'Authorization':`Bearer ${ query.token}`
        }})

        this.$auth.setUser(data)
        this.$auth.setUserToken(query.token)
        if (data.phone === '' || !data.phone || data.phone === null) {
          window.location.replace('/profile/edit')
        } else {
          this.$router.push('/')
        }
      } catch (error) {
        console.log(error.message)
        throw error
      }
    }
  }
}
</script>
