export interface VideoInfoType{
    name:string
    description:string
    date:Date
    url:string
}

export type VideosInfoType = VideoInfoType[]

export interface VideoInfoTypeStore{
    name:string
    description:string
    date:string
    url:string
}

export type VideosInfoTypeStore = VideoInfoTypeStore[]
