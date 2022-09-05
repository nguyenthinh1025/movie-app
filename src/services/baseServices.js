import axios from 'axios'
import { TOKEN_USER } from '../redux/action/type/QuanLyNguoiDungType';
import { DOMAIN, TOKENCYBERSOFT } from '../util/setting'


export const http = axios.create({
    baseURL: DOMAIN,
    timeout: 3000
})
    ;
http.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        ['TokenCybersoft']: TOKENCYBERSOFT,
        ['Authorization']: 'Bearer ' + localStorage.getItem(TOKEN_USER),
    }

    return config
}, (error) => {
    return Promise.reject(error);
})