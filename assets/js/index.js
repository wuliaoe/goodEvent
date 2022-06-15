$(function () {
    getUserInfor()
})


function getUserInfor() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            // console.log(res);
            if (res.code !== 0) {
                return layui.layer.msg('获取用户信息失败啦！！')
            }
            // 获取信息成功后则开始渲染头像等信息，由于步骤过多这里封装一个函数
            readUserInfor(res.data)
            // layui.layer.msg(res.message)
        },
        // 无论请求成功还是失败 都会调用complete函数
        // complete: function (res) {
        //     // console.log('@complete:', res);
        //     //通过log我们得出res.responseJSON是获取后的信息
        //     const data = res.responseJSON
        //     //通过接口测试得出失败返回的是code = 1 message=身份认证失败！
        //     //这里加一个if判断如果失败则跳转到登录页面且强制删除token
        //     if (data.code === 1 && data.message === '身份认证失败！') {
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    })
}

// 渲染用户头像函数
function readUserInfor(user) {
    const name = user.nickname || user.username
    $('#welcome').html(`${name}-欢迎宁！`)

    // 开始渲染头像
    const picSrc = user.user_pic
    if (picSrc !== null) {
        $('.layui-nav-img').attr('src', picSrc).show()
        $('.user-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        //  将名字里的第一个元素大写渲染出来
        const first = name[0].toUpperCase()
        $('.user-avatar').html(first).show()
    }
}

//退出事件按钮功能编写

$('#btn_BackLogin').click(() => {
    // layui.layer.msg('点击退出按钮成功')
    layer.confirm('宁确定要退出嘛？', { icon: 3, title: '提示' }, function (index) {
        //do something
        //首先删除locostrage的缓存token
        localStorage.removeItem('token') //清除指定
        // localStorage.clear() //清除所有

        //然后返回到浏览器登录页面
        location.href = '/login.html'

        layer.close(index);
    });
})
