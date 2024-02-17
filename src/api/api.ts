import { removeStringAccents } from "@utils/removeStringAccents";
import apiData from "./apiData.json";
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
    const { results } = apiData;
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

    if (limit || offset) {
      const currentOffset = offset ? (offset - 1) * (limit ?? 0) : 0;
      response = response.slice(
        currentOffset,
        limit ? limit + currentOffset : results.length
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
  getMemberByEmail: async ({ email }: { email?: string }) => {
    const { results } = apiData;
    let response = {} as Member | undefined;

    response = results.find(({ email: innerEmail }) => innerEmail === email);

    /* simulate api latency */
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(response);
      }, Math.random() * 2000);
    });

    return {
      data: response,
    };
  },
  getMembersByName: async ({ search }: { search: string }) => {
    const { results } = apiData;
    let totalResults = 0;
    const normalizedSearch = removeStringAccents(search);

    const response = results.filter(({ name: { first, last } }) => {
      const normalizedFirst = removeStringAccents(first);
      const normalizedLast = removeStringAccents(last);
      return (
        normalizedFirst
          .toLocaleLowerCase()
          .indexOf(normalizedSearch.toLocaleLowerCase()) > -1 ||
        normalizedLast
          .toLocaleLowerCase()
          .indexOf(normalizedSearch.toLocaleLowerCase()) > -1
      );
    }) as Member[];

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
    const { results } = apiData;
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
