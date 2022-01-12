import axios from '@/utils/axios'
import qs from 'qs'

// 用户签到
export const userSign = () => axios.get('/user/sign')

// 更新用户基本资料
export const userBasic = (data) => axios.post('/user/basic', data)

// 更新用户电子邮箱
export const userEmail = (data) => axios.post('/user/email', data)

// 更新用户头像
export const userAvatar = (data) => axios.post('/user/avatar', data)

// 用户信息
export const userInfo = (params) => axios.get('/user/info?' + qs.stringify(params))

