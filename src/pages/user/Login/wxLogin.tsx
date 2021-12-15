import React, {useEffect, useState} from "react";
import {message, Spin} from "antd";
import {randomString} from "@/util";
import {wxLogin} from "@/services/ant-design-pro/api";
import {history} from "@@/core/history";
import {useModel} from "@@/plugin-model/useModel";
// import {useAsync, useEffectOnce} from "react-use";

let globalsid
const WXLogin: React.FC = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  // const [WXCode, setWXCode] = useState<string>('');
  const initWX = async () => {
    // console.log(window.location.origin)
    const sid = randomString(6)
    globalsid = sid
    // eslint-disable-next-line no-new
    new window.WxLogin({
      self_redirect: true,
      id: 'login_container',
      appid: window.APP_CONFIG.weixinAppId,
      scope: 'snsapi_login', // 写死，网页应用暂时只支持这个值
      redirect_uri: encodeURIComponent(`http://www.fanpi.cn/success.html`), // 扫码成功后重定向地址${window.location.origin}
      state: globalsid, // 随机字符串
      style: 'black',
      // base64加密的样式代码
      href: 'data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDIwMHB4O30NCi5pbXBvd2VyQm94IC50aXRsZSB7ZGlzcGxheTogbm9uZTt9DQouaW1wb3dlckJveCAuaW5mbyB7d2lkdGg6IDI3MHB4O30=',
    })

    // console.log(isLoading, 'loading')
  }
  // const onOpenLogin = () => {
  //   initWX()
  //   // const timer = setTimeout(() => {
  //   //   initWX()
  //   //   clearTimeout(timer)
  //   // }, 500)
  // }

  const {initialState, setInitialState} = useModel('@@initialState');
  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({...s, currentUser: userInfo}));
    }
  };
  useEffect(() => {
  // const WXLoginStep = async () => {
    (async function() {
      await initWX();
      await setLoading(false)
      window.removeEventListener('message', window.receiveMessageFromIndex)
      window.receiveMessageFromIndex = async function (event: any) {
        if (event !== undefined) {
          // 发送请求 event.data为微信信息对象 为对象类型再请求接口
          if (typeof event.data === 'object') {
            const WXCode = event.data.code
            // 没有code或已发请求 不重复请求，isLoading为是否在登录中判断值
            if (!WXCode || isLoading) return
            const body = {
              code: WXCode,
            }
            // console.log(body)
            // 执行项目的登录流程
            const msg = await wxLogin(body)
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
            }
          }
        }
      }
      /* 监听来自iframe的message事件 */
      window.addEventListener('message', window.receiveMessageFromIndex, false)
    })()
  // }
  }, [isLoading])
  // useAsync(() => {
  //   return WXLoginStep()
  // }, [isLoading])
  return (
    <Spin spinning={isLoading}>
      <div className={"wx_container"}
           style={{display: "flex", justifyContent: "center", height: '300px', overflow: "hidden"}}>
        <div id="login_container" style={{textAlign: 'center'}}/>
      </div>
    </Spin>
  )
}
export default WXLogin
