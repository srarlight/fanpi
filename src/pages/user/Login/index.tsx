import {

  LockOutlined,

  UserOutlined,

} from '@ant-design/icons';
import {message, } from 'antd';
import {Form, Input} from "antd";
import React from 'react';
import  {ProFormCheckbox} from '@ant-design/pro-form';
import { history, useModel} from 'umi';

import {login} from '@/services/ant-design-pro/api';


import "./index.less";


const Login: React.FC = () => {
  const {initialState, setInitialState} = useModel('@@initialState');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({...s, currentUser: userInfo}));
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    // const params = {...values,password:values.password && MD5(values.password)}
    try {
      // 登录
      const msg = await login({...values});
      const {jwtToken} = msg.data
      if (jwtToken) {
        const defaultLoginSuccessMessage = '登录成功！';
        sessionStorage.setItem('jwtToken', jwtToken);
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const {query} = history.location;
        const {redirect} = query as {
          redirect: string;
        };
        history.push(redirect || '/');
        return;
      }

    } catch (error) {
      // const defaultLoginFailureMessage = '登陆失败，请重试！';
      // message.error(error.data.message || defaultLoginFailureMessage);
      console.log(error,'error')
    }


  }; // @ts-ignore

  return (
    <div style={{display: "flex", width: "100%", height: "100%", justifyContent: "center", alignItems: "center"}}
         className="loginBody">
      <div className="form">
        <h1> Login </h1>
        <Form
          labelCol={{span: 8}}
          wrapperCol={{span: 16}}
          className="login-form"
          name="login-form"
          size="large"
          onFinish={(values) => handleSubmit(values as API.LoginParams)}
        >
          <Form.Item
            name="userName"
            rules={[{required: true, message: "请输入账号"}]}
          >
            <Input
              style={{width: "238px"}}
              prefix={<UserOutlined className="form-icon"/>}
              placeholder="账号"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{required: true, message: "请输入密码"}]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon"/>}
              type="password"
              style={{width: "238px"}}
              placeholder="请输入密码"
            />
          </Form.Item>
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              忘记密码 ?
            </a>
          </div>
            <a onClick={() => history.push('/home/register')}>去注册</a>
          <p className="login">
            <input type="submit" value="Login"/>
          </p>

        </Form>
      </div>
    </div>
  );
};

export default Login;
