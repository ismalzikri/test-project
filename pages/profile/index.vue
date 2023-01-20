<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-4 md:gap-5">
      <parent-template />
      <div class="bg-white shadow-sm rounded-md py-4 px-5 col-span-3">
        <profil-detail
          v-if="menu == 1"
          :user="user"
          :marking-code="marking_code"
        />
        <preferences v-if="menu == 2" />
        <card-identity v-if="menu == 3" label="KTP" />
        <card-identity v-if="menu == 4" label="NPWP" />
      </div>
    </div>
  </div>
</template>
<script>
import CardIdentity from '~/components/Profile/CardIdentity.vue'
import ProfilDetail from '~/components/Profile/Detail.vue'
import ParentTemplate from '~/components/Profile/ParentTemplate.vue'
import Preferences from '~/components/Profile/Preferences.vue'
export default {
  name: 'ProfilePage',

  components: { ProfilDetail, Preferences, CardIdentity, ParentTemplate },

  middleware: ['islogged'],

  data () {
    return {
      menu: 1,
      user: null,
      marking_code: []
    }
  },

  created () {
    this.initMenu()
  },

  mounted () {
    this.fetchUser()
  },

  methods: {
    initMenu () {
      const hash = this.$route.hash
      if (hash) {
        if (hash === '#ktp') {
          this.menu = 3
        } else if (hash === '#npwp') {
          this.menu = 4
        } else if (hash === '#preferences') {
          this.menu = 2
        } else if (hash === '#detail') {
          this.menu = 1
        }
      }
    },

    async fetchUser () {
      try {
        this.$store.dispatch('setLoading', true)
        const { data } = await this.$axios.$get('/api/me')
        this.$store.dispatch('setLoading', false)
        this.user = data
        this.marking_code = data.marking_code
      } catch (error) {
        this.$store.dispatch('setLoading', false)
        console.log(error.message)
      }
    }
  }
}
</script>
