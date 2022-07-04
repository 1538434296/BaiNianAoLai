<template>
	<view class="site-list">
		<view class="site-item">
			<view>收 件 人</view>
			<input type="text" value="" placeholder="收件人姓名" v-model="dataList.name"/>
		</view>
		<view class="site-item">
			<view>手 机 号</view>
			<input type="text" value="" placeholder="11位手机号" v-model="dataList.tel"/>
		</view>
		<view class="site-item">
			<view>所在地址</view>
			<view class="site-picker" @tap="showCityPicker">
				<block v-if="!dataList.cityName">
					请选择>
				</block>
				<block v-else>
					{{dataList.cityName}}
				</block>
			</view>
			<mpvueCityPicker 
			ref="mpvueCityPicker" 
			:pickerValueDefault="pickerValueDefault"
			@onConfirm="onConfirm"
			v-model="dataList.cityName"
			></mpvueCityPicker>
		</view>
		<view class="site-item">
			<view>详细地址</view>
			<input type="text" value="" placeholder="5到50的字符" v-model="dataList.detailSite"/>
		</view>
		<view class="site-item">
			<view>设为默认地址</view>
			<label class="radio">
				<radio color="#49BDFB" :checked="dataList.isDefault" @tap="RadioChange"/>
			</label>
		</view>
		<!-- #ifdef MP-WEIXIN -->
			<view class="add-site">
				<view class="add-site-btn" @tap="toBack">保存</view>
			</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import mpvueCityPicker from "@/components/uni/mpvue-citypicker/mpvueCityPicker.vue"
	import {mapActions} from 'vuex'
	export default {
		data() {
			return {
				pickerValueDefault: [0,0,1],
				dataList: {
					name: '',
					tel: '',
					cityName: '',
					detailSite: '',
					isDefault: false
				},
				i: -1,
			}
		},
		onLoad(e) {
			if(e.data) {
				uni.setNavigationBarTitle({
					title: '修改地址'
				});
				let result = JSON.parse(e.data)
				this.dataList = result.item;
				this.i = result.index;
				this.isStatus = true;
			}else {
				
			}
		},
		onNavigationBarButtonTap() {
			if(!this.dataList.name) {
				uni.showToast({
					title: '名称为空',
					icon: 'none'
				})
			}else if(!this.dataList.tel) {
				uni.showToast({
					title: '手机号为空',
					icon: 'none'
				})
			}else if(!this.dataList.cityName) {
				uni.showToast({
					title: '城市未选择',
					icon: 'none'
				})
			}else if(!this.dataList.detailSite) {
				uni.showToast({
					title: '详细地址为空',
					icon: 'none'
				})
			}else {
				this.toBack();
			}
		},
		methods: {
			toBack() {
				if(this.isStatus) {
					// 修改
					this.updataSiteFn({
						index: this.i,
						item: this.dataList
					});
					uni.navigateBack({
						delta:1
					})
				}else {
					// 新增
					this.createSiteFn(this.dataList);
					uni.navigateBack({
						delta:1
					})
				}
			},
			// 地址三级联动
			showCityPicker() {
				this.$refs.mpvueCityPicker.show();
			},
			onConfirm(e) {
				this.dataList.cityName = e.label;
			},
			// 点击切换默认
			RadioChange() {
				this.dataList.isDefault = !this.dataList.isDefault;
			},
			...mapActions(['createSiteFn', 'updataSiteFn', 'remoiveSiteFn'])
		},
		components: {
			mpvueCityPicker,
		}
	}
</script>

<style scoped>
	.add-site {
		width: 100%;
		display: flex;
		justify-content: center;
	}
	.add-site-btn {
		margin-top: 20rpx;
		padding: 10rpx 100rpx;
		border: 2rpx solid #49BDFB;
		color: #49BDFB;
		border-radius: 30rpx;
	}
	.site-list {
		display: flex;
		flex-direction: column;
		margin: 0 20rpx;
	}
	.site-item {
		display: flex;
		padding: 20rpx 10rpx;
		border-bottom: #CCCCCC solid 2rpx;
	}
	.site-item input{
		margin-left: 10rpx;
	}
	.site-picker {
		position: absolute;
		left: 50%;
	}
	.site-item .radio{
		position: absolute;
		right: 30rpx;
	}
</style>
