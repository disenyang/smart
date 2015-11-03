/**
 * @file 快捷入口服务
 * @author:gaoyang
 * @date:2015-09-23
 */
angular.module('cms').factory('shortcutService', function($http, $q,Constant){
	return {
		//获取快捷入口列表
		getShortcutList: function(params){
			var url = '/content-view/homePage/position/list';
			var deferred = $q.defer();
			$http.post(url, params)
				.success(function(json){
					deferred.resolve(json);
			})
			return deferred.promise;
		},
		//获取快捷入口详情
		getShortcut: function(id){
			var url = '/content-view/homePage/position/detail';
			var deferred = $q.defer();
			$http.post(url, {id:id
			})
				.success(function(json){
					deferred.resolve(json);
			})
			return deferred.promise;
		},
		//保存快捷入口
		saveShortcut: function(shortcut){
			var url = '/content-view/homePage/saveOrUpdateQuick';
			var deferred = $q.defer();
			$http.post(url,shortcut)
				.success(function(json){
					deferred.resolve(json);
			})
			return deferred.promise;
		},
		//更新快捷入口
		updateShortcut: function(shortcut){
			var url = '/content-view/homePage/saveOrUpdateQuick';
			var deferred = $q.defer();
			$http.post(url, shortcut)
				.success(function(json){
					deferred.resolve(json);
			})
			return deferred.promise;
		},
		//删除快捷入口
		deleteShortcut: function(id){
			var url = '/content-view/homePage/position/delete';
			var deferred = $q.defer();
			$http.post(url, {id:id
			})
				.success(function(json){
					deferred.resolve(json);
			})
			return deferred.promise;
		}
	}
});