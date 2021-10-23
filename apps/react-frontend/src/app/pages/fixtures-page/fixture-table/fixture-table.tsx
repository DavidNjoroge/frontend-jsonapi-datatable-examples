import { Pagination, Table } from 'antd';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Fixture } from '../../../interfaces/fixture';
import { JsonapiResponse } from '../../../interfaces/jsonapi-response';
import { UrlParamsUtil } from '../../../utils/url-params-util';
import { fixtureColumns } from './fixture-columns';
import './fixture-table.module.scss';


export interface FixtureTableRow {
  id: number;
  away_score?: string;
  fixture_date?: string;
  fixture_time?: string;
  home_score?: string;
  match_week?: string;
  results?: string;
  away_id: number;
  home_id: number;
}

export interface FixtureTableProps {
  fixtures?: FixtureTableRow[]
  fixturesResponse?: JsonapiResponse
  currentPageNumber?: number
}

export function FixtureTable(props: FixtureTableProps) {
  const history = useHistory()
  const urlParamsUtil = new UrlParamsUtil(history)

  const onTablePaginationChange = (page: number, pageSize?: number) => {
    urlParamsUtil.updatePageParams({page, pageSize})
  };

  return (
    <div>

      <Table  rowKey="id" columns={fixtureColumns} dataSource={props.fixtures} pagination={false} />
      <Pagination onChange={onTablePaginationChange} current={props.currentPageNumber} total={props.fixturesResponse?.meta.count} />

    </div>
  );
}

export default FixtureTable;
