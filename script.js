// Multi Slide Slider plugin
// Using jQuery (Bootstrap optional for styling)

!(function ($) {
  'use strict';

  let resizeTimer;

  // MULTI SLIDE SLIDER CLASS DEFINITION
  // ===================================

  let MultiSlider = function (element) {
    this.$element = $(element);
    this.$multislideInner = this.$element.find('.multislide-inner');
    this.$multislideItems = this.$element.find('.multislide-items');
    this.$item = this.$element.find('.item');
    this.$controlLeft = this.$element.find('.multislide-control.left');
    this.$controlRight = this.$element.find('.multislide-control.right');

    this.resetState();
  };

  MultiSlider.prototype.resetState = function () {
    this.slideOffsets = [];
    this.slidePositions = [];
    this.totalSlides = 0;
    this.currentSlide = 0;
    this.minLeft = 0;
    this.lastScrollableIndex = 0;
  };

  MultiSlider.prototype.init = function () {
    let that = this;

    this.resetState();

    this.$item = this.$element.find('.item');
    if (!this.$item.length) return;

    this.$multislideItems.css({ width: 0 });

    let width = 0;

    this.$item.each(function () {
      const slideWidth = $(this).outerWidth(true);
      that.slideOffsets.push(width); // add accumulated width to offsets
      width += slideWidth;
      that.totalSlides++;
    });

    this.$multislideItems.width(width);

    const innerWidth = this.$multislideInner.width();
    this.minLeft = Math.min(0, innerWidth - width);

    for (let i = 0; i < this.totalSlides; i++) {
      let position = -this.slideOffsets[i];
      if (position > 0) position = 0;
      if (position < this.minLeft) position = this.minLeft;
      this.slidePositions[i] = position;
    }

    this.lastScrollableIndex = 0;
    for (let j = 1; j < this.totalSlides; j++) {
      if (
        this.slidePositions[j] !== this.slidePositions[this.lastScrollableIndex]
      ) {
        this.lastScrollableIndex = j;
      }
    }

    this.goTo(0);

    return this;
  };

  MultiSlider.prototype.goTo = function (index) {
    if (!this.totalSlides) return this;

    this.setButtonStates();

    if (index < 0) index = 0;
    if (index > this.lastScrollableIndex) index = this.lastScrollableIndex;

    this.currentSlide = index;

    const target = this.slidePositions[index] || 0;
    const that = this;

    this.$multislideItems.stop(true).animate({ left: target }, function () {
      that.setButtonStates();
    });

    return this;
  };

  MultiSlider.prototype.moveLeft = function () {
    return this.goTo(this.currentSlide - 1);
  };

  MultiSlider.prototype.moveRight = function () {
    if (this.currentSlide >= this.lastScrollableIndex) return this;
    return this.goTo(this.currentSlide + 1);
  };

  MultiSlider.prototype.setButtonStates = function () {
    const leftVisible = this.totalSlides > 1 && this.currentSlide > 0;
    const rightVisible =
      this.totalSlides > 1 && this.currentSlide < this.lastScrollableIndex;

    this.$controlLeft.css('visibility', leftVisible ? 'visible' : 'hidden');
    this.$controlRight.css('visibility', rightVisible ? 'visible' : 'hidden');
  };

  MultiSlider.prototype.resize = function () {
    this.init();
    return this;
  };

  // MULTI SLIDE SLIDER PLUGIN DEFINITION
  // ====================================

  $.fn.multislide = function () {
    return this.each(function () {
      let instance = $(this).data('bs.multislide');
      if (!instance) {
        $(this).data('bs.multislide', (instance = new MultiSlider(this)));
      }
      instance.init();
    });
  };

  // MULTI SLIDE SLIDER DATA-API
  // ===========================

  $(document).on(
    'click.bs.multislide.data-api',
    '[data-multislide]',
    function (e) {
      const $this = $(this);
      const target = $($this.attr('href'));
      const instance =
        target.data('bs.multislide') ||
        target.multislide().data('bs.multislide');

      if ($this.data('multislide') === 'left') {
        instance.moveLeft();
      } else {
        instance.moveRight();
      }

      e.preventDefault();
    }
  );

  // Debounced resize handling
  $(window).on('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      $('[data-ride="multislide"]').each(function () {
        const instance = $(this).data('bs.multislide');
        if (instance) instance.resize();
      });
    }, 100);
  });
})(window.jQuery);
