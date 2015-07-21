var tagTop = Math.max(document.documentElement.scrollTop,document.body.scrollTop);
var sx = document.documentElement.clientWidth, sy = window.innerHeight || document.documentElement.clientHeight;
//开始界面遮罩
var StartboxOutside = document.createElement("div");
StartboxOutside.setAttribute("id", "StartboxOutside");
StartboxOutside.style.cssText = "width:100%; height:"+ document.documentElement.scrollHeight +"px; top:0; left:0; position:absolute; background:black; top:0; filter:Alpha(Opacity=95); Opacity:0.95;";
document.body.appendChild(StartboxOutside);

//操作提示区域
var Tipsbox = document.createElement("div");
Tipsbox.setAttribute("id", "Tipsbox");
Tipsbox.style.cssText = "display:block; overflow:left; text-align:center; position:absolute; background:#EEE; right:5%; top:" + (document.documentElement.clientHeight/5 + tagTop) + "px; height:"+(sy*2/3)+"px; width:"+(sx/5)+"px; "
document.body.appendChild(Tipsbox);
var Tipsboxtitle = document.createElement("div");
Tipsboxtitle.style.cssText = "font-size:"+(sx/60)+"px; font-family:STXihei; display:block; position:absolute; left:35%; top:5%; color:#000;";
Tipsboxtitle.innerHTML = "操作提示";
Tipsbox.appendChild(Tipsboxtitle);
//UP
var Tipsboxpicture_up = document.createElement("img");
Tipsboxpicture_up.src = "http://sycmio.github.io/running/up.png";
Tipsboxpicture_up.style.cssText = "display:block; position:absolute; left:25%; top:15%; width:15%; height:9%; color:#000;";
Tipsbox.appendChild(Tipsboxpicture_up);
var Tipsboxcontent_up = document.createElement("div");
Tipsboxcontent_up.style.cssText = "font-size:"+(sx/80)+"px; font-family:STXihei; display:block; position:absolute; left:50%; top:15%; color:#000;";
Tipsboxcontent_up.innerHTML = "向上移动";
Tipsbox.appendChild(Tipsboxcontent_up);
//DOWN
var Tipsboxpicture_down = document.createElement("img");
Tipsboxpicture_down.src = "http://sycmio.github.io/running/down.png";
Tipsboxpicture_down.style.cssText = "display:block; position:absolute; left:25%; top:25%; width:15%; height:9%; color:#000;";
Tipsbox.appendChild(Tipsboxpicture_down);
var Tipsboxcontent_down = document.createElement("div");
Tipsboxcontent_down.style.cssText = "font-size:"+(sx/80)+"px; font-family:STXihei; display:block; position:absolute; left:50%; top:25%; color:#000;";
Tipsboxcontent_down.innerHTML = "向下移动";
Tipsbox.appendChild(Tipsboxcontent_down);
//LEFT
var Tipsboxpicture_left = document.createElement("img");
Tipsboxpicture_left.src = "http://sycmio.github.io/running/left.png";
Tipsboxpicture_left.style.cssText = "display:block; position:absolute; left:25%; top:38%; width:15%; height:9%; color:#000;";
Tipsbox.appendChild(Tipsboxpicture_left);
var Tipsboxcontent_left = document.createElement("div");
Tipsboxcontent_left.style.cssText = "font-size:"+(sx/80)+"px; font-family:STXihei; display:block; position:absolute; left:50%; top:38%; color:#000;";
Tipsboxcontent_left.innerHTML = "向左移动";
Tipsbox.appendChild(Tipsboxcontent_left);
//RIGHT
var Tipsboxpicture_right = document.createElement("img");
Tipsboxpicture_right.src = "http://sycmio.github.io/running/right.png";
Tipsboxpicture_right.style.cssText = "display:block; position:absolute; left:25%; top:50%; width:15%; height:9%; color:#000;";
Tipsbox.appendChild(Tipsboxpicture_right);
var Tipsboxcontent_right = document.createElement("div");
Tipsboxcontent_right.style.cssText = "font-size:"+(sx/80)+"px; font-family:STXihei; display:block; position:absolute; left:50%; top:50%; color:#000;";
Tipsboxcontent_right.innerHTML = "向右移动";
Tipsbox.appendChild(Tipsboxcontent_right);
//SHIELD
var Tipsboxpicture_shield = document.createElement("img");
Tipsboxpicture_shield.src = "http://sycmio.github.io/running/Shield.png";
Tipsboxpicture_shield.style.cssText = "display:block; position:absolute; left:26%; top:63%; width:15%; height:9%; color:#000;";
Tipsbox.appendChild(Tipsboxpicture_shield);
var Tipsboxcontent_shield = document.createElement("div");
Tipsboxcontent_shield.style.cssText = "font-size:"+(sx/80)+"px; font-family:STXihei; display:block; position:absolute; left:50%; top:63%; color:#000;";
Tipsboxcontent_shield.innerHTML = "护盾";
Tipsbox.appendChild(Tipsboxcontent_shield);
//SCORE
var Tipsboxpicture_score = document.createElement("img");
Tipsboxpicture_score.src = "http://sycmio.github.io/running/score.png";
Tipsboxpicture_score.style.cssText = "display:block; position:absolute; left:26%; top:75%; width:15%; height:9%; color:#000;";
Tipsbox.appendChild(Tipsboxpicture_score);
var Tipsboxcontent_score = document.createElement("div");
Tipsboxcontent_score.style.cssText = "font-size:"+(sx/80)+"px; font-family:STXihei; display:block; position:absolute; left:50%; top:75%; color:#000;";
Tipsboxcontent_score.innerHTML = "加分";
Tipsbox.appendChild(Tipsboxcontent_score);
//MINUSONE
var Tipsboxpicture_minusone = document.createElement("img");
Tipsboxpicture_minusone.src = "http://sycmio.github.io/running/minusone.png";
Tipsboxpicture_minusone.style.cssText = "display:block; position:absolute; left:26%; top:88%; width:15%; height:9%; color:#000;";
Tipsbox.appendChild(Tipsboxpicture_minusone);
var Tipsboxcontent_minusone = document.createElement("div");
Tipsboxcontent_minusone.style.cssText = "font-size:"+(sx/80)+"px; font-family:STXihei; display:block; position:absolute; left:50%; top:88%; color:#000;";
Tipsboxcontent_minusone.innerHTML = "砖块减少";
Tipsbox.appendChild(Tipsboxcontent_minusone);

//开始界面区域
var Startbox = document.createElement("div");
Startbox.setAttribute("id", "Startbox");
Startbox.style.cssText = "overflow:left; text-align:center; position:absolute; background:white; left:"+(parseInt(document.body.offsetWidth) / 3)+"px; top:" + (document.documentElement.clientHeight/3 + tagTop) + "px; height:"+(sy/3)+"px; width:"+(sx/3)+"px; "
document.body.appendChild(Startbox);


//开始界面标签
var EasyTag = document.createElement("div");
var NormTag = document.createElement("div");
var HardTag = document.createElement("div");

EasyTag.style.cssText="font-size:"+(sx/40)+"px; font-family:Courier New; display:block; position:absolute; left:35%; top:10%; color:#000;";
NormTag.style.cssText="font-size:"+(sx/40)+"px; font-family:Courier New; display:block; position:absolute; left:31.5%; top:41%; color:#000;";
HardTag.style.cssText="font-size:"+(sx/40)+"px; font-family:Courier New; display:block; position:absolute; left:35%; bottom:10%; color:#000;";

EasyTag.innerHTML = "<b style='background:#DDD;filter:Alpha(Opacity=80);Opacity:0.8;cursor:pointer;'>&nbsp;Easy&nbsp</b>";
NormTag.innerHTML = "<b style='background:#DDD;filter:Alpha(Opacity=80);Opacity:0.8;cursor:pointer;'>&nbsp;Normal&nbsp</b>";
HardTag.innerHTML = "<b style='background:#DDD;filter:Alpha(Opacity=80);Opacity:0.8;cursor:pointer;'>&nbsp;Hard&nbsp</b>";
Startbox.appendChild(EasyTag);
Startbox.appendChild(NormTag);
Startbox.appendChild(HardTag);

//计分板
var score = 0;
var scoreTag = document.createElement("div");
scoreTag.setAttribute("id", "scoreTag");
scoreTag.style.cssText="overflow:left; font-size:"+(sx/60)+"px; line-height:"+(sx/60)+"px; font-family:Courier New; display:block; position:absolute; right:5%; top:5%; height:"+(sy/20)+"px; width:"+(sx/10+20)+ "px;background:#666;";
scoreTag.innerHTML = "Score: " + score;
OperationArea.appendChild(scoreTag);

//重新开始区域
var restartbox = document.createElement("div");
restartbox.setAttribute("id", "restartbox");
restartbox.style.cssText="display:none; overflow:left; text-align:center; position:absolute; background:white; left:"+(parseInt(document.body.offsetWidth) / 3)+"px; top:" + (document.documentElement.clientHeight/3 + tagTop) + "px; height:"+(sy/3)+"px; width:"+(sx/3)+"px; "
document.body.appendChild(restartbox);
var restartboxScore = document.createElement("div");
var restartboxTag = document.createElement("div");
restartboxScore.style.cssText = "font-size:"+(sx/40)+"px; font-family:Courier New; display:block; position:absolute; left:23%; top:27%; color:#000;";
restartboxTag.style.cssText = "font-size:"+(sx/40)+"px; font-family:Courier New; display:block; position:absolute; left:30%; bottom:17%; color:#000;";
restartboxTag.innerHTML = "<b style='border: 2px solid #666;filter:Alpha(Opacity=80);Opacity:0.8;cursor:pointer;'>&nbsp;Restart&nbsp</b>";
restartbox.appendChild(restartboxScore);
restartbox.appendChild(restartboxTag);
