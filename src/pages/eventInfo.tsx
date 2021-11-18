import React, {useState} from 'react';
import {PageContainer,PageLoading} from '@ant-design/pro-layout';

import {Tabs, Card} from 'antd';

import {useHistory} from 'umi';
import {useModel} from "@@/plugin-model/useModel";
import {useAsync} from "react-use";
import {getSpreadLink} from "@/services/ant-design-pro/api";
import {isNull} from "@/util";
import LinkForm from "@/pages/Promotion/components/linkForm";

const {TabPane} = Tabs;

function callback(key: any) {
  console.log(key);
}


export default (): React.ReactNode => {
  const {initialState} = useModel('@@initialState');
  const history = useHistory()
  const {actId, channelMark} = history.location.query;
  const [info, setInfo] = useState({
    deepLink: undefined,
    h5: undefined,
    middleLink: undefined,
    weepLink: undefined,
    shortH5Url: undefined,
    shortMiddleLink: undefined
  })
  const result = useAsync(async () => {
    const response = await getSpreadLink({
      actId, channelMark
    })
    // @ts-ignore
    setInfo(response.data as any)
    return response
  }, [actId])

  if (!initialState) {
    return false;
  }
  // eslint-disable-next-line no-restricted-syntax

  return result.loading?(<PageLoading/>):(
    <PageContainer>
      <Card>
        <Tabs onChange={callback}>
          {!isNull(info.deepLink) ? (<TabPane tab={'DeepLink链接'} key={'deepLink'}>
            <LinkForm linkUrl={info.deepLink}/>
          </TabPane>) : null}
          {!isNull(info.h5) ? (<TabPane tab={'h5'} key={'h5'}>
            <LinkForm linkUrl={info.h5} shortUrl={info.shortH5Url}/>
          </TabPane>) : null}
          {!isNull(info.middleLink) ? (<TabPane tab={'中间页唤醒链接'} key={'middleLink'}>
            <LinkForm linkUrl={info.middleLink} shortUrl={info.shortMiddleLink}/>
          </TabPane>) : null}
          {!isNull(info.weepLink) ? (<TabPane tab={'微信小程序路径'} key={'weepLink'}>
            <LinkForm linkUrl={info.weepLink}/>
          </TabPane>) : null}
        </Tabs>
      </Card>

    </PageContainer>
  );
};
