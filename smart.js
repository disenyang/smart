var $$={};
var fors=[];
var exps =[];
var ifs=[];
$(function(){
	var modelMapping = {};
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
      console.log(typeof($$[p]));
      if(typeof($$[p])!='function'){
        if(typeof($$[p])=='undefined'){
          eval("window."+p+" = null;");
        }else if(typeof($$[p])=='string'){
          eval("window."+p+" = '"+$$[p]+"';");
        }else {
          eval("window."+p+" = $$['"+p+"'];");
        }
        console.log("var window."+p+" = '"+$$[p]+"';");
      }
    }
  }

  //if表达式解析
  function ifParse(ifs,vars){
    if(vars){
      eval(vars);
    }
    for(var i=0;i<ifs.length;i++){
      var e = ifs[i].element;
      var express = ifs[i].express;
      console.log(express);
      var r = eval(express);
      if(r){
        e.show();
      }else{
        e.hide();
      }
    }
  }

  //更新表达式
  function updateExpression(){
    vars();

    for(var i=0;i<fors.length;i++){
      var f= fors[i];
    
      var forElemnet = f.element;
      for(var j=0;j<f.res.length;j++){
        var re = f.res[j];
        re.remove();
      }
      f.res=[];
      forParse(f);
    }
    ifParse(ifs);
    for(var i=0;i<exps.length;i++){
      var f= exps[i];
      var element = f.element;
      var html = parseExp(f.express);
      element.html(html);
    }
    
  }

  //解析表达式
  function parseExp(html,vars){
      if(vars){
        eval(vars);
      }
      var exps = getExps(html);
      for(var j=0;j<exps.length;j++){
        var exp = exps[j];
        var ei = exp.substring(2,exp.indexOf("}"));
        var value = eval(ei);
        console.log(html);
        html= replaceAll(html,exp,value);
        console.log(html);
      }
      return html;
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

  //获取表达式
  function getExps(html){
    var exps = [];

   var str = html;
    
    while(true){
      var start = str.indexOf("${");
      
      if(start==-1 ){
        break;
      }

      var end = str.indexOf("}");

      exps.push(str.substring(start,end+1));

     
     
      str = str.substring(end+1);
       
     
    }
    
    return exps;

  }

  //解析for循环
  function forParse(f){
    var forElemnet = f.element;
    var forExp = forElemnet.attr("for");
    var ss = forExp.split(" in ");
    var item = ss[0];
    
    var items = ss[1];
    var html = forElemnet.html();
    
   

    var rows = $$[items];
    var parent = f.parent;
    var beforeElement = f.before;
    var afterElement = f.after;
    var index = forElemnet.index();

    
    var lastElement = null;
    for(var i=0;i<rows.length;i++){
      var cloneElement = forElemnet.clone();
      var row = rows[i];
      
      if(beforeElement.length>0){
        var mvars = "var "+item+"="+(items+"["+i+"]")+";var index="+i+";";
        eval(mvars);
        var phtml = parseExp(html,mvars);
        cloneElement.html(phtml);
        f.res.push(cloneElement);
        ifParse(getIfs(cloneElement),mvars);
        if(lastElement==null){
          beforeElement.after(cloneElement);
        }else{
          lastElement.after(cloneElement);
        }
      }

      lastElement = cloneElement;
      
    }

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
      var express = e.attr("if");
      ifs.push({"element":e,"express":express});

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



	function observer(changes){
    changes.forEach(function(change, i){
        console.log('what property changed? ' + change.name);
        console.log('how did it change? ' + change.type);
        console.log('whats the current value? ' + change.object[change.name]);
        console.log(change); // 所有变化
        var changeName = change.name;
        var modelElement = modelMapping[changeName];
        if(modelElement){
        	 var value = change.object[changeName];
        	 setElementValue(modelElement,value);
           
    	  }
        updateExpression();
    });
  };

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
  var fs = $("[for]");
  for(var i=0;i<fs.length;i++){
    var f = $(fs[i]);
    var parent = f.parent();
    var beforeElement = f.prev();
    var afterElement = f.next();
    fors.push({"element":f,"res":[],"parent":parent,"before":beforeElement,"after":afterElement});
  }
  fs.remove();

  //表达式
  var es = $("body").find("*");
  for(var i=0;i<es.length;i++){
    var f = $(es[i]);

    if(f.children().length==0 && f.html().indexOf('${')!=-1){
      exps.push({"element":f,"express":f.html()});
    }
  } 

  //if表达式
  ifs = getIfs($("body"));
  

  updateExpression();
  Object.observe($$, observer);

});