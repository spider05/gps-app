import { request, getOptions, postOptions } from './request'

// export 和 export default
// 首先我们讲这两个导出，下面我们讲讲它们的区别

// export与export default均可用于导出常量、函数、文件、模块等
// 在一个文件或模块中，export、import可以有多个，export default仅有一个
// 通过export方式导出，在导入时要加{ }，export default则不需要
// export能直接导出变量表达式，export default不行

export const GPSServer = {
  getOrganizeDataList: (values) => request('GPS/GPS_Organize/GetDataList', postOptions(values)), // 获取组织树,
  getOrganizesByOrgID: (values) => request('GPS/GPS_Organize/GetOrganizesByOrgID', getOptions(values)), // 组织树,
  getOrgTreeByOrgID: (values) => request('GPS/GPS_Organize/GetOrgTreeByOrgID', getOptions(values)), // 组织树,
  getTerminalsByOrgID: (values) => request('GPS/GPS_Terminal/GetTermianlsByOrgID', getOptions(values)), // 根据组织获取终端
  getDynamicGPSByIDS: (values) => request('GPS/GPS_DynamicTrack/GetDynamicGPSByIDS', postOptions(values)), // 动态表数据
  getGPSDataListByIDs: (values) => request('GPS/GPS_DynamicTrack/GetGPSDataListByIDs', postOptions(values)), // 动态表数据
  openUart: (values) => request('GPS/GPS_SerialPort/OpenUart', getOptions(values)), // 打开串口
  closeUart: () => request('GPS/GPS_SerialPort/CloseUart'), // 关闭串口
  sendDWSQ: (values) => request('GPS/GPS_SerialPort/SendDWSQ', getOptions(values)), // 定位申请
  sendMsg: (values) => request('GPS/GPS_SerialPort/SendMessage', postOptions(values)), // 发送信息
  sendWZBG: (values) => request('GPS/GPS_SerialPort/SendWZBG', getOptions(values)) // 发送信息

}

export const SysServer = {
  submitLogin: (values) => request('Base_Manage/Home/SubmitLogin', postOptions(values)), // 登入,
  getOperatorInfo: (values) => request('Base_Manage/Home/GetOperatorInfo', postOptions(values))// 权限,

}
// export default AxiosServer;

