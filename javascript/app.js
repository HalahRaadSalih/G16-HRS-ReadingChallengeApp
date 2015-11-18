
window.onload = function(){
    googleBooksSearch();
}

function googleBooksSearch(){

  var userInput, searchUrl, results;
  var outputArea = $("#main");
  var googleBooksAPIRequest;

  userInput = $('#searchBooks');

  userInput.data('oldVal', userInput.val());
  // setInterval(function() { ObserveInputValue($('#searchBooks').val()); }, 100);

  userInput.bind('propertychange keyup input', function(event){

    //if search field is clear, remove li elements from screen
    if( !$(this).val() ) {
      $('li').remove();
    }

    //upon key up, search googles books api
    else{
      searchUrl = "https://www.googleapis.com/books/v1/volumes?q=intitle:" + userInput.val();

      googleBooksAPIRequest = $.ajax({
        type:'GET',
        dataType:'json',
        url:searchUrl,
      });

      googleBooksAPIRequest.done(function(data){
        results = data.items;
        results.forEach(function(item){
        outputArea.append("<li>" + item.volumeInfo.title +"</li>");
        });
      });

      googleBooksAPIRequest.error(function(error){
        console.log(error);
      });
    }
    
 

  });

  
}