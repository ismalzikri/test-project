<template>
  <div class="lg:grid lg:grid-cols-12 lg:gap-8">
    <auth-content></auth-content>
    <sign-component
      :error-message="errorMessage"
      @submit="onSubmit"
    ></sign-component>
  </div>
</template>
<script>
import * as Cookies from 'js-cookie'
import { mapActions } from 'vuex'
import meta from '~/helpers/meta.js'
import AuthContent from '~/components/auth/AuthContent.vue'
import SignComponent from '~/components/auth/SignComponent.vue'
export default {
  name: 'SignPage',

  components: {
    SignComponent,
    AuthContent
  },

  layout: 'auth',

  middleware: ['guest'],

  data () {
    return {
      errorMessage: ''
    }
  },

  head () {
    return {
      title: 'Sign in | Caribarang',
      meta: meta(
        'https://caribarang.id/signin',
        'Sign in | Caribarang',
        'Silahkan login menggunakan akun caribarang anda dan Dapatkan barang dagangan impor termurah dari supplier tangan pertama terbaik lewat Caribarang.id'
      )
    }
  },

  methods: {
    ...mapActions({
      setCart: 'setCart',
      setCartTotal: 'setCartTotal',
      setWishlist: 'setWishlist',
      setwishlistsTotal: 'setwishlistsTotal'
    }),

    async onSubmit (params) {
      try {
        this.$store.dispatch('setLoading', true)
        this.errorMessage = ''
        const post = await this.$auth.loginWith('local', {
          data: {
            email: params.email,
            password: params.password
          }
        })
        this.$store.dispatch('setLoading', false)

        if (post.data.message === 'Credentials not match') {
          this.errorMessage = post.data.message
          return
        } else if (post.data.message === 'Account not verified') {
          Cookies.set('email_verified', params.email)
          return this.$router.push('/auth/email-verification?resend=true')
        }
        await this.fetchCart()
        await this.fetchWishlists()
        return this.$router.push('/')
      } catch (error) {
        this.$store.dispatch('setLoading', false)
        throw error
      }
    },

    async fetchCart () {
      try {
        const { data, meta } = await this.$axios.$get('/api/carts?paging=3')
        this.setCart(data)
        this.setCartTotal(meta.total)
      } catch (error) {
        console.log(error)
      }
    },

    async fetchWishlists () {
      try {
        const { data, meta } = await this.$axios.$get('/api/wishlists?limit=3')
        this.setWishlist(data)
        this.setwishlistsTotal(meta.total)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
