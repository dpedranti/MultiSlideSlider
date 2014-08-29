// Slideset plugin
// Using Twitter Bootstrap JavaScript Framework
!function ($) {

	"use strict";
	
	var resizeTimer;

	// SLIDESET CLASS DEFINITION
	// =========================

	var Slideset = function (element) {
		this.$element = $(element)
		this.$slideSetInner   = this.$element.find('.slideset-inner')
		this.$slideSetItems   = this.$element.find('.slideset-items')
		this.$item            = this.$element.find('.item')
		this.$controlLeft	  = this.$element.find('.slideset-control.left')
		this.$controlRight	  = this.$element.find('.slideset-control.right')
		this.slideSetItemsW   = 0
		this.slideHorizMargin = 0
		this.totalSlides      = 0
		this.currentSlide     = 0
		this.slides           = new Array()
		this.slideWidths      = new Array()
		this.offsetAdjRight   = 0;
	}
	
	Slideset.prototype.init = function() {
		var slideHorizMargin = parseInt(this.$item.css('margin-left'), 10),
			that = this;
		
		this.$slideSetItems.css('width', 0);
			
		this.$item.each(function () {
			var $this = $(this);
			
			$this.data( 'slideNum', that.totalSlides );
			that.slides[that.totalSlides++] = $this;
			that.slideWidths[$this.data('slideNum')] = $this.width();
			that.slideSetItemsW = that.$slideSetItems.width() + $this.width() + that.slideHorizMargin*2;
			that.$slideSetItems.width( that.slideSetItemsW );
			
		})
			
		this.setButtonStates(); 
	}
	
	Slideset.prototype.moveLeft = function() {
		if ( this.currentSlide == 0 ) return;
		if ( this.slideWidths[this.currentSlide-1] == undefined ) return;
		
		var currentSlideW  = this.slideWidths[this.currentSlide],
			slideSetInnerW = this.$slideSetInner.width(),
			slideSetLeft   = parseInt(this.$slideSetItems.css('left'), 10),
			that           = this,
			offset;
		
		if (slideSetLeft !== slideSetInnerW - this.slideSetItemsW) {
			offset = this.slideWidths[this.currentSlide]/2 + this.slideHorizMargin*2 + this.slideWidths[this.currentSlide-1]/2;
		} else {
			offset = this.offsetAdjRight;
		}
		
		this.$slideSetItems.animate( { left: '+=' + offset }, function() {
			that.setButtonStates();  
		});
		this.currentSlide--;
	
		return this
	}
	
	Slideset.prototype.moveRight = function() {
		if ( this.slideWidths[this.currentSlide+1] == undefined ) return;
	
		var currentSlideW  = this.slideWidths[this.currentSlide],
			slideSetInnerW = this.$slideSetInner.width(),
			slideSetLeft   = parseInt(this.$slideSetItems.css('left'), 10),
			that           = this,
			offset;
			
		if (currentSlideW < (this.slideSetItemsW + slideSetLeft - slideSetInnerW)) {
			offset = currentSlideW/2 + this.slideHorizMargin*2 + this.slideWidths[this.currentSlide+1]/2;
		} else {
			offset = this.slideSetItemsW - slideSetInnerW + slideSetLeft;
			this.offsetAdjRight = offset;
		}
		
		this.$slideSetItems.animate( { left: '-=' + offset }, function() {
			that.setButtonStates();  
		});
		this.currentSlide++;
		
		return this
	}
	
	Slideset.prototype.setButtonStates = function() {
		var slideSetInnerW = this.$slideSetInner.width(),
			slideSetLeft   = parseInt(this.$slideSetItems.css('left'), 10);
			
		if ( this.currentSlide == 0 ) {
			this.$controlLeft.hide();
		} else {
			this.$controlLeft.show();
		}
	
		if ( slideSetInnerW >= this.slideSetItemsW + slideSetLeft ) {
			this.$controlRight.hide();
		} else {
			this.$controlRight.show();
		}
		
		return this
	}
	
	Slideset.prototype.resize = function() {
		var slideSetInnerW = this.$slideSetInner.width(),
			slideSetLeft   = parseInt(this.$slideSetItems.css('left'), 10),
			that   = this;
			
		if ( slideSetInnerW >= this.slideSetItemsW + slideSetLeft ) {
			that.$slideSetItems.css( 'left', 0 );
			that.currentSlide = 0;
		}
		
		this.setButtonStates();
		
		return this
	}

	// SLIDESET PLUGIN DEFINITION
	// ==========================

	$.fn.slideset = function (option) {
		return this.each(function () {
			var $this = $(this),
				data = $this.data('naf.slideset');
			if (!data) $this.data('naf.slideset', (data = new Slideset(this)));
			data.init();
		})
	};
	
	// SLIDESET DATA-API
	// =================
	
	$(document).on('click.naf.slideset.data-api', '[data-slideset]', function (e) {
		var $this    = $(this), href,
			$target  = $((href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')), //strip for ie7
			whichWay = $this.data('slideset');
			
		switch (whichWay) {
			case 'left':
				$target.data('naf.slideset').moveLeft();
				break;
			case 'right':
				$target.data('naf.slideset').moveRight();
				break;
			default:
				break;
		}
		
		e.preventDefault();
		
	});
	
	$(window).resize(function () {		
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function () {
			$('[data-ride="slideset"]').each(function () {
				var $slideset = $(this);
				$slideset.data('naf.slideset').resize();
			})
		}, 50);
	});
}(window.jQuery);