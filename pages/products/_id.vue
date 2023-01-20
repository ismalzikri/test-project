<template>
  <div>
    <div v-if="product" class="pb-3 sm:-mt-8">
      <nav class="flex justify-start items-center" aria-label="Breadcrumb">
        <ol role="list" class="flex items-center space-x-1">
          <li>
            <div class="flex items-center">
              <nuxt-link
                to="/"
                class="ml-1 text-xs sm:text-sm text-primary-color/90 hover:text-primary-color-hover capitalize"
              >Home</nuxt-link
              >
            </div>
          </li>
          <li v-for="(breadcrumb, index) in breadcrumbs" :key="index">
            <div v-if="breadcrumb.title !== ''" class="flex items-center">
              <i
                class="fas fa-angle-right flex-shrink-0 text-gray-400 text-sm m-1"
              ></i>
              <nuxt-link
                :class="{
                  'text-primary-color/90 hover:text-primary-color-hover ':
                    index !== breadcrumbs.length - 1,
                  'truncate w-[250px] hover:w-full text-gray-500  cursor-text':
                    index === breadcrumbs.length - 1,
                }"
                :to="breadcrumb.title == 'categories' ? '' : breadcrumb.path"
                class="ml-1 text-xs sm:text-sm capitalize"
                @mouseenter="isBreadcrumbHover = true"
              >{{
                index !== breadcrumbs.length - 1
                  ? breadcrumb.title
                  : product.name_en
              }}</nuxt-link
              >
            </div>
          </li>
        </ol>
      </nav>
    </div>

    <div class="w-full product-detail">
      <div class="w-full flex flex-wrap bg-white rounded-sm">
        <div v-if="product" class="product-detail-cover py-2 px-2">
          <div class="mx-auto">
            <div class="cover w-full">
              <div v-if="coverType == 'video'" class="border border-gray-200">
                <video controls muted class="videos mx-auto">
                  <source :src="cover" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <img
                v-else
                :src="cover"
                :alt="product.name_en ? product.name_en : product.name"
              />
            </div>
            <div v-if="images.length" class="mt-5 relative">
              <button
                v-if="images.length > 4"
                class="group px-1 absolute left-0 top-1/2 -translate-y-1/2 rotate-180"
                @click="prev"
              >
                <i
                  class="fas fa-angle-right text-lg text-gray-700 group-hover:text-primary-color"
                ></i>
              </button>
              <div class="block w-full px-4">
                <VueSlickCarousel
                  v-bind="carousel_setting"
                  ref="carousel"
                  class=""
                >
                  <div
                    v-for="(item, index) in images"
                    :key="index"
                    class="px-2 py-1 cursor-pointer"
                  >
                    <img
                      v-if="item.file_type == 'image'"
                      :src="item.url"
                      :alt="product.name_en ? product.name_en : product.name"
                      class="w-full ring-1 ring-gray-100 p-1 hover:ring-primary-color"
                      data-not-lazy
                      @click="onClickSlider('img', item.url)"
                    />
                    <img
                      v-else
                      class="w-full ring-1 ring-gray-100 p-1 hover:ring-primary-color"
                      src="/img/video-icon.png"
                      @click="onClickSlider('video', item.url)"
                    />
                  </div>
                </VueSlickCarousel>
              </div>
              <button
                class="group px-1 absolute right-0 top-1/2 -translate-y-1/2"
                @click="next"
              >
                <i
                  v-if="images.length > 4"
                  class="fas fa-angle-right text-lg text-gray-700 group-hover:text-primary-color"
                ></i>
              </button>
            </div>
          </div>
        </div>
        <div v-if="product" class="product-detail-content py-2 px-2">
          <h1 class="text-md text-gray-800 font-semibold capitalize">
            {{ product.name_en ? product.name_en : product.name }}
          </h1>
          <!-- price range -->
          <div
            v-if="product.price_type == 'RANGE'"
            class="grid grid-cols-3 gap-3 mt-3 bg-gray-100 px-2 py-3"
          >
            <div
              v-for="(item, index) in ranges"
              :key="index"
              class="flex flex-col text-center text-xs border-r border-gray-400 last:border-0"
            >
              <span class="text-indigo-600 font-semibold"
              >Rp {{ item.price | formatPrice }}</span
              >
              <span class="text-gray-400">
                >= {{ item.start_quantity | formatPrice }} pcs</span
              >
            </div>
          </div>

          <h2
            v-if="product.price_type === 'FIX'"
            class="text-indigo-600 text-lg font-semibold mt-5"
          >
            Rp {{ product.price | formatPrice }}
          </h2>
          <ul class="w-full text-sm text-gray-500 mt-3">
            <li
              v-if="product.price_type === 'VARIANT'"
              class="grid grid-cols-3 gap-4 py-2 mb-2"
            >
              <div>Harga mulai dari</div>
              <div class="col-span-2 text-indigo-600 text-sm">
                Rp {{ product.price | formatPrice }}
              </div>
            </li>
            <li
              class="bg-[#DAECFF] flex p-2 rounded-sm text-primary-color text-xs"
            >
              <div>
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  class="w-5 h-5 mr-2 inline bg-[#E64123] rounded-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_523_1817)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.0002 2.50004C5.85803 2.50004 2.50016 5.8579 2.50016 10C2.50016 14.1422 5.85803 17.5 10.0002 17.5C14.1423 17.5 17.5002 14.1422 17.5002 10C17.5002 5.8579 14.1423 2.50004 10.0002 2.50004ZM0.833496 10C0.833496 4.93743 4.93755 0.833374 10.0002 0.833374C15.0628 0.833374 19.1668 4.93743 19.1668 10C19.1668 15.0626 15.0628 19.1667 10.0002 19.1667C4.93755 19.1667 0.833496 15.0626 0.833496 10Z"
                      fill="#fff"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.99984 9.16663C10.4601 9.16663 10.8332 9.53972 10.8332 9.99996V13.3333C10.8332 13.7935 10.4601 14.1666 9.99984 14.1666C9.5396 14.1666 9.1665 13.7935 9.1665 13.3333V9.99996C9.1665 9.53972 9.5396 9.16663 9.99984 9.16663Z"
                      fill="#fff"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.1665 6.66671C9.1665 6.20647 9.5396 5.83337 9.99984 5.83337H10.0082C10.4684 5.83337 10.8415 6.20647 10.8415 6.66671C10.8415 7.12694 10.4684 7.50004 10.0082 7.50004H9.99984C9.5396 7.50004 9.1665 7.12694 9.1665 6.66671Z"
                      fill="#fff"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_523_1817">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              Harga yang tertera dapat berubah sewaktu-waktu dan belum termasuk
              biaya ongkir sampai rumah kamu.
            </li>
            <li class="grid grid-cols-3 gap-4 py-2 mb-2">
              <div>Min pemesanan</div>
              <div class="col-span-2 text-sm font-semibold">
                {{ product.moq }}
              </div>
            </li>
            <li
              class="bg-[#DAECFF] flex items-center p-2 rounded-sm text-primary-color text-xs"
            >
              <div>
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  class="w-5 h-5 mr-2 inline bg-[#E64123] rounded-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_523_1817)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.0002 2.50004C5.85803 2.50004 2.50016 5.8579 2.50016 10C2.50016 14.1422 5.85803 17.5 10.0002 17.5C14.1423 17.5 17.5002 14.1422 17.5002 10C17.5002 5.8579 14.1423 2.50004 10.0002 2.50004ZM0.833496 10C0.833496 4.93743 4.93755 0.833374 10.0002 0.833374C15.0628 0.833374 19.1668 4.93743 19.1668 10C19.1668 15.0626 15.0628 19.1667 10.0002 19.1667C4.93755 19.1667 0.833496 15.0626 0.833496 10Z"
                      fill="#fff"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.99984 9.16663C10.4601 9.16663 10.8332 9.53972 10.8332 9.99996V13.3333C10.8332 13.7935 10.4601 14.1666 9.99984 14.1666C9.5396 14.1666 9.1665 13.7935 9.1665 13.3333V9.99996C9.1665 9.53972 9.5396 9.16663 9.99984 9.16663Z"
                      fill="#fff"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.1665 6.66671C9.1665 6.20647 9.5396 5.83337 9.99984 5.83337H10.0082C10.4684 5.83337 10.8415 6.20647 10.8415 6.66671C10.8415 7.12694 10.4684 7.50004 10.0082 7.50004H9.99984C9.5396 7.50004 9.1665 7.12694 9.1665 6.66671Z"
                      fill="#fff"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_523_1817">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              Minimum pengiriman China - Indonesia (0.5 cbm by SEA dan 3 kg by
              AIR)
            </li>
            <li
              v-if="product.price_type === 'fix' || !variants.length"
              class="grid grid-cols-3 gap-4 py-2 mb-2"
            >
              <div>Kuantitas</div>
              <div class="col-span-2">
                <div class="flex">
                  <button
                    class="border border-gray-300 text-gray-700 rounded-md transition duration-500 ease select-none bg-gray-100 hover:bg-gray-300 focus:outline-none focus:shadow-outline px-3 py-1"
                    @click="onSetQuantity('-', null)"
                  >
                    -
                  </button>
                  <input
                    :value="productQuantity"
                    type="text"
                    class="w-12 py-1 border-gray-300 ml-1 mr-1 rounded-md text-xs text-center"
                    @input="onInputQuantity"
                    @keypress="$mustNumber"
                  />
                  <button
                    class="border border-gray-300 text-gray-700 rounded-md transition duration-500 ease select-none bg-gray-100 hover:bg-gray-300 focus:outline-none focus:shadow-outline px-3 py-1"
                    @click="onSetQuantity('+', null)"
                  >
                    +
                  </button>
                </div>
              </div>
            </li>
          </ul>

          <h4 v-if="variants.length" class="text-sm text-gray-500 my-3">
            Pilih varian
          </h4>
          <ul
            v-if="
              variants.length > 1 && product.variant_type === 'multiple_item'
            "
            class="w-full flex flex-wrap mb-5"
          >
            <li
              v-for="(item, index) in variants"
              :key="index"
              class="flex flex-wrap items-center py-1 px-1 mb-3 mr-3 cursor-pointer border-indigo-200 hover:border-2 hover:border-indigo-600 rounded-md"
              :class="[
                variantIndex == index
                  ? 'border-2 border-indigo-600 shadow-sm'
                  : 'border',
              ]"
              @click="onSetVariantIndex(index)"
            >
              <img
                v-if="item.cover"
                :src="item.cover"
                :alt="item.name_en ? item.name_en : item.name"
                class="w-10"
                :title="item.name_en ? item.name_en : item.name"
              />
              <div v-else class="text-center text-xs font-medium">
                {{ item.name_en ? item.name_en : item.name }}
              </div>
            </li>
          </ul>

          <h4
            v-if="variants.length && product.variant_type === 'multiple_item'"
            class="text-sm text-indigo-600"
          >
            {{
              variants[variantIndex].name_en
                ? variants[variantIndex].name_en
                : variants[variantIndex].name
            }}
          </h4>
          <table
            v-if="variants.length"
            class="multiple-item-desktop w-full mb-6"
          >
            <tbody>
              <tr
                v-for="(item, index) in variants[variantIndex].items"
                :key="index"
                class="bg-white text-gray-500 text-11 border-b border-gray-100"
              >
                <td
                  v-if="product.variant_type === 'single_item' && item.cover"
                  class="py-2 w-full md:w-16 px-1"
                  @click="onSetVariantItemIndex(item.cover)"
                >
                  <img
                    :width="45"
                    :src="item.cover"
                    :alt="item.name_en ? item.name_en : item.name"
                    class="border border-gray-100 px-1 py-1 cursor-pointer hover:border-1 hover:border-indigo-600 rounded-md"
                    @click="onClickSlider('img', item.cover)"
                  />
                </td>
                <td class="py-2 w-48 text-xs text-gray-900">
                  {{ item.name_en ? item.name_en : item.name }}
                </td>
                <td
                  v-if="product.price_type == 'VARIANT'"
                  class="py-2 text-indigo-600 text-xs"
                >
                  Rp {{ item.price | formatPrice }}
                </td>
                <td class="py-2 text-xs">
                  Stok: {{ item.stock | formatPrice }}
                </td>
                <td class="pl-10 py-2">
                  <div class="flex">
                    <button
                      class="border border-gray-300 text-gray-700 rounded-md transition duration-500 ease select-none bg-gray-100 hover:bg-gray-300 focus:outline-none focus:shadow-outline px-3 py-1"
                      @click="onSetQuantity('-', index)"
                    >
                      -
                    </button>
                    <input
                      :value="item.quantity"
                      type="text"
                      class="w-12 py-1 border-gray-300 ml-1 mr-1 rounded-md text-xs text-center"
                      @input="onInputQuantity($event, index)"
                      @keypress="$mustNumber"
                    />
                    <button
                      class="border border-gray-300 text-gray-700 rounded-md transition duration-500 ease select-none bg-gray-100 hover:bg-gray-300 focus:outline-none focus:shadow-outline px-3 py-1"
                      @click="onSetQuantity('+', index)"
                    >
                      +
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div v-if="variants.length" class="multiple-item-mobile mt-5">
            <div
              v-for="(item, index) in variants[variantIndex].items"
              :key="index"
              class="multiple-item-mobile__content"
            >
              <div
                class="multiple-item-mobile__content__up flex items-center mb-2.5"
                @click="onSetVariantItemIndex(item.cover)"
              >
                <figure
                  v-if="product.variant_type === 'single_item' && item.cover"
                >
                  <img
                    :src="item.cover"
                    :alt="item.name_en ? item.name_en : item.name"
                  />
                </figure>
                <p>{{ item.name_en ? item.name_en : item.name }}</p>
              </div>
              <div
                class="multiple-item-mobile__content__down flex justify-between mb-2.5"
              >
                <div class="stock-price">
                  <span v-if="product.price_type == 'VARIANT'"
                  >Rp {{ item.price | formatPrice }}</span
                  >
                  <span>Stok: {{ item.stock | formatPrice }}</span>
                </div>
                <div class="button-range">
                  <button @click="onSetQuantity('-', index)">
                    <span>-</span>
                  </button>
                  <input
                    type="text"
                    :value="item.quantity"
                    @input="onInputQuantity($event, index)"
                    @keypress="$mustNumber"
                  />
                  <button @click="onSetQuantity('+', index)">
                    <span>+</span>
                  </button>
                </div>
              </div>
              <hr class="mb-3" />
            </div>
          </div>
          <div class="text-xs">
            <div>
              <span class="opacity-75">Cara Pemesanan di</span>
              <span class="text-primary-color">CariBarang</span>
            </div>
            <div
              class="mt-3 bg-[#DAECFF] grid grid-cols-1 md:flex md:justify-between gap-1 pb-3 pt-4 px-10 text-xs rounded-sm"
            >
              <div class="flex flex-col gap-2 items-center justify-start">
                <div class="relative">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M34.6561 23.6136C33.2333 22.1117 31.3362 21.0841 29.36 20.6889C28.4905 20.4517 27.621 20.2937 26.7514 20.2146C28.9648 17.6061 28.5695 13.6537 25.961 11.4404C23.3524 9.22708 19.4001 9.62231 17.1868 12.2309C14.9734 14.8394 15.3687 18.7918 17.9772 21.0051C18.4515 21.4003 18.9258 21.7165 19.4001 21.8746V23.6136L18.1353 22.4279C17.0287 21.3213 15.2106 21.3213 14.0249 22.4279C12.9182 23.5346 12.8392 25.2736 13.9458 26.3803L17.582 30.6488C17.7401 31.7555 18.1353 32.7831 18.6886 33.7316C19.0839 34.4431 19.6372 35.1545 20.1905 35.7078V37.2097C20.1905 37.684 20.5067 38.0002 20.981 38.0002H31.7314C32.1266 38.0002 32.5219 37.6049 32.5219 37.2097V35.1545C34.0238 33.3364 34.8142 31.044 34.8142 28.7517V24.167C34.8933 23.8508 34.8142 23.6927 34.6561 23.6136ZM17.2658 16.1832C17.2658 13.5747 19.4001 11.5194 22.0086 11.5985C24.6172 11.5985 26.6724 13.7328 26.5933 16.3413C26.5933 17.7642 25.961 19.0289 24.8543 19.8984V15.9461C24.8139 15.261 24.5131 14.6174 24.0134 14.1471C23.5136 13.6767 22.8529 13.4154 22.1667 13.4166C20.7439 13.3375 19.4791 14.5232 19.4791 15.9461V20.0565C18.1353 19.266 17.3448 17.7642 17.2658 16.1832ZM33.3123 28.6726C33.3914 30.7279 32.68 32.704 31.3362 34.285C31.1781 34.4431 31.02 34.6012 31.02 34.8383V36.4983H21.8505V35.3916C21.8505 35.1545 21.6924 34.9174 21.5343 34.7593C20.981 34.285 20.5067 33.7316 20.1115 33.0202C19.6372 32.2298 19.321 31.2812 19.1629 30.3326C19.1629 30.1745 19.0839 30.0164 19.0048 29.8583L15.2106 25.3527C14.9734 25.1155 14.8153 24.7993 14.8153 24.4041C14.8153 24.0879 14.9734 23.6927 15.2106 23.4555C15.7639 22.9813 16.5544 22.9813 17.1077 23.4555L19.4001 25.7479V28.1193L20.902 27.3288V15.9461C20.981 15.3927 21.4553 14.9185 22.0877 14.9975C22.641 14.9975 23.1943 15.3927 23.1943 15.9461V25.0365L24.7753 25.3527V21.7165C24.8543 21.6375 24.9334 21.6375 25.0124 21.5584C25.5657 21.5584 26.1191 21.6375 26.6724 21.7165V25.7479L27.9371 25.985V21.8746L28.8857 22.1117C29.2809 22.1908 29.6762 22.3489 30.0714 22.507V26.4593L31.3362 26.6965V23.0603C32.0476 23.3765 32.68 23.8508 33.2333 24.4041L33.3123 28.6726Z"
                      fill="#0E4E9B"
                    />
                    <rect
                      x="1"
                      y="1.00018"
                      width="46"
                      height="46"
                      rx="23"
                      stroke="#0E4E9B"
                      stroke-width="2"
                    />
                  </svg>
                  <div
                    class="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center absolute -left-3 top-0 text-white"
                  >
                    1
                  </div>
                </div>
                <p class="text-center text-primary-color">
                  Pilih Barang<br />
                  Dagangan
                </p>
              </div>
              <hr
                class="w-12 border-b-[1px] border-primary-color my-3 mx-auto md:mx-0 md:my-auto"
              />
              <div class="flex flex-col gap-2 items-center justify-start">
                <div class="relative">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <rect
                      x="6"
                      y="6.00018"
                      width="36"
                      height="36"
                      fill="url(#pattern0)"
                    />
                    <rect
                      x="1"
                      y="1.00018"
                      width="46"
                      height="46"
                      rx="23"
                      stroke="#0E4E9B"
                      stroke-width="2"
                    />
                    <defs>
                      <pattern
                        id="pattern0"
                        patternContentUnits="objectBoundingBox"
                        width="1"
                        height="1"
                      >
                        <use
                          xlink:href="#image0_523_1876"
                          transform="translate(0 -0.000479846) scale(0.000959693)"
                        />
                      </pattern>
                      <image
                        id="image0_523_1876"
                        width="1042"
                        height="1043"
                        xlink:href="https://storage.caribarang.id/general/Jeffri-8/b603928d-bb51-4947-a9d6-706b59e4dbff.webp"
                      />
                    </defs>
                  </svg>
                  <div
                    class="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center absolute -left-3 top-0 text-white"
                  >
                    2
                  </div>
                </div>
                <p class="text-center text-primary-color">Pilih Pembayaran</p>
              </div>
              <hr
                class="w-12 border-b-[1px] border-primary-color my-3 mx-auto md:mx-0 md:my-auto"
              />
              <div class="flex flex-col gap-2 items-center justify-start">
                <div class="relative">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24.7199 14.042C24.5189 13.8711 24.2637 13.7772 23.9998 13.7772C23.7359 13.7772 23.4807 13.8711 23.2797 14.042L14.612 21.41C14.4893 21.5144 14.3907 21.6443 14.3232 21.7906C14.2557 21.9369 14.2207 22.0961 14.2209 22.2572V33.7777C14.2209 33.8956 14.2677 34.0086 14.351 34.092C14.4344 34.1754 14.5475 34.2222 14.6654 34.2222H19.1103C19.2282 34.2222 19.3413 34.1754 19.4246 34.092C19.508 34.0086 19.5548 33.8956 19.5548 33.7777V27.5547C19.5548 26.9653 19.789 26.4 20.2058 25.9832C20.6226 25.5664 21.1879 25.3323 21.7773 25.3323H25.7778C26.0696 25.3323 26.3586 25.3897 26.6283 25.5014C26.8979 25.6131 27.1429 25.7768 27.3493 25.9832C27.5557 26.1896 27.7194 26.4346 27.8311 26.7042C27.9428 26.9739 28.0003 27.2629 28.0003 27.5547V33.7777C28.0003 33.8956 28.0471 34.0086 28.1305 34.092C28.2138 34.1754 28.3269 34.2222 28.4448 34.2222H33.3342C33.4521 34.2222 33.5652 34.1754 33.6485 34.092C33.7319 34.0086 33.7787 33.8956 33.7787 33.7777V22.2563C33.7787 22.0954 33.7437 21.9363 33.6762 21.7902C33.6087 21.644 33.5102 21.5143 33.3876 21.41L24.7199 14.0429V14.042ZM22.1285 12.6881C22.6509 12.244 23.3141 12.0002 23.9998 12.0002C24.6854 12.0002 25.3487 12.244 25.8711 12.6881L34.5388 20.0552C34.8578 20.3264 35.1141 20.6637 35.2899 21.0438C35.4656 21.4239 35.5567 21.8376 35.5567 22.2563V33.7777C35.5567 34.3671 35.3226 34.9324 34.9058 35.3492C34.489 35.766 33.9237 36.0002 33.3342 36.0002H28.4448C27.8553 36.0002 27.29 35.766 26.8732 35.3492C26.4564 34.9324 26.2223 34.3671 26.2223 33.7777V27.5547C26.2223 27.4369 26.1754 27.3238 26.0921 27.2404C26.0087 27.1571 25.8957 27.1102 25.7778 27.1102H21.7773C21.6594 27.1102 21.5464 27.1571 21.463 27.2404C21.3796 27.3238 21.3328 27.4369 21.3328 27.5547V33.7777C21.3328 34.3671 21.0987 34.9324 20.6819 35.3492C20.2651 35.766 19.6998 36.0002 19.1103 36.0002H14.6654C14.0759 36.0002 13.5106 35.766 13.0938 35.3492C12.677 34.9324 12.4429 34.3671 12.4429 33.7777V22.2563C12.4429 21.8376 12.5339 21.4239 12.7097 21.0438C12.8855 20.6637 13.1417 20.3264 13.4608 20.0552L22.1285 12.6881Z"
                      fill="#0E4E9B"
                    />
                    <rect
                      x="1"
                      y="1.00018"
                      width="46"
                      height="46"
                      rx="23"
                      stroke="#0E4E9B"
                      stroke-width="2"
                    />
                  </svg>
                  <div
                    class="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center absolute -left-3 top-0 text-white"
                  >
                    3
                  </div>
                </div>
                <p class="text-center text-primary-color">
                  Tunggu Pesanan<br />
                  Sampai di Rumah
                </p>
              </div>
            </div>
          </div>
          <div class="w-full py-6">
            <div v-show="errorMessage" class="py-2">
              <cb-alert
                title="Error"
                icon="fas fa-exclamation-triangle"
                color="warning"
              >
                <p>{{ errorMessage }}</p>
              </cb-alert>
            </div>
            <div class="py-1 flex items-center">
              <cb-button
                color="primary"
                icon="fas fa-shopping-cart"
                button="button"
                label="Tambah Ke keranjang"
                @click="onAddToCart"
              />
              <cb-button
                color="pink"
                icon="fas fa-heart"
                button="button"
                label="Favorit"
                class="ml-5"
                @click="onAddToWishlist"
              />
            </div>
            <div class="pt-5">
              <a
                :href="`https://detail.1688.com/offer/${product.product_id_1688}.html`"
                target="_blank"
                class="text-indigo-600 font-bold whitespace-nowrap hover:text-indigo-500 text-xs hover:underline"
              >
                Lihat di 1688
              </a>
            </div>
          </div>
        </div>
        <div
          class="product-detail-summary py-2 px-2 bg-blue-100 text-sm text-gray-600"
        >
          <h2 class="text-lg">Ringkasan Harga</h2>
          <ul class="w-full py-5">
            <li class="grid grid-cols-2 gap-1 text-xs py-2">
              <span class="">Harga Produk X {{ productQuantity }}</span>
              <span class="text-right"
              >Rp {{ productPrice | formatPrice }}</span
              >
            </li>
            <li class="grid grid-cols-2 gap-1 text-xs py-2">
              <span class="">Handling Fee 5%</span>
              <span class="text-right"
              >Rp {{ (productPrice * 0.05) | formatPrice }}</span
              >
            </li>
            <li class="grid grid-cols-2 gap-1 text-xs py-2 relative">
              <span class="">Ongkir Lokal China</span>
              <Tooltip
                title="Ongkir lokal China"
                content="Biaya pengiriman dari seller ke gudang caribarang.id di China. Biaya ini akan tersedia di halaman checkout setelah admin kami menghitung berat atau volume barang yang kamu pesan"
              />
            </li>
            <li class="grid grid-cols-2 gap-1 text-xs py-2 relative">
              <span class="">Ongkir China ke Indonesia</span>
              <Tooltip
                title="Ongkir China ke Indonesia"
                content="Biaya pengiriman dari China ke Indonesia akan dihitungkan oleh admin kami setelah anda membuat orderan, Biaya ini di tagihkan pada saat barang yang kamu pesan telah sampai di Indonesia"
              />
            </li>
          </ul>
        </div>
      </div>

      <div v-if="product" class="w-full flex flex-col bg-white mt-6">
        <div class="flex w-full flex-col bg-white mt-6 py-3 px-3">
          <div class="w-1/4 text-right text-13 font-semibold">
            <h2 class="text-sm font-semibold text-gray-500 pt-3">
              Informasi Umum
            </h2>
          </div>
          <ul class="w-full text-12 pt-2 pb-4 border-b border-gray-200">
            <li v-if="category" class="w-full flex p-2">
              <div class="w-1/4 text-gray-400 text-right text-xs">Kategori</div>
              <div class="w-3/4 ml-6 text-gray-800 text-xs">
                {{ category.name_en ? category.name_en : category.name }}
              </div>
            </li>
            <li class="w-full flex p-2">
              <div class="w-1/4 text-gray-400 text-right text-xs">Berat</div>
              <div class="w-3/4 ml-6 text-gray-800 text-xs">
                {{ product.weight }} gr
              </div>
            </li>
            <li class="w-full flex p-2">
              <div class="w-1/4 text-gray-400 text-right text-xs">
                Minimum Pemesanan
              </div>
              <div class="w-3/4 ml-6 text-gray-800 text-xs">
                {{ product.moq }}
              </div>
            </li>
            <li v-if="product.seller" class="w-full flex p-2">
              <div class="w-1/4 text-gray-400 text-right text-xs">Supplier</div>
              <NuxtLink
                class="w-3/4 ml-6 text-xs text-indigo-600 hover:text-indigo-700"
                :to="`/products/supplier/${product.seller.seller_id_1688}?ref=${product.seller.name}`"
                target="_blank"
              >
                {{
                  product.seller.name_en
                    ? product.seller.name_en
                    : product.seller.name
                }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div class="w-full flex bg-white">
          <div class="flex w-full flex-col bg-white mt-6 py-3 px-3">
            <div class="w-1/4 text-right text-13 font-semibold">
              <h2 class="text-sm font-semibold text-gray-500 pt-3">
                Deskripsi
              </h2>
            </div>
            <ul class="w-full text-12 pt-2 pb-4 border-b border-gray-200">
              <li class="w-full flex p-2">
                <div class="w-1/4 text-gray-400 text-right text-xs">Detail</div>
                <div
                  class="w-3/4 ml-6 text-gray-800 text-xs overflow-hidden"
                  :class="[toggleNote ? '' : 'max-h-80']"
                  v-html="note"
                ></div>
              </li>
              <li class="w-full flex p-2">
                <div class="w-1/4 text-gray-400 text-right text-xs"></div>
                <div class="w-3/4 ml-6 text-gray-800">
                  <a
                    href="javascript:;"
                    class="text-indigo-600 font-semibold text-sm underline hover:text-indigo-400 hover:no-underline"
                    @click="toggleNote = !toggleNote"
                  >
                    {{ toggleNote ? 'Kecilkan' : 'Lihat Semuanya' }}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <popup-alert
        v-show="errorResponse"
        title="Produk tidak tesedia"
        message="Untuk sementara produk ini kehabisan stock"
        @confirm="onConfirmError"
      />
    </div>
    <MediumProductsSeller :data="product" />
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import { mapState, mapActions } from 'vuex'
import CbAlert from '~/components/Basic/Alert.vue'
import Tooltip from '~/components/Basic/Tooltip.vue'
import metaConfig from '~/helpers/meta.js'
import CbButton from '~/components/Basic/Button.vue'
import PopupAlert from '~/components/Basic/PopupAlert.vue'
const _ = require('lodash')
export default {
  name: 'ProductDetail',
  components: {
    VueSlickCarousel,
    CbAlert,
    Tooltip,
    CbButton,
    PopupAlert
  },
  middleware ({ store, redirect }) {
    if (store.state.auth.loggedIn && !store.state.auth.user.phone) {
      return redirect('/profile/edit')
    }
  },
  async asyncData ({ $config: { productDetailHost }, route, $axios, error }) {
    try {
      const productId = route.params.id
      if (typeof productId === 'undefined') return error({ statusCode: 404, message: '' })
      const { status, message } = await $axios.$get(
        `${productDetailHost}/api/product/${productId}`
      )
      if (!status) {
        return { errorResponse: !status, title: 'Produk tidak tersedia' }
      }
      const errorResponse = !status
      const note = message.note.length ? message.note[0].note : ''
      const images = message.images
      const coverType = images.length ? images[0].file_type : ''
      let variants = message.variants
      if (message.variant_type === 'single_item') {
        const c = _.flatten(
          message.variants.map((x) => {
            x.items[0].cover = x.cover
            return x.items[0]
          })
        )
        variants = [
          {
            id: message.variants[0].id,
            product_id: message.variants[0].product_id,
            name: message.variants[0].name,
            name_en: message.variants[0].name_en,
            cover: message.variants[0].cover,
            items: c
          }
        ]
      }
      const category = message.category
      const product = message
      const ranges = message.ranges
      const cover =
        images.length && images[0].file_type === 'video' ? images[0].url : message.cover
      const title = product.name_en ? product.name_en : product.name
      variants.map((x) => {
        x.items.map((y) => {
          y.quantity = 0
          return y
        })
        return x
      })
      const meta = metaConfig(
        `/products/${product.uuid}`,
        title,
        `Caribarang produk - ${product.name}`,
        cover
      )
      return {
        product,
        note,
        images,
        variants,
        category,
        ranges,
        cover,
        coverType,
        meta,
        title,
        errorResponse
      }
    } catch (error) {
      console.log(error.message)
      throw error
    }
  },
  data () {
    return {
      isBreadcrumbHover: false,
      carousel_setting: {
        dots: false,
        focusOnSelect: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        touchThreshold: 5,
        arrows: false
      },
      product: null,
      images: [],
      variants: [],
      category: null,
      ranges: [],
      note: '',
      variantIndex: 0,
      productPrice: 0,
      productQuantity: 0,
      variantOrder: [],
      cover: '',
      coverType: 'img',
      toggleNote: false,
      errorMessage: '',
      errorResponse: false
    }
  },
  head () {
    return {
      title: `${this.title} | caribarang.id`,
      meta: this.meta
    }
  },
  computed: {
    ...mapState({
      carts: (state) => state.carts,
      cartTotal: (state) => state.cartTotal,
      wishlists: (state) => state.wishlists,
      wishlistsTotal: (state) => state.wishlistsTotal,
      isLogin: (state) => state.auth.loggedIn
    }),

    breadcrumbs () {
      const fullPath = this.$route.path
      const params = fullPath.startsWith('/') ? fullPath.substring(1).split('/') : fullPath.split('/')
      const breadcrumbs = []
      let path = ''
      params.forEach((param, index) => {
        path = `${path}/${param}`
        const match = this.$router.match(path)
        if (match.name !== null) {
          breadcrumbs.push({
            title: param.replace(/-/g, ' '),
            ...match
          })
        }
      })

      return breadcrumbs
    }
  },
  methods: {
    ...mapActions({
      setCart: 'setCart',
      setCartTotal: 'setCartTotal',
      setWishlist: 'setWishlist',
      setwishlistsTotal: 'setwishlistsTotal'
    }),
    prev () {
      this.$refs.carousel.prev()
    },
    next () {
      this.$refs.carousel.next()
    },
    onSetQuantity (arg, index) {
      // if price type fix or variant empty
      if (index === null) {
        this.productQuantity =
          this.productQuantity === '' ? 0 : this.productQuantity
        if (arg === '+') {
          this.productQuantity = parseInt(this.productQuantity) + 1
        } else {
          this.productQuantity =
            this.productQuantity === 0 ? 0 : parseInt(this.productQuantity) - 1
        }
        return this.calculatePrice()
      }
      const items = this.variants[this.variantIndex].items[index]
      items.quantity = items.quantity === '' ? 0 : items.quantity
      if (arg === '+') {
        if (parseInt(items.quantity) === parseInt(items.stock)) {
          items.quantity = items.stock
        } else {
          items.quantity = parseInt(items.quantity) + 1
        }
      } else if (arg === '-') {
        if (items.quantity !== 0) {
          items.quantity = parseInt(items.quantity) - 1
        }
      }
      return this.setVariantOrder(items)
    },
    onInputQuantity (e, index = null) {
      const val = e.target.value
      if (!val) return ''
      if (index === null) {
        this.productQuantity = parseInt(val)
        return this.calculatePrice()
      } else {
        const items = this.variants[this.variantIndex].items[index]
        items.quantity = parseInt(val)
        return this.setVariantOrder(items)
      }
    },
    setVariantOrder (item) {
      const checkIndex = this.variantOrder.findIndex(
        (x) => x.sku_id === item.sku_id
      )
      if (checkIndex < 0) {
        this.variantOrder.push(item)
      } else if (item.quantity <= 0) {
        this.variantOrder.splice(checkIndex, 1)
      } else {
        this.variantOrder[checkIndex].quantity = item.quantity
      }
      this.setOrderQuantity()
      return this.calculatePrice()
    },
    setOrderQuantity () {
      this.productQuantity = _.sumBy(this.variantOrder, (x) => x.quantity)
    },
    calculatePrice () {
      if (this.product.price_type === 'VARIANT') {
        this.productPrice = _.sumBy(this.variantOrder, (x) => {
          const a = x.price * x.quantity
          return a
        })
      } else if (this.product.price_type === 'RANGE') {
        let price = this.ranges.find(
          (x) => x.start_quantity >= this.productQuantity
        )
        if (typeof price === 'undefined') {
          price = this.ranges[this.ranges.length - 1]
        }
        this.productPrice = this.productQuantity * price.price
      } else if (this.product.price_type === 'FIX') {
        this.productPrice =
          this.productQuantity * parseFloat(this.product.price)
      }
    },
    onSetVariantIndex (index) {
      this.variantIndex = index
      const variant = this.variants[index]
      if (variant.cover) {
        this.cover = variant.cover.replace('60x60', '400x400')
        this.coverType = 'img'
      }
    },
    onSetVariantItemIndex (cover) {
      if (cover) {
        this.cover = cover.replace('60x60', '400x400')
        this.coverType = 'img'
      }
    },
    onClickSlider (arg, url) {
      this.coverType = arg === 'img' ? 'img' : 'video'
      this.cover = url
    },
    onAddToCart () {
      this.errorMessage = ''
      if (this.productQuantity < this.product.moq) {
        this.errorMessage = `Minimal pembelian produk ini adalah:${this.product.moq}`
        return
      }
      const paramsCart = {
        product_uuid: this.product.uuid,
        quantity: this.productQuantity
      }
      if (this.product.variant_type !== 'no_variant') {
        paramsCart.type = this.product.variant_type
        paramsCart.orders = this.variantOrder.map((x) => {
          return {
            id: x.id,
            product_variant_id: x.product_variant_id,
            quantity: x.quantity,
            spec_id: x.spec_id
          }
        })
      } else {
        paramsCart.type = this.product.variant_type
      }
      if (this.isLogin) return this.postCart(paramsCart)
      return this.$router.push('/signin')
    },
    onAddToWishlist () {
      const wishlistParams = {
        product_uuid: this.product.uuid
      }
      if (this.isLogin) return this.postWishlist(wishlistParams)
      return this.$router.push('/signin')
    },
    async postCart (params) {
      try {
        this.$store.dispatch('setLoading', true)
        const { status, message } = await this.$axios.$post(
          '/api/carts',
          params
        )
        this.$store.dispatch('setLoading', false)

        if (!status && message.includes('Undefined property')) {
          return this.$swal.fire('Error!', 'Mohon maaf produk ini tidak dapat dibeli karena belum diperbarui', 'danger')
        } else {
          this.$swal.fire('Error!', message, 'danger')
        }

        const carts = this.carts
        const paramsCart = {
          product_cover: message.product_cover,
          product_name: message.product_name,
          total_quantity: message.total_quantity
        }
        if (carts.length >= 3) {
          carts.splice(2, 1)
          carts.unshift(paramsCart)
        } else if (carts.length === 0) {
          carts.push(paramsCart)
        } else {
          carts.unshift(paramsCart)
        }
        this.setCart(carts)
        this.setCartTotal(parseInt(this.cartTotal) + 1)
        this.$swal
          .fire({
            icon: 'success',
            title: 'Berhasil',
            text: 'Produk telah ditambahkan ke keranjang',
            confirmButtonText: 'Lanjut belanja',
            showCancelButton: true,
            cancelButtonText: 'Lihat keranjang'
          })
          .then((result) => {
            if (result.value) {
              this.$router.push('/')
            } else {
              this.$router.push('/cart')
            }
          })
      } catch (error) {
        this.$store.dispatch('setLoading', false)
        throw error
      }
    },
    async postWishlist (params) {
      try {
        this.$store.dispatch('setLoading', true)
        const { status, message } = await this.$axios.$post(
          '/api/wishlists',
          params
        )
        this.$store.dispatch('setLoading', false)
        if (!status) return this.$swal.fire('Info!', message)
        const wishlists = this.wishlists
        const paramsWishlist = {
          product_cover: message.product_cover,
          product_name: message.product_name
        }
        if (wishlists.length >= 3) {
          wishlists.splice(2, 1)
          wishlists.unshift(paramsWishlist)
        } else if (wishlists.length === 0) {
          wishlists.push(paramsWishlist)
        } else {
          wishlists.unshift(paramsWishlist)
        }
        this.setWishlist(wishlists)
        this.setwishlistsTotal(parseInt(this.wishlistsTotal) + 1)
        this.$swal.fire(
          'Sukses!',
          'Barang berhasil di simpan di wishlist',
          'success'
        )
      } catch (error) {
        this.$store.dispatch('setLoading', false)
        this.$swal.fire('Error!', error.message, 'danger')
      }
    },
    onConfirmError () {
      this.errorResponse = false
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss">
@mixin respond($breakpoint) {
  @if ($breakpoint == medium) {
    @media (min-width: 768px) {
      @content;
    }
  }
  @if ($breakpoint == large) {
    @media (min-width: 1024px) {
      @content;
    }
  }
}
.product {
  &-detail {
    &-cover {
      width: 30%;
    }
    &-content {
      width: 45%;
      .multiple-item-desktop {
        display: none;
        @include respond(medium) {
          display: block;
        }
      }
      .multiple-item-mobile {
        display: block;
        @include respond(medium) {
          display: none;
        }
        &__content__up {
          figure {
            width: 47px;
            height: 47px;
            margin-right: 22px;
            border: 1px solid #0f0e0e4d;
            border-radius: 5px;
            img {
              width: 100%;
              height: auto;
              border-radius: 5px;
            }
          }
          p {
            width: 240px;
            font-size: 12px;
            font-weight: 400;
            font-style: normal;
          }
        }
        &__content__down {
          .stock-price {
            display: flex;
            align-items: center;
            span {
              font-size: 11px;
              font-weight: 600;
              color: #5a5454;
              margin-right: 10px;
            }
          }
          .button-range {
            display: flex;
            align-items: center;
            button {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 25px;
              height: 25px;
              border-radius: 4px;
              background: #efeded;
              margin-right: 12px;
              margin-left: 12px;
              span {
                padding: 0px 8px 1px 8px;
              }
            }
            input {
              width: 60px;
              padding: 0;
              border: 1px solid #d6d2d2;
              border-radius: 5px;
              text-align: center;
              font-size: 12px;
              color: #868484;
            }
          }
        }
      }
    }
    &-summary {
      width: 25%;
    }
    .text-11 {
      font-size: 11px;
    }
    .slick-prev {
      left: -8px;
      color: rgb(156, 163, 175) !important;
      z-index: 1;
      background-color: #0f0e0e4d;
    }
    .slick-next {
      right: -8px;
      color: rgb(156, 163, 175) !important;
      z-index: 1;
      background-color: #0f0e0e4d;
    }
    .videos {
      max-width: 100%;
      height: 240px;
      margin: auto;
    }
  }
}
@media only screen and (max-width: 900px) {
  .product {
    &-detail {
      &-cover {
        width: 100%;
      }
      &-content {
        width: 100%;
      }
      &-summary {
        width: 100%;
      }
    }
  }
}
</style>
