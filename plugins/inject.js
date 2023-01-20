export default ({ app }, inject) => {
    inject('mustNumber', (evt) => {
      evt = (evt) || window.event
      const charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
          evt.preventDefault()
      } else {
          return true
      }
    })

    inject('formatNpwp', (value) => {
        if (typeof value === 'string') {
          return value.replace(/(\d{2})(\d{3})(\d{3})(\d{1})(\d{3})(\d{3})/, '$1.$2.$3.$4-$5.$6')
        }
        return value
    })

    inject('isMobile', () => {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      return isMobile
    })
  }