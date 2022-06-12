//在调用请求的时候都会先调用这个函数 
//这个函数用来统一拼接url的前缀地址，然后发送请求的时候只需要输入后缀即可

$.ajaxPrefilter(function (options) {
    //提取后缀，然后拼接前缀
    options.url = 'http://www.liulongbin.top:3008' + options.url
})