/*
 * @Auto: 蔡佳志
 * @Date: 2019-05-28
 * @Description: 时间日期相关操作模块
 * @LastEditors: 蔡佳志
 * @LastEditTime: 2019-06-03
 */

export let timeDo = {
    /**
     * @method 时间格式化
     * @param {string} datetime 国际化日期格式
     * @return {string} 日期字符
     * @desc 将 2018-09-23T11:54:16.000+0000 格式化成 2018/09/23 11:54:16
     */
    format: function (datetime) {
      return timeDo.formatWithSeperator(datetime, '-', ':', '0', 1)
    },
  
    /**
     * @method 时间格式化
     * @param {string} datetime 国际化日期格式
     * @param {string} dateSeprator 日期分隔符
     * @param {string} timeSeprator 时间分隔符
     * @param {string} patch 时间占位符
     * @param {string} typeTime 时间类型
     * @return {string} 日期字符
     * @desc  将 2018-09-23T11:54:16.000+0000 格式化成类似 2018-09-23 11:54:16
     */
    formatWithSeperator: function (datetime, dateSeprator, timeSeprator, patch, typeTime) {
      if (datetime) {
        const dateMat = new Date(datetime)
        const year = dateMat.getFullYear()
        let month, day, timeFormat
        if (dateMat.getMonth() + 1 < 10) {
          month = patch + (dateMat.getMonth() + 1)
        } else {
          month = dateMat.getMonth() + 1
        }
        if (dateMat.getDate() < 10) {
          day = patch + dateMat.getDate()
        } else {
          day = dateMat.getDate()
        }
        if (typeTime === 1) {
          const hh = dateMat.getHours()
          const mm = dateMat.getMinutes()
          const ss = dateMat.getSeconds()
          timeFormat = year + dateSeprator + month + dateSeprator + day + ' ' + hh + timeSeprator + mm + timeSeprator + ss
        } else {
          timeFormat = year + dateSeprator + month + dateSeprator + day
        }
        return timeFormat
      }
      return ''
    },
  
    /**
     * @method 时间增加
     * @param {dateTime} date 国际化日期格式
     * @param {int} day 日期天数
     * @return {string} 日期字符
     * @desc 增加对应天数
     */
    addDate: function (date, day) {
      date = new Date(date)
      date = date + day * 1000 * 60 * 60 * 24
      date = new Date(date)
      return dateTimeDo.format(date)
    },
  
    /**
     * @method 日期比较
     * @param {dateTime} sDate1 被比较日期
     * @param {dateTime} sDate2 比较日期
     * @return {number} 天数
     * @desc 日期比较
     */
    dateDiff: function (sDate1, sDate2) {
      let arrDate, objDate1, objDate2, iDays
      arrDate = sDate1.split('-')
      objDate1 = new Date(arrDate[1] + '/' + arrDate[2] + '/' + arrDate[0])
      arrDate = sDate2.split('-')
      objDate2 = new Date(arrDate[1] + '/' + arrDate[2] + '/' + arrDate[0])
      iDays = parseInt(Math.abs(objDate1 - objDate2) / 1000 / 60 / 60 / 24) // 相差毫秒数转成天数
      return iDays
    },
  
    /**
     * @method 获取星期数
     * @param {dateTime} date 国际化日期格式
     * @return {string} 星期字符
     * @desc
     */
    dayFormat: function (date) {
      let res = ''
      switch (new Date(date).getDay()) {
        case 0:
          res = '星期日'
          break
        case 1:
          res = '星期一'
          break
        case 2:
          res = '星期二'
          break
        case 3:
          res = '星期三'
          break
        case 4:
          res = '星期四'
          break
        case 5:
          res = '星期五'
          break
        case 6:
          res = '星期六'
          break
      }
  
      return res
    },
  
    /**
     * @method 时间
     * @param {number} value 秒数
     * @param {string} type 类型，1-h小时m分s秒，2-hh:mm:ss
     * @return {string} 星期字符
     * @desc
     */
    formatSeconds: function (value, type) {
      let result = ''
      if (type === 1) {
        let ss = parseInt(value)
        let mm = 0
        let hh = 0
        if (ss > 60) {
          mm = parseInt(ss / 60)
          ss = parseInt(ss % 60)
          if (mm > 60) {
            hh = parseInt(mm / 60)
            mm = parseInt(mm % 60)
          }
        }
        result = '' + parseInt(ss) + '秒'
        if (mm > 0) {
          result = '' + parseInt(mm) + '分' + result
        }
        if (hh > 0) {
          result = '' + parseInt(hh) + '小时' + result
        }
      } else {
        let hh = parseInt(value / 3600)
        if (hh < 10) hh = '0' + hh
        let mm = parseInt((value - hh * 3600) / 60)
        if (mm < 10) mm = '0' + mm
        let ss = parseInt((value - hh * 3600) % 60)
        if (ss < 10) ss = '0' + ss
        result = hh + ':' + mm + ':' + ss
      }
      return result
    }
  }
  