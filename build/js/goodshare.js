/*
    @author Interactive agency "Central marketing" http://iacm.ru
    @copyright Copyright (c) 2015, Interactive agency "Central marketing"
    @license http://opensource.org/licenses/MIT The MIT License (MIT)
    @version 2.0 at 24/02/2015 (19:45)

    goodshare.js

    Useful jQuery plugin that will help your website visitors share a link on social networks and microblogs.
    Easy to install and configuring on any of your website!
*/
!function(t,e,n){t(e).ready(function(){goodshare={doit:function(n,o){var r=goodshare,i=t.extend({type:"vk",url:location.href,title:e.title,image:t('meta[property="og:image"]').attr("content"),text:t('meta[name="description"]').attr("content")},t(n).data(),o);return null===r.popup(link=r[i.type](i))?t(n).is("a")?(t(n).prop("href",link),!0):(location.href=link,!1):!1},vk:function(n){var o=t.extend({url:location.href,title:e.title,image:"",text:""},n);return"http://vkontakte.ru/share.php?url="+encodeURIComponent(o.url)+"&title="+encodeURIComponent(o.title)+"&description="+encodeURIComponent(o.text)+"&image="+encodeURIComponent(o.image)+"&noparse=true"},ok:function(e){var n=t.extend({url:location.href,text:""},e);return"http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1&st.comments="+encodeURIComponent(n.text)+"&st._surl="+encodeURIComponent(n.url)},fb:function(n){var o=t.extend({url:location.href,title:e.title,image:"",text:""},n);return"http://www.facebook.com/sharer.php?s=100&p[title]="+encodeURIComponent(o.title)+"&p[summary]="+encodeURIComponent(o.text)+"&p[url]="+encodeURIComponent(o.url)+"&p[images][0]="+encodeURIComponent(o.image)},lj:function(n){var o=t.extend({url:location.href,title:e.title,text:""},n);return"http://livejournal.com/update.bml?subject="+encodeURIComponent(o.title)+"&event="+encodeURIComponent('<a href="'+o.url+'">'+o.title+"</a> "+o.text)+"&transform=1"},tw:function(n){var o=t.extend({url:location.href,title:e.title},n);return"http://twitter.com/share?text="+encodeURIComponent(o.title)+"&url="+encodeURIComponent(o.url)},gp:function(e){var n=t.extend({url:location.href},e);return"https://plus.google.com/share?url="+encodeURIComponent(n.url)},mr:function(n){var o=t.extend({url:location.href,title:e.title,image:"",text:""},n);return"http://connect.mail.ru/share?url="+encodeURIComponent(o.url)+"&title="+encodeURIComponent(o.title)+"&description="+encodeURIComponent(o.text)+"&imageurl="+encodeURIComponent(o.image)},li:function(n){var o=t.extend({url:location.href,title:e.title,text:""},n);return"http://www.linkedin.com/shareArticle?mini=true&url="+encodeURIComponent(o.url)+"&title="+encodeURIComponent(o.title)+"&summary="+encodeURIComponent(o.text)},tm:function(n){var o=t.extend({url:location.href,title:e.title,text:""},n);return"http://www.tumblr.com/share/link?url="+encodeURIComponent(o.url)+"&name="+encodeURIComponent(o.title)+"&description="+encodeURIComponent(o.text)},bl:function(n){var o=t.extend({url:location.href,title:e.title,text:""},n);return"https://www.blogger.com/blog-this.g?u="+encodeURIComponent(o.url)+"&n="+encodeURIComponent(o.title)},pt:function(n){var o=t.extend({url:location.href,title:e.title,text:""},n);return"https://www.pinterest.com/pin/create/button/?url="+encodeURIComponent(o.url)+"&description="+encodeURIComponent(o.title)},en:function(n){var o=t.extend({url:location.href,title:e.title,text:""},n);return"https://www.evernote.com/clip.action?url="+encodeURIComponent(o.url)+"&title="+encodeURIComponent(o.title)+"&body="+encodeURIComponent(o.text+'<br/><a href="'+o.url+'">'+o.title+"</a>")},di:function(n){var o=t.extend({url:location.href,title:e.title,text:""},n);return"http://digg.com/submit?url="+encodeURIComponent(o.url)+"&title="+encodeURIComponent(o.title)},yz:function(n){var o=t.extend({url:location.href,title:e.title,text:""},n);return"http://zakladki.yandex.ru/newlink.xml?url="+encodeURIComponent(o.url)+"&name="+encodeURIComponent(o.title)+"&descr="+encodeURIComponent(o.text)},rd:function(n){var o=t.extend({url:location.href,title:e.title,text:""},n);return"http://www.reddit.com/submit?url="+encodeURIComponent(o.url)+"&title="+encodeURIComponent(o.title)},sb:function(n){var o=t.extend({url:location.href,title:e.title,text:""},n);return"http://surfingbird.ru/share?url="+encodeURIComponent(o.url)+"&title="+encodeURIComponent(o.title)},popup:function(t){return n.open(t,"","toolbar=0,status=0,scrollbars=1,width=626,height=436")}},t(e).on("click",".goodshare",function(t){t.preventDefault(),goodshare.doit(this)})})}(jQuery,document,window);
