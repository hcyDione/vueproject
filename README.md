# vueproject
这是一个没有用vue-cli脚手架工具 纯npm 建立起来的vue项目
### 步骤 
* npm init
    > 这时候会出现一个package.json的文件
* npm i webpack vue vue-loader 
    > 这时候会出现package-lock文件和依赖包,同样会报warn"vue-loader@15.4.1 requires a peer of css-loader@" description,repository,optional skipping optional dependency :fsevent@ 这些都可以忽略
* npm i css-loader 
    > 建立src目录 新建app.vue => 新建 index.js主入口 => 新建 webpack.config.js 文件(这次只需要配置入口js文件和出口js文件即可) => 在package里面配置build参数
* npm run build 
    > 报warn:One CLI for webpack must be installed webpack4 需要依赖webpack-cli  安装好之后会报错 You may need an appropriate loader to handle this file type 在webpack.config.js里面配置module 配置好后继续运行会报Error:The 'mode' option has not been set webpack4 里面需要声明mode来判断生产环境和开
    发环境修改好后继续运行会报错：[vue-loader] vue-template-compiler must be installed as a peer dependency 
* npm i vue-template-compiler
    > 安装好依赖之后继续运行报错：You may need an appropriate loader to handle this file type.
    没有安装style-loader
* npm i style-loader
    > 安装好后在运行报错：vue-loader was used without the corresponding plugin webpack4配置需要包含VueLoaderPlugin => 在webpack.config.js里面配置VueLoaderPlugin 在运行会就正常了
### 接下来配置图片资源的打包,css预处理器等
* npm i stylus stylus-loader url-loader file-loader
    > 在src/assets下面添加图片和.css文件,然后在webpack.config.js里面配置相应的处理loader
### devServer的使用
* npm i cross-env
    > 配置package.json里面的dev 安装cross-env的包可以在webpack.config.js里面用process.env来判断到底是生产环境还是开发环境,然后对不同环境配置对应的config文件 => 配置完成之后还需要一个html来展示继续在webpack.config.js里面配置HTMLPlugin
* npm run build
    > 报Error:Cannot find module 'html-webpack-plugin' => npm i html-webpack-plugin 
* npm run dev
    > 报error spawn webpack-dev-server ENOENT => npm i webpack-dev-server 顺利在浏览器上可以访问
### postCss、babel-loader使用
* npm i postcss autoprefixer babel-loader babel-core 
    > 新建postcss.config.js 引入autoprefixer为postcss做后期css处理使用,然后在webpack.config.js中给styl文件处理加上postcss的处理
* npm i babel-env babel-plugin-transform-vue-jsx
    > 在webpack.config.js添加.jsx文件处理rule,会报Error需要安装依赖 => npm i babel-helper-vue-jsx-merge-props
* npm run dev 
    > 报Error Cannot find module '@babel/core' =>
    npm i @babel/core => 继续报error Can't resolve 'postcss-loader' => npm i postcss-loader => 之后继续报错  Plugin/Preset files are not allowed to export objects, only functions => 新建.bebelrc文件 然后配置.babelrc文件
### 正式打包的时候,将css文件从出口的js中分离出来
* npm i extract-text-webpack-plugin@next 
    > 在webpack.config.js里面对styl文件的处理需要分环境单独做不同的处理
* npm run build 
    > 就能看到style文件被单独的分离出来了
### 单独打包vue代码
* 修改config.entry文件入口加vendor 
    > 然后在生产环境在配置optimize选项设置把vendor里面定义的文件全部和业务逻辑文件单独打包分离出来,没分离打包之前main.js是73kb 分离打包之后app.js是74byte 而vendor是72.3kb runtime(webpack)包是1.42kb
### 到此一个简单的vue项目工作流已经搭建好了



    



