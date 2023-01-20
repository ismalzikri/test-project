export default {
  async mediaPartnersList ({ commit }, payload) {
    try {
      const result = await this.$axios.get('/api/media-partners')
      return result.data
    } catch (error) {
      return error.response.data
    }
  }
}
