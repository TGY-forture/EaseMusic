import axios from 'axios'

async function getVideoLabel() {
  const { data: { data } } = await axios.get('/video/group/list')
  return data.map(item => {
    return {
      name: item.name,
      id: item.id
    }
  })
}

async function getVideoKind() {
  const { data: { data } } = await axios.get('/video/category/list')
  return data.map(item => {
    return {
      name: item.name,
      id: item.id
    }
  })
}

async function getVideoLists(id, offset = 0) {
  const { data: { datas } } = await axios.get(`/video/group?id=${id}&offset=${offset}`)
  return datas.map(({ data }) => {
    return {
      coverUrl: data.coverUrl,
      title: data.title,
      nickname: data.creator.nickname,
      previewUrl: data.previewUrl,
      durationms: data.durationms,
      playTime: data.playTime,
      vid: data.vid,
      width: data.width,
      height: data.height
    }
  })
}


export {
  getVideoLabel, getVideoKind, getVideoLists
}