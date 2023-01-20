export default {
  async allCategory ({ commit }, payload) {
    try {
      const result = await this.$axios.get(
        'api/categories?children=true'
      )
      return {
        success: true,
        data: result.data
      }
    } catch (error) {
      return {
        success: false,
        message: error.response.data
      }
    }
  }
}
