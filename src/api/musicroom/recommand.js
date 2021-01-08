import axios from "axios";

/**
 * @description: 获取每日推荐页轮播图数据
 */
async function getReBanner() {
  const {
    data: { banners },
  } = await axios.get("/banner");
  return banners.map((item) => {
    return {
      imageUrl: item.imageUrl,
      targetId: item.targetId,
      titleColor: item.titleColor,
      typeTitle: item.typeTitle,
      url: item.url,
    };
  });
}
/**
 * @description: 个性推荐音乐
 */
async function getDailyReList() {
  const {
    data: { result },
  } = await axios.get("/personalized?limit=9");
  return result.map((item) => {
    return {
      id: item.id,
      name: item.name,
      copywriter: item.copywriter,
      picUrl: item.picUrl,
      playCount: item.playCount,
    };
  });
}
/**
 * @description: 独家放送
 */
async function privateContent() {
  const {
    data: { result },
  } = await axios.get("/personalized/privatecontent");
  return result.map((item) => {
    return {
      id: item.id,
      url: item.url,
      spicUrl: item.sPicUrl,
      name: item.name,
      copywriter: item.copywriter,
    };
  });
}
/**
 * @description: 最新音乐
 */
async function getNewSongs() {
  const {
    data: { data },
  } = await axios.get("/top/song?type=0");
  return data.map((item) => {
    return {
      picUrl: item.album.picUrl,
      mp3Url: item.mp3Url,
      duration: item.duration,
      mvid: item.mvid,
      alias: item.alias[0],
      name: item.name,
      id: item.id,
      artists: item.artists.map((item) => {
        return item.name
      }).join('/')
    };
  });
}

/**
 * @description: 推荐mv
 */
async function getReMv() {
  const { data: { result } } = await axios.get('/personalized/mv')
  return result.map((item) => {
    return {
      id: item.id,
      name: item.name,
      copywriter: item.copywriter,
      picUrl: item.picUrl,
      duration: item.duration,
      artistName: item.artistName,
      playCount: item.playCount
    }
  })
}

/**
 * @description: 主播电台
 */
async function getReDj() {
  const { data: { data } } = await axios.get('/dj/personalize/recommend')
  return data.map((item) => {
    return {
      id: item.id,
      name: item.name,
      dj: item.dj,
      picUrl: item.picUrl,
      rcmdtext: item.rcmdtext
    }
  })
}

export { getReBanner, getDailyReList, getReDj, privateContent, getNewSongs, getReMv };
