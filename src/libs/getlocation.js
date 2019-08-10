import HttpRequest from '@/libs/axios'

const baseUrl = 'https://apis.map.qq.com/ws/geocoder/v1/'

const axios = new HttpRequest(baseUrl)
export default axios
