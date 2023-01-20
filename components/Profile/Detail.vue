<template>
  <div>
    <div class="border-b border-gray-100 pb-2 uppercase text-sm text-gray-600">
      Detail
    </div>
    <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 py-3">
      <div class="sm:col-span-1">
        <dt class="text-sm font-medium text-gray-500">Nama</dt>
        <dd v-if="user" class="mt-1 text-xs text-gray-900 capitalize">
          {{ user ? user.name : '-' }}
        </dd>
      </div>

      <div class="sm:col-span-1">
        <dt class="text-sm font-medium text-gray-500">Email</dt>
        <dd v-if="user" class="mt-1 text-xs text-gray-900">
          {{ user.email ? user.email : '-' }}
        </dd>
      </div>

      <div class="sm:col-span-1">
        <dt class="text-sm font-medium text-gray-500">No Handphone</dt>
        <dd v-if="user" class="mt-1 text-xs text-gray-900">
          {{ user.phone ? user.phone : '-' }}
        </dd>
      </div>

      <div class="sm:col-span-1">
        <dt class="text-sm font-medium text-gray-500">Tanggal Join</dt>
        <dd v-if="user" class="mt-1 text-xs text-gray-900">
          {{ user.created_at ? user.created_at : '' | formatDateString }}
        </dd>
      </div>

      <div class="sm:col-span-1">
        <dt class="text-sm font-medium text-gray-500">Jenis Kelamin</dt>
        <dd v-if="user" class="mt-1 text-xs text-gray-900">
          {{
            user.gender == 'M'
              ? 'Laki-laki'
              : user.gender == 'W'
                ? 'Perempuan'
                : '-'
          }}
        </dd>
      </div>

      <div class="sm:col-span-1">
        <dt class="text-sm font-medium text-gray-500">Tanggal Lahir</dt>
        <dd v-if="user" class="mt-1 text-xs text-gray-900">
          {{ user.dob ? user.dob : '-' }}
        </dd>
      </div>

      <div
        v-for="(item, index) in markingCode"
        :key="index"
        class="sm:col-span-1"
      >
        <dt class="text-sm font-medium text-gray-500">
          Marking code {{ item.type }}
        </dt>
        <dd v-if="user" class="mt-1 text-xs text-gray-900">
          {{ item.marking_code }}
        </dd>
      </div>

      <div class="sm:col-span-1">
        <dt class="text-sm font-medium text-gray-500">
          Kategori yang Kamu Sukai
        </dt>
        <dd class="mt-1 text-xs text-gray-900 font-semibold">
          {{
            user && user.interestCategory && user.interestCategory.category
              ? user.interestCategory.category.name
              : '-'
          }}
        </dd>
      </div>
    </dl>
  </div>
</template>
<script>
export default {
  name: 'ProfilDetail',

  props: {
    user: {
      type: Object,
      default: () => null
    },
    markingCode: {
      type: Array,
      default: () => []
    }
  }
}
</script>
