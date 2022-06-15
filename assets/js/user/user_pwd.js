$(function () {

    const form = layui.form
    const layer = layui.layer

    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],

        newpwd: (value) => {
            // 这里的形参value可以直接获取密码框的数值
            const pwdd = $('.layui-form [name=old_pwd]').val()
            if (pwdd === value) return '新密码不能和原密码一致哦'
        },

        repwd: (value) => {
            // 这里的形参value可以直接获取密码框的数值
            const pwdd = $('.layui-form [name=new_pwd]').val()
            if (pwdd !== value) return '两次密码不一致'
        }
    })

    //表单提交事件
    $('.layui-form').on('submit', (e) => {
        e.preventDefault()
        // let arr = {
        //     old_pwd: $('.layui-form [name=old_pwd]').val(),
        //     new_pwd: $('.layui-form [name=new_pwd]').val(),
        //     re_pwd: $('.layui-form [name=re_pwd]').val()
        // }
        // console.log('@arrvalue:', arr);
        $.ajax({
            method: 'PATCH',
            url: '/my/updatepwd',
            // data: JSON.stringify($('.layui-form').serialize().split('&')),
            // data: JSON.stringify(arr),
            // data: arr,
            data: $('.layui-form').serialize(),
            success: function (res) {
                if (res.code !== 0) return layer.msg('更新密码失败！')
                layer.msg(res.message)

                //这里修改密码成功之后我们需要重置表单，原生的js表单中reset方法可以重置表单，所以我们先用$('.layui-form')[0]变为原生dom然后调用reset方法重置表单
                $('.layui-form')[0].reset()
            }
        })
        // console.log($('.layui-form').serialize());
    })


    //重置按钮
    $('#resetpwd').click(() => {
        $('.layui-form')[0].reset()
    })

})