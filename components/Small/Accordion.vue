<template>
  <div :class="`relative ${bg} shadow-lg rounded-xl ${padding} cursor-pointer mb-6`">
    <button
      class="w-full box-border"
      :aria-expanded="isOpen"
      :aria-controls="`collapse${_uid}`"
    >
      <div class="flex" @click="toggleAccordion">
        <slot name="title" />
      </div>
    </button>
    <svg
      class="w-4 transition-all duration-200 transform absolute top-[33px] right-4"
      :class="{
        'rotate-180': isOpen,
        'rotate-0': !isOpen,
      }"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 10"
      aria-hidden="true"
    >
      <path
        d="M15 1.2l-7 7-7-7"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <div
      v-show="isOpen"
      class="w-full border-[1px] my-4"
      :class="[isCustomCondition ? 'hidden' : '']"
    >
    </div>

    <div v-show="isOpen" :id="`collapse${_uid}`">
      <slot name="content" />
    </div>

  </div>
</template>

<script>
export default {
  name: 'AccordionComponent',

  props: {
    bg:{
      type:String,
      default:'bg-white'
    },
    padding:{
      type:String,
      default:'p-6'
    },
    isCustomCondition: {
      type:Boolean
    }
  },

  data () {
    return {
      isOpen:false
    }
  },

  methods: {
    toggleAccordion () {
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style></style>
