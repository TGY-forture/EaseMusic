import axios from 'axios';

/**
 * @description: 获得用户私信
 * @param {*} limit
 */
async function getPrivate(limit = 3) {
  let { data: { msgs } } = await axios.get(`/msg/private?limit=${limit}`);
  return msgs.map((item) => {
    return {
      avatarUrl: item.fromUser.avatarUrl,
      nickname: item.fromUser.nickname,
      identityIconUrl: item.fromUser.avatarDetail?.identityIconUrl,
      lastMsg: JSON.parse(item.lastMsg),
      lastMsgTime: item.lastMsgTime,
    }
  })
}

/**
 * @description: 获得评论
 * @param {*} uid
 */
async function getComments(uid = 568642919) {
  let { data: { comments } } = await axios.get(`/msg/comments?uid=${uid}`);
  return comments.map((item) => {
    return {
      nickname: item.user.nickname,
      avatarUrl: item.user.avatarUrl,
      beRepliedContent: item.beRepliedContent,
      time: item.time,
      content: item.content
    }
  })
}

/**
 * @description: 获得 @ 我的数据
 * @param {*} limit
 */
async function getAtme(limit = 3) {
  let { data: { forwards } } = await axios.get(`/msg/forwards?limit=${limit}`);
  return forwards.map((item) => {
    return {
      time: item.time,
      ...process(item.json)
    }
  })
}

function process(json) {
  const obj = JSON.parse(json);
  return {
    nickname: obj.comment.user.nickname,
    content: obj.comment.content,
    avatarUrl: obj.comment.user.avatarUrl,
    resource: obj.resource
  }
}

/**
 * @description: 获得通知
 * @param {*} limit
 */
async function getNotification(limit = 3) {
  let { data } = await axios.get(`/msg/notices?limit=${limit}`);
  return data
}


export {
  getPrivate, getComments, getAtme, getNotification
}