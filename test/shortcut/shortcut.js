/**
 * @file 快捷入口控制器
 * @author:gaoyang
 * @date:2015-09-23
 */

//查询controller
angular.module('cms').controller('ShortcutListCtrl', function($stateParams,$scope,$rootScope,shortcutService,Constant,Dialog){
	$scope.pageSize = Constant.pageSize;
	$scope.currentPage = 1;
	$scope.list = [];
	function sendRequest(){
		var params = angular.merge({}, $scope.params, {
			id:$stateParams.id,
			currentpage: $scope.currentPage,
			pageSize: $scope.pageSize,
	});
		shortcutService.getShortcutList(params)
			.then(function(json){
				var result = json.result;
				$scope.list = result.data;
				$scope.total = result.page.totalCount;
			});
		}
	$scope.delete = function (id,index) {
		Dialog.confirm('提示', '您确认要删除该条记录吗？', [
			{
				text: '取消',
				isImportant: true
			},
			{
				text: '确认',
				clickFn: function(){
				shortcutService.deleteShortcut(id)
				.then(function(json){
					$scope.list.splice(index,1);
			});
			}
			}]);
		};
	$scope.pageChangeHandler = function(){
		sendRequest();
	};
	sendRequest();
}

//保存页面controller
angular.module('cms').controller('ShortcutSaveCtrl', function($stateParams,$scope,$rootScope,shortcutService,Constant,Dialog){
	//发送保存请求
	function sendSaveRequest(){
		var params = angular.merge({}, $scope.params, {
			id:$stateParams.id,
			currentpage: $scope.currentPage,
			pageSize: $scope.pageSize,
		});
		shortcutService.getShortcutList(params)
			.then(function(json){
				var result = json.result;
				$scope.list = result.data;
				$scope.total = result.page.totalCount;
			});
	}
	//发送获取详情请求
	function sendGetRequest(){
		var params = angular.merge({}, $scope.params, {
			id:$stateParams.id
		});
		shortcutService.getShortcutList(params)
			.then(function(json){
				var result = json.result;
				$scope.shortcut = result.data;
			});
	}
	var defaultForm = {
			valid: true,
			errors: {
				modelId: {
					require:false
				},
				publishBeginAt: {
					require:false
				},
				publishEndAt: {
					require:false
				},
				picNames: {
					require:false
				},
				status: {
					require:false
				},
				positionId: {
					require:false
				}
			}
	};
	//检查输入项
	function check(){
		$scope.errMsg = '';
		$scope.form = angular.copy(defaultForm);
		if(!$scope.shortcut.modelId){
			$scope.form.errors.modelId.require = true;
			$scope.form.valid = false;
		}
		if(!$scope.shortcut.publishBeginAt){
			$scope.form.errors.publishBeginAt.require = true;
			$scope.form.valid = false;
		}
		if(!$scope.shortcut.publishEndAt){
			$scope.form.errors.publishEndAt.require = true;
			$scope.form.valid = false;
		}
		if(!$scope.shortcut.picNames){
			$scope.form.errors.picNames.require = true;
			$scope.form.valid = false;
		}
		if(!$scope.shortcut.status){
			$scope.form.errors.status.require = true;
			$scope.form.valid = false;
		}
		if(!$scope.shortcut.positionId){
			$scope.form.errors.positionId.require = true;
			$scope.form.valid = false;
		}
	}
	//保存信息
	$scope.save = function(){
		check();
		if($scope.form.valid){
			sendSaveRequest();
		}
	};
	if($stateParams.id){
		//是修改页面
		sendGetRequest($stateParams.id);
	}
}

//详情页面controller
angular.module('cms').controller('ShortcutDetailCtrl', function($stateParams,$scope,$rootScope,shortcutService,Constant,Dialog){
	function sendGetRequest(id){
		var params = angular.merge({}, $scope.params, {
			id:$stateParams.id
		});
		shortcutService.getShortcutList(params)
			.then(function(json){
				var result = json.result;
				$scope.shortcut = result.data;
			});
	}
	sendGetRequest($stateParams.id);
}