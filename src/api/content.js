import axios from '@/utils/axios'

// 上传文件
export const contentUpload = (formData) => axios.post('/content/upload', formData)
