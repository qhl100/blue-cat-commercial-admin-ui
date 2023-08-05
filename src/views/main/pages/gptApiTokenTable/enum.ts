export const selectData = [
  { value: 1, label: '运动' },
  { value: 2, label: '健身' },
  { value: 3, label: '跑酷' },
  { value: 4, label: '街舞' }
]

export const radioData = [
  { value: 1, label: '今天' },
  { value: 2, label: '明天' },
  { value: 3, label: '后天' },
]


export interface apiObject {
  id: number,
  userId: string,
  name: string,
  token: string,
  channelIds: Array<number>,
  visitNumber: number,
  balance: number,
  endTime: string,
  createUser: string,
  createTime: string,
  updateUser: string,
  updateTime: string,
  status: number
}