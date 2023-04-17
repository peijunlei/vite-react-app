import React from 'react';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom'
import './App.css'
const { Header, Content, Sider } = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2: MenuProps['items'] = [
  {
    key: 'amap',
    label: "高德地图",
    path: '/map'
  },
  {
    key: 'home',
    label: "主页",
    path: '/home'
  }
].map(
  (item, index) => {
    return {
      key: item.key,
      label: <Link to={item.path}>{item.label}</Link>,
    };
  },
);

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Header className="header">
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['amap']}
            defaultOpenKeys={['react']}
            style={{ height: '100%' }}
            items={items2}
          />
        </Sider>
        <Layout >
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              overflow:'scroll',
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;