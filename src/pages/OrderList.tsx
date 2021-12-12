import React, {useEffect, useRef, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import type {ProColumns, ActionType} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {getChannelMark, getOrderList} from '@/services/ant-design-pro/api';
import moment from "moment";
import {parseInt} from "lodash";


const getList = async (params: API.dataListItem) => {
  console.log(params)
  // eslint-disable-next-line no-restricted-syntax
  for (const paramsKey in params) {
    if (params[paramsKey] === '') {
      // eslint-disable-next-line no-param-reassign
      delete params[paramsKey]
    }
  }

  try {
    return await getOrderList(params);
  } catch (error) {
    return '请求失败'
  }
};

const OrderList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const actionRef = useRef<ActionType>();
  const [datas, setDatas] = useState({})
  const formRef = useRef<any>();
  useEffect(() => {
    getChannelMark().then((res: any) => {
      const data = {}
      res.data.forEach((item: any) => {
        data[item.channelMark] = {
          text: item.channelMark
        }

      })
      setDatas(data)
    })
  }, [])
  const curDate = [
    moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
  ];
  useEffect(() => {
    formRef.current?.setFieldsValue({
      paytime: curDate,
    });
    formRef.current?.submit();
  },[]);


  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: '订单id',
      dataIndex: 'orderid',
      width: '60px',
      key: 'orderid',
    },
    {
      title: '商品名称',
      dataIndex: 'smstitle',
      key: 'smstitle',
      hideInSearch: true
    },
    {
      title: '渠道标识',
      dataIndex: 'uid',
      key: 'uid',
      valueEnum: datas
    },
    {
      title: '支付时间',
      dataIndex: 'paytime',
      key: 'paytime',
      valueType: 'dateRange',
      search: {
        transform: (value) => {
          return {
            startTime: Date.parse(value[0]) / 1000,
            endTime:  Date.parse(value[1]) / 1000,
          };
        },
      },
      render: (_, record) => {
        return moment.unix(parseInt(record.paytime as string)).format('YYYY-MM-DD')
      }
    },
    {
      title: '实际支付金额',
      dataIndex: 'payprice',
      key: 'payprice',
      valueType: 'money',
      hideInSearch: true
    },
    {
      title: '预估佣金',
      dataIndex: 'profit',
      key: 'profit',
      hideInForm: true,
      valueType: 'money', hideInSearch: true
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      valueEnum: {
        1: {text: '已付款', status: 'Default'},
        8: {text: '已完成', status: 'Processing'},
        9: {text: '已退款或风控', status: 'Error'},
      },
    },
  ];


  // @ts-ignore
  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        actionRef={actionRef}
        rowKey="orderid"
        request={getList as any}
        columns={columns}
        pagination={false}
        formRef={formRef}
        search={{
          collapseRender:false,
          collapsed: false,
        }}
      />
    </PageContainer>
  );
};


export default OrderList;
