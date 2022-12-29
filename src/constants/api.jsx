import axios from 'axios';

export const getModuleData = async (callback) => {
    const chainID = localStorage.getItem('chainIDSwitch')
    axios({
        // url: '/bxh/api/bxhinfo/module',
        // url: 'https://pre-api.bxh.com/bxh/api/bxhinfo/module',   // 正式站接口
        url: 'https://api.bxh.com/bxh/api/bxhinfo/module',
        method: 'post',
        data: {chainId: chainID},
    }).then(function (data) {
        callback(data.data.body);
    }).catch(function (error) {
        console.warn(error);
    });
}
