<template>
	<view>
		<Lines></Lines>
		<view class="list">
			<!-- 左侧滑动 -->
			<scroll-view scroll-y="true" class="list-left" :style="'height:'+ clentHeight +'px;'">
				<view v-for="(item,index) in leftData" class="left-item" @tap="changeTab(index, item.id)" :key="index">
					<view class="left-name" :class=" activeIndex === index?'left-name-active':''">{{item.name}}</view>
				</view>
			</scroll-view>
		
			<!-- 右侧滑动 -->
			<scroll-view scroll-y="true" class="list-right" :style="'height:'+ clentHeight +'px;'">
				<view class="right-list" v-for="(item, index) in rightData" :key="index">
					<block v-for="(k,i) in item" :key="i">
						<view class="list-title">{{k.name}}</view>
						<view class="right-context">
							<view class="right-item" v-for="(j,idx) in k.list" :key="idx">
								<image class="right-img" :src="j.imgUrl" mode=""></image>
								<view class="right-name">{{j.name}}</view>
							</view>
						</view>
					</block>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import $http from "@/common/api/request.js"
	import Lines from '@/components/common/Line.vue'
	
	export default {
		data() {
			return {
				clentHeight: 0,
				activeIndex: 0,
				// 左侧数据
				leftData:[],
				// 右侧数据
				rightData:[]
			}
		},
		onLoad() {
			this.getData()
		},
		// 获取可视高度
		onReady() {
			uni.getSystemInfo({
				success: (res) => {
					this.clentHeight = res.windowHeight - this.getClentHeight();
				}
			});
		},
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '../search/search'
			})
		},
		methods: {
			getData(id) {
				if( id === (this.activeIndex+1) ) {
					return ;
				}
				$http.request({
					url: '/goods/list'
				}).then((res) => {
					let leftData = [];
					let rightData = [];
					res.data.forEach(v=>{
						leftData.push({
							id: v.id,
							name: v.name
						})
						// 点击的id值相同
						if ( v.id === (this.activeIndex+1) ) {
							rightData.push(v.data)
						}
					})
					this.leftData = leftData;
					this.rightData = rightData;
				}).catch((err) => {
					uni.showToast({
						title:'请求失败',
						icon:'none'
					})
				})
			}
			,
			// 左侧点击事件
			changeTab(index, id) {
				this.getData(id);
				this.activeIndex = index;
				
			},
			getClentHeight() {
				const res = uni.getSystemInfoSync();
				const system = res.platform;
				if( system === 'ios' ) {
					return 44 + res.statusBarHeight;
				}else if( system === 'android' ) {
					return 0;
				}else if( system === 'devtools' ) {
					return 70 + res.statusBarHeight
				}else{
					return 0;
				}
			},
		},
		components: {
			Lines
		}
	}
</script>

<style scoped>
	.list{
		display: flex;
	}
	.list-left {
		width: 200rpx;
	}
	.left-item {
		border-bottom: 2rpx solid #FFFFFF;
		font-size: 28rpx;
		background-color: #F7F7F7;
	}
	.left-name {
		padding: 30rpx 6rpx;
		text-align: center;
	}
	.left-name-active {
		border-left: 8rpx solid #49BDFB;
		background-color: #FFFFFF;
	}
	.list-right {
		flex: 1;
		padding-left: 20rpx;
	}
	.list-title {
		font-weight: 600;
		padding: 30rpx 0;
	}
	.right-context {
		display: flex;
		flex-wrap: wrap;
	}
	.right-item {
		width: 150rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 10rpx;
	}
	.right-img {
		width: 150rpx;
		height: 150rpx;
	}
	.right-name{
		padding: 16rpx;
	}
</style>
