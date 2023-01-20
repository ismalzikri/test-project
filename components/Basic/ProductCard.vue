<template>
  <nuxt-link :to="link" :target="target" class="group bg-white mb-5 shadow-sm">
    <div
      class="w-full aspect-w-1 aspect-h-1 bg-gray-200 overflow-hidden xl:aspect-w-7 xl:aspect-h-8"
    >
      <img
        :src="image"
        :alt="name"
        class="w-full h-full object-center object-cover group-hover:opacity-75"
      />
    </div>
    <div class="px-2 py-2 w-full">
      <h3 class="text-xs truncate text-gray-500 group-hover:text-indigo-600">
        {{ name }}
      </h3>
      <p class="py-2 text-sm font-medium text-blue-800 text-left">
        Rp {{ price | formatPrice }}
      </p>
      <div
        class="w-full border-t py-2 border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-2"
      >
        <p class="text-xs font-medium text-gray-400 capitalize text-left">
          {{ seller }}
        </p>
        <p
          class="text-xs font-medium text-gray-400 capitalize text-left sm:text-right"
        >
          Min order {{ moq }}
        </p>
      </div>
    </div>
  </nuxt-link>
</template>
<script>
export default {
  name: 'ProductCard',

  props: {
    name: {
      type: String,
      default: ''
    },

    moq: {
      type: [String, Number],
      default: 1
    },

    seller: {
      type: String,
      default: ''
    },

    image: {
      type: String,
      default:
        'https://cbu01.alicdn.com/img/ibank/2020/782/823/16756328287_499955907.200x200.jpg'
    },

    price: {
      type: [String, Number],
      default: 0
    },

    link: {
      type: String,
      default: ''
    },
    target: {
      type: String,
      default: '_blank'
    }
  }
}
</script>
