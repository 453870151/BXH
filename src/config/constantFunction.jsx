import cookie from 'react-cookies'
import BigNumber from 'bignumber.js'

export const getTokenLogoURLWithName = (name) =>
  `https://bxh-images.s3.ap-east-1.amazonaws.com/coin/${name.toUpperCase()}.png`

export const getTokenLogoDefault = ()=>{
  return require('../assets/bxh/default_coin.png')
}

export const getStyleClass = (name,className) => {
  const chainID = localStorage.getItem('chainIDSwitch')
  switch (chainID) {
    case '56':
      return [className,'bsc'+name].join(' ')
    case '1':
      return [className,'eth'+name].join(' ')
    case '66':
      return [className,'okex'+name].join(' ')
    case '137':
      return [className,'poly'+name].join(' ')
    case '43114':
      return [className,'avax'+name].join(' ')
    default:
      return [className,'heco'+name].join(' ')
  }
}

export const getNewStyleClass = (name,className1,className2,className3,className4) => {
  const chainID = localStorage.getItem('chainIDSwitch')
  switch (chainID) {
    case '56':
      return ['bsc'+name, className1, className2, className3, className4].join(' ')
    case '1':
      return ['eth'+name, className1, className2, className3, className4].join(' ')
    case '66':
      return ['okex'+name, className1, className2, className3, className4].join(' ')
    case '137':
      return ['poly'+name, className1, className2, className3, className4].join(' ')
    case '43114':
      return ['avax'+name, className1, className2, className3, className4].join(' ')
    default:
      return ['heco'+name, className1, className2, className3, className4].join(' ')
  }
}

const numberDecimal = (number)=>{
  if(number){
    if(toolNumber(number) >= '1'){
      return formatDecimal(number, 4)
    }else{
      var reg = new RegExp('^(([^0][0-9]+|0)\.(0+[1-9]{1,4}))$');
      if(!number.toString().split(".")[1]){
        return false
      }
      // 小数点后面<=4位
      if(number.toString().split(".")[1].length <= 4){
        return formatDecimal(number, 4)
      }
      else if(reg.test(number)){
        // 是否符合正则表达式
        return number;
      }else{
        // 超过正则长度的从后面开始删位数 直到返回true就可以了
        if(number > 0.1){
          return formatDecimal(number, 4)
        }else{
          return numfun(number)
        }
      }
    }
  }else if(parseInt(number) == 0){
    return formatDecimal(number, 4)
  }
}

const numfun = (num) => {
  if(num){
    if(num >= 0){
      var reg = new RegExp('^(([^0][0-9]+|0)\.(0+[1-9]{1,4}))$');
      if(reg.test(String(num).substring(0,String(num).length - 1))){
        return String(num).substring(0,String(num).length - 1);
      }else{
        num = String(num).substring(0,String(num).length - 1);
        return numfun(num)
      }
    }
  }
}

const formatDecimal = (num, decimal) => {
  num = num.toString()
  let index = num.indexOf('.')
  if (index !== -1) {
      num = num.substring(0, decimal + index + 1)
  } else {
      num = num.substring(0)
  }
  return parseFloat(num).toFixed(decimal)
}

const SaveToTwoWei = (number,scale=2) => {
  // var scaleP = Math.pow(10,scale);
  // var result = Math.floor(number * scaleP) /scaleP;
  let result = _toPrecision(number, scale);
  return result;
}
export const _toPrecision = (num, len=8) =>{
  let str = new BigNumber(num).toFixed(len,1);
  if (!Boolean(str)) return '0';
  if (!(/^[0-9.]+$/g.test(str))) return '0';
  while (str.includes(".") && (str.endsWith('.') || str.endsWith('0'))) {
      str = str.slice(0, -1)
  }
  return str
}
//保留两位，有00小数
const saveToWei = (number, scale=2) => {
  let bigNum = new BigNumber(number)
  let result = bigNum.toFixed(scale, 1);
  return result;
}
export const isNoEmpty = (val) => {
  if(val!=null&&val!=undefined&&val!=NaN&&val!='NaN'&&val!==''){
      return true
  }
  return false
}
export const isEmpty = (val) => {
  if(val==null||val==undefined||val==NaN||val=='NaN'||val===''){
      return true
  }
  return false
}

//美元逗号展示
const toShowDollar = (amount) => {
  let temp = amount;
  if (typeof(amount) !== 'string') {
    temp = String(amount);
  }
  return temp.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,") 
}


// 防止精度计算后数字太大（超出21位）出错
const toolNumber = (num_str) => {
  num_str = num_str.toString();
  if (num_str.indexOf("+") != -1) {
    num_str = num_str.replace("+", "");
  }
  if (num_str.indexOf("E") != -1 || num_str.indexOf("e") != -1) {
    var resValue = "",
      power = "",
      result = null,
      dotIndex = 0,
      resArr = [],
      sym = "";
    var numStr = num_str.toString();
    if (numStr[0] == "-") {
      // 如果为负数，转成正数处理，先去掉‘-’号，并保存‘-’.
      numStr = numStr.substr(1);
      sym = "-";
    }
    if (numStr.indexOf("E") != -1 || numStr.indexOf("e") != -1) {
      var regExp = new RegExp(
        "^(((\\d+.?\\d+)|(\\d+))[Ee]{1}((-(\\d+))|(\\d+)))$",
        "ig"
      );
      result = regExp.exec(numStr);
      if (result != null) {
        resValue = result[2];
        power = result[5];
        result = null;
      }
      if (!resValue && !power) {
        return false;
      }
      dotIndex = resValue.indexOf(".") == -1 ? 0 : resValue.indexOf(".");
      resValue = resValue.replace(".", "");
      resArr = resValue.split("");
      if (Number(power) >= 0) {
        var subres = resValue.substr(dotIndex);
        power = Number(power);
        //幂数大于小数点后面的数字位数时，后面加0
        for (var i = 0; i < power - subres.length; i++) {
          resArr.push("0");
        }
        if (power - subres.length < 0) {
          resArr.splice(dotIndex + power, 0, ".");
        }
      } else {
        power = power.replace("-", "");
        power = Number(power);
        //幂数大于等于 小数点的index位置, 前面加0
        for (var i = 0; i < power - dotIndex; i++) {
          resArr.unshift("0");
        }
        var n = power - dotIndex >= 0 ? 1 : -(power - dotIndex);
        resArr.splice(n, 0, ".");
      }
    }
    resValue = resArr.join("");

    return sym + resValue;
  } else {
    return num_str;
  }
}

//cookie这边只存删数据，读数据在界面中引入cook组件，并cookie.load
const addCookie = (key,value,isChange) => {
  if(value.hash){
    let localDataArray = []
    let cookieArray = cookie.load(key)
    if(isChange){
      let position = checkPositionByHash(cookieArray,value.hash)
      localDataArray[position] = value
    }else{
      localDataArray.push(value)
    }
    if(cookieArray){
      cookieArray.map((item,index) => {
        localDataArray.push(item)
      })
    }
    cookie.save(key, localDataArray)
  }
}

const checkPositionByHash = (allData,hash) => {
  if(!allData){
    console.log("0")
    return 0
  }
  for(let i = 0;i<allData.length;i++){
    if(allData[i].hash == hash){
      return i
    }
  }
}

const judgeSizeForNumber = (number1,number2) =>{
  let bg1 = new BigNumber(number1)
  let bg2 = new BigNumber(number2)
  let amount = bg1.minus(number2).toFixed();

  return amount>0
}

const removeCookieAndSetnewData = (key,data) => {
  cookie.remove(key)
  cookie.save(key,data)
}

const removeCookieWithKey = (key) => {
  cookie.remove(key)
}

const removeCookieListlast = (key) => {
  let cookieArray = cookie.load(key)
  let data_temp = []
  cookieArray.map( (item,index) => {
    if(index!=0){
      data_temp.push(item)
    }
  })
  cookie.save(key,data_temp)
}

function pageInputScroll() {
  alert('111')
}

//次方
const _getValuePow = (value, pow, scale=2) => {
  let bg1 = new BigNumber(value)
  let amount = bg1.pow(pow).toFixed(scale, 1);
  return amount;
}

//除法
const _getValueDivided = (value,value2,scale=2)=> {
  let bg1 = new BigNumber(value)
  let bg2 = new BigNumber(value2)
  let amount = bg1.dividedBy(bg2).toFixed(scale, 1);
  return amount;
}
const _getValueDivided1 = (value,value2)=> {
  let bg1 = new BigNumber(value)
  let bg2 = new BigNumber(value2)
  let amount = bg1.dividedBy(bg2).toFixed();
  return amount;
}
//乘法
const _getValuemultip = (value, value2,scale=2) => {
  //BigNumber
  let params1 = new BigNumber(value)
  let valueDecimals = params1.multipliedBy(value2).toFixed(scale, 1)
  return valueDecimals
} 
const _getValuemultip1 = (value, value2) => {
  //BigNumber
  let params1 = new BigNumber(value)
  let valueDecimals = params1.multipliedBy(value2).toFixed()
  return valueDecimals
} 
export const _getValueMultipZero = (value,value2) => {
  let params1 = new BigNumber(value)
  let valueDecimals = params1.multipliedBy(value2).toFixed(0, 1)
  return valueDecimals
}
// 减法
const _getValueDivided3 = (value,value2)=> {
  let bg1 = new BigNumber(value)
  let bg2 = new BigNumber(value2)
  let amount = bg1.minus(bg2).toFixed();
  return amount;
}
//减法保留4位
const _getValueMinus4 = (value,value2,scale=4)=> {
  let bg1 = new BigNumber(value)
  let bg2 = new BigNumber(value2)
  let amount = bg1.minus(bg2).toFixed(scale,1);
  return amount;
}
export const _getValueMinus2 = (value,value2,scale=2)=> {
  let bg1 = new BigNumber(value)
  let bg2 = new BigNumber(value2)
  let amount = bg1.minus(bg2).toFixed(scale,1);
  return amount;
}
const _getValueMinus = (value,value2)=> {
  let bg1 = new BigNumber(value)
  let bg2 = new BigNumber(value2)
  let amount = bg1.minus(bg2).toFixed();
  return amount;
}
const _getValueAdd4 = (value,value2)=> {
  let bg1 = new BigNumber(value)
  let bg2 = new BigNumber(value2)
  let amount = bg1.plus(bg2).toFixed(4,1);
  return amount;
}
//加法
const _getValueAdd = (value,value2) => {
  var bg1 = new BigNumber(value);
  var bg2 = new BigNumber(value2);
  let amount = bg1.plus(bg2).toFixed(12, 1);
  return amount;
}
//加法
const _getValueAdd2 = (value,value2,scale=2) => {
  var bg1 = new BigNumber(value);
  var bg2 = new BigNumber(value2);
  let amount = bg1.plus(bg2).toFixed(scale, 1);
  return amount;
}

// 时间戳转换
const formatDate = (date) => {
  var date = new Date(date * 1000);
  var YY = date.getFullYear() + '-';
  var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
  var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  
  return YY + MM + DD +" "+hh + mm + ss;
}

const formatDate1 = (date) => {
  var date = new Date(date * 1000);
  var YY = date.getFullYear() + '/';
  var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
  var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
  var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  
  return YY + MM + DD +" "+hh + mm + ss;
}

const formatTimeDate = (date) => {
  var date = new Date(date * 1000);
  var YY = date.getFullYear() + '-';
  var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
  var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
  var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  
  return MM + DD +" "+hh + mm;
}

//数组排序
const priceSort = (arr) => {
  arr.sort(function (a, b) {
    return a - b
  })
}

//数组去重
const unique = (arr) => {
  const res = new Map();
  return arr.filter((a) => !res.has(a.symbol) && res.set(a.symbol, 1))
}

//数组排序
const sortSymbol = (sort) => {
  return function (a, b) {
    var value1 = a[sort];
    var value2 = b[sort];
    return value2 - value1;
  }
}

// 根据单个名字筛选
const filterByName = (array, symbol) => {
  return array.map((item) => item.param2).indexOf(symbol.toUpperCase());

}

//跨链默认币种
const defaultSymbol = (arr, symbol) => {
  let array = []
  for(let i=0,count=arr.length;i<count;i++){
    if(arr[i].symbol === symbol){
      array = arr[i]
    }
  }
  return array
}

//根据参数，筛选数组
const filterCategory = (list, ids) => {
  if (!ids.length) return list;
  // 根据ids过滤list并且排序
  // 目标：只遍历一次list就能过滤出ids中的分类数据并排好序
  const valueIndexMap = {}; // 记录ids中的值对应的索引 { v: [ idx1, idx2 ]}
  ids.forEach((v, index) => {
    const temp = valueIndexMap[v] || []; // 正常情况下，ids中不会有重复的分类ID，但此需求可能会存在重复的分类ID，因此统一使用数组保存索引
    valueIndexMap[v] = [...temp, index]; // 如果能保证业务场景下，ids不会有重复id，大可使用valueIndexMap[v] = index;
  });
  const map = {};
  const filterAndSortList = [];
  // 只遍历一次list
  list.forEach((item) => {
    const indexs = valueIndexMap[item.symbol];
    // 过滤
    if (indexs) {
      indexs.forEach((i) => {
        const mapValue = map[i] || [];
        map[i] = [...mapValue, item];
      });
    }
  });
  Object.keys(map).forEach((k) => {
    filterAndSortList.push(...map[k]);
  });
  return filterAndSortList;
}

//存款多个币种，计算出安全最大值
const priceAddArray = (moduleListArray, moduleList, totalBorrow) => {
  var sum = 0
  //计算有存款币种的抵押价值之和
  for(var i=0; i<moduleListArray.length; i++){
    //存款金额(cTokenBalance * exchangeRate 算出当前值多少个 token)
    var totalBalance = _getValuemultip1(moduleListArray[i].accountCTokens[0].cTokenBalance, moduleListArray[i].market.exchangeRate)
    //抵押价值(存款金额*抵押率*当前币种价值)
    var totalCollateral = _getValuemultip1(_getValuemultip1(totalBalance, moduleListArray[i].market.collateralFactor), moduleListArray[i].price) * 1
    sum += totalCollateral;
  }

  //当前要提取存款的抵押价值
  var currentBalance = _getValuemultip1(moduleList.accountCTokens[0].cTokenBalance, moduleList.market.exchangeRate)
  var currentCollateral = _getValuemultip1(_getValuemultip1(currentBalance, moduleList.market.collateralFactor), moduleList.price) * 1

  //全部存款抵押价值-当前要提取存款的抵押价值
  var totalSum = _getValueDivided3(sum, currentCollateral)

  //有存款币种的抵押价值之和 * 0.85
  var totalDiyaSum = _getValuemultip1(sum, 0.85)

  //当前取款币种抵押系数 * 0.85
  var totalXishu =  _getValuemultip1(moduleList.market.collateralFactor, 0.85)

  //有存款币种的抵押价值之和 * 0.85 - 贷款金额
  var totalValue = _getValueDivided3(totalDiyaSum, totalBorrow)

  //安全最大值( (有存款币种的抵押价值之和 * 0.85 - 贷款金额) / (当前取款币种抵押系数 * 0.85) / 当前币种价值 )
  var maximum = _getValueDivided1(_getValueDivided1(totalValue, totalXishu), moduleList.price)

  // console.log('totalDiyaSum===>', totalDiyaSum)
  // console.log('totalXishu===>', totalXishu)
  // console.log('totalBorrow===>', totalBorrow)
  // console.log('totalValue===>', totalValue)
  // console.log('maximum===>', maximum)

  return maximum
}

const getUrlToken = (url) => {
  const URL = url.split('?')[1];
  if(URL){
    let obj = {}; // 声明参数对象
    let arr = URL.split("&");
    for (let i = 0; i < arr.length; i++) {
      let arrNew = arr[i].split("="); 
      obj[arrNew[0]] = arrNew[1];
    }
    return obj.lang
  }
}


// 导出
export { numberDecimal, toolNumber, SaveToTwoWei,saveToWei,addCookie,removeCookieAndSetnewData,removeCookieWithKey,checkPositionByHash,removeCookieListlast, pageInputScroll, toShowDollar,_getValueDivided,_getValueDivided1,_getValuemultip,_getValuemultip1, _getValueDivided3,_getValueAdd,_getValueMinus4,_getValueAdd4, formatDate, formatDate1, formatTimeDate,_getValueMinus,judgeSizeForNumber,_getValueAdd2,_getValuePow,priceSort,priceAddArray,unique,sortSymbol,defaultSymbol,filterCategory,filterByName,getUrlToken }