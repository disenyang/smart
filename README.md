# smart
smart.js 前端mvc轻量级框架，原生方式的双向数据绑定，支持表达式，for，if等形式，支持语义标签式开发。立志于前端轻量级mvc开发平台，适合网站开发，微信h5开发，后台管理。根据数据模型一键生成常用代码，生成的代码是标准格式的代码，统一代码风格，让开发只关注于业务逻辑，摒弃之前新增模块试的复制黏贴功能。

1.首先谢谢大家专注～～，下面为大家讲讲smart.js的使用方法。有什么不好的地方请大家指出哦［关注微信号：普淘科技］
2.视图层
<!doctype html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>smart测试</title>
        <script type="text/javascript" src="../jquery.min.js"></script>
        <script type="text/javascript" src="../smart.js"></script>
        <script src="../require.js"></script>
        <script src="demo.js"></script>
    </head>
    <body>
        <input model="name" if="show=='11'">
        <div>${username}</div>
        <button onclick="changeValue()">显示</button>
        <table style="width:100%">
            <tr>
                <td>姓名</td><td>性别</td>
            </tr>
            <tr for="row in rows" if="index==1">
                <td >${row.name}-${index}</td>
                <td>${row.sex==0?"男":"女"}</td>
            </tr>
        </table>
    </body>
</html>
3.控制层
$$.controller=function(){
	$$.show = "1111";
	$$.username = "bboy_xiaoyang";
	$$.rows =[{name:"将易于",sex:0},{name:"张涛",sex:0}];
	$$.changeValue=function(){
	    $$.show = "11";
	    console.log($$.show);
	    $$.show = "11";
	    $$.username = "呵呵呵呵";
	    $$.rows =[{name:"将易于22",sex:"男2"},{name:"张涛222",sex:"女2"}];
	}
};

就这么简单哦，后续版本会一直更新，请持续关注～～，最新更新我们会在官方微信号上说明［关注微信号：普淘科技］
