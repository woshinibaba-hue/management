import {
  getUserList,
  updateUser as update,
  updateUserStatus,
  createUser,
  deleteByIdUser
} from '@/server/users'

import * as userTypes from '@/server/users/types'

export const useUserStore = defineStore('users', () => {
  // 用户列表
  const users = ref<userTypes.IUserList>()

  // 获取用户列表
  const getUsers = (params: userTypes.IUserParams = {}) => {
    getUserList(params).then((res) => {
      users.value = res.data
    })
  }

  // 修改用户信息
  const updateUser = async (user: userTypes.IUser) => {
    await update(user)
    getUsers()
    ElMessage.success('修改成功')
  }

  // 修改用户状态
  const updateStatus = async (userId: number, status: number) => {
    try {
      await updateUserStatus(userId, status)
      ElMessage.success('状态修改成功')
    } catch {
      getUsers()
    }
  }

  // 添加用户
  const addUser = async (user: userTypes.IUser) => {
    await createUser(user)
    ElMessage.success('用户添加成功')
    getUsers()
  }

  // 删除用户
  const deleteUser = async (id: number) => {
    await deleteByIdUser(id)
    ElMessage.success('删除用户成功')
    getUsers()
  }

  return {
    users,
    getUsers,
    updateUser,
    updateStatus,
    addUser,
    deleteUser
  }
})
