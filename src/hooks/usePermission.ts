/**
 *  判断用户是否具备某个权限
 * @param pageName 当前模块名称
 * @param permissionName 权限名称
 * @returns 是否具备权限
 */

import { useLoginStore } from '@/store'

// 用户所具备的权限
type handleNameType = 'create' | 'update' | 'delete' | 'query'

export function usePermission(
  pageName: string,
  permissionName: handleNameType
) {
  const loginStore = useLoginStore()

  return loginStore.permissions.includes(`system:${pageName}:${permissionName}`)
}
