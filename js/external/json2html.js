var json2html={transform:function(t,n,e){var i={events:[],html:""},r={events:!1};if(r=json2html._extend(r,e),void 0!==n||void 0!==t){var s="string"==typeof t?JSON.parse(t):t;i=json2html._transform(s,n,r)}return r.events?i:i.html},_extend:function(t,n){var e={};for(var i in t)e[i]=t[i];for(var i in n)e[i]=n[i];return e},_append:function(t,n){var e={html:"",event:[]};return"undefined"!=typeof t&&"undefined"!=typeof n&&(e.html=t.html+n.html,e.events=t.events.concat(n.events)),e},_isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)},_transform:function(t,n,e){var i={events:[],html:""};if(json2html._isArray(t))for(var r=t.length,s=0;s<r;++s)i=json2html._append(i,json2html._apply(t[s],n,s,e));else"object"==typeof t&&(i=json2html._append(i,json2html._apply(t,n,void 0,e)));return i},_apply:function(t,n,e,i){var r={events:[],html:""};if(json2html._isArray(n))for(var s=n.length,o=0;o<s;++o)r=json2html._append(r,json2html._apply(t,n[o],e,i));else if("object"==typeof n){var a="<>";if(void 0===n[a]&&(a="tag"),void 0!==n[a]){var l=json2html._getValue(t,n,a,e);r.html+="<"+l;var h,f={events:[],html:""};for(var u in n)switch(u){case"tag":case"<>":break;case"children":case"html":var d=n[u];if(json2html._isArray(d))f=json2html._append(f,json2html._apply(t,d,e,i));else if("function"==typeof d){var c=d.call(t,t,e);switch(typeof c){case"object":void 0!==c.html&&void 0!==c.events&&(f=json2html._append(f,c));break;case"function":case"undefined":break;default:f.html+=c}}else h=json2html._getValue(t,n,u,e);break;default:var v=!1;if(u.length>2&&"on"==u.substring(0,2).toLowerCase()){if(i.events){var m={action:n[u],obj:t,data:i.eventData,index:e},p=json2html._guid();r.events[r.events.length]={id:p,type:u.substring(2),data:m},r.html+=" json2html-event-id-"+u.substring(2)+"='"+p+"'"}v=!0}if(!v){var j=json2html._getValue(t,n,u,e);if(void 0!==j){var _;_="string"==typeof j?'"'+j.replace(/"/g,"&quot;")+'"':j,r.html+=" "+u+"="+_}}}r.html+=">",h&&(r.html+=h),r=json2html._append(r,f),r.html+="</"+l+">"}}return r},_guid:function(){var t=function(){return(65536*(1+Math.random())|0).toString(16).substring(1)};return t()+t()+"-"+t()+t()+"-"+t()+t()},_getValue:function(t,n,e,i){var r="",s=n[e],o=typeof s;if("function"===o)return s.call(t,t,i);if("string"===o){var a=new json2html._tokenizer([/\$\{([^\}\{]+)\}/],function(n,e,i){return e?n.replace(i,function(n,e){for(var i=e.split("."),r=t,s="",o=i.length,a=0;a<o;++a)if(i[a].length>0){var l=r[i[a]];if(r=l,null===r||void 0===r)break}return null!==r&&void 0!==r&&(s=r),s}):n});r=a.parse(s).join("")}else r=s;return r},_tokenizer:function(t,n){return this instanceof json2html._tokenizer?(this.tokenizers=t.splice?t:[t],n&&(this.doBuild=n),this.parse=function(t){this.src=t,this.ended=!1,this.tokens=[];do this.next();while(!this.ended);return this.tokens},this.build=function(t,n){t&&this.tokens.push(this.doBuild?this.doBuild(t,n,this.tkn):t)},this.next=function(){var t,n=this;n.findMin(),t=n.src.slice(0,n.min),n.build(t,!1),n.src=n.src.slice(n.min).replace(n.tkn,function(t){return n.build(t,!0),""}),n.src||(n.ended=!0)},void(this.findMin=function(){var t,n,e=this,i=0;for(e.min=-1,e.tkn="";void 0!==(t=e.tokenizers[i++]);)n=e.src[t.test?"search":"indexOf"](t),n!=-1&&(e.min==-1||n<e.min)&&(e.tkn=t,e.min=n);e.min==-1&&(e.min=e.src.length)})):new json2html._tokenizer(t,n)}};