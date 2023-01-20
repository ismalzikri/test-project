/* eslint-disable no-tabs */
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
import cookie from 'cookie'

export default ({ store, req }) => {
  createPersistedState({
    key: 'vuex',
    paths: [
		'carts', 
		'cartTotal', 
		'wishlists', 
		'wishlistsTotal', 
		'voucherCode', 
		'voucherName'
	],
    storage: {
      getItem: (key) => {
        if (process.server) {
          try {
            const parsedCookies = cookie.parse(req.headers.cookie)
            return parsedCookies[key]
          } catch (error) {}
        } else {
          return Cookies.get(key)
        }
      },
      setItem: (key, value) => Cookies.set(key, value, { expires: 1, secure: false }),
      removeItem: (key) => Cookies.remove(key)
    }
  })(store)
}
