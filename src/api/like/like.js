import axios from 'axios'

async function getLikes(uid) {
  const { data: { ids } } = await axios.get(`/likelist?uid=${uid}`)
  return ids
}
//568642919
async function getLists(uid) {
  const { data: { playlist } } = await axios.get(`/user/playlist?uid=${uid}`)
  return playlist.map(item => {
    return {
      playCount: item.playCount,
      trackCount: item.trackCount,
      createTime: item.createTime,
      coverImgUrl: item.coverImgUrl,
      avatarUrl: item.creator.avatarUrl,
      nickname: item.creator.nickname
    }
  })
}

async function getSongDetail(sid) {
  const { data: { songs } } = await axios.get(`/song/detail?ids=${sid}`)
  return songs.map(item => {
    return {
      name: item.name,
      id: item.id,
      author: item.ar[0].name,
      alia: item.alia[0],
      al: item.al.name,
      picUrl: item.al.picUrl,
      dt: item.dt,
      mv: item.mv,
    }
  })
}

async function getMp3Url(id) {
  const { data: { data } } = await axios.get(`/song/url?id=${id}`)
  return {
    url: data[0].url,
    start: data[0].freeTrialInfo ? data[0].freeTrialInfo.start : undefined,
    end: data[0].freeTrialInfo ? data[0].freeTrialInfo.end : undefined
  }
}

export { getLikes, getLists, getSongDetail, getMp3Url }