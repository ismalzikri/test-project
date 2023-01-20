import Vue from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

const mixin = {
  mounted () {
    AOS.init({ once: true }, [])
  }
}

Vue.mixin(mixin)
