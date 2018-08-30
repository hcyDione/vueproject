<template>
	<div class="main">
		测试数据{{text}}
		<div class="img">
			<img src="./assets/images/6.jpeg" />
		</div>
		<Footer></Footer>
	</div>
</template>
<script>
    import Footer from './assets/component/text.jsx'
	export default {
		components: {
			Footer
		},
		data () {
			return {
				text: '我的小花花Dione'
			}
		},
		//render () {}  默认createElement方法//默认都会有render去遍历template生成页面
	};
</script>
<style>
   .main{
   	  color: #008000;
   }
   .img{
   	   width:400px;
   	   height: 400px;
   	   margin:20px;
   }
   .img img{
   	   width:400px;
   	   height: 400px;
   }
</style>