'use strict';

$(function(){
	// 当加载完成才会执行
	/**
	 * 根据屏幕的宽度的变化决定轮播图应该展示什么
	 * @return {[type]} [description]
	 */
	function resize(){
		// 获取屏幕宽度
		var windowWidth = $(window).width();
		// 判断屏幕大小属于还是小
		var isSmallScreen = windowWidth < 768;
		
		// 根据大小为界面上的每一张轮播图设置背景
		// $('#main_ad > .carousel-inner > .item') 获取到的是一个DOM数组（多个元素）
		$('#main_ad > .carousel-inner > .item').each(function(i, item) {
			
			var $item = $(item); // 因为拿到的是DOM对象 需要转换
			var imgSrc = isSmallScreen ? $item.data('image-xs') : $item.data('image-lg');
			// 设置背景图片
			$item.css('backgroundImage','url("'+ imgSrc +'")');
			// 
			// 因为我们需要小图时 尺寸等比例变化，所以小图时
			if(isSmallScreen){
				$item.html('<img src="'+ imgSrc +'" alt="" />');
			}else{
				$item.empty();
			}
		});
	}
	$(window).on('resize',resize).trigger('resize');
});