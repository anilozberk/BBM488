$(document).ready(function() {
		$('#submit').click(function() {/*initialize rate per page and searched twitter words*/
			search=$('#search').val();			
			if($('#rpp').val()!=false)
				rpp=$('#rpp').val();
			else
				rpp=5;
		});

		function searchTwitter(search) {
			$.getJSON('http://search.twitter.com/search.json?callback=?&rpp='+rpp+'&q=' + search, function(data) {/*send search request to twitter search engine*/
				var tweets = $('#tweets');
				tweets.html('');
				for (res in data['results']) {
    
					var img= "<img src="+ data['results'][res]['profile_image_url'] + ">";      /*take results from twitter search engine to variables*/
					var text='<br class="twitter-text">'+data['results'][res]['text']+'</br></p>';
					var nickname=' @' +data['results'][res]['from_user']; 
					var username= data['results'][res]['from_user_name'] ;
					var time= ' ('+data['results'][res]['created_at'] +') ' ;
					var result= img+ '<b>'+username+'</b>'+ '<i>'+nickname+ time +'</i>'+ text;
                
					tweets.append('<div class="new_tweets">'+result+'</div>');     /*add results to html page*/           
				} 
			});
		}		
		setInterval(function(){searchTwitter(search);},10000);
	});