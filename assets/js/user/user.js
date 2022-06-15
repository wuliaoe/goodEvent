$(function () {
    const form = layui.form
    const layer = layui.layer

    form.verify({
        nickname: function (value) {
            // if (value.length > 6 || value.length < 1) {
            //     return '用户名必须在1-6个字符之间，可以有特殊符号'
            // }

            if (/[1,7]/.test(value)) {
                return '用户名必须在1-6个字符之间，可以有特殊符号'
            }
        }
    })

    initusermaessage()
    //获取用户信息，初始化用户信息
    function initusermaessage() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                // console.log(res);
                if (res.code !== 0) {
                    return layer.msg('获取用户信息失败啦！！')
                }
                // 获取信息成功后则开始渲染头像等信息，由于步骤过多这里封装一个函数
                // console.log(res.data);

                // 在html添加一个lay-filter 然后用下面的语法赋值
                form.val('foruserinfo', res.data)

                // layui.layer.msg(res.message)
            },
        })
    }

    //重置按钮
    $('#reSet').click((e) => {
        e.preventDefault() //阻止表单默认事件的触发
        initusermaessage()
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'PUT',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.code !== 0) {
                    // return layer.msg(res.message)
                    layer.msg('更新用户信息失败咧呢！')
                }
                layer.msg(res.message)
                initusermaessage()
                // getUserInfor()
                // 这我们需要调用index.js里面的渲染头像和名称方法直接调用是不行的，由于user窗口和主窗相差了一个iframe，所以这里我们需要调用 window.parent也就是iframe窗口的父级方法来进入主窗口
                setTimeout(() => {
                    window.parent.getUserInfor()
                }, 500)
            }
        })
    })
})