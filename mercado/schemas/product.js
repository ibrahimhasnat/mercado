export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Product Images',
      type: 'array',
      of: [{type: 'image'}],
      options: {
        hotspot: true
      }
    },
    {
      name: 'name',
      title: 'Product Name',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug for this product',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 90,
      }
    },
    {
      name: 'price',
      title: 'Price',
      type: 'string'
    },
    {
      name: 'details',
      title: 'Product Details',
      type: 'string'
    }
  ]
}