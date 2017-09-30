function kf_setCookie(name, value, exp, path, domain)
{
    var nv = name + "=" + escape(value) + ";";
    var d = null;
    if (typeof (exp) == "object") {
        d = exp;
    }
    else if (typeof (exp) == "number") 
    {
        d = new Date();
        d = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes() + exp, d.getSeconds(), 
        d.getMilliseconds());
    }
    if (d) {
        nv += "expires=" + d.toGMTString() + ";";
    }
    if (!path) {
        nv += "path=/;";
    }
    else if (typeof (path) == "string" && path != "") {
        nv += "path=" + path + ";";
    }
    if (!domain && typeof (VS_COOKIEDM) != "undefined") {
        domain = VS_COOKIEDM;
    }
    if (typeof (domain) == "string" && domain != "") {
        nv += "domain=" + domain + ";";
    }
    document.cookie = nv;
}
function kf_getCookie(name)
{
    var value = "";
    var cookies = document.cookie.split("; ");
    var nv;
    var i;
    for (i = 0; i < cookies.length; i++) 
    {
        nv = cookies[i].split("=");
        if (nv && nv.length >= 2 && name == kf_rTrim(kf_lTrim(nv[0]))) {
            value = unescape(nv[1]);
        }
    }
    return value;
}
jQuery('.btnOpen').click(function(){
	jQuery('#divFloatToolsView').animate({opacity: 'show','width'  :  'show'}, 'normal',function(){ jQuery('#divFloatToolsView').show();kf_setCookie('RightFloatShown', 0, '', '/', 'idc.phpclubs.com'); });jQuery('#aFloatTools_Show').attr('style','display:none');jQuery('#aFloatTools_Hide').attr('style','display:block');
	return false;	
});
jQuery('.btnCtn').click(function(){
	jQuery('#divFloatToolsView').animate({width: 'hide', opacity: 'hide'}, 'normal',function(){ jQuery('#divFloatToolsView').hide();kf_setCookie('RightFloatShown', 1, '', '/', 'idc.phpclubs.com'); });jQuery('#aFloatTools_Show').attr('style','display:block');jQuery('#aFloatTools_Hide').attr('style','display:none');
	return false;	
});