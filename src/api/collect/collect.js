import axios from "axios";

async function getAlbum() {
  const {
    data: { data, count },
  } = await axios.get("http://localhost:3000/album/sublist");
  const info = data.map((item) => {
    return {
      picUrl: item.picUrl,
      name: item.name,
      size: item.size,
      artist: item.artists[0].name,
    };
  });
  return {
    count,
    info
  }
}

async function getSonger() {
  const {
    data: { data, count },
  } = await axios.get("http://localhost:3000/artist/sublist");
  const info = data.map((item) => {
    return {
      picUrl: item.picUrl,
      name: item.name,
      albumSize: item.albumSize,
      mvSize: item.mvSize
    };
  });
  return {
    count,
    info
  }
}

async function getMv() {
  const {
    data: { data, count },
  } = await axios.get("http://localhost:3000/mv/sublist");
  const info = data.map((item) => {
    return {
      title: item.title,
      durationms: item.durationms,
      playTime: item.playTime,
      coverUrl: item.coverUrl,
      name: item.creator[0].userName,
      vid: item.vid,
    };
  });
  return {
    count,
    info
  }
}

export { getAlbum, getSonger, getMv };
