import { Pagination, Table } from 'antd';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Fixture } from '../interfaces/fixture';
import { JsonapiResponse } from '../interfaces/jsonapi-response';
import { UrlParamsUtil } from '../utils/url-params-util';
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
  fixtures?: Fixture[]
  fixturesResponse?: JsonapiResponse
  currentPageNumber?: number
}

export function FixtureTable(props: FixtureTableProps) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>()

  const history = useHistory()
  const urlParamsUtil = new UrlParamsUtil(history)

  const onTablePaginationChange = (page: number, pageSize?: number) => {
    console.log('onTablePaginationChange: ', page, pageSize);
    urlParamsUtil.updatePageParams({page, pageSize})
  };
  const onSelectChange = (selectedRowKeys: any) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changableRowKeys: any) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key: any, index: number) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changableRowKeys: any[]) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key: any, index: number) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  return (
    <div>
      <Table  rowKey="id" rowSelection={rowSelection} columns={fixtureColumns} dataSource={props.fixtures} pagination={false} />
      <Pagination onChange={onTablePaginationChange} current={props.currentPageNumber} total={props.fixturesResponse?.meta.count} />
    </div>
  );
}

export default FixtureTable;
