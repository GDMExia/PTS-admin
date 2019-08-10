import axios from '@/libs/api.request'


export const setChangePassword = form => {
    return axios.request({
        url: `/admin/update/psw`,
        data: form,
        method: 'post'
    })
}
