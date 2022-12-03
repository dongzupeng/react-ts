import { request } from './request'

//获取图片
export const GetImages = <T>(params: any) => request.get<T>('/api/getImages', params, { timeout: 15000 });