import DataService from '@utils/DataService'
import { string } from 'joi'

class UserService extends DataService {

  /** Register user with credentials. */
  public createWithCredentials = async (data: any) => {
    return await this.post({
      url: '/',
      body: data
    })
  }

  /** Register user with Google. */
  public createWithGoogle = async (
    user: any
  ): Promise<{
    accessToken: string,
    ok: boolean,
  }> => {
    return await this.post({
      url: '/google',
      body: user
    })
  }

  /** Verify user account. */
  public verifyAccount = async (
    data: any
  ): Promise<any> => {
    return await this.post({
      url: '/verify',
      body: data
    })
  }

  /** Get user. */
  public getUser = async (
    username: string
  ) => {
    return await this.get({
      url: `/${username}`
    })
  }

  /** Get user by id. */
  public getById = async ({
    userId,
    accessToken
  }: {
    userId: string
    accessToken: string
  }) => {
    return await this.get({
      url: `/${userId}`,
      accessToken
    })
  }

  /** Get summary. */
  public getSummary = async ({
    accessToken
  }: {
    accessToken: string
  }): Promise<any> => {
    return await this.get({
      url: `/summary`,
      accessToken
    })
  }

  /** Get money stats. */
  public getMoneyStats = async ({
    accessToken,
    currency
  }: {
    accessToken: string
    currency: string
  }): Promise<any> => {
    return await this.get({
      url: `/money-stats`,
      accessToken,
      query: {
        currency
      }
    })
  }

  /** Get currencies. */
  public getCurrencies = async({
    userId,
    accessToken
  }: {
    userId: string
    accessToken: string
  }) => {
    return await this.get({
      url: `/${userId}/currencies`,
      accessToken
    })
  }

  /** Update user. */
  public update = async ({
    id,
    accessToken,
    data
  }: {
    id: string
    accessToken: string
    data: any
  }): Promise<any> => {
    return await this.patch({
      url: '/' + id,
      body: data,
      accessToken
    })
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService('/users')
