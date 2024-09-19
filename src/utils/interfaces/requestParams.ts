export interface RequestParams {
  url: string,
  accessToken?: string
}

export interface GetParams extends RequestParams {
  query?: any
}

export interface PostParams extends RequestParams {
  body: any
}