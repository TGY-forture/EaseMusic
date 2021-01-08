import axios from 'axios'

function parseNum(num) {
  let pnum = Math.trunc(num / 1000);
  let min = Math.trunc(pnum / 60);
  let sec = pnum % 60;
  return min + ":" + sec;
}

async function getNewSong(type = 0) {
  const { data: { data } } = await axios.get(`/top/song?type=${type}`)
  return data.map(item => {
    return {
      picUrl: item.album.picUrl,
      duration: parseNum(item.duration),
      name: item.name,
      artname: item.artists[0].name,
      mvid: item.mvid,
      alias: item.alias[0] ? item.alias[0] : "",
    }
  }).slice(0, 20)
}

export { getNewSong }