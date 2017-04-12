//首页js

//控制搜索框
(function(){
	var header = document.getElementsByTagName('header')[0];
	var scrollTop = 0;
	
	window.addEventListener("scroll",function(){
		//获取滚动条高度
		scrollTop = document.body.scrollTop;
		
		if(scrollTop > 0){
			header.classList.add("bgfff");
		}else{
			header.classList.remove("bgfff");
		}
	});
}());


//文字滚动
(function(){
	var ul = document.getElementsByClassName("list_3")[0];
	var ali = ul.getElementsByTagName('li');
	//获取块的高度
	var index = 0;
	var lih = ali[0].offsetHeight;
	
	var clone = ali[0].cloneNode(true);

	ul.appendChild(clone);

	setInterval(function(){
		
		if(index == 3){

			ul.style.marginTop = 0;

			index = 0;
		}
		index++;

		ul.style.marginTop = index * lih * -1 + "px";
	},1000);
}());


(function(){

	var content = document.getElementsByClassName("all_ct")[0];
	var footer = document.getElementsByClassName("footer")[0];
	var winh = window.innerHeight - footer.offsetHeight;
	var ul = document.getElementById("list_9");
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
		console.log(fragment);
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
		xhr.open("get","goods.json",true);

		// 绑定一个change监听事件
		xhr.onreadystatechange = function(){

			//当请求完成（ =4）并且请求成功（ =200）
			if(xhr.readyState == 4 && xhr.status == 200){

				//接收请求回来的文本
				var res = xhr.responseText;

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