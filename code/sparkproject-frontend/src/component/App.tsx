import React, {FC, lazy, Suspense} from 'react';
import {Layout, Menu} from 'antd';
import '../style/App.css';
import {Route, Switch} from 'react-router-dom';
import ROUTES from '../utilities/routes';
import {redirectURL, getSubject} from '../utilities/redirect';

const { Header, Content} = Layout;
const StreamingPage = lazy(() => import('./streaming/StreamingPage'));
const GraphXPage = lazy(() => import('./graphx/GraphXPage'));

const clickMenu = e => {
    const path = e.key;
    window.location.href = path;
};

const App: FC = () => {
    redirectURL();
    return (
        <Layout className='content-layout'>
            <Header className='header'>
                <Menu theme='dark' mode='horizontal' defaultSelectedKeys={[getSubject()]} onClick={clickMenu}>
                    <Menu.Item key={ROUTES.STREAMING}>Streaming</Menu.Item>
                    <Menu.Item key={ROUTES.GRAPHX}>GraphX</Menu.Item>
                </Menu>
            </Header>
            <Layout className='content-layout'>
                <Layout style={{padding: 16}}>
                    <Content className='site-layout-background' style={{padding: 32, margin: 0, minHeight: 280}}>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Switch>
                                <Route path={ROUTES.STREAMING} component={StreamingPage}/>
                                <Route path={ROUTES.GRAPHX} component={GraphXPage}/>
                            </Switch>
                        </Suspense>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default App;