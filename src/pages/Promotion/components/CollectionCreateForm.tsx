import React, {useEffect, useState} from "react";
import {Form, Input, Modal, Radio, Select} from "antd";
import {getChannelMark} from "@/services/ant-design-pro/api";

interface Values {
  channel: string;
  channelMark: string | number;
}

interface CollectionCreateFormProps {
  promotionModalVisible: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
  recordData: object;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = (
  {
    promotionModalVisible,
    onCreate, onCancel
  }
) => {
  const {Option} = Select;
  const [form] = Form.useForm();
  const [channel, setChannel] = useState<number>(1);
  const [channelMark, setChannelMark] = useState<{ channelMark: string, uuid: string }[]>([])
  useEffect(() => {
    getChannelMark().then((res: any) => {
      setChannelMark(res?.data)
    })
  }, [channel])

  // @ts-ignore
  return (
    <Modal
      title='我要推广'
      width="500px"
      visible={promotionModalVisible}
      onOk={() => {
        form.validateFields().then(values => {
          form.resetFields();
          setChannel(1)
          onCreate(values);
        })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
      okText={'获取链接'}
      onCancel={onCancel}
    >
      <Form
        form={form}
        initialValues={{
          'channel': 1,
        }}
      >
        <Form.Item name="channel">
          <Radio.Group onChange={(e) => {
            setChannel(e.target.value)
          }
          }>
            <Radio value={1}>选择渠道标识</Radio>
            <Radio value={2}>新建渠道标识</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="channelMark"
          label="渠道标识"
          rules={[{required: true, message: '请选择渠道标识'}]}
        >
          {channel === 1 ? (<Select placeholder="请选择渠道标识" style={{width: '180px'}}>
            {channelMark?.map((mark: { channelMark: string, uuid: string }) =>
              (<Option value={mark.channelMark} key={mark.uuid}>{mark.channelMark}</Option>)
            )}
          </Select>) : (<Input placeholder="请选择渠道标识" style={{width: '180px'}}/>)}
        </Form.Item>


      </Form>
    </Modal>
  )
}
export default CollectionCreateForm
