import React, {useEffect, useState} from "react";
import {Form, Input, Modal, Button, Select} from "antd";
import {LockOutlined} from "@ant-design/icons";
import {checkImageCode, sendSms} from "@/services/ant-design-pro/api";


const {Option} = Select;

interface IBIndInfoFormProps {
  bindInfoModalVisible: boolean,
  id: string,
  bindInfo: (values: any) => any,
  onCancel: () => void
}

const BindInfoForm: React.FC<IBIndInfoFormProps> = (
  {id, bindInfo, bindInfoModalVisible, onCancel}
) => {
  const [form] = Form.useForm();
  const [time, setTime] = useState(60)
  const [isShowPhoneCode, setIsShowCode] = useState<boolean>(false);
  useEffect(() => {
    if (bindInfoModalVisible && !document.querySelector('#tscript')) {
      const s = document.createElement('script')
      s.src = 'https://ssl.captcha.qq.com/TCaptcha.js'
      s.id = 'tscript'
      document.body.appendChild(s)
    }
  }, [bindInfoModalVisible])
  const getCaptcha: () => Promise<any> = async (): Promise<any> => {
    const phone = form.getFieldValue('phone');
    const prefix = form.getFieldValue('prefix');
    if (isShowPhoneCode) {
      return false
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
    return await sendSms({
      phone: prefix + phone
    });
  }
  window.callbackName = async function (res: any) {
    // eslint-disable-next-line no-debugger

    // 返回结果
    // ret         Int       验证结果，0：验证成功。2：用户主动关闭验证码。
    // ticket      String    验证成功的票据，当且仅当 ret = 0 时 ticket 有值。
    // CaptchaAppId       String    验证码应用ID。
    // bizState    Any       自定义透传参数。
    // randstr     String    本次验证的随机串，请求后台接口时需带上。

    const {appid, bizState, ...rest} = res
    // res（用户主动关闭验证码）= {ret: 2, ticket: null}
    // res（验证成功） = {ret: 0, ticket: "String", randstr: "String"}
    // res（客户端出现异常错误 仍返回可用票据） = {ret: 0, ticket: "String", randstr: "String",  errorCode: Number, errorMessage: "String"}
    if (res.ret === 0) {
      await form.validateFields(['phone'])
      const result = await checkImageCode(rest);
      if (result.success) {
        // 发送短信验证码
        await getCaptcha();
      }
    }
  }
  // eslint-disable-next-line no-debugger
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{width: 70}}>
        <Option value="+86">+86</Option>
        {/* <Option value="+87">+87</Option> */}
      </Select>
    </Form.Item>
  );


  return <div>
    <Modal
      title={id === '1' ? '绑定手机' : "绑定邮箱"}
      width="500px"
      visible={bindInfoModalVisible}
      onOk={() => {
        form.validateFields().then(async values => {

         const result = await bindInfo(values);
          if(result.success){
            form.resetFields();
            onCancel()
          }
        })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
      okText={'确认修改'}
      onCancel={onCancel}
    >
      <Form
        form={form}
        labelAlign={"right"}
        labelCol={{span: 5}}
        wrapperCol={{span: 18}}
        initialValues={{
          prefix: '+86',
        }}
      >
        <Form.Item
          name="phone"
          label="手机号码"
          rules={[{required: true, message: '请输入手机号'}]}
        >
          <Input addonBefore={prefixSelector} style={{width: '100%'}} autoComplete={'off'}/>
        </Form.Item>
        <Form.Item
          name="checkCode"
          label="验证码"
          rules={[{required: true, message: '请输入验证码!'}]}
        >
          <div style={{display: "flex"}}>
            <Input style={{width: '100%'}} autoComplete={'off'}/>
            <Button id="TencentCaptcha" data-appid="2022498450" data-cbfn="callbackName" data-biz-state="data-biz-state"
                    type="primary">{isShowPhoneCode ? `${time}秒后重新发送` : '发送验证码'}</Button>
          </div>

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
            autoComplete={'off'}
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
            autoComplete={'off'}
          />
        </Form.Item>
      </Form>
    </Modal>
  </div>
}
export default BindInfoForm
