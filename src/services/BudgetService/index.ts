import DataService from "@utils/DataService";

class BudgetService extends DataService {
  /** Create budget. */
  public create = async (data: any, accessToken: string): Promise<any> => {
    return this.post({
      url: "/",
      body: data,
      accessToken,
    });
  };

  /** Update budget. */
  public update = async (
    id: string,
    data: any,
    accessToken: string
  ): Promise<any> => {
    return this.patch({
      url: "/" + id,
      body: data,
      accessToken,
    });
  };

  /** List budgets */
  public list = async ({
    query,
    accessToken,
  }: {
    query?: any;
    accessToken: string;
  }): Promise<any> => {
    return this.get({
      url: "/",
      query,
      accessToken,
    });
  };

  /** Get budget. */
  public fetch = async ({
    id,
    accessToken,
  }: {
    id: string;
    accessToken: string;
  }): Promise<any> => {
    return this.get({
      url: "/transactions",
      query: { id: id },
      accessToken,
    });
  };

  /** Delete budget. */
  public remove = async ({
    id,
    accessToken,
  }: {
    id: string;
    accessToken: string;
  }): Promise<any> => {
    return this.del({
      url: "/" + id,
      accessToken,
    });
  };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new BudgetService("/budget");
