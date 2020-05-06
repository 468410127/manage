<script>
	export default {
		onLaunch: function () {
			//#ifdef APP-PLUS
			var info = plus.push.getClientInfo();
			console.log(info, 'info')
			if(info && info.clientid){
				uni.setStorage({
					 key: 'clientid',
					 data: info.clientid
				});
			}else {
				uni.setStorage({
					 key: 'clientid',
					 data: ''
				});
			}
			//#endif
		},
		onShow: function () {
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "./common/css/icon.css";
	@import "./common/css/common.css";
	
	/*官方css库*/
	@import "./common/css/uni.css"
</style>
