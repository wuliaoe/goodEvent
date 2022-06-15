$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)


    $('#shangchuan').on('click', () => {
        $('#file').click()
    })

    $('#file').on('change', function (e) {

        if (e.target.files.length === 0) {
            return layui.layer.msg('请选择图片')
        }

        //这里获取传的图片文件
        const imgfile = e.target.files[0]
        //将获取到的文件变为地址
        const imgUrl = URL.createObjectURL(imgfile)

        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', imgUrl)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    $('#imgupsure').on('click', function () {
        // 拿到裁剪好的图片
        let dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        // 获取图片后我们可以将获取后的图片发送ajax请求上传
        $.ajax({
            method: 'PATCH',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.code !== 0) return layui.layer.msg('图片切换失败!')
                layui.layer.msg('图片切换成功！')
                window.parent.getUserInfor()
            }
        })
    })
})