<template>
  <div class="w-full md:w-1/2 mx-auto text-center">
    <div class="text-9xl font-bold text-lightBlue-600">{{error.statusCode}}</div>
    <div v-if="error.statusCode === 500" class="font-semibold text-2xl">{{'Some things went wrong'}}</div>
    <div v-if="error.statusCode === 404" class="font-semibold text-2xl">The page you are looking under development</div>
    <div v-else>An error occurred</div>
    <nuxt-link to="/" class="text-sm text-gray-400 font-medium hover:text-gray-900">Home page</nuxt-link>
  </div>
</template>
<script>
export default {
  name:'ErrorPage',

  layout: 'main',

  props: {
    error:{
      type:Object,
      default:() => null
    }
  } // you can set a custom layout for the error page
}
</script>
