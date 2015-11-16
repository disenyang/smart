var $$={};
var fors=[];
var exps =[];
var ifs=[];
var attrExps=[];
$(function(){
  var modelMapping = {};

  $$.post=function(url,data,callback){
    $.ajax({
        url: url,
        dataType: 'json',
        type:"post",
        timeout: timeout,
        data: data,
        success: function(data) {
          if(callback){
            callback(data);
          }
        },
        error: function (xhr, textStatus, e){
          
        }
      });
  }

  $$.get=function(url,data,callback){
     $.ajax({
        url: url,
        dataType: 'json',
        type:"get",
        timeout: timeout,
        data: data,
        success: function(data) {
          if(callback){
            callback(data);
          }
        },
        error: function (xhr, textStatus, e){
          
        }
      });
  }

  //设置元素值
  function setElementValue(e,v){
    if(e.is('input')){
      e.val(v);
    }else{
      e.html(v);
    }
  }

  //声明model变量
  function vars(){
    for(var p in $$){
      if(typeof($$[p])!='function'){
        if(typeof($$[p])=='undefined'){
          eval("window."+p+" = null;");
        }else if(typeof($$[p])=='string'){
          eval("window."+p+" = '"+$$[p]+"';");
        }else {
          eval("window."+p+" = $$['"+p+"'];");
        }
      }
    }
  }

 

  function replaceAll(str,p1,p2){
    while(true){
      var index = str.indexOf(p1);
      if(index==-1){
        break;
      }
      str = str.replace(p1,p2);
    }

    return str;
  }


  //解析内容
  function parseContent(){
    vars();

    for(var i=0;i<fors.length;i++){
      var f= fors[i];
    
      var forElemnet = f.element;
      for(var j=0;j<f.res.length;j++){
        var re = f.res[j];
        re.remove();
      }
      f.res=[];
      parseFor(f);
    }
    parseIf(ifs);
    parseAttrs(attrExps);
    for(var i=0;i<exps.length;i++){
      var f= exps[i];
      var element = f.element;
      var html = parseExp(element);
      element.html(html);
    }
    
  }


  //解析元素内容
  function parseForContent(element,params){
   
    var fors = getFors(element,true);
    for(var i=0;i<fors.length;i++){
      var f= fors[i];
      var forElemnet = f.element;
      for(var j=0;j<f.res.length;j++){
        var re = f.res[j];
        re.remove();
      }
      f.res=[];
      parseFor(f,params);
    }

       
    //if语句解析
    parseIf(getIfs(element),params);
    
    //属性解析
    parseAttrs(getAttrExps(element),params);

    //表达式解析
    parseExp(element,params);
  }


  //if表达式解析
  function parseIf(ifs,params){
    if(params){
      for(var p in params){
        eval("var "+p+"=params['"+p+"'];");
      }
    }
    for(var i=0;i<ifs.length;i++){
      var e = ifs[i].element;
      var express = ifs[i].express;
      var r = eval(express);
      if(r){
        e.show();
      }else{
        e.hide();
      }
    }
  }

  //属性表达式解析
  function parseAttrs(attrExps,params){

     if(params){
      for(var p in params){
        eval("var "+p+"=params['"+p+"'];");
      }
    }
    for(var i=0;i<attrExps.length;i++){
      var e = attrExps[i].element;
      var attrs = attrExps[i].attrs;
      for(var j=0;j<attrs.length;j++){
        var attr = attrs[j];
        var name = attr.name;
        var value = attr.value;
        var ei = value.substring(2,value.indexOf("}"));
        var r = eval(ei);
        e.attr(name,r);
      }
    }

  }
  

  //解析表达式
  function parseExp(element,params){
      try{
        if(params){
          for(var p in params){
            eval("var "+p+"=params['"+p+"'];");
          }
        }
        var es = getExpOutForElement(element);
        for(var i=0;i<es.length;i++){
          var e = $(es[i]);
          var html = e.html();
          var exps = getExpVars(html);
          for(var j=0;j<exps.length;j++){
            var exp = exps[j];
            var ei = exp.substring(2,exp.indexOf("}"));
            var value = eval(ei);
            html= replaceAll(html,exp,value);
          }
          e.html(html);
        }
       
      }catch(e){
        console.error(e);
      }
     
  }

 

  //解析for循环
  function parseFor(f,params){
    // if(vars){
    //   eval(vars);
    // }
    if(params){
      for(var p in params){
        eval("var "+p+"=params['"+p+"'];");  

      }
    }
    var forElemnet = f.element;
    var forExp = forElemnet.attr("for");
    var ss = forExp.split(" in ");
    var item = ss[0];
    
    var items = ss[1];
    var html = forElemnet.html();
    var rows_smart = eval(items);
    if(!rows_smart){
      rows_smart = $$[items];
    }
    var parent = f.parent;
    var beforeElement = f.before;
    var afterElement = f.after;
    var index = forElemnet.index();
    var lastElement = null;
    if(rows_smart){
      for(var i=0;i<rows_smart.length;i++){
        var cloneElement = forElemnet.clone();

        var params = {};
        params[item] = eval(items+"["+i+"]");
        params["index"] = i;

        f.res.push(cloneElement);
        parseForContent(cloneElement,params);
        
        if(lastElement!=null){
          lastElement.after(cloneElement);
        }else if(beforeElement!=null){
          beforeElement.after(cloneElement);
        }else if(afterElement!=null){
          afterElement.before(cloneElement);
        }else if(parent!=null){
          cloneElement.appendTo(parent);
        }
        
        lastElement = cloneElement;
      }
    }
  }

  // //获取表达式
  // function getExps(html){
  //   var exps = [];
  //   var str = html;
  //   while(true){
  //     var start = str.indexOf("${");
  //     if(start==-1 ){
  //       break;
  //     }
  //     var end = str.indexOf("}");
  //     exps.push(str.substring(start,end+1));
  //     str = str.substring(end+1);
  //   }
  //   return exps;
  // }

  // //获取元素的子元素 除去for元素
  // function getOutForElement(element){
  //   var es = element.find("*");
  //   var newes = [];
  //   for(var i=0;i<es.length;i++){
  //     var e = $(es[i]);
  //     //元素是否在子for循环里面
  //     if(!isInnerFors(element,e)){
  //       newes.push(e);
  //     }
  //   }
  //   return es;
  // }

  //获取元素的表达式子元素 除去for元素
  function getExpOutForElement(element){
    var es = element.find("*");

    var newes = [];
    if(es.length==0){
       newes.push(element);
    }
    for(var i=0;i<es.length;i++){
      var e = $(es[i]);
      if(e.children().length==0){
        var html = e.html();
        if(html.indexOf("${")!=-1){
          newes.push(e);
        }
      }
    }

    return newes;
  }


   //获取表达式变量
  function getExpVars(html){
    var expvars = [];
    var str = html;

    while(true){
        var start = str.indexOf("${");
        if(start==-1 ){
          break;
        }
        var end = str.indexOf("}");
        expvars.push(str.substring(start,end+1));
        str = str.substring(end+1);
    }
    return expvars;
  }

  //获取表达式
  function getExps(element){
    var es = $("body").find("*");
    var exps = [];
    for(var i=0;i<es.length;i++){
      var f = $(es[i]);
      //元素不在子for循环里面
      if(!isInnerFors(element,f)){
        if(f.children().length==0 && f.html().indexOf('${')!=-1){
          exps.push({"element":f,"express":f.html()});
        }
      }
    } 
    return exps;
  }

  //获取某个元素的if表达式，包括自身的表达式
  function getIfs(element){
    var ifes = element.find("[if]");
    if(typeof(element.attr("if"))!="undefined"){
      ifes.push(element);
    }
    var ifs = [];
    for(var i=0;i<ifes.length;i++){
      var e = $(ifes[i]);
      //元素不在子for循环里面
      if(!isInnerFors(element,e)){
        var express = e.attr("if");
        ifs.push({"element":e,"express":express});
      }
      // console.log(express);
      // var r = eval(express);
      // if(r){
      //   e.show();
      // }else{
      //   e.hide();
      // }
    }
    return ifs;
  }

  //获取fors列表,只获取第一级for循环
  function getFors(element,del){
    var fors = [];
    //fors
    var fs = element.find("[for]");
    for(var i=0;i<fs.length;i++){
      var f = $(fs[i]);
      var parents = f.parents();
      var find = false;
      for(var j=0;j<parents.length;j++){
        var p = $(parents[j]);
        if(p.get(0)!=element.get(0) && typeof(p.attr("for"))!="undefined"){
          find = true;
          break;
        }
      }
      if(!find){
        var parent = f.parent();
        var beforeElement = f.prev();
        if(beforeElement.length==0){
          beforeElement = null;
        }
        var afterElement = f.next();
        if(afterElement.length==0){
          afterElement = null;
        }
        fors.push({"element":f,"res":[],"parent":parent,"before":beforeElement,"after":afterElement});
        if(del){
          f.remove();
        }
      }
    }
   
    return fors;
  }

  

  //获取某个元素的属性表达式，包括自身的表达式
  function getAttrExps(element){
    var es = element.find("*");
    
    es.push(element);
    
    var attrExps=[];

    for(var i=0;i<es.length;i++){
      var e = $(es[i]);

      //元素是否在子for循环里面
      if(!isInnerFors(element,e)){
        var exs = [];
        var list = e.get(0).attributes;
        for(var j = 0 ; j < list.length ; j++){
          var name = list[j].name;
          var value = list[j].value;
          if(value.indexOf("${")!=-1){
            exs.push({"name":name,"value":value});
          }
        }
        
        if(exs.length>0){
          attrExps.push({"element":e,attrs:exs});
        }
      }

    }


    return attrExps;
  }



  function observer(changes){
    changes.forEach(function(change, i){
       
        var changeName = change.name;
        var modelElement = modelMapping[changeName];
        if(modelElement){
           var value = change.object[changeName];
           setElementValue(modelElement,value);
        }

        parseContent();
    });
  };

  //元素是否在root的下层for 循环里面,第一级是root
  function isInnerFors(root,element){
      var parents = element.parents();
      var isInner = false;
      for(var j=0;j<parents.length;j++){
        var p = $(parents[j]);
        if(p==root){
          break;
        }
        if(typeof(p.attr("for"))!="undefined"){
          isInner = true;
          break;
        }
      }
      return isInner;
  }

  var models = $("[model]");
  for(var i=0;i<models.length;i++){
    var e = $(models[i]);
    var model = e.attr("model");
    if(e.is('input')){
      (function(m){
      e.bind("change",function(){
        var v = $(this).val();
        $$[m]=v;
        updateExpression();
      });})(model);
    }
    
    $$[model]="";
    modelMapping[model]=e;
  }

  var es = $("[onclick]");
  for(var i=0;i<es.length;i++){
    var e = $(es[i]);
    var onclick = e.attr("onclick");
    if(onclick && onclick.indexOf("$$")==-1){
      e.attr("onclick","");
      e.bind("click",function(){
        eval("$$."+onclick);
      });
    }
  }

  if($$.controller){
    $$.controller();
  }


  //fors
  fors = getFors($("body"),true);

  //表达式
  exps = getExps($("body"));
     

  //if表达式
  ifs = getIfs($("body"));

  attrExps=getAttrExps($("body"));
  

  parseContent();
  Object.observe($$, observer);

});