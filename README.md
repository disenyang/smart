# smart
smart.js 前端mvc轻量级框架，原生方式的双向数据绑定，支持表达式，for，if等形式，支持语义标签式开发。立志于前端轻量级mvc开发平台，适合网站开发，微信h5开发，后台管理。根据数据模型一键生成常用代码，生成的代码是标准格式的代码，统一代码风格，让开发只关注于业务逻辑，摒弃之前新增模块试的复制黏贴功能。

<br>
1.首先谢谢大家专注～～，下面为大家讲讲smart.js的使用方法。有什么不好的地方请大家指出哦［关注微信号：普淘科技］
<br>
2.视图层
<pre>
&lt;!doctype html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;
        &lt;title&gt;smart测试&lt;/title&gt;
        &lt;script type="text/javascript" src="../jquery.min.js"&gt;&lt;/script&gt;
        &lt;script type="text/javascript" src="../smart.js"&gt;&lt;/script&gt;
        &lt;script src="../require.js"&gt;&lt;/script&gt;
        &lt;script src="demo.js"&gt;&lt;/script&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;input model="name" if="show=='11'"&gt;
        &lt;div&gt;${username}&lt;/div&gt;
        &lt;button onclick="changeValue()"&gt;显示&lt;/button&gt;
        &lt;table style="width:100%"&gt;
            &lt;tr&gt;
                &lt;td&gt;姓名&lt;/td&gt;&lt;td&gt;性别&lt;/td&gt;
            &lt;/tr&gt;
            &lt;tr for="row in rows" if="index==1"&gt;
                &lt;td &gt;${row.name}-${index}&lt;/td&gt;
                &lt;td&gt;${row.sex==0?"男":"女"}&lt;/td&gt;
            &lt;/tr&gt;
        &lt;/table&gt;
    &lt;/body&gt;
&lt;/html&gt;
</pre>
<br>
3.控制层
<br>
<pre>
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
</pre>
<br>
<br>
<img width="100px" height="100px" src='http://7xkce0.com1.z0.glb.clouddn.com/weixin.jpg'>
