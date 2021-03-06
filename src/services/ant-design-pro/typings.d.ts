// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    userType: string;
    name: string;
    userName?: string;
    avatar?: string;
    userId?: string;
    roleId?: number;
    email?: string;
    provider?: string;
    title?: string;
    loginTime?: string;
    headimgurl: string,
    city: string,
    province: string
    ip?: string;
    updated_at?: string;
    role?: {
      description: string;
      id: number;
      name: string;
      type: string;
    };
    address?: string;
    telPhone?: string;

  };
  type DataResult = {
    jwtToken?: string
  }
  type LoginResult = {
    jwt?: string;
    user?: object;
    code?: string
    data: DataResult
    jwtToken?: string

  };
  type RegisterParams = {
    captcha: string
    confirm: string
    email: string
    password: string
    userName: string

  };

  type RegisterResult = {
    success: boolean;
    data?: object
  };
  type EmaiResult = {
    message?: string,
    success: boolean
  }
  type PageParams = {
    current?: number;
    pageSize?: number;
  };
  type CheckImageCode = {
    randstr:string
    ret: number
    ticket: string
  };
  type CheckImageCodeResult ={
    success:boolean,
    errorMessage?:string
  }
  type RuleListItem = {
    key: (value: API.RuleListItem, index: number, array: API.RuleListItem[]) => U;
    paytime: moment.MomentInput;
    actSrc: string;
    actDes: string;
    actName: string;
    url: string;
    actRule: string;
    status: string;
    data?: object;
    des: string;
  };
  type bindInfo = {
    checkCode?: string
    confirm?: string
    password?: string
    phone?: string
    prefix?: string
  }
  type updateJsonList = {
    json?: string
  }
  type activityList = {
    status: string;
    data?: activityItem[];
    des: string;
  };
  type activityItem = {

    dataList?: dataListItem[];
    header: headerItem[];
    total: string
  }
  type dataListItem = {
    success: boolean
    data?: object | undefined
    actDes?: string
    actName?: string
    actRule?: string
    actSrc?: string
    dateBound?: string
    id?: number
    ratio?: string
    url?: string,
    code?: string,
  }
  type RuleList = {
    data?: RuleListItem[];
    /** ????????????????????? */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    identifier?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };
  type wxLoginParams = {
    code: string
  }
  type ErrorResponse = {
    /** ???????????????????????? */
    errorCode: string;
    /** ???????????????????????? */
    errorMessage?: string;
    /** ?????????????????????????????? */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** ????????????????????? */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
