<template>
  <div>
    <div class="border-b border-gray-100 pb-2 uppercase text-sm text-gray-600">
      {{ label }} atau SIM
    </div>
    <div class="py-3 w-full">
      <div v-show="imageError" class="py-2">
        <cb-alert title="Error" icon="fas fa-exclamation-circle" color="danger">
          <p>{{ imageError }}</p>
        </cb-alert>
      </div>
      <div v-if="identity" class="w-full md:w-2/4 rounded">
        <img v-if="label == 'KTP'" :src="identity.ktp_file" alt="KTP" />
        <img v-else :src="identity.npwp_file" alt="NPWP" />
        <p v-if="label == 'KTP' && identity.ktp_number" class="py-2 text-xs">
          Nomor {{ label }} atau SIM : {{ identity.ktp_number }}
        </p>
        <p v-if="label == 'NPWP' && identity.npwp_number" class="py-2 text-xs">
          Nomor {{ label }} : {{ identity.npwp_number }}
        </p>
      </div>
      <ValidationObserver ref="form" v-slot="{ handleSubmit }" class="w-full">
        <form method="POST" class="" @submit.prevent="handleSubmit(onSubmit)">
          <ValidationProvider
            v-slot="{ errors }"
            tag="div"
            class="mb-5"
            name="card_number"
            rules="required"
          >
            <label
              for="city"
              class="block text-xs text-gray-600 sm:mt-px sm:pt-2 py-1"
            >
              No {{ label }} atau SIM
            </label>
            <div v-if="label == 'NPWP'" class="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                :value="number_card"
                name="card_number"
                class="max-w-lg text-xs block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs border-gray-300 rounded-md"
                @keypress="$mustNumber"
                @input="onInput"
              />
            </div>
            <div v-else class="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                :value="number_card"
                name="card_number"
                class="max-w-lg text-xs block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs border-gray-300 rounded-md"
                @keypress="$mustNumber"
                @input="onInput"
              />
            </div>
            <p class="text-xs text-red-600">{{ errors[0] }}</p>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            tag="div"
            class="mb-5"
            name="identityName"
            rules="required"
          >
            <label
              for="cover-photo"
              class="block text-xs text-gray-600 sm:mt-px sm:pt-2 py-1"
            >
              Foto {{ label }} atau SIM
            </label>
            <div class="mt-1 sm:mt-0 sm:col-span-2">
              <div
                class="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
              >
                <div class="space-y-1 text-center">
                  <svg
                    class="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <div class="flex text-sm text-gray-600">
                    <label
                      for="file-upload"
                      class="text-center w-full relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Pilih Dokumen</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        class="sr-only"
                        @change="onSelectFile"
                      />
                      <input
                        name="identityName"
                        :value="identityName"
                        type="text"
                        class="sr-only"
                      />
                    </label>
                  </div>
                  <p class="text-xs text-indigo-500">{{ identityName }}</p>
                  <p class="text-xs text-gray-500">
                    PNG, JPEG and JPG up to 1000 Kb
                  </p>
                </div>
              </div>
              <p class="text-xs text-red-600 mt-1.5">{{ errors[0] }}</p>
            </div>
          </ValidationProvider>
          <div class="mb-5">
            <cb-button color="primary" label="Simpan" button="submit" />
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>
<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import CbButton from '../Basic/Button.vue'
import CbAlert from '../Basic/Alert.vue'
export default {
  name: 'CardIdentity',
  components: {
    CbButton,
    ValidationProvider,
    ValidationObserver,
    CbAlert
  },
  props: {
    label: {
      type: String,
      default: 'KTP'
    },

    identity: {
      type: Object,
      default: () => null
    }
  },

  data () {
    return {
      number_card: '',
      realValue: '',
      identityFile: null,
      identityName: '',
      imageError: ''
    }
  },

  methods: {
    onInput (e) {
      const value = e.target.value
      if (this.label === 'KTP') {
        this.number_card = value
        this.realValue = value
        return
      }
      const numberOnly = value.replace(/\D/g, '')
      this.realValue = numberOnly
      const npwpFormat = this.$formatNpwp(numberOnly)
      this.number_card = npwpFormat
    },

    onSelectFile (e) {
      const size = e.target.files[0].size / 1024
      if (parseInt(size) > 1024) {
        this.imageError = 'File yang di upload melebihi batas maksimum.'
        return false
      } else {
        this.imageError = ''
      }
      const dataFile = e.target.files[0]
      this.identityFile = dataFile
      this.identityName = dataFile.name
    },

    async onSubmit () {
      try {
        this.$store.dispatch('setLoading', true)
        const formData = new FormData()
        formData.append('identity_file', this.identityFile)
        formData.append('indentity_number', this.realValue)
        formData.append('card_type', this.label)
        const { status, message } = await this.$axios.$post(
          '/api/account/identity-card',
          formData
        )
        this.$store.dispatch('setLoading', false)
        this.$emit('setIdentity', message)
        if (!status) return this.$swal.fire('Error!', message, 'danger')
        return this.$swal.fire('Sukses!', 'Data berhasil disimpan', 'success')
      } catch (error) {
        this.$store.dispatch('setLoading', false)
        return this.$swal.fire('Error!', error.message, 'danger')
      }
    }
  }
}
</script>
