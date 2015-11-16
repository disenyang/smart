var fs = require('fs');

var deleteFile=false

//格式化日期
function formatDate(date,format){ 
	var o = { 
		"M+" : date.getMonth()+1, //month 
		"d+" : date.getDate(), //day 
		"h+" : date.getHours(), //hour 
		"m+" : date.getMinutes(), //minute 
		"s+" : date.getSeconds(), //second 
		"q+" : Math.floor((date.getMonth()+3)/3), //quarter 
		"S" : date.getMilliseconds() //millisecond 
	} 

	if(/(y+)/.test(format)) { 
		format = format.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	} 

	for(var k in o) { 
	if(new RegExp("("+ k +")").test(format)) { 
	format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
	} 
	} 
	return format; 
} 

//读取文件
function readFile(file){
	var content;

    fs.readFile(file, {encoding:'utf-8'},function(err, data){  
        if(err)
            console.log("读取文件fail " + err);  
        else{
            // 读取成功时  
            // 输出字节数组  
           
            // 把数组转换为gbk中文  
            //var str = iconv.decode(data, 'gbk');  
            //console.log("///////"+str); 
            content = str;
        }
    });  
    return content;
}  

//写入文件
function writeFile(file,content){
    // 测试用的中文  
    // appendFile，如果文件不存在，会自动创建新文件  
    // 如果用writeFile，那么会删除旧文件，直接写新文件  
    fs.writeFile(file, content, function(err){  
        if(err)
            console.log("fail " + err);  
        else
            console.log("写入文件ok");  
    });
}
function getTabString(count){
	var str = "";
	for(var i=0;i<count;i++){
		str = str+"\t";
	}
	return str;
}

//首字母大写
function firstUpp(str){
	str = str.toLowerCase();     
    return str.replace(/\b(\w)|\s(\w)/g, function(m){  
        return m.toUpperCase();  
    });   
}
function getServiceName(name){
	return name+"Service";
}

//路由
function getRouterJs(config){
	var str = "";

	//列表路由
	str=str+"\n"+getTabString(1)+"//"+config.title+"路由配置";
	str=str+"\n"+getTabString(1)+"$stateProvider";
    str=str+"\n"+getTabString(2)+".state('"+config.rootState+"."+config.name+"', {";
    str=str+"\n"+getTabString(3)+"abstarct: true,";
    str=str+"\n"+getTabString(3)+"url: '/"+config.name+"',";
    str=str+"\n"+getTabString(3)+"template:'<div ui-view pos=\""+config.rootState+"."+config.name+"\"></div>'";
    str=str+"\n"+getTabString(1)+"});";

	//列表路由
	str=str+"\n"+getTabString(1)+"//"+config.title+"列表路由配置";
	str=str+"\n"+getTabString(1)+"$stateProvider";
    str=str+"\n"+getTabString(2)+".state('"+config.rootState+"."+config.name+".list', {";
    str=str+"\n"+getTabString(3)+"abstarct: true,";
    str=str+"\n"+getTabString(3)+"url: '/list',";
    str=str+"\n"+getTabString(3)+"templateUrl:__uri('/"+config.rootWebPath+"/"+config.name+"/list/list.html'),";
   	str=str+"\n"+getTabString(3)+"custom: {"
    str=str+"\n"+getTabString(4)+"crumb:\""+config.title+"\"";
    str=str+"\n"+getTabString(3)+"},";
    str=str+"\n"+getTabString(3)+"controller: '"+firstUpp(config.name)+"ListCtrl'";
    str=str+"\n"+getTabString(1)+"});";
	
	//保存页面路由
	str=str+"\n"+getTabString(1)+"$stateProvider";
    str=str+"\n"+getTabString(2)+".state('"+config.rootState+"."+config.name+".new', {";
    str=str+"\n"+getTabString(3)+"abstarct: true,";
    str=str+"\n"+getTabString(3)+"url: '/new',";
    str=str+"\n"+getTabString(3)+"templateUrl:__uri('/"+config.rootWebPath+"/"+config.name+"/setting/setting.html'),";
    str=str+"\n"+getTabString(3)+"custom: {"
    str=str+"\n"+getTabString(4)+"crumb:\"新建"+config.title+"\"";
    str=str+"\n"+getTabString(3)+"},";
    str=str+"\n"+getTabString(3)+"controller: '"+firstUpp(config.name)+"SaveCtrl'";
    str=str+"\n"+getTabString(1)+"});";


	//复制新建路由
	str=str+"\n"+getTabString(1)+"$stateProvider";
    str=str+"\n"+getTabString(2)+".state('"+config.rootState+"."+config.name+".copy', {";
    str=str+"\n"+getTabString(3)+"abstarct: true,";
    str=str+"\n"+getTabString(3)+"url: '/copy"+"/:"+config.name+firstUpp(config.pk)+"',";
    str=str+"\n"+getTabString(3)+"templateUrl:__uri('/"+config.rootWebPath+"/"+config.name+"/setting/setting.html'),";
    str=str+"\n"+getTabString(3)+"custom: {"
    str=str+"\n"+getTabString(4)+"crumb:\"复制新建"+config.title+"\"";
    str=str+"\n"+getTabString(3)+"},";
    str=str+"\n"+getTabString(3)+"controller: '"+firstUpp(config.name)+"SaveCtrl'";
    str=str+"\n"+getTabString(1)+"});";

	//修改页面路由
	str=str+"\n"+getTabString(1)+"$stateProvider";
    str=str+"\n"+getTabString(2)+".state('"+config.rootState+"."+config.name+".update', {";
    str=str+"\n"+getTabString(3)+"abstarct: true,";
    str=str+"\n"+getTabString(3)+"url: '/update"+"/:"+config.name+firstUpp(config.pk)+"',";
    str=str+"\n"+getTabString(3)+"templateUrl:__uri('/"+config.rootWebPath+"/"+config.name+"/setting/setting.html'),";
    str=str+"\n"+getTabString(3)+"custom: {"
    str=str+"\n"+getTabString(4)+"crumb:\"修改"+config.title+"\"";
    str=str+"\n"+getTabString(3)+"},";
    str=str+"\n"+getTabString(3)+"controller: '"+firstUpp(config.name)+"SaveCtrl'";
    str=str+"\n"+getTabString(1)+"});";


	//详情页面路由
	str=str+"\n"+getTabString(1)+"$stateProvider";
    str=str+"\n"+getTabString(2)+".state('"+config.rootState+"."+config.name+".detail', {";
    str=str+"\n"+getTabString(3)+"abstarct: true,";
    str=str+"\n"+getTabString(3)+"url: '/detail/:"+config.name+firstUpp(config.pk)+"',";
    str=str+"\n"+getTabString(3)+"templateUrl:__uri('/"+config.rootWebPath+"/"+config.name+"/detail/detail.html'),";
    str=str+"\n"+getTabString(3)+"custom: {"
    str=str+"\n"+getTabString(4)+"crumb:\""+config.title+"详情\"";
    str=str+"\n"+getTabString(3)+"},";
    str=str+"\n"+getTabString(3)+"controller: '"+firstUpp(config.name)+"DetailCtrl'";
    str=str+"\n"+getTabString(1)+"});";

	return str; 
}


//服务js
function getServiceJs(config){

	var str = "/**"
				+"\n * @file "+config.title+"服务"
				+"\n * @author:"+config.author
				+"\n * @date:"+formatDate(new Date(),"yyyy-MM-dd")
				+"\n */";
	str=str+"\n"+getTabString(0)+"angular.module('cms').factory('"+getServiceName(config.name)+"', function($http, $q,Constant){";
    str=str+"\n"+getTabString(1)+"return {";

    var addDou = false;

    if(config.services.search){
        str=str+"\n"+getTabString(2)+"//获取"+config.title+"列表";
        str=str+"\n"+getTabString(2)+"get"+firstUpp(config.name)+"List: function(params){";

        str=str+"\n"+getTabString(3)+"var url = '"+config.services.search.url+"';";

        str=str+"\n"+getTabString(3)+"var deferred = $q.defer();";

         str=str+"\n"+getTabString(3)+"$http.post(url, params)";
        str=str+"\n"+getTabString(4)+".success(function(json){";

        str=str+"\n"+getTabString(5)+"deferred.resolve(json);";
        str=str+"\n"+getTabString(3)+"})";

        str=str+"\n"+getTabString(3)+"return deferred.promise;";
        str=str+"\n"+getTabString(2)+"}";
        addDou = true;	
    }

    if(config.services.get){
        if(addDou){
            str=str+",";
        }
        str=str+"\n"+getTabString(2)+"//获取"+config.title+"详情";
        str=str+"\n"+getTabString(2)+"get"+firstUpp(config.name)+": function("+config.pk+"){";

        str=str+"\n"+getTabString(3)+"var url = '"+config.services.get.url+"';";

        str=str+"\n"+getTabString(3)+"var deferred = $q.defer();";

         str=str+"\n"+getTabString(3)+"$http.post(url, {"+config.pk+":"+config.pk;
        str=str+"\n"+getTabString(3)+"})";
        str=str+"\n"+getTabString(4)+".success(function(json){";

        str=str+"\n"+getTabString(5)+"deferred.resolve(json);";
        str=str+"\n"+getTabString(3)+"})";

        str=str+"\n"+getTabString(3)+"return deferred.promise;";
        str=str+"\n"+getTabString(2)+"}";
        addDou = true;  
    }

    if(config.services.save){
        if(addDou){
            str=str+",";
        }
        str=str+"\n"+getTabString(2)+"//保存"+config.title;
        str=str+"\n"+getTabString(2)+"save"+firstUpp(config.name)+": function("+config.name+"){";

        str=str+"\n"+getTabString(3)+"var url = '"+config.services.save.url+"';";

        str=str+"\n"+getTabString(3)+"var deferred = $q.defer();";

         str=str+"\n"+getTabString(3)+"$http.post(url,"+config.name+")";
        str=str+"\n"+getTabString(4)+".success(function(json){";

        str=str+"\n"+getTabString(5)+"deferred.resolve(json);";
        str=str+"\n"+getTabString(3)+"})";

        str=str+"\n"+getTabString(3)+"return deferred.promise;";
        str=str+"\n"+getTabString(2)+"}";
        addDou = true;  
    }

    if(config.services.update){
        if(addDou){
            str=str+",";
        }
        str=str+"\n"+getTabString(2)+"//更新"+config.title;
        str=str+"\n"+getTabString(2)+"update"+firstUpp(config.name)+": function("+config.name+"){";

        str=str+"\n"+getTabString(3)+"var url = '"+config.services.update.url+"';";

        str=str+"\n"+getTabString(3)+"var deferred = $q.defer();";

         str=str+"\n"+getTabString(3)+"$http.post(url, "+config.name+")";
        str=str+"\n"+getTabString(4)+".success(function(json){";

        str=str+"\n"+getTabString(5)+"deferred.resolve(json);";
        str=str+"\n"+getTabString(3)+"})";

        str=str+"\n"+getTabString(3)+"return deferred.promise;";
        str=str+"\n"+getTabString(2)+"}";
        addDou = true;  
    }

    if(config.services.delete){
        if(addDou){
            str=str+",";
        }
        str=str+"\n"+getTabString(2)+"//删除"+config.title;
        str=str+"\n"+getTabString(2)+"delete"+firstUpp(config.name)+": function("+config.pk+"){";

        str=str+"\n"+getTabString(3)+"var url = '"+config.services.delete.url+"';";

        str=str+"\n"+getTabString(3)+"var deferred = $q.defer();";

         str=str+"\n"+getTabString(3)+"$http.post(url, {"+config.pk+":"+config.pk;
        str=str+"\n"+getTabString(3)+"})";
        str=str+"\n"+getTabString(4)+".success(function(json){";

        str=str+"\n"+getTabString(5)+"deferred.resolve(json);";
        str=str+"\n"+getTabString(3)+"})";

        str=str+"\n"+getTabString(3)+"return deferred.promise;";
        str=str+"\n"+getTabString(2)+"}";
        addDou = true;  
    }

    str=str+"\n"+getTabString(1)+"}";

	str=str+"\n"+getTabString(0)+"});";

	return str			
}

//控制器js
function getSaveControllerJs(config){

	var columns = config.columns;
	var str = "/**"
			+"\n * @file "+config.title+"保存控制器"
			+"\n * @author:"+config.author
			+"\n * @date:"+formatDate(new Date(),"yyyy-MM-dd")
			+"\n */";

	str=str+"\n\n//保存页面controller";
	str=str+"\nangular.module('"+config.angularModel+"').controller('"+firstUpp(config.name)+"SaveCtrl', function($stateParams,$scope,$rootScope,"+getServiceName(config.name)+",Constant,Dialog,Upload,$filter){";


    str=str+"\n"+getTabString(1)+"//发送保存请求";
    str=str+"\n"+getTabString(1)+"function sendSaveRequest(){";



    str=str+"\n"+getTabString(2)+""+getServiceName(config.name)+".save"+firstUpp(config.name)+"($scope."+config.name+")";
    str=str+"\n"+getTabString(3)+".then(function(json){";
    str=str+"\n"+getTabString(4)+" $rootScope.back();";

    str=str+"\n"+getTabString(3)+"});";
    str=str+"\n"+getTabString(1)+"}";

    str=str+"\n"+getTabString(1)+"//发送获取详情请求";

    str=str+"\n"+getTabString(1)+"function sendGetRequest("+config.pk+"){";



    str=str+"\n"+getTabString(2)+""+getServiceName(config.name)+".get"+firstUpp(config.name)+"("+config.pk+")";
    str=str+"\n"+getTabString(3)+".then(function(json){";
    str=str+"\n"+getTabString(4)+"var result = json.result;";
    str=str+"\n"+getTabString(4)+"$scope."+config.name+" = result.data;";
    str=str+"\n"+getTabString(3)+"});";
    str=str+"\n"+getTabString(1)+"}";

  	
    str=str+"\n"+getTabString(1)+"var defaultForm = {";
    str=str+"\n"+getTabString(3)+"valid: true,";
    str=str+"\n"+getTabString(3)+"errors: {";

    var start=false;
     
    for(var i=0;i<columns.length;i++){
    	var column  = columns[i];
    	if(column.required){
	    	if(start){
	    		str=str+",";
	    	}
	    	str=str+"\n"+getTabString(4)+column.name+": {"
	    	str=str+"\n"+getTabString(5)+"require:false";
	    	str=str+"\n"+getTabString(4)+"}";
	    	start = true;
    	}
    }

    str=str+"\n"+getTabString(3)+"}";
    str=str+"\n"+getTabString(1)+"};";

    str=str+"\n"+getTabString(1)+"//检查输入项";
    str=str+"\n"+getTabString(1)+"function check(){";
    str=str+"\n"+getTabString(2)+"$scope.errMsg = '';";
    str=str+"\n"+getTabString(2)+"$scope.form = angular.copy(defaultForm);";

    for(var i=0;i<columns.length;i++){
    	var column  = columns[i];
    	if(column.required){
	    	str=str+"\n"+getTabString(2)+"if(!$scope."+config.name+"."+column.name+"){";
	        str=str+"\n"+getTabString(3)+"$scope.form.errors."+column.name+".require = true;";
	        str=str+"\n"+getTabString(3)+"$scope.form.valid = false;";
	        str=str+"\n"+getTabString(2)+"}";
    	}
    }
    str=str+"\n"+getTabString(1)+"}";

    str=str+"\n"+getTabString(1)+"//上传文件";
    str=str+"\n"+getTabString(1)+"$scope.upload = function($files, $rejectedFiles, type){";
    str=str+"\n"+getTabString(2)+"if(!($files && $files.length > 0)){";
    str=str+"\n"+getTabString(3)+"return;";
    str=str+"\n"+getTabString(2)+"}";

    str=str+"\n"+getTabString(2)+"$scope.files = $files;";
    str=str+"\n"+getTabString(2)+"var paramsJson = {\"picPath\":\"/content/original/\",";
    str=str+"\n"+getTabString(3)+"\"maxSize\":\"30720\",";
    str=str+"\n"+getTabString(3)+"\"picType\":\".jpg\",";
    str=str+"\n"+getTabString(3)+"\"width\":\"640\",";
    str=str+"\n"+getTabString(2)+"\"height\":\"246\"";
    str=str+"\n"+getTabString(2)+"};";


    for(var i=0;i<columns.length;i++){
    	var column  = columns[i];

    	if(column.dataType=="image"){
		    str=str+"\n"+getTabString(2)+"Upload.upload({";
		    str=str+"\n"+getTabString(3)+"url: '/content-view/fileUpload/file?paramsJson='+JSON.stringify(paramsJson),";
		    str=str+"\n"+getTabString(3)+"fileFormDataName: 'myfiles',";
		    str=str+"\n"+getTabString(3)+"file: $files[0],";
		    str=str+"\n"+getTabString(2)+"sendFieldsAs: 'json'";
		    str=str+"\n"+getTabString(2)+"})";
		    str=str+"\n"+getTabString(2)+".success(function(json){";
		    str=str+"\n"+getTabString(3)+"$scope."+config.name+"."+column.name+" = json.result.data;";
		    str=str+"\n"+getTabString(2)+"});";
		    str=str+"\n"+getTabString(1)+"}";


		    str=str+"\n"+getTabString(1)+"//删除图片";
		    str=str+"\n"+getTabString(2)+"$scope.deleteUpload = function(e, type){";
		    str=str+"\n"+getTabString(3)+"e.stopPropagation();";
		    str=str+"\n"+getTabString(3)+"$scope."+config.name+"."+column.name+" = '';";
		    str=str+"\n"+getTabString(2)+"};";
		    break;
		}
    }

    str=str+"\n"+getTabString(1)+"//保存信息";
    str=str+"\n"+getTabString(1)+"$scope.save = function(){";
    str=str+"\n"+getTabString(2)+"check();";
    str=str+"\n"+getTabString(2)+"if($scope.form.valid){";
                
    str=str+"\n"+getTabString(3)+"sendSaveRequest();";
    str=str+"\n"+getTabString(2)+"}";
    str=str+"\n"+getTabString(1)+"};";
    str=str+"\n"+getTabString(1)+"$scope."+config.name+"={};";
    str=str+"\n"+getTabString(1)+"if($stateParams."+config.name+firstUpp(config.pk)+"){";
    str=str+"\n"+getTabString(2)+"//是修改页面";
   	str=str+"\n"+getTabString(2)+"sendGetRequest($stateParams."+config.name+firstUpp(config.pk)+");";
    str=str+"\n"+getTabString(1)+"}";
    
    str=str+"\n"+getTabString(0)+"});";
	return str;
}

//控制器js
function getDetailControllerJs(config){
	var str = "/**"
			+"\n * @file "+config.title+"详情控制器"
			+"\n * @author:"+config.author
			+"\n * @date:"+formatDate(new Date(),"yyyy-MM-dd")
			+"\n */";
	str=str+"\n\n//详情页面controller";
	str=str+"\nangular.module('"+config.angularModel+"').controller('"+firstUpp(config.name)+"DetailCtrl', function($stateParams,$scope,$rootScope,"+getServiceName(config.name)+",Constant,Dialog){";
    str=str+"\n"+getTabString(1)+"function sendGetRequest("+config.pk+"){";


    str=str+"\n"+getTabString(2)+""+getServiceName(config.name)+".get"+firstUpp(config.name)+"("+config.pk+")";
    str=str+"\n"+getTabString(3)+".then(function(json){";
    str=str+"\n"+getTabString(4)+"var result = json.result;";
    str=str+"\n"+getTabString(4)+"$scope."+config.name+" = result.data;";
    str=str+"\n"+getTabString(3)+"});";
    str=str+"\n"+getTabString(1)+"}";
    str=str+"\n"+getTabString(1)+"sendGetRequest($stateParams."+ config.name+firstUpp(config.pk)+");";
	str=str+"\n});";
	return str;
}

//控制器js
function getListControllerJs(config){
	var columns = config.columns;
    var searchColumns = config.listPage.searchColumns;
	var str = "/**"
				+"\n * @file "+config.title+"列表控制器"
				+"\n * @author:"+config.author
				+"\n * @date:"+formatDate(new Date(),"yyyy-MM-dd")
				+"\n */";

	str=str+"\n\n//查询controller";
	str=str+"\nangular.module('"+config.angularModel+"').controller('"+firstUpp(config.name)+"ListCtrl', function($stateParams,$scope,$rootScope,"+getServiceName(config.name)+",Constant,Dialog){";
    if(config.listPage.searchTabBarColumn){
        var column = getColumn(columns,config.listPage.searchTabBarColumn);
        str=str+"\n"+getTabString(1)+"$scope.tabs= [";
        for(var j=0;j<column.values.length;j++){
            var o = column.values[j];
            if(j!=0){
                str=str+",";
            }
            str=str+"\n"+getTabString(2)+"{\"fullKey\":\"manage.ryg.home\",";
            str=str+"\n"+getTabString(2)+"\"title\":\""+o.v+"\"}";
        }
        str=str+"\n"+getTabString(1)+"];";
    }


    str=str+"\n"+getTabString(1)+"$scope.pageSize = Constant.pageSize;";
    str=str+"\n"+getTabString(1)+"$scope.currentPage = 1;";

    str=str+"\n"+getTabString(1)+"$scope.list = [];";

    str=str+"\n"+getTabString(1)+"function sendRequest(){";

    str=str+"\n"+getTabString(2)+"var params = angular.merge({}, $scope.params, {";
    str=str+"\n"+getTabString(3)+"currentpage: $scope.currentPage,";
    str=str+"\n"+getTabString(3)+"pageSize: $scope.pageSize";
    if(searchColumns){
        //参数
        for(var i=0;i<searchColumns.length;i++){
    		var name = searchColumns[i];
    		var column = getColumn(columns,name);
    		if(column!=null){
    			str=str+",";
    			str=str+"\n"+getTabString(3)+column.name+": $scope."+column.name;
    		}
    	}
    }

    str=str+"\n"+getTabString(2)+"});";

    str=str+"\n"+getTabString(2)+""+getServiceName(config.name)+".get"+firstUpp(config.name)+"List(params)";
    str=str+"\n"+getTabString(3)+".then(function(json){";
    str=str+"\n"+getTabString(4)+"var result = json.result;";
    str=str+"\n"+getTabString(4)+"$scope.list = result.data;";
    str=str+"\n"+getTabString(4)+"$scope.total = result.page.totalCount;";
    str=str+"\n"+getTabString(3)+"});";
    str=str+"\n"+getTabString(1)+"}";


    str=str+"\n"+getTabString(1)+"$scope.search=function(){";
    str=str+"\n"+getTabString(2)+"sendRequest();";
    str=str+"\n"+getTabString(1)+"}";

    str=str+"\n"+getTabString(1)+"$scope.delete = function (id,index) {";
    str=str+"\n"+getTabString(2)+"Dialog.confirm('提示', '您确认要删除该条记录吗？', [";
    str=str+"\n"+getTabString(3)+"{";
    str=str+"\n"+getTabString(4)+"text: '取消',";
    str=str+"\n"+getTabString(4)+"isImportant: true";
    str=str+"\n"+getTabString(3)+"},";
    str=str+"\n"+getTabString(3)+"{";
    str=str+"\n"+getTabString(4)+"text: '确认',";
   
    str=str+"\n"+getTabString(4)+"clickFn: function(){";
    str=str+"\n"+getTabString(4)+""+getServiceName(config.name)+".delete"+firstUpp(config.name)+"("+config.pk+")";
    str=str+"\n"+getTabString(4)+".then(function(json){";
    str=str+"\n"+getTabString(5)+"$scope.list.splice(index,1);";
    str=str+"\n"+getTabString(3)+"});";
                        
    str=str+"\n"+getTabString(3)+"}";
    str=str+"\n"+getTabString(3)+"}]);";
    str=str+"\n"+getTabString(1)+"};";

    str=str+"\n"+getTabString(1)+"$scope.pageChangeHandler = function(){";
    str=str+"\n"+getTabString(2)+"sendRequest();";
    str=str+"\n"+getTabString(1)+"};";
    str=str+"\n"+getTabString(1)+"sendRequest();";
	str=str+"\n});";
	return str;
}



//获取保存页面的html
function getSaveHtml(config){
	var str = "<!--保存"+config.title+",author:"+config.author+",date:"+formatDate(new Date(),"yyyy-MM-dd")+"-->\n<div class=\"setting-area\">\n"
				+"\t<div class=\"container-fluid\">";
	var columns = config.columns;
    if(config.savePage.columns){

        var columnsDo = [];
        
    	var saveColumns = config.savePage.columns;
    	var tabCount = 2;
        if(!saveColumns){
            columnsDo = columns;
        }else{
            for(var i=0;i<saveColumns.length;i++){
                var name = saveColumns[i];
                var column = getColumn(columns,name);
                columnsDo.push(column);
            }
        }

    	for(var i=0;i<columnsDo.length;i++){
    		var column = columnsDo[i];
    		console.log(name+"//"+column)
    		if(column !=null){
    			str = str+"\n"+getTabString(tabCount)+"<div class=\"row\">"
    						+"\n"+getTabString(tabCount+1)+"<div class=\"col-md-5\">"+column.title+"：</div>";
    			var dataType = column.dataType;
    			if(!dataType){
    				dataType = "string";
    			}
    			console.log(dataType);
    			str = str+"\n"+getTabString(tabCount+1)+"<div class=\"col-md-10\">";
    			var modelName = config.name+"."+column.name;
    			if(!column.values){
    				if(dataType=="string"){
    					str = str+"\n"+getTabString(tabCount+2)+"<input "+(column.placeholder?"placeholder=\""+column.placeholder+"\"":"")+" class=\"form-control\" "+(column.maxLength?"max-length=\"36\"":"")+" type=\"text\" ng-model=\""+modelName+"\">";
    				}else if(dataType=="date"){
    					str = str+"\n"+getTabString(tabCount+2)+"<input class=\"form-control\" readonly ng-model=\""+modelName+"\" options=\"dateOptions\" date-range-picker>";
    				}else if(dataType=="image"){
    					str = str+"\n"+getTabString(tabCount+2)+"<div class=\"upload-btn\" ngf-select ngf-change=\"upload($files, $rejectedFiles)\" ngf-accept=\"'image/*'\">"
    	                										+"\n"+getTabString(tabCount+3)+"<img width=\"58\" height=\"58\" ng-if=\""+modelName+"\" ng-src=\"{{"+modelName+"}}\">"
    									                        +"\n"+getTabString(tabCount+3)+"<i class=\"cms-upload-delete\" ng-if=\"banner.picName\" ng-click=\"deleteUpload($event)\"></i>"
    									                    	+"\n"+getTabString(tabCount+2)+"</div>";
    				}else if(dataType=="int"){
                        str = str+"\n"+getTabString(tabCount+2)+"<input "+(column.placeholder?"placeholder=\""+column.placeholder+"\"":"")+" class=\"form-control\" "+(column.maxLength?"max-length=\"36\"":"")+" type=\"text\" ng-model=\""+modelName+"\">";
                    }
    			}else{
    				str = str+"\n"+getTabString(tabCount+2)+"<select class=\"form-control\" ng-model=\""+modelName+"\">";
    				for(var j=0;j<column.values.length;j++){
    					var o = column.values[j];
    					str = str+"\n"+getTabString(tabCount+3)+"<option value='"+o.k+"'>"+o.v+"</option>";
    				}
    				str = str+"\n"+getTabString(tabCount+2)+"</select>";
    			}


    			if(column.required){
    				str = str+"\n"+getTabString(tabCount+2)+"<div class=\"col-md alert-tip\" ng-if=\"form.errors."+column.name+".require\">";
                    str = str+"\n"+getTabString(tabCount+3)+(config.requiredMsg?config.requiredMsg:("请输入"+column.title));
            		str = str+"\n"+getTabString(tabCount+2)+"</div>";
    			}
    			str = str+"\n"+getTabString(tabCount+1)+"</div>";
    			str = str+"\n"+getTabString(tabCount)+"</div>";
    		}
    	}
    }else if(config.savePage.groups){
        var groups = config.savePage.groups;

        for(var i=0;i<groups.length;i++){
            var group = groups[i];
        
            var saveColumns = group.columns;
            var tabCount = 2;
            var name = group.name;
            str = str+"\n"+getTabString(tabCount)+"<div>｜"+name+"</div>";
            var rowColumn = group.rowColumn;
            if(typeof(rowColumn)=="undefined"){
                rowColumn = 1;
            }

            var titleClass = "col-md-5";
            var valueClass="col-md-10";
            if(rowColumn==2){
                valueClass = "col-md-8";
            }else if(rowColumn==3){
                titleClass = "col-md-5";
                valueClass = "col-md-3";
            }else if(rowColumn==4){
                titleClass = "col-md-5";
                valueClass = "col-md-3";
            }else if(rowColumn==5){
                titleClass = "col-md-5";
                valueClass = "col-md-3";
            }
           
            for(var j=0;j<saveColumns.length;j++){
                 
                var name = saveColumns[j];
                var column = getColumn(columns,name);
                
                if(column !=null){

                    if((j%rowColumn)==0 && j!=0 ){
                        str = str+"\n"+getTabString(tabCount)+"</div>";
                    }

                    if((j%rowColumn)==0){
                        str = str+"\n"+getTabString(tabCount)+"<div class=\"row\">"
                    }
                    str = str+"\n"+getTabString(tabCount+1)+"<div class=\""+titleClass+"\">"+column.title+"：</div>";
                    var dataType = column.dataType;
                    if(!dataType){
                        dataType = "string";
                    }
                    
                    str = str+"\n"+getTabString(tabCount+1)+"<div class=\""+valueClass+"\">";
                    var modelName = config.name+"."+column.name;
                    if(!column.values){
                        if(dataType=="string"){
                            str = str+"\n"+getTabString(tabCount+2)+"<input "+(column.placeholder?"placeholder=\""+column.placeholder+"\"":"")+" class=\"form-control\" "+(column.maxLength?"max-length=\"36\"":"")+" type=\"text\" ng-model=\""+modelName+"\">";
                        }else if(dataType=="date"){
                            str = str+"\n"+getTabString(tabCount+2)+"<input class=\"form-control\" readonly ng-model=\""+modelName+"\" options=\"dateOptions\" date-range-picker>";
                        }else if(dataType=="image"){
                            str = str+"\n"+getTabString(tabCount+2)+"<div class=\"upload-btn\" ngf-select ngf-change=\"upload($files, $rejectedFiles)\" ngf-accept=\"'image/*'\">"
                                                                    +"\n"+getTabString(tabCount+3)+"<img width=\"58\" height=\"58\" ng-if=\""+modelName+"\" ng-src=\"{{"+modelName+"}}\">"
                                                                    +"\n"+getTabString(tabCount+3)+"<i class=\"cms-upload-delete\" ng-if=\"banner.picName\" ng-click=\"deleteUpload($event)\"></i>"
                                                                    +"\n"+getTabString(tabCount+2)+"</div>";
                        }else if(dataType=="int"){
                            str = str+"\n"+getTabString(tabCount+2)+"<input "+(column.placeholder?"placeholder=\""+column.placeholder+"\"":"")+" class=\"form-control\" "+(column.maxLength?"max-length=\"36\"":"")+" type=\"text\" ng-model=\""+modelName+"\">";
                        }
                    }else{
                        str = str+"\n"+getTabString(tabCount+2)+"<select class=\"form-control\" ng-model=\""+modelName+"\">";
                        for(var k=0;k<column.values.length;k++){
                            var o = column.values[k];
                            str = str+"\n"+getTabString(tabCount+3)+"<option value='"+o.k+"'>"+o.v+"</option>";
                        }
                        str = str+"\n"+getTabString(tabCount+2)+"</select>";
                    }


                    if(column.required){
                        str = str+"\n"+getTabString(tabCount+2)+"<div class=\"col-md alert-tip\" ng-if=\"form.errors."+column.name+".require\">";
                        str = str+"\n"+getTabString(tabCount+3)+(config.requiredMsg?config.requiredMsg:("请输入"+column.title));
                        str = str+"\n"+getTabString(tabCount+2)+"</div>";
                    }
                    str = str+"\n"+getTabString(tabCount+1)+"</div>";

                    
                }
            }

           
            str = str+"\n"+getTabString(tabCount)+"</div>";
            
        }
    }

	str = str+"\n\t</div>";
	str = str +"\n\t<div  class=\"btns\">"
				+"\n\t\t<a class=\"cms-btn \" ng-click=\"back()\">返回</a>"
				+"\n\t\t<a class=\"cms-btn cms-btn-heavy\" ng-click=\"save()\">保存</a>"
				+"\n\t</div>";
	str = str+"\n</div>";
	return str;
}

//获取详细页面的html
function getDetailHtml(config){
	var str = "<!--"+config.title+"详情页面,author:"+config.author+",date:"+formatDate(new Date(),"yyyy-MM-dd")+"-->\n<div class=\"detail-area\">\n"
				+"\t<div class=\"container-fluid\">";
	var columns = config.columns;
	var detailColumns = config.detailPage.columns;
   
	var tabCount = 2;
    var columnsDo = [];
    if(!detailColumns){
        columnsDo = columns;
    }else{
        for(var i=0;i<detailColumns.length;i++){
            var name = detailColumns[i];
            var column = getColumn(columns,name);
            columnsDo.push(column);
        }
    }
	for(var i=0;i<columnsDo.length;i++){
		var column = columnsDo[i];
		if(column!=null){
			str = str+"\n"+getTabString(tabCount)+"<div class=\"row\">"
						+"\n"+getTabString(tabCount+1)+"<div class=\"col-md-5\">"+column.title+"：</div>";
			var dataType = column.dataType;
			if(!dataType){
				dataType = "string";
			}
			console.log(dataType);
			str = str+"\n"+getTabString(tabCount+1)+"<div class=\"col-md-10\">";
			var modelName = config.name+"."+column.name;
			if(!column.values){
				if(dataType=="image"){
					str = str+"\n"+getTabString(tabCount+2)+"<img width=\"58\" height=\"58\" ng-if=\""+modelName+"\" ng-src=\"{{"+modelName+"}}\">";
				}else{
					str = str+"\n"+getTabString(tabCount+2)+"{{"+modelName+"}}";
				}
			}else{
				for(var j=0;j<column.values.length;j++){
					var o = column.values[j];
					str = str +"\n"+getTabString(5)+"<label ng-if=\""+modelName+"=="+o.k+"\">"+o.v+"</label>";
				}
			}
			str = str+"\n"+getTabString(tabCount+1)+"</div>";
			str = str+"\n"+getTabString(tabCount)+"</div>";
		}
	}

	str = str+"\n\t</div>";
	str = str +"\n\t<div  class=\"btns\">"
				+"\n\t\t<a class=\"cms-btn \" ng-click=\"back()\">返回</a>"
				+"\n\t</div>";
	str = str+"\n</div>";
	return str;
}

function getColumn(columns,name){
	for(var i=0;i<columns.length;i++){
		var column = columns[i];
		if(column.name==name){
			return column;
		}
	}
	return null;
}

//获取列表页面
function getListHtml(config){
	var str = "<!--查询"+config.title+",author:"+config.author+",date:"+formatDate(new Date(),"yyyy-MM-dd")+"-->\n<div class=\"data-list\">\n"
				+"\t";
	var columns = config.columns;
	var listColumns = config.listPage.columns;
	var searchColumns = config.listPage.searchColumns;

    if(config.savePage){
    	str = str +"\n\t<div class=\"btns\">"
    				+"\n\t\t<a class=\"cms-btn cms-btn-heavy\" ui-sref=\""+config.rootState+"."+config.name+".new\">新建"+config.title+"</a>"
    				+"\n\t</div>"
    				+"\n\t\t<a class=\"cms-btn\" ng-click=\"back()\">返回</a>";
    }

	str = str +"\n\t<div class=\"container-fluid\">";
    if(searchColumns){
        str = str +"\n\t\t<div class=\"row\">";

        for(var i=0;i<searchColumns.length;i++){
    		var name = searchColumns[i];
    		var column = getColumn(columns,name);
    		tabCount=1;

    		if(column!=null){
    			str = str +"\n"+getTabString(3)+"<div class='col-md-3'>"+column.title+"</div>";
    			var dataType = column.dataType;
    			if(!dataType){
    				dataType = "string";
    			}
    			console.log(dataType);
    			str = str+"\n"+getTabString(3)+"<div class=\"col-md-5\">";
    			var modelName = column.name;
    			if(!column.values){
    				if(dataType=="string"){
    					str = str+"\n"+getTabString(4)+"<input class=\"form-control\" "+(column.maxLength?"max-length=\"36\"":"")+" type=\"text\" ng-model=\""+modelName+"\">";
    				}else if(dataType=="date"){
    					str = str+"\n"+getTabString(4)+"<input class=\"form-control\" readonly ng-model=\""+modelName+"\" options=\"dateOptions\" date-range-picker>";
    				}else if(dataType=="image"){
    					str = str+"\n"+getTabString(4)+"<div class=\"upload-btn\" ngf-select ngf-change=\"upload($files, $rejectedFiles)\" ngf-accept=\"'image/*'\">"
    	                										+"\n"+getTabString(3)+"<img width=\"58\" height=\"58\" ng-if=\""+modelName+"\" ng-src=\"{{"+modelName+"}}\">"
    									                        +"\n"+getTabString(3)+"<i class=\"cms-upload-delete\" ng-if=\"banner.picName\" ng-click=\"deleteUpload($event)\"></i>"
    									                    	+"\n"+getTabString(2)+"</div>";
    				}
    			}else{
    				str = str+"\n"+getTabString(4)+"<select class=\"form-control\" ng-model=\""+modelName+"\">";
    				str = str+"\n"+getTabString(5)+"<option value=''>请选择</option>";

    				for(var j=0;j<column.values.length;j++){
    					var o = column.values[j];
    					str = str+"\n"+getTabString(5)+"<option value='"+o.k+"'>"+o.v+"</option>";
    				}
    				str = str+"\n"+getTabString(4)+"</select>";
    			}
    			str = str+"\n"+getTabString(3)+"</div>";
    		}
    		
    	}
    	str = str +"\n\t\t</div>";
    }

    if(config.listPage.searchTabBarColumn){
        str = str +"\n\t\t<div class=\"row\">";
        str = str +"\n\t\t\t<mytab tabs=\"tabs\" base-key=\"baseKey\"></mytab>";
        
        str = str +"\n\t\t</div>";
    }

	str = str +"\n\t</div>";

    str = str +"\n"+"\t<table class=\"table table-hover\">"
	var tabCount = 2;
	str = str +"\n"+getTabString(2)+"<tr>";

     var columnsDo = [];
    if(!listColumns){
        columnsDo = columns;
    }else{
        for(var i=0;i<listColumns.length;i++){
            var name = listColumns[i];
            var column = getColumn(columns,name);
            columnsDo.push(column);
        }
    }


	for(var i=0;i<columnsDo.length;i++){
		
		var column = columnsDo[i];
		str = str +"\n"+getTabString(3)+"<td>"+column.title+"</td>";
	}
    if(config.operate){
	   str = str +"\n"+getTabString(3)+"<td>操作</td>";
    }
	str = str +"\n"+getTabString(2)+"</tr>";
	str = str +"\n"+getTabString(2)+"<tr ng-repeat=\"row in list\">";
	
   

	for(var i=0;i<columnsDo.length;i++){
		var column  = columnsDo[i];
	
		str = str +"\n"+getTabString(3)+"<td>";
		var tan = 4;
		if(i==0&&config.detailPage){
			str = str +"\n"+getTabString(4)+"<a ui-sref='"+config.rootState+"."+config.name+".detail({"+config.name+firstUpp(config.pk)+":row."+config.pk+"})'>";
			tan = 5;
		}
		

		if(!column.values){
            if(dataType=="image"){
                str = str+"\n"+"<img width=\"58\" height=\"58\"  ng-src=\"{{"+column.name+"}}\"></div>";
            }else{
                str = str +"\n"+getTabString(5)+"{{row."+column.name+"}}";
            }
			
		}else{
			for(var j=0;j<column.values.length;j++){
				var o = column.values[j];
				str = str +"\n"+getTabString(5)+"<label ng-if=\"row."+column.name+"=="+o.k+"\">"+o.v+"</label>";

			}
		}

		if(i==0&&config.detailPage){
			str = str +"\n"+getTabString(4)+"</a>";
		}

		str = str +"\n"+getTabString(3)+"</td>";
	}
    if(config.operate){
    	str = str +"\n"+getTabString(3)+"<td>"
    		+"\n"+getTabString(4)+"<a ui-sref=\""+config.rootState+"."+config.name+".copy({"+config.name+firstUpp(config.pk)+":row."+config.pk+"})\">复制新建</a>"
    		+"\n"+getTabString(4)+"<a ui-sref=\""+config.rootState+"."+config.name+".update({"+config.name+firstUpp(config.pk)+":row."+config.pk+"})\">修改</a>"
    		+"\n"+getTabString(4)+"<a ng-click=\"delete()\">删除</a>"
    		+"\n"+getTabString(3)+"</td>";
    }



	str = str +"\n"+getTabString(2)+"</tr>";

	str = str+"\n\t</table>";

	if(config.page){
	 str = str +"\n"+getTabString(1)+"<pagination total-items=\"total\" ng-model=\"currentPage\"";
            str = str +"\n"+getTabString(2)+"items-per-page=\"pageSize\" ";
            str = str +"\n"+getTabString(2)+"previous-text=\"上一页\" next-text=\"下一页\"";
            str = str +"\n"+getTabString(2)+"ng-change=\"pageChangeHandler()\" ></pagination>";
	}
	
	str = str+"\n</div>";
	return str;
}

//获取less 样式页面
function getLessContent(config){
	var columns = config.columns;
	var str = "/**"
				+"\n * @file "+config.title+"控制器"
				+"\n * @author:"+config.author
				+"\n * @date:"+formatDate(new Date(),"yyyy-MM-dd")
				+"\n */";
    str = str +"\n@import \"/public/styles/mixin.less\";";
    return str;
}

//执行创建
function executeCreate(configFile){
    fs.readFile(configFile, {encoding:'utf-8'},function(err, data){ 
        if(err)
            console.log("读取文件fail " + err);  
        else{
           
			var config =  JSON.parse(data); 
			var columns = config.columns;
			var name = config.name;
			var title = config.title;
			var filePath = config.filePath;
			var services = config.services;
			var saveService = services.save;
			var updateService = services.update;
			var deleteService = services.delete;
			var getService = services.get;
			var searchService = services.search;
			var folderPath = filePath+"/"+name;
			
			// 判断文件是否存在
			if(!fs.existsSync(folderPath)){
				fs.mkdirSync(folderPath, 0777);
			}


			//保存html
			if(config.savePage){

				var folderPath = filePath+"/"+name+"/setting";
				if(!fs.existsSync(folderPath)){
					fs.mkdirSync(folderPath, 0777);
				}
				var newOrSaveHtmlFile = folderPath+"/setting.html";
				fs.exists(newOrSaveHtmlFile, function( exists ){
					 if(!exists || deleteFile){
					     fs.open(newOrSaveHtmlFile, 'r', function(err, fd) {
		                        writeFile(newOrSaveHtmlFile,getSaveHtml(config));
		                        console.log("成功创建新建修改html");
		                   });
				 	 }else{
				 	 	console.error("创建新建修改html失败,文件已经存在!!!!!!!!!!");
				 	 }
				});
				//页面控制器
				var saveControllerJsFile = folderPath+"/setting.js";

				fs.exists(saveControllerJsFile, function( exists ){
					 if(!exists || deleteFile){
					     fs.open(saveControllerJsFile, 'r', function(err, fd) {
					     	console.log("///asasa//////"+saveControllerJsFile);
		                        writeFile(saveControllerJsFile,getSaveControllerJs(config));
		                        console.log("成功创建控制器js");
		                   });
				 	 }else{
				 	 	console.error("创建控制器js失败,文件已经存在!!!!!!!!!!");
				 	 }
				});

				//less 样式
			
				var settingLessJsFile = folderPath+"/setting.less";
				fs.exists(settingLessJsFile, function( exists ){
					 if(!exists || deleteFile){
					     fs.open(settingLessJsFile, 'r', function(err, fd) {
		                        writeFile(settingLessJsFile,getLessContent(config));
		                        console.log("成功创建less文件");
		                   });
				 	 }else{
				 	 	console.error("创建less失败,文件已经存在!!!!!!!!!!");
				 	 }
				});
			}
			
			//查询html
			if(config.listPage){

				var folderPath = filePath+"/"+name+"/list";
				if(!fs.existsSync(folderPath)){
					fs.mkdirSync(folderPath, 0777);
				}
				var listHtmlFile = folderPath+"/list.html";
				fs.exists(listHtmlFile, function( exists ){
					 if(!exists || deleteFile){
					     fs.open(listHtmlFile, 'r', function(err, fd) {
		                        writeFile(listHtmlFile,getListHtml(config));
		                        console.log("成功创建列表html");
		                   });
				 	 }else{
				 	 	console.error("创建列表html失败,文件已经存在!!!!!!!!!!");
				 	 }
				});

				var listControllerJsFile = folderPath+"/list.js";
				fs.exists(listControllerJsFile, function( exists ){
					 if(!exists || deleteFile){
					     fs.open(listControllerJsFile, 'r', function(err, fd) {
		                        writeFile(listControllerJsFile,getListControllerJs(config));
		                        console.log("成功创建控制器js");
		                   });
				 	 }else{
				 	 	console.error("创建控制器js失败,文件已经存在!!!!!!!!!!");
				 	 }
				});

				//less 样式
			
				var listLessJsFile = folderPath+"/list.less";
				fs.exists(listLessJsFile, function( exists ){
					 if(!exists || deleteFile){
					     fs.open(listLessJsFile, 'r', function(err, fd) {
		                        writeFile(listLessJsFile,getLessContent(config));
		                        console.log("成功创建less文件");
		                   });
				 	 }else{
				 	 	console.error("创建less失败,文件已经存在!!!!!!!!!!");
				 	 }
				});
			}

			//详情页面
			if(config.detailPage){
				var folderPath = filePath+"/"+name+"/detail";
				if(!fs.existsSync(folderPath)){
					fs.mkdirSync(folderPath, 0777);
				}

				var detailHtmlFile = folderPath+"/detail.html";
				fs.exists(detailHtmlFile, function( exists ){
					 if(!exists || deleteFile){
					     fs.open(detailHtmlFile, 'r', function(err, fd) {
		                        writeFile(detailHtmlFile,getDetailHtml(config));
		                        console.log("成功创建详情html");
		                   });
				 	 }else{
				 	 	console.error("创建详情html失败,文件已经存在!!!!!!!!!!");
				 	 }
				});
				var detailControllerJsFile = folderPath+"/detail.js";
				fs.exists(detailControllerJsFile, function( exists ){
					 if(!exists || deleteFile){
					     fs.open(detailControllerJsFile, 'r', function(err, fd) {
		                        writeFile(detailControllerJsFile,getDetailControllerJs(config));
		                        console.log("成功创建控制器js");
		                   });
				 	 }else{
				 	 	console.error("创建控制器js失败,文件已经存在!!!!!!!!!!");
				 	 }
				});
				var detailLessJsFile = folderPath+"/detail.less";
				fs.exists(detailLessJsFile, function( exists ){
					 if(!exists || deleteFile){
					     fs.open(detailLessJsFile, 'r', function(err, fd) {
		                        writeFile(detailLessJsFile,getLessContent(config));
		                        console.log("成功创建less文件");
		                   });
				 	 }else{
				 	 	console.error("创建less失败,文件已经存在!!!!!!!!!!");
				 	 }
				});
			}

			//路由
			var routerJsFile = config.routerFile;
			fs.exists(routerJsFile, function( exists ){
				 if(exists){
			 	 	
			 	 	fs.readFile(routerJsFile, {encoding:'utf-8'},function(err, data){ 
				        if(err)
				            console.log("读取文件fail " + err);  
				        else{
				        	console.log(data.length);
				        	var reqindex = data.indexOf("angular.module(");
				        	var index = data.lastIndexOf("});");
				        	
				        	var startStr = data.substr(0,index);
				        	startStr = startStr.substr(reqindex);
				        	

				        	var startReqStr = data.substr(0,reqindex);
				        	
				        	var reqStr = "";
				        	
				        	if(config.savePage){
				        		reqStr = reqStr+"require(\""+config.rootWebPath+"/"+config.name+"/setting\");"
				        	}
				        	if(config.listPage){
				        		reqStr = reqStr+ "\nrequire(\""+config.rootWebPath+"/"+config.name+"/list\");";
				        	}
				        	if(config.detailPage){
				        		reqStr = reqStr+ "\nrequire(\""+config.rootWebPath+"/"+config.name+"/detail\");";

				        	}

                            if(config.serviceIn){
                                reqStr = reqStr+ "\nrequire(\""+config.rootWebPath+"/"+config.name+"/services\");";
                            }else{
                                reqStr = reqStr+ "\nrequire(\""+config.serviceWebPath+"/"+config.name+"\");";

                            }
				        	reqStr = reqStr+ "\n";

				        	var content = getRouterJs(config);


				        	var endStr = data.substr(index);

				        	var str = startReqStr+reqStr+startStr+content+"\n"+endStr;
				        	writeFile(routerJsFile,str);
			        	}
			    	})
			 	 	
			 	 }
			});
			
			

			//服务
            if(config.serviceIn){
                folderPath = config.servicePath+"/"+name+"/services";
                if(!fs.existsSync(folderPath)){
                    fs.mkdirSync(folderPath, 0777);
                }
                var serviceJsFile = folderPath+"/services.js";
                fs.exists(serviceJsFile, function( exists ){
                     if(!exists || deleteFile){
                         fs.open(serviceJsFile, 'r', function(err, fd) {
                                writeFile(serviceJsFile,getServiceJs(config));
                                console.log("成功创建服务js");
                           });
                     }else{
                        console.error("创建服务js失败,文件已经存在!!!!!!!!!!");
                     }
                });
               
            }else{
                folderPath = config.servicePath+"/"+name;
                if(!fs.existsSync(folderPath)){
                    fs.mkdirSync(folderPath, 0777);
                }
                var serviceJsFile = folderPath+"/"+name+".js";
                fs.exists(serviceJsFile, function( exists ){
                     if(!exists || deleteFile){
                         fs.open(serviceJsFile, 'r', function(err, fd) {
                                writeFile(serviceJsFile,getServiceJs(config));
                                console.log("成功创建服务js");
                           });
                     }else{
                        console.error("创建服务js失败,文件已经存在!!!!!!!!!!");
                     }
                });
            }
			
		}
    });  
}


var arguments = process.argv.splice(2);
var name = arguments[0];
var p = arguments[1];

if(p =="-d"){
	deleteFile = true;	
}

executeCreate(name);