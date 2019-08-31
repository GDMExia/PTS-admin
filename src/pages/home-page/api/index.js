import axios from '@/libs/api.request'
import store from '@/store'
const user = store.state.user
import qs from 'qs'

export const setChangePassword = form => {
    let params = qs.stringify(Object.assign(form,{
        token: user.token
    }))
    return axios.request({
        url: `/Permissions/updatePassSave`,
        data: params,
        method: 'post'
    })
}
