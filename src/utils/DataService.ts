import { GetParams, PostParams, RequestParams } from '@utils/interfaces/requestParams'
import isEmpty from '@utils/isEmpty'

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL + '/api'

class DataService {
  private path: string

  constructor(path: string) {
    this.path = BASE_URL + path
  }

  /** General request. */
  private request = async (
    url: string,
    options: RequestInit,
  ): Promise<any> => {
    const abortController = new AbortController()
    
    // Add defaults.
    options = {
      ...options,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
      },
      signal: abortController.signal,
      
    }

    // Initialize request.
    const data = await fetch(this.path + url, options)
      .then(res => res.json())

    return data
  }

  /** GET */
  protected get = async ({
    url,
    query,
    accessToken
  }: GetParams): Promise<any> => {
    if (!isEmpty(query)) {
      url = url + '?' + new URLSearchParams(query).toString()
    }

    const data = await this.request(url, {
      method: 'GET',
      headers: {
        ...(accessToken && {
          'Authorization': `Bearer ${accessToken}`
        })
      }
    })

    return data
  }

  /** POST */
  protected post = async ({
    url,
    body,
    accessToken
  }: PostParams): Promise<any> => {
    const data = await this.request(
      url,
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          ...(accessToken && {
            'Authorization': `Bearer ${accessToken}`
          })
        }
      },
    )

    return data
  }

  /** PATCH */
  protected patch = async ({
    url,
    body,
    accessToken
  }: PostParams): Promise<any> => {
    const data = await this.request(
      url,
      {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
          ...(accessToken && {
            'Authorization': `Bearer ${accessToken}`
          })
        }
      },
    )

    return data
  }

  /** DELETE */
  protected del = async ({
    url,
    accessToken
  }: RequestParams): Promise<any> => {
    const data = await this.request(
      url,
      {
        method: 'DELETE',
        headers: {
          ...(accessToken && {
            'Authorization': `Bearer ${accessToken}`
          })
        }
      },
    )

    return data
  }
}

export default DataService