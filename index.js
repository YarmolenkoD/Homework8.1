var container = document.getElementById('tags-container')
var containerStyle = getComputedStyle(container)
var containerWidth = containerStyle.width.split('').map(function (item) {
  if (!isNaN(parseInt(item))) {
    return item
  } else {
    return null
  }
}).join('')
var containerHeight = containerStyle.height.split('').map(function (item) {
  if (!isNaN(parseInt(item))) {
    return item
  } else {
    return null
  }
}).join('')

var arrayOfTags = []
var id = 0

function updateState(arr) {
  container.innerHTML = ''
  arr.forEach(function (el) {
    var tag = document.createElement('div')
    tag.id = el.id
    var className = el.selected ? 'tag-item selected' : 'tag-item'
    tag.classList = className
    tag.style.top = el.position.top + 20 > containerHeight ? containerHeight - 40 + 'px' : el.position.top + 'px'
    tag.style.left = el.position.left + 'px'
    var text = document.createElement('span')
    text.classList.add('text')
    text.innerText = el.value
    var del = document.createElement('span')
    del.classList.add('del')
    del.innerText = 'X'
    tag.appendChild(text)
    tag.appendChild(del)
    tag.addEventListener('click', function (event) {
      if (event.target.classList.contains('del')) {
        var index
        arrayOfTags.forEach(function (el, i) {
          if (parseInt(event.target.parentNode.id) === el.id) {
            index = i
          }
        })
        arrayOfTags.splice(index, 1)
        updateState(arrayOfTags)
        event.stopPropagation()
      }
    }, true)
    container.appendChild(tag)
  })
}

function addTag(position) {
  var tag = {
    id: id++,
    value: 'lorem',
    position: position,
    selected: false
  }
  arrayOfTags.push(tag)
  console.log(11111, arrayOfTags)
  updateState(arrayOfTags)
}

updateState(arrayOfTags)

container.addEventListener('dblclick', function (event) {
  event.stopPropagation()
  var element = event.target.parentNode
  if (element.classList.contains('tag-item')) {
    var newArrayOfTags = []
    arrayOfTags.forEach(function (el) {
      console.log(element.id, el.id)
      if (parseFloat(element.id) === el.id) {
        el.selected = !el.selected
        newArrayOfTags.push(el)
      } else {
        el.selected = false
        newArrayOfTags.push(el)
      }
    })
    arrayOfTags = newArrayOfTags
    updateState(newArrayOfTags)
  } else if (event.target.classList.contains('tags-wrap')) {
    // var left
    // var top

    var position = {
      left: event.pageX - event.target.offsetLeft - 30,
      top: event.pageY - event.target.offsetTop - 20
    }
    addTag(position)
  }
}, false)

container.addEventListener('touchstart', touch, false)
container.addEventListener('mousedown', touch, false)

function touch(event) {
  var dragElement = event.target.parentNode
  var dragContainer = dragElement.parentElement
  if (dragElement.classList.contains('tag-item') && !event.target.classList.contains('del')) {
    dragElement.classList.add('drag')
    function moveAt(e) {


      if (e.pageX - dragElement.offsetWidth / 2 < dragContainer.offsetLeft) {
        dragElement.style.left = '0px'
      } else if (e.pageX + dragElement.offsetWidth / 2 > dragContainer.offsetLeft + parseInt(containerWidth)) {
        dragElement.style.left = (parseInt(containerWidth) - dragElement.offsetWidth) + 'px'
      } else {
        dragElement.style.left = (e.pageX - dragElement.offsetWidth / 2) - dragContainer.offsetLeft + 'px'
      }

      if (e.pageY - dragElement.offsetHeight / 2 < dragContainer.offsetTop) {
        dragElement.style.top = dragContainer.offsetTop + 'px'
      } else if (e.pageY + dragElement.offsetHeight / 2 > dragContainer.offsetTop + parseInt(containerHeight)) {
        dragElement.style.top = dragContainer.offsetTop + parseInt(containerHeight) - dragElement.offsetHeight + 'px'
      } else {
        dragElement.style.top = e.pageY - dragElement.offsetHeight / 2 + 'px'
      }

    }

    document.onmousemove = function (e) {
      moveAt(e)
    }

    document.onmouseup = function (e) {
      document.onmousemove = null
      document.onmouseup = null
      dragElement.classList = 'tag-item'
      var newArrayOfTags = arrayOfTags.slice()
      newArrayOfTags[parseFloat(dragElement.id)].position = {
        top: (e.pageY - dragElement.offsetHeight / 2) - dragContainer.offsetTop,
        left: (e.pageX - dragElement.offsetWidth / 2) - dragContainer.offsetLeft
      }
      // arrayOfTags = newArrayOfTags
    }
  }
}

// container.addEventListener('touchstart', onTouch, false)
// container.addEventListener('mousedown', onTouch, false)
//
// function onTouch(event) {
//
// }
//
// container.addEventListener('touchend', touchEnd, false)
// container.addEventListener('mouseup', touchEnd, false)
//
// function touchEnd(event) {
//
// }