window.meat = {
	spritetestDirection : function(dir){
		$('#meatUiDirectionTable td').removeClass('active');
		$("#meatUiDirectionTable td[data-direction='"+dir+"']").addClass('active');
		$('#meatuISpriteTestContainer .sprite').data('direction',dir).attr('data-direction',dir);
	}
};
window.meat.spritetestDirection('r');


$('#meatUiDirectionTable').bind('click',function(e){
	var elem = $(e.target).closest('td');
	if (elem.length==0) return;
	var d = elem.data('direction');
	if (d==undefined) return;
	window.meat.spritetestDirection(d);
	
});
