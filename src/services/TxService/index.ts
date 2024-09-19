import DataService from "@utils/DataService";

class TxService extends DataService {
  /** Create transaction. */
  public create = async (
    data: any,
    accessToken: string    
  ): Promise<any> => {
    return await this.post({
      url: '/',
      body: data,
      accessToken
    })
  }
  
  /** Update transaction. */
  public update = async (
    id: string,
    data: any,
    accessToken: string    
  ): Promise<any> => {
    return await this.patch({
      url: '/' + id,
      body: data,
      accessToken
    })
  }

  /** List transactions. */
  public list = async ({
    query,
    accessToken
  }: {
    query?: object,
    accessToken: string
  }) => {
    return await this.get({
      url: '/',
      query,
      accessToken
    })
  }
  
  /** Fetch transactions. */
  public fetch = async ({
    id,
    accessToken
  }: {
    id: string,
    accessToken: string
  }) => {
    return await this.get({
      url: '/' + id,
      accessToken
    })
  }
  
  /** Delete transactions. */
  public remove = async ({
    id,
    accessToken
  }: {
    id: string,
    accessToken: string
  }) => { 
    return await this.del({
      url: '/' + id,
      accessToken
    })
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new TxService('/transactions')