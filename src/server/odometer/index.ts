import request from '@/server'

type IUserNum = {
  usersNum: number
  todayusersNum: number
}

type ICommentNum = {
  guestbookNum: number
  todayguestbookNum: number
}

type ITotalNum = {
  userNum: number
  guestbookNum: number
  articleNum: number
  LinkNum: number
  tagNum: number
}

type ISevenDaysNum = Record<'pv' | 'uv', { name: string; value: number }>

interface IServerNum extends ISevenDaysNum {
  xData: string[]
}

export { IUserNum, ICommentNum, ITotalNum, ISevenDaysNum }

// 获取用户总数以及当天注册总数
export function getUserNum() {
  return request.get<IUserNum>({
    url: '/getUserNum'
  })
}

// 获取留言以及当天留言总数
export function getCommentNum() {
  return request.get<ICommentNum>({
    url: '/getCommentNum'
  })
}

// 获取网站基本数据总数
export function getTotalNum() {
  return request.get<ITotalNum>({
    url: '/getTotalNum'
  })
}

// 获取七天内访问量
export function getSevenDays() {
  return request.get<IServerNum>({
    url: '/getVisitorNum'
  })
}
