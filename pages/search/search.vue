<template>
	<view class="search">
		<Lines />
		<view class="search-item">
			<!-- 最近搜索 -->
			<view class="search-titie">
				<view class="f-color">最近搜索</view>
				<view class="iconfont icon-lajitong" @tap="clearHistory"></view>
			</view>
			<view v-if="searchData.length > 0">
				<view class="search-name f-color" 
				v-for="(item, index) in searchData"
				@tap="toSearchList(item)"
				:key="index" >{{item}}</view>
			</view>
			<view v-else class="search-end">暂无搜索记录</view>
			
		</view>
		<view class="search-item">
			<!-- 热门搜索 -->
			<view class="search-titie">
				<view class="f-color">热门搜索</view>
			</view>
			<view >
				<view v-for="(item, i) in remmendItem" 
				:key="i" 
				class="search-name f-color">{{item}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Lines from '@/components/common/Line.vue'
	export default {
		data() {
			return {
				keyword: '',
				searchData: [],
				remmendItem: ['面膜', '热水器', '泡面', '可乐']
			}
		},
		onLoad() {
			uni.getStorage({
				key: 'searchData',
				success: (res) => {
					this.searchData = JSON.parse(res.data);
				}
			})
		},
		onNavigationBarButtonTap(e) {
			if(e.float === "right") {
				this.search()
			}
		},
		// 监听input输入的内容
		onNavigationBarSearchInputChanged(e) {
			this.keyword = e.text;
		},
		onNavigationBarSearchInputConfirmed() {
			this.search()
		},
		components: {
			Lines
		},
		methods: {
			search() {
				if (  this.keyword === ""){
					return uni.showToast({
						title: '关键词不能为空',
						icon: 'none'
					})
				}else {
					this.toSearchList(this.keyword);
					// 收掉软键盘
					uni.hideKeyboard();
					this.addSearch()
				}
			},
			// 记录最近搜索词
			addSearch() {
				let idx = this.searchData.indexOf(this.keyword);
				if(idx < 0) {
					this.searchData.unshift( this.keyword );
				}else {
					this.searchData.splice(idx,1);
					this.searchData.unshift( this.keyword );
				}
				uni.setStorage({
					key: 'searchData',
					data: JSON.stringify(this.searchData),
				})
			},
			toSearchList(item) {
				uni.navigateTo({
					url:"../search-list/search-list?keyword="+item+""
				})
			},
			clearHistory(){
				uni.showModal({
					title:"重要信息",
					content: "是否清除搜索记录",
					cancelText: '取消',
					confirmText: '确定',
					success: (res) => {
						if( res.confirm ) {
							uni.removeStorage({
								key: 'searchData'
							});
							this.searchData = [];
						}
					}
				})
			}
		}
	}
</script>

<style scoped>
	.search-item {
		padding: 20rpx;
	}

	.search-titie {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20rpx;
	}

	.search-name {
		display: inline-block;
		padding: 10rpx 20rpx;
		background-color: #E1e1e1;
		border-radius: 20rpx;
		margin: 10rpx;
	}
	.search-end{
		text-align: center;
	}
</style>
