<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-4 md:gap-5">
      <parent-template />
      <div class="bg-white shadow-sm rounded-md py-4 px-5 col-span-3">
        <preferences v-if="slug == 'preferences'" />
        <card-identity
          v-if="slug == 'ktp'"
          label="KTP"
          :identity="identity"
          @setIdentity="setIdentity"
        />
        <edit-profil v-if="slug == 'edit'"/>
        <change-password v-if="slug == 'change-password'" />
      </div>
    </div>
  </div>
</template>
<script>
import CardIdentity from '~/components/Profile/CardIdentity.vue'
import Preferences from '~/components/Profile/Preferences.vue'
import ParentTemplate from '~/components/Profile/ParentTemplate.vue'
import EditProfil from '~/components/Profile/EditProfil.vue'
import ChangePassword from '~/components/Profile/ChangePassword.vue'

export default {
  name: 'ProfilePage',

  components: {
    Preferences,
    CardIdentity,
    ParentTemplate,
    EditProfil,
    ChangePassword
  },

  middleware: ['islogged'],

  data () {
    return {
      slug: '',
      identity: null
    }
  },

  created () {
    this.initMenu()
    this.fetchUser()
  },

  methods: {
    initMenu () {
      const slug = this.$route.params.slug
      if (slug) {
        this.slug = slug
      }
    },

    async fetchUser () {
      try {
        this.$store.dispatch('setLoading', true)
        const { data } = await this.$axios.$get('/api/me')
        this.$store.dispatch('setLoading', false)
        this.identity = data.identity
      } catch (error) {
        this.$store.dispatch('setLoading', false)
        throw error
      }
    },

    setIdentity ({ file, number }) {
      if (this.slug === 'ktp') {
        this.identity = {
          ktp_number: number,
          ktp_file: file,
          npwp_number: null,
          npwp_file: null
        }
      } else {
        this.identity = {
          ktp_number: null,
          ktp_file: null,
          npwp_number: number,
          npwp_file: file
        }
      }
    }
  }
}
</script>
