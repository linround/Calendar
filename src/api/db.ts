import request from '../request'
import { IResponse } from './common'


interface IDBInfo {
  dbType:string
  host: string
  port:string
  userName: string
  password: string
  dbName:string
}
export function initDB(data:IDBInfo) {
  return request <any, IResponse<any>>({
    url: '/init/initDB',
    method: 'POST',
    data,
  })
}
