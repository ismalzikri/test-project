<template>
  <div class="wrap-list block lg:hidden">
    <div class="wrap-list__list">
      <Nuxt-link
        v-for="item in categories"
        :key="item.id"
        class="wrap-list__list-image"
        :to="`/categories/${item.slug}`"
      >
        <figure class="wrap-list__list-image__icon">
          <img :src="item.image" :alt="item.name" />
        </figure>
        <p class="item-name">{{ item.name }}</p>
      </Nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      categories: []
    }
  },

  created () {
    this.fetchCategory()
  },

  methods: {
    async fetchCategory () {
      try {
        const { data } = await this.$axios.$get('/api/categories')
        this.categories = data
      } catch (error) {
        console.log(error, 'error')
        throw error
      }
    }
  }
}
</script>

<style lang="scss">
.wrap-list {
  @mixin respond($breakpoint) {
    @if ($breakpoint ==small) {
      @media (min-width: 393px) {
        @content;
      }
    }

    @if ($breakpoint ==medium) {
      @media (min-width: 768px) {
        @content;
      }
    }

    @if ($breakpoint ==large) {
      @media (min-width: 1024px) {
        @content;
      }
    }
  }

  max-width: 100%;
  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow: auto hidden;
  margin: 8px 0px;

  @include respond(medium) {
    max-width: 98%;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  &__list {
    display: flex;
    align-items: flex-start;
    -webkit-box-pack: justify;
    justify-content: space-between;
    padding-left: 16px;

    &-image {
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      flex-flow: column;
      margin-right: 3.2%;

      @include respond(small) {
        margin-right: 4.8%;
      }

      @include respond(medium) {
        margin-right: 6px;
      }

      &__icon {
        margin-bottom: 4px;
        display: flex;
        -webkit-box-align: center;
        justify-content: center;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.05);
        width: 45px;
        height: 45px;

        & img {
          width: 65%;
          object-fit: contain;
        }
      }

      & p {
        color: #31353b;
        margin: 0px;
        max-width: 63px;
        font-size: 0.714286rem;
        text-align: center;
        line-height: 14px;
        width: 63px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>
