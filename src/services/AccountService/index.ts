import DataService from "@utils/DataService";

class AccountService extends DataService {

  /** Create account. */
  public create = async ({
    data,
    accessToken
  }: {
    data: any,
    accessToken: string
  }): Promise<any> => {
    return this.post({
      url: '/',
      body: data,
      accessToken
    })
  }

  /** Update account. */
  public update = async ({
    id,
    data,
    accessToken
  }: {
    id: string,
    data: any,
    accessToken: string
  }): Promise<any> => {
    return this.patch({
      url: '/' + id,
      body: data,
      accessToken
    })
  }

  /** List accounts. */
  public list = async ({
    query,
    accessToken
  }: {
    query?: any,
    accessToken: string
  }): Promise<any> => {
    return this.get({
      url: '/',
      query,
      accessToken
    })
  }

  /** Get account. */
  public fetch = async ({
    id,
    accessToken
  }: {
    id: string,
    accessToken: string
  }): Promise<any> => {
    return this.get({
      url: '/' + id,
      accessToken
    })
  }

  /** Delete account. */
  public remove = async ({
    id,
    accessToken
  }: {
    id: string,
    accessToken: string
  }): Promise<any> => {
    return this.del({
      url: '/' + id,
      accessToken
    })
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AccountService('/accounts')