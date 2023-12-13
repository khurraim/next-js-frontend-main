$(document).ready(function () {


var checkList = document.getElementById('list1');
var items = document.getElementById('items');
checkList.getElementsByClassName('anchor')[0].onclick = function(evt) {
  if (items.classList.contains('visible')) {
    items.classList.remove('visible');
    items.style.display = "none";
  } else {
    items.classList.add('visible');
    items.style.display = "block";
  }
}
}); 


items.onblur = function(evt) {
  items.classList.remove('visible');
}


$(document).ready(function () {
var checkList = document.getElementById('list2');
var items = document.getElementById('items2');
checkList.getElementsByClassName('anchor2')[0].onclick = function(evt) {
  if (items.classList.contains('visible2')) {
    items.classList.remove('visible2');
    items.style.display = "none";
  } else {
    items.classList.add('visible2');
    items.style.display = "block";
  }

}

items.onblur = function(evt) {
  items.classList.remove('visible2');
}
}); 



$(".selectBox").on("click", function(e) {
  $(this).toggleClass("show");
  var dropdownItem = e.target;
  var container = $(this).find(".selectBox__value");
  container.text(dropdownItem.text);
  $(dropdownItem)
    .addClass("active")
    .siblings()
    .removeClass("active");
});




