<template>
  <div class="-mb-14">
    <section
      class="relative w-screen left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#0077b7] to-[#0c4d9a] xl:h-screen 2xl:h-max -mt-14 flex"
    >
      <div
        class="relative x-w-2xl md:max-w-4xl mx-auto lg:max-w-7xl lg:px-8 flex px-2 md:px-5 h-full"
      >
        <div
          class="absolute flex right-0 gap-2 md:gap-5 lg:gap-7 top-10 md:top-6 z-10 text-xs sm:text-sm px-1 md:px-5"
          data-aos="fade-down"
          data-aos-delay="300"
        >
          <NuxtLink
            to="/"
            class="px-4 py-1 lg:px-12 lg:py-2 rounded-lg ring-1 ring-white text-white hover:bg-primary-color-hover"
          >
            Home
          </NuxtLink>
          <NuxtLink
            to="/signup"
            class="px-4 py-1 lg:px-12 lg:py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 w-max h-max"
          >
            Sign Up
          </NuxtLink>
        </div>
        <div
          class="flex justify-between xs:justify-center lg:justify-between gap-0 xs:gap-2 lg:gap-5 2xl:gap-10 lg:mx-10 pt-24 lg:pt-48"
        >
          <img
            src="https://storage.caribarang.id/general/Jeffri-8/0c7e6d5f-9cad-4c8d-bbcc-ee906ced8971.webp"
            class="w-[165px] xs:w-[215px] md:w-[420px] lg:w-[600px] xl:w-[700px] 2xl:w-[800px] self-end"
            width="215"
            height="215"
            fetchpriority="high"
            data-aos="fade-right"
            data-aos-delay="300"
            alt="help order"
          />
          <div
            class="mt-auto mb-10 xs:mb-16 md:my-auto lg:self-center 2xl:mt-72"
            data-aos="fade-left"
            data-aos-delay="300"
          >
            <h1 class="text-xl md:text-4xl xl:text-6xl text-white">
              Sudah Kenal <br />
              <b>Caribarang.id?</b>
            </h1>
            <div
              class="flex gap-2 md:gap-5 lg:gap-7 mt-3 lg:mt-7 xl:mt-12 w-max"
            >
              <nuxt-link
                to="/"
                class="px-4 text-xs sm:text-sm md:text-base py-1 lg:px-12 lg:py-2 rounded-lg bg-white hover:bg-gray-200 text-gray-800"
              >
                Sudah
              </nuxt-link>
              <button
                type="button"
                class="px-4 text-xs sm:text-sm md:text-base py-1 lg:px-12 lg:py-2 rounded-lg text-white bg-red-500 hover:bg-red-600"
                @click="onScrollYet"
              >
                Belum
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      id="notyet"
      data-aos="fade-up"
      class="flex flex-col items-center pt-5 md:pt-10 pb-16 px-3 space-y-5 md:space-y-7 text-center justify-center"
    >
      <p class="text-xl md:text-4xl font-bold text-primary-color">
        Kenal lebih dekat dengan kami
      </p>
      <p class="text-sm md:text-base tracking-wider font-light">
        <span class="text-primary-color font-semibold">Caribarang.id</span>
        adalah platform sourcing produk internasional yang hadir untuk membantu
        <br class="hidden lg:block" />
        kebutuhan Anda dalam mencari produk dari supplier marketplace grosir
        terbesar di China,
        <br class="hidden lg:block" />
        salah satunya adalah 1688.com
      </p>
      <img
        src="https://storage.caribarang.id/general/Jeffri-8/f2eb94ed-ac05-4e05-baf6-09e4d51c5efd.webp"
        alt="logo 1688"
        width="300"
        height="100"
        class="lg:w-[300px] lg:h-[100px] w-[200px]"
        data-aos="fade-zoom-in"
        data-aos-delay="300"
      />
      <p class="text-sm md:text-base tracking-wider font-light">
        <span class="text-[#f47421] font-semibold">1688.com</span>
        adalah salah satu marketplace grosir China terbesar dengan variasi jenis
        barang <br class="hidden lg:block" />
        dagangan yang sangat beragam, dan harga yang cenderung murah. Biasanya
        supplier di 1688.com <br class="hidden lg:block" />
        adalah pihak pertama/pabrik produksi di China.
      </p>
      <p class="font-semibold text-sm md:text-base tracking-wider">
        Namun, sebelum berbelanja langsung di 1688.com,
        <br class="hidden lg:block" />
        kamu perlu memperhatikan beberapa hal di bawah ini:
      </p>
      <div
        class="rounded-lg bg-red-100 py-4 px-4 md:py-7 md:px-16 space-y-3 md:space-y-6 md:h-3/4 lg:w-3/5 text-sm md:text-base"
      >
        <div
          v-for="(item, index) in isWarn"
          :key="index"
          class="flex gap-3 md:gap-5 md:items-center text-left"
        >
          <img
            src="https://storage.caribarang.id/general/Jeffri-8/a960a643-0a9f-414f-b82e-7134c96dea71.webp"
            width="20"
            height="20"
            alt="logo warn"
            data-aos="fade-zoom-in"
            data-aos-delay="300"
            class="w-5 h-5 md:w-7 md:h-7"
          />
          <p class="text-gray-600">{{ item }}</p>
        </div>
      </div>
    </section>

    <section
      class="w-screen left-1/2 -translate-x-1/2 relative bg-gradient-to-b from-[#eaeff2] via-[#dadfeb] to-[#c2d9fb] md:pb-36 overflow-hidden"
    >
      <img
        src="https://storage.caribarang.id/general/Jeffri-8/24892f76-61ec-407f-863f-e7e103978383.webp"
        alt="map caribarang"
        class="h-[500px] absolute -bottom-36 left-1/2 -translate-x-1/2"
      />
      <div
        class="max-w-2xl md:max-w-4xl mx-auto px-4 md:px-6 lg:max-w-7xl lg:px-8 flex flex-col items-center pt-3 lg:pt-8 pb-5 md:text-base"
      >
        <p
          data-aos="fade-up"
          class="text-xl md:text-4xl font-bold text-primary-color text-center"
        >
          Caribarang.id adalah solusi yang kamu cari
        </p>

        <div
          class="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-10 w-full mt-10 md:mt-20 h-max"
        >
          <div
            v-for="(item, index) in section2"
            :key="index"
            data-aos="fade-up"
            class="flex flex-col items-center justify-start h-32"
          >
            <div class="max-h-16">
              <img
                :src="item.icon"
                width="100"
                height="48"
                class="mb-2 h-12 lg:mb-4 lg:h-16 lg:max-h-16 custom-inline"
                alt="image1"
                decoding="async"
              />
            </div>
            <p class="text-gray-600 font-light text-center mt-2">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
      <div class="mt-10" data-aos="fade-up">
        <div class="text-center">
          <p class="text-xl md:text-4xl font-bold text-primary-color">
            Kemudahan Impor Barang Dagangan
          </p>
          <p class="text-xl md:text-4xl font-bold">Dalam Satu Platform</p>
        </div>
        <div
          class="flex gap-6 mt-3 md:mt-14 py-6 overflow-x-scroll relative w-screen left-1/2 -translate-x-1/2 px-4 xl:justify-center global-hide-scroll"
        >
          <div
            v-for="(item, index) in section3"
            :key="index"
            class="border border-gray-400 rounded-2xl py-5 lg:py-10 px-4 hover:border-primary-color-hover hover:scale-105 hover:shadow-md duration-500 cursor-default bg-white"
          >
            <img
              :src="item.icon"
              width="80"
              height="64"
              class="mx-auto h-12 md:h-16 custom-inline"
              alt="logo caribarang"
            />
            <p class="text-center mt-7 mb-3 font-semibold text-primary-color">
              {{ item.title }}
            </p>
            <p
              class="text-gray-500/90 w-52 xl:w-64 text-sm tracking-wide leading-7 text-center"
            >
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section
      class="bg-primary-color relative w-screen left-1/2 -translate-x-1/2 py-4 md:py-10 overflow-hidden flex flex-col"
    >
      <div
        class="max-w-2xl md:max-w-4xl mx-auto px-4 md:px-6 lg:max-w-7xl lg:px-8 flex flex-col items-center pt-3 lg:pt-8 pb-5 md:text-base"
      >
        <p
          class="text-xl md:text-4xl font-bold text-white text-center mt-5 mb-3"
          data-aos="fade-up"
        >
          Cara Mudah Belanja Produk Dagangan dari China Untuk Usaha
        </p>

        <div
          data-aos="fade-up"
          class="justify-center flex flex-col items-center text-sm relative z-10"
        >
          <div
            class="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-10 mt-3 md:mt-10 w-full"
          >
            <div
              v-for="item in isStepProduk"
              :key="item.id"
              class="bg-white rounded-lg text-center md:py-4 md:px-6 relative hover:scale-105 flex items-center cursor-pointer px-6 py-2 w-full h-12 lg:h-16"
            >
              <div
                class="rounded-full w-8 h-8 md:w-10 md:h-10 absolute flex justify-center items-center -left-3 -top-3 bg-red-500 text-white font-bold text-base md:text-lg"
              >
                {{ item.id }}
              </div>
              <img
                :src="item.img"
                width="40"
                height="40"
                :class="
                  item.id === 3
                    ? 'w-6 h-6 ml-2 mr-1 md:w-8 md:h-8'
                    : 'w-10 h-10 mr-1 md:w-14 md:h-14'
                "
                alt="step caribarang"
              />
              <p
                class="text-base md:text-lg text-left"
                :class="{ 'ml-2 leading-6': item.id === 3 }"
              >
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
        <div
          class="mx-auto flex justify-center z-10 mt-9 w-full"
          data-aos="fade-up"
        >
          <iframe
            src="https://www.youtube.com/embed/-oFjfUI_XoM"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            style="width: 100%; aspect-ratio: 16/9"
            class="rounded-lg"
            allowfullscreen
          ></iframe>
        </div>
      </div>

      <div
        class="rounded-full w-60 h-60 md:w-96 md:h-96 border-[40px] border-blue-100 absolute -left-20 -bottom-32 opacity-20 z-0"
      ></div>
    </section>
    <Observer @intersect="fetchTestimoni" />
    <section class="relative w-screen left-1/2 -translate-x-1/2">
      <div
        class="justify-center max-w-2xl md:max-w-4xl mx-auto px-4 md:px-6 lg:max-w-7xl lg:px-8 flex flex-col items-center text-sm relative py-9 md:py-16"
      >
        <div class="hidden lg:block absolute -left-10">
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
        <div v-if="testimoniUser" class="block w-full relative pt-16">
          <div
            data-aos="fade-down"
            class="pl-3 lg:pl-0 pb-3 lg:pb-0 lg:absolute lg:left-0 top-0"
          >
            <p class="text-primary-color text-2xl lg:text-[36px] font-bold">
              Kata Mereka
            </p>
            <span>Tentang Caribarang.id</span>
          </div>
          <img
            src="https://storage.caribarang.id/general/Jeffri-8/df585b09-4c5f-45cf-ba26-51930fd9e9fe.webp"
            width="48"
            height="36"
            class="w-12 md:w-20 absolute right-0 top-0"
            data-aos="fade-zoom-in"
            data-aos-delay="300"
            alt="help order"
          />

          <vue-slick-carousel v-bind="settings" ref="carousel">
            <div v-for="(item, index) in testimoniUser" :key="index">
              <div
                class="flex flex-col-reverse lg:flex-row gap-5 lg:gap-10 px-3 py-5 mt-5"
              >
                <div class="xl:min-w-[600px] xl:max-w-[600px]">
                  <div data-aos="fade-right">
                    <p class="italic text-gray-600 lg:mt-16 text-4xl">"</p>
                    <p
                      class="text-gray-500/90 italic pl-8 md:px-6 leading-6 md:leading-normal -mt-3 md:mt-0"
                    >
                      {{ item.testimoni }}
                    </p>
                  </div>
                  <div
                    class="block w-full text-right pt-4 lg:pt-10"
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
                  alt="carousel"
                  width="530"
                  height="353"
                  class="rounded-2xl inline-block mx-auto lg:ml-auto lg:mt-0 h-max"
                />
              </div>
            </div>
          </vue-slick-carousel>
        </div>
        <div class="hidden lg:block absolute -right-2">
          <button class="border rounded-full w-10 h-10 group" @click="next">
            <i
              class="fas fa-angle-right text-lg group-hover:text-primary-color-hover"
            ></i>
          </button>
        </div>
      </div>
    </section>

    <section
      class="w-screen left-1/2 -translate-x-1/2 bg-gradient-to-b from-[#eaeff2] via-[#dadfeb] to-[#c2d9fb] relative overflow-hidden flex flex-col"
    >
      <div
        data-aos="fade-up"
        class="w-11/12 lg:max-w-7xl my-5 mx-auto md:my-10 rounded-2xl z-10 items-center text-center"
      >
        <div class="mb-10">
          <p class="text-xl md:text-4xl font-bold text-primary-color">
            Bingung mau impor<br class="lg:hidden" />
            barang dagangan apa?
          </p>
          <p class="md:text-4xl md:font-bold">
            Coba mulai dari produk rekomendasi ini
          </p>
        </div>
        <MediumRecommendSection />
      </div>

      <div
        class="rounded-full w-60 h-60 md:w-96 md:h-96 border-[40px] border-blue-100 absolute -right-20 -top-48"
      ></div>
    </section>

    <section
      class="w-screen left-1/2 -translate-x-1/2 relative overflow-hidden flex"
    >
      <div class="w-11/12 lg:max-w-7xl my-5 mx-auto md:my-10 p-3 md:p-5">
        <div class="mb-10">
          <p class="text-xl md:text-4xl font-bold text-primary-color">FAQ's</p>
          <p class="md:text-4xl md:font-bold">Frequently Asked Question</p>
        </div>
        <div class="w-full space-y-5">
          <div
            v-for="item in isFaq"
            :key="item.id"
            class="border-2 rounded-xl p-5 group hover:bg-[#f0f0f0] cursor-pointer"
            @click="
              isSeeFaq === item.id ? (isSeeFaq = null) : (isSeeFaq = item.id)
            "
          >
            <div class="flex font-semibold w-full">
              <div class="flex gap-1 lg:items-center text-sm">
                <p>{{ item.id }}.</p>
                <p>{{ item.title }}</p>
              </div>
              <div class="ml-auto">
                <svg
                  id="Layer_1"
                  :class="{ 'rotate-180': isSeeFaq === item.id }"
                  data-name="Layer 1"
                  class="w-6 h-6 fill-[#808285] stroke-[#fff]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1080 1080"
                >
                  <path
                    class="cls-1"
                    d="M540,88.77C291.2,88.77,88.77,291.2,88.77,540S291.2,991.23,540,991.23,991.23,788.8,991.23,540,788.8,88.77,540,88.77Zm0,69.42c211.24,0,381.81,170.56,381.81,381.81S751.25,921.81,540,921.81,158.19,751.25,158.19,540,328.75,158.19,540,158.19ZM356.69,428.28l-49.9,49.89L515.05,686.43l25,23.87,25-23.87L773.21,478.17l-49.9-49.89L540,611.59Z"
                  />
                </svg>
              </div>
            </div>
            <div v-if="isSeeFaq === item.id" class="mt-3 pl-5">
              <ul style="list-style-type: '-'">
                <li
                  v-for="(description, index) in item.description"
                  :key="index"
                  class="mt-1 text-sm"
                >
                  <p class="ml-1">{{ description }}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Observer @intersect="fetchCategories" />
    <form
      id="signup"
      class="w-screen left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#0077b7] to-[#0c4d9a] relative flex overflow-hidden"
      @submit.prevent="onSubmit"
    >
      <div
        class="w-11/12 lg:max-w-7xl bg-white my-5 mx-auto md:my-10 p-3 md:p-5 rounded-2xl z-10 grid lg:grid-cols-2 items-center"
      >
        <img
          src="https://storage.caribarang.id/general/Jeffri-8/27067975-7271-4beb-a188-8ff9cd327545.webp"
          width="354"
          height="255"
          class="w-full"
          alt="background daftar caribarang"
        />
        <div class="lg:px-20 flex flex-col justify-center items-center">
          <p class="mr-auto text-3xl md:text-5xl font-bold">
            <span class="text-[#0c4d9a] font-bold">DAFTAR</span>
            <span class="text-red-500 font-bold">GRATIS</span>
            SEKARANG
          </p>
          <div class="space-y-3 md:space-y-5 mt-3 md:mt-5">
            <input
              v-model="payload.name"
              type="text"
              placeholder="Nama"
              class="border-gray-400 rounded-lg mt-5 w-full placeholder-slate-300"
              required
            />
            <input
              v-model="payload.email"
              type="text"
              placeholder="Alamat Email"
              class="border-gray-400 rounded-lg mt-5 w-full placeholder-slate-300"
              required
            />
            <input
              v-model="payload.phone"
              type="number"
              name="phone"
              placeholder="No WhatsApp"
              class="border-gray-400 rounded-lg mt-5 w-full placeholder-slate-300"
              required
            />
            <input
              v-model="payload.password"
              type="password"
              placeholder="Password"
              class="border-gray-400 rounded-lg mt-5 w-full placeholder-slate-300"
              required
            />

            <input
              v-model="payload.password_confirmation"
              type="password"
              placeholder="Konfirmasi password"
              class="border-gray-400 rounded-lg mt-5 w-full placeholder-slate-300"
              required
            />

            <p class="text-red-500 text-xs italic -pt-3">
              {{
                payload.password_confirmation !== '' &&
                  payload.password_confirmation !== payload.password
                  ? 'Password tidak sama'
                  : ''
              }}
            </p>

            <select
              v-model="payload.interest_category"
              class="border-gray-400 rounded-lg w-full"
              required
            >
              <option value="">
                Pilih Kategori Utama yang Paling Kamu Sukai
              </option>
              <option
                v-for="(item, index) in categories"
                :key="index"
                :value="item.id"
              >
                {{ item.name }}
              </option>
            </select>

            <div class="flex flex-col items-center">
              <div
                v-if="errorMessage"
                class="bg-red-100 border text-sm border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <strong class="font-bold">Info!</strong>
                <span class="block sm:inline">{{ errorMessage }}</span>
              </div>
              <button
                type="submit"
                class="mt-3 bg-primary-color hover:bg-primary-color-hover rounded-md px-16 py-2 text-white mb-2 w-max"
              >
                Daftar
              </button>
              <small class="text-gray-400"
              >Sudah punya akun?
                <NuxtLink class="text-primary-color" to="/signin"
                >Masuk</NuxtLink
                >
              </small>
            </div>
          </div>
        </div>
      </div>
      <div
        class="rounded-full w-60 h-60 md:w-96 md:h-96 border-[40px] border-blue-100 absolute -left-20 -bottom-32 opacity-20 z-0"
      ></div>
      <div
        class="rounded-full w-60 h-60 md:w-96 md:h-96 border-[40px] border-blue-100 absolute -right-36 -top-10 opacity-20 z-0"
      ></div>
    </form>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
export default {
  name: 'HelpOrderPage',
  components: {
    VueSlickCarousel,
    Observer: () => import('../../components/Small/Observer.vue'),
    MediumRecommendSection: () => import('../../components/Medium/Recommend/RecommendSection.vue')
  },
  data () {
    return {
      isRecommend: [],
      isSeeFaq: null,
      settings: {
        arrows: false,
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1
      },
      isStepProduk: [
        {
          id: 1,
          img: 'https://storage.caribarang.id/general/Jeffri-8/82de9c09-0bb0-4962-997c-8fed80c983d3.webp',
          description: 'Pilih produk dagangan'
        },
        {
          id: 2,
          img: 'https://storage.caribarang.id/general/Jeffri-8/f1f67df4-9453-47d6-a853-3394de0bbf31.webp',
          description: 'Pilih pembayaran'
        },
        {
          id: 3,
          img: 'https://storage.caribarang.id/general/Jeffri-8/fce9b1bd-b186-4c2b-8e4d-ebddf1032706.webp',
          description: 'Tunggu pesanan sampai di rumah'
        }
      ],
      testimoniUser: null,
      isWarn: [
        'Platform dan supplier dalam bahasa Mandarin',
        'Pembayaran tidak bisa menggunakan bank lokal Indonesia,',
        'Harga yang ditampilkan belum termasuk ongkos kirim ke Indonesia',
        'Pengurusan dokumen impor yang ribet',
        'Pengiriman dari China ke Indonesia yang lama dan banyak kendala'
      ],
      section3: [
        {
          icon: 'https://storage.caribarang.id/general/Jeffri-8/ba31ef87-5951-4726-af77-30c153776224.webp',
          title: 'Pencarian Produk',
          description:
            'Caribarang.id akan membantu Anda dalam mencari dan merekomendasikan produk dagangan pilihan yang profitable.'
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
      ],
      section2: [
        {
          icon: 'https://storage.caribarang.id/general/Jeffri-8/7aa4a83f-9a4a-41e4-8ea1-1ab501f57826.webp',
          description: 'Terhubung dengan 1688.com'
        },
        {
          icon: 'https://storage.caribarang.id/general/Jeffri-8/7fb4ddbe-e51a-4038-bf52-e95de5743598.webp',
          description: 'Tanpa biaya membership'
        },
        {
          icon: 'https://storage.caribarang.id/general/Jeffri-8/7faf89dd-66db-45f7-89e7-bf9d7b69da41.webp',
          description: 'Bermitra dengan partner Logistik terbaik'
        },
        {
          icon: 'https://storage.caribarang.id/general/Jeffri-8/135fba34-063d-4635-bc99-0d32e944d3d8.webp',
          description: 'Solusi layanan impor end-to-end'
        },
        {
          icon: 'https://storage.caribarang.id/general/Jeffri-8/de35c182-0552-4568-89f3-2f042cfa2e56.webp',
          description: 'Tim purchasing professional berbahasa Mandarin'
        },
        {
          icon: 'https://storage.caribarang.id/general/Jeffri-8/14ca9df7-947f-4617-b65c-e6a7ba0ac670.webp',
          description: 'Tanpa Mark-up Harga'
        }
      ],
      categories: [{ id: '', name: '' }],
      payload: {
        email: '',
        name: '',
        phone: '',
        password: '',
        password_confirmation: '',
        interest_category: ''
      },
      errorMessage: null,
      isFaq: [
        {
          id: 1,
          title: 'Berapa minimum pembelanjaan?',
          description: ['Minimum pembelanjaan produk ditentukan oleh supplier, namun tidak menjamin sudah memenuhi minimum pengiriman China - Indonesia yaitu sebesar 0.5 CBM via laut atau 3 KG via udara.']
        },
        {
          id: 2,
          title: 'Berapa Lama Waktu Pengiriman Pesanan Saya?',
          description: [
            'Menunggu Konfirmasi Pesanan: 1 Hari Kerja',
            'Pesanan Diproses: 1-5 Hari Kerja atau bergantung pada Supplier.',
            'Pesanan Dikirim: 30 – 45 hari terhitung sejak barang Anda berangkat dari China untuk pengiriman via jalur laut, dan 7 – 14 hari untuk pengiriman via jalur udara.'
          ]
        },
        {
          id: 3,
          title: 'Apakah biaya sudah termasuk pajak impor?',
          description: ['Ya, biaya sudah termasuk pajak impor.']
        },
        {
          id: 4,
          title:
            'Apakah harga yang tertera sudah termasuk ongkos pengiriman, pajak, dan biaya lainnya?',
          description: ['Belum, harga yang tertera adalah harga yang ditentukan oleh supplier China. Total biaya barang yang ingin kamu pesan akan dihitungkan oleh admin Caribarang.id.']
        },
        {
          id: 5,
          title: 'Apakah ada garansi pengiriman barang?',
          description: [
            'Kami memiliki layanan jaminan pengembalian uang apabila barang Kamu mengalami kekurangan atau kerusakan.',
            'Syarat dan ketentuan berlaku'
          ]
        }
      ]
    }
  },
  head: {
    title: 'Lebih dekat dengan Caribarang.id',
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
  methods: {
    prev () {
      this.$refs.carousel.prev()
    },
    next () {
      this.$refs.carousel.next()
    },
    onScrollYet () {
      document.getElementById('notyet').scrollIntoView({ behavior: 'smooth' })
    },

    async fetchTestimoni () {
      const { data } = await this.$axios.get('/api/testimonials')
      this.testimoniUser = data.data
    },

    async fetchCategories () {
      try {
        const { status, data } = await this.$axios.get('/api/categories')
        if (status) {
          this.categories = data.data
        } else {
          this.categories = []
        }
      } catch (error) {
        console.log(error.message)
      }
    },

    async onSubmit () {
      if (this.payload.password !== this.payload.password_confirmation) return

      try {
        const utm = Cookie.get('utm_source') ? {
          utm_source: Cookie.get('utm_source') ? Cookie.get('utm_source') : '',
          utm_campaign: Cookie.get('utm_source') ? Cookie.get('utm_source') : '',
          utm_medium: Cookie.get('utm_source') ? Cookie.get('utm_source') : ''
        } : ''
        const params = {
          ...this.payload,
          utm
        }
        this.$store.dispatch('setLoading', true)
        const { status, message } = await this.$axios.$post(
          '/api/register',
          params
        )
        this.$store.dispatch('setLoading', false)
        if (!status) {
          this.errorMessage = message
        } else {
          window.dataLayer.push({email: this.payload.email, event: 'enhanced_conversion'})
          Cookie.set('is_signup_success', 'Signup-success')
          Cookie.set('email_verified', this.payload.email)
          this.$router.push('/auth/signup-verify')
        }
      } catch (error) {
        this.$store.dispatch('setLoading', false)
        console.log(error.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/* REMOVE ARROW/SPINNERS TOP/DOWN  */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}

.custom-inline {
  max-inline-size: max-content;
}
</style>
