import { Layout, Menu } from 'antd';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { useAxiosLoader } from './apis/axios-loader';
import { axiosClient } from './apis/request';
import styles from './app.module.scss';
import appRoutes from './appRoutes';
import PageApiLoader from './page-api-loader';


export function App() {
  const loading = useAxiosLoader(axiosClient)

  const { Header, Content, Footer } = Layout;

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
    {loading ? <PageApiLoader/> : ''}

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
