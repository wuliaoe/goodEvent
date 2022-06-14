//在调用请求的时候都会先调用这个函数 
//这个函数用来统一拼接url的前缀地址，然后发送请求的时候只需要输入后缀即可

$.ajaxPrefilter(function (options) {
    //全局统一提取后缀，然后拼接前缀
    options.url = 'http://www.liulongbin.top:3008' + options.url

    //全局统一配置headers,如果url路径里面有my则放添加用户请求头信息
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局挂载一个complete 只要请求没有成功获取用户信息则清除token且跳转到登录页面
    // 无论请求成功还是失败，ajax请求都会调用complete函数
    options.complete = function (res) {
        // console.log('@complete:', res);
        //通过log我们得出res.responseJSON是获取后的信息
        // const data = res.responseJSON
        //通过接口测试得出失败返回的是code = 1 message=身份认证失败！
        //这里加一个if判断如果失败则跳转到登录页面且强制删除token
        if (res.responseJSON.code === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})