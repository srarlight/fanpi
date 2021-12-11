// @ts-ignore
/* eslint-disable */
import {request} from 'umi';

const token = sessionStorage.getItem('jwtToken');

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/fanpai/users/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/fanpai/users/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /fanpai/users/login */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/fanpai/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
/** 微信扫码登录接口 POST /fanpai/users/wxLogin */
export async function wxLogin(body: API.wxLoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/fanpai/users/wxLogin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
/** 注册接口 POST /fanpai/users/register */
export async function register(body: API.RegisterParams, options?: { [key: string]: any }) {
  return request<API.RegisterResult>('/fanpai/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 发送邮箱验证*/
export async function sendEmailCode(options?: { [key: string]: any }) {
  return request<API.EmaiResult>(
    '/fanpai/users/sendMail', {
      method: 'GET',
      params:{
        ...options
      },
      ...(options || {}),
    }
  )
}

/**  Post /fanpai/users/orderList  获取订单信息 */
export async function getOrderList(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/fanpai/users/orderList', {
    method: 'POST',
    data: options,
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function getActivityList(
  params: API.dataListItem,
  options?: { [p: string]: any },
) {
  return request<API.RuleList>('/fanpai/activity/list', {
    method: 'post',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新列表 Post /api/rule */
export async function updateActivityList(options?: { [key: string]: any }) {
  // console.log(options, 'options')
  return request<API.dataListItem>('/fanpai/activity/update', {
    method: 'POST',
    data: options,
    ...(options || {}),
  });
}

//查询渠道标识
export async function getChannelMark(options?: { [key: string]: any }) {
  return request<API.dataListItem>('/fanpai/getChannelMark', {
    method: 'get',
    ...(options || {}),
  });
}

//存储渠道标识
export async function saveChannelMark(options?: { [key: string]: any }) {
  return request<API.dataListItem>('/fanpai/saveChannelMark', {
    method: 'post',
    data: options,
    ...(options || {}),
  });
}

/**获取链接*/
export async function getSpreadLink(params: any, options?: { [key: string]: any }) {
  return request<API.dataListItem>('/fanpai/getSpreadLink', {
    method: 'get',
    params: {
      ...params
    },
    data: options,
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
