import {message, Button, Image,} from 'antd';
import React, {useState, useRef} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import type {ProColumns, ActionType} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {ModalForm, ProFormTextArea} from '@ant-design/pro-form';

import {getActivityList, saveChannelMark, updateActivityList} from '@/services/ant-design-pro/api';
import {useAccess, history} from 'umi';
import {isNull} from "@/util";
import CollectionCreateForm from "@/pages/Promotion/components/CollectionCreateForm";


const handleAdd = async (fields: API.updateJsonList) => {
  const object = JSON.parse(fields.json as string);
  const {dataList} = object.data;
  const hide = message.loading('正在更新');
  try {
    const res = await updateActivityList({json: dataList});
    hide();
    if (res.success) {
      message.success('更新成功');
    } else {
      message.error('更新失败，请用红包联系管理员修复');
    }

    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};
const getList = async (params: API.dataListItem) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const paramsKey in params) {
    if (params[paramsKey] === '') {
      // eslint-disable-next-line no-param-reassign
      delete params[paramsKey]
    }
  }
  try {
    return await getActivityList(params);
  } catch (error) {
    return '请求失败'
  }
};

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();

  const access = useAccess()
  const [promotionModalVisible, handlePromotionModalVisible] = useState<boolean>(false);
  const [recordData, setRecordData] = useState({
    id: undefined
  })
  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: '活动id',
      dataIndex: 'id',
      width: '60px',
      key: 'id',
    },
    {
      title: '活动信息',
      dataIndex: 'url',
      key: 'url',
      hideInSearch: true,
      hideInForm: true,
      render: (_, record) => {
        return (
          <Image
            width={200}
            src={record.url}
          />
        )
      }
    },
    {
      title: '活动描述',
      dataIndex: 'desc',
      key: 'desc',
      valueType: 'textarea',
      hideInSearch: true,
      render: (_, record) => [
        <h4 key="actName">{record?.actName?.replace(/"/, '')}</h4>,
        <p key="actDes">{record.actDes?.replace(/"/, '')}</p>
      ]

    },
    {
      title: '推广规则',
      dataIndex: 'actRule',
      key: 'actRule',
      hideInForm: true,
      hideInSearch: true,
      render: (_, record) => {
        const NewRule = record.actRule.replace(/\\/g, "");
        return (
          <div dangerouslySetInnerHTML={{__html: NewRule}} key="actRule"/>
        )
      }
    },
    {
      title: '平均佣金比例',
      dataIndex: 'ratio',
      key: 'ratio',
      hideInForm: true,
      hideInSearch: true
    },
    {
      title: "活动有效期",
      dataIndex: 'dateBound',
      key: 'dateBound',
      hideInSearch: true
    },
    {
      title: "操作",
      dataIndex: 'option',
      key: 'option',
      width: '50px',
      valueType: 'option',
      render: (_, record) => {
        const ActSrcButton = !isNull(record.actSrc) ? <Button type="primary"
                                                              key="actSrc"
                                                              href={record.actSrc}
        >打包物料下载</Button> : null
        return <div>
          <Button
            type="primary"
            style={{marginBottom: '5px'}}
            key="config"
            onClick={() => {
              setRecordData(record as any);
              handlePromotionModalVisible(true);
            }}
          >
            我要推广
          </Button>
          {ActSrcButton}
        </div>
      },
    },
  ];
  const onCreate = async (values: any) => {
    if (values.channel === 2) {
      await saveChannelMark({
        "channelMark": values.channelMark,
      })
    }
    // @ts-ignore
    history.push({
      pathname: '/promotion/event-link',
      query: {
        channelMark: values.channelMark,
        actId: recordData.id
      },
    });
    handlePromotionModalVisible(false);
  };

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        actionRef={actionRef}
        rowKey="actName"
        toolBarRender={() => [
          access.canSuper ? <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            更新列表数据
          </Button> : null,
        ]}
        request={getList as any}
        columns={columns}
        pagination={false}
      />
      <ModalForm
        title='更新列表'
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.updateJsonList);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormTextArea width="md" name="json" label="粘贴json"/>
      </ModalForm>
      <CollectionCreateForm recordData={recordData} promotionModalVisible={promotionModalVisible} onCreate={onCreate}
                            onCancel={() => {
                              handlePromotionModalVisible(false)
                            }
                            }/>
    </PageContainer>
  );
};


export default TableList;
