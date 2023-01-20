<template>
  <div class="bg-gray-100">
    <main class="bg-main">
      <div class="max-w-2xl mx-auto py-8 px-4 sm:py-14 sm:px-6 lg:max-w-7xl lg:px-8">
        <Nuxt/>
      </div>
    </main>
    <SimpleFooter/>
    <Preloader/>
    <cs-button phone="6281119163004" />
  </div>
</template>
<script>
import Preloader from '../components/Preloader.vue'
import CsButton from '~/components/CsButton.vue'
export default {
  name:'AuthLayout',

  components:{
    Preloader,
    CsButton
  }
}
</script>
