import axios from "axios";

async function getAlbum() {
  const {
    data: { data },
  } = await axios.get("http://localhost:3000/album/sublist");
  return data.map((item) => {
    return {
      picUrl: item.picUrl,
      name: item.name,
      size: item.size,
      artist: item.artist[0].name,
      count: item.count
    };
  });
}

async function getSonger() {
  const {
    data: { data },
  } = await axios.get("http://localhost:3000/artist/sublist");
  return data.map((item) => {
    return {
      picUrl: item.picUrl,
      name: item.name,
      albumSize: item.albumSize,
      mvSize: item.mvSize,
      count: item.count
    };
  });
}

async function getMv() {
  const {
    data: { data },
  } = await axios.get("http://localhost:3000/mv/sublist");
  return data.map((item) => {
    return {
      title: item.title,
      durationms: item.durationms,
      playTime: item.playTime,
      coverUrl: item.coverUrl,
      name: item.creator.userName,
      vid: item.vid,
      count: item.count
    };
  });
}

export { getAlbum, getSonger, getMv };
