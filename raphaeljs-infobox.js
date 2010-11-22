// Copyright 2010: Kelley Reynolds, Inside Systems Inc.
// http://blog.insidesystems.net/embedding-arbitrary-html-into-raphaeljs

// Takes a raphaeljs object, some options, and some container attributes
  function Infobox(r, options, attrs) {
    options = options || {};
    attrs = attrs || {};
    this.paper = r;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.width = options.width || 250;
    this.height = options.height || 245;
    this.rounding = options.rounding || 10;
    this.container = this.paper.rect(this.x, this.y, this.width, this.height, this.rounding).attr(attrs);
    var container_id = this.container.node.parentNode.parentNode.id;
    container_id = container_id || this.container.node.parentNode.parentNode.parentNode.id;
    this.raph_container = jQuery('#' + container_id);
    
    this.div = jQuery('<div style="position: absolute; overflow: auto; width: 0; height: 0; display: none"></div>').insertAfter(this.raph_container);
    jQuery(document).bind('ready', this, function(event) { event.data.update(); });
    jQuery(window).bind('resize', this, function(event) { event.data.update(); });
  }

  Infobox.prototype.update = function() {
    var offset = this.raph_container.offset();
    this.div.css({
      'top': (this.y + (this.rounding) + (offset.top)) + 'px',
      'left': (this.x + (this.rounding) + (offset.left)) + 'px',
      'height': (this.height - (this.rounding*2) + 'px'),
      'width': (this.width - (this.rounding*2) + 'px')
    });
  }
  
  // Note that the fadein/outs for the content div are at double speed. With frequent animations, it gives the best behavior
  Infobox.prototype.show = function() {
    this.container.animate({opacity: 1}, 400, ">");
    this.div.fadeIn(200);
  }

  Infobox.prototype.hide = function() {
    this.container.animate({opacity: 0}, 400, ">");
    this.div.fadeOut(200);
  }
