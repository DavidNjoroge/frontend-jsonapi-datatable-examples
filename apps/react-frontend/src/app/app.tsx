import { Layout, Menu } from 'antd';
import axios from 'axios';
import { useEffect } from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import ApiService from './apis/api-service';
import styles from './app.module.scss';
import appRoutes from './appRoutes';
import { FixturesPage } from './pages/fixtures-page/fixtures-page';


const client = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/posts"
});

export function App() {
  const { Header, Content, Footer } = Layout;

  useEffect(() => {
    // fetchFixtures()
  }, [])

  const fetchFixtures = () => {
    ApiService
      .fetchFixtures()
      .then((response: any) => {
        console.log('response', response);
      });
    }

  return (
    <div className={styles.app}>
      <Layout className="layout">
      <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>

      {
            appRoutes.map((route, index) => (
              <Menu.Item key={index}>
                <Link to={route.path}>
                {route.navName}
                </Link>
                </Menu.Item>
            ))
          }
      </Menu>
    </Header>
    <Content
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
      }}>
      <div className={styles.siteLayoutContent}>
        <Switch>
          {
            appRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                component={route.component}
              />
            ))
          }

          <Redirect
            to={{pathname: appRoutes[0].path}}
          />
        </Switch>
        {/* <FixturesPage /> */}
      </div>

    </Content>
        </Layout>

    </div>
  );
}


export default App;
