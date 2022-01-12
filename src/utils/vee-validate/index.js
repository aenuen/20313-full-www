import { extend, localize } from 'vee-validate'
import { required, email, min, max, length, confirmed, alpha_num as alphaNum, is_not } from 'vee-validate/dist/rules'
import zh from 'vee-validate/dist/locale/zh_CN.json'

extend('required', required)
extend('email', email)
extend('min', min)
extend('max', max)
extend('length', length)
extend('confirmed', confirmed)
extend('alpha_num', alphaNum)
extend('is_not', is_not)

extend('name', {
  validate: value => !(/^\d+/).test(value),
  message: '不能以纯数字为昵称'
})

localize('zh_CN', {
  messages: {
    ...zh.messages,
    required: '请输入{_field_}'
  },
  names: {
    account: '账号',
    email: '电子邮箱',
    nickname: '昵称',
    password: '密码',
    rePassword: '确认密码',
    authCode: '验证码',
    title: '标题',
    catalog: '分类'
  },
  fields: {
    catalog: {
      is_not: '请选择{_field_}'
    },
    account: {
      email: '这不是正确的电子邮箱格式'
    },
    email: {
      email: '这不是正确的电子邮箱格式'
    },
    password: {
      confirmed: '与确认密码不一致'
    },
    acthCode: {
      alpha_num: '{_field_}只能输入字母或数字'
    }
  }
})
