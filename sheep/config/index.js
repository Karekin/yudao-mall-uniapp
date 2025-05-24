import packageInfo from '@/package.json';

const { version } = packageInfo;

// 开发环境配置
export let baseUrl;
if (process.env.NODE_ENV === 'development') {
  // #ifdef MP-WEIXIN
  // 小程序环境需要使用完整的后端地址，不能使用代理
  baseUrl = 'http://127.0.0.1:48080';
  // #endif
  
  // #ifndef MP-WEIXIN
  // H5环境使用环境变量（可以为空，走代理）
  baseUrl = import.meta.env.SHOPRO_DEV_BASE_URL;
  // #endif
} else {
  baseUrl = import.meta.env.SHOPRO_BASE_URL;
}
if (typeof baseUrl === 'undefined') {
  console.error('请检查.env配置文件是否存在');
} else {
  console.log(`[芋道商城 ${version}]  https://doc.iocoder.cn`);
}

export const apiPath = import.meta.env.SHOPRO_API_PATH;
export const staticUrl = import.meta.env.SHOPRO_STATIC_URL;
export const tenantId = import.meta.env.SHOPRO_TENANT_ID;
export const websocketPath = import.meta.env.SHOPRO_WEBSOCKET_PATH;
export const h5Url = import.meta.env.SHOPRO_H5_URL;

export default {
  baseUrl,
  apiPath,
  staticUrl,
  tenantId,
  websocketPath,
  h5Url,
};
