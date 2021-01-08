import axios from 'axios'

async function getSongerList(type = 1, area = -1, initial = -1) {
  const { data: { artists } } = await axios.get(`/artist/list?type=${type}&area=${area}&initial=${initial}`)
  return artists.map(item => {
    return {
      name: item.name, id: item.id, img1v1Url: item.img1v1Url,
    }
  })
}

export { getSongerList }