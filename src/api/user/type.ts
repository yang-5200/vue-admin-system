// 用户接口参数类型

// 1.登录接口参数类型
export interface LoginFormData {
  username: string;
  password: string;
}

// 登录全部接口返回数据都拥有ts类型
export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

// 1.登录接口返回数据类型
export interface LoginResponseData extends ResponseData {
  data: string;
}

// 2.定义获取 用户信息返回数据类型
export interface UserInfoResponseData extends ResponseData {
  data: {
    routes: string[];
    buttons: string[];
    roles: string[];
    name: string;
    avatar: string;
  };
}

// 3.用户信息类型
export interface UserInfo {
  routes?: string[];
  buttons?: string[];
  roles?: string[];
  name?: string;
  avatar?: string;
}
