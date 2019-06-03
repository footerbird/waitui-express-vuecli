# waitui-express-vuecli

## 启动项目
```
git clone https://github.com/footerbird/waitui-express-vuecli.git
cd waitui-express-vuecli
npm install
npm run serve
```

查看项目页面没问题的话，下面开始打包
```
npm run build
```
打包的静态文件会出现在server/dist目录下，因为在vue.config.js文件中配置了outputDir: 'server/dist'

进入server目录
```
cd server
```
因为在app.js中配置了app.use(express.static(path.join(__dirname, 'dist')))，dist文件夹下为server的静态文件根目录

所以启动localhost:3000默认访问dist文件夹下的index.html

配置api接口，在app.js中
```
var apiRouter = require('./config/routes');
app.use('/api', apiRouter);
```
在config/routes.js中
```
router.post('/get_articleListAjax', function(req, res, next) {
    api.get_articleListAjax(req, res, next);
});
...xxx...
```
所以访问api接口为在vue.config.js中配置proxy代理接口为localhost:3000/api

最后，启动server
```
npm start
```
访问localhost:3000就能够看到项目了

### 自定义配置
添加自定义配置需要在项目跟目录中添加vue.config.js，注意是根目录非src下

详见 [https://cli.vuejs.org/zh/config/](https://cli.vuejs.org/zh/config/).




## 从零开始创建express-vuecli项目（前后端不分离）

1、利用vuecli脚手架创建vue项目,进入终端
```
vue ui
```
选择project目录，并在目录中创建waitui-express-vuecli项目

选择babel,eslint默认配置，不需要git初始化

创建完成后，在vue-ui界面上添加vue-router,vue-router插件，至此vue项目创建完成

2、在项目中创建nodejs服务器
```
express --view=pug server
cd server
npm install
```
安装mysql模块
```
npm install mysql --save
```
3、配置vue打包项目输出路径，在waitui-express-vuecli根目录创建vue.config.js
```
module.exports = {
    // 输出文件目录
    outputDir: 'server/dist',
}
```
4、配置server服务器静态文件根目录，打开server/app.js
```
app.use(express.static(path.join(__dirname, 'dist')))
```
5、配置api接口路由，打开server/app.js
```
var apiRouter = require('./config/routes');
app.use('/api', apiRouter);
```
在config/routes.js中
```
router.post('/get_articleListAjax', function(req, res, next) {
    api.get_articleListAjax(req, res, next);
});
...xxx...
```
所以ajax请求接口为localhost:3000/api/get_articleListAjax

6、配置代理服务器，打开vue.config.js
```
module.exports = {
    devServer: {
        proxy: {//代理
          '/api': {
              target: 'http://localhost:3000/api',
              ws: true,
              changeOrigin: true,//是否跨域
              pathRewrite: {
                  '^/api' : ''// rewrite path
              }
          }
        }
    }
}
```
至此，一个express-vuecli的简易项目就做好了

7、安装一些项目通常会用到的插件

axios用来替代jq的ajax进行http请求

```
npm install axios --save
```
qs 是一个增加了一些安全性的查询字符串解析和序列化字符串的库，

qs.parse()将URL解析成对象的形式，qs.stringify()将对象 序列化成URL的形式，以&进行拼接
```
npm install qs --save
```
全局使用axios和qs，打开main.js
```
import axios from 'axios'
import qs from 'qs'
Vue.prototype.$http = axios
Vue.prototype.$qs = qs
```




## 知识点

### a() {}，a: function(){} 和 a: () => {}的区别？
首先，a() {}，a: function(){}没有区别，a() {}是ES6新增加的一个对象方法的简写

而a() {}和a: () => {}的区别就是一个是普通的函数声明（对象方法的简写就是普通的函数），一个是箭头函数。this的区别。
```
window.a = 'window'
const obj ={
    a: 'obj',
    say() {
        console.log(this.a)
    },
    say1: function () {
        console.log(this.a)
    },
    say2: () => {
        console.log(this.a)
    }
}
obj.say() // obj
obj.say1() // obj
obj.say2() // window
```
详见[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Method_definitions](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Method_definitions)

或[http://es6.ruanyifeng.com/?search=%E5%B1%95%E5%BC%80&x=0&y=0#docs/function#%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0](http://es6.ruanyifeng.com/?search=%E5%B1%95%E5%BC%80&x=0&y=0#docs/function#%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0)

### 变量的解构赋值和扩展运算符...

变量的解构赋值,例如数组的解构 let [a,b,c] = [1,2,3]，详见[http://es6.ruanyifeng.com/?search=%E5%B1%95%E5%BC%80&x=0&y=0#docs/destructuring](http://es6.ruanyifeng.com/?search=%E5%B1%95%E5%BC%80&x=0&y=0#docs/destructuring)

扩展运算符...，详见[http://es6.ruanyifeng.com/?search=%E5%B1%95%E5%BC%80&x=0&y=0#docs/array#%E6%89%A9%E5%B1%95%E8%BF%90%E7%AE%97%E7%AC%A6](http://es6.ruanyifeng.com/?search=%E5%B1%95%E5%BC%80&x=0&y=0#docs/array#%E6%89%A9%E5%B1%95%E8%BF%90%E7%AE%97%E7%AC%A6)

### Vue下渐变效果失效的解决办法

有注释的时候，渐变是出来的，没有注释有时候渐变没有了，于是按照大佬的方法：“可能是optimize-css-assets-webpack-plugin这个插件的问题，

所以在渐变css处加上注释就可以了，例如
```
.gradient {
  /*! autoprefixer: off */
  background-image: -moz-linear-gradient(90deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 100%);
  background-image: -webkit-linear-gradient(90deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 100%);
  background-image: -ms-linear-gradient(90deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 100%);
}
```