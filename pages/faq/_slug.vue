<template>
  <div class="bg-white">
    <NewNavbar />
    <section class="hero m-0 h-[300px] 2xl:h-[400px] w-full"></section>
    <MobileVersion
      @faq="handleFaq"
      @refund="handleRefund"
      @account="handleAccount"
      @term="handleTerm"
      @privacy="handlePrivacy"
      @contact="handleContact"
    />
    <DesktopVersion
      @faq="handleFaq"
      @refund="handleRefund"
      @account="handleAccount"
      @term="handleTerm"
      @privacy="handlePrivacy"
      @contact="handleContact"
    />
    <Footer />
  </div>
</template>

<script>
import MobileVersion from '../../components/Medium/Faq/MobileVersion.vue'
import DesktopVersion from '../../components/Medium/Faq/DesktopVersion.vue'
import NewNavbar from '../../components/Small/NewNavbar/NewNavbar.vue'
import Footer from '../../components/SimpleFooter.vue'

export default {
  name: 'IndexFaq',

  components: {
    DesktopVersion,
    MobileVersion,
    NewNavbar,
    Footer
  },
  layout: 'faq',

  head: {
    title: 'Faq Caribarang.id',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'Platform sourcing barang End-to-End dari China langsung dari pabrik. Dapatkan barang dagangan impor termurah dari supplier tangan pertama terbaik lewat Caribarang.id'
      },
      {
        rel: 'canonical',
        href: 'https://caribarang.id/faq'
      }
    ]
  },

  methods: {
    handleFaq () {
      this.$router.push({ path: '/faq' })
    },

    handleRefund () {
      this.$router.push({ path: '/faq/refund' })
    },

    handleAccount () {
      this.$router.push({ path: '/faq/account' })
    },

    handleTerm () {
      this.$router.push({ path: '/faq/term-condition' })
    },

    handlePrivacy () {
      this.$router.push({ path: '/faq/privacy-policy' })
    },

    handleContact () {
      this.$router.push({ path: '/faq/contact-us' })
    }
  }
}
</script>

<style lang="scss" scoped>
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
.hero {
  background: url('https://storage.caribarang.id/general/Admin-Caribarang-8/b9e29744-7461-4a97-b7c5-c48c73303e38.png');
  background-repeat: no-repeat;
  background-size: contain;

  @include respond(medium) {
    background: url('https://storage.caribarang.id/general/Jeffri-8/c1bb6867-5627-40a1-a789-9d19ab36cb1f.png');
    background-repeat: no-repeat;
    background-size: cover;
  }
}
</style>
