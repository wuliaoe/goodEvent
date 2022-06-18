$(function () {
    const layer = layui.layer
    const form = layui.form
    getlist()

    function getlist() {
        $.ajax({
            method: 'get',
            url: '/my/cate/list',
            success: (res) => {
                if (res.code !== 0) return layer.msg('获取列表失败')

                let htmlstr = template('tpl_table', res)
                // console.log(res);
                $('tbody').html(htmlstr)
            }
        })
    }

    //添加类别按钮
    let layuiOpenIndex = null
    $('#btn_add').on('click', () => {
        layuiOpenIndex = layer.open({
            type: 1,
            title: '添加文章类别',
            area: ['500px', '250px'],
            content: $('#layui_openContent').html(),
            // closeBtn: 1
        });
    })

    //添加列表的正则
    form.verify({
        pass: [
            /^[a-zA-Z0-9]{1,15}$/
            , '别名必须1到15位数字和字母，且不能出现空格'
        ]
    })

    //为弹出层的按钮绑定事件，由于网页加载的时候还没有这个按钮所以我们需要代理绑定，具体如下
    $('body').on('submit', '#form_openAdd', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/cate/add',
            data: $('#form_openAdd').serialize(),
            success: (res) => {
                if (res.code !== 0) return layer.msg('添加文档失败')
                layer.close(layuiOpenIndex)
                layer.msg('添加文档成功!')
                getlist()
            }
        })
    })

    // 关闭添加内容的弹出框按钮的逻辑编辑
    $('body').on('click', '#btnCloseOpen', function (e) {
        e.preventDefault()
        layer.close(layuiOpenIndex)
    })


    let layuiEditOpen = null
    let idd = null
    $('body').on('click', '.btn_edit', function () {
        layuiEditOpen = layer.open({
            type: 1,
            title: '修改文章内容',
            area: ['500px', '250px'],
            // content: $('#layui_openContent').html(),
            content: $('#layui_openContent_edit').html()
        })
        idd = $(this).attr('data-id')
        // console.log('okk')
        // console.log();
    })

    //修改表单的弹出层确认按钮
    $('body').on('submit', '#form_openAdd_edit', function (e) {
        e.preventDefault()

        let datas = `${$('#form_openAdd_edit').serialize()}&id=${idd}`

        console.log($('#form_openAdd_edit').serialize())
        $.ajax({
            method: 'PUT',
            url: '/my/cate/info',
            data: datas,
            success: (res) => {
                if (res.code !== 0) return layer.msg('修改更新文档失败')
                layer.close(layuiEditOpen)
                layer.msg('修改更新文档成功!')
                getlist()
            }
        })
    })

    // 关闭添加内容的弹出框按钮的逻辑编辑
    $('body').on('click', '#btnCloseOpen_edit', function (e) {
        e.preventDefault()
        layer.close(layuiEditOpen)
    })

    //删除按钮的功能实现
    $('tbody').on('click', '.btn_editDel', function () {
        let delId = $(this).attr('data-id')
        layer.confirm('宁确定要删除嘛？', { icon: 3 }, function (index) {
            //do something
            // console.log(delId);
            $.ajax({
                method: 'DELETE',
                url: `/my/cate/del?id=${delId}`,
                // data: id = delId,
                success: function (res) {
                    if (res.code !== 0) return layer.msg('删除失败，未知错误')
                    layer.msg('删除成功！')
                    getlist()
                }
            })

            layer.close(index);
        });
    })

})