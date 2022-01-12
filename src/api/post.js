import axios from '@/utils/axios'
import qs from 'qs'

// 发布新贴
export const postCreate = (data) => axios.post('/post/create', data)

// 编辑帖子
export const postUpdate = (data) => axios.post('/post/update', data)

// 删除帖子
export const postDelete = (data) => axios.post('/post/delete', data)

// 发帖记录
export const postHistory = (params) => axios.get(`/post/history?${qs.stringify(params)}`)






