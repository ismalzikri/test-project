import axios from 'axios'
const host = process.env.API_HOST
const products = async () => {
    try {
        const {data} = await axios.get(`${host}/api/sitemap`)
        const result = []
        const category = data.categories.map(x => `/categories/${x.slug}`)
        const product = data.products.map(x => `/products/${x.uuid}`)
        
        result.push(...category)
        result.push(...product)
       return result
    } catch (error) {
        console.log(error.message, 'mess')
        return []
    }
}

export {
    products
}