import { FixtureTableRow } from './fixture-table/fixture-table';
import './fixtures-page.module.scss';
import ApiService from '../../apis/api-service';
import { useEffect, useState } from 'react';
import { convertFixturesToFixturesRows, convertFixtureResponseToFixtures, convertSearchToRouteParams, fixtureSearchQuery } from './utils';
import { JsonapiResponse } from '../../interfaces/jsonapi-response';
import { useHistory } from 'react-router-dom';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, UrlParamsUtil } from '../../utils/url-params-util';
import Search from 'antd/lib/input/Search';
import { Pagination, Table } from 'antd';
import { fixtureColumns } from './fixture-table/fixture-columns';

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
  }, [])

  useEffect(() => {
    onPageParamsChange(history.location.search)
  }, [history.location.search])

  const initializePageParams = () => {
    const params = convertSearchToRouteParams(history.location.search)

    if (!params.page) {
      urlParamsUtil.updatePageParams({page: DEFAULT_PAGE, pageSize: DEFAULT_PAGE_SIZE})
    }
  }

  const onPageParamsChange = (pageParamsSearch: string): void => {
    const pageParams: any = convertSearchToRouteParams(pageParamsSearch)
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
    urlParamsUtil.updatePageParams({searchQuery: value, page: DEFAULT_PAGE, pageSize: DEFAULT_PAGE_SIZE})
  }

  const fetchFixtures = (pageParams: any,) => {
    ApiService
    .fetchFixtures(pageParams.page || DEFAULT_PAGE, pageParams.pageSize || DEFAULT_PAGE_SIZE, pageParams.filters)
    .then((response: JsonapiResponse) => {
      setFixturesResponse(response)
      setFixtures(convertFixturesToFixturesRows(convertFixtureResponseToFixtures(response.data, response.included || [])))
    });
  }

  const onTablePaginationChange = (page: number, pageSize?: number) => {
    urlParamsUtil.updatePageParams({page, pageSize})
  };

  return (
    <div>
      {/* <Tag closable>
        team contains barcelona
      </Tag> */}

      <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />

      <Table  rowKey="id" columns={fixtureColumns} dataSource={fixtures} pagination={false} />
      <Pagination onChange={onTablePaginationChange} current={currentPageNumber} total={fixturesResponse?.meta.count} />

    </div>
  );
}
