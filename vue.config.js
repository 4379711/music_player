const path = require('path')
module.exports = {
    configureWebpack: {
        // 编译模式 :development 和 production,一个是开发环境,一个是生产环境
        mode: 'production',
		resolve: {
			alias: {
                // 给src/assets/styles/ 文件夹取一个别名,这样在项目中可以不用写全路径
                // @import '~styles/theme.styl',注意<style lang="stylus" scoped> 标签下的import,~不能少
                styles: path.join(__dirname, 'src', 'assets', 'styles')
			}
		}
	},

    css: {
      extract: false
    }
}
