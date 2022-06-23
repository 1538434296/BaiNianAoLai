<template>
	<view class="index">
		<!-- #ifdef MP-WEIXIN -->
			<view class="wx-nav">
				<view class="iconfont icon-Magnifier"></view>
				<text>百年奥莱</text>
				<view class="iconfont icon-xiaoxi"></view>
			</view>
		<!-- #endif -->
			
		<scroll-view scroll-x="true" class="scroll-content" 
		:scroll-into-view="scrollIntoView">
			<view 
			:id="'top'+index"
			class="scroll-item"
			v-for="(item,index) in topBar" 
			:key="index">
				<text 
				:class='topBarIndex==index?"f-active-color":"f-color"'
				@click="changeTab(index)">{{item.name}}</text>
			</view>
		</scroll-view>
		
		<swiper 
		@change="onClickTab" 
		:current="topBarIndex" 
		:style="'height:'+ clentHeight +'px;'"
		>
			<swiper-item 
			v-for="(item,index) in newTopBar"
			:key="index"
			>
				<scroll-view scroll-y="true" :style="'height:'+ clentHeight +'px;'"
				@scrolltolower="loadMore(index)">
					
					
					<block v-if="item.data.length > 0">
						<block v-for="(k,i) in item.data" :key="i">
							<!-- 推荐 -->
							<IndexSwiper v-if="k.type==='swiperList'" :dataList="k.data"></IndexSwiper>
							
							<template v-if="k.type==='recommendList'">
								<recommend :dataList="k.data"></recommend>
								<Card cardTitle="猜你喜欢"></Card>
							</template>
							
							<CommodityList v-if="k.type==='commodityList'" :dataList="k.data"></CommodityList>
							
							<!-- 运动户外 -->
							<Banner v-if="k.type === 'bannerList'" :dataList="k.data"></Banner>
							
							<template v-if="k.type === 'iconsList'">
								<Icons :dataList="k.data"></Icons>
								<Card cardTitle="热销商品"></Card>
							</template>
							
							<template v-if="k.type === 'hotList'">
								<Hot :dataList="k.data"></Hot>
								<Card cardTitle="推荐店铺"></Card>
							</template>
							
							<template v-if="k.type === 'shopList'">
								<Shop :dataList="k.data"></Shop>
								<Card cardTitle="为您推荐"></Card>
							</template>
							
							
							
						</block>
					</block>
					
					<block v-else>
						暂无数据....
					</block>
					<view class="load-text f-color">
						{{item.loadText}}
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		
		<!-- 推荐模板 -->
		<!-- <IndexSwiper></IndexSwiper>
		<recommend></recommend>
		<Card cardTitle="猜你喜欢"></Card>
		<CommodityList></CommodityList> -->
		
		<!-- 其他模板 -->
		<!-- <Banner></Banner>
		<Icons></Icons>
		<Card cardTitle="热销商品"></Card>
		<Hot></Hot>
		<Card cardTitle="推荐店铺"></Card>
		<Shop></Shop>
		<Card cardTitle="为您推荐"></Card>
		<CommodityList></CommodityList> -->
		
	</view>
</template>

<script>
	import $http from "@/common/api/request.js"
	import IndexSwiper from "@/components/index/IndexSwiper.vue"
	import Recommend from "@/components/index/Recommend.vue"
	import Card from "@/components/common/Card.vue"
	import CommodityList from "@/components/common/CommodityList.vue"
	import Banner from "@/components/index/Banner.vue"
	import Icons from "@/components/index/Icons.vue"
	import Hot from "@/components/index/Hot.vue"
	import Shop from "@/components/index/Shop.vue"
	export default {
		components: {
			IndexSwiper,
			Recommend,
			Card,
			CommodityList,
			Banner,
			Icons,
			Hot,
			Shop
		},
		data() {
			return {
				topBarIndex: 0,
				// 块切换id
				scrollIntoView: 'top0',
				// 获取页面高度
				clentHeight: 0,
				topBar: [],
				// 承载数据
				newTopBar: []
			}
		},
		onLoad() {
			this.init();
		},
		onReady() {
			uni.getSystemInfo({
				success: (res) => {
					this.clentHeight = res.windowHeight - uni.upx2px(80) - this.getClentHeight();
				}
			});
		},
		// 标题栏点击生命周期
		onNavigationBarButtonTap(e) {
			if(e.float === "left") {
				uni.navigateTo({
					url: '../search/search'
				})
			}
		},
		methods: {
			init() {
				$http.request({
					url: '/index_list/data'
				}).then((res) => {
					this.topBar = res.topBar;
					this.newTopBar = this.initData(res);
				}).catch((err) => {
					uni.showToast({
						title:'请求失败',
						icon:'none'
					})
				})
			},
			initData(res) {
				let arr = [];
					for(let i=0;i<this.topBar.length;i++) {
						let obj = {
							data: [],
							load: "first",
							lodaText: "上拉加载更多..."
						}
						if(i==0) {
							obj.data = res.data;
						}
						arr.push(obj)
					}
				return arr;
			},
			changeTab(index) {
				if(this.topBarIndex === index) {
					return ;
				}
				this.topBarIndex = index;
				this.scrollIntoView = 'top'+ index;
				// 每一次滑动赋值
				if( this.newTopBar[this.topBarIndex].load=== "first") {
					this.addData();
				}
			},
			onClickTab(e) {
				this.changeTab(e.detail.current)
			},
			// 获取可视区高度[兼容]
			getClentHeight() {
				const res = uni.getSystemInfoSync();
				const system = res.platform;
				console.log(res.platform);
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
			addData(callback) {
				let index = this.topBarIndex;
				let id =this.topBar[index].id;
				let page= Math.ceil(this.newTopBar[index].data.length/5)+1
				// 请求不同的数据
				$http.request({
					url:'/index_list/'+id+'/data/'+page
				}).then((res) => {
					console.log(res);
					this.newTopBar[index].data = [...this.newTopBar[index].data,...res.data]
				}).catch(() => {
					uni.showToast({
						title:'请求失败',
						icon:'none'
					})
				})
				// 请求结束赋值
				this.newTopBar[index].load = "last";
				if(typeof callback === 'function'){
					callback()
				}
			},
			//上拉记载更多
			loadMore(index) {
				
				this.newTopBar[index].loadText = "加载中..."
				// 请求数据
				this.addData(() => {
					
				})
			}
		}
	}
</script>

<style scoped>
	.wx-nav {
		text-align: center;
		height: 140rpx;
		line-height-step: ;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.scroll-content{
		width: 100%;
		height: 80rpx;
		white-space: nowrap;
	}
	.scroll-item{
		display: inline-block;
		padding: 10rpx;
		font-size: 36rpx;  
	}
	.f-active-color{
		padding: 10rpx 0;
		border-bottom: 8rpx solid #49BDFB;
	}
	.load-text{
		text-align: center;
		border-top: 2rpx solid #eee;
	}
</style>
