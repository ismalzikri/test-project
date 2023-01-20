export default (url = '', title = '', description = '', image = '') => {
    url = url ? `https://caribarang.id${url}` : 'https://caribarang.id'
    const result = [
      {
        hid: 'description',
        name: 'description',
        content: description
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website'
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content:url
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: title
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: description
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content:image
      },
      {
        hid: 'twitter:url',
        name: 'twitter:url',
        content:url
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: title
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: description
      }
    ]
  
    if (image) {
      result.push({
        hid: 'og:image',
        property: 'og:image',
        content:image
      })
      result.push({
        hid: 'twitter:image',
        name: 'twitter:image',
        content:image
      })
    }
    
    return result
  }
  