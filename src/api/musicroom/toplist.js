import axios from 'axios'

/**
 * @description: 获取所有榜单
 */
async function topList() {
  const { data: { list, artistToplist } } = await axios.get('http://localhost:3000/toplist')
  const tranlist = list.map(item => {
    return {
      id: item.id,
      name: item.name,
      coverImgUrl: item.coverImgUrl,
      updateTime: item.updateTime,
      playCount: item.playCount
    }
  })
  tranlist.splice(4, 0, { coverImgUrl: artistToplist.coverUrl });
  let ids = [];
  for (let i = 0; i < 4; i++) {
    ids[i] = tranlist[i].id
  }
  const top = await Promise.all([getSingleTop(ids[0]), getSingleTop(ids[1]), getSingleTop(ids[2]), getSingleTop(ids[3])]);
  const songer = await getSongerList();
  top.push(songer)
  return {
    topleft: tranlist.slice(0, 5),
    rest: tranlist.slice(5),
    topright: top
  }
}

/**
 * @description: 根据 id 获取对应榜单前五位
 * @param {*} id
 */
async function getSingleTop(id) {
  const { data: { playlist: { tracks } } } = await axios.get(`http://localhost:3000/playlist/detail?id=${id}`)
  return tracks.map(item => {
    return {
      name: item.name,
      id: item.id,
      author: item.ar.map(el => {
        return el.name
      }).join('/')
    }
  }).slice(0, 5)
}

/**
 * @description: 获取单个榜单
 * @param {*} type
 */
async function getSongerList(type = 1) {
  const { data: { list: { artists } } } = await axios.get(`http://localhost:3000/toplist/artist?type=${type}`)
  return artists.map(item => {
    return {
      name: item.name, id: item.id, picUrl: item.picUrl
    }
  }).slice(0, 5)
}

export {
  topList, getSingleTop, getSongerList
}