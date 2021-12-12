import React, {useState} from 'react';
import ProList from '@ant-design/pro-list';
import {PageContainer} from '@ant-design/pro-layout';
import {MobileTwoTone, MailTwoTone} from "@ant-design/icons";

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
    desc: '我是一条测试的描述',
  },

];

type DataItem = typeof defaultData[number];


const startEditable = async (id: number) => {
  console.log(id)
}
const UserManager: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataItem[]>(defaultData);

  return <PageContainer>
    <ProList<DataItem>
      rowKey="id"
      headerTitle="账号信息绑定"
      dataSource={dataSource}
      showActions={'always'}
      split={true}
      editable={{
        onSave: async (key: any, record: any, originRow: any) => {
          console.log(key, record, originRow);
          return true;
        },
      }}
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
        // subTitle: {
        //   render: () => {
        //     return (
        //       <Space size={0}>
        //         <Tag color="blue">Ant Design</Tag>
        //         <Tag color="#5BD8A6">TechUI</Tag>
        //       </Space>
        //     );
        //   },
        // },
        actions: {
          render: (text: any, row: { id: any; }, index: any, action: { startEditable: (arg0: any) => void }) => [
            <a
              onClick={async () => {
                await startEditable(row.id);
              }}
              key="link"
            >
              绑定
            </a>,
          ],
        },
      }}
    />
  </PageContainer>
}
export default UserManager
