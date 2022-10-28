import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { authSlice } from './authSlice'

// 封裝 dispatch, 直接調用取出各別 slice actions 方法即可, 不用在各別引入組合
/**
 * DEMO
 * const { authenticate } = useActions()
 * authenticate(userData)
 */
export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators({ ...authSlice.actions }, dispatch)
}
