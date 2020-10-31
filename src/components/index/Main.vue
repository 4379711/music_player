<template>
	<!-- 页面主体组件 -->
	<div class="main">
		<aside>
			<el-menu background-color="#dfdfdf" default-active="/discovery" :router="true" active-text-color="#F56C6C">
				<div class="search">
					<!-- 搜索框 -->
					<el-input size="medium" clearable prefix-icon="el-icon-search" v-model="inputValue" placeholder="搜索歌曲" @keyup.native.enter="toResult">
					</el-input>
				</div>
				<el-menu-item index="/discovery">
					<i class="iconfont icon-yinle1"></i>
					<template v-slot:title>
						<span class="text">发现音乐</span>
					</template>
				</el-menu-item>
				<el-menu-item index="/playlists">
					<i class="iconfont icon-gedan"></i>
					<template v-slot:title>
						<span class="text">推荐歌单</span>
					</template>
				</el-menu-item>
				<el-menu-item index="/songs">
					<i class="iconfont icon-yinle"></i>
					<template v-slot:title>
						<span class="text">最新音乐</span>
					</template>
				</el-menu-item>
				<el-menu-item index="/mvs">
					<i class="iconfont icon-MV"></i>
					<template v-slot:title>
						<span class="text">最新MV</span>
					</template>
				</el-menu-item>
			</el-menu>
		</aside>
		<div class="container">
			<div class="content">
				<!-- 给路由占位符添加过渡效果 -->
				<transition name="el-fade-in-linear">
					<router-view></router-view>
				</transition>
			</div>
		</div>
		<div class="player"  @mouseenter="enter" @mouseleave="leave">
			<div v-if="display_audio==false">
				<audio  ref="audioRef" hidden controls :src="musicUrl" autoplay :loop="false"></audio>
			</div>
			<div v-else>
				<audio  ref="audioRef" controls :src="musicUrl" autoplay :loop="false"></audio>
			</div>
		</div>
	</div>
</template>
<script>
	import { mapState, mapMutations } from 'vuex'

	export default {
		data () {
			return {
				// 输入框的默认值
				inputValue: '',
				// 是否隐藏播放区域
				display_audio: true
			}
		},
		methods: {
			...mapMutations(['saveAudioRef']),
			toResult () {
				// 判断输入内容是否为空
				if (!this.inputValue.trim()) {
					return this.$message('warning', '请输入歌曲名')
				}
				// 携带参数跳转路由
				this.$router.push({
					name: 'searchResult',
					params: {
						search: this.inputValue
					}
				})
				// 清空搜索框内容
				this.inputValue = ''
			},

			// 鼠标移入播放区域，显示div
			enter () {
				this.display_audio = true
			},
			// 鼠标移出播放区域，隐藏div
			leave () {
				this.display_audio = false
			}

		},
		computed: {
			...mapState(['musicUrl'])
		},
		mounted () {
			// 存储音频播放器的引用
			this.saveAudioRef(this.$refs.audioRef)
		}
	}
</script>
<style lang="stylus" scoped>
	.main
		display: flex
		height: 100%

		aside
			flex: 2
			background-color: #dfdfdf

		.search
			width 80%
			margin 10%

		.el-menu-item span.text
			font-size: 16px

		.el-menu-item i.iconfont
			font-size: 20px
			margin: 0 15px 0 10px

		.container
			display: flex
			flex: 12
			width: 100%
			justify-content: center
			padding: 20px 9% 0
			box-sizing: border-box
			overflow: scroll

			/* 隐藏滚动条 */
			&::-webkit-scrollbar
				display: none

			.content
				width: 100%

		.player
			height: 50px
			position: fixed
			bottom: 2%
			left: 0
			width: 100%
			audio
				padding-left 25%
				width: 50%
				border-radius: none
				outline: none
</style>
