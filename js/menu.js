/*menu*/
var toggle_btn = document.querySelector(".main-menu__toggle");
var mobile_menu = document.querySelector(".main-menu__list");

if (document.documentElement.clientWidth >= 768) {
  mobile_menu.classList.remove("main-menu__list--open")
};

if (mobile_menu.classList.contains("main-menu__list--nojs")) {
    mobile_menu.classList.remove("main-menu__list--nojs");
    toggle_btn.classList.remove("main-menu__toggle--nojs");
};

toggle_btn.addEventListener("click", function(event) {
  event.preventDefault();
      mobile_menu.classList.toggle("main-menu__list--open");
      toggle_btn.classList.toggle("main-menu__toggle--close");
});
/*end menu*/

/*short_caracteristic*/

var toggle_btn_caracteristic = document.querySelector(".short_caracteristic");
var mobile_dl = document.querySelector(".short_caracteristic__dl");

if (mobile_dl.classList.contains("short_caracteristic__dl--nojs")) {
    mobile_dl.classList.remove("short_caracteristic__dl--nojs");
    toggle_btn_caracteristic.classList.remove("short_caracteristic--nojs");
};

toggle_btn_caracteristic.addEventListener("click", function(event) {
  event.preventDefault();
      mobile_dl.classList.toggle("short_caracteristic__dl--open");
      toggle_btn_caracteristic.classList.toggle("short_caracteristic--close");
});

/*mobile__show-more*/
//var toggle_show-more = document.querySelector(".mobile__show-more");
 var toggle_btn_show = document.querySelector(".mobile__show-more");
 var block__more = document.querySelector(".block__more");
if (block__more.classList.contains("block__more--nojs")) {
    block__more.classList.remove("block__more--nojs");
    toggle_btn_show.classList.remove("mobile__show-more--nojs");
};

toggle_btn_show.addEventListener("click", function(event) {
  event.preventDefault();
      block__more.classList.toggle("block__more--open");
      toggle_btn_show.classList.toggle("mobile__show-more--close");
});