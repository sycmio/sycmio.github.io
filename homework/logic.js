//默认初始活细胞比例
var percentage_livingcells = 20;

//生成细胞格子
var cell_cellnum_inOneColume=100;
var cell_cellnum_inOneRow=100;
var cell = new Array();
var temp_cell = new Array();

//随机生成初始细胞生死状态
var random_fate = function(){
	for (var i = 0; i < cell_cellnum_inOneColume; i++) {
		cell[i] = new Array();
	};
	for (var i = 0; i < cell_cellnum_inOneColume; i++) {
		temp_cell[i] = new Array();
	};
	for (var i = 0; i < cell_cellnum_inOneColume; i++) {
		for (var j = 0; j < cell_cellnum_inOneRow; j++) {
			//初始细胞状态
			cell[i][j] = parseInt((100/percentage_livingcells) * Math.random());
			if(cell[i][j] == 0){
				cell[i][j] = 1;
			}
			else{
				cell[i][j] = 0;
			}
		}
	}
}

//计算周围活细胞个数
var count_aroundlivingcells = function (i, j) { 
	var num_aroundlivingcells = 0;
	if(i > 0 && cell[i - 1][j] > 0){
		num_aroundlivingcells += cell[i - 1][j]
	}
	if(i > 1 && cell[i - 2][j] > 0){
		num_aroundlivingcells += cell[i - 2][j]
	}
	if(i < cell_cellnum_inOneColume - 1 && cell[i + 1][j] > 0){
		num_aroundlivingcells += cell[i + 1][j]
	}
	if(i < cell_cellnum_inOneColume - 2 && cell[i + 2][j] > 0){
		num_aroundlivingcells += cell[i + 2][j]
	}
	if(j > 0 && cell[i][j - 1] > 0){
		num_aroundlivingcells += cell[i][j - 1]
	}
	if(j > 1 && cell[i][j - 2] > 0){
		num_aroundlivingcells += cell[i][j - 2]
	}
	if(j < cell_cellnum_inOneRow - 1 && cell[i][j + 1] > 0){
		num_aroundlivingcells += cell[i][j + 1]
	}
	if(j < cell_cellnum_inOneRow - 2 && cell[i][j + 2] > 0){
		num_aroundlivingcells += cell[i][j + 2]
	}
	return num_aroundlivingcells;
}

//更新细胞状态并显示
var refresh_fate = function () {
	var num_aroundlivingcells = 0;
	for (var i = 0; i < cell_cellnum_inOneColume; i++) {
		for (var j = 0; j < cell_cellnum_inOneRow; j++) {
			//如果不是墙壁
			if (cell[i][j] >= 0){
				num_aroundlivingcells = count_aroundlivingcells(i, j);
				if (num_aroundlivingcells == 3) {
					temp_cell[i][j] = 1;
				}
				else if (num_aroundlivingcells == 2) {
					temp_cell[i][j] = cell[i][j];
				}
				else {
					temp_cell[i][j] = 0;
				};
			}
			//如果是墙壁
			else{
				temp_cell[i][j] = -1;
			}
		}
	}
	//更改细胞状态
	for (var i = 0; i < cell_cellnum_inOneColume; i++) {
		for (var j = 0; j < cell_cellnum_inOneRow; j++) {
			cell[i][j] = temp_cell[i][j];
		}
	}
}

var flag_hasInitialed = 0;
var flag_firstclick = 0;
var flag_canSetWall = 0;
var fun_interval;