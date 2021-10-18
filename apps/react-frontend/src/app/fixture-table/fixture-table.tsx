import { Table } from 'antd';
import { useState } from 'react';
import { Fixture } from '../interfaces/fixture';
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
}

export function FixtureTable(props: FixtureTableProps) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>()
  const columns = [
    {
      title: 'Fixture Date',
      dataIndex: 'fixture_date',
      filters: [
        {
          text: 'Edward King 0',
          value: 'Edward King 0',
        },
      ],
          // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value: any, record: any) => record.name.indexOf(value) === 0,
    // sorter: (a: any, b: any) => a.name.length - b.name.length,
    // sortDirections: ['descend'],
    },
    {
      title: 'Home Name',
      dataIndex: 'homeName',
    },
    {
      title: 'Home Score',
      dataIndex: 'home_score',
    },
    {
      title: 'Away Score',
      dataIndex: 'away_score',
    },
    {
      title: 'Away Name',
      dataIndex: 'awayName',
    },
  ];

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
    <Table rowKey="id" rowSelection={rowSelection} columns={columns} dataSource={props.fixtures} />
  );
}

export default FixtureTable;
