import {Settings as LayoutSettings} from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#ffD129',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  menu:{
    locale:true
  },
  title: '饭派开放平台',
  pwa: false,
  logo: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLiajgNaz9JZCvAibicvAK3zlRPicdDt65nFAnjzjoYQZm0h5yR7mCRlBJPlwUkRMLuJ3ZDwyFqtXSLSg/132',
  iconfontUrl: '',
};

export default Settings;
