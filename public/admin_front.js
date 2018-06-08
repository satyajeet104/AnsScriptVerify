
    
$(document).ready(function() {

    
   


    $("#submitButton").on("click", function(){
     // Only change code below this line.
    // var input=$("#classInput").value();

     $.ajax({
        type:'GET',
        url:'/api/routes/detailsSelect/Class',

    });


    $.getJSON("https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=41c18227255c42d091ad6898e97e3a23", function(ans) {
     var number=ans.totalResults;
        
     console.log(ans.articles[0]);
       
      });




 }); 
     

 });
