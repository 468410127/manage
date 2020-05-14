<template>
	<view class="submit">
		<view class="textarea">
			<view class="uni-textarea">
				<textarea v-model='text' placeholder="请简单描述一下报修的内容,以便我们更好的处理..." />
			</view>
			<view class="uni-list">
				<radio-group @change="radioChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
						<view>
							<radio :value="item.value" :checked="index === current" />
						</view>
						<view>{{item.name}}</view>
					</label>
				</radio-group>
			</view>
			<input class="uni-input" v-model='detailPosition' focus placeholder="请输入具体地址" />
			
		
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						当前期望上门时间
					</view>
					<view class="uni-list-cell-db">
						<picker mode="time" :value="time" start="09:01" end="21:01" @change="bindTimeChange">
							<view class="uni-input">{{time}}</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						当前期望上门日期
					</view>
					<view class="uni-list-cell-db">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
					</view>
				</view>
			</view>
			<upload-images @upload='upload' @returnImgUrl="getImgUrl" :token="upToken"></upload-images>
			
		</view>
		<view class="footer">
			<button type='primary' class="btn" @tap="submit">提交</button>
		</view>
		
	</view>
</template>

<script>
	import uploadImages from '@/components/upload-images.vue'
	export default {
		components: {
			uploadImages
		},
		data(){
			const currentDate = this.getDate({
			            format: true
			        })
			return {
				index: 0,
				            date: currentDate,
				            time: '12:01',
				items: [{
						value: 'USA',
						name: '室内'
					},
					{
						value: 'CHN',
						name: '室外',
					}
				],
				detailPosition: '',
				current: 0,
				text: '',
				imglist: [],
				imageList: [],
				isRotate: false,
				upToken:'',
				urls:[],
				repairImg: null,
				locationId: null
			};
		},
		computed: {
		        startDate() {
		            return this.getDate('start');
		        },
		        endDate() {
		            return this.getDate('end');
		        }
		    },
			onLoad(option){
				this.locationId = option.id;
				this.getToken();
				
			},
		methods: {
			getToken(){
				this.$api.httpRequest({
					url: '/pro_Servers/token/qiniu',
					method: 'get'
				}).then(res => {
					// console.log(res, 'token')
					this.upToken = res;
				})
			},
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			bindTimeChange: function(e) {
				this.time = e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
	
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			radioChange(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			},
			upload(arr) {
				this.imglist = arr;
				
			},
			submit(){
				if(!this.text){
					uni.showToast({
						icon: 'none',
						title: '请输入内容'
					});
					return;
				}
				if(this.current === 1 && !this.detailPosition){
					uni.showToast({
						icon: 'none',
						title: '请输入具体室外地址'
					});
					return;
				}
				const currentTime = `${this.date}`
				let timestamp1 = currentTime.replace(/-/g,'/');
				let timestamp2 = new Date(timestamp1).getTime();
				
				const data = {
					repairDes: this.text,
					position: this.current,
					expectTime: timestamp2, // 期望上门时间 时间戳
					repairInfo: this.detailPosition
				}
				this.$api.httpRequest({
					url: '/pro_Servers/repair/',
					method: 'POST'
				}, {
					repairDes:this.text,
					position: this.current,
					expectTime:currentTime,
					repairDetailInfo:this.detailPosition,
					locationId: this.locationId,
					repairStates:0,
					repairImg1: this.repairImg && this.repairImg.repairImg1?this.repairImg.repairImg1: '',
					repairImg2: this.repairImg && this.repairImg.repairImg2?this.repairImg.repairImg2: '',
					repairImg3: this.repairImg && this.repairImg.repairImg3?this.repairImg.repairImg3: '',
					repairImg4: this.repairImg && this.repairImg.repairImg4?this.repairImg.repairImg4: '',
					repairImg5: this.repairImg && this.repairImg.repairImg5?this.repairImg.repairImg5: '',
				}).then(res => {
					uni.redirectTo({
						url: '/pages/index/index'
					})
				})
			},
			getImgUrl(urls){
				const qiniuUrl = this.$store.state.qiniuUrl;
				let obj = {
				}
				for(let i in urls){
					const num = `${Number(i)+1}`;
					obj['repairImg'+num] = `${qiniuUrl}${urls[i]}`
				}
				this.repairImg = Object.assign({}, obj)
			},
			
			
			
		}
	}
</script>

<style>
	@import './index.css'
</style>
