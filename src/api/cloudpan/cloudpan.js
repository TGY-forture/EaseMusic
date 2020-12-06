import axios from "axios";

function process(bitnum) {
  const kb = Math.trunc(bitnum / 1024);
  if (kb < 1024) {
    return kb + 'KB'
  }
  const mb = (kb / 1024);
  if (mb < 1024) {
    return mb.toFixed(1) + 'MB'
  }
}

function calcGb(bit) {
  let result = (bit / 1024 / 1024 / 1024).toFixed(1);
  if (result < 0.1) {
    result = 0.1
  }
  return result
}

function timeTran(ms) {
  const time = new Date(ms);
  const year = (time.getFullYear() + '').slice(2);
  const month = time.getMonth();
  const date = time.getDate();
  return year + '-' + month + '-' + date
}

async function getCloudInfo() {
  const {
    data: { data, count, size, maxSize },
  } = await axios.get("http://localhost:3000/user/cloud");
  const info = data.map((item) => {
    return {
      fileSize: process(item.fileSize),
      fileName: item.fileName.split('.').pop(),
      artist: item.artist ? item.artist : '未知歌手',
      album: item.album ? item.album : '未知专辑',
      songName: item.songName,
      addTime: timeTran(item.addTime)
    };
  });

  return {
    info,
    count,
    size: calcGb(size),
    maxSize: calcGb(maxSize)
  }
}

export { getCloudInfo }