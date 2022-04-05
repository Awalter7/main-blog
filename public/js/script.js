

$(document).ready(function() {
    $(".account-container").fadeToggle();
    $(".ham").fadeToggle()
    $(".body-wrapper").css("grid-template-columns", "100px auto 250px");
    $("#home-body-wrapper").css("grid-template-columns", "100px 300px auto 250px");
    const loaderInterval = setInterval(function(){
        $(".bookshelf-loader").fadeToggle();
        clearInterval(loaderInterval);
    }, 1000);

    
});
function toggleLoader(){
    $(".bookshelf-loader").fadeToggle();
}

function onLoadAnimation(x){
    var searchBr = $('#search-br').last();
    var offBr = searchBr.offset();
    var offsetBr = offBr.left

    var tween = gsap.to("#search-br", {duration: x, x:"-" + offsetBr});
    tween.play();

    var navBr = $('#navbar-top').last();
    var navBar = navBr.offset();
    var offsetNav = navBar.left

    var tween = gsap.to("#navbar-top", {duration: x, x:"-" + offsetNav});
    var tween = gsap.to(".account-container", {duration: x, y:-1150});
    tween.play();
}
function preLoaderFadeout(){
    $('body').css('overflow', "scroll");
    $('body').css('overflow-x', "hidden");
}



function onFailure(error) {
console.log(error);
}
function onSignIn(googleUser) {
// Useful data for your client-side scripts:
console.log(document.getElementsByClassName("#connectedeips8grnz9za").innerText)
document.getElementsByClassName("#connectedeips8grnz9za").innerText = "Sign out"

var profile = googleUser.getBasicProfile();

// The ID token you need to pass to your backend:
var id_token = googleUser.getAuthResponse().id_token;

var profile = googleUser.getBasicProfile()

var element = document.querySelector('#username')
element.innerText = profile.getName();

var imageUrl = "url('" + profile.getImageUrl() +"')";
document.getElementById("user-icon").style.backgroundImage = imageUrl

console.log("made it here")
$(".account-container").fadeToggle()
$(".ham").fadeToggle()
$(".body-wrapper").css("grid-template-columns", "100px 300px auto 250px");

}
let slider = document.querySelector("#slider");
let slides = document.querySelectorAll("#slider img");
let currentSlide = 0;
let dots;
let autoSlide;
let autoSlidePlay = true;


var ham = document.querySelector(".ham");
ham.addEventListener("click", function(){
    if(window.getComputedStyle(document.getElementById("account-container-animation"), null).width > "100px"){
        $('.account-container').animate({width: 100}, {duration: 500});
        $('.form-control').animate({left: 100}, {duration: 500});
        $('#search-addon').animate({left: 140}, {duration: 500});
        $('#user-icon').animate({left: 15}, {duration: 500});
        $('#username').fadeOut();
        $('#settings').fadeOut();
        $('#admin').fadeOut()
        $('#upload').fadeOut();
        $('.account-container i').css("fontSize", "30px")
        $('#Upload-icon').css("fontSize", "27px")
        $('#admin-icon').css("fontSize", "25px")
        $('.account-container i').animate({left: 83}, {duration: 500});
        $('#account-user-container').animate({height: 100}, {duration: 500});
    }else{
        $('.account-container').animate({width: 150}, {duration: 500});
        $('.form-control').animate({left: 150}, {duration: 500});
        $('#search-addon').animate({left: 190}, {duration: 500});
        $('#user-icon').animate({left: 40}, {duration: 500});
        $('.account-container i').animate({left: 75}, {duration: 500});
        $('.account-container i').css("fontSize", "20px")
        $('#username').fadeIn();
        $('#settings').fadeIn();
        $('#admin').fadeIn();
        $('#upload').fadeIn();
        $('#account-user-container').animate({height: 120}, {duration: 500});   
    }            
})


function addCaptions(){
    let link = document.getElementById('slider_caption');
    link.href = slides[currentSlide].dataset.url
    link.title = slides[currentSlide].dataset.title + ': read more'
    let title = document.querySelector("#slider_caption h1");
    title.innerHTML = slides[currentSlide].dataset.title;
    let descr = document.querySelector("#slider_caption p");
    descr.innerHTML = slides[currentSlide].alt;
}
// ---------Responsive-navbar-active-animation-----------
function test(){
    var tabsNewAnim = $('#navbarSupportedContent');
    var selectorNewAnim = $('#navbarSupportedContent').find('li').length;
    var activeItemNewAnim = tabsNewAnim.find('.active');
    var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
    var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
    var itemPosNewAnimTop = activeItemNewAnim.position();
    var itemPosNewAnimLeft = activeItemNewAnim.position();
    $(".hori-selector").css({
        "top":itemPosNewAnimTop.top + "px", 
        "left":itemPosNewAnimLeft.left + "px",
        "height": activeWidthNewAnimHeight + "px",
        "width": activeWidthNewAnimWidth + "px"
    });
    $("#navbarSupportedContent").on("click","li",function(e){
        $('#navbarSupportedContent ul li').removeClass("active");
        $(this).addClass('active');
        var activeWidthNewAnimHeight = $(this).innerHeight();
        var activeWidthNewAnimWidth = $(this).innerWidth();
        var itemPosNewAnimTop = $(this).position();
        var itemPosNewAnimLeft = $(this).position();
        $(".hori-selector").css({
            "top":itemPosNewAnimTop.top + "px", 
            "left":itemPosNewAnimLeft.left + "px",
            "height": activeWidthNewAnimHeight + "px",
            "width": activeWidthNewAnimWidth + "px"
        });
    });
}
$(document).ready(function(){
    setTimeout(function(){ test(); });
});
$(window).on('resize', function(){
    setTimeout(function(){ test(); }, 500);
});
$(".navbar-toggler").click(function(){
    $(".navbar-collapse").slideToggle(300);
    setTimeout(function(){ test(); });
});
document.querySelector(".fa").addEventListener("click", function(event){
    $('.upload-container').fadeToggle();
    var innerDocument = document.getElementById('htmeditor_ifr').contentWindow.document
    event.preventDefault();

});
document.querySelector("#account-upload-container").addEventListener("click", function(event){
    $('.upload-container').fadeToggle();
    event.preventDefault();
});





jQuery(document).ready(function($){
    checkUserCookie();
    var path = window.location.pathname.split("/").pop();
    if ( path == '' ) {
        path = 'index.html';
    }

    var target = $('#navbarSupportedContent ul li a[href="'+path+'"]');
    target.parent().addClass('active');
});
function setUserCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getUserCookie(cname) {
let name = cname + "=";
let decodedCookie = decodeURIComponent(document.cookie);
let ca = decodedCookie.split(';');
for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
    c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
    return c.substring(name.length, c.length);
    }
}
return "";
}
function checkUserCookie() {
let username = getUserCookie("username");
if (username != "") {
    $('.upload-container').hide();
    setTimeout(onLoadAnimation(0), 3000)

} else {
    $('.upload-container').hide();
    setTimeout(onLoadAnimation(2), 3000)
    setTimeout(preLoaderFadeout, 5000)
    username = Math.random().toString(36).substr(2, 9);
    if (username != "" && username != null) {
    setUserCookie("username", username, 365);
    }
}
}

