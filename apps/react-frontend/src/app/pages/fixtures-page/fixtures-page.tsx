import { Button, Card, Input, Tag } from 'antd';
import FixtureTable from '../../fixture-table/fixture-table';
import './fixtures-page.module.scss';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import ApiService from '../../apis/api-service';
import React, { useEffect } from 'react';

/* eslint-disable-next-line */
export interface FixturesPageProps {}


export function FixturesPage(props: FixturesPageProps) {

  useEffect(() => {
    fetchFixtures()
    console.log('ssss')
  }, [])


  const fetchFixtures = () => {
    ApiService
      .fetchFixtures()
      .then((response: any) => {
        console.log('response', response);
      });
  }
  return (
    <div>
      <Tag closable>
        team contains barcelona
      </Tag>

      <br />
      <Input  style={{ width: 120 }} placeholder="search" />
      <br/>

        <Button type="primary">Add filter</Button>
        <FixtureTable />
    </div>
  );
}

// export default FixturesPage;
