import axios from 'axios'
import crypto from 'crypto'
import { message } from 'ant-design-vue'

// axios.defaults.baseURL = 'http://localhost:3000'


/**
 * @description: 用户登录
 */
async function log(phone, password) {
  let hash = crypto.createHash('md5')
  hash.update(password)
  let md5_pass = hash.digest('hex');
  let { data: { account, code } } = await axios.get(`http://localhost:3000/login/cellphone?phone=${phone}&md5_password=${md5_pass}`)
  return { code, userid: account.id }
}

/**
 * @description: 获取用户信息
 */
async function getUserInfo(uid) {
  let { data: { profile } } = await axios.get(`http://localhost:3000/user/detail?uid=${uid}`);
  return {
    avatarUrl: profile.avatarUrl,
    nickname: profile.nickname,
    gender: profile.gender,
    birthday: profile.birthday,
    follows: profile.follows,
    followeds: profile.followeds,
    eventcount: profile.eventCount
  }
}

/**
 * @description: 每日签到
 */
function dailySignin() {
  axios.get('http://localhost:3000/daily_signin?type=1').then(() => {
    message.success('签到成功')
  }).catch(() => {
    message.warn('重复签到')
  });
}
export {
  log,
  getUserInfo,
  dailySignin
}
