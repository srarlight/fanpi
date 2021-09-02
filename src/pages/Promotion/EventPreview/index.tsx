import {message, Drawer, Button} from 'antd';
import React, {useState, useRef} from 'react';
import {useIntl, FormattedMessage} from 'umi';
import {PageContainer} from '@ant-design/pro-layout';
import type {ProColumns, ActionType} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {ModalForm, ProFormText, ProFormTextArea} from '@ant-design/pro-form';
import type {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import {rule, addRule} from '@/services/ant-design-pro/api';
import {PlusOutlined} from "@ant-design/icons";
import { useAccess } from 'umi';


/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.RuleListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({...fields});
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */




const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();
  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: (
        <FormattedMessage
          id="pages.eventPreview.activeId"
          defaultMessage="活动id"
        />
      ),
      dataIndex: 'activeId',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },

    {
      title: (
        <FormattedMessage
          id="pages.eventPreview.url"
          defaultMessage=""
        />
      ),
      dataIndex: 'url',
      hideInForm: true,
      renderText: (val: string) =>
        `${val}${intl.formatMessage({
          id: 'pages.eventPreview.url',
          defaultMessage: ' 万 ',
        })}`,
    },
    {
      title: <FormattedMessage id="pages.eventPreview.titleDesc" defaultMessage="活动信息"/>,
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.eventPreview.actRule" defaultMessage="推广规则"/>,
      dataIndex: 'actRule',
      hideInForm: true,
    },
    {
      title: <FormattedMessage id="pages.eventPreview.ratio" defaultMessage="平均佣金比例"/>,
      dataIndex: 'ratio',
      hideInForm: true,
    },
    {
      title: (
        <FormattedMessage
          id="pages.eventPreview.dateBound"
          defaultMessage="活动有效期"
        />
      ),
      dataIndex: 'dateBound',
    },
    {
      title: <FormattedMessage id="pages.eventPreview.titleOption" defaultMessage="Operating"/>,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id="pages.eventPreview.config" defaultMessage="我要推广"/>
        </a>,

      ],
    },
  ];
  const access = useAccess()
  // @ts-ignore
  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={() => [
         access.canSuper?<Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>:null,
        ]}
        request={rule}
        columns={columns}
        pagination={false}
      />

      <ModalForm
        title={intl.formatMessage({
          id: 'pages.eventPreview.createForm.newRule',
          defaultMessage: 'New rule',
        })}
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.RuleListItem);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.eventPreview.ruleName"
                  defaultMessage="Rule name is required"
                />
              ),
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormTextArea width="md" name="desc"/>
      </ModalForm>

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
