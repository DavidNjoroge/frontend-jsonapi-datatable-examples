import * as H from 'history'
import * as qs from 'qs'

export const DEFAULT_PAGE = 1
export const DEFAULT_PAGE_SIZE = 10

export interface PageParams {[key: string]: string | number}

export class UrlParamsUtil {
  history: H.History
  constructor(history: H.History) {
    this.history = history
  }

  mergePageParams(queryParams: PageParams): PageParams {
    const queries: PageParams = this.getAllRouteParams()
    return { ...queries, ...queryParams }
  }

  updatePageParams(queryParams: any): void {
    const newQueryString = qs.stringify(this.mergePageParams(queryParams))
    this.history.push({ search: newQueryString })
  }

  getAllRouteParams(location?: any) {
    return qs.parse(location ? location.search : this.history.location.search, {
      ignoreQueryPrefix: true,
    }) as unknown as PageParams
  }
}
