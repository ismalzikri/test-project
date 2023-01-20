<template>
  <div class="relative rounded-2xl px-2 py-10 bg-main overflow-hidden shadow-xl">
    <div class="relative">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
          Dapatkan semua produk 1688 disini
        </h2>
        <p class="mt-6 mx-auto max-w-2xl text-lg text-indigo-200">Copy link produk detail 1688 di sini, dan tekan "Lihat
          Produk" untuk mendapatkan info produk</p>
      </div>
      <form class="mt-12 sm:mx-auto sm:max-w-lg flex flex-col" @submit.prevent="onSubmit">
        <div class="min-w-0 flex-1">
          <label for="cta-email" class="sr-only">Produk link atau ID produk</label>
          <input
            v-model="link" type="text"
            class="block w-full border border-transparent rounded-md px-5 py-3 text-sm text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
            placeholder="https://detail.1688.com/offer/633039326813.html">
        </div>
        <div class="mt-4 mx-auto">
          <button
            type="submit"
            class="block  rounded-md border border-transparent px-5 py-3 bg-green-600 text-base font-medium text-white shadow hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:px-10">Lihat
            Produk</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CopyLink',

  data () {
    return {
      link: ''
    }
  },

  methods: {
    onSubmit () {
      if (!this.link) return
      const url = this.link.split('/')
      let productId = ''
      if (url.length > 3) {
        const l = url[4].split('.html')
        productId = l[0]
      } else {
        productId = this.link
      }
      return this.fetchLink(productId)
    },

    async fetchLink (productId) {
      try {
        this.$store.dispatch('setLoading', true)
        const { status, message } = await this.$axios.$get(`${this.$config.productDetailHost}/api/product/${productId}?copy=true`)
        this.$store.dispatch('setLoading', false)
        if (status) {
          return window.location.replace(`/products/${message}`)
        }
      } catch (error) {
        this.$store.dispatch('setLoading', false)
        throw error
      }
    }
  }
}
</script>
