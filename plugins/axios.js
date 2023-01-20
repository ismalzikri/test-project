// import * as Cookies from 'js-cookie'
export default function ({ app, $axios, error: nuxtError}) {

  
    $axios.onError(error => {
      let message = error.message
      if (!error.response) message = 'Connection error'
      if (error.response !== 'undefined' && error.response.status !== 'undefined') {
        const code = parseInt(error.response && error.response.status)
        if (code === 401) {
          return app.$auth.logout()
        }
          nuxtError({
            statusCode: typeof error.response.status !== 'undefined' ? error.response.status : 500,
            message
          })
        return Promise.resolve(error)
      }
      
    })
  
  }