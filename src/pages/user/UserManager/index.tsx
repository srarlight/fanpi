import React, {useState} from 'react';
import ProList from '@ant-design/pro-list';
import {PageContainer} from '@ant-design/pro-layout';
import {MobileTwoTone, MailTwoTone} from "@ant-design/icons";
import BindInfoForm from "@/pages/user/UserManager/components/BindInfoForm";
import {bindUserInfo} from "@/services/ant-design-pro/api";
import {Encrypt} from "@/util";



const defaultData = [
  {
    id: '1',
    name: '绑定手机号',
    image:
      <MobileTwoTone style={{'fontSize': '30px'}}/>,
    desc: '手机号绑定成功后可以作为登录账号使用',
  },
  {
    id: '2',
    name: '绑定邮箱',
    image:
      <MailTwoTone style={{'fontSize': '30px'}}/>,
    desc: '邮箱号绑定成功后可以作为登录账号使用',
  },

];

type DataItem = typeof defaultData[number];


const UserManager: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataItem[]>(defaultData);
  const [bindInfoModalVisible, setBindInfoModalVisible] = useState<boolean>(false);
  const [bindId, setBindId] = useState<string>('')
  const bindInfo = async (values: API.bindInfo) => {
    const params = {...values,password:Encrypt(values.password),confirm:Encrypt(values.confirm),mode:'phone'}
    return await bindUserInfo(params);

  }
  return <PageContainer>
    <ProList<DataItem>
      rowKey="id"
      headerTitle="账号信息绑定"
      dataSource={dataSource}
      showActions={'always'}
      split={true}
      onDataSourceChange={setDataSource}
      metas={{
        title: {
          dataIndex: 'name',
        },
        avatar: {
          dataIndex: 'image',
          editable: false,
        },
        description: {
          dataIndex: 'desc',
        },
        actions: {
          render: (text: any, row: { id: any; }) => [
            <a
              onClick={async () => {
                setBindId(row.id)
                setBindInfoModalVisible(true)
              }}
              key="link"
            >
              绑定
            </a>,
          ],
        },
      }}
    />
    <BindInfoForm bindInfoModalVisible={bindInfoModalVisible} id={bindId} bindInfo={bindInfo} onCancel={() => {
      setBindInfoModalVisible(false)
    }}/>
  </PageContainer>
}
export default UserManager
