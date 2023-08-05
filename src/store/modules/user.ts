import { loginApi, getInfoApi, loginOutApi } from '@/api/user'
import { ActionContext } from 'vuex'
import {delCookie, setCookie} from "@/utils/setCookie";

export interface userState {
  token: string,
  info: object
}
const state = (): userState => ({
  token: '', // 登录token
  info: {},  // 用户信息
})

// getters
const getters = {
  token(state: userState) {
    return state.token
  }
}

// mutations
const mutations = {
  tokenChange(state: userState, token: string) {
    state.token = token
  },
  infoChange(state: userState, info: object) {
    state.info = info
  }
}

// actions
const actions = {
  // login by login.vue
  login({ commit, dispatch }: ActionContext<userState, userState>, params: any) {
    return new Promise((resolve, reject) => {
      loginApi(params)
      .then(res => {
        setCookie('blueCat_token', res.data.id)
        setCookie('blueCat_user_account', res.data.account)
        commit('tokenChange', res.data.id)
        dispatch('getInfo', { token: res.data.id })
        .then(infoRes => {
          resolve(res.data.id)
        })
      }).catch(err => {
        reject(err)
      })
    })
  },
  // get user info after user logined
  getInfo({ commit }: ActionContext<userState, userState>, params: any) {
    return new Promise((resolve, reject) => {
      getInfoApi(params)
      .then(res => {
        commit('infoChange', res.data)
        resolve(res.data)
      })
    })
  },

  // login out the system after user click the loginOut button
  loginOut({ commit }: ActionContext<userState, userState>) {
    loginOutApi()
    .then(res => {
      delCookie('blueCat_token')
      delCookie('blueCat_user_account')
    })
    .catch(error => {
      delCookie('blueCat_token')
      delCookie('blueCat_user_account')
    })
    .finally(() => {
      localStorage.removeItem('tabs')
      localStorage.removeItem('vuex')
      delCookie('blueCat_token')
      delCookie('blueCat_user_account')
      sessionStorage.removeItem('vuex')
      location.reload()
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
