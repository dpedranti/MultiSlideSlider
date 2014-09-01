// Multi Slide Slider plugin
// Using Twitter Bootstrap JavaScript Framework
!function ($) {

	"use strict";
	
	var resizeTimer;

	// MULTI SLIDE SLIDER CLASS DEFINITION
	// ===================================

	var MultiSlider = function (element) {
		this.$element = $(element)
		this.$multiSlideInner = this.$element.find('.multislide-inner')
		this.$multiSlideItems = this.$element.find('.multislide-items')
		this.$item            = this.$element.find('.item')
		this.$controlLeft	  = this.$element.find('.multislide-control.left')
		this.$controlRight	  = this.$element.find('.multislide-control.right')
		this.multiSlideItemsW = 0
		this.slideHorizMargin = 0
		this.totalSlides      = 0
		this.currentSlide     = 0
		this.slides           = new Array()
		this.slideWidths      = new Array()
		this.offsetAdjRight   = 0;
	}
	
	MultiSlider.prototype.init = function() {
		var slideHorizMargin = parseInt(this.$item.css('margin-left'), 10),
			that = this;
		
		this.$multiSlideItems.css('width', 0);
			
		this.$item.each(function () {
			var $this = $(this);
			
			$this.data( 'slideNum', that.totalSlides );
			that.slides[that.totalSlides++] = $this;
			that.slideWidths[$this.data('slideNum')] = $this.width();
			that.multiSlideItemsW = that.$multiSlideItems.width() + $this.width() + that.slideHorizMargin*2;
			that.$multiSlideItems.width( that.multiSlideItemsW );
			
		})
			
		this.setButtonStates(); 
	}
	
	MultiSlider.prototype.moveLeft = function() {
		if ( this.currentSlide == 0 ) return;
		if ( this.slideWidths[this.currentSlide-1] == undefined ) return;
		
		var currentSlideW  = this.slideWidths[this.currentSlide],
			multiSlideInnerW = this.$multiSlideInner.width(),
			multiSlideLeft   = parseInt(this.$multiSlideItems.css('left'), 10),
			that           = this,
			offset;
		
		if (multiSlideLeft !== multiSlideInnerW - this.multiSlideItemsW) {
			offset = this.slideWidths[this.currentSlide]/2 + this.slideHorizMargin*2 + this.slideWidths[this.currentSlide-1]/2;
		} else {
			offset = this.offsetAdjRight;
		}
		
		this.$multiSlideItems.animate( { left: '+=' + offset }, function() {
			that.setButtonStates();  
		});
		this.currentSlide--;
	
		return this
	}
	
	MultiSlider.prototype.moveRight = function() {
		if ( this.slideWidths[this.currentSlide+1] == undefined ) return;
	
		var currentSlideW  = this.slideWidths[this.currentSlide],
			multiSlideInnerW = this.$multiSlideInner.width(),
			multiSlideLeft   = parseInt(this.$multiSlideItems.css('left'), 10),
			that           = this,
			offset;
			
		if (currentSlideW < (this.multiSlideItemsW + multiSlideLeft - multiSlideInnerW)) {
			offset = currentSlideW/2 + this.slideHorizMargin*2 + this.slideWidths[this.currentSlide+1]/2;
		} else {
			offset = this.multiSlideItemsW - multiSlideInnerW + multiSlideLeft;
			this.offsetAdjRight = offset;
		}
		
		this.$multiSlideItems.animate( { left: '-=' + offset }, function() {
			that.setButtonStates();  
		});
		this.currentSlide++;
		
		return this
	}
	
	MultiSlider.prototype.setButtonStates = function() {
		var multiSlideInnerW = this.$multiSlideInner.width(),
			multiSlideLeft   = parseInt(this.$multiSlideItems.css('left'), 10);
			
		if ( this.currentSlide == 0 ) {
			this.$controlLeft.hide();
		} else {
			this.$controlLeft.show();
		}
	
		if ( multiSlideInnerW >= this.multiSlideItemsW + multiSlideLeft ) {
			this.$controlRight.hide();
		} else {
			this.$controlRight.show();
		}
		
		return this
	}
	
	MultiSlider.prototype.resize = function() {
		var multiSlideInnerW = this.$multiSlideInner.width(),
			multiSlideLeft   = parseInt(this.$multiSlideItems.css('left'), 10),
			that   = this;
			
		if ( multiSlideInnerW >= this.multiSlideItemsW + multiSlideLeft ) {
			that.$multiSlideItems.css( 'left', 0 );
			that.currentSlide = 0;
		}
		
		this.setButtonStates();
		
		return this
	}

	// MULTI SLIDE SLIDER PLUGIN DEFINITION
	// ====================================

	$.fn.multislide = function (option) {
		return this.each(function () {
			var $this = $(this),
				data = $this.data('bs.multislide');
			if (!data) $this.data('bs.multislide', (data = new MultiSlider(this)));
			data.init();
		})
	};
	
	// MULTI SLIDE SLIDER DATA-API
	// ===========================
	
	$(document).on('click.bs.multislide.data-api', '[data-multislide]', function (e) {
		var $this    = $(this), href,
			$target  = $((href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')), //strip for ie7
			whichWay = $this.data('multislide');
			
		switch (whichWay) {
			case 'left':
				$target.data('bs.multislide').moveLeft();
				break;
			case 'right':
				$target.data('bs.multislide').moveRight();
				break;
			default:
				break;
		}
		
		e.preventDefault();
		
	});
	
	$(window).resize(function () {		
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function () {
			$('[data-ride="multislide"]').each(function () {
				var $multislide = $(this);
				$multislide.data('bs.multislide').resize();
			})
		}, 50);
	});
}(window.jQuery);