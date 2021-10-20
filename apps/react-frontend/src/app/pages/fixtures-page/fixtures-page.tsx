import { Input } from 'antd';
import FixtureTable from '../../fixture-table/fixture-table';
import './fixtures-page.module.scss';
import ApiService from '../../apis/api-service';
import { useEffect, useState } from 'react';
import { convertFixturesToFixturesRows, convertFixtureResponseToFixtures, convertSearchToRouteParams } from './utils';
import { JsonapiResponse } from '../../interfaces/jsonapi-response';
import { useHistory } from 'react-router-dom';
import { UrlParamsUtil } from '../../utils/url-params-util';

/* eslint-disable-next-line */
export interface FixturesPageProps {}


export function FixturesPage(props: FixturesPageProps) {
  const [fixtures, setFixtures] = useState<any[]>([])
  const [fixturesResponse, setFixturesResponse] = useState<JsonapiResponse>()
  const [currentPageNumber, setCurrentPageNumber] = useState<any>()

  const history = useHistory()
  const urlParamsUtil = new UrlParamsUtil(history)

  useEffect(() => {
    initializePageParams()
  }, [])


  useEffect(() => {
    // console.log(convertSearchToRouteParams(history.location.search))
    fetchFixtures(convertSearchToRouteParams(history.location.search))
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
  }


  const fetchFixtures = (pageParams: any) => {
    ApiService
    .fetchFixtures(pageParams.page, pageParams.pageSize)
    .then((response: JsonapiResponse) => {
      setFixturesResponse(response)
      const rows = convertFixturesToFixturesRows(convertFixtureResponseToFixtures(response.data, response.included || []))
      console.log('fixturesResponse', response);
      setFixtures(rows)
    });
  }
  return (
    <div>
      {/* <Tag closable>
        team contains barcelona
      </Tag> */}

      <br />
      <Input  style={{ width: 120 }} placeholder="search" />
      <br/>

        {/* <Button type="primary">Add filter</Button> */}
        <FixtureTable fixtures={fixtures} fixturesResponse={fixturesResponse} currentPageNumber={currentPageNumber} />
    </div>
  );
}

// export default FixturesPage;
