$(document).ready(function() {
            
    
    $('Article').fadeToggle();
});

function onLoadAnimation(x){
    var searchBr = $('#search-br').last();
    var offBr = searchBr.offset();
    var offsetBr = offBr.left

    var tween = gsap.to("#search-br", {duration: x, x:"-" + offsetBr});
    tween.play();

    var navBr = $('#nav-bar-top').last();
    var navBar = navBr.offset();
    var offsetNav = navBar.left

    var tween = gsap.to("#nav-bar-top", {duration: x, x:"-" + offsetNav});
    var tween = gsap.to("#account", {duration: x, y:-1150});
    tween.play();
}
function preLoaderFadeout(){
    $(".pre-loader").fadeOut();
    $('body').css('overflow', "scroll");
    $('body').css('overflow-x', "hidden");
}
function animateHeadTopPos(){
    var tittle = $('#header-title').last();
    var offsetTittle = tittle.offset();
    var message = $('#welcome-message-h1').last();
    var offsetMessage = message.offset();


    var offsetFinalY = offsetMessage.top - offsetTittle.top  
    console.log(offsetFinalY);

    var tween = gsap.to("#welcome-message-h1", {duration: 2, y: "-" + offsetFinalY});
    tween.play();
}
function animateHeadLftPos(){
    var tittle = $('#header-title').last();
    var offsetTittle = tittle.offset();
    var message = $('#welcome-message-h1').last();
    var offsetMessage = message.offset();

    var offsetFinalX = offsetMessage.left - offsetTittle.left
    var tween = gsap.to("#welcome-message-h1", {duration: 2, x: "-" + offsetFinalX});
    tween.play();

}

function onFailure(error) {
console.log(error);
}
function onSignIn(googleUser) {
// Useful data for your client-side scripts:
var profile = googleUser.getBasicProfile();
console.log("ID: " + profile.getId()); // Don't send this directly to your server!
console.log('Full Name: ' + profile.getName());
console.log('Given Name: ' + profile.getGivenName());
console.log('Family Name: ' + profile.getFamilyName());
console.log("Image URL: " + profile.getImageUrl());
console.log("Email: " + profile.getEmail());

// The ID token you need to pass to your backend:
var id_token = googleUser.getAuthResponse().id_token;
console.log("ID Token: " + id_token);

console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
 var profile = googleUser.getBasicProfile()

 var element = document.querySelector('#username')
 element.innerText = profile.getName();

var imageUrl = "url('" + profile.getImageUrl() +"')";
console.log(imageUrl)
document.getElementById("circle").style.backgroundImage = imageUrl

}
window.onscroll = function() {myFunction()};

var navbar = document.getElementById("search-br");
var sticky = navbar.offsetTop;

function myFunction() {
if (window.pageYOffset >= sticky) {
    navbar.classList.remove("no-stick");
    navbar.classList.add("sticky")
    
} else {
    navbar.classList.add("no-stick");
    navbar.classList.remove("sticky");
}
}
let slider = document.querySelector("#slider");
let slides = document.querySelectorAll("#slider img");
let currentSlide = 0;
let dots;
let autoSlide;
let autoSlidePlay = true;


var ham = document.querySelector(".ham");
ham.addEventListener("click", function(){
    console.log();
    if(window.getComputedStyle(document.getElementById("account"), null).width > "100px"){
        $('#account').animate({width: 100}, {duration: 500});
        $('.form-control').animate({left: 100}, {duration: 500});
        $('#search-addon').animate({left: 140}, {duration: 500});
        $('#circle').animate({left: 15}, {duration: 500});
        $('#username').fadeOut();
        $('#settings').fadeOut();
        $('#upload').fadeOut();
        $('#account i').css("fontSize", "30px")
        $('#account i').animate({left: 83}, {duration: 500});
        $('#acnt-container').animate({height: 100}, {duration: 500});
    }else{
        $('#account').animate({width: 150}, {duration: 500});
        $('.form-control').animate({left: 150}, {duration: 500});
        $('#search-addon').animate({left: 190}, {duration: 500});
        $('#circle').animate({left: 40}, {duration: 500});
        $('#account i').animate({left: 75}, {duration: 500});
        $('#account i').css("fontSize", "20px")
        $('#username').fadeIn();
        $('#settings').fadeIn();
        $('#upload').fadeIn();
        $('#acnt-container').animate({height: 120}, {duration: 500});   
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

function toggleArticleUpload(){
    console.log("test")
    $('.up-container').fadeToggle();
}

document.querySelector(".fa").addEventListener("click", function(event){
    toggleArticleUpload();
    event.preventDefault();
});
document.querySelector("#acnt-upload-cnt").addEventListener("click", function(event){
    toggleArticleUpload();
    event.preventDefault();
});

function toggleArticleShow(){
    console.log("test")
    $('Article').fadeToggle();
    $('.myGallery').toggle();
}




jQuery(document).ready(function($){
    checkCookie();
    var path = window.location.pathname.split("/").pop();
    if ( path == '' ) {
        path = 'index.html';
    }

    var target = $('#navbarSupportedContent ul li a[href="'+path+'"]');
    target.parent().addClass('active');
});
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
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
function checkCookie() {
let username = getCookie("username");
if (username != "") {
    $(".pre-loader").hide();
    $('article').hide();
    $('.up-container').hide();
    setTimeout(onLoadAnimation(0), 3000)

} else {
    $('article').hide();
    $('.up-container').hide();
    setTimeout(animateHeadTopPos, 1000)
    setTimeout(animateHeadLftPos, 3000)
    setTimeout(onLoadAnimation(2), 3000)
    setTimeout(preLoaderFadeout, 5000)
    username = Math.random().toString(36).substr(2, 9);
    if (username != "" && username != null) {
    setCookie("username", username, 365);
    }
}
}

