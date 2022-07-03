export default {
  name: 'banner',
  title: 'Banner',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'saleType',
      title: 'Sale Type',
      type: 'string'
    },
    {
      name: 'product',
      title: 'Product',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string'
    },
    {
      name: 'discount',
      title: 'Discount',
      type: 'string'
    },
    {
      name: 'buttonTxt',
      title: 'Button Text',
      type: 'string'
    },
    {
      name: 'offerDuration',
      title: 'Offer Duration',
      type: 'string'
    }
  ]
}