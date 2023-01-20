<template>
  <div></div>
</template>

<script>
export default {
  name:'ObserverComponent',
  props:['options'],
  data: () => ({
    observer:null
  }),

  mounted () {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        this.$emit('intersect')
        this.observer.disconnect()
      }
    })

    this.observer.observe(this.$el)
  },

  destroyed () {
    this.observer.disconnect()
  }
}
</script>

<style>

</style>