import apiResults from "./apiResults.json";
import { Member, OrderByType } from "./sharedTypes";

export const api = {
  getMembers: async ({
    limit,
    filterByStates,
    offset = 0,
    orderBy,
  }: {
    limit?: number;
    filterByStates?: string[];
    offset?: number;
    orderBy?: OrderByType;
  } = {}) => {
    const { results } = apiResults;
    let response = [...results] as Member[];
    let totalResults = results.length;

    if (orderBy) {
      response = response.sort((a, b) => {
        if (orderBy === OrderByType.NAME) {
          return a.name.first < b.name.first ? -1 : 1;
        }
        if (orderBy === OrderByType.STATE || OrderByType.CITY) {
          return a.location[orderBy] < b.location[orderBy] ? -1 : 1;
        }
        return 0;
      });
    }

    if (filterByStates?.length) {
      response = response.filter(({ location }) =>
        filterByStates.includes(location.state)
      );
      totalResults = response.length;
    }

    if (limit) {
      response = response.slice(
        offset,
        limit ? limit + offset : results.length
      );
    }

    /* simulate api latency */
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(response);
      }, Math.random() * 2000);
    });

    return {
      data: response,
      total: totalResults,
    };
  },
  getMembersByName: async ({ queryName }: { queryName: string }) => {
    const { results } = apiResults;
    let response = [] as Member[];
    let totalResults = 0;

    response = results.filter(
      ({ name: { first, last } }) =>
        first.indexOf(queryName) > -1 || last.indexOf(queryName) > -1
    );
    totalResults = response.length;

    /* simulate api latency */
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(response);
      }, Math.random() * 2000);
    });

    return {
      data: response,
      total: totalResults,
    };
  },
  getStates: async () => {
    const { results } = apiResults;
    const statesResponse = {} as Record<string, string>;

    results
      .sort((a, b) => {
        return a.location.state < b.location.state ? -1 : 1;
      })
      .forEach(({ location }) => {
        statesResponse[location.state] = location.state;
      });

    /* simulate api latency */
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(statesResponse);
      }, Math.random() * 2000);
    });

    return {
      data: statesResponse as Record<string, string>,
    };
  },
};
