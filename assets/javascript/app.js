

let button = $("#back").hide()
$(".card").hide();
$(".card-header").hide();
//check response from the 2 api selected
var queryURL = "https://restcountries.eu/rest/v2/all?fields=name;currencies";

// Performing an AJAX request with the queryURL
$.ajax({
  url: queryURL,
  method: "GET"
})
  // After data comes back from the request
  .then(function (response) {
    console.log(response);
   
    for (var i = 0; i < response.length; i++) {
      //  console.log(response[i].name);
        // $("#img-2").append("<img src ="+ response[i].flag +">")
      $("#inputCountry1").append('<option value ="' + response[i].currencies[0].code  +'">'+ response[i].name +
      "-" + response[i].currencies[0].code + '</option>' + "<br>");
         }  


    for (var i = 0; i < response.length; i++) {
      //  console.log(response[i].name);
        // $("#img-2").append("<img src ="+ response[i].flag +">")
        $("#inputCountry2").append('<option value ="' + response[i].name
        +'-'+ response[i].currencies[0].code  +'">'+ response[i].name +
        "-" + response[i].currencies[0].code + '</option>' + "<br>");
           }

          
    
  
    $("#submit").on("click", function (event) {
      event.preventDefault()
      $('#form').hide();
      $("#articles").empty()
      $('#display').empty()
      $("#rate").empty()
      $("#map").empty()
      $("#amount").empty()
     // console.log(country1)
      //console.log(country2)
      
    var country1 = $("#inputCountry1").val()
    //var countrycode1 = country1[1];
    console.log(country1)
  
    var country = $("#inputCountry2").val().split("-")
    var countryname = country[0];
    var country2 = country[1];
   
         var amount = $("#amount").val();
         var query = country1 + '_' + country2;
         console.log(query);
  var url = 'https://free.currencyconverterapi.com/api/v6/convert?q='+ query + '&compact=ultra&';
       
                   $.ajax({
                     url:url,
                     method:'GET'
                   }).done(function(result){
                     console.log(result[query])  
                 
                   
                   var val = result[query];
                   if (val) {
                     var total = val * amount;
                     console.log( "total: "+ total);
                     var reduceDecimaltoTwo = total.toFixed(2)
                    
           
                      console.log(reduceDecimaltoTwo);
                      
                      $("#result").show();
                      $('#display').append('<p class="amount">'+ amount + country1 +'-'+ reduceDecimaltoTwo + country2 + '</p>')
           
                      $('#rate').append('Rate 1'+" " + country1 + '=' + val + " " + country2)
                    //  var result = response
                      //console.log(result);
                    
                    // $("#display").append(result)
     
                   }
                    else {
                     var err = new Error("Value not found for " + query);
                     console.log(err);
                     
                   }
                  });
                  getnews()
                  console.log(countryname)

    // var map = $("<img>").attr("src","https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=AIzaSyCY4ikZrWDzixZRNFVjpj7nwYtXar2ehKg")


   
    var map = $("<img>").attr("src", "https://maps.googleapis.com/maps/api/staticmap?center=" + countryname +  "&zoom=5&size=400x250&maptype=roadmap&key=AIzaSyCY4ikZrWDzixZRNFVjpj7nwYtXar2ehKg")

    $("#map").append(map)
     console.log(countryname)
       $("#back").show(); 
       show();       
     
        function getnews ()
        {
            var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
            url += '?' + $.param({
              'api-key': "a9ecb5738d60419e8e79c89bba6714d4",
              'q': countryname
              
          });
            console.log(countryname)
              $.ajax({
                url: url,
                method: 'GET',
              }).done(function(result) 
                    {
                      console.log(result);
                      console.log(result.response.docs[4].snippet)
                      var snip = result.response.docs
          
                          for (var i=0; i< snip.length; i++ )
                          {
                            var weburl = result.response.docs[i].web_url
                            var snippet = result.response.docs[i].snippet

                            snippet  = snippet.substring(0,60) + "..."

                            // console.log(snippet)
                            
                               
                           
                            $("#articles").append("<div>"+"<a target=_blank  href="+ weburl +">" + snippet + "<br>"+"</div>")
                          }
                    }).fail(function(err) 
                    {
                        // th#img2 err;
                    });
                  }  
                });

              });
           

    $("#back").on("click",function(){
      $('#form').show();
      $("#articles").hide()
      $('#display').hide()
      $('#rate').hide()
      $("#map").hide()
      $("#result").hide()
      $("#back").hide()
      $(".card").hide();
      $(".card-header").hide();
      $("#amount").empty()

    });

function show(){
  $("#articles").show()
  $("#display").show()
  $("#rate").show()
  $("#result").show()
  $("#map").show()
  $(".card").show();
   $(".card-header").show();

}

    //on submit click take country code from field 1 and assign it to response.source
    //search for country code in field 2 in response.code field and get the rate
    //append this data to new screen with amount country 1 and country 2 and converted rate
  

  function convertCurrency(amount, fromCurrency, toCurrency) {
   
    fromCurrency = encodeURIComponent(fromCurrency);
    toCurrency = encodeURIComponent(toCurrency);
    var query = fromCurrency + '_' + toCurrency;
    console.log(query);
    var url = 'https://free.currencyconverterapi.com/api/v6/convert?q='+ query + '&compact=ultra&';
  
              $.ajax({
                url:url,
                method:'GET'
              }).done(function(result){
                console.log(result[query])  
            
              
              var val = result[query];
              if (val) {
                var total = val * amount;
                console.log( "total: "+ total);
                var reduceDecimaltoTwo = total.toFixed(2)
               
      
                 console.log(reduceDecimaltoTwo);
                 
                 $("#result").show();
                 $('#display').append('<p class="amount">'+ amount +country1 + reduceDecimaltoTwo +'-'+ country2 + '</p>')
      
                // $('#rate').append('Rate 1 USD = ' + value + " " + currencycode)
                 var result = response
                 console.log(result);
               
                $("#display").append(result)



              }
               else {
                var err = new Error("Value not found for " + query);
                console.log(err);
                
              }
             });
} 

  
 //console.log(convertCurrency(200,'CAD','USD')) ;