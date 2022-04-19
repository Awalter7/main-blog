const firebaseConfig = {
    apiKey: "AIzaSyCFUz4czbiLnuA7M7TBVX-iECvKutd8emY",
    authDomain: "main-blog-17ac9.firebaseapp.com",
    projectId: "main-blog-17ac9",
    storageBucket: "main-blog-17ac9.appspot.com",
    messagingSenderId: "188291999968",
    appId: "1:188291999968:web:0a0a6547af55693f270885",
    measurementId: "G-N1ZFZZ7BQT"
};
firebase.initializeApp(firebaseConfig);

$.extend({
    getUrlVars: function () {
        var vars = [],
        hash;
      var hashes = window.location.href
        .slice(window.location.href.indexOf('?') + 1)
        .split('&');
      for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
      }
      return vars;
    },
    getUrlVar: function (name) {
      return $.getUrlVars()[name];
    },
});

let blogPostsTags = [];
let Tags = [];
let blogPostsInit = [];

$(document).ready(function () {
    firebase.firestore().collection('blog-posts').get().then((snapshot) => { 
    
    snapshot.docs.forEach(doc => {
        blogPostsTags.push({ ...doc.data() });
    })

    for(let i = 0; i < blogPostsTags.length; i++){
        
        let ul = document.getElementById('Search-bar-ul');
        let canItem =  blogPostsTags[i].canItem;   
        if(!Tags.includes(canItem)){
            let li = document.createElement("li");
            li.id = "search-bar-tag";
            let a = document.createElement("a");

            var aId = blogPostsTags[i].canItem.split(" ").join("-");
            a.id = aId;
            li.appendChild(a);
            a.innerHTML = blogPostsTags[i].canItem;

            Tags.push(blogPostsTags[i].canItem);
    
            document.getElementById("search-bar-ul").appendChild(li);
            a.setAttribute("onclick", "reply_click_tag(this.id)")

        }

        var tags = (blogPostsTags[i].tag1).split(",");
        
        
        for(var j = 0; j < tags.length; j++){
            tag = tags[j]
            if(!Tags.includes(tag)){
                let li = document.createElement("li")
                li.id = "search-bar-tag"
                let a = document.createElement("a");
                aId =tag.split(" ").join("-");
                a.id = aId;
                
                li.appendChild(a);
                a.setAttribute("onclick", "reply_click_tag(this.id)")
                a.innerHTML = tag;

                Tags.push(tag)

                document.getElementById("search-bar-ul").appendChild(li);
            }
        }
    }
});
var showFullArticles = true;
    if($.getUrlVar('contentId') != undefined){
        var contentId = $.getUrlVar('contentId').split("-").join(" ");
        showFullArticles = false;

        $("#header-search-tag").html("<br><i> Searching For: <i> " + " '" + contentId + "'");

        
        firebase.firestore().collection('blog-posts').get().then((snapshot) => { 

            snapshot.docs.forEach(doc => {
                blogPostsInit.push({ ...doc.data() });
            })


            var firstPass = true;
            for(let i = 0; i < blogPostsInit.length; i++){
                var pas = false;
                if(blogPostsInit[i].author.toLowerCase().includes(contentId.toLowerCase())){
                    console.log("Does Contain: " + contentId)
                    pas = true;

                }else if(blogPostsInit[i].canItem.toLowerCase().includes(contentId.toLowerCase())){
                    console.log("Does Contain: " + contentId)
                    pas = true;
                    
                }else if(blogPostsInit[i].postDate.toLowerCase().includes(contentId.toLowerCase())){
                    console.log("Does Contain: " + contentId)
                    pas = true;
                    
                }else if(blogPostsInit[i].description.toLowerCase().includes(contentId.toLowerCase())){
                    console.log("Does Contain: " + contentId)
                    pas = true;
                    
                }else if(blogPostsInit[i].html.toLowerCase().includes(contentId.toLowerCase())){
                    console.log("Does Contain: " + contentId)
                    pas = true;
                    
                }else if(blogPostsInit[i].tag1.toLowerCase().includes(contentId.toLowerCase())){
                    console.log("Does Contain: " + contentId)
                    pas = true;
                    
                }else if(blogPostsInit[i].title.toLowerCase().includes(contentId.toLowerCase())){
                    console.log("Does Contain: " + contentId)
                    pas = true;
                    
                }else{
                    console.log("Does not Contain: " + contentId)
                }

                    let gallery = document.getElementsByClassName('myGallery');
                    let div = document.getElementsByClassName('item');
                    let clone = div[0].cloneNode(true);
                    if(firstPass == true && pas == true){
                        document.querySelector("span#author").textContent = blogPostsInit[i].author;
                        $("#author").removeClass("animated-background")
                        document.querySelector("span#date").textContent = blogPostsInit[i].postDate;
                        $("#date").removeClass("animated-background")
                        document.querySelector("span#title").textContent = blogPostsInit[i].title;
                        $("#title").removeClass("animated-background")
                        document.querySelector("span#description").textContent = blogPostsInit[i].description.slice(0, 200)+".....";
                        $("#description").removeClass("animated-background")
                        document.querySelector("img#item-image").src = blogPostsInit[i].coverImage;
                        $("#item-image").removeClass("animated-background")
                        document.querySelector("li#item-CanItem").innerHTML = blogPostsInit[i].canItem;

                        var tags = (blogPostsInit[i].tag1).split(",");
                        var itemTagUl = document.getElementById("item:0").firstElementChild.childNodes[11]

                        for(var j = 0; j < tags.length; j++){
                            let li = document.createElement("li")
                            li.textContent = tags[j];
                            li.id = "item-tag-li"
                            itemTagUl.append(li);
                        }

        
                        document.getElementById('item:0').style.height = "min-content";
                        firstPass = false;
                    }else if(pas == true){



                        cloneId = "item:" + i;
                        clone.id = cloneId;

                        clone.firstElementChild.childNodes[11].textContent = ""

                        var tags = (blogPostsInit[i].tag1).split(",");
                        var itemTagUl = clone.firstElementChild.childNodes[11]

                        let li = document.createElement("li")
                        li.id = "item-CanItem"
                        itemTagUl.append(li);

                        clone.querySelector("span#author").textContent = blogPostsInit[i].author;
                        clone.querySelector("span#date").textContent = blogPostsInit[i].postDate;
                        clone.querySelector("span#title").textContent = blogPostsInit[i].title;
                        clone.querySelector("span#description").textContent = blogPostsInit[i].description.slice(0, 200)+".....";
                        clone.querySelector("img#item-image").src = blogPostsInit[i].coverImage;
                        clone.querySelector("li#item-CanItem").innerHTML = blogPostsInit[i].canItem;
                        
                        for(var j = 0; j < tags.length; j++){
                            let li = document.createElement("li")
                            li.textContent = tags[j];
                            li.id = "item-tag-li"
                            itemTagUl.append(li);
 
                        }
                        
                        
                        gallery[0].appendChild(clone);

                        document.getElementById(cloneId).style.height = "min-content";
                    }
                $("#placeholder-item-1").hide();
                $("#placeholder-item-2").hide();
            };

        });
    }else if($.getUrlVar('articleId') != undefined){
            var articleId = $.getUrlVar('articleId')
            
            firebase.firestore().collection('blog-posts').doc(articleId).get().then(function (doc) {
                if (doc.exists) {
                    $('#article-header-title').html(doc.data().title);
                    $('.article-html').html(doc.data().html);
                    $('#article-header-date').html(doc.data().postDate);
                    $('#article-tags').html("Tags: " + doc.data().tag1.split(",").join(", "));
                    $('#article-header-p').html("By: " + doc.data().author);
                    $("article").css("visibility", "visible");
                } else {
                // doc.data() will be undefined in this case
                    console.log('No such document!');
                }
            })
            .catch(function (error) {
                console.log('Error getting document:', error);
            });
        
    }
    if(showFullArticles == true){
        firebase.firestore().collection('blog-posts').get().then((snapshot) => { 

            snapshot.docs.forEach(doc => {
                blogPostsInit.push({ ...doc.data() });
            })

            for(let i = 0; i < blogPostsInit .length; i++){
                
                let gallery = document.getElementsByClassName('myGallery');
                let div = document.getElementsByClassName('item');
                let clone = div[0].cloneNode(true);

                if(i == 0){
                    document.querySelector("span#author").textContent = blogPostsInit[blogPostsInit.length-1].author;
                    $("#author").removeClass("animated-background")
                    document.querySelector("span#date").textContent = blogPostsInit[blogPostsInit.length-1].postDate;
                    $("#date").removeClass("animated-background")
                    document.querySelector("span#title").textContent = blogPostsInit[blogPostsInit.length-1].title;
                    $("#title").removeClass("animated-background")
                    document.querySelector("span#description").textContent = blogPostsInit[blogPostsInit.length-1].description.slice(0, 200)+".....";
                    $("#description").removeClass("animated-background")
                    document.querySelector("img#item-image").src = blogPostsInit[blogPostsInit.length-1].coverImage;
                    $("#item-image").removeClass("animated-background")
                    document.querySelector("li#item-CanItem").innerHTML = blogPostsInit[blogPostsInit.length-1].canItem;

                    var tags = (blogPostsInit[blogPostsInit.length-1].tag1).split(",");
                    var itemTagUl = document.getElementById("item:0").firstElementChild.childNodes[11]

                    for(var j = 0; j < tags.length; j++){
                        let li = document.createElement("li")
                        li.textContent = tags[j];
                        li.id = "item-tag-li"
                        itemTagUl.append(li);
                    }

                    document.getElementById('item:0').style.height = "min-content";
                }else{
                    cloneId = "item:" + i;
                    clone.id = cloneId;

                    clone.firstElementChild.childNodes[11].textContent = ""

                    var tags = (blogPostsInit[blogPostsInit.length - i-1].tag1).split(",");
                    var itemTagUl = clone.firstElementChild.childNodes[11]

                    let li = document.createElement("li")
                    li.id = "item-CanItem"
                    itemTagUl.append(li);

                    clone.querySelector("span#author").textContent = blogPostsInit[blogPostsInit.length - i-1].author;
                    clone.querySelector("span#date").textContent = blogPostsInit[blogPostsInit.length - i-1].postDate;
                    clone.querySelector("span#title").textContent = blogPostsInit[blogPostsInit.length - i-1].title;
                    clone.querySelector("span#description").textContent = blogPostsInit[blogPostsInit.length - i-1].description.slice(0, 200)+".....";
                    clone.querySelector("img#item-image").src = blogPostsInit[blogPostsInit.length - i-1].coverImage;
                    clone.querySelector("li#item-CanItem").innerHTML = blogPostsInit[blogPostsInit.length - i-1].canItem;

                    for(var j = 0; j < tags.length; j++){
                        let li = document.createElement("li")
                        li.textContent = tags[j];
                        li.id = "item-tag-li"
                        itemTagUl.append(li);
                    }
                    
                    $("#placeholder-item-1").hide();
                    $("#placeholder-item-2").hide();

                    
                    gallery[0].appendChild(clone);

                    document.getElementById(cloneId).style.height = "min-content";
                }
            }
        });
    }
    
});

let blogPostsSug = [];

firebase.firestore().collection('blog-posts').orderBy("likes").get().then((snapshot) => { 

    snapshot.docs.forEach(doc => {
        blogPostsSug.push({ ...doc.data() });
    })

    for(let i = 0; i < blogPostsSug.length; i++){
        let sugesttions = document.getElementsByClassName('suggestions');
        let div = document.getElementsByClassName('suggestion-likes');
        let clone = div[0].cloneNode(true);
        if(i == 0){
            document.querySelector("span#suggestion-likes-author").textContent = blogPostsSug[blogPostsSug.length-1].author;
            $("#suggestion-likes-author").removeClass("animated-background")
            document.querySelector("span#suggestion-likes-date").textContent = blogPostsSug[blogPostsSug.length-1].postDate;
            $("#suggestion-likes-date").removeClass("animated-background")
            document.querySelector("span#suggestion-likes-title").textContent = blogPostsSug[blogPostsSug.length-1].title;
            $("#suggestion-likes-title").removeClass("animated-background")
            document.querySelector("span#suggestion-likes-description").textContent = blogPostsSug[blogPostsSug.length - i-1].description.slice(0, 100)+".....";
            $("#suggestion-likes-description").removeClass("animated-background")
            document.querySelector("img#suggestion-likes-image").src = blogPostsSug[blogPostsSug.length-1].coverImage;
            $("#suggestion-likes-image").removeClass("animated-background-img")
            var tags = (blogPostsSug[blogPostsSug.length-1].tag1).split(",");
            document.getElementById('suggestion-likes:0').style.height = "min-content";

        }else if(i == 1){
            cloneId = "suggestion-likes:" + i;
            clone.id = cloneId;

            clone.querySelector("span#suggestion-likes-author").textContent = blogPostsSug[blogPostsSug.length - i-1].author;
            clone.querySelector("span#suggestion-likes-date").textContent = blogPostsSug[blogPostsSug.length - i-1].postDate;
            clone.querySelector("span#suggestion-likes-title").textContent = blogPostsSug[blogPostsSug.length - i-1].title;
            clone.querySelector("span#suggestion-likes-description").textContent = blogPostsSug[blogPostsSug.length - i-1].description.slice(0, 100)+".....";
            clone.querySelector("img#suggestion-likes-image").src = blogPostsSug[blogPostsSug.length - i-1].coverImage;

            sugesttions[0].appendChild(clone);
            document.getElementById(cloneId).style.height = "min-content";
        }
        else if(i == 2){
            cloneId = "suggestion-likes:" + i;
            clone.id = cloneId;

            clone.querySelector("span#suggestion-likes-author").textContent = blogPostsSug[blogPostsSug.length - i-1].author;
            clone.querySelector("span#suggestion-likes-date").textContent = blogPostsSug[blogPostsSug.length - i-1].postDate;
            clone.querySelector("span#suggestion-likes-title").textContent = blogPostsSug[blogPostsSug.length - i-1].title;
            clone.querySelector("span#suggestion-likes-description").textContent = blogPostsSug[blogPostsSug.length - i-1].description.slice(0, 100)+".....";
            clone.querySelector("img#suggestion-likes-image").src = blogPostsSug[blogPostsSug.length - i-1].coverImage;

            sugesttions[0].appendChild(clone);
            document.getElementById(cloneId).style.height = "min-content";
        }
    }

});



    firebase.firestore().collection('blog-posts').orderBy("views").get().then((snapshot) => { 
    $(".suggestions").append("<h1 id='widget-header'>Popular</h1><div class='suggestion-clicks' id ='suggestion-clicks:0' onClick='reply_click_article(this.id)'><a ><img id='suggestion-clicks-image' src='https://picsum.photos/190/190?11' /><span id='suggestion-clicks-title'>This is an Example Title</span><br><span id='suggestion-clicks-author'>Austin Walter</span><br><span id='suggestion-clicks-date'>01.16.2022</span><br><span id='suggestion-clicks-description'>Example</span></a></div>")

    snapshot.docs.forEach(doc => {
        blogPostsSug.push({ ...doc.data() });
    })

    for(let i = 0; i < blogPostsSug .length; i++){
        let sugesttions = document.getElementsByClassName('suggestions');
        let div = document.getElementsByClassName('suggestion-clicks');
        let clone = div[0].cloneNode(true);
        if(i == 0){
            document.querySelector("span#suggestion-clicks-author").textContent = blogPostsSug[blogPostsSug.length-1].author;
            document.querySelector("span#suggestion-clicks-date").textContent = blogPostsSug[blogPostsSug.length-1].postDate;
            document.querySelector("span#suggestion-clicks-title").textContent = blogPostsSug[blogPostsSug.length-1].title;
            document.querySelector("span#suggestion-clicks-description").textContent = blogPostsSug[blogPostsSug.length - i-1].description.slice(0, 100)+".....";
            document.querySelector("img#suggestion-clicks-image").src = blogPostsSug[blogPostsSug.length-1].coverImage;

            var tags = (blogPostsSug[blogPostsSug.length-1].tag1).split(",");
            document.getElementById('suggestion-clicks:0').style.height = "min-content";

        }else if(i == 1){
            cloneId = "suggestion-clicks:" + i;
            clone.id = cloneId;

            clone.querySelector("span#suggestion-clicks-author").textContent = blogPostsSug[blogPostsSug.length - i-1].author;
            clone.querySelector("span#suggestion-clicks-date").textContent = blogPostsSug[blogPostsSug.length - i-1].postDate;
            clone.querySelector("span#suggestion-clicks-title").textContent = blogPostsSug[blogPostsSug.length - i-1].title;
            clone.querySelector("span#suggestion-clicks-description").textContent = blogPostsSug[blogPostsSug.length - i-1].description.slice(0, 100)+".....";
            clone.querySelector("img#suggestion-clicks-image").src = blogPostsSug[blogPostsSug.length - i-1].coverImage;

            sugesttions[0].appendChild(clone);
            document.getElementById(cloneId).style.height = "min-content";
        }
        else if(i == 2){
            cloneId = "suggestion-clicks:" + i;
            clone.id = cloneId;

            clone.querySelector("span#suggestion-clicks-author").textContent = blogPostsSug[blogPostsSug.length - i-1].author;
            clone.querySelector("span#suggestion-clicks-date").textContent = blogPostsSug[blogPostsSug.length - i-1].postDate;
            clone.querySelector("span#suggestion-clicks-title").textContent = blogPostsSug[blogPostsSug.length - i-1].title;
            clone.querySelector("span#suggestion-clicks-description").textContent = blogPostsSug[blogPostsSug.length - i-1].description.slice(0, 100)+".....";
            clone.querySelector("img#suggestion-clicks-image").src = blogPostsSug[blogPostsSug.length - i-1].coverImage;

            sugesttions[0].appendChild(clone);
            document.getElementById(cloneId).style.height = "min-content";
        }
    }
    });
    document.querySelector("#articleSubmitBtn").addEventListener("click", function(event){
    event.preventDefault();
    var innerDocument = document.getElementById('htmeditor_ifr').contentWindow.document

    var inputJson = {
        title: document.getElementById("inputtitle").value,
        author: document.getElementById("inputFirstName").value + document.getElementById("inputLastName").value,
        description: document.getElementById("descriptionTextArea").value,
        tag1: document.getElementById("inputTag1").value,
        canItem: document.getElementById("inputCanItem").value,
        coverImage: document.getElementById("inputCoverImage").value,
        html: innerDocument.getElementById('tinymce').innerHTML,
        aproved: true,
    };
    firebase.firestore().collection("blog-posts").doc((document.getElementById("inputtitle").value.split(" ").join("-"))).set(inputJson)
    });

    function reply_click_article(id){
        var id = document.getElementById(id).childNodes[1].childNodes[7].innerHTML.trim().split(" ").join("-");
        checkArticleClickedCookie(id);
        window.open("index.html?articleId=" + id)
    }
    function reply_click_tag(id){
        checkArticleClickedCookie(id);
        window.open("index.html?contentId=" + id)
    }
    document.addEventListener('keypress', function (e) {
        if (e.keyCode === 13 || e.which === 13) {
            e.preventDefault();
            
        }
    });
    document.getElementById("search-bar").addEventListener('keypress', function (e) {
        if (e.keyCode === 13 || e.which === 13) {
            e.preventDefault();
            var searchId = $("#search-bar").val().trim().split(" ").join("-");
            window.open("index.html?contentId=" + searchId)
            
        }
    });
    function setArticleClickedCookie(cname, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=clicked" + ";" + expires + ";path=/";
    }
    function getArticleClickedCookie(cname) {
        let name = cname;
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
    function checkArticleClickedCookie(cname) {

    let articleClick = getArticleClickedCookie(cname);
    if (articleClick != "=clicked") {
        
        setArticleClickedCookie(cname, 365);
        firebase.firestore().collection('blog-posts').doc(cname).get().then(function (doc) {
            if (doc.exists) {
                var docRef = doc.data()
                var numViews =  docRef.views;
                docRef.views = numViews +1;
                firebase.firestore().collection('blog-posts').doc(cname).set(docRef)
                
            } else {
                // doc.data() will be undefined in this case
                console.log('No such document!');
            }
        })
        .catch(function (error) {
            console.log('Error getting document:', error);
        });

    }

    }