const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')
//const MiniCssExtractPlugin = require('mini-css-extract-plugin')

//用cross-dev存储的环境变量是dev 还是prod 都存在在process.env 下面
const isDev = process.env.NODE_ENV === 'development'

const config = {
	target: 'web',
	entry: path.join(__dirname,'src/main.js'),
	output: {
		filename: 'bundle.[hash:8].js',
		path: path.join(__dirname,'dist')
	},
	module: {
		//规则 webpack 处理文件的规则
		rules: [
		    {
		    	test: /\.vue$/,
		    	loader: 'vue-loader'
		    },
		    {
		    	test: /\.jsx$/,
		    	loader: 'babel-loader'
		    },
		    {
		        test: /\.css$/, //加\是用来转义的
		        use: [
		          'style-loader', //将css写到html文件里面
		          'css-loader' //读出来css里面的文件
		        ]
      		},
      		{
      			test: /\.(gif|jpg|jpeg|png|svg)/,
      			use: [
	      			{
	      				loader: 'url-loader', //（封装了file-loader--》读出文件）直接转换成base64的编码写在文件里面
	      				options: {
	      					limit: 1024,
	      					name: '[name]-dione.[ext]'
	      				}
	      			}
      			]
      		}
		]
	},
	plugins: [
	    new webpack.DefinePlugin({
	    	'process.env': {
	    		NODE_ENV: isDev ? '"development"' : '"production"'
	    	}
	    }), //编译和在页面上来判断这个环境决定是否打包的文件
	    new VueLoaderPlugin() ,
	    new HTMLPlugin() ,
    ],
    performance: {
  		hints: false   //资源超过250kb不展示警告或错误提示
    },
    //可以控制webpack如何通知[资源(asset)和入口起点超过制定文件限制]
}

if (isDev) {
	config.module.rules.push({
		test: /\.styl(us)?$/, //加\是用来转义的
		use: [
		    'style-loader', //将css写到html文件里面
		    'css-loader' ,//读出来css里面的文件
		    {
		        loader: 'postcss-loader', 
		        options: {
		            sourceMap: true,  //直接使用syulus-loader生成好的sourcemap
		        }//选项的作用用来提高效率
		    },
		    'stylus-loader' //将stylus文件转化成css
		]
	})
	config.devtool = '#cheap-module-eval-source-map' //soure-map 映射代码跟编译代码之后的关系 方便我们debug文件
	config.devServer = {
		port: 8000,
		host: '0.0.0.0', //(手机连接电脑或者在别人电脑用ip访问)
	    overlay: {
	    	errors: true,
	    },
	    hot: true //只渲染当前改变的页面部分
	    //historyFallback: {}  //映射路由到index
	    //open: true //启动项目的时候可以自动打开浏览器
	}
	config.plugins.push(
		new webpack.HotModuleReplacementPlugin()
	)
	config.plugins.push(
		new webpack.NoEmitOnErrorsPlugin()
	)
} else {
	config.entry = {
		app: path.join(__dirname, 'src/main.js'),
		vendor: ['vue']
		//vendor:['vue','vue-router','vuex']
	}
	config.output.filename = '[name].[chunkhash:8].js'
	config.module.rules.push({
		test: /\.styl(us)?$/, //加\是用来转义的
		use: ExtractPlugin.extract({
			fallback: 'style-loader',
			use:[
			    'css-loader' ,//读出来css里面的文件
			    {
			        loader: 'postcss-loader', 
			        options: {
			            sourceMap: true,  //直接使用syulus-loader生成好的sourcemap
			        }//选项的作用用来提高效率
			    },
			    'stylus-loader' //将stylus文件转化成css
			]
		})
		/*use:[
		    MiniCssExtractPlugin.loader,
			'css-loader' ,//读出来css里面的文件
			{
			    loader: 'postcss-loader', 
			    options: {
			        sourceMap: true,  //直接使用syulus-loader生成好的sourcemap
			    }//选项的作用用来提高效率
			},
			'stylus-loader' //将stylus文件转化成css
		]*/
	})
	config.plugins.push(
		new ExtractPlugin('styles.[hash:8].css')
		/*new MiniCssExtractPlugin({
            chunkFilename: 'styles.[contenthash:8].css'
		})*/
	)
	config.optimization = {
		splitChunks: {
			cacheGroups: {
				vendor: {
					chunks: 'initial',
          			name: 'vendor'
				}
			} //将vue/vue-loader等打包
		},
		runtimeChunk: true //将webpack的包跟内容分离
	}
}

module.exports = config