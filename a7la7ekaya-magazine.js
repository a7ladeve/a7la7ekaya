$(function() {
$('div.thumcont a.imgAsBg ').each(function() {
var link = $(this).attr('href');
var title = $(this).text();
$(this).prepend('<a href="'+link+'" title="'+title+'"></a>');
$(this).children('a').load(link +'main#index .message-inner .bbWrapper img:eq(0)', function() {
$(this).children('img').attr('class','a7la7ekaya-div');
});
$(this).find('').insertBefore($(this));
});
});


$(function() {
$('div.popular-post-item span#topic-img a ').each(function() {
var link = $(this).attr('href');
var title = $(this).text();
$(this).prepend('<a href="'+link+'" title="'+title+'"></a>');
$(this).children('a').load(link +'main#index .message-inner .bbWrapper img:eq(0)', function() {
$(this).children('img').attr('class','popular-post-thumbnail');
});
$(this).find('').insertBefore($(this));
});
});


$(function() {
$('div.tab-pane-inner-content .comment-item span.comment-avatar a ').each(function() {
var link = $(this).attr('href');
var title = $(this).text();
$(this).prepend('<a href="'+link+'" title="'+title+'"></a>');
$(this).children('a').load(link +'main#index .message-inner .bbWrapper img:eq(0)', function() {
$(this).children('img').attr('class','popular-post-thumbnail');
});
$(this).find('').insertBefore($(this));
});
});


$(function() {
$('article#topics-list-box-img div#box-img a ').each(function() {
var link = $(this).attr('href');
var title = $(this).text();
$(this).prepend('<a href="'+link+'" title="'+title+'"></a>');
$(this).children('a').load(link +'main#index .message-inner .bbWrapper img:eq(0)', function() {
$(this).children('img').attr('class','.movie-card-image-ahla img');
});
$(this).find('').insertBefore($(this));
});
});


$(function() {
$('article#topics-list-box-img div#box-img a ').each(function() {
var link = $(this).attr('href');
var title = $(this).text();
$(this).prepend('<a href="'+link+'" title="'+title+'"></a>');
$(this).children('a').load(link +'main#index .message-inner .bbWrapper img:eq(0)', function() {
$(this).children('img').attr('class','.movie-card-image-ahla img');
});
$(this).find('').insertBefore($(this));
});
});



$(function() {
$('form#ucp .block .block-content label a ').each(function() {
var link = $(this).attr('href');
var title = $(this).text();
$(this).prepend('<a href="'+link+'" title="'+title+'"></a>');
$(this).children('a').load(link +'span#quickreply-img img:eq(0)', function() {
$(this).children('img').attr('class','.contentRow-figure span#js-XFUniqueId3 img');
});
$(this).find('').insertBefore($(this));
});
});

jQuery(document).ready(function(){
          jQuery.get('/profile?mode=editprofile&page_profil=avatars', function(data) {
              link = jQuery('#ucp .block .block-content img', data).attr('src');
              if(link){
                jQuery('#quickreply-img').html('<img src="'+link+'" alt="">');
              }else{
                jQuery('#quickreply-img').html('');
              }
          });
        });