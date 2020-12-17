"use strict";var e={main:async e=>{let{uniID:t}=e.util,n={code:-1,msg:""},i=await t.checkToken(e.uniIdToken);if(i.code&&i.code>0)return i;let a=i.userInfo;return delete a.token,delete a.password,n.uid=i.uid,n.userInfo=a,i.token&&(n.token=i.token,n.tokenExpired=i.tokenExpired),n.code=0,n.msg="ok",n}},t=[{id:"pub",regExp:"/pub/",description:"pub函数为所有人都可以访问的函数",index:100,main:async function(t){let n={};return t.data.need_user_info&&(n=await e.main(t)),n.code=0,n.msg="ok",n}},{id:"kh",regExp:"/kh/",description:"kh函数为必须登录后才能访问的函数(客户端用户)",index:200,main:e.main},{id:"sys",regExp:"/sys/",description:"sys函数为后端管理人员才能访问的函数(商家后台工作人员)",index:300,main:{main:async t=>{let{url:n,util:i}=t,{uniID:a,config:r,pubFun:o,vk:l,db:s,_:d}=i,u={code:-1,msg:""};const c=e;if(u=await c.main(t),0!==u.code)return u;if(!u.userInfo.allow_login_background)return{code:403,msg:"您无权限登录后台"};if(l.pubfn.isNotNull(u.userInfo.role)&&u.userInfo.role.indexOf("admin")>-1)return u;let g=await l.baseDao.select({dbName:"uni-id-roles",whereJson:{role_id:d.in(u.userInfo.role),enable:!0},fieldJson:{permission:!0}},t.util),f=[];for(let e in g.rows){let t=g.rows[e].permission;t&&t.length>0&&(f=f.concat(t))}return 0==f.length||await l.baseDao.count({dbName:"uni-id-permissions",whereJson:{permission_id:d.in(f),enable:!0,url:n}},t.util)<=0?{code:403,msg:"权限不足"}:(u.code=0,u.msg="ok",u)}}.main}],n=async(e,n)=>{let i={code:403,msg:"access denied",filterStack:[]},{url:a}=e,r=[];if(n){let e=[...t,...n];e.sort((function(e,t){return e.index-t.index})),r=e.filter((t,n,i)=>{var a=[];return e.forEach((e,t)=>{a.push(e.id)}),a.indexOf(t.id)===n})}else r=t;for(let t in r){let n=r[t];if(new RegExp(n.regExp).test(a)){e.filterResponse=i;let t=await n.main(e);if(t.filterId=n.id,i.filterStack.push(t),0!==t.code){i=t;break}i=Object.assign(i,t)}}return i};process.env.TZ="Asia/Shanghai";var i=async function(e){let t,{event:i,context:a,vk:r}=e,{config:o,uniID:l,uniPay:s,db:d,customFilterService:u,pubFun:c,customUtil:g}=r.config,f={event:i,context:a},p=r.getQueryStringParameters(i),{url:y,data:m,uniIdToken:_}=p,w={url:y,data:m,uniIdToken:_,util:{vk:r,config:o,pubFun:c,uniID:l,uniPay:s,db:d,customUtil:g,_:d.command},originalParam:f},h=await n(w,u);if(0!==h.code)return h;h.uid&&(m.uid=h.uid),w.filterResponse=h;try{t=r.require("service/"+y)}catch(e){return e&&"MODULE_NOT_FOUND"==e.code?{code:404,msg:`云函数 ${y} 不存在!`,err:e}:{code:500,msg:`云函数 ${y} 编译异常!`,err:e}}return await async function(e={}){let{res:t,serviceParam:n,serviceMain:i}=e;t.uid&&(n.uid=t.uid);t.userInfo&&(n.userInfo=t.userInfo);let a=await i.main(n);t.token&&"object"==typeof a&&(a.vk_uni_token={token:t.token,tokenExpired:t.tokenExpired});return a}({res:h,serviceParam:w,serviceMain:t})};function a(e,t,n,i,a,r){return d((o=d(d(t,e),d(i,r)))<<(l=a)|o>>>32-l,n);var o,l}function r(e,t,n,i,r,o,l){return a(t&n|~t&i,e,t,r,o,l)}function o(e,t,n,i,r,o,l){return a(t&i|n&~i,e,t,r,o,l)}function l(e,t,n,i,r,o,l){return a(t^n^i,e,t,r,o,l)}function s(e,t,n,i,r,o,l){return a(n^(t|~i),e,t,r,o,l)}function d(e,t){var n=(65535&e)+(65535&t);return(e>>16)+(t>>16)+(n>>16)<<16|65535&n}var u=function(e){return function(e){for(var t="",n=0;n<4*e.length;n++)t+="0123456789abcdef".charAt(e[n>>2]>>n%4*8+4&15)+"0123456789abcdef".charAt(e[n>>2]>>n%4*8&15);return t}(function(e,t){e[t>>5]|=128<<t%32,e[14+(t+64>>>9<<4)]=t;for(var n=1732584193,i=-271733879,a=-1732584194,u=271733878,c=0;c<e.length;c+=16){var g=n,f=i,p=a,y=u;n=r(n,i,a,u,e[c+0],7,-680876936),u=r(u,n,i,a,e[c+1],12,-389564586),a=r(a,u,n,i,e[c+2],17,606105819),i=r(i,a,u,n,e[c+3],22,-1044525330),n=r(n,i,a,u,e[c+4],7,-176418897),u=r(u,n,i,a,e[c+5],12,1200080426),a=r(a,u,n,i,e[c+6],17,-1473231341),i=r(i,a,u,n,e[c+7],22,-45705983),n=r(n,i,a,u,e[c+8],7,1770035416),u=r(u,n,i,a,e[c+9],12,-1958414417),a=r(a,u,n,i,e[c+10],17,-42063),i=r(i,a,u,n,e[c+11],22,-1990404162),n=r(n,i,a,u,e[c+12],7,1804603682),u=r(u,n,i,a,e[c+13],12,-40341101),a=r(a,u,n,i,e[c+14],17,-1502002290),i=r(i,a,u,n,e[c+15],22,1236535329),n=o(n,i,a,u,e[c+1],5,-165796510),u=o(u,n,i,a,e[c+6],9,-1069501632),a=o(a,u,n,i,e[c+11],14,643717713),i=o(i,a,u,n,e[c+0],20,-373897302),n=o(n,i,a,u,e[c+5],5,-701558691),u=o(u,n,i,a,e[c+10],9,38016083),a=o(a,u,n,i,e[c+15],14,-660478335),i=o(i,a,u,n,e[c+4],20,-405537848),n=o(n,i,a,u,e[c+9],5,568446438),u=o(u,n,i,a,e[c+14],9,-1019803690),a=o(a,u,n,i,e[c+3],14,-187363961),i=o(i,a,u,n,e[c+8],20,1163531501),n=o(n,i,a,u,e[c+13],5,-1444681467),u=o(u,n,i,a,e[c+2],9,-51403784),a=o(a,u,n,i,e[c+7],14,1735328473),i=o(i,a,u,n,e[c+12],20,-1926607734),n=l(n,i,a,u,e[c+5],4,-378558),u=l(u,n,i,a,e[c+8],11,-2022574463),a=l(a,u,n,i,e[c+11],16,1839030562),i=l(i,a,u,n,e[c+14],23,-35309556),n=l(n,i,a,u,e[c+1],4,-1530992060),u=l(u,n,i,a,e[c+4],11,1272893353),a=l(a,u,n,i,e[c+7],16,-155497632),i=l(i,a,u,n,e[c+10],23,-1094730640),n=l(n,i,a,u,e[c+13],4,681279174),u=l(u,n,i,a,e[c+0],11,-358537222),a=l(a,u,n,i,e[c+3],16,-722521979),i=l(i,a,u,n,e[c+6],23,76029189),n=l(n,i,a,u,e[c+9],4,-640364487),u=l(u,n,i,a,e[c+12],11,-421815835),a=l(a,u,n,i,e[c+15],16,530742520),i=l(i,a,u,n,e[c+2],23,-995338651),n=s(n,i,a,u,e[c+0],6,-198630844),u=s(u,n,i,a,e[c+7],10,1126891415),a=s(a,u,n,i,e[c+14],15,-1416354905),i=s(i,a,u,n,e[c+5],21,-57434055),n=s(n,i,a,u,e[c+12],6,1700485571),u=s(u,n,i,a,e[c+3],10,-1894986606),a=s(a,u,n,i,e[c+10],15,-1051523),i=s(i,a,u,n,e[c+1],21,-2054922799),n=s(n,i,a,u,e[c+8],6,1873313359),u=s(u,n,i,a,e[c+15],10,-30611744),a=s(a,u,n,i,e[c+6],15,-1560198380),i=s(i,a,u,n,e[c+13],21,1309151649),n=s(n,i,a,u,e[c+4],6,-145523070),u=s(u,n,i,a,e[c+11],10,-1120210379),a=s(a,u,n,i,e[c+2],15,718787259),i=s(i,a,u,n,e[c+9],21,-343485551),n=d(n,g),i=d(i,f),a=d(a,p),u=d(u,y)}return Array(n,i,a,u)}(function(e){for(var t=Array(),n=0;n<8*e.length;n+=8)t[n>>5]|=(255&e.charCodeAt(n/8))<<n%32;return t}(e),8*e.length))},c={add:async function(e,t){let{db:n,_:i}=t,{dbName:a,dataJson:r}=e;if(!r._add_time){let e=new Date;r._add_time=e.getTime();let t={year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"};r._add_time_str=e.toLocaleString("zh-CN",t)}let o=await n.collection(a).add(r);return o.id?o.id:null},adds:async function(e,t){let{db:n,_:i}=t,{dbName:a,dataJson:r}=e,o=new Date,l=o.getTime(),s=o.toLocaleString("zh-CN",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"});for(let e in r)r[e]._add_time||(r[e]._add_time=l,r[e]._add_time_str=s);let d=await n.collection(a).add(r);return d.id?d.id:null},del:async function(e,t){let{db:n,_:i}=t,{dbName:a,whereJson:r}=e,o=0;if(r&&"{}"!==JSON.stringify(r)){let e=await n.collection(a).where(r).remove();e?o=e.deleted:(console.error(e.errMsg),o=-1)}else console.error("whereJson条件不能为空");return o},delete:async function(e,t){return await c.del(e,t)},update:async function(e,t){let{db:n,_:i}=t,{dbName:a,whereJson:r,dataJson:o}=e,l=0;if(r&&"{}"!==JSON.stringify(r)){let e=await n.collection(a).where(r).update(o);e?l=e.updated:(console.error(e.errMsg),l=-1)}else console.error("whereJson条件不能为空");return l},select:async function(e,t){let{db:n,_:i}=t,{dbName:a,whereJson:r,pageSize:o=10}=e;if(r&&"{}"!==JSON.stringify(r)||(r={_id:i.neq("___")}),o<=0&&(o=999999999),o>100)return await c.selectAll(e,t);let l=await c.getSelectData(e,t),{result:s,hasMore:d,total:u,getCount:g,pageIndex:f}=l;return s=s.skip((f-1)*o).limit(o),s.get().then(e=>{let t={};return g?(t.hasMore=d,t.total=u):(t.total=e.data?e.data.length:0,t.hasMore=t.total>=o),t.rows=e.data,t.code=0,t.key=1,t.pageIndex=f,t.pageSize=o,t})},findById:async function(e,t){let{db:n,_:i}=t,{dbName:a,id:r,fieldJson:o}=e;try{let e=n.collection(a).doc(r);return o&&(e=e.field(o)),(await e.get()).data[0]}catch(e){return console.error(e),null}},findByWhereJson:async function(e,t){let{db:n,_:i}=t,{dbName:a,whereJson:r,fieldJson:o}=e;try{if(r&&"{}"!==JSON.stringify(r)){let e=n.collection(a).where(r);o&&(e=e.field(o));let t=await e.limit(1).get();if(t.data&&t.data.length>0)return t.data[0]}else console.error("whereJson条件不能为空")}catch(e){console.error(e)}return null},count:async function(e,t){let{db:n,_:i}=t,{dbName:a,whereJson:r}=e;r&&"{}"!==JSON.stringify(r)||(r={_id:i.neq("___")});try{return(await n.collection(a).where(r).count()).total}catch(e){return console.error(e),null}},select2:async function(e,t){let{foreignKeyType:n="many-to-one"}=e;return"many-to-one"===n?await c.select2_ManyToOne(e,t):"one-to-many"===n?await c.select2_OneToMany(e,t):(console.error("不支持的foreignKeyType"),{})},count2_ManyToOne:async function(e,t){let{db:n,_:i,vk:a}=t,{dbName:r,dbName2:o,foreignKey:l="_id",foreignKey2:s="_id",whereJson:d={},whereJson2:u={},pageIndex:c=1,pageSize:g=10,getCount:f=!1,sortArr:p={},fieldJson:y={},fieldJson2:m={},as:_}=e;_||(_=o),"{}"===JSON.stringify(d)&&(d={_id:i.neq("___")});i.aggregate;let w=n.collection(r).aggregate();if(d&&"{}"!==JSON.stringify(d)&&(w=w.match(d)),y&&"{}"!==JSON.stringify(y)&&(w=w.project(y)),p&&"{}"!==JSON.stringify(p)){let e={};for(let t in p){let n=p[t],i=n.name,a=n.type;a=null==a||""==a||"asc"==a?1:-1,e[i]=a}w=w.sort(e)}let h={from:o,localField:l,foreignField:s,as:_};if(w=w.lookup(h),m&&"{}"!==JSON.stringify(m)){let e={};for(let t in m)e[_+"."+t]=m[t];w=w.project(e)}if(u&&"{}"!==JSON.stringify(u)){let e={};for(let t in u)e[_+"."+t]=u[t];w=w.match(e)}let b=await w.count("total").end();try{return b.data[0].total}catch(e){return console.log(e),0}},select2_ManyToOne:async function(e,t){let{db:n,_:i,vk:a}=t,{dbName:r,dbName2:o,foreignKey:l="_id",foreignKey2:s="_id",whereJson:d={},whereJson2:u={},pageIndex:c=1,pageSize:g=10,getCount:f=!1,sortArr:p=[],fieldJson:y={},fieldJson2:m={},as:_,whereJsonPub:w={}}=e;_||(_=o),"{}"===JSON.stringify(d)&&(d={_id:i.neq("___")}),-1==g&&(c=1,g=999999999,f=!1);let h=0,b=!1;if(f){h=(await n.collection(r).where(d).count()).total,c<Math.ceil(h/g)&&(b=!0)}let x={};const N=i.aggregate;let k=n.collection(r).aggregate();if(d&&"{}"!==JSON.stringify(d)&&(k=k.match(d)),y&&"{}"!==JSON.stringify(y)&&(k=k.project(y)),p&&"[]"!==JSON.stringify(p)){let e={};for(let t in p){let n=p[t],i=n.name,a=n.type;a=null==a||""==a||"asc"==a?1:-1,e[i]=a}k=k.sort(e)}k=k.skip((c-1)*g).limit(g);let S=N.pipeline().match(i.expr(N.and([N.eq(["$"+s,"$$foreignKey"+l])])));u&&"{}"!==JSON.stringify(u)&&(S=S.match(u)),m&&"{}"!==JSON.stringify(m)&&(S=S.project(m)),S=S.done();let J={};J["foreignKey"+l]="$"+l;let O={from:o,let:J,pipeline:S,as:_};k=k.lookup(O),w&&"{}"!==JSON.stringify(w)&&(k=k.match(w)),k=await k.end();let v=k.data;for(let e in v)v[e][_]&&v[e][_].length>0?v[e][_]=v[e][_][0]:v[e][_]={};return f?(x.hasMore=b,x.total=h):(x.total=v?v.length:0,x.hasMore=h>=g),x.rows=v,x.code=0,x.key=1,x},select2_OneToMany:async function(e,t){let{db:n,_:i,vk:a}=t,{dbName:r,dbName2:o,foreignKey:l="_id",foreignKey2:s="_id",whereJson:d={},whereJson2:u={},pageIndex:c=1,pageSize:g=10,getCount:f=!1,sortArr:p=[],sortArr2:y=[],fieldJson:m={},fieldJson2:_={},as:w}=e;w||(w=o),"{}"===JSON.stringify(d)&&(d={_id:i.neq("___")}),-1==g&&(c=1,g=999999999,f=!1);let h=0,b=!1;if(f){h=(await n.collection(r).where(d).count()).total,c<Math.ceil(h/g)&&(b=!0)}let x={};const N=i.aggregate;let k=n.collection(r).aggregate();if(d&&"{}"!==JSON.stringify(d)&&(k=k.match(d)),m&&"{}"!==JSON.stringify(m)&&(k=k.project(m)),p&&"[]"!==JSON.stringify(p)){let e={};for(let t in p){let n=p[t],i=n.name,a=n.type;a=null==a||""==a||"asc"==a?1:-1,e[i]=a}k=k.sort(e)}k=k.skip((c-1)*g).limit(g);let S=N.pipeline().match(i.expr(N.and([N.eq(["$"+s,"$$foreignKey"+l])])));if(u&&"{}"!==JSON.stringify(u)&&(S=S.match(u)),y&&"[]"!==JSON.stringify(y)){let e={};for(let t in y){let n=y[t],i=n.name,a=n.type;a=null==a||""==a||"asc"==a?1:-1,e[i]=a}S=S.sort(e)}_&&"{}"!==JSON.stringify(_)&&(S=S.project(_)),S=S.done();let J={};J["foreignKey"+l]="$"+l;let O={from:o,let:J,pipeline:S,as:w};k=k.lookup(O),k=await k.end();let v=k.data;return f?(x.hasMore=b,x.total=h):(x.total=v?v.length:0,x.hasMore=h>=g),x.rows=v,x.code=0,x.key=1,x},getSelectData:async function(e,t){let{db:n,_:i}=t,{dbName:a,whereJson:r,pageIndex:o=1,pageSize:l=10,getCount:s=!1}=e;r&&"{}"!==JSON.stringify(r)||(r={_id:i.neq("___")}),l<0&&(o=1,l=999999999,s=!0);let d=e.sortArr,u=e.fieldJson,c=0,g=!1;if(s){c=(await n.collection(a).where(r).count()).total,o<Math.ceil(c/l)&&(g=!0)}let f=n.collection(a);if(u&&(f=f.field(u)),r&&(f=f.where(r)),d)for(let e in d){let t=d[e],n=t.name,i=t.type;null!=i&&""!=i||(i="asc"),f=f.orderBy(n,i)}return{result:f,dbName:a,whereJson:r,pageIndex:o,pageSize:l,getCount:s,sortArr:d,fieldJson:u,total:c,hasMore:g}},selectAll:async function(e,t){let{db:n,_:i,vk:a,config:r}=t,o=(e.dbName,{}),l=500;a.pubfn.getData(r,"vk.db.unicloud")&&(l=a.pubfn.getData(r,"vk.db.unicloud.max_limit"));let s=await c.getSelectData(e,t),{result:d,hasMore:u,total:g,getCount:f,pageIndex:p,pageSize:y}=s;y>0&&!g&&!f&&(g=y);let m={};if(f&&0===g)m={data:[]};else{let t=g;y<g&&(t=y);let n=Math.ceil(t/l),i=[],a=(p-1)*y,r=a+y;for(let e=0;e<n;e++){let t=a+e*l,n=l;t+l>r&&(n=r-t);let o=d.skip(t).limit(n).get();i.push(o)}try{m=(await Promise.all(i)).reduce((e,t)=>({data:e.data.concat(t.data),errMsg:e.errMsg}))}catch(t){console.error("selectAll-异常",e,t),m={data:[]}}}return o.rows=m.data,o.key=1,o.code=0,o.hasMore=u,o.pageIndex=p,o.pageSize=y,o.total=f?g:m.data?m.data.length:0,o},sum:async function(e,t){let{db:n,_:i}=t,{dbName:a,fieldName:r,whereJson:o}=e;o&&"{}"!==JSON.stringify(o)||(o={_id:i.neq("___")});const l=n.command.aggregate;try{return(await n.collection(a).aggregate().match(o).group({_id:null,num:l.sum("$"+r)}).end()).data[0].num}catch(e){return console.error(e),null}},avg:async function(e,t){let{db:n,_:i}=t,{dbName:a,fieldName:r,whereJson:o}=e;o&&"{}"!==JSON.stringify(o)||(o={_id:i.neq("___")});const l=n.command.aggregate;try{return(await n.collection(a).aggregate().match(o).group({_id:null,num:l.avg("$"+r)}).end()).data[0].num}catch(e){return console.error(e),null}},max:async function(e,t){let{db:n,_:i}=t,{dbName:a,fieldName:r,whereJson:o}=e;o&&"{}"!==JSON.stringify(o)||(o={_id:i.neq("___")});const l=n.command.aggregate;try{return(await n.collection(a).aggregate().match(o).group({_id:null,num:l.max("$"+r)}).end()).data[0].num}catch(e){return console.error(e),null}},min:async function(e,t){let{db:n,_:i}=t,{dbName:a,fieldName:r,whereJson:o}=e;o&&"{}"!==JSON.stringify(o)||(o={_id:i.neq("___")});const l=n.command.aggregate;try{return(await n.collection(a).aggregate().match(o).group({_id:null,num:l.min("$"+r)}).end()).data[0].num}catch(e){return console.error(e),null}},sample:async function(e,t){let{db:n,_:i}=t,{dbName:a,whereJson:r,size:o}=e;r&&"{}"!==JSON.stringify(r)||(r={_id:i.neq("___")});n.command.aggregate;try{return(await n.collection(a).aggregate().match(r).sample({size:o}).end()).data}catch(e){return console.error(e),null}},selects:async function(e,t){let{db:n,_:i,vk:a}=t,{dbName:r,foreignKey:o="_id",whereJson:l={},pageIndex:s=1,pageSize:d=10,getCount:u=!1,sortArr:c=[],fieldJson:g={},foreignDB:f=[]}=e;"{}"===JSON.stringify(l)&&(l={_id:i.neq("___")}),-1==d&&(s=1,d=999999999,u=!1);let p=0,y=!1;if(u){p=(await n.collection(r).where(l).count()).total,s<Math.ceil(p/d)&&(y=!0)}let m={};const _=i.aggregate;let w=n.collection(r).aggregate();if(l&&"{}"!==JSON.stringify(l)&&(w=w.match(l)),g&&"{}"!==JSON.stringify(g)&&(w=w.project(g)),c&&"[]"!==JSON.stringify(c)){let e={};for(let t in c){let n=c[t],i=n.name,a=n.type;a=null==a||""==a||"asc"==a?1:-1,e[i]=a}w=w.sort(e)}w=w.skip((s-1)*d).limit(d);for(let e in f){let{dbName:t,foreignKey:n,as:a,limit:r,whereJson:l,fieldJson:s,sortArr:d}=f[e];a||(a=t);let u=_.pipeline().match(i.expr(_.and([_.eq(["$"+n,"$$foreignKey"+o])])));if(l&&"{}"!==JSON.stringify(l)&&(u=u.match(l)),d&&"[]"!==JSON.stringify(d)){let e={};for(let t in d){let n=d[t],i=n.name,a=n.type;a=null==a||""==a||"asc"==a?1:-1,e[i]=a}u=u.sort(e)}r&&(u=u.limit(r)),s&&"{}"!==JSON.stringify(s)&&(u=u.project(s)),u=u.done();let c={};c["foreignKey"+o]="$"+o;let g={from:t,let:c,pipeline:u,as:a};w=w.lookup(g)}w=await w.end();let h=w.data;for(let e in h)for(let t in f){let{as:n,limit:i}=f[t];1===i&&(h[e][n]&&h[e][n].length>0?h[e][n]=h[e][n][0]:h[e][n]={})}return u?(m.hasMore=y,m.total=p):(m.total=h?h.length:0,m.hasMore=p>=d),m.rows=h,m.code=0,m.key=1,m}},g=c,f=async(e={})=>{"[object object]"==Object.prototype.toString.call(e.content)&&(e.content=JSON.stringify(e.content)),void 0===e.dataType&&(e.dataType="json"),"default"==e.dataType&&delete e.dataType,e.useContent&&(e.content=JSON.stringify(e.data)),e.method||(e.method="POST"),e.data&&(e.headers||(e.headers={"content-type":"application/json; charset=UTF-8"}));var t=await uniCloud.httpclient.request(e.url,e);return t&&t.data?t.data:t},p={formValidateItem:function(e,t,n){let i={code:0,msg:"ok"};for(let a in n){let r=n[a];if(void 0===e[t]&&r.required){i={type:"undefined",code:-1,msg:"字段："+t+" 名称错误，请检查！",key:t,value:e[t]};break}if(r.required&&(null==e[t]||null==e[t]||""===e[t]||0==e[t].length)){i={type:"required",code:-1,msg:r.message,key:t,value:e[t]};break}if(r.type){if(Object.prototype.toString.call(e[t]).toLowerCase()!==`[object ${r.type}]`){i={type:"type",code:-1,msg:r.message,key:t,value:e[t]};break}}if(r.len&&e[t].length!=r.len){i={type:"len",code:-1,msg:r.message,key:t,value:e[t]};break}if(r.min)if(r.type&&"number"==r.type){if(e[t]<r.min){i={type:"min",code:-1,msg:r.message,key:t,value:e[t]};break}}else if(e[t].length<r.min){i={type:"min",code:-1,msg:r.message,key:t,value:e[t]};break}if(r.max)if(r.type&&"number"==r.type){if(e[t]>r.max){i={type:"max",code:-1,msg:r.message,key:t,value:e[t]};break}}else if(e[t].length>r.max){i={type:"max",code:-1,msg:r.message,key:t,value:e[t]};break}if("function"==typeof r.validator){let n=r.validator(r,e[t],(function(e){return e}));if(void 0!==n&&!0!==n){i={type:"validator",code:-1,msg:r.message,key:t,value:e[t]};break}}}return i}};function y(e,t,n){let i=[];for(let a=e.length-1;a>-1;a--){const r=e[a],o=t.filter(e=>{if(e.parent_id===r.menu_id)return n.push(e.menu_id),!0});i=i.concat(o),r.children=o}i.length&&y(i,t,n)}function m(e,t){const n=[];let i=e;for(;i&&i.parent_id;)n.push(i.parent_id),i=t.find(e=>e.menu_id===i.parent_id);return n}var _={buildMenu:y,buildMenus:function(e,t=!0){if(e=e.sort((function(t,n){const i=m(t,e),a=m(n,e);return i.includes(n.menu_id)?1:i.length-a.length||t.sort-n.sort})),t)for(let t=e.length-1;t>-1;t--){const n=e[t],i=e.filter(e=>e.parent_id===n.menu_id);n.isLeafNode||i.length||e.splice(t,1)}const n=[],i=e.filter(e=>{if(!e.parent_id)return n.push(e.menu_id),!0});return y(i,e,n),t||n.length===e.length||i.push(...e.filter(e=>!n.includes(e.menu_id))),i}},w={formValidate:function(e={}){let t={code:0,msg:"ok"},{data:n,rules:i}=e;if(i)for(let e in i){let a=i[e];if(t=p.formValidateItem(n,e,a),0!=t.code)break}return t}};w.buildUtil=_,w.urlStringToJson=function(e){var t={};if(""!=e&&null!=e&&null!=e)for(var n=e.split("&"),i=0;i<n.length;i++){var a=n[i].split("="),r=a[0],o=a[1];t[r]=o}return t},w.getQueryStringParameters=function(e){let t={};if(e.httpMethod){if(console.log("event.path:",e.path),e.body){let n=e.body;e.isBase64Encoded&&(n=Buffer.from(n,"base64").toString("utf-8")),"string"==typeof n&&(n=JSON.parse(n)),t=n}else if(e.queryStringParameters){let n=e.queryStringParameters;"string"==typeof n.data&&(n.data=JSON.parse(n.data)),t=n}}else t=JSON.parse(JSON.stringify(e));return t.data||(t.data={}),t.url=t.$url||"",t},w.deleteObjectKeys=function(e,t=[]){var n={};if(e)for(let i in e)-1==t.indexOf(i)&&(n[i]=e[i]);return n},w.stringToFormData=function(e){e||(e="");for(var t=e.split("Content-Disposition: form-data;"),n={},i=0;i<t.length;i++){var a=t[i];let e='name="';var r=a.indexOf(e)+e.length;if(r>-1){var o=a.indexOf('"',r),l=a.substring(r,o);if(o>r){var s=a.indexOf("---",o),d=a.substring(o+1,s).trim();n[l]=d}}}return n},w.getFullTime=function(e,t=0){if(!e)return"";if("number"==typeof e)e=new Date(e);else if("object"==typeof e){let t="",n={year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"};return t=e.toLocaleString("zh-CN",n),t=t.replace(new RegExp(/[^\d\.]/,"g"),""),t}let n=e.getFullYear()+"",i=e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1,a=e.getDate()<10?"0"+e.getDate():e.getDate(),r=e.getHours()<10?"0"+e.getHours():e.getHours(),o=e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes(),l=e.getSeconds()<10?"0"+e.getSeconds():e.getSeconds();return 1==t?n+""+i+a+r+o+l:n+"-"+i+"-"+a+" "+r+":"+o+":"+l},w.checkStr=function(e,t){switch(t){case"mobile":return new RegExp(/^1[3|4|5|6|7|8|9][0-9]{9}$/).test(e);case"tel":return new RegExp(/^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/).test(e);case"card":return new RegExp(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/).test(e);case"mobileCode":return new RegExp(/^[0-9]{6}$/).test(e);case"username":return new RegExp(/^[a-zA-Z]([-_a-zA-Z0-9]{5,17})$/).test(e);case"pwd":return new RegExp(/^([a-zA-Z0-9_]){6,18}$/).test(e);case"payPwd":return new RegExp(/^[0-9]{6}$/).test(e);case"postal":return new RegExp(/[1-9]\d{5}(?!\d)/).test(e);case"QQ":return new RegExp(/^[1-9][0-9]{4,9}$/).test(e);case"email":return new RegExp(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/).test(e);case"money":return new RegExp(/^\d*(?:\.\d{0,2})?$/).test(e);case"URL":return new RegExp(/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/).test(e);case"IP":return new RegExp(/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/).test(e);case"date":return new RegExp(/^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/).test(e);case"time":return new RegExp(/^(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/).test(e);case"dateTime":return new RegExp(/^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/).test(e);case"number":return new RegExp(/^[0-9]*$/).test(e);case"english":return new RegExp(/^[a-zA-Z]+$/).test(e);case"chinese":return new RegExp(/^[\\u4E00-\\u9FA5]+$/).test(e);case"lower":return new RegExp(/^[a-z]+$/).test(e);case"upper":return new RegExp(/^[A-Z]+$/).test(e);case"HTML":return new RegExp(/<("[^"]*"|'[^']*'|[^'">])*>/).test(e);default:return!0}},w.priceFilter=function(e){return"string"==typeof e&&(e=parseFloat(e)),(e/100).toFixed(2)},w.objectAssign=function(e,t){return Object.assign(e,t)},w.copyObject=function(e){return JSON.parse(JSON.stringify(e))},w.toTimeLong=function(e){if(!e)return"";e=(e=e.substring(0,19)).replace(new RegExp(/-/,"g"),"/");var t=new Date(e).getTime();return isNaN(t)&&(t=""),t},w.arr_concat=function(e,t,n){n||(n="id");var i=e.concat(t),a=[];if(-1!=n){var r=[];for(var o in i)-1==r.indexOf(i[o][n])&&(r.push(i[o][n]),a.push(i[o]))}else a=i;return a},w.getData=function(e,t){var n=JSON.parse(JSON.stringify(e));t=t.replace(/\s+/g,"")+".";for(var i="",a=0;a<t.length;a++){var r=t.charAt(a);"."!=r&&"["!=r&&"]"!=r?i+=r:n&&(""!=i&&(n=n[i]),i="")}return n},w.setData=function(e,t,n){const i=t.match(/([\w$]+)|\[(:\d)\]/g);for(let t=0;t<i.length-1;t++){e=e[i[t]]}e[i[i.length-1]]=n},w.isNull=function(e){let t=!1;return void 0!==e&&"[object Null]"!=Object.prototype.toString.call(e)&&"{}"!=JSON.stringify(e)&&"[]"!=JSON.stringify(e)&&""!==e&&void 0!==JSON.stringify(e)||(t=!0),t},w.isNotNull=function(e){return!w.isNull(e)},w.isNullOne=function(...e){let t=!1;for(let n=0;n<e.length;n++){let i=e[n];if(w.isNull(i)){t=!0;break}}return t},w.isNullAll=function(...e){let t=!0;for(let n=0;n<e.length;n++){let i=e[n];if(w.isNotNull(i)){t=!1;break}}return t},w.isNotNullAll=function(...e){return!w.isNullOne(...e)},w.getListItem=function(e,t,n){let i;for(let a in e)if(e[a][t]===n){i=e[a];break}return i},w.listToJson=function(e,t){let n={};for(let i in e){let a=e[i];n[a[t]]=a}return n},w.random=function(e,t){let n="",i="123456789";w.isNotNull(t)&&("a-z,0-9"==t?t="abcdefghijklmnopqrstuvwxyz0123456789":"A-Z,0-9"==t?t="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789":"a-z,A-Z,0-9"!=t&&"A-Z,a-z,0-9"!=t||(t="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"),i=t);for(let t=0;t<e;t++){n+=i[Math.floor(Math.random()*i.length)]}return n},w.stringIdToNumberId=function(e,t){let n="";for(let i=0;i<t;i++)if(e.length>i){n+="0123456789"[e[i].charCodeAt()%10]}else n="0"+n;return n},w.hidden=function(e,t,n){let i=e.length-t-n,a="";for(let e=0;e<i;e++)a+="*";return e.substring(0,t)+a+e.substring(e.length-n)},w.calcFreights=function(e,t){let{first_weight:n,first_weight_price:i,continuous_weight:a,continuous_weight_price:r,max_weight:o=1e8}=e,l=0,s=0,d=o,u=!1,c=0;for(;t>0;)u?(c++,t-=a,d-=a):(u=!0,s++,d=o,t-=n,d-=n),d<=0&&(u=!1);return l=s*i+r*c,l},w.checkArrayIntersection=function(e=[],t=[]){let n=!1;for(let i=0;i<t.length;i++)e.indexOf(t[i])>-1&&(n=!0);return n},w.getWeekStartAndEnd=function(e){let t={},n=new Date;n=new Date(n.getTime()+6048e5*e);let i=n.getDay(),a=(n.getDate(),0!=i?i-1:6),r=new Date(n.getTime()-864e5*a),o=new Date(r.getTime()+5184e5);return r=new Date(new Date(r.toLocaleDateString()).getTime()),o=new Date(new Date(o.toLocaleDateString()).getTime()+86399999),t.weekStart=r,t.weekEnd=o,t},w.getCommonTime=function(e=new Date){let t={};const n=e.getFullYear(),i=e.getMonth()+1;e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds();let a=new Date(n,i,0).getDate(),r=new Date(n,12,0).getDate();t.todayStart=new Date(new Date((new Date).toLocaleDateString()).getTime()),t.todayEnd=new Date(new Date((new Date).toLocaleDateString()).getTime()+86399999),t.monthStart=new Date(new Date(`${n}/${i}/1`).getTime()),t.monthEnd=new Date(new Date(`${n}/${i}/${a}`).getTime()+86399999),t.yearStart=new Date(new Date(n+"/1/1").getTime()),t.yearEnd=new Date(new Date(`${n}/12/${r}`).getTime()+86399999);let o=w.getWeekStartAndEnd(0);return t.weekStart=o.weekStart,t.weekEnd=o.weekEnd,t},w.getNewObject=function(e,t){let n={};if(t&&t.length>0)for(let i in t){let a=t[i];w.isNotNull(e[a])&&(n[a]=e[a])}else n=w.copyObject(e);return n};var h=w;var b={addAsyncTasks:async(e={},t)=>{let{vk:n,db:i,_:a}=t,{type:r,title:o,out_trade_no:l,user_order_success:s}=e,d={};return d=await n.baseDao.add({dbName:"opendb-async-tasks",dataJson:{status:0,type:r,title:o,out_trade_no:l,user_order_success:s}},t),d},addPayOrders:async(e={},t)=>{let{vk:n,db:i,_:a}=t,{pay_type:r,out_trade_no:o,openid:l,total_fee:s,appid:d,original_data:u,wxpay_info:c,alipay_info:g}=e,f={};return f=await n.baseDao.add({dbName:"uni-pay-orders",dataJson:{pay_type:r,out_trade_no:o,openid:l,total_fee:s,appid:d,original_data:u,wxpay_info:c,alipay_info:g}},t),f},findPayOrdersByOutTradeNo:async(e="___",t)=>{let{vk:n,db:i,_:a}=t,r={};return r=await n.baseDao.findByWhereJson({dbName:"uni-pay-orders",whereJson:{out_trade_no:e}},t),r}},x=b,N={};N.payDao=x,N.pay=async(e={},t)=>{let{uniPay:n,config:i,vk:a,db:r,_:o}=t,{data:l={},userInfo:s,provider:d,originalParam:u}=e,{outTradeNo:c,subject:g="",body:f="",totalFee:p}=l;const{wxConfigMp:y,wxConfigApp:m,wxConfigH5:_,aliConfigMp:w,aliConfigApp:h,aliConfigH5:b,notifyUrl:x,alipay_app_to_h5:N}=i["uni-pay"];let k,S,J,O=d+"_"+u.context.PLATFORM;N&&"alipay_app-plus"==O&&(O="alipay_h5");var v=x+"/"+O;switch(O){case"wxpay_mp-weixin":k=n.initWeixin(y),S=s.wx_openid["mp-weixin"],J="JSAPI";break;case"wxpay_app-plus":k=n.initWeixin(m),J="APP";break;case"wxpay_h5":k=n.initWeixin(_),J="NATIVE";break;case"alipay_mp-alipay":k=n.initAlipay(w),S=s.ali_openid;break;case"alipay_app-plus":k=n.initAlipay(h),J="APP";break;case"alipay_h5":k=n.initAlipay(b),J="NATIVE";break;default:return{code:-1,msg:"参数错误",value:d+"_"+u.context.PLATFORM}}let A;try{S&&(l.openid=S),l.notifyUrl=v,l.tradeType=J,"alipay"===d&&void 0===l.extendParams&&(l.extendParams={sysServiceProviderId:"2088731216435275"}),A=await k.getOrderInfo(l)}catch(e){return console.log("error: ",e.message),{code:-3,msg:"获取支付信息失败，请稍后再试。"+e.message}}return{code:0,msg:"ok",outTradeNo:c,orderInfo:A}},N.payNotify=async function(e){let{event:t,context:n,vk:i,orderPaySuccess:a}=e,{config:r,uniPay:o,db:l,customFilterService:s,customUtil:d}=i.config,u={vk:i,config:r,uniPay:o,db:l,customUtil:d,_:l.command};const{wxConfigMp:c,wxConfigApp:g,wxConfigH5:f,aliConfigMp:p,aliConfigApp:y,aliConfigH5:m,alipay_app_to_h5:_}=r["uni-pay"];(new Date).getTime();let w,h=t.path.substring(1);switch(_&&"alipay_app-plus"==h&&(h="alipay_h5"),h){case"wxpay_mp-weixin":w=o.initWeixin(c);break;case"wxpay_app-plus":w=o.initWeixin(g);break;case"wxpay_h5":w=o.initWeixin(f);break;case"alipay_mp-alipay":w=o.initAlipay(p);break;case"alipay_app-plus":w=o.initAlipay(y);break;case"alipay_h5":w=o.initAlipay(m);break;default:return console.log("---------参数错误---------"),{code:-1,msg:"参数错误"}}let b=await w.verifyPaymentNotify(t);if(!b)return console.log("---------!验证未通过!---------"),{};let N,k,{outTradeNo:S,totalFee:J,transactionId:O,resultCode:v,openid:A,appId:D}=b;0==h.indexOf("wxpay_")?N=b:0==h.indexOf("alipay_")&&(k=b);let T=!1;return"function"==typeof a&&(T=await a({util:u,data:b})),"SUCCESS"==v&&(await x.addAsyncTasks({type:1001,title:`订单【${S}】付款成功`,out_trade_no:S,user_order_success:T},u),await x.addPayOrders({pay_type:h,out_trade_no:S,openid:A,total_fee:J,appid:D,original_data:t.body,wxpay_info:N,alipay_info:k},u)),0==h.indexOf("wxpay_")?{mpserverlessComposedResponse:!0,statusCode:200,headers:{"content-type":"text/xml"},body:"<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>"}:(h.indexOf("alipay_"),"SUCCESS")},N.payQuery=async(e={},t)=>{let{uniPay:n,config:i,vk:a,db:r,_:o}=t,{data:l={}}=e,{outTradeNo:s}=l,d={code:-1,msg:""};const{wxConfigMp:u,wxConfigApp:c,wxConfigH5:g,aliConfigMp:f,aliConfigApp:p,aliConfigH5:y,notifyUrl:m}=i["uni-pay"];if(!s)return{code:-1,msg:"订单号不能为空"};let _=await x.findPayOrdersByOutTradeNo(s,t);if(!_)return{code:-2,msg:"订单不存在或订单未支付!"};let w;switch(_.pay_type){case"wxpay_mp-weixin":w=n.initWeixin(u);break;case"wxpay_app-plus":w=n.initWeixin(c);break;case"wxpay_h5":w=n.initWeixin(g);break;case"alipay_mp-alipay":w=n.initAlipay(f);break;case"alipay_app-plus":w=n.initAlipay(p);break;case"alipay_h5":w=n.initAlipay(y);break;default:return{code:-1,msg:"参数错误"}}let h=await w.orderQuery({outTradeNo:s});if("SUCCESS"===h.tradeState||"FINISHED"===h.tradeState)d={code:0,msg:"支付成功",orderPaid:!0};else{let e=h.tradeStateDesc||"未支付或已退款";e.indexOf("订单发生过退款")>-1&&(e="订单已退款"),d={code:-1,msg:e,orderPaid:!1}}return d},N.refund=async(e={},t)=>{let{uniPay:n,config:i,vk:a,db:r,_:o}=t,{data:l={},originalParam:s,orderRefundSuccess:d}=e,{outTradeNo:u}=l,c={code:-1,msg:""};const{wxConfigMp:g,wxConfigApp:f,wxConfigH5:p,aliConfigMp:y,aliConfigApp:m,aliConfigH5:_,notifyUrl:w}=i["uni-pay"];let h=u;if(!u)return{code:-1,msg:"订单号不能为空"};let b=await x.findPayOrdersByOutTradeNo(u,t);if(!b)return{code:-2,msg:"订单不存在或订单未支付!"};let N=b.total_fee,k=N;const S=b.pay_type;let J;switch(S){case"wxpay_mp-weixin":J=n.initWeixin(g);break;case"wxpay_app-plus":J=n.initWeixin(f);break;case"wxpay_h5":J=n.initWeixin(p);break;case"alipay_mp-alipay":J=n.initAlipay(y);break;case"alipay_app-plus":J=n.initAlipay(m);break;case"alipay_h5":J=n.initAlipay(_);break;default:return{code:-1,msg:"参数错误,暂不支持"+S}}let O=!1;return"function"==typeof d&&(O=await d({payOrder:b})),await x.addAsyncTasks({type:1011,title:`订单【${u}】退款成功`,out_trade_no:u,user_order_success:O},t),console.log(`---- ${u} -- ${h} -- ${N} -- ${k}`),c=await J.refund({outTradeNo:u,outRefundNo:h,totalFee:N,refundFee:k}),c.outTradeNo?(c.code=0,c.msg="退款成功"):(c.code=-1,c.msg="退款失败"),c},N.refundQuery=async(e={},t)=>{let{uniPay:n,config:i,vk:a,db:r,_:o}=t,{data:l={}}=e,{outTradeNo:s}=l,d={code:-1,msg:""};const{wxConfigMp:u,wxConfigApp:c,wxConfigH5:g,aliConfigMp:f,aliConfigApp:p,aliConfigH5:y,notifyUrl:m}=i["uni-pay"];if(!s)return{code:-1,msg:"订单号不能为空"};let _=await x.findPayOrdersByOutTradeNo(s,t);if(!_)return{code:-2,msg:"订单不存在或订单未支付!"};let w,h;switch(_.pay_type){case"wxpay_mp-weixin":w=n.initWeixin(u);break;case"wxpay_app-plus":w=n.initWeixin(c);break;case"wxpay_h5":w=n.initWeixin(g);break;case"alipay_mp-alipay":w=n.initAlipay(f);break;case"alipay_app-plus":w=n.initAlipay(p);break;case"alipay_h5":w=n.initAlipay(y);break;default:return{code:-1,msg:"参数错误"}}let b={};try{h=await w.refundQuery({outTradeNo:s,outRefundNo:s})}catch(e){return{code:-1,msg:"查询失败,请稍后再试!",err:e,refundQueryJson:b,queryResult:h}}if(h.refundFee>0){let e="退款成功";for(let t in h.refundList){let n=h.refundList[t];e+=`${t+1}、 ${n.refundSuccessTime}: \r\n退款到 ${n.refundRecvAccout};\r\n`}d={code:0,msg:e,queryResult:h}}else d={code:-1,msg:"未退款",queryResult:h};return d};var k=N,S={},J={};S.get=function(e){let t,n=J[e];if(n){let{value:i,expired:a}=n;S.isExpired(e)?delete J[e]:t=i}return t},S.set=function(e,t,n=0){let i={value:t,expired:n>0?(new Date).getTime()+1e3*n:0};J[e]=i},S.del=function(e){delete J[e]},S.clear=function(e){if(e)for(let t in J)0==t.indexOf(e)&&delete J[t];else J={}},S.isExpired=function(e){let t=!0,n=J[e];return n&&(0==n.expired||n.expired>(new Date).getTime())&&(t=!1),t},S.getAll=function(e){let t={};if(e)for(let n in J)0==n.indexOf(e)&&(t[e]=J[e]);else t=J;for(let e in t)S.isExpired(e)&&(delete t[e],delete J[e]);return t};var O=S,v={};v.router=i,v.md5=u,v.baseDao=g,v.request=f,v.pubfn=h,v.payUtil=k,v.temporaryCache=O,v.requireCache={},v.require=function(e){if(v.requireCache&&v.requireCache[e])return v.requireCache[e];{const t=function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}();return v.requireCache[e]=t,t}},v.config={},v.init=function(e){v.config.config=e.config,v.config.uniID=e.uniID,v.config.db=e.db,v.config.pubFun=e.pubFun,v.config.customFilterService=e.customFilterService,v.config.customUtil=e.customUtil,v.config.uniPay=e.uniPay},v.getQueryStringParameters=function(e){let t={};if(e.httpMethod){if(e.body){let n=e.body;e.isBase64Encoded&&(n=Buffer.from(n,"base64").toString("utf-8")),"string"==typeof n&&(n=JSON.parse(n)),t=n}else if(e.queryStringParameters){let n=e.queryStringParameters;"string"==typeof n.data&&(n.data=JSON.parse(n.data)),t=n}}else t=JSON.parse(JSON.stringify(e));return t.data||(t.data={}),t.uniIdToken||(t.uniIdToken=t.uni_id_token),t.url=t.$url||"",t};var A=v;module.exports=A;
