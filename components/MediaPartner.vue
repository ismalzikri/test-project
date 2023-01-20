<template>
  <div
    class="bg-white relative w-screen left-1/2 -translate-x-1/2 overflow-hidden flex items-center justify-center"
  >
    <div
      class="max-w-2xl sm:max-w-4xl mx-auto py-8 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8 container"
    >
      <h2 class="text-center font-bold text-gray-600 text-[22px] mb-10">
        Diliput Oleh
      </h2>
      <div
        v-if="isMedia"
        class="grid grid-cols-2 gap-5 sm:gap-10 justify-items-center sm:flex sm:flex-wrap sm:justify-center"
      >
        <a
          v-for="(item, index) in isMedia.data"
          :key="index"
          :href="item.link"
          target="_blank"
          class="lg:grayscale hover:grayscale-0 hover:scale-105 duration-100 opacity-70 hover:opacity-100 h-[50px] max-w-[140px] sm:min-w-[192px] sm:max-w-[192px] flex items-end justify-end sm:justify-center"
        >
          <img class="h-full mx-auto" :src="item.logo" :alt="item.name" />
        </a>
      </div>
      <hr class="w-40 mx-auto mt-14 border-b-[1px] border border-gray-200" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'MediaPartner',
  data () {
    return {
      isMedia: null
    }
  },
  async fetch () {
    this.isMedia = await this.$store.dispatch(
      'media-partners/mediaPartnersList'
    )
  }
}
</script>
