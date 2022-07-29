import { Response } from "express"

export interface UserType {
  id?: number
  name: string
  email: string
  password: string
  isBlock: boolean
}

export interface UpdateUserType {
  name?: string
  email?: string
  password?: string
  isBlock?: boolean
  userId?: number
}

export interface NoteType {
  id?: number
  title: string
  description: string
  important: boolean
  userId: number
}

export interface UpdateNoteType {
  title?: string
  description?: string
  important?: boolean
}

export interface ResultFindUsersType {
  count: number ,
  rows: UserType[]
}

export type ResultTo = Array<Error | null, Object | ResultFindUsersType[] | null>

export type To = (promise: any) => Promise<[Error | null, any ]>

export interface paginationType {
  limit: number | undefined
  from: number | undefined
}






export type ResponseSuccess = (res:Response, msg:object | string, result:object | null, status?:number) => Response
