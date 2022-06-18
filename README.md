# goodEvent后台管理系统


## 项目介绍

**技术栈：HTML5 + CSS3 + javaScript + jQuery + Layui + ajax + art-template + Canvas + node.js**

主要实现管理系统文章的查看，发布，存贮功能、和个人中心信息配置功能、更多**功能具体如下**：

- 注册登录功能、退出管理系统功能，登录安防功能
- 头像以及用户名渲染功能：（没有头像默认渲染名字第一个字幕为头像）
- 文本管理功能
  1. 文章的分类功能：添加分类，修改分类，删除分类，分类信息的所有内容表格化显示
  2. 文章列表功能：文章分类和状态的查询，文章分页功能，分页多项选择功能，内容表格化渲染显示
  3. 发布文章功能：文章标题编辑、分类选择、文本内容编辑(富文本)、文章标题图片选择、发布文章和将文章存为草稿功能
- 个人信息管理功能
  1. 基本资料功能：登录名称、用户昵称、用户邮箱的显示与编辑
  2. 更换头像：选择图片，上传图片，头像渲染
  3. 重置密码：原密码验证、新密码验证、再次输入新密码验证、重置内容功能的实现

### 功能的具体实现方法：

- 登录系统：通过GET调用登录接口保存token，成功则跳转到欢迎页，并给出成功的提示，失败给出错误提示，让用户重新登录
- 头像用户名系统：通过调用接口获取用户的头像和名称、昵称等信息，通过jQuery进行页面信息的渲染更新
- 系统布局：用Layui的布局模块实现后台管理系统的基本页面布局
- 文本分类：点击添加分类按钮弹出layui弹出层，点击确认提交信息请求端口，当请求成功后则刷新渲染列表，列表的渲染通过art-template进行动态渲染。渲染后的修改、删除按钮通过jQuery代理选择选中，并且通过点击事件请求响应的端口实现修改文本和删除文本功能
- 文章列表：通过端口调用实现筛选栏内筛选按钮的信息渲染、分页信息渲染、文章列表信息渲染。通过Layui的表单和分页模块实现文章的分类筛选、内容渲染、分页功能

- 页面切换:用HTML的< iframe > 标签功能实现在固定区域的页面跳转
- 退出登录系统：将localStorage内存储的token清除，成功则退回登录页面，失败则返回

### bug解决

- 解决template的动态渲染表单筛选元素不显示问题。
- 解决删除完内容后分页栏不进行跳转的问题。
- 解决Layui布局侧边栏默认选中状态下< iframe >绑定的a链接不跳转问题。
- 解决Canvas 图片更换后图片内容不第一时间显示的问题。

### 部分内容图片展示 (图片如未显示建议科学上网)

**登录页面：**

![image](https://github.com/wuliaoe/goodEvent/blob/main/assets/readmeImg/loginpic.png)

**主页面：**

![image](https://github.com/wuliaoe/goodEvent/blob/main/assets/readmeImg/mainpic.png)

**登录功能：**

![image](https://github.com/wuliaoe/goodEvent/blob/main/assets/readmeImg/login.gif)

**注册功能：**

![image](https://github.com/wuliaoe/goodEvent/blob/main/assets/readmeImg/reg.gif)

**文章分类功能**

![image](https://github.com/wuliaoe/goodEvent/blob/main/assets/readmeImg/filekind.gif)

**发布文章功能**

![image](https://github.com/wuliaoe/goodEvent/blob/main/assets/readmeImg/putfile.gif)

**文章列表功能**

![image](https://github.com/wuliaoe/goodEvent/blob/main/assets/readmeImg/filelist.gif)

**个人信息管理功能**

![image](https://github.com/wuliaoe/goodEvent/blob/main/assets/readmeImg/person1.gif)

![image](https://github.com/wuliaoe/goodEvent/blob/main/assets/readmeImg/person2.gif)

**退出登录：**

![image](https://github.com/wuliaoe/goodEvent/blob/main/assets/readmeImg/backlogin.gif)

**防止无认证登录：**

![image](https://github.com/wuliaoe/goodEvent/blob/main/assets/readmeImg/protect.gif)

### 项目地址

- GitHub地址：<https://github.com/wuliaoe/goodEvent>

如果宁觉得有什么错误或者更好的方法和思路，欢迎各路大仙大佬指点以及优化，感激不尽！共同学习！

### 项目作用

巩固知识，脉络梳理，提高学习效率，拓展业务能力。


## LICENSE

![](http://img.smyhvae.com/20210331_CC-BY-NC-SA.png)

本作品采用[知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议](https://creativecommons.org/licenses/by-nc-sa/4.0/)进行许可。