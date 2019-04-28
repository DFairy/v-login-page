import * as types from './mutation-types'

const mutations = {
    [types.LOGIN](state, data) {
        localStorage.setItem('token', data)
        state.token = data
    },
    [types.LOGOUT](state) {
        localStorage.removeItem('token')
        state.token = null
    },
    [types.USERNAME](state, data) {
        localStorage.setItem('username', data)
        state.username = data
    }
}

export default mutations