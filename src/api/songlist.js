import axios from "axios";

/**
 * @description: 获取歌单分类标签
 */
async function songCategory() {
  const {
    data: { sub, categories },
  } = await axios.get("http://localhost:3000/playlist/catlist");
  const subcat = sub.map((item) => {
    return {
      name: item.name,
      category: item.category,
      hot: item.hot,
    };
  });
  return {
    categories,
    subcat,
  };
}
/**
 * @description: 获取热门标签
 */
async function hotCategory() {
  const {
    data: { tags },
  } = await axios.get("http://localhost:3000/playlist/hot");
  return tags.map((item) => {
    return {
      name: item.name,
      id: item.id,
    };
  });
}

/**
 * @description: 获取精品歌单
 * @param {*} category
 * @param {*} limit
 * @param {*} uptime
 */
async function highQuality(category, limit = 1, uptime) {
  const {
    data: { playlists },
  } = await axios.get(
    `http://localhost:3000/top/playlist/highquality?cat=${category}&limit=${limit}` + (uptime ? `&before=${uptime}` : "")
  );
  return playlists.map(item => {
    return {
      name: item.name,
      id: item.id,
      updateTime: item.updateTime,
      playCount: item.playCount,
      coverImgUrl: item.coverImgUrl,
      icon: item.creator.avatarDetail?.identityIconUrl,
      copywriter: item.copywriter,
      tag: item.tag
    }
  })
}

/**
 * @description: 获取歌曲列表
 * @param {*} cat
 * @param {*} limit
 * @param {*} offset
 */
async function playLists(cat, limit = 52, offset = 1) {
  const { data: { playlists } } = await axios.get(`http://localhost:3000/top/playlist?cat=${cat}&limit=${limit}&offset=${offset}`)
  return playlists.map(item => {
    return {
      name: item.name,
      id: item.id,
      playCount: item.playCount,
      coverImgUrl: item.coverImgUrl,
      icon: item.creator.avatarDetail?.identityIconUrl,
      nickname: item.creator.nickname,
    }
  })
}

export { songCategory, hotCategory, highQuality, playLists };