<template>
  <div v-show="open" class="fixed inset-0 flex z-40 lg:hidden" role="dialog" aria-modal="true">
    <transition
      enter-active-class="transition-opacity ease-linear duration-300" enter-class="opacity-0"
      enter-to-class="opacity-100" leave-active-class="transition-opacity ease-linear duration-300"
      leave-class="opacity-100" leave-to-class="opacity-0">
      <div class="fixed inset-0 bg-black bg-opacity-25" aria-hidden="true"></div>
    </transition>

    <transition
      enter-active-class="transition ease-in-out duration-300 transform" enter-class="translate-x-full"
      enter-to-class="translate-x-0" leave-active-class="transition ease-in-out duration-300 transform"
      leave-class="translate-x-0" leave-to-class="translate-x-full">
      <div class="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-6 flex flex-col overflow-y-auto">
        <div class="px-4 flex items-center justify-between">
          <h2 class="text-lg font-medium text-gray-900">Filters</h2>
          <button
            type="button"
            class="-mr-2 w-10 h-10 p-2 flex items-center justify-center text-gray-400 hover:text-gray-500"
            @click="$emit('close')">
            <span class="sr-only">Close menu</span>
            <!-- Heroicon name: outline/x -->
            <svg
              class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Filters -->
        <form class="mt-4">
          <div class="border-t border-gray-200 pt-4 pb-4">
            <fieldset>
              <legend class="w-full px-2">
                <button
                  type="button"
                  class="w-full p-2 flex items-center justify-between text-gray-400 hover:text-gray-500"
                  aria-controls="filter-section-1" aria-expanded="true">
                  <span class="text-sm font-medium text-gray-900"> Kategori Terkait </span>
                  <span class="ml-6 h-7 flex items-center">

                    <svg
                      class="rotate-0 h-5 w-5 transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                      fill="currentColor" aria-hidden="true">
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                    </svg>
                  </span>
                </button>
              </legend>
              <div id="filter-section-1" class="pt-4 pb-2 px-4">
                <div class="space-y-6">
                  <div v-for="item in category" :key="item.id" class="flex items-center">
                    <input
                      name="category[]" :value="item.id" type="checkbox"
                      class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                      @change="onSetCategory">
                    <label for="category-0-mobile" class="ml-3 text-sm text-gray-500"> {{ item.name }} </label>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </form>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'MobileFilter',

  props: {
    open: {
      type: Boolean,
      default: false
    },

    category: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    onSetCategory (e) {
      this.$emit('onSelected', e)
    }
  }
}
</script>
