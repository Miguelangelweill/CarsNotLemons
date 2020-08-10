
//hide this untill clicked
$('#compareForm').hide()

$("#compareTwo").click(function(){
 $('#compareForm').show();
 //this is the click on the form im ready
 $('#readyCompare').click(function(){
   var maker1 = $("#Maker1").val();
   var year1 = $('#Year1').val();
   var model1 = $('#Model1').val();
   
   console.log(maker1+model1+year1)
   //here i start the api for the first vehicle
   var queryUrl = "http://marketvalue.vinaudit.com/getmarketvalue.php?key=0UCAOK5F1GEGDMD&format=json&period=90&mileage=average&year="+year1+"&make="+maker1+"&model="+model1+"";
   
   console.log(queryUrl)
  //This is the information for the first vehicle
   $.get(queryUrl).then(function(response){
     console.log(response);
     var mileage1 = response.mileage;
     console.log("1-Average Mileage: "+mileage1);
     var overMarketValue1 = response.prices.above;
     console.log("1-Over market value: "+overMarketValue1);
     var underMarketValue1 = response.prices.below;
     console.log("1-Under market value: "+underMarketValue1);
     var marketValue1 = response.prices.average;
     console.log("1-Market value: "+marketValue1);
   })
   //this is the information from the second vehicle
   var maker2 = $("#Maker2").val();
   var year2 = $('#Year2').val();
   var model2 = $('#Model2').val();

   console.log(maker2 + model2 + year2)
   //here i start the api for the second vehicle
   var SecondUrl = "http://marketvalue.vinaudit.com/getmarketvalue.php?key=0UCAOK5F1GEGDMD&format=json&period=90&mileage=average&year=" + year2 + "&make=" + maker2 + "&model=" + model2 + "";

   console.log(SecondUrl)
   //This is the information for the first vehicle
   $.get(SecondUrl).then(function (response2) {
     console.log(response2);
     var mileage2 = response2.mileage;
     console.log("2-Average Mileage: " + mileage2);
     var overMarketValue2 = response2.prices.above;
     console.log("2-Over market value: " + overMarketValue2);
     var underMarketValue2 = response2.prices.below;
     console.log("2-Under market value: " + underMarketValue2);
     var marketValue2 = response2.prices.average;
     console.log("2-Market value: " + marketValue2);
   })
 })
})