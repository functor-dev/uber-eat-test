import {
  BellOutlined,
  MailOutlined,
  PhoneOutlined,
  PieChartOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Layout, Menu, MenuProps, theme } from 'antd';
import React from 'react';
import { Link, Outlet } from 'react-router';

const { Header, Content, Sider } = Layout;

const items: MenuProps['items'] = [
  {
    key: 'analytics',
    icon: <PieChartOutlined />,
    label: 'Analytics',
    disabled: true,
  },
  {
    key: 'email-templates',
    icon: <MailOutlined />,
    label: <Link to="/email-templates">Email Templates</Link>,
  },
  {
    key: 'user',
    icon: <UserOutlined />,
    label: 'User',
    disabled: true,
  },
  {
    key: 'team',
    icon: <TeamOutlined />,
    label: 'Team',
    disabled: true,
  },
];

const App: React.FC = () => {
  return (
    <div className="container mx-auto">
      <Outlet />
    </div>
  );

  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();

  // return (
  //   <Layout
  //     style={{
  //       background: colorBgContainer,
  //       display: 'flex',
  //       flexDirection: 'column',
  //       minHeight: '100vh',
  //     }}
  //   >
  //     <Header
  //       style={{
  //         display: 'flex',
  //         alignItems: 'center',
  //         justifyContent: 'space-between',
  //         background: colorBgContainer,
  //         borderBottom: '1px solid lightgray',
  //       }}
  //     >
  //       <Link to="/">
  //         <div className="cursor-pointer tracking-widest font-mono text-2xl">
  //           LOGO
  //         </div>
  //       </Link>
  //
  //       <div className="flex gap-2 items-center">
  //         <Button
  //           size="large"
  //           type="text"
  //           shape="circle"
  //           icon={<PhoneOutlined />}
  //         />
  //         <Button
  //           size="large"
  //           type="text"
  //           shape="circle"
  //           icon={<QuestionCircleOutlined />}
  //         />
  //         <Button
  //           size="large"
  //           type="text"
  //           shape="circle"
  //           icon={<BellOutlined />}
  //         />
  //         <Button
  //           size="large"
  //           type="text"
  //           shape="circle"
  //           icon={<SettingOutlined />}
  //         />
  //         <Avatar size="large" shape="circle" icon={<UserOutlined />} />
  //       </div>
  //     </Header>
  //
  //     <Layout>
  //       <Sider
  //         width={200}
  //         style={{
  //           background: colorBgContainer,
  //           borderRight: '1px solid lightgray',
  //         }}
  //       >
  //         <Menu
  //           defaultSelectedKeys={['email-templates']}
  //           mode="inline"
  //           style={{ height: '100%', borderRight: 0 }}
  //           items={items}
  //         />
  //       </Sider>
  //
  //       <Layout>
  //         <Content
  //           style={{
  //             padding: 0,
  //             margin: 0,
  //             minHeight: 280,
  //           }}
  //         >
  //           <Outlet />
  //         </Content>
  //       </Layout>
  //     </Layout>
  //   </Layout>
  // );
};

export default App;
