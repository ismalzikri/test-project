<template>
  <div class="w-full pr-1 sm:px-0 sm:w-10/12 mx-auto py-4">
    <form class="flex rounded-md shadow-sm" @submit.prevent="onSubmit">
      <div class="relative flex items-stretch flex-grow focus-within:z-10">
        <div
          v-on-clickaway="close"
          class="widget-select absolute flex justify-center items-center p-2 md:p-5 lg:p-5 inset-y-0 cursor-pointer"
          @click="ChooseType">
          <span class="mr-1 text-sm md:text-base md:mr-2">{{ choose }}</span>
          <i class="arrow down"></i>
        </div>
        <div v-if="select" class="widget-select__down">
          <div class="flex flex-col">
            <span
              v-for="option in options" :key="option" class="text-gray-400 cursor-pointer"
              @mousedown="SelectOption(option)">
              {{ option }}
            </span>
          </div>
        </div>
        <input
          v-model="keyword" type="text"
          class="placeholder:text-xs lg:placeholder:text-base focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md py-2  sm:py-3.5 sm:text-sm border-gray-300"
          :placeholder="choose === 'Keyword' ? 'Sepeda anak' : 'https://detail.1688.com/offer/633039326813.html'">
      </div>
      <button
        type="submit"
        class="-ml-px relative inline-flex items-center space-x-2 p-3 md:px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-white bg-lightBlue-600 hover:bg-lightBlue-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
        <i class="fas fa-search"></i>
        <span class="hidden md:block">Cari</span>
      </button>
    </form>
  </div>
</template>
<script>
import { directive as onClickaway } from 'vue-clickaway'
export default {
  name: 'SearchWidget',

  directives: {
    onClickaway
  },

  data () {
    return {
      keyword: '',
      options: ['Keyword', '1688.com'],
      choose: 'Keyword',
      select: false
    }
  },

  methods: {

    ChooseType () {
      this.select = !this.select
    },

    SelectOption (selected) {
      if (selected) {
        this.choose = selected
        this.select = false
      }
    },

    close () {
      this.select = false
    },

    onSubmit () {
      if (!this.keyword.length) return

      const url = this.keyword.split('/')
      let productId = ''

      if (url.length > 3) {
        const spread = url[4].split('.html')
        productId = spread[0]
      } else {
        productId = this.link
      }

      if (this.choose === '1688.com') {
        return this.fetchLink(productId)
      } else {
        return window.location.replace(`/search?keyword=${encodeURIComponent(this.keyword)}`)
      }

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
        console.log(error)
        throw error
      }
    }

  }

}
</script>

<style lang="scss" scoped>
@mixin respond($breakpoint) {
  @if($breakpoint ==medium) {
    @media (min-width: 768px) {
      @content
    }
  }

  @if($breakpoint ==large) {
    @media (min-width: 1024px) {
      @content
    }
  }
}

form {
  margin-top: -20px;
}

.widget-select {
  border-right: 1px solid #e6e6e6;
  user-select: none;
}

.widget-select__down {
  position: absolute;
  top: 48px;
  z-index: 1;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  background-color: #fff;

  @include respond(medium) {
    top: 53px;
  }

  & span {
    padding: 5px 18px 5px 8px;
    font-size: 14px;

    @include respond(medium) {
      padding: 5px 35px 5px 20px;
      font-size: 16px;
    }

    @include respond(large) {
      font-size: inherit;
    }

    &:hover {
      color: #fff;
      --tw-bg-opacity: 1;
      background-color: rgba(2, 132, 199, var(--tw-bg-opacity));
    }
  }

}

.arrow {
  border: solid grey;
  border-width: 0 2.2px 2.2px 0;
  display: inline-block;
  padding: 2.7px;

  &.down {
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }
}

input {
  padding-left: 6.5rem;

  @include respond(medium) {
    padding-left: 9rem;
  }
}

input::placeholder {
  font-size: 14px;

  @include respond(medium) {
    font-size: inherit;
  }
}
</style>
