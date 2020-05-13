
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = {"pages":["pages/login/login","pages/index/index","pages/submit/index","pages/details/index","pages/finish/index","pages/cart/index","pages/menu/index","pages/mine/index","pages/order/index","pages/mine/personal/list","pages/mine/personal/change-name","pages/mine/address/list","pages/mine/address/add","pages/mine/address/edit","pages/mine/wallet/index","pages/mine/coupon/index","pages/mine/cash/index","pages/mine/invoice/index","pages/mine/invoice/open","pages/mine/invoice/explain","pages/mine/invoice/open-info","pages/mine/invoice/record","pages/mine/invoice/title","pages/mine/invoice/title-add","pages/mine/feedback/list","pages/mine/feedback/feedback","pages/mine/feedback/about","pages/mine/feedback/details","pages/mine/message","pages/home/presented","pages/login/login"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"","navigationBarBackgroundColor":"#fff","backgroundColor":"#fff"},"tabBar":{"color":"#8a8396","selectedColor":"#2a4c7e","borderStyle":"black","backgroundColor":"#fff","list":[{"pagePath":"pages/home/index","iconPath":"static/home.png","selectedIconPath":"static/home-active.png","text":"首页"},{"pagePath":"pages/menu/index","iconPath":"static/menu.png","selectedIconPath":"static/menu-active.png","text":"菜单"},{"pagePath":"pages/order/index","iconPath":"static/order.png","selectedIconPath":"static/order-active.png","text":"订单"},{"pagePath":"pages/cart/index","iconPath":"static/cart.png","selectedIconPath":"static/cart-active.png","text":"购物车"},{"pagePath":"pages/mine/index","iconPath":"static/mine.png","selectedIconPath":"static/mine-active.png","text":"我的"}]},"renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"纳特客服通","compilerVersion":"2.6.16","entryPagePath":"pages/login/login","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/login/login","meta":{"isQuit":true},"window":{"navigationBarTitleText":""}},{"path":"/pages/index/index","meta":{},"window":{"titleNView":false}},{"path":"/pages/submit/index","meta":{},"window":{"titleNView":false}},{"path":"/pages/details/index","meta":{},"window":{"titleNView":false}},{"path":"/pages/finish/index","meta":{},"window":{"titleNView":false}},{"path":"/pages/cart/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"购物车"}},{"path":"/pages/menu/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"选择咖啡与小食"}},{"path":"/pages/mine/index","meta":{"isQuit":true,"isTabBar":true},"window":{"titleNView":false}},{"path":"/pages/order/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"订单列表"}},{"path":"/pages/mine/personal/list","meta":{},"window":{"navigationBarTitleText":"个人资料"}},{"path":"/pages/mine/personal/change-name","meta":{},"window":{"navigationBarTitleText":"用户名"}},{"path":"/pages/mine/address/list","meta":{},"window":{"navigationBarTitleText":"我的地址"}},{"path":"/pages/mine/address/add","meta":{},"window":{"navigationBarTitleText":"添加地址"}},{"path":"/pages/mine/address/edit","meta":{},"window":{"navigationBarTitleText":"修改地址","titleNView":{"buttons":[{"text":"","fontSrc":"/static/uni.ttf"}]}}},{"path":"/pages/mine/wallet/index","meta":{},"window":{"navigationBarTitleText":"咖啡钱包"}},{"path":"/pages/mine/coupon/index","meta":{},"window":{"navigationBarTitleText":"可用咖啡券"}},{"path":"/pages/mine/cash/index","meta":{},"window":{"navigationBarTitleText":"兑换优惠"}},{"path":"/pages/mine/invoice/index","meta":{},"window":{"navigationBarTitleText":"发票管理"}},{"path":"/pages/mine/invoice/open","meta":{},"window":{"navigationBarTitleText":"开具发票","titleNView":{"buttons":[{"text":"说明","fontSize":"28upx"}]}}},{"path":"/pages/mine/invoice/explain","meta":{},"window":{"navigationBarTitleText":"发票说明"}},{"path":"/pages/mine/invoice/open-info","meta":{},"window":{"navigationBarTitleText":"开票信息"}},{"path":"/pages/mine/invoice/record","meta":{},"window":{"navigationBarTitleText":"发票记录"}},{"path":"/pages/mine/invoice/title","meta":{},"window":{"navigationBarTitleText":"发票抬头"}},{"path":"/pages/mine/invoice/title-add","meta":{},"window":{"navigationBarTitleText":"添加发票抬头"}},{"path":"/pages/mine/feedback/list","meta":{},"window":{"navigationBarTitleText":"帮助反馈"}},{"path":"/pages/mine/feedback/feedback","meta":{},"window":{"navigationBarTitleText":"问题反馈"}},{"path":"/pages/mine/feedback/about","meta":{},"window":{"navigationBarTitleText":"关于我们"}},{"path":"/pages/mine/feedback/details","meta":{},"window":{"navigationBarTitleText":"帮助反馈"}},{"path":"/pages/mine/message","meta":{},"window":{"navigationBarTitleText":"消息中心"}},{"path":"/pages/home/presented","meta":{},"window":{"navigationBarTitleText":"送Ta咖啡"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
