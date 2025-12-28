# Multi Slide Slider Plugin

This plugin uses jQuery. It does not depend on Bootstrap's JavaScript.

For styling, it works fine alongside Bootstrap 5 (CSS). If you want Bootstrap styling in your page, include Bootstrap 5's CSS. The slider controls/icons are up to you.

Get Bootstrap at <http://getbootstrap.com>

Get jQuery at <http://jquery.com>

## Usage

Here is the basic HTML structure for the plugin:

```html
<div id="multislide-example" class="multislide">
  <div class="multislide-inner">
    <div class="multislide-items">
      <div class="item">Slide 1</div>
      <div class="item">Slide 2</div>
      <div class="item">Slide 3</div>
      <div class="item">Slide 4</div>
    </div>

    <!-- Navigation -->
    <a
      class="multislide-control left"
      href="#multislide-example"
      data-multislide="left"
    >
      <span aria-hidden="true">‹</span>
      <span class="visually-hidden">Previous</span>
    </a>
    <a
      class="multislide-control right"
      href="#multislide-example"
      data-multislide="right"
    >
      <span aria-hidden="true">›</span>
      <span class="visually-hidden">Next</span>
    </a>
  </div>
</div>
```

The "multislide-example" id can be changed but must be reflected in the multislide-control links as well as when you initialize the plugin (see code below).

Here are the needed CSS styles for the plugin:

```html
<style type="text/css">
  .multislide {
    height: 200px; /* Adjust to fit your content */
  }

  .multislide-inner {
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;
  }

  .multislide-items {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    display: flex; /* Recommended for no spacing issues */
  }

  .multislide-items .item {
    flex: 0 0 400px; /* Slide width (change per design) */
    height: 100%;
    color: #fff;
    text-align: center;
  }

  /* Navigation Controls */
  .multislide-control {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 7%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #fff !important;
    font-size: 60px;
    text-decoration: none !important;
    visibility: hidden;
  }

  .multislide-control.left {
    left: 0;
  }
  .multislide-control.right {
    right: 0;
  }

  /* Demo slide colors — customize or remove */
  .item:nth-child(1) {
    background: #990000;
  }
  .item:nth-child(2) {
    background: #ff9900;
  }
  .item:nth-child(3) {
    background: #006699;
  }
  .item:nth-child(4) {
    background: #669933;
  }
</style>
```

JavaScript to initialize the plugin:

```html
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="multislider.js"></script>
<script>
  $(function () {
    $('#multislide-example').multislide();
  });
</script>
```

## Creator

**Derrick Pedranti**
