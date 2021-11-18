import React from "react";
import {Button, Form, Input, message} from "antd";

interface LinkFormProps {
  linkUrl: string | undefined,
  shortUrl?: string | undefined
}

const LinkForm: React.FC<LinkFormProps> = ({linkUrl, shortUrl}) => {
  const [form] = Form.useForm();
  const {TextArea,Search} = Input;
  const onCopy = (value: any) => {
    const oInput = document.createElement('input')
    oInput.value = value;
    document.body.appendChild(oInput)
    oInput.select() // 选择对象
    document.execCommand("Copy") // 执行浏览器复制命令
    message.success("复制成功");
    oInput.remove()
  }


  return <Form
    form={form}
  >
      <Form.Item  label={shortUrl ? '长链接' : null}>
        <div style={{display:"flex",alignItems:"center",width:'100%'}}>
          <TextArea rows={8} value={linkUrl}/>
          <Button type={"primary"} style={{marginRight: "18px"}} onClick={() => onCopy(linkUrl)}>复制</Button>
        </div>

      </Form.Item>


    {shortUrl?<Form.Item label={'短链接'}>
      <Search value={shortUrl} enterButton="复制" onSearch={()=>onCopy(shortUrl)} style={{ width: 300 }}/>
    </Form.Item>:null}

  </Form>
}
export default LinkForm
