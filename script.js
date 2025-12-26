// Multi Slide Slider plugin
// Using Twitter Bootstrap JavaScript Framework
!(function ($) {
  'use strict';

  var resizeTimer;

  // MULTI SLIDE SLIDER CLASS DEFINITION
  // ===================================

  var MultiSlider = function (element) {
    this.$element = $(element);
    this.$multiSlideInner = this.$element.find('.multislide-inner');
    this.$multiSlideItems = this.$element.find('.multislide-items');
    this.$item = this.$element.find('.item');
    this.$controlLeft = this.$element.find('.multislide-control.left');
    this.$controlRight = this.$element.find('.multislide-control.right');

    this.totalSlides = 0;
    this.currentSlide = 0;
    this.multiSlideItemsW = 0;
    this.minLeft = 0;

    this.slideOffsets = []; // left-edge of each slide in strip coords
    this.slidePositions = []; // final clamped left value per slide
    this.lastScrollableIndex = 0; // last index that actually moves the strip
  };

  MultiSlider.prototype.init = function () {
    var that = this;

    this.totalSlides = 0;
    this.currentSlide = 0;
    this.multiSlideItemsW = 0;
    this.minLeft = 0;
    this.slideOffsets = [];
    this.slidePositions = [];
    this.lastScrollableIndex = 0;

    // Refresh items
    this.$item = this.$element.find('.item');
    if (!this.$item.length) return;

    // Reset strip geometry
    this.$multiSlideItems.css({ width: 0, left: 0 });

    var accum = 0;

    // Measure each slide and remember offsets
    this.$item.each(function () {
      var $this = $(this);
      var width = $this.outerWidth(true); // includes margin
      that.slideOffsets[that.totalSlides] = accum;
      accum += width;
      that.totalSlides++;
    });

    this.multiSlideItemsW = accum;
    this.$multiSlideItems.width(this.multiSlideItemsW);

    var innerW = this.$multiSlideInner.width();
    this.minLeft = Math.min(0, innerW - this.multiSlideItemsW); // most negative we can go

    // Precompute clamped positions for each slide
    for (var i = 0; i < this.totalSlides; i++) {
      var rawLeft = -this.slideOffsets[i];

      if (rawLeft > 0) rawLeft = 0;
      if (rawLeft < this.minLeft) rawLeft = this.minLeft;

      this.slidePositions[i] = rawLeft;
    }

    // Determine the last index that actually changes scroll position
    this.lastScrollableIndex = 0;
    for (var j = 1; j < this.totalSlides; j++) {
      if (
        this.slidePositions[j] !== this.slidePositions[this.lastScrollableIndex]
      ) {
        this.lastScrollableIndex = j;
      }
    }

    // Start at the first slide
    this.currentSlide = 0;
    this.$multiSlideItems.css('left', this.slidePositions[0] || 0);

    this.setButtonStates();
  };

  MultiSlider.prototype.goTo = function (index) {
    if (!this.totalSlides) return this;

    if (index < 0) index = 0;
    if (index > this.lastScrollableIndex) index = this.lastScrollableIndex;

    var targetLeft = this.slidePositions[index];
    if (typeof targetLeft !== 'number') targetLeft = 0;

    this.currentSlide = index;

    var that = this;
    this.$multiSlideItems.stop(true).animate({ left: targetLeft }, function () {
      that.setButtonStates();
    });

    return this;
  };

  MultiSlider.prototype.moveLeft = function () {
    if (this.currentSlide <= 0) return this;
    return this.goTo(this.currentSlide - 1);
  };

  MultiSlider.prototype.moveRight = function () {
    if (this.currentSlide >= this.lastScrollableIndex) return this;
    return this.goTo(this.currentSlide + 1);
  };

  MultiSlider.prototype.setButtonStates = function () {
    // If everything fits, hide both
    if (
      this.multiSlideItemsW <= this.$multiSlideInner.width() ||
      this.totalSlides <= 1
    ) {
      this.$controlLeft.hide();
      this.$controlRight.hide();
      return this;
    }

    // Left button
    if (this.currentSlide <= 0) {
      this.$controlLeft.hide();
    } else {
      this.$controlLeft.show();
    }

    // Right button
    if (this.currentSlide >= this.lastScrollableIndex) {
      this.$controlRight.hide();
    } else {
      this.$controlRight.show();
    }

    return this;
  };

  MultiSlider.prototype.resize = function () {
    var targetIndex = this.currentSlide || 0;

    this.init();

    if (!this.totalSlides) return this;

    if (targetIndex > this.lastScrollableIndex) {
      targetIndex = this.lastScrollableIndex;
    }

    this.goTo(targetIndex);

    return this;
  };

  // MULTI SLIDE SLIDER PLUGIN DEFINITION
  // ====================================

  $.fn.multislide = function () {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.multislide');
      if (!data) {
        $this.data('bs.multislide', (data = new MultiSlider(this)));
      }
      data.init();
    });
  };

  // MULTI SLIDE SLIDER DATA-API
  // ===========================

  $(document).on(
    'click.bs.multislide.data-api',
    '[data-multislide]',
    function (e) {
      var $this = $(this),
        href = $this.attr('href'),
        $target = $(href && href.replace(/.*(?=#[^\s]+$)/, '')), // strip for ie7
        whichWay = $this.data('multislide'),
        instance = $target.data('bs.multislide');

      if (!instance) {
        $target.multislide();
        instance = $target.data('bs.multislide');
      }

      if (whichWay === 'left') {
        instance.moveLeft();
      } else if (whichWay === 'right') {
        instance.moveRight();
      }

      e.preventDefault();
    }
  );

  // Auto-init for [data-ride="multislide"]
  $(window).on('load.bs.multislide.data-api', function () {
    $('[data-ride="multislide"]').each(function () {
      var $this = $(this);
      if (!$this.data('bs.multislide')) {
        $this.multislide();
      }
    });
  });

  // Debounced resize handling
  $(window).on('resize.bs.multislide', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      $('[data-ride="multislide"]').each(function () {
        var $multislide = $(this);
        var instance = $multislide.data('bs.multislide');
        if (instance) {
          instance.resize();
        }
      });
    }, 50);
  });
})(window.jQuery);
