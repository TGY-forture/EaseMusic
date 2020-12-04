import axios from 'axios'

/**
 * @description: 电台轮播图
 */
async function djBanner() {
  const { data: { data } } = await axios.get('http://localhost:3000/dj/banner')
  return data.map(item => {
    return {
      targetid: item.targetId,
      pic: item.pic,
      typetitle: item.typeTitle
    }
  })
}
/**
 * @description: 电台种类
 */
async function djCategories() {
  const { data: { categories } } = await axios.get('http://localhost:3000/dj/catelist')
  return categories.map(item => {
    return {
      name: item.name,
      pic56x56Url: item.pic56x56Url
    }
  })
}

/**
 * @description: 付费精选
 */
async function payHighQual() {
  const { data: { data: { list } } } = await axios.get('http://localhost:3000/dj/paygift?limit=4')
  return list.map(item => {
    return {
      id: item.id,
      name: item.name,
      rcmdText: item.rcmdText,
      picUrl: item.picUrl,
      originalPrice: item.originalPrice,
      lastProgramName: item.lastProgramName,
    }
  })
}

export {
  djBanner, djCategories, payHighQual
}