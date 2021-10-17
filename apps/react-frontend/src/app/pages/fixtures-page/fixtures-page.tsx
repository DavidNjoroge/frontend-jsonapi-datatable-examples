import { Button, Input, Tag } from 'antd';
import FixtureTable, { FixtureTableRow } from '../../fixture-table/fixture-table';
import './fixtures-page.module.scss';
import ApiService from '../../apis/api-service';
import { useEffect, useState } from 'react';
import { convertFixturesToFixturesRows } from './utils';

/* eslint-disable-next-line */
export interface FixturesPageProps {}


export function FixturesPage(props: FixturesPageProps) {
  const [fixtures, setFixtures] = useState<FixtureTableRow[]>([])

  useEffect(() => {
    fetchFixtures()
    console.log('ssss')
  }, [])


  const fetchFixtures = () => {
    ApiService
      .fetchFixtures()
      .then((response: any) => {
        console.log('response', response);
        setFixtures(convertFixturesToFixturesRows(response.data))
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
        <FixtureTable fixtures={fixtures} />
    </div>
  );
}

// export default FixturesPage;
