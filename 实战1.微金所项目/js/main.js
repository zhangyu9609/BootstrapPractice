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

	//初始化tooltips插件
	$('[data-toggle="tooltip"]').tooltip();

	/**
	 * 控制标签页的标签容器宽度
	 */
	var $ulContainer = $(".nav-tabs");
	// 获取所有子元素的宽度和
	var width = 30;//因为原本ul上有padding-left
	// 遍历子元素
	$ulContainer.children().each(function(index, element) {
		// console.log(element.clientWidth);
		// console.log($(element).width());
		width += element.clientWidth;
	});
	// 此时width等于所有li的宽度总和
	// 判断当前ul的宽度是否超出屏幕宽度，如果超出就显示横向滚动条
	if(width > $(window).width()){
		$ulContainer.css("width",width).parent().css('overflow-x','scroll');
	}

	// a点击注册事件
	var $newsTitle =$('.news-title');
	$('#news .nav-pills a').on('click',function(){
		// 获取当前点击元素
		var $this = $(this);
		// 获取对应的title值
		var title = $this.data('title');
		// 将title设置到相应的位置
		$newsTitle.text(title);
	});

	
	// 1. 获取手指在轮播图上的滑动方向（左右）
	
	// 获取界面上的轮播图容器
	var $carousels = $('.carousel');
	var startX, endX;
	var offset = 50;
	// 注册滑动事件
	$carousels.on('touchstart', function(e) {
		// 手指触摸开始时记录一下手指所在的坐标X；
		// console.log(e.originalEvent.touches[0].clientX);
		startX = e.originalEvent.touches[0].clientX;
	});
	$carousels.on('touchmove', function(e) {
		// 变量重复赋值
		endX = e.originalEvent.touches[0].clientX;
	});
	$carousels.on('touchend', function(e) {
		// 结束时一瞬间记录最后的手指所在的坐标X
		// 比大小
		// 控制精度
		// 获取每次运动的距离，当距离大于一定值时认为是有方向变化
		var distance = Math.abs(startX-endX);
		if (distance>offset) {
			// 有方向变化
			// 2. 根据或得到的方向选择上一张还是下一张
			// - $('a').click();
			// - 原生的carousel方法实现
			// console.log(startX>endX?'left':'right');
			$(this).carousel(startX>endX?'next':'prev');
		}
		
	});
	
});