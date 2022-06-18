$(function () {

    const layer = layui.layer
    const form = layui.form
    //时间补零
    function getzero(n) {
        return n > 9 ? n : '0' + n
    }

    //封装一个格式化时间的函数
    template.defaults.imports.dataFormat = (date) => {
        const dt = new Date(date)

        let y = dt.getFullYear()
        let m = getzero(dt.getMonth() + 1)
        let d = getzero(dt.getDate())

        let hh = getzero(dt.getHours())
        let mm = getzero(dt.getMinutes())
        let ss = getzero(dt.getSeconds())

        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    }



    // 先定义好要请求的数据，发请求的时候方便发送
    let datas = {
        pagenum: 1, //页码值
        pagesize: 2, //每页显示几条
        cate_id: '',
        state: ''
    }


    // 获取列表数据信息
    let getdatalist = () => {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: datas,
            success: res => {
                if (res.code !== 0) return layer.msg('获取信息失败!')
                // layer.msg(res.message)
                let htmltemp = template('tpl_table', res)
                $('tbody').html(htmltemp)
                // let abc = res.total
                // console.log('@@tolal:', abc);
                randpage(res.total)

            }
        })
    }

    // console.log($('#form_select [name="cate_id"]'));
    getdatalist()
    getselect()

    // 封装一个筛选区块的函数
    function getselect() {
        $.ajax({
            method: 'get',
            url: '/my/cate/list',
            success: (res) => {
                if (res.code !== 0) return layer.msg('获取列表失败')

                let selhtmlstr = template('tpl_select', res)
                // console.log(res);
                $('[name=cate_id]').html(selhtmlstr)
                form.render()
            }
        })
    }


    //筛选按钮的点击事件
    $('#form_select').submit((e) => {
        e.preventDefault()
        datas.cate_id = $('[name=cate_id]').val()
        datas.state = $('[name=state]').val()
        getdatalist()

    })

    // 定义底部的分页渲染功能
    function randpage(total) {
        let laypage = layui.laypage;
        //执行一个laypage实例
        laypage.render({
            elem: 'form_page' //注意，这里的 form_page 是 ID，不用加 # 号
            , count: total //数据总数，从服务端得到
            , limit: datas.pagesize //一页有几条数据
            , curr: datas.pagenum   //默认页
            , layout: ['count', 'prev', 'page', 'next', 'limit', 'skip']
            , limits: [2, 3, 5, 10]

            , jump: (obj, first) => {
                // obj.curr的值为最新页码值,这里将最新的值赋值给要请求的数据里去
                datas.pagenum = obj.curr
                datas.pagesize = obj.limit
                if (!first) {
                    getdatalist()
                }
            }
        });
    }

    // 通过代理的形式 给删除文章的按钮绑定
    $('tbody').on('click', '.btn_delete', function () {
        layer.confirm('你确定要删除嘛？', { icon: 3, title: '提示' }, (index) => {
            //do something
            // 获取当前按钮对应的id值
            let ids = Number($(this).attr('data-id'))
            // console.log(id);
            // console.log(123456);
            $.ajax({
                method: 'DELETE'
                , url: `/my/article/info?id=${ids}`
                // , url: '/my/article/info' + ids
                // , data: idss
                , success: (res) => {
                    if (res.code !== 0) return layer.msg('删除失败！')
                    layer.msg('删除成功！')
                    //这里我们解决删除成功之后页码不跳转的问题，加一个判断，如果这一页删完了，页码值就-1
                    let btnnum = $('.btn_delete').length //获取剩余删除按钮的个数
                    //如果剩余的按钮只有一个了，那么我们将页码值的数据减少一页
                    if (btnnum === 1) {
                        datas.pagenum = datas.pagenum === 1 ? 1 : datas.pagenum - 1
                    }
                    getdatalist()
                }
            })

            layer.close(index);
        });
    })
})