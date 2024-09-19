import DataService from "@utils/DataService";

class AuthService extends DataService {
  
  /** Login user. */
  public login = async (data: any): Promise<any> => {
    return await this.post({
      url: '/login',
      body: data
    })
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService('/auth')