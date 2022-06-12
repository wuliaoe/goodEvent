const express = require('express')

const app = express()

app.post('/test-reg', (req, res) => {
    res.header('Access-Control-Origin', '*')
    console.log(req.body);
    const data = { code: 1, message: "用户名被占用，请更换其他用户名！" }
    res.send(JSON.stringify(data))
})

app.listen(80, () => {
    console.log('服务器正常运行中');
})