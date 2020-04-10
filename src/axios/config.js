
/**
 * Created by 叶子 on 2017/7/30.
 * 接口地址配置文件
 */

// easy-mock模拟数据接口地址
const EASY_MOCK = 'https://www.easy-mock.com/mock'
const MOCK_AUTH = EASY_MOCK + '/597b5ed9a1d30433d8411456/auth' // 权限接口地址
export const MOCK_AUTH_ADMIN = MOCK_AUTH + '/admin' // 管理员权限接口
export const MOCK_AUTH_VISITOR = MOCK_AUTH + '/visitor' // 访问权限接口

export const NEWSLIST_URL = 'http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=top&count=30'

export function getResUrl(action, type, orgid, statisticField, strWhere) {
  // http://10.0.0.161:8011/Resource.ashx?action=project&type=statistic&orgid=934549c1c2cf46c4a01b05e2c5d8fc9c&statistic=NATUREID
  // let RES_URL=`http://10.0.0.160/HLTAPI/Resource.ashx?action=${action}&type=${type}&orgid=${orgid}`;
  // let RES_URL=`/Resource.ashx?action=${action}&type=${type}&orgid=${orgid}`;
  //    console.log('RES_URL:',RES_URL)
  // let RES_URL=`http://127.0.0.1:8011/Resource.ashx?action=${action}&type=${type}&orgid=${orgid}&statistic=${statisticField}&strWhere=${strWhere}`;
  let RES_URL = `http://127.0.0.1:8011/Resource.ashx`
  if (action || type || orgid || statisticField || strWhere) {
    RES_URL += `?`
  }
  if (action) {
    RES_URL += `&action=${action}`
  }
  if (type) {
    RES_URL += `&type=${type}`
  }
  if (orgid) {
    RES_URL += `&orgid=${orgid}`
  }
  if (statisticField) {
    RES_URL += `&statistic=${statisticField}`
  }
  if (strWhere) {
    RES_URL += `&strWhere=${strWhere}`
  }
  return RES_URL
}
// http://localhost:35950/Resource.ashx?action=table&type=sys_administrationregion&strWhere='' --查询表
/**
 * 社区与工程关系(早期的接口)
 */
export const Sub_Project_URL = '/subdistrict/projectRelated'

/**
 * EF的服务端
 */
// export  const EF_URL='http://localhost:8710/';
export const EF_URL = 'http://localhost:5000/'

