<template>
  <div>
    <div class="pb-3 sm:-mt-8">
      <SmallBreadcrumbs
        :list="[
          { name: 'Home', to: '/' },
          { name: 'Products', to: '/products' },
          { name: 'Chinese New Year', to: '' },
        ]"
        class="text-primary-color/90"
      />
    </div>
    <MediumChinese-new-yearSectionHome />
    <MediumChinese-new-yearSectionList />
  </div>
</template>

<script>
export default {
  name: 'ChineseNewYearProducts',

  data () {
    return {
      isBreadcrumbHover: false
    }
  }
}
</script>
