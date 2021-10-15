import { Button } from 'antd';
import FixtureTable from '../../fixture-table/fixture-table';
import './fixtures-page.module.scss';

/* eslint-disable-next-line */
export interface FixturesPageProps {}

export function FixturesPage(props: FixturesPageProps) {
  return (
    <div>

      <Button type="primary">Add filter</Button>
        <FixtureTable />
    </div>
  );
}

export default FixturesPage;
