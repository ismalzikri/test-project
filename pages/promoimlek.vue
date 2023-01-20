<template>
  <div>
    <div class="pb-3 sm:-mt-8">
      <SmallBreadcrumbs
        :list="[
          { name: 'Home', to: '/' },
          { name: 'Promo', to: '' },
        ]"
        class="text-primary-color/90"
      />
    </div>
    <div class="mt-2">
      <img
        src="https://storage.caribarang.id/general/Caribarang-8/fda2a3ac-459d-43b8-82e1-da9aa2456463.webp"
        alt="banner"
        class="w-full rounded-xl lg:rounded-[40px] mb-16"
      />
      <div class="tabs flex gap-14">
        <div
          v-for="(tab, index) in tabs"
          :key="index"
          :class="
            currentTab === tab.squence
              ? 'text-[#0E4E9B] active'
              : 'text-[#747474]'
          "
          class="cursor-pointer text-sm lg:text-base font-medium"
          @click="selectTab(tab)"
        >
          {{ tab.name }}
        </div>
      </div>
      <div class="tabs-content mt-5 lg:mt-10">
        <div v-if="currentTab === 1">
          <ul class="list-disc p-4 lg:p-3">
            <li>Harus membuat akun terlebih dahulu sebelum berbelanja.</li>
            <li>Tentukan produk yang ingin anda beli.</li>
            <li>Buat pesanan dengan minimum belanja Rp3.500.000.</li>
            <li>Aktifkan promo Imlek saat anda membuat pesanan.</li>
            <li>
              Promo Imlek akan secara otomatis mengurangi jumlah tagihan kedua
              anda, saat barang yang anda pesan sampai di gudang indonesia
            </li>
          </ul>
        </div>
        <div v-if="currentTab === 2">
          <ul class="list-disc p-4 lg:p-3">
            <li>Minimum total belanja Rp3.500.000 (pengiriman via laut).</li>
            <li>Promo berlaku untuk produk apa saja.</li>
            <li>Promo berlaku selama periode promosi (1 - 14 Januari 2023)</li>
            <li>
              Promo berlaku untuk satu kali transaksi pada masing-masing akun
              dan tidak berlaku kelipatan.
            </li>
            <li>
              Promo berlaku untuk semua akun baik yang baru terdaftar, maupun
              akun yang sudah lama terdaftar.
            </li>
          </ul>
          <div class="flex items-center gap-4 mt-6 p-4 bg-[#FFE7E2] rounded-xl">
            <img
              src="https://storage.caribarang.id/general/Caribarang-8/a258d011-a3f6-44e5-84ee-897918433e49.svg"
              alt="icon-warning"
            />
            <p class="font-normal text-sm lg:text-base">
              Pihak caribarang.id berhak membatalkan promo jika terdapat
              pelanggaran syarat dan ketentuan promo atau pelanggaran lain yang
              tidak sesuai dengan ketentuan yang berlaku.
            </p>
          </div>
        </div>
        <div class="flex justify-center lg:justify-end mt-10 gap-6">
          <button
            class="flex items-center gap-4 py-2 px-6 text-white bg-[#10B981] rounded-md"
            @click="onChat"
          >
            <img
              src="https://storage.caribarang.id/general/Caribarang-8/7c60ad50-2eca-4dc3-9942-ab4222449454.svg"
              alt="icon-whatsapp"
            />
            <span class="font-semibold">Tanya kami</span>
          </button>
          <button
            class="py-2 px-5 font-semibold text-white bg-[#0EA5E9] rounded-md"
            @click="$router.push('/')"
          >
            Belanja Sekarang
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Cookies from 'js-cookie'
import { mapState } from 'vuex'
export default {
  name: 'PromoImlek',
  data () {
    return {
      currentTab: 1,
      tabs: [
        {
          squence: 1,
          name: 'Cara Mendapatkan Promo'
        },
        {
          squence: 2,
          name: 'Syarat dan Ketentuan'
        }
      ]
    }
  },

  head: {
    title: 'Promo Imlek | caribarang.id ',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'Caribarang.id adalah platform sourcing produk internasional yang saat ini menyediakan layanan sourcing produk dari marketplace grosir terbesar di China, yaitu 1688.com (grosir B2B). Selain itu, kami juga menyediakan sourcing produk dari Taobao.com dan Tmall.com (ritel B2C).Kami bermitra dengan jasa logistik yang ahli di bidangnya dan terpercaya untuk menyediakan pengalaman berbelanja internasional semudah berbelanja lokal.Kami menyediakan solusi layanan end-to-end bagi pelanggan mulai dari pencarian produk, pembelian, pembayaran, sampai jasa pengiriman. Salah satu tujuan kami adalah untuk menjadi Trading Hub Internasional terbesar.'
      },
      {
        rel: 'canonical',
        href: 'https://caribarang.id/promoimlek'
      }
    ]
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user
    })
  },

  methods: {
    selectTab (tab) {
      this.currentTab = tab.squence
    },

    onChat () {
      const phone = '6281119163004'
      const lastUrl = window.location.href
      const utmSource = Cookies.get('utm_source') ? Cookies.get('utm_source') : ''
      this.$gtm.push({ event: 'WA Promo Imlek', user: this.user })
      let message = `${lastUrl}%0a%0a Halo admin Caribarang.id, saya tertarik dengan Promo Potongan Ongkir impornya, mau tanya-tanya dong. 🙏😊`

      if (utmSource) {
        if (utmSource === 'Faceboook' || utmSource.includes('FB')) {
          message =
            '(Promo, FB/IG) %0a%0aHalo admin Caribarang.id, saya tertarik dengan Promo Potongan Ongkir impornya, mau tanya-tanya dong. 🙏😊'
        }

        if (utmSource.includes('tiktok')) {
          message =
            '(Promo, Tiktok) %0a%0aHalo admin Caribarang.id, saya tertarik dengan Promo Potongan Ongkir impornya, mau tanya-tanya dong. 🙏😊'
        }

        if (utmSource.includes('ig')) {
          message =
            '(Promo, IG) %0a%0aHalo admin Caribarang.id, saya tertarik dengan Promo Potongan Ongkir impornya, mau tanya-tanya dong. 🙏😊'
        }

        if (utmSource === 'ig/instastoryorganic') {
          message =
            '(Promo) Story Instagram) %0a%0aHalo admin Caribarang.id, saya tertarik dengan Promo Potongan Ongkir impornya, mau tanya-tanya dong. 🙏😊'
        }

        if (utmSource.includes('google')) {
          message =
            '(Promo, Google) %0a%0aHalo admin Caribarang.id, saya tertarik dengan Promo Potongan Ongkir impornya, mau tanya-tanya dong. 🙏😊'
        }

        if (utmSource.includes('wablast')) {
          message =
            '(Promo, Wa Blast) %0a%0aHalo admin Caribarang.id, saya tertarik dengan Promo Potongan Ongkir impornya, mau tanya-tanya dong. 🙏😊'
        }

        if (utmSource.includes('emailblast')) {
          message =
            '(Promo, Email) %0a%0aHalo admin Caribarang.id, saya tertarik dengan Promo Potongan Ongkir impornya, mau tanya-tanya dong. 🙏😊'
        }

        if (utmSource.includes('google/youtube')) {
          message =
            '(Promo, Youtube) %0a%0aHalo admin Caribarang.id, saya tertarik dengan Promo Potongan Ongkir impornya, mau tanya-tanya dong. 🙏😊'
        }
      } else {
        message =
          '(Promo) %0a%0aHalo admin Caribarang.id, saya tertarik dengan Promo Potongan Ongkir impornya, mau tanya-tanya dong. 🙏😊'
      }

      if (this.$isMobile()) {
        return window.open(
          `whatsapp://send?phone=${phone}&text=${message}`,
          '_blank'
        )
      } else {
        return window.open(
          `https://api.whatsapp.com/send?phone=${phone}&text=${message}`,
          '_blank'
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.active {
  padding-bottom: 6px;
  border-bottom: 1.5px solid #0e4e9b;
}
</style>
