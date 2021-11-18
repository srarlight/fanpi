import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';


import {useModel} from "@@/plugin-model/useModel";



export default (): React.ReactNode => {
  const { initialState } = useModel('@@initialState');
  if (!initialState) {
    return false;
  }
  const {currentUser} = initialState
  return (
    <PageContainer>
      <Card>

        <div>用户信息</div>
        <div className="userInfo">
          <span style={{marginRight:"10px"}}>用户名：{currentUser?.userName}</span>
          <span style={{marginRight:"10px"}}>email：{currentUser?.email}</span>
          <span style={{marginRight:"10px"}}>登陆时间：{currentUser?.loginTime}</span>
          <span style={{marginRight:"10px"}}>登陆ip：{currentUser?.ip}</span>
        </div>

      </Card>
    </PageContainer>
  );
};
