//canvas对象
var canvas = document.getElementById('myCanvas');
var ctx    = canvas.getContext('2d');

//绘制
var paint_cell = function(){
	for (var i = 0; i < cell_cellnum_inOneColume; i++) {
		for (var j = 0; j < cell_cellnum_inOneRow; j++) {
			//细胞为生
			if (cell[i][j] == 1) {

				ctx.beginPath();
				ctx.arc(j * 5 + 2, i * 5 + 2, 2, 0, 360, false);
				//填充颜色
				ctx.fillStyle="#009700";
				//画实心圆
				ctx.fill();
				ctx.closePath();
			}
			//细胞为死
			else  if(cell[i][j] == 0){

				ctx.beginPath();
				ctx.arc(j * 5 + 2, i * 5 + 2, 2, 0, 360, false);
				//填充颜色
				ctx.fillStyle="#F5F5DC";
				//画实心圆
				ctx.fill();
				ctx.closePath();
			}
			//为墙壁
			else {
				ctx.beginPath();
				ctx.arc(j * 5 + 2, i * 5 + 2, 2, 0, 360, false);
				//填充颜色
				ctx.fillStyle="#000000";
				//画实心圆
				ctx.fill();
				ctx.closePath();
			};
		}
	}
}

var paint_refreshfate = function(){
	refresh_fate();
	paint_cell();
}

//改变更迭时间间隔
var start_or_change_interval = function () {
	if(flag_hasInitialed == 1){
		//不是首次更改
		if (flag_firstclick == 1) {
			//清除已存在时间重复函数
			clearInterval(fun_interval);
		};
		//输入的是合法数字
		if (!isNaN(document.getElementById("interval").value) && document.getElementById("interval").value.length != 0) {
			var interval = document.getElementById("interval").value;
			fun_interval = setInterval(paint_refreshfate, interval);
		}
		//其他非法输入或空输入
		else {
			fun_interval = setInterval(paint_refreshfate, 200);
		}
		flag_firstclick = 1;
		flag_canSetWall = 0;
	}
}

//暂停更迭
var pause_interval = function () {
	if (flag_firstclick == 1) {
		clearInterval(fun_interval);
		flag_firstclick = 0;
		flag_canSetWall = 1;
	}

};

//初始化
var initial = function () {
	flag_hasInitialed = 1;
	flag_canSetWall = 1;
	//不是首次更改	
	if (flag_firstclick == 1) {
		//清除已存在时间重复函数
		clearInterval(fun_interval);
		flag_firstclick = 0;
	};
	//判断是否更改活细胞百分比
	if (!isNaN(document.getElementById("percentage_livingcells").value) && document.getElementById("percentage_livingcells").value.length != 0) {
		percentage_livingcells = parseInt(document.getElementById("percentage_livingcells").value);
		if(percentage_livingcells <= 0 || percentage_livingcells > 100){
			percentage_livingcells = 20;
		}
	}
	else {
		percentage_livingcells = 20;
	};
    //判断是否更改行数
	if (!isNaN(document.getElementById("cellnum_inOneColume").value) && document.getElementById("cellnum_inOneColume").value.length != 0) {
		cell_cellnum_inOneColume = parseInt(document.getElementById("cellnum_inOneColume").value);
	}
	else {
		cell_cellnum_inOneColume = 100;
	};
	//判断是否更改列数
	if (!isNaN(document.getElementById("cellnum_inOneRow").value) && document.getElementById("cellnum_inOneRow").value.length != 0) {
		cell_cellnum_inOneRow = parseInt(document.getElementById("cellnum_inOneRow").value);
	}
	else {
		cell_cellnum_inOneRow = 100;
	};

	//初始化
	canvas.setAttribute("width", cell_cellnum_inOneRow * 5);
	canvas.setAttribute("height", cell_cellnum_inOneColume * 5);
	random_fate();
	paint_cell();
}

//鼠标单击设置/取消墙壁
canvas.onclick = function(e){
	e = e || event;
	debugger;
	var rect = canvas.getBoundingClientRect(); 
    var b = parseInt((e.clientX - rect.left * (canvas.width / rect.width)) / 5);
    var a = parseInt((e.clientY - rect.top * (canvas.height / rect.height)) / 5);
    if(flag_canSetWall == 1 && a >= 0 && a <= cell_cellnum_inOneColume && b >= 0 && b <= cell_cellnum_inOneRow){
    	if(cell[a][b] != -1){
    		cell[a][b] = -1;
    	}
    	else{
    		cell[a][b] = 0;
    	}
    	paint_cell();
    }
}