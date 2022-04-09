

$(document).ready(function() {
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
        setTimeout(onLoadAnimation(2), 3000)
        username = Math.random().toString(36).substr(2, 9);
        if (username != "" && username != null) {
            setUserCookie("username", username, 365);
        }
    }
}


window.addEventListener('resize', toggleHam);

function toggleHam(){
	if(window.innerWidth < 1350){
		console.log("-------------------------")
		$(".ham").css("visibility", "visible")
		$(".no-stick").css("top", "0px")
		$(".body-wrapper").css("top", "-100px");
		$(".myGallery").css("top", "50px");
		$(".navbar-wrapper").css("visibility", "hidden");
	}else{
		$(".ham").css("visibility", "hidden")
		$(".no-stick").css("top", "50px")
		$(".body-wrapper").css("top", "0px");
		
		$(".google").css("visibility", "visible");
		$(".navbar-wrapper").css("visibility", "visible")
	}
	if(window.innerWidth < 1050){
		$("#signin-large").css("visibility", "hidden")
	}else{
		$("#signin-large").css("visibility", "visible")
	}
}