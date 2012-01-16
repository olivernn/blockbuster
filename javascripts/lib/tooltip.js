define(['jquery'], function ($) {

  var elem = $('<div>')

  elem.css({
    position: 'absolute',
    border: '1px solid #666',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '2px',
    borderRadius: '2px',
    color: '#333'
  })

  var show = function (message, point) {
    elem.text(message)

    elem.css({
      left: point.x + 10,
      top: point.y + 10
    })

    $(document.body).append(elem)
  }

  var hide = function () {
    elem.remove()
  }

  return {
    show: show,
    hide: hide
  }
})