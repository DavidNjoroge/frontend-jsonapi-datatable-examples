import { Table } from 'antd';
import { useState } from 'react';
import './fixture-table.module.scss';

/* eslint-disable-next-line */
export interface FixtureTableProps {}

export function FixtureTable(props: FixtureTableProps) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>()
  const columns = [
    {
      title: 'Fixture Date',
      dataIndex: 'fixtureDate',
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
      title: 'Home',
      dataIndex: 'home',
    },
    {
      title: 'Home Score',
      dataIndex: 'homeScore',
    },
    {
      title: 'Away Score',
      dataIndex: 'awayScore',
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
  const data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }

  return (
    <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
  );
}

export default FixtureTable;
