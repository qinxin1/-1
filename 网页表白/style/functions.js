/*Download by http://t.cn/8FAmXqm */

var $window=$(window),gardenCtx,gardenCanvas,

$garden,garden;var clientWidth=$(window).width();
var clientHeight=$(window).height();$(function(){$
loveHeart=$("#loveHeart");var a=$loveHeart.width(
)/2;var b=$loveHeart.height()/2-55;$garden=$(
"#garden");gardenCanvas=$garden[0];gardenCanva
s.width=$("#loveHeart").width();gardenCanvas.h
eight=$("#loveHeart").height();gardenCtx=garde
nCanvas.getContext("2d");gardenCtx.globalCompo
siteOperation="lighter";garden=new Garden(gard

enCtx,gardenCanvas);$("#content").css("widt
h",$loveHeart.width()+$("#code").width());$
("#content").css("height",Math.max($loveHea
rt.height(),$("#code").height()));$("#c
ontent").css("margin-top",Math.max(($window.
height()-$("#content").height())/2,10));
$("#content").css("margin-left",Math.max(($w
indow.width()-$("#content").width())/2,1
0));setInterval(function(){garden.render()},
Garden.options.growSpeed)});$(window).resize

(function(){var b=$(window).width();var a=$(window).
();if(b!=clientWidth&&a!=clientHeight){location.repla
ce(location)}});function getHeartPoint(c){var b=c
/Math.PI;var a=19.5*(16*Math.pow(Math.sin(b),3));var 

d=-20*(13*Math.cos(b)-5*Math.cos(2*b)-2*Math.cos(3*b)
-Math.cos(4*b));return new Array(offsetX+a,
+d)}function startHeartAnimation(){var c=50;var 
=10;var b=new Array();var a=setInterval(function(){va
r h=getHeartPoint(d);var e=true;for(var f=0;f<b.
;f++){var g=b[f];var j=Math.sqrt(Math.pow(g[0]
-h[0],2)+Math.pow(g[1]-h[1],2));if(j<Garden
.options.bloomRadius.max*1.3){e=false;break}}if(e){b.push(h
);garden.createRandomBloom(h[0],h[1])}if(d>=30){clearInt
erval(a);showMessages()}else{d+=0.2}},c)}(function(a){a.

fn.typewriter=function(){this.each(function(){var d=

a(this),c=d.html(),b=0;d.html("");var e=setInter

val(function(){var f=c.substr(b,1);if(f=="<"){b=
c.indexOf(">",b)+1}else{b++}d.html(c.substri
ng(0,b)+(b&1?"_":""));if(b>=c.length){cl

earInterval(e)}},75)});return this}})(jQuery);function t
imeElapse(c){var e=Date();var f=(Date.parse(e)-Date.parse(c)
)/1000;var g=Math.floor(f/(3600*24));f=f%(3600*24);var b
=Math.floor(f/3600);if(b<10){b="0"+b}f=f%3600;var d=Math.flo
or(f/60);if(d<10){d="0"+d}f=f%60;if(f<10){f="0"+f}var a='<sp
an class="digit">'+g+'</span> days <span class="digit">'+b+'
</span> hours <span class="digit">'+d+'</span> minutes <span
class="digit">'+f+"</span> seconds";$("#elapseClock").html(
)}function showMessages(){$("#messages").fadeIn(5000,fun
ction(){showLoveU()})}function adjustWordsPosition(){$("
#words").css("position","absolute");$("#words").css("top"
,$("#garden").position().top+195);$("#words").css("left",
$("#garden").position().left+70)}function adjustCodePosit
ion(){$("#code").css("margin-top",($("#garden").height()-
$("#code").height())/2)}function showLoveU(){$("#love
u").fadeIn(3000)};



