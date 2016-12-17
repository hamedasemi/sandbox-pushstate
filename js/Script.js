$(document).ready(function () {
    //
    $('nav a').not('[href^=http], [href^=https], [href^=#]').click(function (event) {
        event.preventDefault();
        event.stopPropagation();
        $(this).addClass("active").siblings().removeClass("active");
        $("a.active").ChangeTitle("HSH", " | ");
        //var pageTitle = $(this).attr("data-title");
        history.pushState({}, "", $(this).attr("href"));
        $("main").loader("Name", "html", document.location.pathname != "/" ? document.location.pathname : "", "/index.html");
        return false;
    });
});

window.onpopstate = function (event) {
    $("a.active").ChangeTitle("HSH", " | ");
    $("main").loader("Name", "html", document.location.pathname!="/"?document.location.pathname:"", "/index.html");
    
};

jQuery.fn.extend({
    loader: function (title, prefix, path, postfix) {
        var classList = "loading error success";
        $(this).removeClass(classList).addClass("loading");
        //$(document).attr('title', document.location.pathname != "/" ? (title + " | " + document.location.pathname.replace("/", "")) : $(document).attr('title'));

        //$(document).attr('title');

        $("link[data-stylesheet^=stylesheet]").attr("href", prefix + path + "/css/StyleSheet.css");
        $("script[data-script^=script]").attr("src", prefix + path + "/js/Script.js");

        //$("link").each(function(){
        //    if($(this).attr("data-stylesheet") == "stylesheet"){
        //        $(this).attr("href", prefix + path +"/css/StyleSheet.css");
        //    }
        //});
        //$("script").each(function(){
        //    if($(this).attr("data-script") == "script"){
        //        $(this).attr("src", prefix + path +"/js/Script.js");
        //    }
        //});        
        $(this).load(prefix + path + postfix, function (response, status, xhr) {
            $(this).removeClass(classList).addClass(status);
        });
        return this;
    },
    ChangeTitle: function (websiteTitle,seperator) {    
    var pageTitle = $(this).attr("data-title");    
        //if(websiteTitle && pageTitle){
            $(document).attr('title', pageTitle ? websiteTitle+seperator+pageTitle : websiteTitle);
        //}        
        return this;
    }
});
