<template>
  <div
    v-show="$store.getters.loading" id="preloader"
    class="preloader fixed top-0 left-0 flex items-center justify-center w-full h-full">
    <div class="flex justify-center items-center space-x-1 text-base text-white">
      <img class="h-10 w-10" src="/img/preloader.gif" alt="preloader caribarang">
      <div>Loading ...</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PreloaderComponent'
}
</script>
<style lang="scss" scoped>
#preloader {
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10000;
}
</style>
