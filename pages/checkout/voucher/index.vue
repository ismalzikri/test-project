<template>
  <div class="bg-white p-4">
    <div v-if="listVoucher.length">
      <span class="text-sm text-[#424242]">Voucher Yang Tersedia</span>
      <div class="flex flex-col gap-5 mt-4">
        <button
          v-for="(item, index) in listVoucher"
          :key="index"
          :disabled="isVoucherDisabled(item)"
          :class="[
            isVoucherDisabled(item) ? 'bg-[#F5F5F5]' : 'border-gray-300',
            isVoucherSelected(item) ? 'bg-[#EFF7FF] border-[#086DE3]' : '',
          ]"
          class="flex items-center justify-between border rounded-lg p-4"
          @click="selectVoucher(item.voucher_name, item.voucher_code, index)"
        >
          <div>
            <div class="flex flex-col items-start">
              <span
                :class="
                  !item.status || isVoucherDisabled(item)
                    ? 'text-[#AAAAAA]'
                    : ''
                "
                class="text-sm font-medium"
              >
                {{ item.voucher_name }}
              </span>
              <span class="text-sm text-[#AAAAAA] mt-1">{{
                item.voucher_description
              }}</span>
            </div>
            <div class="flex items-center gap-3 mt-3">
              <img
                src="https://storage.caribarang.id/general/Caribarang-8/12b09c97-30eb-405d-a276-c0b75c127469.svg"
                alt="icon-time"
              />
              <p
                :class="
                  !item.status || isVoucherDisabled(item)
                    ? 'text-[#AAAAAA]'
                    : 'text-[#E64123]'
                "
                class="text-xs"
              >
                {{ item.expired_at }}
              </p>
            </div>
          </div>
          <div
            v-if="
              item.voucher_code == selectedVoucherCode ||
                item.voucher_code == voucherCode
            "
          >
            <img
              src="https://storage.caribarang.id/general/Caribarang-8/4dfbfc6a-8dd4-4943-9879-96ed6bf2df1f.svg"
              alt="icon-checklist"
            />
          </div>
        </button>
      </div>
      <div class="mt-12">
        <button
          :disabled="selectedVoucherCode === ''"
          :class="[
            selectedVoucherCode === '' ? 'bg-[#AAAAAA]' : 'bg-[#0EA5E9]',
          ]"
          class="w-full py-2 rounded-md text-white font-medium"
          @click="confirmation"
        >
          {{ loading ? 'loading...' : 'konfirmasi' }}
        </button>
      </div>
    </div>
    <div v-else class="flex flex-col justify-center items-center gap-3">
      <img
        src="https://storage.caribarang.id/general/Caribarang-8/1ba1a71c-b49e-45e0-b00f-e2ac6eaa665b.svg"
        alt="no-item-voucher"
      />
      <p class="font-medium text-[#0E4E9B]">
        Maaf, saat ini voucher tidak tersedia
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'VoucherMobilePage',

  data () {
    return {
      listVoucher: [],
      errorMessage: '',
      selectedVoucherName: '',
      selectedVoucherCode: '',
      loading: false
    }
  },

  computed: {
    ...mapState(['voucherName', 'voucherCode'])
  },

  mounted () {
    this.getVoucherList()
  },

  methods: {
    ...mapActions(['setVoucherName', 'setVoucherCode']),

    async getVoucherList () {
      try {
        this.$store.dispatch('setLoading', true)
        const { data } = await this.$axios.get('api/vouchers/list')
        this.listVoucher = data.data
        this.$store.dispatch('setLoading', false)
      } catch (error) {
        this.$store.dispatch('setLoading', false)
        this.errorMessage = 'something error, please refresh again !'
      }
    },

    selectVoucher (name, code) {
      if (code === this.selectedVoucherCode) {
        name = ''
        code = ''
      } else if (code === this.voucherCode) {
        name = ''
        code = ''
        this.setVoucherName('')
        this.setVoucherCode('')
      }

      this.selectedVoucherName = name
      this.selectedVoucherCode = code
    },

    isVoucherDisabled (voucher) {
      if (
        (this.selectedVoucherCode &&
          voucher.voucher_code !== this.selectedVoucherCode) ||
        (voucher.voucher_code !== this.voucherCode && this.voucherCode !== '')
      ) {
        return true
      } else if (!voucher.status) {
        return true
      }
      return false
    },
    isVoucherSelected (voucher) {
      if (
        (this.selectedVoucherCode &&
          voucher.voucher_code === this.selectedVoucherCode) ||
        voucher.voucher_code === this.voucherCode
      ) {
        return true
      }
      return false
    },

    confirmation () {
      this.setVoucherName(this.selectedVoucherName)
      this.setVoucherCode(this.selectedVoucherCode)

      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.$router.push('/checkout?ref=voucher')
      }, 1000)
    }
  }
}
</script>
