import { Button, Input, Tag } from 'antd';
import FixtureTable, { FixtureTableRow } from '../../fixture-table/fixture-table';
import './fixtures-page.module.scss';
import ApiService from '../../apis/api-service';
import { useEffect, useState } from 'react';
import { convertFixturesToFixturesRows, convertFixtureseResponseToFixtures } from './utils';
import { Fixture } from '../../interfaces/fixture';

/* eslint-disable-next-line */
export interface FixturesPageProps {}


export function FixturesPage(props: FixturesPageProps) {
  const [fixtures, setFixtures] = useState<any[]>([])

  useEffect(() => {
    fetchFixtures()
    console.log('ssss')
  }, [])


  const fetchFixtures = () => {
    ApiService
      .fetchFixtures()
      .then((response: any) => {
        debugger
        const rows: any[] = []
        // const rows = convertFixturesToFixturesRows(convertFixtureseResponseToFixtures(response.data, response.included))
        // console.log('fixtureRows', rows.slice(0, 5));
        // console.log('fixtures', convertFixtureseResponseToFixtures(response.data, response.included));
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
        <FixtureTable fixtures={fixtures} />
    </div>
  );
}

// export default FixturesPage;
