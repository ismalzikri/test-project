<template>
  <div class="overflow-hidden">
    <SmallNewNavbar />

    <section class="relative">
      <div>
        <img
          src="https://storage.caribarang.id/general/Admin-Caribarang-8/d72de5d1-bc32-4644-b0e4-9a2891cd5107.webp"
          alt="karyawan atau customer service caribarang.id"
          class="w-screen"
          data-aos="fade-zoom-in"
          data-aos-delay="300"
        />
      </div>
      <div
        data-aos="fade-right"
        data-aos-duration="600"
        class="absolute top-4 xs:top-1/3 -translate-y-1/2 tracking-wider left-2 md:left-6 xl:left-24"
      >
        <div
          class="text-base md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-7xl font-bold shadow-green-500"
        >
          <h1 class="text-gray-700 xl:mb-2">
            Selamat <br class="xs:hidden" />
            Datang di
          </h1>
          <p class="text-[#004b9c]">Caribarang.id</p>
        </div>
        <div
          class="text-[11px] font-medium md:font-light md:text-xl lg:text-2xl xl:text-3xl 2xl:text-5xl text-gray-500 mt-5 lg:mt-5 xl:mt-10"
        >
          <p>Kenal Lebih Dekat</p>
          <p class="xl:mt-1">Dengan Kami</p>
        </div>
      </div>
      <button
        data-aos="fade-up"
        type="button"
        data-aos-duration="600"
        class="hidden md:flex border rounded-full border-white w-8 h-8 md:w-12 md:h-12 absolute right-0 left-40 md:left-1/2 -translate-x-1/2 text-white text-xl opacity-90 bottom-3 md:bottom-20 2xl:bottom-40 hover:bg-gray-50/20 animate-bounce hover:animate-none"
        @click="scrollIntoView"
      >
        <i class="fas fa-arrow-down m-auto text-lg md:text-xl"></i>
      </button>
    </section>

    <section id="about-us">
      <div
        class="container px-2 md:px-5 mx-auto flex flex-col items-center pt-3 lg:pt-8 pb-5 md:text-base"
      >
        <p
          data-aos="fade-up"
          class="w-full md:w-[650px] lg:ml-10 md:px-0 text-gray-500 tracking-wider text-center font-light"
        >
          <span class="text-primary-color font-semibold">Caribarang.id</span>
          adalah platform sourcing produk internasional yang hadir untuk
          membantu kebutuhan Anda dalam mencari produk dari supplier marketplace
          grosir terbesar di China.
        </p>

        <div
          class="grid grid-cols-2 md:grid-cols-3 gap-x-2 md:gap-5 w-full mt-16 h-max"
        >
          <div
            v-for="(item, index) in data.section2"
            :key="index"
            data-aos="fade-up"
            class="flex flex-col items-center justify-start h-32"
          >
            <div class="max-h-16">
              <img
                :src="item.icon"
                alt="image1"
                class="mb-2 h-10 lg:mb-4 lg:h-16 lg:max-h-16 max-w-[150px]"
              />
            </div>
            <p class="text-gray-600 font-light text-center mt-2">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div
        class="xl:container xl:mx-auto flex items-center justify-center gap-2"
      >
        <div class="hidden xl:block">
          <button
            style="transform: scaleX(-1)"
            class="border rounded-full w-10 h-10 group"
            @click="prev()"
          >
            <i
              class="fas fa-angle-right text-lg text-gray-700 group-hover:text-primary-color-hover"
            ></i>
          </button>
        </div>

        <div
          class="mx-auto text-sm relative w-full flex flex-col items-center justify-center py-5 xl:pl-14"
        >
          <div class="absolute w-full h-full xl:pr-24">
            <div class="w-full h-full md:rounded-2xl bg-gray-100"></div>
          </div>

          <div v-if="data.testimoniUser" class="w-full relative py-2">
            <p
              data-aos="fade-down"
              class="text-primary-color text-2xl xl:text-[36px] font-semibold ml-4"
            >
              Kata Mereka
            </p>

            <vue-slick-carousel v-bind="settings" ref="carousel" class="w-full">
              <div v-for="(item, index) in data.testimoniUser" :key="index">
                <div
                  class="flex flex-col-reverse xl:flex-row gap-5 xl:gap-10 px-3 py-5 mt-5"
                >
                  <div>
                    <div data-aos="fade-right">
                      <p class="italic text-gray-600 xl:mt-16 text-4xl pl-4">
                        "
                      </p>
                      <p
                        class="text-gray-500/90 italic pl-8 md:px-6 leading-6 md:leading-normal -mt-3 md:mt-0"
                      >
                        {{ item.testimoni }}
                      </p>
                    </div>
                    <div
                      class="block w-full text-right pt-4 xl:pt-10 px-2 md:px-6"
                      data-aos="fade-up"
                    >
                      <p class="font-semibold text-gray-800">{{ item.name }}</p>
                      <p class="text-gray-500">
                        {{ item.profession }}, {{ item.address }}
                      </p>
                    </div>
                  </div>
                  <img
                    data-aos="fade-left"
                    :src="item.image"
                    alt="tanggapan customer yang sudah berbelanja di caribarang.id"
                    width="530"
                    height="353"
                    class="rounded-2xl inline-block mx-auto xl:ml-auto xl:mt-0 h-max"
                  />
                </div>
              </div>
            </vue-slick-carousel>
          </div>
        </div>
        <div class="hidden xl:block">
          <button class="border rounded-full w-10 h-10 group" @click="next">
            <i
              class="fas fa-angle-right text-lg group-hover:text-primary-color-hover"
            ></i>
          </button>
        </div>
      </div>
    </section>

    <section>
      <div
        class="py-14 flex flex-col xl:container xl:mx-auto bg-no-repeat bg-right-top relative"
      >
        <img
          src="https://storage.caribarang.id/general/m-royco-30/84a7f0b7-bb0c-4065-8442-23891376c49c.png"
          class="absolute -right-24 lg:right-0 z-0"
          width="681"
          height="387"
          alt="gambar maps caribarang.id"
        />
        <div class="z-10 px-4" data-aos="fade-right">
          <p class="md:text-[18px] text-gray-500 font-semibold">Bisnis Kami</p>
          <p
            class="text-2xl lg:text-[36px] font-bold leading-tight text-primary-color mt-1 mb-5"
          >
            Lebih dari <br />
            Sourcing Produk
          </p>
          <p
            class="text-gray-500/90 lg:text-[18px] font-light tracking-wide leading-7"
          >
            Caribarang.id menyediakan layanan yang
            <br class="hidden md:block" />
            memudahkan Anda dalam berbelanja <br class="hidden md:block" />
            grosir dari China semudah berbelanja lokal.
          </p>
        </div>
        <div
          data-aos="fade-up"
          class="flex gap-8 xs:gap-6 mt-3 md:mt-14 overflow-x-scroll relative px-4 xl:justify-center py-6"
        >
          <div
            v-for="(item, index) in data.section3"
            :key="index"
            class="border border-gray-400 rounded-2xl py-5 lg:py-10 px-4 hover:border-primary-color-hover hover:scale-105 hover:shadow-md duration-500 cursor-default bg-white"
          >
            <img :src="item.icon" alt="" class="mx-auto h-20" />
            <p class="text-center mt-7 mb-3 font-semibold text-primary-color">
              {{ item.title }}
            </p>
            <p
              class="w-52 xl:w-64 text-gray-500/90 font-light tracking-wide leading-7"
            >
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-gray-50">
      <div
        class="xl:container xl:mx-auto grid xl:grid-cols-2 gap-5 xl:gap-4 -mb-14 pt-5 xl:pt-0"
      >
        <div
          data-aos="fade-up"
          class="flex flex-col justify-center items-center xl:items-start"
        >
          <p class="text-primary-color text-2xl xl:text-[36px] font-semibold">
            Lokasi Kami
          </p>
          <p
            class="mt-5 mb-10 text-gray-500/90 font-light text-center xl:text-left"
          >
            Jl. Mangga Besar VIII No.12 E, Kec. Taman Sari, Kota Jakarta Barat,
            Daerah Khusus Ibukota Jakarta, 11150
          </p>
          <p class="text-xl mb-4 text-gray-600/90">Jam Operasional Kami</p>
          <p
            class="border border-gray-300 rounded-2xl py-2 px-5 w-full md:w-2/3 flex justify-between"
          >
            <span class="font-semibold text-gray-600">Senin - Jumat</span>
            <span class="text-gray-500/90 font-light">08.30 - 17.00 WIB</span>
          </p>
          <p
            class="border border-gray-300 rounded-2xl py-2 px-5 w-full md:w-2/3 flex justify-between mt-3"
          >
            <span class="font-semibold text-gray-600">Sabtu</span>
            <span class="text-gray-500/90 font-light">08.30 - 16.00 WIB</span>
          </p>
        </div>
        <div id="myMap" data-aos="fade-left" class="w-full h-[500px]"></div>
      </div>
    </section>

    <MediaPartner />
    <SimpleFooter />
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
export default {
  components: {
    VueSlickCarousel
  },
  layout: 'event',
  data () {
    return {
      data: {
        section2: [
          {
            icon: 'https://storage.caribarang.id/general/Admin-Caribarang-8/fb1d776d-d9e1-4f05-9ffd-61feb9ce5775.webp',
            description: 'Terhubung dengan 1688.com'
          },
          {
            icon: 'https://storage.caribarang.id/general/Admin-Caribarang-8/0476da31-4e5c-4e5e-bb07-64fd57336a6d.webp',
            description: 'Tanpa biaya membership'
          },
          {
            icon: 'https://storage.caribarang.id/general/Admin-Caribarang-8/16ee4a39-c1c0-4bea-9396-a6bc173f1413.webp',
            description: 'Bermitra dengan partner Logistik terbaik'
          },
          {
            icon: 'https://storage.caribarang.id/general/Admin-Caribarang-8/b36749d1-ddfe-4c83-bb6c-6b2c9df1f3eb.webp',
            description: 'Solusi layanan end-to-end'
          },
          {
            icon: 'https://storage.caribarang.id/general/Admin-Caribarang-8/8aefad33-58ad-4ea6-96fa-e6f0cc68f256.webp',
            description: 'Tim purchasing professional berbahasa Mandarin'
          },
          {
            icon: 'https://storage.caribarang.id/general/Admin-Caribarang-8/77582f29-503e-46c3-a54a-e6d042e52e77.webp',
            description: 'Tanpa Mark-up Harga'
          }
        ],
        testimoniUser: null,
        section3: [
          {
            icon: 'https://storage.caribarang.id/general/Jeffri-8/ba31ef87-5951-4726-af77-30c153776224.webp',
            title: 'Pencarian Produk',
            description:
              'Caribarang.id akan membantu Anda dalam mencari dan merekomendasikan produk pilihan yang profitable.'
          },
          {
            icon: 'https://storage.caribarang.id/general/Jeffri-8/562a8183-1003-4846-ab1f-f8c483820f79.webp',
            title: 'Pembelian',
            description:
              'Proses pembelian akan dibantu oleh Tim profesional kami dengan keahlian berbahasa Mandarin yang akan berkomunikasi langsung dengan supplier di China.'
          },
          {
            icon: 'https://storage.caribarang.id/general/Jeffri-8/80656672-6a18-4111-b26d-a2daf3acad7a.webp',
            title: 'Pembayaran',
            description:
              'Harga akan dihitung sampai alamat tujuan dan dilakukan dengan transparan.'
          },
          {
            icon: 'https://storage.caribarang.id/general/Jeffri-8/776ea084-7a8b-41ce-8e77-59bf3f1c41c0.webp',
            title: 'Pengiriman',
            description:
              'Demi kenyamanan dan keamanan Anda dalam berbelanja, Caribarang.id bermitra dengan jasa logistik terbaik untuk pengiriman barang dari China-Indonesia.'
          }
        ]
      },
      settings: {
        arrows: false,
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000
      }
    }
  },
  async fetch () {
    const { data } = await this.$axios.get('/api/testimonials')
    this.data.testimoniUser = data.data
  },
  head: {
    title: 'Tentang Caribarang.id',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'Caribarang.id adalah platform sourcing produk internasional yang saat ini menyediakan layanan sourcing produk dari marketplace grosir terbesar di China, yaitu 1688.com (grosir B2B). Selain itu, kami juga menyediakan sourcing produk dari Taobao.com dan Tmall.com (ritel B2C).Kami bermitra dengan jasa logistik yang ahli di bidangnya dan terpercaya untuk menyediakan pengalaman berbelanja internasional semudah berbelanja lokal.Kami menyediakan solusi layanan end-to-end bagi pelanggan mulai dari pencarian produk, pembelian, pembayaran, sampai jasa pengiriman. Salah satu tujuan kami adalah untuk menjadi Trading Hub Internasional terbesar.'
      },
      {
        rel: 'canonical',
        href: 'https://caribarang.id/about-us'
      }
    ]
  },
  mounted () {
    const contentString = `<div class="">
          <p>Lokasi kantor Caribarang.id</p>
          <br/>
              <a target="_blank" href="https://www.google.com/maps/place/Caribarang.id/@-6.1511163,106.8257194,17z/data=!3m1!4b1!4m5!3m4!1s0x2e69f554d4779937:0xa872d6d4cf32875!8m2!3d-6.1511163!4d106.8257194" class=""><span style="color:#1773E8;">Tampilkan di Google Maps</span>
              </a>
        </div>`

    // eslint-disable-next-line no-undef
    const map = new google.maps.Map(document.getElementById('myMap'), {
      center: { lat: -6.151671, lng: 106.825774 },
      zoom: 14
    })
    // eslint-disable-next-line no-undef
    const infowindow = new google.maps.InfoWindow({
      content: contentString
    })

    // eslint-disable-next-line no-undef, no-unused-vars, no-new
    const marker = new google.maps.Marker({
      position: { lat: -6.151671, lng: 106.825774 },
      map,
      title: 'Caribarang.id'
    })
    infowindow.open({
      anchor: marker,
      map,
      shouldFocus: false
    })
    marker.addListener('click', () => {
      infowindow.open({
        anchor: marker,
        map,
        shouldFocus: false
      })
    })
  },
  methods: {
    scrollIntoView () {
      document.getElementById('about-us').scrollIntoView({ behavior: 'smooth' })
    },
    prev () {
      this.$refs.carousel.prev()
    },
    next () {
      this.$refs.carousel.next()
    }
  }
}
</script>
