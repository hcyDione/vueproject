const autoprefixer = require('autoprefixer')

module.exports = {
	plugins: [
	   autoprefixer()
	]
}

//css代码处理完成之后 postcss去优化完成好的css 主要是给浏览器加css前缀