
/**
 * 类似于Java中的Thread.sleep()方法
 * export 导出可以方便其他文件引用
 * 
 * @param {number} ms - 暂停的毫秒数
 * @returns {Promise} 返回一个在指定时间后解析的Promise对象
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}