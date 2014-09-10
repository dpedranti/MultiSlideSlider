# Multi Slide Slider Plugin

This plugin uses the Twitter Bootstrap JavaScript Framework.

You will need to download and install the latest version of Bootstrap and jQuery for it to work properly.

Download Bootstrap at <http://getbootstrap.com>
Download jQuery at <http://jquery.com>


## Usage

Here is the basic HTML structure for the plugin:

<div id="multislide-example-generic" class="multislide" data-ride="multislide">
  <div class="multislide-inner text-center">
    <div class="multislide-items">
      <div class="item slide1">
        [slide]
      </div>
      <div class="item slide2">
        [slide]
      </div>
      <div class="item slide3">
        [slide]
      </div>
      <div class="item slide4">
        [slide]
      </div>
    </div>
    <a class="multislide-control left" href="#multislide-example-generic" role="button" data-multislide="left">
      <span class="glyphicon glyphicon-chevron-left"></span>
    </a>
    <a class="multislide-control right" href="#multislide-example-generic" role="button" data-multislide="right">
      <span class="glyphicon glyphicon-chevron-right"></span>
    </a>
  </div>
</div>

The “multislide-example-generic” id can be changed but must be reflected in the mulislide-control links as well as when you initialize the plugin (see code below).


Here are the needed CSS styles for the plugin:

<style type="text/css">
  .multislide {
    height: 200px; /* adjust the height according to your needs */
  }
  .multislide-inner {
    float: left;
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0;
    overflow: hidden;
  }
  .multislide-items {
    position: absolute;
    left: 0;
    z-index: 1;
    height: 100%;
  }
  .multislide-items .item {
    position: relative;
    float: left;
    color: #fff;
    text-align: center;
  }
  .multislide-control {
    position:absolute;
    top:0;
    bottom:0;
    z-index:2;
    width:7%;
    color:#fff;
    text-shadow:0 1px 3px rgba(0, 0, 0, 0.6);
  }
  .multislide-control.left {
    left:0;
    background-image:-webkit-linear-gradient(left, color-stop(rgba(0, 0, 0, .5) 0%), color-stop(rgba(0, 0, 0, .0001) 100%));
    background-image: linear-gradient(to right, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, .0001) 100%);
    filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#80000000', endColorstr='#00000000', GradientType=1);
    background-repeat: repeat-x;
  }
  .multislide-control.right {
    right:0;
    left:auto;
    background-image: -webkit-linear-gradient(left, color-stop(rgba(0, 0, 0, .0001) 0%), color-stop(rgba(0, 0, 0, .4) 100%));
    background-image:linear-gradient(to right, rgba(0, 0, 0, .0001) 0%, rgba(0, 0, 0, .4) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#90000000', GradientType=1);
    background-repeat: repeat-x;
  }
  .multislide-control:hover,
  .multislide-control:focus {
    color:#fff;
    text-decoration:none;
  }
  .multislide-control .glyphicon-chevron-left,
  .multislide-control .glyphicon-chevron-right {
    position:absolute;
    top:50%;
    z-index:5;
    display:inline-block;
    margin-top:-15px;
    font-size:30px;
    line-height:1;
  }
  .multislide-control .glyphicon-chevron-left {
    left:15px;
  }
  .multislide-control .glyphicon-chevron-right {
    right:15px;
  }
  
  /* styles below should be customized to fit your needs */
  .multislide-items .item {
    height: 100%;
    width: 485px;
  }
  .slide1 {
    background-color: #990000;  
  }
  .slide2 {
    background-color: #ff9900;
  }
  .slide3 {
    background-color: #006699;
  }
  .slide4 {
    background-color: #669933;  
  }
</style>


JavaScript to initialize the plugin:

$(function() {

  // Initialize Multi Slide Slider
  $('#multislide-example-generic').multislide();

});


## Creator

**Derrick Pedranti**