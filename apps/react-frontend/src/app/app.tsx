import { Button } from 'antd';
import styles from './app.module.scss';
import FixtureTable from './fixture-table/fixture-table';

import { ReactComponent as Logo } from './logo.svg';
import star from './star.svg';

export function App() {
  return (
    <div className={styles.app}>
        <Button type="primary">Button</Button>
        <FixtureTable />
    </div>
  );
}


export default App;
