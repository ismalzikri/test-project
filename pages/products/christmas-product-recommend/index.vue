<template>
  <div>
    <div class="pb-3 sm:-mt-8">
      <SmallBreadcrumbs
        :list="[
          { name: 'Home', to: '/' },
          { name: 'Products', to: '/products' },
          { name: 'Christmas Product Recommendation', to: '' }
        ]"
        class="text-primary-color/90"
      />
    </div>
    <MediumChristmas-product-recommendSection1 />
    <MediumChristmas-product-recommendSection2 />
  </div>
</template>

<script>
export default {
  name: 'ChristmasProduct',
  data () {
    return {
      isBreadcrumbHover: false
    }
  }
}
</script>
