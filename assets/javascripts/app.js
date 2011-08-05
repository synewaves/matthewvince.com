// read in pinboard feed
$(function(){
   var pinboard_count = 8,
       twitter_count = 7;
   
   // pinboard links
   $pinboard = $('#links_feeds');
   if ($pinboard.length > 0) {
      $pinboard.append('<p>Loading links...</p>');
      $.getJSON('http://feeds.pinboard.in/json/v1/u:synewaves?count=' + pinboard_count + '&cb=?', function(links) {
         var elms = $('<ul></ul>');
         $.each(links, function(i, link){
            elms.append('<li><a href="' + link.u + '">' + link.d + '</a></li>');
         });
         $pinboard.append(elms);
         $('p', $pinboard).remove();
      });
   }
   
   // twitter feed
   $("#twitter_feed ul").tweet({
      username: "synewaves",
      join_text: "",
      avatar_size: 0,
      count: twitter_count,
      loading_text: "loading tweets..."
   });
});