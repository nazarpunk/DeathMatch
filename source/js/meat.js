window.rand = function(min, max) {
	var rand = min - 0.5 + Math.random() * (max - min + 1);
	rand = Math.round(rand);
	return rand;
};

window.meat = {
	spriteTestDirection : function(dir){
		$('#meatUiDirectionTable td').removeClass('active');
		$("#meatUiDirectionTable td[data-direction='"+dir+"']").addClass('active');
		$('#meatuISpriteTestContainer .sprite').data('direction',dir).attr('data-direction',dir);
	},
	spriteTestAction : function(act){
		$('#meatUiActionTable td').removeClass('active');
		$("#meatUiActionTable td[data-action='"+act+"']").addClass('active');
		$('#meatuISpriteTestContainer .sprite').data('action',act).attr('data-action',act);
	}
};
window.meat.spriteTestDirection(['t','tl','tr','l','r','b','bl','br'][window.rand(0,7)]);
window.meat.spriteTestAction('stand');


$('#meatUiDirectionTable').bind('click',function(e){
	var elem = $(e.target).closest('td');
	if (elem.length==0) return;
	var d = elem.data('direction');
	if (d==undefined) return;
	window.meat.spriteTestDirection(d);
	
});

$('#meatUiActionTable').bind('click',function(e){
	var elem = $(e.target).closest('td');
	if (elem.length==0) return;
	var a = elem.data('action');
	if (a==undefined) return;
	window.meat.spriteTestAction(a);
	
});