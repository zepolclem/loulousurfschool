(function(b){var d=window,c,f=function(a,b){return function(){a.apply(c,b)}},g=function(){var a;if(!c)throw"Tracker has not been defined";for(a in c)"_"===a.charAt(0)&&b.isFunction(c[a])&&(b.ga[a.substr(1)]=f(c[a],arguments))};b.ga={};b.ga.load=function(a,e){b.ajax({type:"get",url:("https:"===document.location.protocol?"https://ssl":"http://www")+".google-analytics.com/ga.js",cache:!0,success:function(){if(!d._gat||!d._gat._getTracker)throw"Tracker has not been defined";c=d._gat._getTracker(a);g();
b.isFunction(e)&&e(c);c._trackPageview()},dataType:"script",data:null})}})(jQuery);

// création du cookie
function createCookie(name, value, days) {
    if(days){
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		var expires = "; expires=" + date.toGMTString();
	}
	else var expires = "";
	document.cookie  = name + "=" + value + expires + "; path=/";
}
// lecture du cookie
function readCookie(name) {
	var nameEQ = name + "=";
	var ca     = document.cookie.split(';');
	for(var i = 0; i < ca.length; i ++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}

$(document).ready(function(){
    // Notifications pour les cookies
    var cookie_avert   = readCookie("cookie_avert"),
        g_analytics_id = "xxxxxx-x", // Id unique google analytics 
        domain_name    = "www.domain-name.fr"; // nom de domaine du site

    if(cookie_avert === null) { // si le cookie n'existe pas
        banner_text = 'En poursuivant votre navigation sur ce site, vous acceptez l\'éventuelle utilisation de cookies. <button class="btn btn-success btn-gradient btn-sm" id="accept-cookie">J\'accepte</button> <button class="btn btn-danger btn-gradient btn-sm" id="deny-cookie">Je refuse</button>';
        $("body").prepend('<div id="cookies-banner" class="alert alert-warning text-center">' + banner_text + '</div>');
        $("body").css({"top" : $("#cookies-banner").outerHeight() + "px", "position" : "relative"});
        
        // si on accepte, le cookie avec la valeur 'set' est créée, sinon, la valeur 'not'
        $("#accept-cookie, #deny-cookie").click(function(){
            id_button     = $(this).attr("id");
            action_button = (id_button == "accept-cookie")? 'set' : 'not';
        
            createCookie("cookie_avert", action_button, 365);
    	    $("#cookies-banner").slideUp(350).remove();
		    $("body").css({"top" : "0", "position" : ""});
        
            if(action_button == "set"){ // le cookie avec la valeur 'set' est créée (accept)
                // on charge Google analytics
                $.ga.load(g_analytics_id, function(pageTracker) {
    	    		pageTracker._setDomainName(host);
				});
            }
        });
    
        // si aucune action au bout de 10 secondes (implicite)
        setTimeout(function(){
            $("#cookies-banner").slideUp(350).remove();
            $("body").css({"top" : "0", "position" : ""});
            
            // on charge Google analytics
            $.ga.load(g_analytics_id, function(pageTracker) {
    	    	pageTracker._setDomainName(host);
			});
        }, 10000); // 10 sec
        
    }else if(cookie_avert == "set"){ // si le cookie existe avec la valeur 'set'
        // on charge google analytics
        $.ga.load(g_analytics_id, function(pageTracker) {
    	    pageTracker._setDomainName(host);
		});
    }
});