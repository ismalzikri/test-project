export const state = () => ({
  currency:'Rp',
  loading:false,
  carts:[],
  wishlists:[],
  cartTotal:0,
  wishlistsTotal:0,
  voucherName:'',
  voucherCode:'',
  contentType:'1688'
})

export const mutations = {
  SET_CURRENCY (state, val) {
    let symbol = 'Rp'
    if (val === 'idr') {
      symbol = 'Rp'
    } else if (val === 'yuan') {
      symbol = '￥'
    }
    state.currency = symbol
  },

  SET_LOADING (state, val) {
    state.loading = val
  },

  SET_CART (state, val) {
    state.carts = val
  },

  SET_VOUCHER_NAME (state, val) {
    state.voucherName = val
  },

  SET_VOUCHER_CODE (state, val) {
    state.voucherCode = val
  },

  SET_CART_TOTAL (state, val) {
    state.cartTotal = val
  },

  SET_WISHLIST (state, val) {
    state.wishlists = val
  },

  SET_WISHLIST_TOTAL (state, val) {
    state.wishlistsTotal = val
  },

  SET_CONTENT_TYPE (state, val) {
    state.contentType = val
  }
}

export const actions = {
  setCurrency ({commit}, val) {
    commit('SET_CURRENCY', val)
  },

  setLoading ({commit}, val) {
    commit('SET_LOADING', val)
  },

  setCart ({commit}, val) {
    commit('SET_CART', val)
  },

  setCartTotal ({commit}, val) {
    commit('SET_CART_TOTAL', val)
  },

  setWishlist ({commit}, val) {
    commit('SET_WISHLIST', val)
  },

  setwishlistsTotal ({commit}, val) {
    commit('SET_WISHLIST_TOTAL', val)
  },

  setContentType ({commit}, val) {
    commit('SET_CONTENT_TYPE', val)
  },

  setVoucherName ({commit}, val) {
    commit('SET_VOUCHER_NAME', val)
  },

  setVoucherCode ({commit}, val) {
    commit('SET_VOUCHER_CODE', val)
  }
}

export const getters = {
  currency:state => state.currency,
  loading:state => state.loading,
  carts:state => state.carts,
  cartTotal:state => state.cartTotal,
  wishlists:state => state.wishlists,
  wishlistsTotal:state => state.wishlistsTotal,
  contentType:state => state.contentType,
  voucherName:state => state.voucherName,
  voucherCode:state => state.voucherCode
}

export const strict = false
