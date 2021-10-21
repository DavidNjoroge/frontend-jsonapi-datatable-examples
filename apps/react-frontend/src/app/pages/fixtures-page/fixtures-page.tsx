import FixtureTable, { FixtureTableRow } from '../../fixture-table/fixture-table';
import './fixtures-page.module.scss';
import ApiService from '../../apis/api-service';
import { useEffect, useState } from 'react';
import { convertFixturesToFixturesRows, convertFixtureResponseToFixtures, convertSearchToRouteParams, fixtureSearchQuery } from './utils';
import { JsonapiResponse } from '../../interfaces/jsonapi-response';
import { useHistory } from 'react-router-dom';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, UrlParamsUtil } from '../../utils/url-params-util';
import Search from 'antd/lib/input/Search';

/* eslint-disable-next-line */
export interface FixturesPageProps {}


export function FixturesPage(props: FixturesPageProps) {
  const [fixtures, setFixtures] = useState<FixtureTableRow[]>([])
  const [fixturesResponse, setFixturesResponse] = useState<JsonapiResponse>()
  const [currentPageNumber, setCurrentPageNumber] = useState<number>()

  const history = useHistory()
  const urlParamsUtil = new UrlParamsUtil(history)

  useEffect(() => {
    initializePageParams()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    onPageParamsChange(convertSearchToRouteParams(history.location.search))
  }, [history.location.search])

  const initializePageParams = () => {
    const params = convertSearchToRouteParams(history.location.search)

    if (!params.page) {
      urlParamsUtil.updatePageParams({page: 1, pageSize: 20})
    }
  }

  const onPageParamsChange = (pageParams: any): void => {
    setCurrentPageNumber(parseInt(pageParams.page))
    const apiParams: any = {}

    if (pageParams.page) {
      apiParams.page = pageParams.page
    }

    if (pageParams.pageSize) {
      apiParams.pageSize = pageParams.pageSize
    }

    if (pageParams.searchQuery) {
      apiParams.filters = fixtureSearchQuery(pageParams.searchQuery)
    }

    fetchFixtures(apiParams)
  }
  const onSearch = (value: any) => {
    urlParamsUtil.updatePageParams({searchQuery: value, page: 1, pageSize: 20})
  }

  const fetchFixtures = (pageParams: any,) => {
    ApiService
    .fetchFixtures(pageParams.page || DEFAULT_PAGE, pageParams.pageSize || DEFAULT_PAGE_SIZE, pageParams.filters)
    .then((response: JsonapiResponse) => {
      setFixturesResponse(response)
      setFixtures(convertFixturesToFixturesRows(convertFixtureResponseToFixtures(response.data, response.included || [])))
    });
  }
  return (
    <div>
      {/* <Tag closable>
        team contains barcelona
      </Tag> */}

      <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />

      <FixtureTable fixtures={fixtures} fixturesResponse={fixturesResponse} currentPageNumber={currentPageNumber} />

    </div>
  );
}
