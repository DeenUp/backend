"use strict";var n=Object.defineProperty;var E=Object.getOwnPropertyDescriptor;var f=Object.getOwnPropertyNames;var g=Object.prototype.hasOwnProperty;var $=(e,s)=>{for(var t in s)n(e,t,{get:s[t],enumerable:!0})},d=(e,s,t,o)=>{if(s&&typeof s=="object"||typeof s=="function")for(let r of f(s))!g.call(e,r)&&r!==t&&n(e,r,{get:()=>s[r],enumerable:!(o=E(s,r))||o.enumerable});return e};var h=e=>d(n({},"__esModule",{value:!0}),e);var v={};$(v,{handler:()=>S});module.exports=h(v);var a=e=>{if(e.triggerSource==="CustomMessage_SignUp"){let{region:s,userName:t,request:{codeParameter:o},callerContext:{clientId:r}}=e,c=`${process.env.REDIRECTURL}/?username=${t}`,p=process.env.RESOURCENAME.split("CustomMessage")[0],u=["us-east-1","us-west-1","us-west-2","ap-southeast-1","ap-southeast-2","ap-northeast-1","eu-west-1","sa-east-1"].includes(s)?"-":".",m=Buffer.from(JSON.stringify({userName:t,redirectUrl:c,region:s,clientId:r})).toString("base64"),l=`${`http://${p}verificationbucket-${process.env.ENV}.s3-website${u}${s}.amazonaws.com`}/?data=${m}&code=${o}`,i=`${process.env.EMAILMESSAGE}. 
 ${l}`;e.response.smsMessage=i,e.response.emailSubject=process.env.EMAILSUBJECT,e.response.emailMessage=i}return e};var S=async e=>(await Promise.all([a(e)]),e);0&&(module.exports={handler});
//# sourceMappingURL=index.js.map