
$(document).ready(function() {
    togglePosition()
    const loaderInterval = setInterval(function(){
        $(".bookshelf-loader").fadeToggle();
        clearInterval(loaderInterval);
        console.log("here")
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
    tween.play();
}



function onFailure(error) {
    console.log(error);
}
function onSignIn(googleUser) {
    // Useful data for your client-side scripts:

    var profile = googleUser.getBasicProfile();

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;

    var profile = googleUser.getBasicProfile()

    var element = document.querySelector('#username')
    element.innerText = profile.getName();

    var imageUrl = "url('" + profile.getImageUrl() +"')";
    document.getElementById("user-icon").style.backgroundImage = imageUrl



    $(".body-wrapper").css("grid-template-columns", "0px 300px auto 250px");

}
let slider = document.querySelector("#slider");
let slides = document.querySelectorAll("#slider img");
let currentSlide = 0;
let dots;
let autoSlide;
let autoSlidePlay = true;


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


document.querySelector("#nav-settings-container").addEventListener("click", function(event){
   

    if ($('#nav-account-info').css("animation-name") == 'closeAcntAnimation') {
        $('#nav-account-info').css("animation-name", "openAcntAnimation");
        
        $('#nav-account-info').css("-webkit-animation-name", "openAcntAnimation");
        $('#nav-account-info').css("width", "300px");
        $('#nav-account-info').css("height", "300px");
        $("#nav-account-info").css("visibility","visible");
    }else{
        $('#nav-account-info').css("animation-name", "closeAcntAnimation");
        $('#nav-account-info').css("-webkit-animation-name", "closeAcntAnimation");
        $('#nav-account-info').css("width", "0px");
        $('#nav-account-info').css("height", "0px");
        const hiderInterval = setInterval(function(){
            $("#nav-account-info").css("visibility", "hidden")
            clearInterval(hiderInterval);
        }, 1000);
    }
    event.preventDefault();
});
document.querySelector(".fa").addEventListener("click", function(event){
    $('.upload-container').fadeToggle();
    var innerDocument = document.getElementById('htmeditor_ifr').contentWindow.document
    event.preventDefault();

});
document.querySelector("#nav-upload-container").addEventListener("click", function(event){
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
        setTimeout(onLoadAnimation(0), 3000)
        console.log("here")
    } else {
        $(".cookiePop-container").css("visibility", "visible")

    }
    
}

function cookieAccepted(){
    let username;
    setTimeout(onLoadAnimation(2), 3000)
    username = Math.random().toString(36).substr(2, 9);
    if (username != "" && username != null) {
        setUserCookie("username", username, 365);
    }
    $(".cookiePop-container").fadeOut();
}

$(".ham").on("click", toggleAsside);

function toggleAsside(){
    if($(".main-wrapper").css("left") == "200px"){
        $(".main-wrapper").animate({left: "0px"}, 500)
        $("html").css("overflow-y", "scroll")
    }else{
        $(".main-wrapper").animate({left: "200px"}, 500)
        $("html").css("overflow-y", "hidden")
    }
    
}

window.addEventListener('resize', togglePosition);

function togglePosition(){
	if(window.innerWidth < 1350){
		console.log("-------------------------")
		$(".ham").css("visibility", "visible")
		$(".no-stick").css("top", "0px")
		$(".body-wrapper").css("top", "-110px");
		$(".myGallery").css("top", "50px");
		$(".navbar-wrapper").css("visibility", "hidden");
	}else{
		$(".ham").css("visibility", "hidden")
        if($(".main-wrapper").css("left") == "200px"){
            toggleAsside()
        }

		$(".no-stick").css("top", "50px")
		$(".body-wrapper").css("top", "-20px");
		$(".google").css("visibility", "visible");
		$(".navbar-wrapper").css("visibility", "visible")
	}
    if(window.innerWidth < 1130){
        $(".body-wrapper").css("top", "-120px");
    }
    if(window.innerWidth < 1250){
        $("#search-bar-tag-scroller").css("visibility", "hidden")
        $(".back-left-tag-scroller").css("visibility", "hidden")
        $(".back-right-tag-scroller").css("visibility", "hidden")
        $("#search-bar-group").css("margin", "0 auto")
        $("#search-bar-group").css("padding-left", "0")
    }else{
        $("#search-bar-tag-scroller").css("visibility", "visible")
        $(".back-left-tag-scroller").css("visibility", "visible")
        $(".back-right-tag-scroller").css("visibility", "visible")
        $("#search-bar-group").css("margin", "0")
        $("#search-bar-group").css("padding-left", "200px")
    }
	if(window.innerWidth < 1350){
		$("#signin-large").css("visibility", "hidden");
	}else{
		$("#signin-large").css("visibility", "visible")
	}
    var ele = document.getElementById("search-bar-tag-scroller")
    var of = $(ele).offset(), // this will return the left and top
    left = of.left, // this will return left 
    right = $(window).width() - left - 300;
    $("#search-bar-tag-scroller").css("width", right)
    $(".back-right-tag-scroller").css("left",  right - (left - 800))
}


$(".back-right-tag-scroller").on("click", function () {
    console.log("here");
    var container = document.getElementById('search-bar-tag-scroller');
    sideScroll(container,'right',25,100,10);
    
});

$(".back-left-tag-scroller").on("click", function () {
    console.log("here");
    var container = document.getElementById('search-bar-tag-scroller');
    sideScroll(container,'left',25,100,10);
    
});

function sideScroll(element,direction,speed,distance,step){
    scrollAmount = 0;
    var slideTimer = setInterval(function(){
        if(direction == 'left'){
            element.scrollLeft -= step;
        } else {
            element.scrollLeft += step;
        }
        scrollAmount += step;
        if(scrollAmount >= distance){
            window.clearInterval(slideTimer);
        }
    }, speed);
}

