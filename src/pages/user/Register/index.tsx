import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import "./index.less";
import { message} from 'antd';
import {Form, Input} from "antd";
import React, {useState} from 'react';
import {history} from 'umi';

import {register, sendEmailCode,} from '@/services/ant-design-pro/api';



const Register: React.FC = () => {
  const [form] = Form.useForm();
  const [time, setTime] = useState(60)
  const [isShowCode, setIsShowCode] = useState<boolean>(false);
  const handleSubmit = async (values: API.RegisterParams) => {
    try {
      // 注册
      const msg = await register({...values});
      if (msg.success) {
        message.success('注册成功')
      }
    } catch (error: unknown) {
      console.log(error)
    }
  }; // @ts-ignore
  /* 获取邮箱验证码 */
  const getCaptcha: () => Promise<any> = async (): Promise<any> => {
    const email = form.getFieldValue('email');
    await form.validateFields(['email'])
    if (isShowCode) { // 倒计时未结束,不能重复点击
      return
    }
    setIsShowCode(true)
    const active = setInterval(() => {
      setTime((preSecond) => {
        if (preSecond <= 1) {
          setIsShowCode(false)
          clearInterval(active)
          // 重置秒数
          return 60
        }
        return preSecond - 1
      })
    }, 1000)
    const res =  await sendEmailCode({
      email
    });
    if(res.success){
      message.success('邮件发送成功，请查收')
    }
  }
  return (
    <div style={{display: "flex", width: "100%", height: "100%", justifyContent: "center", alignItems: "center"}}
         className="registerBody">
      <div className="registerForm">
        <h1> Register </h1>
        <Form
          form={form}
          labelCol={{span: 7}}
          wrapperCol={{span: 18}}
          className="login-form"
          name="login-form"
          size="large"
          onFinish={(values) => handleSubmit(values as API.RegisterParams)}
        >
          <Form.Item
            name="email"
            label={'邮箱'}
            rules={[
              {
                type: 'email',
                message: '请输入正确的邮箱!',
              },
              {
                required: true,
                message: '请输入邮箱!',
              },
            ]}
          >
            <Input
              style={{width: "100%"}}
              prefix={<UserOutlined className="form-icon"/>}
              placeholder="邮箱"
            />
          </Form.Item>
          <Form.Item
            name="userName"
            label={'用户名'}
            rules={[{required: true, message: "请输入用户名"}]}
          >
            <Input
              style={{width: "100%"}}
              prefix={<UserOutlined className="form-icon"/>}
              placeholder="账号"
            />
          </Form.Item>

          <Form.Item
            label={'密码'}
            name="password"
            hasFeedback
            rules={[{required: true, message: "请输入密码"}]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon"/>}
              type="password"
              style={{width: "100%"}}
              placeholder="请输入密码"
            />
          </Form.Item>
          <Form.Item
            label={'确认密码'}
            name="confirm"
            hasFeedback
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({getFieldValue}) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'));
                },
              }),
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon"/>}
              type="password"
              style={{width: "100%"}}
              placeholder="请确认密码"
            />
          </Form.Item>
          <Form.Item label="邮箱验证码"
                     name="captcha"
                     rules={[{required: true, message: "请输入邮箱验证码"}]}
          >
            <Input
              style={{width: "100%"}}
              placeholder="请输入邮箱验证码"
              suffix={<a onClick={() => getCaptcha()} href='#'>
                {isShowCode ? `${time}秒后重新发送` : '发送邮箱验证码'}
              </a>}
            />

          </Form.Item>
          <div
            style={{
              marginBottom: 24,
            }}
          >

          </div>

          <a onClick={() => history.push("/home/login")}>去登陆</a>
          <p className="register">
            <input type="submit" value="register"/>
          </p>

        </Form>
      </div>
    </div>
  );
};

export default Register;
