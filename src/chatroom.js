<script src='https://sycmio.github.io/src/firebase.js'></script>
<script src='https://sycmio.github.io/src/jquery.min.js'></script>
   <script>

      var myNickName;//记录用户输入的昵称
      var myMessageRef = new Firebase('https://boiling-inferno-9575.firebaseio.com/message/');
      var myNickNameRef = new Firebase('https://boiling-inferno-9575.firebaseio.com/nickname/');
      var myNickNameOBJ;//储存从数据库读入的nickname信息
      var myNickNameKey;//储存当前用户输入昵称的储存键值，方便删除
      var isMyNickNameKey=false;//用来判断是否是当前用户昵称的对应键值
      var isInitial=true;//用来判断是否是第一次加载页面
      $('#messageInput').keypress(function (e) {//发送消息框的回车事件
        if (e.keyCode == 13) {
        	if($('#messageInput').val()!="")//如果不是空消息
        	{
        		var text = $('#messageInput').val();
		        myMessageRef.push({nickname: myNickName, text: text});
		        $('#messageInput').val("");		        
        	}
        	e.preventDefault();//停止原本的回车换行
        }
      });
      $('#nameInput').keypress(function (e) {//输入昵称框的回车事件
        if(e.keyCode == 13) {
        	if($('#nameInput').val()==="")//如果昵称为空
        	{
        		$('#alertDiv').text("昵称不能为空");
        	}
        	else
        	{
        		var isValid = true;//用来判断是否重名
          		for(var p in myNickNameOBJ)
          		{
            		if ($('#nameInput').val()===myNickNameOBJ[p].nickname)
            		{
             		 isValid = false;
            		}
          		}
	            if(isValid === true)//如果不重名
	            {
	            	myNickName = $('#nameInput').val();
		            isMyNickNameKey = true;
		            myNickNameRef.push({nickname: myNickName});
		            $("#divCenter").fadeOut(1500);
		            $("#shadeDiv").fadeOut(1500);
		            $("#allDiv").fadeIn(1500);
		            isInitial=false;
	          	}
	          	else{
	            	$('#alertDiv').text("昵称重复，请重新输入");
	          	}
	        }       
        }
      })

      //如果服务器的消息信息发生添加
      myMessageRef.limitToLast(1).on('child_added', function(snapshot) {
        var message = snapshot.val();
        if(isInitial===false)//判断是否进入了聊天界面
        {
        	displayChatMessage(message.nickname, message.text);
        }
        
      });
      //如果服务器的昵称信息发生增加
      myNickNameRef.on('child_added', function(snapshot) {
      	if(isMyNickNameKey)//得到该用户昵称对应的key
      	{
        	myNickNameKey = snapshot.key();
        	isMyNickNameKey = false;
        }
      });
      //显示消息
      function displayChatMessage(name, text) {
        $('<div/>').text(name+" : "+text).appendTo($('#messagesDiv'));
        $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
      };
      //如果服务器的昵称信息发生增减
      myNickNameRef.on('value', function(snapshot) {
      	myNickNameOBJ = snapshot.val();
      	$("li").remove();//移除原有列表
      	for(var p in myNickNameOBJ)//重新添加
        {
            $('<li/>').text(myNickNameOBJ[p].nickname).appendTo($('#userList'));
        }
      });

      //增加用户关闭页面的退出事件
      function onunloadFunc () {
        var myDeleteNickNameRef = new Firebase('https://boiling-inferno-9575.firebaseio.com/nickname/'+myNickNameKey);
        myDeleteNickNameRef.remove();
      }
      window.onunload = onunloadFunc;

    var draggingObj=null; //拖曳聊天室
    var diffX=0;
    var diffY=0;
            
    var downMouse = function(evt)//鼠标按下事件
    {
        if(evt.target.className.indexOf('title')!=-1)
        {
            draggingObj=evt.target.offsetParent;
            diffX=event.clientX-draggingObj.offsetLeft;
            diffY=event.clientY-draggingObj.offsetTop;
        }
    }
            
    var moveMouse = function(evt)//鼠标拖动事件
    {
    	var allDivElement=document.getElementById('allDiv');
    	if(draggingObj)
    	{//只有点击Dialog Title的时候才能拖动
        	allDivElement.style.left=(evt.clientX-diffX)+'px';
        	allDivElement.style.top=(evt.clientY-diffY)+'px';
    	}
    }
            
    var upMouse = function(evt)//鼠标松开事件
    {
        draggingObj=null;
        diffX=0;
        diffY=0;
    }
    //增加三个事件响应
    document.addEventListener('mousedown',downMouse);
    document.addEventListener('mousemove',moveMouse);
    document.addEventListener('mouseup',upMouse);
    </script>