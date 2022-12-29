import i18n from '../i18n';

export default function getLangURLWithURL(url) {
    let language = i18n.language;
    let changeLanguage = "";
    if (language==='zh'||language==='zh-CN') {
      // changeLanguage = "zh-CN";
      changeLanguage = "zh-HK";
    }else{
      changeLanguage = "en";
    }
    return `${url}?lang=${changeLanguage}`
}