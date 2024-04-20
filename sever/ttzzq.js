
/*
天天自走棋
***************************
QuantumultX:
[rewrite_local]
^https?:\/\/g642k8\.laf\.run\/login\/ script-response-body https://raw.githubusercontent.com/ottocsb/tov-template/main/src/modules/qianjivip.js
[mitm]
hostname = g642k8.laf.run
**************************/


let obj = JSON.parse($response.body);
console.log(obj);
//saveDataStr 是个字符串我需要匹其中的'diamond\'到下一个逗号之间的数字 修改成99999
obj.data.saveDataStr = obj.data.saveDataStr.replace(/diamond\\":\d+/g, 'diamond\\":99999');
$done({ body: JSON.stringify(obj) });
