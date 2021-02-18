$(document).ready(function(){
		//处理按钮鼠标经过事件
		
		$('.header .nav .ul1 .li1').mouseover(function(e){
			$(this).siblings().each(function(){
				$(this).find('.ul2').slideUp();
				});
			$(this).find('.ul2').slideDown();
			//alert(e.pageX);
		});
		$('.header .nav .ul1 .li1').mouseout(function(e){
			if((e.pageY>$(this).offset().top&&e.pageY<$(this).find('.ul2').offset().top+$(this).find('.ul2').children().length*40-30)
				&&(e.pageX>$(this).offset().left&&e.pageX<$(this).offset().left+124.25)
			)
			{}else{
				$(this).find('.ul2').slideUp();
			}
		});
		
		
			
		$('body').click(function(){
			$('.header .nav .ul1 .li1 .ul2').each(function(){
				$(this).slideUp();
				});
			});
		});
		
		$('.header .nav .ul1 li .ul2 li').each(function(){
			$(this).mouseover(function(){
				$(this).addClass("mouseOn");
			});
			$(this).mouseout(function(){
				$(this).removeClass("mouseOn");
			});
		});