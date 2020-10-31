import Vue from 'vue'
import VueRouter from 'vue-router'

const Index = () => import('../components/index/Index.vue')
const Discovery = () => import('../views/Discovery.vue')
const PlayLists = () => import('../views/PlayLists.vue')
const Mvs = () => import('../views/Mvs.vue')
const Songs = () => import('../views/Songs.vue')
const Result = () => import('../views/Result.vue')
const PlayList = () => import('../views/PlayList.vue')
const Mv = () => import('../views/Mv.vue')

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		redirect: '/discovery',
		component: Index,
		children: [
			{
				path: '/discovery',
				component: Discovery
			},
			{
				path: '/playlists',
				component: PlayLists
			},
			{
				path: '/songs',
				component: Songs
			},
			{
				path: '/mvs',
				component: Mvs
			},
			{
				path: '/result/:search',
				component: Result,
				name: 'searchResult',
				props: true // 开启路由传参
			},
			{
				path: '/playlist/:id',
				component: PlayList,
				name: 'playlistDetail',
				props: true // 开启路由传参
			},
			{
				path: '/mv/:id',
				component: Mv,
				name: 'MvDetail',
				props: true // 开启路由传参
			}
		]
	}
]

const router = new VueRouter({
	routes,
	scrollBehavior (to, from, savedPosition) {
		// return 期望滚动到哪个的位置
		return { x: 0, y: 0 }
	}
})

export default router
