$(function () {
    const layer = layui.layer
    const form = layui.form

    // 初始化富文本编辑器
    initEditor()


    //定义加载文章分类的方法
    getStartCate()
    function getStartCate() {
        $.ajax({
            method: 'GET'
            , url: '/my/cate/list'
            , success: (res) => {
                if (res.code !== 0) return layer.msg('获取文章失败！')
                let kindHtml = template('cate_kind', res)
                $('[name=cate_id]').html(kindHtml)
                //这里由于是动态渲染所以一定要调用form.render()
                form.render()
            }
        })
    }

    // 1. 初始化图片裁剪器
    let $image = $('#image')

    // 2. 裁剪选项
    let options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    $('#show_file').on('click', function () {
        $('#input_file').click()
    })

    //监听 真~文件选择按钮的change事件获取文件列表
    $('#input_file').on('change', function (e) {
        let files = e.target.files
        // 判断用户有没有选择文件
        if (files.length === 0) {
            return
        }

        //根据文件创建对应的url文件地址
        let newImgURL = URL.createObjectURL(files[0])

        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    //这里为了区分需要发送的参数state默认先创建一个参数为已发布
    let art_state = '已发布'
    //当发布草稿按钮点击后则将state参数改为'草稿'
    $('#save_tow').on('click', function () {
        art_state = '草稿'
    })
    $('#save_one').on('click', function () {
        art_state = '已发布'
    })

    //开始绑定表单提交事件
    $('#form_all_fathe').on('submit', function (e) {
        e.preventDefault()
        //基于原生表单快速创建一个数据 formdata
        let fd = new FormData($(this)[0])
        //将发布状态state添加到fd数组里面
        fd.append('state', art_state)
        // fd.forEach(function (value, key) {
        //     console.log(key, value);
        // })
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                //将得到的文件添加到fd数据中
                fd.append('cover_img', blob)

                //最后：发送ajax请求发送数据
                console.log(fd);
                requestForm(fd)
            })

        function requestForm(fd) {
            $.ajax({
                method: 'POST'
                , url: '/my/article/add'
                , data: fd
                // 记住如果发的data数据是formdata格式则必须添加以下两个固定项
                , contentType: false
                , processData: false
                , success: function (res) {
                    if (res.code !== 0) {
                        return layer.msg('发布文章失败!')
                    }
                    layer.msg('添加文章成功!')
                    location.href = '/article/art_list.html'
                }
            })
        }
    })
})