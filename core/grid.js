//表格
function Grid(json,controlsNamespace) {
	this.columns;
	this.rows;
}


//数据表的列
function Column(json) {
	
}
Grid.prototype = new Control();
Column.prototype = new Control();
