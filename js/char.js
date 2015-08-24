function rand(min, max){ return Math.floor(Math.random() * (max - min + 1)) + min;}

if (typeof ch === "undefined") alert("char_setting.js is corrupted")
char = {}

ch.draw = function(){
	var out=""
	//race
	$.each(ch.set.race,function(k,v){
		var title = (typeof v.title !== "undefined") ? v.title : k 
		out+="<input id='race_"+k+"' type='radio' name='race' value='"+k+"'>\
		<label for='race_"+k+"'><i></i><span>"+title+"</span></label>"
	})
	var l = $("#race_wrap").html($(out)).find("input[type=radio]").length
	
	if ($("input[type=radio]:checked","#race_wrap").length <= 0) $("input[type=radio]","#race_wrap").eq(rand(0,l-1)).prop("checked",true) 
	
	//sex
	out=""
	$.each(ch.set.sex, function(k,v){
		var title = (typeof v.title !== "undefined") ? v.title : k 
		out+="<input id='sex_"+k+"' type='radio' name='sex' value='"+k+"'>\
		<label for='sex_"+k+"'>"+title+"</label>"		
	})
	var l = $("#sex_wrap").html($(out)).find("input[type=radio]").length
	if ($("input[type=radio]:checked","#sex_wrap").length <= 0) $("input[type=radio]","#sex_wrap").eq(rand(0,l-1)).prop("checked",true) 

	//skill
	out=""
	var elem = $("#skill_wrap")
	var groups = {}

	$.each(ch.set.skill,function(k,v){

		var group = "all"
		var group_name = "Хня"
		if (typeof v.group !== "undefined") {
			group =  v.group
			group_name = group
			
			if (typeof ch.set.skill_group[v.group] !== "undefined")
				if (typeof ch.set.skill_group[v.group].title !== "undefined")
				group_name = ch.set.skill_group[v.group].title
		}
 
		
		var title = (typeof v.title !== "undefined") ? v.title : k
		
		if (typeof groups[group] === "undefined")
			groups[group] = $("<table><tr><th>"+group_name+"</th></tr></table>").addClass("skill_group").appendTo(elem)
		
		var val = -1
		var tr = $("<tr><td>"+title+"</td><td class='skill_val'>"+val+"</td></tr>")
			.attr("id","skill_"+k)
			.addClass("skill")
			.data("val",val)
			.appendTo(groups[group])
	})
	
	
	
}

ch.portrait_draw = function(){
	var race = ch.race_get()
	var sex = ch.sex_get()
	$("#portrait_img").html("<img src='img/portrait/"+ race + "_"+sex+".jpg' alt='' />")
}

ch.race_change = function(){
	var race = ch.race_get()
	
	ch.portrait_draw()
	ch.hitbox.draw()
}
ch.race_get = function() {
	return  char.race = $("input[name=race]:checked", "#race_wrap").val()
}
ch.sex_change = function(){
	ch.portrait_draw()
}
ch.sex_get = function(){
	return char.sex = $("input[name=sex]:checked", "#sex_wrap").val()
}

ch.hitbox = {}
char.hit = {}
ch.hitbox.draw = function(){
	var elem = $("#hitbox")
	var race = ch.race_get()
	var race =  (typeof ch.set.race[race].hit !== "undefined") ? ch.set.race[race].hit : {}
	var def = $.extend({},ch.set.hit, race)
	var line = 0, row = 0, line_tmp = 0
	
	$.each(def,function(k,v){
		$.each(v,function(k1,v1){
			line_tmp++
		})
		if (line_tmp > line) line = line_tmp
		line_tmp = 0
		row++
	})
	
	var out = ""
	for (var i = 1; i <= row; i++){ //i - line, k - row
		var tr = ""
		for (var k = 0; k < line; k++){
			var t = "", c = ""
			if ((typeof def[i] !== "undefined") & (typeof def[i][k] !== "undefined")) {
				t = def[i][k]
				var anim = ""
				if (typeof char.hit[i] !== "undefined")
					if (typeof char.hit[i][k] !== "undefined")
						if (char.hit[i][k] != t)
							var anim = "anim"
					
				c = "class='issue "+anim+"'"
			}
			
			tr+="<td "+c+">"+t+"</td>"
		}
		out="<tr>"+tr+"</tr>"+out
	}
	char.hit = def
	elem.html($(out))
}


$(function(){
	
	ch.draw()
	ch.portrait_draw()
	ch.hitbox.draw()
	
	
	$("input[name=race]","#race_wrap").change(function(){ ch.race_change() })
	$("input[name=sex]","#sex_wrap").change(function(){ ch.sex_change() })
	
	$(window).bind("mousemove",function(e){
		var x = e.pageX
		var w = $("#tooltip_wrap").width()
		var of = -10
		var cl = ""
		
		if (x-100 < w) {
			cl = "right"
			of = 10
		} else {
			var cl = "left"
			of = -10
		}
		$("#tooltip_point").removeClass("left right").addClass(cl).css({
			"top": e.pageY -10,
			"left": x + of
		})
		
	})

	$(".skill", "#skill_wrap").hover(function(){
		$("#tooltip_content").html($(this).attr("id") + " - "+ $(this).data("val"))
		$("#tooltip_point").stop(true,true).fadeIn()
		
	}, function(){
		$("#tooltip_point").delay(100).fadeOut("fast")
		console.log(char)
	})
	
	
	
	/*
	

	char.stat.draw = function(){
		var elem = $("#stat")

		$("#stat_wrap > table").empty()
		
		$.each (char.stat.name,function(k,v){
			var val = -1
			var tip = ""

			var race = char.race.get()

			if (typeof char.stat.val.def[k] !== "undefined"){
				val = char.stat.val.def[k]
				char.stat.current.base[k] = char.stat.val.def[k]
				tip += " data-base='"+char.stat.val.def[k]+"'"
			}		
			
			if (typeof char.stat.val[race] !== "undefined")
			if(typeof char.stat.val[race][k] !== "undefined"){
				val += char.stat.val[race][k]
				char.stat.current.race[k] = char.stat.val[race][k]
				tip += "data-race='"+char.stat.current.race[k]+"'"
			}
			tip += " data-val='"+val+"'"
			
			
			
			var cl = ""
			if (val < 0) cl = "style='color:rgb(80,80,80)'"
			if (val <= 0) val = ""
			
			var name = (v instanceof Array) ? v[0] : v
			var append_to = "#stat_all"
				
			if ($.inArray(k,group_damage) >= 0 ) append_to = "#stat_attack"
			if ($.inArray(k,group_stand) >= 0 ) append_to = "#stat_stand"
			if ($.inArray(k,group_defence) >= 0 ) append_to = "#stat_defence"
				console.log($.inArray(k,group_damage) )
			
			$("<tr "+tip+" "+cl+" ><td>"+name+"</td><td>"+val+"</td></tr>")
				.data("stat",k)
				.addClass("stat")
				.appendTo($(append_to))
		})
		

	}
	
	char.point.draw = function(){
		$("#buy_point").html(char.point.def)
	}

*/
});