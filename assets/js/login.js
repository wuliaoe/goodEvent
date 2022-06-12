$(function () {
    // 注册和和登录按钮需要点击转换
    //点击去注册 登录盒子隐藏 注册盒子出现
    $('#link_reg').on('click', () => {
        // $("#lrbox").animate({ height: '350px' });
        $("#lrbox").css({ height: '350px' })
        $('.login_box').hide()
        $('.reg_box').show()
    })
    //点击去登录 注册盒子隐藏 登录盒子出现
    $('#link_login').on('click', () => {
        // $("#lrbox").animate({ height: '310px' });
        $("#lrbox").css({ height: '310px' })
        $('.reg_box').hide()
        $('.login_box').show()
    })

    /* 自定义layui表单规则，由于我们在html里调用了layui.all.js文件所以这里我们可以直接引用里面的js内容 */

    // 定义layui里面的语法 相当于导入 inport require之类的方法
    const former = layui.form
    const layer = layui.layer
    //  然后自定义表单规则 
    former.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位,且不能出现空格'
        ],
        rpwd: (value) => {
            // 这里的形参value可以直接获取密码框的数值
            const pwdd = $('.reg_box [name=password]').val()
            if (pwdd !== value) return '两次密码不一致'
        }
    })

    //编写注册表单验证事件
    $('#reg_form').on('submit', (e) => {
        //阻止表单默认提交
        e.preventDefault()

        // console.log(resUsername);
        // console.log(resPassward);
        // console.log(resRepassward);
        let data = {
            username: $('#reg_form [name=username]').val(),
            password: $('#reg_form [name=password]').val(),
            repassword: $('#reg_form [name=repassword]').val()
        }

        $.post('/api/reg', data, function (res) {
            if (res.code === 1) {
                // return console.log('@res失败内容', res.message)
                layer.msg(res.message);
                // $('#link_login').click()
            }
            // console.log('@手写', '注册成功');
            // console.log('@res成功内容', res.message);
            layer.msg('@注册成功', res.message);
            $('#link_login').click()
        }, 'json')
    })

    //编写登录表单认证事件
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            //serizlize 是jQuery的语法 可以快速提取表单提交内容
            data: $(this).serialize(),
            success: function (res) {
                layer.msg(res.message);
                if (res.code === 1) return layer.msg(res.message);
                //登录成功
                //将登录成功后的token返回值存到浏览器缓存
                localStorage.setItem('token', res.token)
                layer.msg(res.message)
                location.href = '/index.html'
            }
        })
    })

})