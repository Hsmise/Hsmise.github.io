(function(){
	var btn = document.getElementById("btn");
	var sle = document.getElementsByClassName("selec")[0];
	var sel = document.getElementsByClassName("select")[0];
	var ali = btn.getElementsByTagName("li");
	var index = false;
	console.log(ali);

	//控制下拉选框
	sle.addEventListener("touchstart",function(){
		if(!index){
			sel.style.display = "block";
			index = true;
		}else{
			sel.style.display = "none";
			index = false;
		}
	});

	//控制选项
	for(i=0; i<ali.length; i++){
		
		ali[i].addEventListener("touchstart",function(e){
			
			e.preventDefault();
			for(var j=0; j<ali.length; j++){
				ali[j].classList.remove("active");
			};

			this.classList.add("active");
		});
	};


}());
	
	
(function(){

	var content = document.getElementsByTagName("aside")[0];
	var footer = document.getElementsByTagName("footer")[0];
	var winh = window.innerHeight - footer.offsetHeight;
	var ul = document.getElementById("list_11");
	var isFinish = false;

	/*
	 * describe: 创建加载的文档碎片，并且插入到content
	 * arguments : content , 要插入到的容器
	 * return ：返回插入的div
	*/
	function appendLoading(content){

		var fragment = document.createDocumentFragment();
		var warp = document.createElement("div");
		var img = document.createElement("img");
		var span = document.createElement("span");

		warp.className = "loading";
		img.src = "img/icon_loading.png";
		span.innerHTML = "正在加载";

		warp.appendChild(img);
		warp.appendChild(span);
		fragment.appendChild(warp);
		content.appendChild(fragment);

		return warp;
	}

	//往content插入文档碎片
	var loading = appendLoading(content);
	var loadTop = 0;

	//判断正在加载是否出现在屏幕
	window.addEventListener("scroll",function(){
		loadTop = loading.getBoundingClientRect().top;

		if(loadTop < winh && !isFinish){
			ajaxLoad();
			isFinish = true;

		}
	});

	// ajax加载数据
	function ajaxLoad(){

		//创建一个ajax对象
		var xhr = new XMLHttpRequest();

		// 需要请求的链接 / 文件（html.json）
		xhr.open("get","goodslist.json",true);

		// 绑定一个change监听事件
		xhr.onreadystatechange = function(){

			//当请求完成（ =4）并且请求成功（ =200）
			if(xhr.readyState == 4 && xhr.status == 200){

				//接收请求回来的文本
				var res = xhr.responseText;
				console.log(res);
				var obj = JSON.parse(res);

				var html = "";

				for(var key in obj){
					html += '<li><a href="#"><img src=" '+ obj[key]["img"] +' "></a><p>'+ obj[key]["describe"] +'<span><i>￥</i>'+ obj[key]["price"] +'</span><s>￥'+ obj[key]["s"] +'</s></p></li>';
				}

				setTimeout(function(){
					ul.insertAdjacentHTML("beforeEnd",html);
					isFinish = false;
				},2000);
				
			}
		}

		// 一个命令 开发发送
		xhr.send(null);

	}

}());