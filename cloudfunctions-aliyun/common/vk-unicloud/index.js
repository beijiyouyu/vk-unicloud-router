"use strict";var e={main:async e=>{let{uniID:t}=e.util,n={code:-1,msg:""},a=await t.checkToken(e.uniIdToken);if(a.code&&a.code>0)return a;let i=a.userInfo;return delete i.token,delete i.password,n.uid=a.uid,n.userInfo=i,a.token&&(n.token=a.token,n.tokenExpired=a.tokenExpired),n.code=0,n.msg="ok",n}},t=[{id:"pub",regExp:"/pub/",description:"pub函数为所有人都可以访问的函数",index:100,main:async function(t){let n={};return t.data.need_user_info&&(n=await e.main(t)),n.code=0,n.msg="ok",n}},{id:"kh",regExp:"/kh/",description:"kh函数为必须登录后才能访问的函数(客户端用户)",index:200,main:e.main},{id:"sys",regExp:"/sys/",description:"sys函数为后端管理人员才能访问的函数(商家后台工作人员)",index:300,main:{main:async t=>{let{url:n,util:a}=t,{uniID:i,config:r,pubFun:o,vk:l,db:s,_:d}=a,u={code:-1,msg:""};const c=e;if(u=await c.main(t),0!==u.code)return u;if(!u.userInfo.allow_login_background)return{code:403,msg:"您无权限登录后台"};if(l.pubfn.isNotNull(u.userInfo.role)&&u.userInfo.role.indexOf("admin")>-1)return u;let f=await l.baseDao.select({dbName:"uni-id-roles",whereJson:{role_id:d.in(u.userInfo.role),enable:!0},fieldJson:{permission:!0}},t.util),g=[];for(let e in f.rows){let t=f.rows[e].permission;t&&t.length>0&&(g=g.concat(t))}return 0==g.length||await l.baseDao.count({dbName:"uni-id-permissions",whereJson:{permission_id:d.in(g),enable:!0,url:n}},t.util)<=0?{code:403,msg:"权限不足"}:(u.code=0,u.msg="ok",u)}}.main}],n=async(e,n)=>{let a={code:403,msg:"access denied",filterStack:[]},{url:i}=e,r=[];if(n){let e=[...t,...n];e.sort((function(e,t){return e.index-t.index})),r=e.filter((t,n,a)=>{var i=[];return e.forEach((e,t)=>{i.push(e.id)}),i.indexOf(t.id)===n})}else r=t;for(let t in r){let n=r[t];if(new RegExp(n.regExp).test(i)){e.filterResponse=a;let t=await n.main(e);if(t.filterId=n.id,a.filterStack.push(t),0!==t.code){a=t;break}a=Object.assign(a,t)}}return a};process.env.TZ="Asia/Shanghai";var a=async function(e){let t,{event:a,context:i,vk:r}=e,{config:o,uniID:l,uniPay:s,db:d,customFilterService:u,pubFun:c,customUtil:f}=r.config,g={event:a,context:i},p=r.getQueryStringParameters(a),{url:y,data:m,uniIdToken:_}=p,h={url:y,data:m,uniIdToken:_,util:{vk:r,config:o,pubFun:c,uniID:l,uniPay:s,db:d,customUtil:f,_:d.command},originalParam:g},w=await n(h,u);if(0!==w.code)return w;w.uid&&(m.uid=w.uid),h.filterResponse=w;try{t=r.require("service/"+y)}catch(e){return e&&"MODULE_NOT_FOUND"==e.code?{code:404,msg:`云函数 ${y} 不存在!`,err:e}:{code:500,msg:`云函数 ${y} 编译异常!`,err:e}}return await async function(e={}){let{res:t,serviceParam:n,serviceMain:a}=e;t.uid&&(n.uid=t.uid);t.userInfo&&(n.userInfo=t.userInfo);let i=await a.main(n);t.token&&"object"==typeof i&&(i.vk_uni_token={token:t.token,tokenExpired:t.tokenExpired});return i}({res:w,serviceParam:h,serviceMain:t})};function i(e,t,n,a,i,r){return d((o=d(d(t,e),d(a,r)))<<(l=i)|o>>>32-l,n);var o,l}function r(e,t,n,a,r,o,l){return i(t&n|~t&a,e,t,r,o,l)}function o(e,t,n,a,r,o,l){return i(t&a|n&~a,e,t,r,o,l)}function l(e,t,n,a,r,o,l){return i(t^n^a,e,t,r,o,l)}function s(e,t,n,a,r,o,l){return i(n^(t|~a),e,t,r,o,l)}function d(e,t){var n=(65535&e)+(65535&t);return(e>>16)+(t>>16)+(n>>16)<<16|65535&n}var u=function(e){return function(e){for(var t="",n=0;n<4*e.length;n++)t+="0123456789abcdef".charAt(e[n>>2]>>n%4*8+4&15)+"0123456789abcdef".charAt(e[n>>2]>>n%4*8&15);return t}(function(e,t){e[t>>5]|=128<<t%32,e[14+(t+64>>>9<<4)]=t;for(var n=1732584193,a=-271733879,i=-1732584194,u=271733878,c=0;c<e.length;c+=16){var f=n,g=a,p=i,y=u;n=r(n,a,i,u,e[c+0],7,-680876936),u=r(u,n,a,i,e[c+1],12,-389564586),i=r(i,u,n,a,e[c+2],17,606105819),a=r(a,i,u,n,e[c+3],22,-1044525330),n=r(n,a,i,u,e[c+4],7,-176418897),u=r(u,n,a,i,e[c+5],12,1200080426),i=r(i,u,n,a,e[c+6],17,-1473231341),a=r(a,i,u,n,e[c+7],22,-45705983),n=r(n,a,i,u,e[c+8],7,1770035416),u=r(u,n,a,i,e[c+9],12,-1958414417),i=r(i,u,n,a,e[c+10],17,-42063),a=r(a,i,u,n,e[c+11],22,-1990404162),n=r(n,a,i,u,e[c+12],7,1804603682),u=r(u,n,a,i,e[c+13],12,-40341101),i=r(i,u,n,a,e[c+14],17,-1502002290),a=r(a,i,u,n,e[c+15],22,1236535329),n=o(n,a,i,u,e[c+1],5,-165796510),u=o(u,n,a,i,e[c+6],9,-1069501632),i=o(i,u,n,a,e[c+11],14,643717713),a=o(a,i,u,n,e[c+0],20,-373897302),n=o(n,a,i,u,e[c+5],5,-701558691),u=o(u,n,a,i,e[c+10],9,38016083),i=o(i,u,n,a,e[c+15],14,-660478335),a=o(a,i,u,n,e[c+4],20,-405537848),n=o(n,a,i,u,e[c+9],5,568446438),u=o(u,n,a,i,e[c+14],9,-1019803690),i=o(i,u,n,a,e[c+3],14,-187363961),a=o(a,i,u,n,e[c+8],20,1163531501),n=o(n,a,i,u,e[c+13],5,-1444681467),u=o(u,n,a,i,e[c+2],9,-51403784),i=o(i,u,n,a,e[c+7],14,1735328473),a=o(a,i,u,n,e[c+12],20,-1926607734),n=l(n,a,i,u,e[c+5],4,-378558),u=l(u,n,a,i,e[c+8],11,-2022574463),i=l(i,u,n,a,e[c+11],16,1839030562),a=l(a,i,u,n,e[c+14],23,-35309556),n=l(n,a,i,u,e[c+1],4,-1530992060),u=l(u,n,a,i,e[c+4],11,1272893353),i=l(i,u,n,a,e[c+7],16,-155497632),a=l(a,i,u,n,e[c+10],23,-1094730640),n=l(n,a,i,u,e[c+13],4,681279174),u=l(u,n,a,i,e[c+0],11,-358537222),i=l(i,u,n,a,e[c+3],16,-722521979),a=l(a,i,u,n,e[c+6],23,76029189),n=l(n,a,i,u,e[c+9],4,-640364487),u=l(u,n,a,i,e[c+12],11,-421815835),i=l(i,u,n,a,e[c+15],16,530742520),a=l(a,i,u,n,e[c+2],23,-995338651),n=s(n,a,i,u,e[c+0],6,-198630844),u=s(u,n,a,i,e[c+7],10,1126891415),i=s(i,u,n,a,e[c+14],15,-1416354905),a=s(a,i,u,n,e[c+5],21,-57434055),n=s(n,a,i,u,e[c+12],6,1700485571),u=s(u,n,a,i,e[c+3],10,-1894986606),i=s(i,u,n,a,e[c+10],15,-1051523),a=s(a,i,u,n,e[c+1],21,-2054922799),n=s(n,a,i,u,e[c+8],6,1873313359),u=s(u,n,a,i,e[c+15],10,-30611744),i=s(i,u,n,a,e[c+6],15,-1560198380),a=s(a,i,u,n,e[c+13],21,1309151649),n=s(n,a,i,u,e[c+4],6,-145523070),u=s(u,n,a,i,e[c+11],10,-1120210379),i=s(i,u,n,a,e[c+2],15,718787259),a=s(a,i,u,n,e[c+9],21,-343485551),n=d(n,f),a=d(a,g),i=d(i,p),u=d(u,y)}return Array(n,a,i,u)}(function(e){for(var t=Array(),n=0;n<8*e.length;n+=8)t[n>>5]|=(255&e.charCodeAt(n/8))<<n%32;return t}(e),8*e.length))},c={add:async function(e,t){let{db:n,_:a}=t,{dbName:i,dataJson:r}=e;if(!r._add_time){let e=new Date;r._add_time=e.getTime();let t={year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"};r._add_time_str=e.toLocaleString("zh-CN",t)}let o=await n.collection(i).add(r);return o.id?o.id:null},adds:async function(e,t){let{db:n,_:a}=t,{dbName:i,dataJson:r}=e,o=new Date,l=o.getTime(),s=o.toLocaleString("zh-CN",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"});for(let e in r)r[e]._add_time||(r[e]._add_time=l,r[e]._add_time_str=s);let d=await n.collection(i).add(r);return d.id?d.id:null},del:async function(e,t){let{db:n,_:a}=t,{dbName:i,whereJson:r}=e,o=0;if(r&&"{}"!==JSON.stringify(r)){let e=await n.collection(i).where(r).remove();e?o=e.deleted:(console.error(e.errMsg),o=-1)}else console.error("whereJson条件不能为空");return o},delete:async function(e,t){return await c.del(e,t)},update:async function(e,t){let{db:n,_:a}=t,{dbName:i,whereJson:r,dataJson:o}=e,l=0;if(r&&"{}"!==JSON.stringify(r)){let e=await n.collection(i).where(r).update(o);e?l=e.updated:(console.error(e.errMsg),l=-1)}else console.error("whereJson条件不能为空");return l},select:async function(e,t){let{db:n,_:a}=t,{dbName:i,whereJson:r,pageSize:o=10}=e;if(r&&"{}"!==JSON.stringify(r)||(r={_id:a.neq("___")}),o<=0&&(o=999999999),o>100)return await c.selectAll(e,t);let l=await c.getSelectData(e,t),{result:s,hasMore:d,total:u,getCount:f,pageIndex:g}=l;return s=s.skip((g-1)*o).limit(o),s.get().then(e=>{let t={};return f?(t.hasMore=d,t.total=u):(t.total=e.data?e.data.length:0,t.hasMore=t.total>=o),t.rows=e.data,t.code=0,t.key=1,t.pageIndex=g,t.pageSize=o,t})},findById:async function(e,t){let{db:n,_:a}=t,{dbName:i,id:r,fieldJson:o}=e;try{let e=n.collection(i).doc(r);return o&&(e=e.field(o)),(await e.get()).data[0]}catch(e){return console.error(e),null}},findByWhereJson:async function(e,t){let{db:n,_:a}=t,{dbName:i,whereJson:r,fieldJson:o}=e;try{if(r&&"{}"!==JSON.stringify(r)){let e=n.collection(i).where(r);o&&(e=e.field(o));let t=await e.limit(1).get();if(t.data&&t.data.length>0)return t.data[0]}else console.error("whereJson条件不能为空")}catch(e){console.error(e)}return null},count:async function(e,t){let{db:n,_:a}=t,{dbName:i,whereJson:r}=e;r&&"{}"!==JSON.stringify(r)||(r={_id:a.neq("___")});try{return(await n.collection(i).where(r).count()).total}catch(e){return console.error(e),null}},select2:async function(e,t){let{foreignKeyType:n="many-to-one"}=e;return"many-to-one"===n?await c.select2_ManyToOne(e,t):"one-to-many"===n?await c.select2_OneToMany(e,t):(console.error("不支持的foreignKeyType"),{})},count2_ManyToOne:async function(e,t){let{db:n,_:a,vk:i}=t,{dbName:r,dbName2:o,foreignKey:l="_id",foreignKey2:s="_id",whereJson:d={},whereJson2:u={},pageIndex:c=1,pageSize:f=10,getCount:g=!1,sortArr:p={},fieldJson:y={},fieldJson2:m={},as:_}=e;_||(_=o),"{}"===JSON.stringify(d)&&(d={_id:a.neq("___")});a.aggregate;let h=n.collection(r).aggregate();if(d&&"{}"!==JSON.stringify(d)&&(h=h.match(d)),y&&"{}"!==JSON.stringify(y)&&(h=h.project(y)),p&&"{}"!==JSON.stringify(p)){let e={};for(let t in p){let n=p[t],a=n.name,i=n.type;i=null==i||""==i||"asc"==i?1:-1,e[a]=i}h=h.sort(e)}let w={from:o,localField:l,foreignField:s,as:_};if(h=h.lookup(w),m&&"{}"!==JSON.stringify(m)){let e={};for(let t in m)e[_+"."+t]=m[t];h=h.project(e)}if(u&&"{}"!==JSON.stringify(u)){let e={};for(let t in u)e[_+"."+t]=u[t];h=h.match(e)}let b=await h.count("total").end();try{return b.data[0].total}catch(e){return console.log(e),0}},select2_ManyToOne:async function(e,t){let{db:n,_:a,vk:i}=t,{dbName:r,dbName2:o,foreignKey:l="_id",foreignKey2:s="_id",whereJson:d={},whereJson2:u={},pageIndex:c=1,pageSize:f=10,getCount:g=!1,sortArr:p=[],fieldJson:y={},fieldJson2:m={},as:_,whereJsonPub:h={}}=e;_||(_=o),"{}"===JSON.stringify(d)&&(d={_id:a.neq("___")}),-1==f&&(c=1,f=999999999,g=!1);let w=0,b=!1;if(g){w=(await n.collection(r).where(d).count()).total,c<Math.ceil(w/f)&&(b=!0)}let x={};const N=a.aggregate;let k=n.collection(r).aggregate();if(d&&"{}"!==JSON.stringify(d)&&(k=k.match(d)),y&&"{}"!==JSON.stringify(y)&&(k=k.project(y)),p&&"[]"!==JSON.stringify(p)){let e={};for(let t in p){let n=p[t],a=n.name,i=n.type;i=null==i||""==i||"asc"==i?1:-1,e[a]=i}k=k.sort(e)}k=k.skip((c-1)*f).limit(f);let S=N.pipeline().match(a.expr(N.and([N.eq(["$"+s,"$$foreignKey"+l])])));u&&"{}"!==JSON.stringify(u)&&(S=S.match(u)),m&&"{}"!==JSON.stringify(m)&&(S=S.project(m)),S=S.done();let O={};O["foreignKey"+l]="$"+l;let J={from:o,let:O,pipeline:S,as:_};k=k.lookup(J),h&&"{}"!==JSON.stringify(h)&&(k=k.match(h)),k=await k.end();let v=k.data;for(let e in v)v[e][_]&&v[e][_].length>0?v[e][_]=v[e][_][0]:v[e][_]={};return g?(x.hasMore=b,x.total=w):(x.total=v?v.length:0,x.hasMore=w>=f),x.rows=v,x.code=0,x.key=1,x},select2_OneToMany:async function(e,t){let{db:n,_:a,vk:i}=t,{dbName:r,dbName2:o,foreignKey:l="_id",foreignKey2:s="_id",whereJson:d={},whereJson2:u={},pageIndex:c=1,pageSize:f=10,getCount:g=!1,sortArr:p=[],sortArr2:y=[],fieldJson:m={},fieldJson2:_={},as:h}=e;h||(h=o),"{}"===JSON.stringify(d)&&(d={_id:a.neq("___")}),-1==f&&(c=1,f=999999999,g=!1);let w=0,b=!1;if(g){w=(await n.collection(r).where(d).count()).total,c<Math.ceil(w/f)&&(b=!0)}let x={};const N=a.aggregate;let k=n.collection(r).aggregate();if(d&&"{}"!==JSON.stringify(d)&&(k=k.match(d)),m&&"{}"!==JSON.stringify(m)&&(k=k.project(m)),p&&"[]"!==JSON.stringify(p)){let e={};for(let t in p){let n=p[t],a=n.name,i=n.type;i=null==i||""==i||"asc"==i?1:-1,e[a]=i}k=k.sort(e)}k=k.skip((c-1)*f).limit(f);let S=N.pipeline().match(a.expr(N.and([N.eq(["$"+s,"$$foreignKey"+l])])));if(u&&"{}"!==JSON.stringify(u)&&(S=S.match(u)),y&&"[]"!==JSON.stringify(y)){let e={};for(let t in y){let n=y[t],a=n.name,i=n.type;i=null==i||""==i||"asc"==i?1:-1,e[a]=i}S=S.sort(e)}_&&"{}"!==JSON.stringify(_)&&(S=S.project(_)),S=S.done();let O={};O["foreignKey"+l]="$"+l;let J={from:o,let:O,pipeline:S,as:h};k=k.lookup(J),k=await k.end();let v=k.data;return g?(x.hasMore=b,x.total=w):(x.total=v?v.length:0,x.hasMore=w>=f),x.rows=v,x.code=0,x.key=1,x},getSelectData:async function(e,t){let{db:n,_:a}=t,{dbName:i,whereJson:r,pageIndex:o=1,pageSize:l=10,getCount:s=!1}=e;r&&"{}"!==JSON.stringify(r)||(r={_id:a.neq("___")}),l<0&&(o=1,l=999999999,s=!0);let d=e.sortArr,u=e.fieldJson,c=0,f=!1;if(s){c=(await n.collection(i).where(r).count()).total,o<Math.ceil(c/l)&&(f=!0)}let g=n.collection(i);if(u&&(g=g.field(u)),r&&(g=g.where(r)),d)for(let e in d){let t=d[e],n=t.name,a=t.type;null!=a&&""!=a||(a="asc"),g=g.orderBy(n,a)}return{result:g,dbName:i,whereJson:r,pageIndex:o,pageSize:l,getCount:s,sortArr:d,fieldJson:u,total:c,hasMore:f}},selectAll:async function(e,t){let{db:n,_:a,vk:i,config:r}=t,o=(e.dbName,{}),l=500;i.pubfn.getData(r,"vk.db.unicloud")&&(l=i.pubfn.getData(r,"vk.db.unicloud.max_limit"));let s=await c.getSelectData(e,t),{result:d,hasMore:u,total:f,getCount:g,pageIndex:p,pageSize:y}=s;y>0&&!f&&!g&&(f=y);let m={};if(g&&0===f)m={data:[]};else{let t=f;y<f&&(t=y);let n=Math.ceil(t/l),a=[],i=(p-1)*y,r=i+y;for(let e=0;e<n;e++){let t=i+e*l,n=l;t+l>r&&(n=r-t);let o=d.skip(t).limit(n).get();a.push(o)}try{m=(await Promise.all(a)).reduce((e,t)=>({data:e.data.concat(t.data),errMsg:e.errMsg}))}catch(t){console.error("selectAll-异常",e,t),m={data:[]}}}return o.rows=m.data,o.key=1,o.code=0,o.hasMore=u,o.pageIndex=p,o.pageSize=y,o.total=g?f:m.data?m.data.length:0,o},sum:async function(e,t){let{db:n,_:a}=t,{dbName:i,fieldName:r,whereJson:o}=e;o&&"{}"!==JSON.stringify(o)||(o={_id:a.neq("___")});const l=n.command.aggregate;try{return(await n.collection(i).aggregate().match(o).group({_id:null,num:l.sum("$"+r)}).end()).data[0].num}catch(e){return console.error(e),null}},avg:async function(e,t){let{db:n,_:a}=t,{dbName:i,fieldName:r,whereJson:o}=e;o&&"{}"!==JSON.stringify(o)||(o={_id:a.neq("___")});const l=n.command.aggregate;try{return(await n.collection(i).aggregate().match(o).group({_id:null,num:l.avg("$"+r)}).end()).data[0].num}catch(e){return console.error(e),null}},max:async function(e,t){let{db:n,_:a}=t,{dbName:i,fieldName:r,whereJson:o}=e;o&&"{}"!==JSON.stringify(o)||(o={_id:a.neq("___")});const l=n.command.aggregate;try{return(await n.collection(i).aggregate().match(o).group({_id:null,num:l.max("$"+r)}).end()).data[0].num}catch(e){return console.error(e),null}},min:async function(e,t){let{db:n,_:a}=t,{dbName:i,fieldName:r,whereJson:o}=e;o&&"{}"!==JSON.stringify(o)||(o={_id:a.neq("___")});const l=n.command.aggregate;try{return(await n.collection(i).aggregate().match(o).group({_id:null,num:l.min("$"+r)}).end()).data[0].num}catch(e){return console.error(e),null}},sample:async function(e,t){let{db:n,_:a}=t,{dbName:i,whereJson:r,size:o}=e;r&&"{}"!==JSON.stringify(r)||(r={_id:a.neq("___")});n.command.aggregate;try{return(await n.collection(i).aggregate().match(r).sample({size:o}).end()).data}catch(e){return console.error(e),null}},selects:async function(e,t){let{db:n,_:a,vk:i}=t,{dbName:r,foreignKey:o="_id",whereJson:l={},pageIndex:s=1,pageSize:d=10,getCount:u=!1,sortArr:c=[],fieldJson:f={},foreignDB:g=[]}=e;"{}"===JSON.stringify(l)&&(l={_id:a.neq("___")}),-1==d&&(s=1,d=999999999,u=!1);let p=0,y=!1;if(u){p=(await n.collection(r).where(l).count()).total,s<Math.ceil(p/d)&&(y=!0)}let m={};const _=a.aggregate;let h=n.collection(r).aggregate();if(l&&"{}"!==JSON.stringify(l)&&(h=h.match(l)),f&&"{}"!==JSON.stringify(f)&&(h=h.project(f)),c&&"[]"!==JSON.stringify(c)){let e={};for(let t in c){let n=c[t],a=n.name,i=n.type;i=null==i||""==i||"asc"==i?1:-1,e[a]=i}h=h.sort(e)}h=h.skip((s-1)*d).limit(d);for(let e in g){let{dbName:t,foreignKey:n,as:i,limit:r,whereJson:l,fieldJson:s,sortArr:d}=g[e];i||(i=t);let u=_.pipeline().match(a.expr(_.and([_.eq(["$"+n,"$$foreignKey"+o])])));if(l&&"{}"!==JSON.stringify(l)&&(u=u.match(l)),d&&"[]"!==JSON.stringify(d)){let e={};for(let t in d){let n=d[t],a=n.name,i=n.type;i=null==i||""==i||"asc"==i?1:-1,e[a]=i}u=u.sort(e)}r&&(u=u.limit(r)),s&&"{}"!==JSON.stringify(s)&&(u=u.project(s)),u=u.done();let c={};c["foreignKey"+o]="$"+o;let f={from:t,let:c,pipeline:u,as:i};h=h.lookup(f)}h=await h.end();let w=h.data;for(let e in w)for(let t in g){let{as:n,limit:a}=g[t];1===a&&(w[e][n]&&w[e][n].length>0?w[e][n]=w[e][n][0]:w[e][n]={})}return u?(m.hasMore=y,m.total=p):(m.total=w?w.length:0,m.hasMore=p>=d),m.rows=w,m.code=0,m.key=1,m}},f=c,g=async(e={})=>{"[object object]"==Object.prototype.toString.call(e.content)&&(e.content=JSON.stringify(e.content)),void 0===e.dataType&&(e.dataType="json"),"default"==e.dataType&&delete e.dataType,e.useContent&&(e.content=JSON.stringify(e.data)),e.method||(e.method="POST"),e.data&&(e.headers||(e.headers={"content-type":"application/json; charset=UTF-8"}));var t=await uniCloud.httpclient.request(e.url,e);return t&&t.data?t.data:t},p={formValidateItem:function(e,t,n){let a={code:0,msg:"ok"};for(let i in n){let r=n[i];if(void 0===e[t]&&r.required){a={type:"undefined",code:-1,msg:"字段："+t+" 名称错误，请检查！",key:t,value:e[t]};break}if(r.required&&(null==e[t]||null==e[t]||""===e[t]||0==e[t].length)){a={type:"required",code:-1,msg:r.message,key:t,value:e[t]};break}if(r.type){if(Object.prototype.toString.call(e[t]).toLowerCase()!==`[object ${r.type}]`){a={type:"type",code:-1,msg:r.message,key:t,value:e[t]};break}}if(r.len&&e[t].length!=r.len){a={type:"len",code:-1,msg:r.message,key:t,value:e[t]};break}if(r.min)if(r.type&&"number"==r.type){if(e[t]<r.min){a={type:"min",code:-1,msg:r.message,key:t,value:e[t]};break}}else if(e[t].length<r.min){a={type:"min",code:-1,msg:r.message,key:t,value:e[t]};break}if(r.max)if(r.type&&"number"==r.type){if(e[t]>r.max){a={type:"max",code:-1,msg:r.message,key:t,value:e[t]};break}}else if(e[t].length>r.max){a={type:"max",code:-1,msg:r.message,key:t,value:e[t]};break}if("function"==typeof r.validator){let n=r.validator(r,e[t],(function(e){return e}));if(void 0!==n&&!0!==n){a={type:"validator",code:-1,msg:r.message,key:t,value:e[t]};break}}}return a}};function y(e,t,n){let a=[];for(let i=e.length-1;i>-1;i--){const r=e[i],o=t.filter(e=>{if(e.parent_id===r.menu_id)return n.push(e.menu_id),!0});a=a.concat(o),r.children=o}a.length&&y(a,t,n)}function m(e,t){const n=[];let a=e;for(;a&&a.parent_id;)n.push(a.parent_id),a=t.find(e=>e.menu_id===a.parent_id);return n}var _={buildMenu:y,buildMenus:function(e,t=!0){if(e=e.sort((function(t,n){const a=m(t,e),i=m(n,e);return a.includes(n.menu_id)?1:a.length-i.length||t.sort-n.sort})),t)for(let t=e.length-1;t>-1;t--){const n=e[t],a=e.filter(e=>e.parent_id===n.menu_id);n.isLeafNode||a.length||e.splice(t,1)}const n=[],a=e.filter(e=>{if(!e.parent_id)return n.push(e.menu_id),!0});return y(a,e,n),t||n.length===e.length||a.push(...e.filter(e=>!n.includes(e.menu_id))),a}},h={formValidate:function(e={}){let t={code:0,msg:"ok"},{data:n,rules:a}=e;if(a)for(let e in a){let i=a[e];if(t=p.formValidateItem(n,e,i),0!=t.code)break}return t}};h.buildUtil=_,h.urlStringToJson=function(e){var t={};if(""!=e&&null!=e&&null!=e)for(var n=e.split("&"),a=0;a<n.length;a++){var i=n[a].split("="),r=i[0],o=i[1];t[r]=o}return t},h.getQueryStringParameters=function(e){let t={};if(e.httpMethod){if(console.log("event.path:",e.path),e.body){let n=e.body;e.isBase64Encoded&&(n=Buffer.from(n,"base64").toString("utf-8")),"string"==typeof n&&(n=JSON.parse(n)),t=n}else if(e.queryStringParameters){let n=e.queryStringParameters;"string"==typeof n.data&&(n.data=JSON.parse(n.data)),t=n}}else t=JSON.parse(JSON.stringify(e));return t.data||(t.data={}),t.url=t.$url||"",t},h.stringToFormData=function(e){e||(e="");for(var t=e.split("Content-Disposition: form-data;"),n={},a=0;a<t.length;a++){var i=t[a];let e='name="';var r=i.indexOf(e)+e.length;if(r>-1){var o=i.indexOf('"',r),l=i.substring(r,o);if(o>r){var s=i.indexOf("---",o),d=i.substring(o+1,s).trim();n[l]=d}}}return n},h.getFullTime=function(e,t=0,n=-8){if(!e)return"";"number"==typeof e&&(e=new Date(e));const a=e.getTimezoneOffset(),i=e.getTime()+60*a*1e3-60*n*60*1e3;let r=(e=new Date(i)).getFullYear()+"",o=e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1,l=e.getDate()<10?"0"+e.getDate():e.getDate(),s=e.getHours()<10?"0"+e.getHours():e.getHours(),d=e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes(),u=e.getSeconds()<10?"0"+e.getSeconds():e.getSeconds();return 2===t?{YYYY:Number(r),MM:Number(o),DD:Number(l),hh:Number(s),mm:Number(d),ss:Number(u),year:Number(r),month:Number(o),day:Number(l),hour:Number(s),minute:Number(d),second:Number(u)}:1===t?r+""+o+l+s+d+u:r+"-"+o+"-"+l+" "+s+":"+d+":"+u},h.checkStr=function(e,t){switch(t){case"mobile":return new RegExp(/^1[3|4|5|6|7|8|9][0-9]{9}$/).test(e);case"tel":return new RegExp(/^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/).test(e);case"card":return new RegExp(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/).test(e);case"mobileCode":return new RegExp(/^[0-9]{6}$/).test(e);case"username":return new RegExp(/^[a-zA-Z]([-_a-zA-Z0-9]{5,17})$/).test(e);case"pwd":return new RegExp(/^([a-zA-Z0-9_]){6,18}$/).test(e);case"payPwd":return new RegExp(/^[0-9]{6}$/).test(e);case"postal":return new RegExp(/[1-9]\d{5}(?!\d)/).test(e);case"QQ":return new RegExp(/^[1-9][0-9]{4,9}$/).test(e);case"email":return new RegExp(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/).test(e);case"money":return new RegExp(/^\d*(?:\.\d{0,2})?$/).test(e);case"URL":return new RegExp(/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/).test(e);case"IP":return new RegExp(/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/).test(e);case"date":return new RegExp(/^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/).test(e);case"time":return new RegExp(/^(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/).test(e);case"dateTime":return new RegExp(/^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/).test(e);case"number":return new RegExp(/^[0-9]*$/).test(e);case"english":return new RegExp(/^[a-zA-Z]+$/).test(e);case"chinese":return new RegExp(/^[\\u4E00-\\u9FA5]+$/).test(e);case"lower":return new RegExp(/^[a-z]+$/).test(e);case"upper":return new RegExp(/^[A-Z]+$/).test(e);case"HTML":return new RegExp(/<("[^"]*"|'[^']*'|[^'">])*>/).test(e);default:return!0}},h.priceFilter=function(e){return"string"==typeof e&&(e=parseFloat(e)),(e/100).toFixed(2)},h.objectAssign=function(e,t){return Object.assign(e,t)},h.copyObject=function(e){return JSON.parse(JSON.stringify(e))},h.arr_concat=function(e,t,n){n||(n="id");var a=e.concat(t),i=[];if(-1!=n){var r=[];for(var o in a)-1==r.indexOf(a[o][n])&&(r.push(a[o][n]),i.push(a[o]))}else i=a;return i},h.getData=function(e,t){var n=JSON.parse(JSON.stringify(e));t=t.replace(/\s+/g,"")+".";for(var a="",i=0;i<t.length;i++){var r=t.charAt(i);"."!=r&&"["!=r&&"]"!=r?a+=r:n&&(""!=a&&(n=n[a]),a="")}return n},h.setData=function(e,t,n){const a=t.match(/([\w$]+)|\[(:\d)\]/g);for(let t=0;t<a.length-1;t++){e=e[a[t]]}e[a[a.length-1]]=n},h.isNull=function(e){let t=!1;return void 0!==e&&"[object Null]"!=Object.prototype.toString.call(e)&&"{}"!=JSON.stringify(e)&&"[]"!=JSON.stringify(e)&&""!==e&&void 0!==JSON.stringify(e)||(t=!0),t},h.isNotNull=function(e){return!h.isNull(e)},h.isNullOne=function(...e){let t=!1;for(let n=0;n<e.length;n++){let a=e[n];if(h.isNull(a)){t=!0;break}}return t},h.isNullAll=function(...e){let t=!0;for(let n=0;n<e.length;n++){let a=e[n];if(h.isNotNull(a)){t=!1;break}}return t},h.isNotNullAll=function(...e){return!h.isNullOne(...e)},h.getListItem=function(e,t,n){let a;for(let i in e)if(e[i][t]===n){a=e[i];break}return a},h.listToJson=function(e,t){let n={};for(let a in e){let i=e[a];n[i[t]]=i}return n},h.random=function(e,t){let n="",a="123456789";h.isNotNull(t)&&("a-z,0-9"==t?t="abcdefghijklmnopqrstuvwxyz0123456789":"A-Z,0-9"==t?t="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789":"a-z,A-Z,0-9"!=t&&"A-Z,a-z,0-9"!=t||(t="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"),a=t);for(let t=0;t<e;t++){n+=a[Math.floor(Math.random()*a.length)]}return n},h.stringIdToNumberId=function(e,t){let n="";for(let a=0;a<t;a++)if(e.length>a){n+="0123456789"[e[a].charCodeAt()%10]}else n="0"+n;return n},h.hidden=function(e,t,n){let a=e.length-t-n,i="";for(let e=0;e<a;e++)i+="*";return e.substring(0,t)+i+e.substring(e.length-n)},h.checkArrayIntersection=function(e=[],t=[]){let n=!1;for(let a=0;a<t.length;a++)e.indexOf(t[a])>-1&&(n=!0);return n},h.calcFreights=function(e,t){let{first_weight:n,first_weight_price:a,continuous_weight:i,continuous_weight_price:r,max_weight:o=1e8}=e,l=0,s=0,d=o,u=!1,c=0;for(;t>0;)u?(c++,t-=i,d-=i):(u=!0,s++,d=o,t-=n,d-=n),d<=0&&(u=!1);return l=s*a+r*c,l},h.getWeekStartAndEnd=function(e=0,t=new Date){let n={};const a=60*t.getTimezoneOffset()*1e3;let i=(t=new Date(t.getTime()+6048e5*e)).getDay(),r=(t.getDate(),0!=i?i-1:6),o=new Date(t.getTime()-864e5*r),l=new Date(o.getTime()+5184e5);return n.weekStart=new Date(o.toLocaleDateString()).getTime()+a,n.weekEnd=new Date(l.toLocaleDateString()).getTime()+86399999+a,n},h.getCommonTime=function(e=new Date){let t={};const{year:n,month:a,day:i,hour:r,minute:o,second:l}=h.getFullTime(e,2);t.now={year:n,month:a,day:i,hour:r,minute:o,second:l};let s=new Date(n,a,0).getDate(),d=new Date(n,12,0).getDate();t.todayStart=new Date(`${n}/${a}/${i}`).getTime(),t.today12End=new Date(`${n}/${a}/${i}`).getTime()+43199999,t.todayEnd=new Date(`${n}/${a}/${i}`).getTime()+86399999,t.monthStart=new Date(`${n}/${a}/1`).getTime(),t.monthEnd=new Date(`${n}/${a}/${s}`).getTime()+86399999,t.yearStart=new Date(n+"/1/1").getTime(),t.yearEnd=new Date(`${n}/12/${d}`).getTime()+86399999;let u=h.getWeekStartAndEnd(0,e);t.weekStart=u.weekStart,t.weekEnd=u.weekEnd,t.months=[],t.months[0]={monthStart:t.monthStart,monthEnd:t.monthEnd};for(let e=1;e<=12;e++){let a=new Date(n,e,0).getDate(),i=new Date(`${n}/${e}/1`).getTime(),r=new Date(`${n}/${e}/${a}`).getTime()+86399999;t.months[e]={monthStart:i,monthEnd:r}}return t},h.getNewObject=function(e,t){let n=h.copyObject(e),a={};if(t&&t.length>0)for(let e in t){let i=t[e];h.isNotNull(n[i])&&(a[i]=n[i])}else a=n;return a},h.deleteObjectKeys=function(e,t=[]){var n={};if(e)for(let a in e)-1==t.indexOf(a)&&(n[a]=e[a]);return n};var w=h;var b={addAsyncTasks:async(e={},t)=>{let{vk:n,db:a,_:i}=t,{type:r,title:o,out_trade_no:l,user_order_success:s}=e,d={};return d=await n.baseDao.add({dbName:"opendb-async-tasks",dataJson:{status:0,type:r,title:o,out_trade_no:l,user_order_success:s}},t),d},addPayOrders:async(e={},t)=>{let{vk:n,db:a,_:i}=t,{pay_type:r,out_trade_no:o,openid:l,total_fee:s,appid:d,original_data:u,wxpay_info:c,alipay_info:f}=e,g={};return g=await n.baseDao.add({dbName:"uni-pay-orders",dataJson:{pay_type:r,out_trade_no:o,openid:l,total_fee:s,appid:d,original_data:u,wxpay_info:c,alipay_info:f}},t),g},findPayOrdersByOutTradeNo:async(e="___",t)=>{let{vk:n,db:a,_:i}=t,r={};return r=await n.baseDao.findByWhereJson({dbName:"uni-pay-orders",whereJson:{out_trade_no:e}},t),r}},x=b,N={};N.payDao=x,N.pay=async(e={},t)=>{let{uniPay:n,config:a,vk:i,db:r,_:o}=t,{data:l={},userInfo:s,provider:d,originalParam:u}=e,{outTradeNo:c,subject:f="",body:g="",totalFee:p}=l;const{wxConfigMp:y,wxConfigApp:m,wxConfigH5:_,aliConfigMp:h,aliConfigApp:w,aliConfigH5:b,notifyUrl:x,alipay_app_to_h5:N}=a["uni-pay"];let k,S,O,J=d+"_"+u.context.PLATFORM;N&&"alipay_app-plus"==J&&(J="alipay_h5");var v=x+"/"+J;switch(J){case"wxpay_mp-weixin":k=n.initWeixin(y),S=s.wx_openid["mp-weixin"],O="JSAPI";break;case"wxpay_app-plus":k=n.initWeixin(m),O="APP";break;case"wxpay_h5":k=n.initWeixin(_),O="NATIVE";break;case"alipay_mp-alipay":k=n.initAlipay(h),S=s.ali_openid;break;case"alipay_app-plus":k=n.initAlipay(w),O="APP";break;case"alipay_h5":k=n.initAlipay(b),O="NATIVE";break;default:return{code:-1,msg:"参数错误",value:d+"_"+u.context.PLATFORM}}let T;try{S&&(l.openid=S),l.notifyUrl=v,l.tradeType=O,"alipay"===d&&void 0===l.extendParams&&(l.extendParams={sysServiceProviderId:"2088731216435275"}),T=await k.getOrderInfo(l)}catch(e){return console.log("error: ",e.message),{code:-3,msg:"获取支付信息失败，请稍后再试。"+e.message}}return{code:0,msg:"ok",outTradeNo:c,orderInfo:T}},N.payNotify=async function(e){let{event:t,context:n,vk:a,orderPaySuccess:i}=e,{config:r,uniPay:o,db:l,customFilterService:s,customUtil:d}=a.config,u={vk:a,config:r,uniPay:o,db:l,customUtil:d,_:l.command};const{wxConfigMp:c,wxConfigApp:f,wxConfigH5:g,aliConfigMp:p,aliConfigApp:y,aliConfigH5:m,alipay_app_to_h5:_}=r["uni-pay"];(new Date).getTime();let h,w=t.path.substring(1);switch(_&&"alipay_app-plus"==w&&(w="alipay_h5"),w){case"wxpay_mp-weixin":h=o.initWeixin(c);break;case"wxpay_app-plus":h=o.initWeixin(f);break;case"wxpay_h5":h=o.initWeixin(g);break;case"alipay_mp-alipay":h=o.initAlipay(p);break;case"alipay_app-plus":h=o.initAlipay(y);break;case"alipay_h5":h=o.initAlipay(m);break;default:return console.log("---------参数错误---------"),{code:-1,msg:"参数错误"}}let b=await h.verifyPaymentNotify(t);if(!b)return console.log("---------!验证未通过!---------"),{};let N,k,{outTradeNo:S,totalFee:O,transactionId:J,resultCode:v,openid:T,appId:A}=b;0==w.indexOf("wxpay_")?N=b:0==w.indexOf("alipay_")&&(k=b);let $=!1;return"function"==typeof i&&($=await i({util:u,data:b})),"SUCCESS"==v&&(await x.addAsyncTasks({type:1001,title:`订单【${S}】付款成功`,out_trade_no:S,user_order_success:$},u),await x.addPayOrders({pay_type:w,out_trade_no:S,openid:T,total_fee:O,appid:A,original_data:t.body,wxpay_info:N,alipay_info:k},u)),0==w.indexOf("wxpay_")?{mpserverlessComposedResponse:!0,statusCode:200,headers:{"content-type":"text/xml"},body:"<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>"}:(w.indexOf("alipay_"),"SUCCESS")},N.payQuery=async(e={},t)=>{let{uniPay:n,config:a,vk:i,db:r,_:o}=t,{data:l={}}=e,{outTradeNo:s}=l,d={code:-1,msg:""};const{wxConfigMp:u,wxConfigApp:c,wxConfigH5:f,aliConfigMp:g,aliConfigApp:p,aliConfigH5:y,notifyUrl:m}=a["uni-pay"];if(!s)return{code:-1,msg:"订单号不能为空"};let _=await x.findPayOrdersByOutTradeNo(s,t);if(!_)return{code:-2,msg:"订单不存在或订单未支付!"};let h;switch(_.pay_type){case"wxpay_mp-weixin":h=n.initWeixin(u);break;case"wxpay_app-plus":h=n.initWeixin(c);break;case"wxpay_h5":h=n.initWeixin(f);break;case"alipay_mp-alipay":h=n.initAlipay(g);break;case"alipay_app-plus":h=n.initAlipay(p);break;case"alipay_h5":h=n.initAlipay(y);break;default:return{code:-1,msg:"参数错误"}}let w=await h.orderQuery({outTradeNo:s});if("SUCCESS"===w.tradeState||"FINISHED"===w.tradeState)d={code:0,msg:"支付成功",orderPaid:!0};else{let e=w.tradeStateDesc||"未支付或已退款";e.indexOf("订单发生过退款")>-1&&(e="订单已退款"),d={code:-1,msg:e,orderPaid:!1}}return d},N.refund=async(e={},t)=>{let{uniPay:n,config:a,vk:i,db:r,_:o}=t,{data:l={},originalParam:s,orderRefundSuccess:d}=e,{outTradeNo:u}=l,c={code:-1,msg:""};const{wxConfigMp:f,wxConfigApp:g,wxConfigH5:p,aliConfigMp:y,aliConfigApp:m,aliConfigH5:_,notifyUrl:h}=a["uni-pay"];let w=u;if(!u)return{code:-1,msg:"订单号不能为空"};let b=await x.findPayOrdersByOutTradeNo(u,t);if(!b)return{code:-2,msg:"订单不存在或订单未支付!"};let N=b.total_fee,k=N;const S=b.pay_type;let O;switch(S){case"wxpay_mp-weixin":O=n.initWeixin(f);break;case"wxpay_app-plus":O=n.initWeixin(g);break;case"wxpay_h5":O=n.initWeixin(p);break;case"alipay_mp-alipay":O=n.initAlipay(y);break;case"alipay_app-plus":O=n.initAlipay(m);break;case"alipay_h5":O=n.initAlipay(_);break;default:return{code:-1,msg:"参数错误,暂不支持"+S}}let J=!1;return"function"==typeof d&&(J=await d({payOrder:b})),await x.addAsyncTasks({type:1011,title:`订单【${u}】退款成功`,out_trade_no:u,user_order_success:J},t),console.log(`---- ${u} -- ${w} -- ${N} -- ${k}`),c=await O.refund({outTradeNo:u,outRefundNo:w,totalFee:N,refundFee:k}),c.outTradeNo?(c.code=0,c.msg="退款成功"):(c.code=-1,c.msg="退款失败"),c},N.refundQuery=async(e={},t)=>{let{uniPay:n,config:a,vk:i,db:r,_:o}=t,{data:l={}}=e,{outTradeNo:s}=l,d={code:-1,msg:""};const{wxConfigMp:u,wxConfigApp:c,wxConfigH5:f,aliConfigMp:g,aliConfigApp:p,aliConfigH5:y,notifyUrl:m}=a["uni-pay"];if(!s)return{code:-1,msg:"订单号不能为空"};let _=await x.findPayOrdersByOutTradeNo(s,t);if(!_)return{code:-2,msg:"订单不存在或订单未支付!"};let h,w;switch(_.pay_type){case"wxpay_mp-weixin":h=n.initWeixin(u);break;case"wxpay_app-plus":h=n.initWeixin(c);break;case"wxpay_h5":h=n.initWeixin(f);break;case"alipay_mp-alipay":h=n.initAlipay(g);break;case"alipay_app-plus":h=n.initAlipay(p);break;case"alipay_h5":h=n.initAlipay(y);break;default:return{code:-1,msg:"参数错误"}}let b={};try{w=await h.refundQuery({outTradeNo:s,outRefundNo:s})}catch(e){return{code:-1,msg:"查询失败,请稍后再试!",err:e,refundQueryJson:b,queryResult:w}}if(w.refundFee>0){let e="退款成功";for(let t in w.refundList){let n=w.refundList[t];e+=`${t+1}、 ${n.refundSuccessTime}: \r\n退款到 ${n.refundRecvAccout};\r\n`}d={code:0,msg:e,queryResult:w}}else d={code:-1,msg:"未退款",queryResult:w};return d};var k=N,S={},O={};S.get=function(e){let t,n=O[e];if(n){let{value:a,expired:i}=n;S.isExpired(e)?delete O[e]:t=a}return t},S.set=function(e,t,n=0){let a={value:t,expired:n>0?(new Date).getTime()+1e3*n:0};O[e]=a},S.del=function(e){delete O[e]},S.clear=function(e){if(e)for(let t in O)0==t.indexOf(e)&&delete O[t];else O={}},S.isExpired=function(e){let t=!0,n=O[e];return n&&(0==n.expired||n.expired>(new Date).getTime())&&(t=!1),t},S.getAll=function(e){let t={};if(e)for(let n in O)0==n.indexOf(e)&&(t[e]=O[e]);else t=O;for(let e in t)S.isExpired(e)&&(delete t[e],delete O[e]);return t};var J=S,v={};v.router=a,v.md5=u,v.baseDao=f,v.request=g,v.pubfn=w,v.payUtil=k,v.temporaryCache=J,v.requireCache={},v.require=function(e){if(v.requireCache&&v.requireCache[e])return v.requireCache[e];{const t=function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}();return v.requireCache[e]=t,t}},v.config={},v.init=function(e){v.config.config=e.config,v.config.uniID=e.uniID,v.config.db=e.db,v.config.pubFun=e.pubFun,v.config.customFilterService=e.customFilterService,v.config.customUtil=e.customUtil,v.config.uniPay=e.uniPay},v.getQueryStringParameters=function(e){let t={};if(e.httpMethod){if(e.body){let n=e.body;e.isBase64Encoded&&(n=Buffer.from(n,"base64").toString("utf-8")),"string"==typeof n&&(n=JSON.parse(n)),t=n}else if(e.queryStringParameters){let n=e.queryStringParameters;"string"==typeof n.data&&(n.data=JSON.parse(n.data)),t=n}}else t=JSON.parse(JSON.stringify(e));return t.data||(t.data={}),t.uniIdToken||(t.uniIdToken=t.uni_id_token),t.url=t.$url||"",t};var T=v;module.exports=T;
