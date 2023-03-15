﻿var VER_TaChart="2016/01/04 14:25";if(typeof Array.prototype.forEach!="function"){Array.prototype.forEach=function(b){for(var a=0;a<this.length;a++){b.apply(this,[this[a],a,this])}}}if(typeof console=="undefined"){window.console={log:function(){}}}var SYSTEX={Quote:function(d){var e=d.mkt;var i=d.type;var j=d.perd;var h=d.comm?d.comm:"";var b=d.id;var k=d.mem?d.mem:{};var a=k.name?k.name:"";var g={DateReady:false,TimeReady:false};var c=d.ta?d.ta:[];var f=d.tick?d.tick:[];var l;if(k[144]===undefined){g.yyyy="";g.yyy="";g.mm="";g.dd="";g.Y3MD="";g.YMD=""}else{g.DateReady=true;l=k[144].toString();g.yyyy=l.substr(0,4);g.yyy=l.substr(0,4)-1911;g.mm=l.substr(4,2);g.dd=l.substr(6,2);g.Y3MD=g.yyy+"/"+g.mm+"/"+g.dd;g.YMD=g.yyyy+"/"+g.mm+"/"+g.dd}if(k[143]===undefined){g.HH="";g.MM="";g.SS="";g.HH="";g.HHMM=""}else{g.TimeReady=true;l=k[143].toString();if(l.length==5){l="0"+l}g.HH=l.substr(0,2);g.MM=l.substr(2,2);g.SS=l.substr(4,2);g.HHMM=g.HH+":"+g.MM}return{mkt:e,comm:h,id:b,name:a,mem:k,DTTrade:g,ta:c,tick:f,type:i,perd:j}},mergeTick:function(d,c){var a,b={};for(a in d){if(d.hasOwnProperty(a)){b[a]=d[a]}}for(a in c){if(c.hasOwnProperty(a)){b[a]=c[a]}}return b},getDate:function(h){var a=[[0,4],[4,2],[6,2],[8,2],[10,2],[12,2]];var f=h.toString();var e=f.length;var d=[];var g;var b;for(var c=0;c<a.length;c++){if(e<(a[c][0]+a[c][1])){break}g=f.substr(a[c][0],a[c][1]);d.push(c===1?g-1:g)}switch(d.length){case 3:b=new Date(d[0],d[1],d[2]);break;case 4:b=new Date(d[0],d[1],d[2],d[3]);break;case 5:b=new Date(d[0],d[1],d[2],d[3],d[4]);break;case 6:b=new Date(d[0],d[1],d[2],d[3],d[4],d[5]);break;case 7:b=new Date(d[0],d[1],d[2],d[3],d[4],d[5],d[6]);break;default:b=new Date(d[0],d[1],d[2]);break}return b},getDateTime:function(a){return this.getDate(a).getTime()},decimalAdjust:function(a,b,c){if(typeof c==="undefined"||+c===0){return Math[a](b)}b=+b;c=+c;if(isNaN(b)||!(typeof c==="number"&&c%1===0)){return NaN}b=b.toString().split("e");b=Math[a](+(b[0]+"e"+(b[1]?(+b[1]-c):-c)));b=b.toString().split("e");return +(b[0]+"e"+(b[1]?(+b[1]+c):c))},round10:function(a,b){return this.decimalAdjust("round",a,b)},floor10:function(a,b){return this.decimalAdjust("floor",a,b)},ceil10:function(a,b){return this.decimalAdjust("ceil",a,b)},getMaxOfArray:function(a){return Math.max.apply(null,a)}};SYSTEX.getTickPositions=function(l,f,j){var m,c,b,a,d,e,h=[];var k=[0.01,0.02,0.03,0.04,0.05,0.1,0.15,0.2,0.25,0.3,0.4,0.5,0.6,0.7,0.8,1,1.5,2,2.5,3,4,5,6,8,10,12,15,20,25,30,40,50,60,70,75,80,100,120,125,150,200,250,300,400,500,600,700,750,800,1000,2000,5000,10000,20000,50000,100000,200000,500000,1000000,2000000,5000000,10000000,20000000,50000000,100000000,200000000,500000000,1000000000,2000000000,5000000000];for(var g=0;g<k.length;g++){if(f+k[g]*j>=l){b=k[g];a=b*100%100;if(a===0){d=0}else{if(a%10===0){d=1}else{d=2}}m=Math.round(l/b)*b;c=Math.round(f/b)*b;break}}m=this.round10(m,-2);c=this.round10(c,-2);a=c;e=b<=2?b*0.02:b*0.2;h.push(f===0?0:f-e);while(a<=m){if(a<=l&&a>=f){h.push(this.round10(a,-2))}a+=b}h.push(l+e);return{labels:h,scale:d}};var COLOR_UP="#eec099";var COLOR_DOWN="#98ff98";var COLOR_EVEN="#666";var COLOR_VOL="#eec099";var CHAR_UP='<label style="color:'+COLOR_UP+'">▲</label>';var CHAR_DOWN='<label style="color:'+COLOR_DOWN+'">▼</label>';var CHAR_EVEN='<label style="color:'+COLOR_EVEN+'">-</label>';var COLOR_SERIES=["#1947A3","#F56F0A","#3E9152","#eec099"];function TaChart(b,a){var c;if(a=="K"){c=new this.ChartK(b)}else{if(a=="VOL"){c=new this.ChartVol(b)}else{if(a=="KD"){c=new this.ChartKD(b)}else{if(a=="MACD"){c=new this.ChartMACD(b)}else{if(a=="RSI"){c=new this.ChartRSI(b)}else{if(a=="BIAS"){c=new this.ChartBIAS(b)}else{if(a=="WR"){c=new this.ChartWR(b)}else{if(a=="BS"){c=new this.ChartBS(b)}else{if(a=="CDP"){c=new this.ChartCDP(b)}else{if(a=="DMI"){c=new this.ChartDMI(b)}}}}}}}}}}return c}TaChart.prototype.ChartK=function(t){var e=SYSTEX;var a={ZeroCenter:false,tickPositioner:[],reversed:false,mkFormat:false,scale:2};var p;var C;var l;var I=[5,20,60];var z=[];var E={"5":[],"20":[],"60":[]};var f=[];var F=[];var u,B,y,w,n,G,b,h,A,v,K,g,c,s,D,H,J,r,m=t.ta,d=t.perd;if(m===undefined){return false}for(B=0;B<m.length;B++){G=e.getDate(m[B].t);b=G.getTime();z.push({x:b,open:m[B].o,high:m[B].h,low:m[B].l,close:m[B].c});if(B===0){A=m[B].h;v=m[B].l}else{A=Math.max(A,m[B].h);v=Math.min(v,m[B].l)}s=G.getFullYear();D=G.getMonth()+1;D=D<10?"0"+D:D;H=G.getDate();H=H<10?"0"+H:H;if(d=="5m"||d=="10m"||d=="30m"){J=G.getHours();J=J<10?"0"+J:J;r=G.getMinutes();r=r<10?"0"+r:r;h=D+"/"+H+" "+J+":"+r}else{h=s+"/"+D+"/"+H}K=(B===0?0:(m[B].c-m[B-1].c));f.push({Date:h,Vol:m[B].v.toFixed(0),Change:K.toFixed(2),MA5:{val:"-",udchar:""},MA20:{val:"-",udchar:""},MA60:{val:"-",udchar:""}});for(y=0;y<I.length;y++){g=I[y];if(B>g){c=0;for(w=0;w<g;w++){c+=m[B-w].c}E[g].push({x:b,y:c/g});f[B]["MA"+g].val=(c/g).toFixed(2);if(f[B]["MA"+g].val>f[B-1]["MA"+g].val){f[B]["MA"+g].udchar=CHAR_UP}else{if(f[B]["MA"+g].val<f[B-1]["MA"+g].val){f[B]["MA"+g].udchar=CHAR_DOWN}else{f[B]["MA"+g].udchar=CHAR_EVEN}}}}}u=e.getTickPositions(A,v,10);a.tickPositioner=u.labels;a.scale=u.scale;if(m.length>0&&m.length<80){n=e.getDateTime(m[m.length-1].t);for(B=m.length;B<80;B++){n+=24*3600000;F.push({x:n})}}p=[{type:"candlestick",name:"K",data:z,color:COLOR_DOWN,upColor:COLOR_UP,maxPointWidth:10,yAxis:0},{type:"line",name:"K-MA5",data:E[5],yAxis:0,color:COLOR_SERIES[0],enableMouseTracking:false,states:{hover:{enabled:false}}},{type:"line",name:"K-MA20",data:E[20],yAxis:0,color:COLOR_SERIES[1],enableMouseTracking:false,states:{hover:{enabled:false}}},{type:"line",name:"K-MA60",data:E[60],yAxis:0,color:COLOR_SERIES[2],enableMouseTracking:false,states:{hover:{enabled:false}}},{type:"line",data:F,yAxis:0,color:"rgba(0,0,0,0)",enableMouseTracking:false,states:{hover:{enabled:false}}}];C=function(i){var k=e.mergeTick(z[i],f[i]),j;if(k.Vol>=1000000){j=(k.Vol/1000000).toFixed(1)+"M"}else{if(k.Vol>=100000){j=(k.Vol/1000).toFixed(1)+"K"}else{j=k.Vol}}return k.Date+" &nbsp;開:"+k.open+" &nbsp;高:"+k.high+" &nbsp;低:"+k.low+" &nbsp;收:"+k.close+" &nbsp;量:"+j+" &nbsp;漲跌:"+k.Change+'<br/> &nbsp;&nbsp;<label style="color:'+COLOR_SERIES[0]+'">MA5</label> '+k.MA5.val+" "+k.MA5.udchar+' &nbsp;&nbsp;<label style="color:'+COLOR_SERIES[1]+'">MA20</label> '+k.MA20.val+" "+k.MA20.udchar+' &nbsp;&nbsp;<label style="color:'+COLOR_SERIES[2]+'">MA60</label> '+k.MA60.val+" "+k.MA60.udchar};l=function(i){return f[i].Date};return{yAxis:a,series:p,TickTip:C,TickTime:l}};TaChart.prototype.ChartVol=function(m){var d=SYSTEX;var a={tickAmount:5,ZeroCenter:false,tickPositioner:[],reversed:false,mkFormat:true};var l;var u;var w=[5,20];var y=[];var g=[];var v={"5":[],"20":[]};var e=[];var n,t,r,p,s,b,z,x,f,c,h=m.ta;if(h===undefined){return false}for(t=0;t<h.length;t++){b=d.getDateTime(h[t].t);y.push({x:b,y:h[t].v});z=(t===0?0:(h[t].v-h[t-1].v));if(z>0){x=CHAR_UP}else{if(z<0){x=CHAR_DOWN}else{x=CHAR_EVEN}}e.push({Vol:{val:h[t].v,udchar:x},MA5:{val:"-",udchar:""},MA20:{val:"-",udchar:""}});for(r=0;r<w.length;r++){f=w[r];if(t>f){c=0;for(p=0;p<f;p++){c+=h[t-p].v}v[f].push({x:b,y:c/f});e[t]["MA"+f].val=(c/f).toFixed(0);if(e[t]["MA"+f].val>e[t-1]["MA"+f].val){e[t]["MA"+f].udchar=CHAR_UP}else{if(e[t]["MA"+f].val<e[t-1]["MA"+f].val){e[t]["MA"+f].udchar=CHAR_DOWN}else{e[t]["MA"+f].udchar=CHAR_EVEN}}}}if(t===0){g.push(COLOR_EVEN);s=h[t].v}else{s=Math.max(s,h[t].v);if(h[t].c>h[t-1].c){g.push(COLOR_UP)}else{if(h[t].c<h[t-1].c){g.push(COLOR_DOWN)}else{g.push(COLOR_EVEN)}}}}n=d.getTickPositions(s,0,6);a.tickPositioner=n.labels;a.scale=n.scale;l=[{type:"column",name:"Vol",data:y,colors:g,colorByPoint:true,maxPointWidth:10,yAxis:1},{type:"line",name:"Vol-MA5",data:v[5],yAxis:1,color:COLOR_SERIES[0],enableMouseTracking:false,states:{hover:{enabled:false}}},{type:"line",name:"Vol-MA20",data:v[20],yAxis:1,color:COLOR_SERIES[1],enableMouseTracking:false,states:{hover:{enabled:false}}}];u=function(i){return"量 "+e[i].Vol.val+" "+e[i].Vol.udchar+' &nbsp;&nbsp;<label style="color:'+COLOR_SERIES[0]+'">MV5</label> '+e[i].MA5.val+" "+e[i].MA5.udchar+' &nbsp;&nbsp;<label style="color:'+COLOR_SERIES[1]+'">MV20</label> '+e[i].MA20.val+" "+e[i].MA20.udchar};return{yAxis:a,series:l,TickTip:u}};TaChart.prototype.ChartKD=function(n){var c=SYSTEX;var a={tickAmount:5,ZeroCenter:false,tickPositioner:[0,20,50,80,100],reversed:false,mkFormat:false};var k;var u;var g=[];var x=[];var z=[];var s=[];var p=[];var d=[];var b,t,r,v,m,e,o,f=0.5,w=0.5,y=0.5,l=0.5,h=n.ta;if(h===undefined){return false}for(t=0;t<h.length;t++){b=c.getDateTime(h[t].t);d.push({K9:{val:50,txt:"",udchar:""},D9:{val:50,txt:"",udchar:""},J9:{val:50,txt:"",udchar:""},K3D2:{val:50,txt:"",udchar:""},RSV:{val:1,txt:"",udchar:""}});if(t<9){continue}e=h[t].h;o=h[t].l;m=h[t].c;for(r=1;r<9;r++){e=Math.max(e,h[t-r].h);o=Math.min(o,h[t-r].l)}v=(m-o)/(e-o);f=f*2/3+v/3;w=w*2/3+f/3;y=w*3-f*2;l=f*3-w*2;g.push({x:b,y:f*100});x.push({x:b,y:w*100});z.push({x:b,y:y*100});s.push({x:b,y:l*100});p.push({x:b,y:v*100});d[t].K9.val=f*100;d[t].K9.txt=d[t].K9.val.toFixed(2);d[t].D9.val=w*100;d[t].D9.txt=d[t].D9.val.toFixed(2);d[t].J9.val=y*100;d[t].J9.txt=d[t].J9.val.toFixed(2);d[t].K3D2.val=l*100;d[t].K3D2.txt=d[t].K3D2.val.toFixed(2);d[t].RSV.val=v*100;d[t].RSV.txt=d[t].RSV.val.toFixed(2);if(d[t].K9.val>d[t-1].K9.val){d[t].K9.udchar=CHAR_UP}else{if(d[t].K9.val<d[t-1].K9.val){d[t].K9.udchar=CHAR_DOWN}else{d[t].K9.udchar=CHAR_EVEN}}if(d[t].D9.val>d[t-1].D9.val){d[t].D9.udchar=CHAR_UP}else{if(d[t].D9.val<d[t-1].D9.val){d[t].D9.udchar=CHAR_DOWN}else{d[t].D9.udchar=CHAR_EVEN}}if(d[t].J9.val>d[t-1].J9.val){d[t].J9.udchar=CHAR_UP}else{if(d[t].J9.val<d[t-1].J9.val){d[t].J9.udchar=CHAR_DOWN}else{d[t].J9.udchar=CHAR_EVEN}}if(d[t].K3D2.val>d[t-1].K3D2.val){d[t].K3D2.udchar=CHAR_UP}else{if(d[t].K3D2.val<d[t-1].K3D2.val){d[t].K3D2.udchar=CHAR_DOWN}else{d[t].K3D2.udchar=CHAR_EVEN}}if(d[t].RSV.val>d[t-1].RSV.val){d[t].RSV.udchar=CHAR_UP}else{if(d[t].RSV.val<d[t-1].RSV.val){d[t].RSV.udchar=CHAR_DOWN}else{d[t].RSV.udchar=CHAR_EVEN}}}k=[{type:"line",name:"KD-K",data:g,yAxis:1,color:COLOR_SERIES[0]},{type:"line",name:"KD-D",data:x,yAxis:1,color:COLOR_SERIES[1],enableMouseTracking:false,states:{hover:{enabled:false}}},{type:"line",name:"J9",data:z,yAxis:1,color:COLOR_SERIES[2],dashStyle:"dash",enableMouseTracking:false,states:{hover:{enabled:false}}}];u=function(i){var j=d[i];return'<label style="color:'+COLOR_SERIES[0]+'">K9</label> '+j.K9.txt+" "+j.K9.udchar+' &nbsp;&nbsp;<label style="color:'+COLOR_SERIES[1]+'">D9</label> '+j.D9.txt+" "+j.D9.udchar+' &nbsp;&nbsp;<label style="color:'+COLOR_SERIES[2]+'">J9</label> '+j.J9.txt+" "+j.J9.udchar+' &nbsp;&nbsp;<label style="color:'+COLOR_SERIES[3]+'">3K-2D</label> '+j.K3D2.txt+" "+j.K3D2.udchar+" &nbsp;&nbsp;RSV "+j.RSV.txt+" "+j.RSV.udchar};return{yAxis:a,series:k,TickTip:u}};TaChart.prototype.ChartMACD=function(r){var f=SYSTEX;var a={tickAmount:4,ZeroCenter:true,tickPositioner:[],reversed:false,mkFormat:false};var k;var u;var d=[];var j=[];var o=[];var p=[];var g=[];var v,e,m,l,s,b=0,n;var t,c,h=r.ta;if(h===undefined){return false}for(t=0;t<h.length;t++){c=f.getDateTime(h[t].t);g.push({MACD:{val:0,txt:"",udchar:CHAR_EVEN},DIF9:{val:0,txt:"",udchar:CHAR_EVEN},EMA12:{val:0,txt:"-",udchar:CHAR_EVEN},EMA26:{val:0,txt:"-",udchar:CHAR_EVEN}});n=(h[t].c*2+h[t].h+h[t].l)/4;if(t<12){v=0}else{if(t==12){v=b/t}else{v=(g[t-1].EMA12.val*(12-1)+n*2)/(12+1)}}if(t<26){e=0}else{if(t==26){e=b/t}else{e=(g[t-1].EMA26.val*(26-1)+n*2)/(26+1)}}if(t<26){m=0}else{m=v-e}if(t<26+9){l=0}else{l=(g[t-1].MACD.val*(9-1)+m*2)/(9+1)}s=m-l;b+=n;d.push({x:c,y:l});j.push({x:c,y:m});o.push({x:c,y:s});if(s>0){p.push(COLOR_UP)}else{if(s<0){p.push(COLOR_DOWN)}else{p.push(COLOR_EVEN)}}g[t].MACD.val=l;g[t].MACD.txt=l.toFixed(2);g[t].DIF9.val=m;g[t].DIF9.txt=m.toFixed(2);g[t].EMA12.val=v;g[t].EMA12.txt=v.toFixed(2);g[t].EMA26.val=e;g[t].EMA26.txt=e.toFixed(2);if(t===0){continue}if(g[t].MACD.val>g[t-1].MACD.val){g[t].MACD.udchar=CHAR_UP}else{if(g[t].MACD.val<g[t-1].MACD.val){g[t].MACD.udchar=CHAR_DOWN}}if(g[t].DIF9.val>g[t-1].DIF9.val){g[t].DIF9.udchar=CHAR_UP}else{if(g[t].DIF9.val<g[t-1].DIF9.val){g[t].DIF9.udchar=CHAR_DOWN}}if(g[t].EMA12.val>g[t-1].EMA12.val){g[t].EMA12.udchar=CHAR_UP}else{if(g[t].EMA12.val<g[t-1].EMA12.val){g[t].EMA12.udchar=CHAR_DOWN}}if(g[t].EMA26.val>g[t-1].EMA26.val){g[t].EMA26.udchar=CHAR_UP}else{if(g[t].EMA26.val<g[t-1].EMA26.val){g[t].EMA26.udchar=CHAR_DOWN}}}k=[{type:"line",name:"MACD-MACD",data:d,yAxis:1,color:COLOR_SERIES[0]},{type:"line",name:"MACD-DIF9",data:j,yAxis:1,color:COLOR_SERIES[1],enableMouseTracking:false,states:{hover:{enabled:false}}},{type:"column",name:"MACD-DM",data:o,yAxis:1,colorByPoint:true,colors:p,lineWidth:0,enableMouseTracking:false,states:{hover:{enabled:false}}}];u=function(i){var q=g[i];return'<label style="color:'+COLOR_SERIES[0]+'">MACD</label> '+q.MACD.txt+" "+q.MACD.udchar+' &nbsp;&nbsp;<label style="color:'+COLOR_SERIES[1]+'">DIF9</label> '+q.DIF9.txt+" "+q.DIF9.udchar+" &nbsp;&nbsp;EMA12 "+q.EMA12.txt+" "+q.EMA12.udchar+" &nbsp;&nbsp;EMA26 "+q.EMA26.txt+" "+q.EMA26.udchar};return{yAxis:a,series:k,TickTip:u}};TaChart.prototype.ChartRSI=function(t){var g=SYSTEX;var a={tickAmount:6,ZeroCenter:false,tickPositioner:[0,20,50,80,100],reversed:false,mkFormat:false};var o;var z;var c=[];var m=[];var k=[];var G,E,p=[],v=[],D,d,l,s,h,x,r,C,u,f,B,e,A,F;var y,w,b,n=t.ta;if(n===undefined){return false}G=n.length;for(y=0;y<G;y++){k.push({RSI5:{val:0,txt:"",udchar:CHAR_EVEN},RSI10:{val:0,txt:"",udchar:CHAR_EVEN}});E=y===0?0:n[y].c-n[y-1].c;if(E>0){p.push(E);v.push(0)}else{p.push(0);v.push(-E)}}for(y=0;y<G;y++){b=g.getDateTime(n[y].t);if(y==5){D=0;d=0;for(w=0;w<5;w++){D+=p[w];d+=v[w]}l=D/5;s=d/5;r=l/s;C=100-100/(1+r)}else{if(y>5){l=p[y]*0.2+h*0.8;s=v[y]*0.2+x*0.8;r=l/s;C=100-100/(1+r)}}if(y==10){D=0;d=0;for(w=0;w<10;w++){D+=p[w];d+=v[w]}u=D/10;f=d/10;A=u/f;F=100-100/(1+A)}else{if(y>10){u=p[y]*0.1+B*0.9;f=v[y]*0.1+e*0.9;A=u/f;F=100-100/(1+A)}}h=l;x=s;B=u;e=f;if(y>=5){c.push({x:b,y:C});k[y].RSI5.val=C;k[y].RSI5.txt=C.toFixed(2);if(k[y].RSI5.val>k[y-1].RSI5.val){k[y].RSI5.udchar=CHAR_UP}else{if(k[y].RSI5.val<k[y-1].RSI5.val){k[y].RSI5.udchar=CHAR_DOWN}}}if(y>=10){m.push({x:b,y:F});k[y].RSI10.val=F;k[y].RSI10.txt=F.toFixed(2);if(k[y].RSI10.val>k[y-1].RSI10.val){k[y].RSI10.udchar=CHAR_UP}else{if(k[y].RSI10.val<k[y-1].RSI10.val){k[y].RSI10.udchar=CHAR_DOWN}}}}o=[{type:"line",name:"RSI-RSI5",data:c,yAxis:1,color:COLOR_SERIES[0]},{type:"line",name:"RSI-RSI10",data:m,yAxis:1,color:COLOR_SERIES[1],enableMouseTracking:false,states:{hover:{enabled:false}}}];z=function(i){var j=k[i];return'<label style="color:'+COLOR_SERIES[0]+'">RSI5</label> '+j.RSI5.txt+" "+j.RSI5.udchar+' &nbsp;&nbsp;<label style="color:'+COLOR_SERIES[1]+'">RSI10</label> '+j.RSI10.txt+" "+j.RSI10.udchar};return{yAxis:a,series:o,TickTip:z}};TaChart.prototype.ChartBIAS=function(n){var e=SYSTEX;var a={tickAmount:0,ZeroCenter:true,tickPositioner:[],reversed:false,mkFormat:false};var l;var u;var k=[];var t=[];var o=[];var g=[];var f=[];var v,d,p,b,m;var s,r,c,h=n.ta;if(h===undefined){return false}v=h.length;for(s=0;s<v;s++){c=e.getDateTime(h[s].t);f.push({BIAS10:{val:0,txt:"",udchar:CHAR_EVEN},BIAS20:{val:0,txt:"",udchar:CHAR_EVEN},BIAS1020:{val:0,txt:"",udchar:CHAR_EVEN}});if(s>10){d=0;for(r=0;r<10;r++){d+=h[s-r].c}p=(h[s].c/(d/10)-1)*100;k.push({x:c,y:p});f[s].BIAS10.val=p;f[s].BIAS10.txt=p.toFixed(2);if(f[s].BIAS10.val>f[s-1].BIAS10.val){f[s].BIAS10.udchar=CHAR_UP}else{if(f[s].BIAS10.val<f[s-1].BIAS10.val){f[s].BIAS10.udchar=CHAR_DOWN}}}if(s>20){d=0;for(r=0;r<20;r++){d+=h[s-r].c}b=(h[s].c/(d/20)-1)*100;m=p-b;t.push({x:c,y:b});o.push({x:c,y:m});if(m>0){g.push(COLOR_UP)}else{if(m<0){g.push(COLOR_DOWN)}else{g.push(COLOR_EVEN)}}f[s].BIAS20.val=b;f[s].BIAS20.txt=b.toFixed(2);if(f[s].BIAS20.val>f[s-1].BIAS20.val){f[s].BIAS20.udchar=CHAR_UP}else{if(f[s].BIAS20.val<f[s-1].BIAS20.val){f[s].BIAS20.udchar=CHAR_DOWN}}f[s].BIAS1020.val=m;f[s].BIAS1020.txt=m.toFixed(2);if(f[s].BIAS1020.val>f[s-1].BIAS1020.val){f[s].BIAS1020.udchar=CHAR_UP}else{if(f[s].BIAS1020.val<f[s-1].BIAS1020.val){f[s].BIAS1020.udchar=CHAR_DOWN}}}}l=[{type:"line",name:"BIAS-BIAS10",data:k,yAxis:1,color:COLOR_SERIES[0]},{type:"line",name:"BIAS-BIAS20",data:t,yAxis:1,color:COLOR_SERIES[1],enableMouseTracking:false,states:{hover:{enabled:false}}},{type:"column",name:"B10-B20",data:o,yAxis:1,colorByPoint:true,colors:g,lineWidth:0,enableMouseTracking:false,states:{hover:{enabled:false}}}];u=function(i){var j=f[i];return'<label style="color:'+COLOR_SERIES[0]+'">BIAS10</label> '+j.BIAS10.txt+" "+j.BIAS10.udchar+' &nbsp;&nbsp;<label style="color:'+COLOR_SERIES[1]+'">BIAS20</label> '+j.BIAS20.txt+" "+j.BIAS20.udchar+' &nbsp;&nbsp;<label style="color:'+COLOR_SERIES[2]+'">B10-B20</label> '+j.BIAS1020.txt+" "+j.BIAS1020.udchar};return{yAxis:a,series:l,TickTip:u}};TaChart.prototype.ChartWR=function(b){var k=SYSTEX;var c={tickAmount:0,ZeroCenter:false,tickPositioner:[0,20,50,80,100],reversed:true,mkFormat:false};var n;var g;var p=[];var e=[];var s,d,o,a,f,m,h,r,l=b.ta;if(l===undefined){return false}d=l.length;for(m=0;m<d;m++){r=k.getDateTime(l[m].t);e.push({WR9:{val:0,txt:"",udchar:CHAR_EVEN}});if(m>=9){o=l[m].h;a=l[m].l;f=l[m].c;for(h=1;h<9;h++){o=Math.max(o,l[m-h].h);a=Math.min(a,l[m-h].l)}s=(o-f)/(o-a)*100;p.push({x:r,y:s});e[m].WR9.val=s;e[m].WR9.txt=s.toFixed(2);if(e[m].WR9.val>e[m-1].WR9.val){e[m].WR9.udchar=CHAR_UP}else{if(e[m].WR9.val<e[m-1].WR9.val){e[m].WR9.udchar=CHAR_DOWN}}}}n=[{type:"line",name:"WR-WR9",data:p,yAxis:1,color:COLOR_SERIES[0]}];g=function(i){var j=e[i];return'<label style="color:'+COLOR_SERIES[0]+'">W%R9</label> '+j.WR9.txt+" "+j.WR9.udchar};return{yAxis:c,series:n,TickTip:g}};TaChart.prototype.ChartBS=function(p){var g=SYSTEX;var a={tickAmount:0,ZeroCenter:true,tickPositioner:[],reversed:false,mkFormat:false};var o;var w;var r=[];var d=[];var h=[];var x=[3,6,9,12];var b={"3":0,"6":0,"9":0,"12":0};var y,v,u,t,c,n=p.ta;var l,f,e,s,m;if(n===undefined){return false}y=n.length;for(v=0;v<y;v++){c=g.getDateTime(n[v].t);h.push({M3:{val:0,txt:"",udchar:CHAR_EVEN},BS:{val:0,txt:"",udchar:CHAR_EVEN},M3BS:{val:0,txt:"",udchar:CHAR_EVEN}});if(v>=12){for(t=0;t<x.length;t++){l=x[t];f=0;for(u=0;u<l;u++){f+=n[v-u].c}b[l]=f/l}e=b[3];s=(b[3]+b[6]+b[9]+b[12])/4;m=e-s;r.push({x:c,y:m});if(m>0){d.push(COLOR_UP)}else{if(m<0){d.push(COLOR_DOWN)}else{d.push(COLOR_EVEN)}}h[v].M3.val=e;h[v].M3.txt=e.toFixed(2);if(h[v].M3.val>h[v-1].M3.val){h[v].M3.udchar=CHAR_UP}else{if(h[v].M3.val<h[v-1].M3.val){h[v].M3.udchar=CHAR_DOWN}}h[v].BS.val=s;h[v].BS.txt=s.toFixed(2);if(h[v].BS.val>h[v-1].BS.val){h[v].BS.udchar=CHAR_UP}else{if(h[v].BS.val<h[v-1].BS.val){h[v].BS.udchar=CHAR_DOWN}}h[v].M3BS.val=m;h[v].M3BS.txt=m.toFixed(2);if(h[v].M3BS.val>h[v-1].M3BS.val){h[v].M3BS.udchar=CHAR_UP}else{if(h[v].M3BS.val<h[v-1].M3BS.val){h[v].M3BS.udchar=CHAR_DOWN}}}}o=[{type:"column",name:"BS-M3BS",data:r,yAxis:1,colorByPoint:true,colors:d,lineWidth:0}];w=function(i){var j=h[i];return'<label style="color:'+COLOR_SERIES[0]+'">M3</label> '+j.M3.txt+" "+j.M3.udchar+' &nbsp;&nbsp;<label style="color:'+COLOR_SERIES[1]+'">BS</label> '+j.BS.txt+" "+j.BS.udchar+' &nbsp;&nbsp;<label style="color:'+COLOR_SERIES[1]+'">M3-BS</label> '+j.M3BS.txt+" "+j.M3BS.udchar};return{yAxis:a,series:o,TickTip:w}};TaChart.prototype.ChartCDP=function(x){var d=SYSTEX;var b={tickAmount:3,ZeroCenter:false,tickPositioner:[],reversed:false,mkFormat:false,scale:2};var p;var H;var F=[];var l=[];var w=[];var t=[];var g=[];var z,L,G,E,c,m=x.ta,s,v,a,K,r,I,D,y,n,u,C,f,B;var A=[0.1,0.2,0.5,1,2,5,10,20,25,50,100,200,250,500,1000];var k;var e=0;var h,J;if(m===undefined){return false}L=m.length;for(G=0;G<L;G++){c=d.getDateTime(m[G].t);g.push({CDP:{val:0,txt:"",udchar:CHAR_EVEN},AH:{val:0,txt:"",udchar:CHAR_EVEN},NH:{val:0,txt:"",udchar:CHAR_EVEN},NL:{val:0,txt:"",udchar:CHAR_EVEN},AL:{val:0,txt:"",udchar:CHAR_EVEN}});I=m[G].c;D=m[G].h;y=m[G].l;n=D-y;s=(2*I+D+y)/4;v=s+n;a=s+(s-y);K=s+(s-D);r=s-n;C=C===undefined?v:Math.max(C,v);f=f===undefined?r:Math.min(f,r);F.push({x:c,open:m[G].o,high:m[G].h,low:m[G].l,close:m[G].c});l.push({x:c,y:s});w.push({x:c,y:v});t.push({x:c,y:r});u={CDP:s,AH:v,NH:a,NL:K,AL:r};for(B in g[G]){if(!g[G].hasOwnProperty(B)){continue}g[G][B].val=u[B];g[G][B].txt=u[B].toFixed(2);if(G===0){g[G][B].udchar=CHAR_EVEN}else{if(g[G][B].val>g[G-1][B].val){g[G][B].udchar=CHAR_UP}else{if(g[G][B].val<g[G-1][B].val){g[G][B].udchar=CHAR_DOWN}}}}}for(G=0;G<A.length;G++){if(k!==undefined){break}for(E=3;E<6;E++){if(f+A[G]*E>=C){k=A[G];e=E;break}}}J=Math.ceil(C/k)*k;h=Math.floor(f/k)*k;for(G=0;G<=e;G++){b.tickPositioner.push(h+G*k)}z=d.getTickPositions(C,f,4);b.tickPositioner=z.labels;b.scale=z.scale;p=[{type:"candlestick",name:"CDP-K",data:F,color:COLOR_DOWN,upColor:COLOR_UP,maxPointWidth:10,yAxis:1},{type:"line",name:"CDP-CDP",data:l,yAxis:1,color:COLOR_SERIES[0],enableMouseTracking:false,states:{hover:{enabled:false}}},{type:"line",name:"CDP-AH",data:w,yAxis:1,color:COLOR_SERIES[1],enableMouseTracking:false,states:{hover:{enabled:false}}},{type:"line",name:"CDP-AL",data:t,yAxis:1,color:COLOR_SERIES[2],enableMouseTracking:false,states:{hover:{enabled:false}}}];H=function(i){var j=g[i];return'<label style="color:'+COLOR_SERIES[0]+'">CDP</label> '+j.CDP.txt+" "+j.CDP.udchar+' &nbsp;&nbsp;<label style="color:'+COLOR_SERIES[1]+'">AH</label> '+j.AH.txt+" "+j.AH.udchar+" &nbsp;&nbsp;NH "+j.NH.txt+" "+j.NH.udchar+" &nbsp;&nbsp;NL "+j.NL.txt+" "+j.NL.udchar+' &nbsp;&nbsp;<label style="color:'+COLOR_SERIES[2]+'">AL</label> '+j.AL.txt+" "+j.AL.udchar};return{yAxis:b,series:p,TickTip:H}};TaChart.prototype.ChartDMI=function(k){var c=SYSTEX;var b={tickAmount:3,ZeroCenter:false,tickPositioner:[],reversed:false,mkFormat:false};var f;var t;var m=[];var p=[];var z=[];var u=[];var d=[];var A,s,r,e=k.ta;var l,h,n,o,g,y,w;var v=0;var x=2/(14+1);if(e===undefined){return false}A=e.length;for(s=0;s<A;s++){e[s].datetime=c.getDateTime(e[s].t);d.push({DIP:{val:0,txt:"",udchar:CHAR_EVEN},DIN:{val:0,txt:"",udchar:CHAR_EVEN},ADXI:{val:0,txt:"",udchar:CHAR_EVEN},ADXR:{val:0,txt:"",udchar:CHAR_EVEN}});if(s===0){continue}l=e[s].h>e[s-1].h?e[s].h-e[s-1].h:0;h=e[s].l<e[s-1].l?e[s-1].l-e[s].l:0;e[s].DMP=l>h?l:0;e[s].DMN=h>l?h:0;e[s].TR=Math.max((e[s].h-e[s-1].c),(e[s].l-e[s-1].c),(e[s].h-e[s].l))}for(s=14;s<A;s++){if(s==14){n=0;o=0;g=0;for(r=1;r<=14;r++){n+=e[r].DMP;o+=e[r].DMN;g+=e[r].TR}e[14].maDMP=n/14;e[14].maDMN=o/14;e[14].maTR=g/14}else{e[s].maDMP=x*e[s].DMP+(1-x)*e[s-1].maDMP;e[s].maDMN=x*e[s].DMN+(1-x)*e[s-1].maDMN;e[s].maTR=x*e[s].TR+(1-x)*e[s-1].maTR}e[s].DIP=e[s].maDMP/e[s].maTR*100;e[s].DIN=e[s].maDMN/e[s].maTR*100;e[s].DX=Math.abs(e[s].DIP-e[s].DIN)/(e[s].DIP+e[s].DIN)*100;m.push({x:e[s].datetime,y:e[s].DIP});p.push({x:e[s].datetime,y:e[s].DIN});v=Math.max(v,e[s].DIP);v=Math.max(v,e[s].DIN);d[s].DIP.val=e[s].DIP;d[s].DIP.txt=e[s].DIP.toFixed(2);if(d[s].DIP.val>d[s-1].DIP.val){d[s].DIP.udchar=CHAR_UP}else{if(d[s].DIP.val<d[s-1].DIP.val){d[s].DIP.udchar=CHAR_DOWN}}d[s].DIN.val=e[s].DIN;d[s].DIN.txt=e[s].DIN.toFixed(2);if(d[s].DIN.val>d[s-1].DIN.val){d[s].DIN.udchar=CHAR_UP}else{if(d[s].DIN.val<d[s-1].DIN.val){d[s].DIN.udchar=CHAR_DOWN}}}for(s=27;s<A;s++){if(s==27){y=0;for(r=14;r<=27;r++){y+=e[r].DX}e[27].ADXI=y/14}else{e[s].ADXI=x*e[s].DX+(1-x)*e[s-1].ADXI}z.push({x:e[s].datetime,y:e[s].ADXI});v=Math.max(v,e[s].ADXI);d[s].ADXI.val=e[s].ADXI;d[s].ADXI.txt=e[s].ADXI.toFixed(2);if(d[s].ADXI.val>d[s-1].ADXI.val){d[s].ADXI.udchar=CHAR_UP}else{if(d[s].ADXI.val<d[s-1].ADXI.val){d[s].ADXI.udchar=CHAR_DOWN}}}for(s=42;s<A;s++){if(s==42){w=0;for(r=27;r<=42;r++){w+=e[r].ADXI}e[42].ADXR=w/14}else{e[s].ADXR=x*e[s].ADXI+(1-x)*e[s-1].ADXR}u.push({x:e[s].datetime,y:e[s].ADXR});v=Math.max(v,e[s].ADXR);d[s].ADXR.val=e[s].ADXR;d[s].ADXR.txt=e[s].ADXR.toFixed(2);if(d[s].ADXR.val>d[s-1].ADXR.val){d[s].ADXR.udchar=CHAR_UP}else{if(d[s].ADXR.val<d[s-1].ADXR.val){d[s].ADXR.udchar=CHAR_DOWN}}}if(v>=80){b.tickPositioner=[0,20,40,60,80,100]}else{if(v>=60){b.tickPositioner=[0,20,40,60,80]}else{b.tickPositioner=[0,10,20,30,40,50,60]}}f=[{type:"line",name:"DMI-DIP",data:m,yAxis:1,color:COLOR_SERIES[0]},{type:"line",name:"DMI-DIN",data:p,yAxis:1,color:COLOR_SERIES[1],enableMouseTracking:false,states:{hover:{enabled:false}}},{type:"line",name:"DMI-ADXI",data:z,yAxis:1,color:COLOR_SERIES[2],enableMouseTracking:false,states:{hover:{enabled:false}}},{type:"line",name:"DMI-ADXR",data:u,yAxis:1,color:COLOR_SERIES[3],enableMouseTracking:false,states:{hover:{enabled:false}}}];t=function(a){var i=d[a];return'<label style="color:'+COLOR_SERIES[0]+'">+DI</label> '+i.DIP.txt+" "+i.DIP.udchar+' &nbsp;&nbsp;<label style="color:'+COLOR_SERIES[1]+'">-DI</label> '+i.DIN.txt+" "+i.DIN.udchar+' &nbsp;&nbsp;<label style="color:'+COLOR_SERIES[2]+'">ADXI</label> '+i.ADXI.txt+" "+i.ADXI.udchar+' &nbsp;&nbsp;<label style="color:'+COLOR_SERIES[3]+'">ADXR</label> '+i.ADXR.txt+" "+i.ADXR.udchar};return{yAxis:b,series:f,TickTip:t}};var chart;(function(){$("head").append('<style>.tafont{font-family: "Noto Sans CJK TC", "Microsoft JhengHei", Arial;text-shadow: #DDD 0.01em 0.01em 0.01em;}</style>');var b=$('<div style="position:relative;width:540px;height:430px;" class="tafont">');$('script[src*="TaChart-min.js"]').after(b);var c=$('<select id="TAChartPeriod" class="tafont" />');$("<option />",{value:"5m",text:"5分線"}).appendTo(c);$("<option />",{value:"10m",text:"10分線"}).appendTo(c);$("<option />",{value:"30m",text:"30分線"}).appendTo(c);$("<option />",{value:"d",text:"日線"}).appendTo(c);$("<option />",{value:"w",text:"週線",selected:"true"}).appendTo(c);$("<option />",{value:"m",text:"月線"}).appendTo(c);b.append(c);var a=$('<select id="TAChartIndex" class="tafont" />');$("<option />",{value:"VOL",text:"成交量"}).appendTo(a);$("<option />",{value:"KD",text:"KD,J"}).appendTo(a);$("<option />",{value:"MACD",text:"MACD"}).appendTo(a);$("<option />",{value:"RSI",text:"RSI"}).appendTo(a);$("<option />",{value:"BIAS",text:"乖離率"}).appendTo(a);$("<option />",{value:"WR",text:"威廉指標"}).appendTo(a);$("<option />",{value:"BS",text:"多空指標乖離"}).appendTo(a);$("<option />",{value:"CDP",text:"CDP"}).appendTo(a);$("<option />",{value:"DMI",text:"動向指標DMI"}).appendTo(a);b.append(a);var d=$('<div style="position:relative;">');b.append($('<label id="TaChartTitle" style="font-size:10pt;right:0px;position:absolute;"/>'));b.append($('<div id="TAChartLabel1" style="font-size:10pt;"></div>'));d.append($('<div id="TaChart" style="margin:0px;padding:0px;border:0px;outline:0px;width:540px;height:360px;position:relative;"></div>'));d.append($('<div id="TAChartLabel2" style="position:absolute;top:250px;left:10px;z-index:4;font-size:10pt"></div>'));b.append(d)})();document.onreadystatechange=function(){if(document.readyState=="complete"){var a=$("script[symbol]").attr("symbol");var b=$("script[market]").attr("market");if(b=="TW-STOCK"){b="10"}else{if(b=="TW-FUTURE"){b="01"}else{if(b=="TW-OPTION"){b="6D"}}}chart=new ChartContainer(b,a);chart.paint();$("select[id^=TAChart]").change(function(){chart.paint()})}};function ChartContainer(b,a){this.market=b;this.symbol=a}ChartContainer.prototype.paint=function(){var b=$("#TAChartPeriod").val();var l=$("#TAChartIndex").val();var c=chart.market=="10"?"https://tw.quote.finance.yahoo.net/quote/q?type=ta&perd="+b+"&mkt="+chart.market+"&sym="+encodeURIComponent(chart.symbol)+"&v=1":"https://tw.screener.finance.yahoo.net/future/q?type=ta&perd="+b+"&mkt="+chart.market+"&sym="+encodeURIComponent(chart.symbol);var a,e,d,i,m,k,h;var j;var g=[];var f=SYSTEX;if(b=="5m"){j=3600000}else{if(b=="10m"){j=3600000}else{if(b=="30m"){j=24*3600000}else{if(b=="d"){j=30*24*3600000}else{if(b=="w"){j=3*30*24*3600000}else{if(b=="m"){j=12*30*24*3600000}}}}}}$.getJSON(c+"&callback=?",function(o){a=f.Quote(o);if(a.ta.length<=0){i=Highcharts.charts;for(var n=0;n<i.length;n++){if(i[n]!==undefined&&i[n]!==null){m=i[n].destroy()}}$("#TaChartTitle").html("");$("#TAChartLabel1").html("");$("#TAChartLabel2").html("");$("#TaChart").html('<div style="text-align:center;width:100%;height:100%;border:1px gray solid">No Data</div>');return}e=new TaChart(a,"K");d=new TaChart(a,l);g=$.merge(e.series,d.series);$("#TAChartLabel1").html(e.TickTip(a.ta.length-1));$("#TAChartLabel2").html(d.TickTip(a.ta.length-1));Highcharts.Tooltip.prototype.hide=(function(){return function(p){var q=this;p=500;if(!this.isHidden){this.hideTimer=function(){q.label[p?"fadeOut":"hide"]();q.isHidden=true}.call(0,this)}q.chart.yAxis[0].removePlotLine("yAxis1-PlotLine");q.chart.yAxis[1].removePlotLine("yAxis2-PlotLine");if(k){try{k.destroy()}catch(r){}}if(h){try{h.destroy()}catch(r){}}}})();Highcharts.setOptions({global:{useUTC:false},chart:{style:{fontFamily:'"Noto Sans CJK TC", "Microsoft JhengHei", Arial',"text-shadow":"#DDD 0.01em 0.01em 0.01em"}}});$("#TaChartTitle").html(a.name+"("+a.id+") &nbsp;&nbsp;最後日期: "+a.DTTrade.YMD);$("#TaChart").highcharts("StockChart",{tooltip:{useHTML:true,shadow:false,animation:false,backgroundColor:"rgba(56, 114, 181, 1)",borderWidth:0,style:{color:"#FFF",cursor:"default",fontSize:"12px",fontWeight:"normal","text-shadow":"none",padding:"2px",pointerEvents:"none",whiteSpace:"nowrap"},shared:true,crosshairs:[{width:1,color:"gray"},{width:0,color:"gray"}],positioner:function(q,s,p){var r=this.chart.yAxis[0].plotLinesAndBands[0].svgElem.d.split(" ")[5];return{x:p.plotX<470?510:0,y:r?r:p.plotY}},formatter:function(){var A=this.points[0];var z=this.points[1];var y=A.point.index;var q,w,s,x,u;var t,v=510,p;for(q=0;q<Highcharts.charts.length;q++){if(Highcharts.charts[q]!==undefined&&Highcharts.charts[q]!==null){s=Highcharts.charts[q]}}x=s.yAxis[0];u=s.yAxis[1];if(A===undefined||z===undefined){if(k){try{k.destroy()}catch(r){}}if(h){try{h.destroy()}catch(r){}}return false}x.removePlotLine("yAxis1-PlotLine");x.addPlotLine({id:"yAxis1-PlotLine",value:A.point.close,color:"gray",width:1,zIndex:8});u.removePlotLine("yAxis2-PlotLine");u.addPlotLine({id:"yAxis2-PlotLine",value:z.y,color:"gray",width:1,zIndex:8});if(k){try{k.destroy()}catch(r){}}t=z.point.plotX;if(t){t-=36;t=Math.max(t,0);t=Math.min(t,450);v=z.point.plotX<470?510:0;w=e.TickTime(y);k=s.renderer.label(w,t,335).css({color:"white"}).attr({fill:"rgba(56, 114, 181, 1)","font-size":"12px",align:"left",padding:2,zIndex:9}).add()}if(h){try{h.destroy()}catch(r){}}try{p=u.plotLinesAndBands[0].svgElem.d.split(" ")[5]}catch(r){}if(p){w=(Math.abs(z.y)*100%1)>0?z.y.toFixed(2):z.y;h=s.renderer.label(w,v,p).css({color:"white"}).attr({fill:"rgba(56, 114, 181, 1)","font-size":"12px",align:"left",padding:2,zIndex:9}).add()}$("#TAChartLabel1").html(e.TickTip(y));$("#TAChartLabel2").html(d.TickTip(y));return A.point.close}},yAxis:[{labels:{align:"right",x:30,y:4,formatter:function(){return(this.isFirst||this.isLast)?"":this.value.toFixed(e.yAxis.scale)}},height:"75%",lineWidth:1,gridLineColor:"#DDD",gridLineDashStyle:"dash",gridLineWidth:1,tickPositions:e.yAxis.tickPositioner},{labels:{align:"right",x:30,y:4,style:{color:COLOR_VOL,fontWeight:"normal"},formatter:function(){if(this.isFirst||this.isLast){return""}var q=this.value;if(d.yAxis.mkFormat===true){var p=this.axis.tickPositions;var r=p[p.length-1];if(q===0){return 0}else{if(r<=10000){return q.toFixed(d.yAxis.scale)}else{if(r<=1000000){return(q/1000).toFixed(0)+"K"}else{if(r<=2000000){return(q/1000000).toFixed(1)+"M"}else{return(q/1000000).toFixed(0)+"M"}}}}}else{return q.toFixed(d.yAxis.scale)}}},gridLineColor:"#DDD",tickAmount:d.yAxis.tickAmount,tickPixelInterval:30,top:"80%",height:"20%",offset:0,lineWidth:1,gridLineDashStyle:"dash",gridLineWidth:1,showLastLabel:true,reversed:d.yAxis.reversed,tickPositioner:function(q,p){if(d.yAxis.tickPositioner.length>0){return d.yAxis.tickPositioner}else{if(d.yAxis.ZeroCenter){p=Math.max(Math.abs(this.dataMax),Math.abs(this.dataMin));var r=f.getTickPositions(p,-p,6);d.yAxis.scale=r.scale;return r.labels}else{return false}}}}],xAxis:[{type:"datetime",minTickInterval:j,tickPixelInterval:30,gridLineColor:"#DDD",gridLineDashStyle:"dash",gridLineWidth:1,labels:{formatter:function(){var r=Highcharts.dateFormat("%Y%m%d%H",this.value);var t=r.substr(0,4);var s=r.substr(4,2);var p=r.substr(6,2);var q=r.substr(8,2);if(b=="m"){return t}else{if(b=="d"||b=="w"){return(this.isFirst||s=="01")?t+"/"+s:s}else{if(b=="30m"){return s+"/"+p}else{if(b=="5m"||b=="10m"){return(this.isFirst||q=="09")?q+"<br />"+s+"/"+p:q}}}}},step:1}}],series:g,plotOptions:{line:{lineWidth:1,marker:{enabled:false,states:{hover:{enabled:false}}}},candlestick:{lineColor:COLOR_EVEN,upLineColor:COLOR_EVEN,upColor:COLOR_UP},series:{dataGrouping:{groupPixelWidth:2},animation:false,states:{hover:{enabled:false}}}},chart:{inverted:false,margin:[0,40,26,0],width:560,height:360},exporting:{enabled:false},legend:{enabled:false},rangeSelector:{enabled:false},scrollbar:{enabled:false},navigator:{enabled:false},credits:{position:{align:"right",y:-112,x:-40,verticalAlign:"bottom"},style:{cursor:"pointer",color:"#909090",fontSize:"9px"},text:"",href:"https://tw.stock.yahoo.com/"}},function(p){p.renderer.rect(0.5,0.5,520,251,0).attr({"stroke-width":1,stroke:"gray",fill:"rgba(255, 255, 255, 0)",zIndex:3}).add();p.renderer.rect(0.5,266.5,520,68,0).attr({"stroke-width":1,stroke:"gray",fill:"rgba(255, 255, 255, 0)",zIndex:3}).add()})})};