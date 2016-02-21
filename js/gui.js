modal = {};

modal.sceneShow = function(){
	modal.scene = $("#scene_modal").arcticmodal({
		afterOpen: function(){
			$.publish("modalSceneOpen");
			window.location.hash = "modalScene";
		},
		afterClose: function(){
			$.publish("modalSceneClose");
		    history.pushState("", document.title, window.location.pathname);
		}
	});
};
modal.sceneHide = function(){
	modal.scene = $("#scene_modal").arcticmodal("close");
};



$(function(){
	$.subscribe("init.rr",function(e){
	});
	
	
	s = new scene("scene.scene")//.layer("ground.back grid.back  water")
	s.layer("id.namespace#23.nsps2#123    id1#126.namespace    id2.namespace#990   id3#zIndex   rr");
	
	log(s)
	
	
	
	//s = new scene("scene",{fuck: 32,widthHex:12}).layer("one  two")
	
	
//SCROLL WIDTH
	var div = document.createElement('div');
    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.visibility = 'hidden';
    
    document.body.appendChild(div);
	scrollWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
    
	
//WINDOW BIND
	$(window)
		.bind("hashchange",function(){
			var hash = location.hash.slice(1);
			if (hash == "modalScene") modal.sceneShow();
		}).trigger("hashchange")
		.bind("resize load mousemove",function(){
			var parent = $("#sceneTd");
			var w = parent.width();
			var h = parent.height();
			
			var wr = $(".sceneScroll.scroll-wrapper");
			
			if (wr.width()==w & wr.height()==h) return !1; 
			var o = 1;
			
			wr.css({width:w-o,height:h-o});
			$(".sceneScroll.scroll-content").css({width:w-o+scrollWidth,height:h-o+scrollWidth});
			
		}).trigger("resize"); 
	
	$(".sceneScroll").scrollbar();

	
//SET_SCENE
	$("#create_scene_form").submit(function(e){
		e.preventDefault();

		var f = e.currentTarget;
		var o = {};
		$.each(f,function(k,v){
			var e = $(v);
			var name = e.attr("name"); 
			var val = e.val();
			$.extend(o,{[name]:[val]});
		});
		s = new scene("scene",o).layer("main").drawGrid();
		modal.sceneHide();
		noty({
			text: 'Scene created',
			layout: 'bottomLeft',
			type: "information",
			timeout: 3000
		});
	});

	$.subscribe("init.scene",function(){
		$(".waaagh").removeClass("waaagh");
	});

//MENU
	$(".zarMenu").bind("click",function(e){
		var menu = $(this);
		var trg = $(e.target);
		if (trg.hasClass("center")) return !1;
		if (!trg.hasClass("active")){
			menu.children(".active").removeClass("active");
			trg.addClass("active");
		} else {
			trg.removeClass("active");
		}
		
	});

//SCENE MODAL
	$.subscribe("modalSceneOpen",function(){
		$("#scene_modal_button").addClass("active");
	});
	
	$.subscribe("modalSceneClose",function(){
		$("#scene_modal_button").removeClass("active");
	});

	$("#scene_modal_button").bind("click",function(){
		modal.sceneShow();
	});
	
//KEY
	$(document).keydown(function(e){
		if (e.keyCode == 78 & e.ctrlKey) { //Ctrl+n
			e.preventDefault();
			modal.sceneShow();
		}
	});

	
	
	var options = {
		widthHex:620,
		heightHex:620
	};

});
