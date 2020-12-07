import axios from 'axios'

async function getLikes(uid = 568642919) {
  const { data: { ids } } = await axios.get(`http://localhost:3000/likelist?uid=${uid}`)
  return ids
}

async function getLists(uid = 568642919) {
  const { data: { playlist } } = await axios.get(`http://localhost:3000/user/playlist?uid=${uid}`)
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
  const { data: { songs } } = await axios.get(`http://localhost:3000/song/detail?ids=${sid}`)
  return songs.map(item => {
    return {
      name: item.name,
      id: item.id,
      author: item.ar[0].name,
      alia: item.alia[0],
      al: item.al.name,
      dt: item.dt,
      mv: item.mv
    }
  })
}

export { getLikes, getLists, getSongDetail }