define(['jquery'], function ($) {

  var defaults = {
    
  }

  $.fn.draggable = function (options) {
    var settings = $.extend({}, defaults, options),
        body = $('body')

    return this.each(function () {
      var elem = $(this)

      elem.find(settings.dragHandle)
        .bind('mousedown', function (e) {
          elem.addClass('dragging')

          var mouseOffset = {
            left: (e.pageX - elem.offset().left),
            top: (e.pageY - elem.offset().top)
          }

          body
            .bind('mousemove', function (e) {
              elem.css({
                left: e.pageX - mouseOffset.left,
                top: e.pageY - mouseOffset.top
              })
            })
            .one('mouseup', function () {
              body.unbind('mousemove')
              elem.removeClass('dragging')
            })

        })
    })
  }
})