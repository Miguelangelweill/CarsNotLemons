$(document).ready(function () {

  //this is for resizing the button
  window.addEventListener("resize", function () {

    listenRezise();
  })
  function listenRezise() {
    var width = window.innerWidth;
    if (width < 576) {
      $("#UsersChoice").addClass("tiny");
      $("#UsersChoice").removeClass("massive");
    } else if (width > 576) {
      $("#UsersChoice").addClass("massive");
      $("#UsersChoice").removeClass("tiny");
    }
    console.log("rezise happened")
  }
  listenRezise()
  console.log("ready!");
  //This is where we hide the card for the vin check only
  $("#VinCheck").hide();
  $("#vinApiInput").hide();
  $(".incorrectVIN").hide()
  //This is the click event on the check only VIN
  $("#checkVin").on("click", function (e) {
    $('#compareForm').hide();
    e.preventDefault();
    $("#vinApiInput").show();
    $("#vinApiInput").css("display", "block");
  });
  //This is marcos onclick on the check vin and his informaition
  $("#checkOneVin").on("click", function (e) {
    let userVinNumber = $("#vinNumber").val();
    $('#compareContainer1').hide();
    $('#compareContainer2').hide();
    $("#carouselExampleSlidesOnly").hide();
    $("#finalSaving").hide();
    let onlyVinCheck = $("#VinCheck").show();
    onlyVinCheck.addClass('one wide column');
    $("#carouselContainer").append(onlyVinCheck);
    //This is the input of the user 

    e.preventDefault();
    // OwnershipCost AJAX
    let ownershipCost = 'http://ownershipcost.vinaudit.com/getownershipcost.php?vin=' + userVinNumber + '&key=0UCAOK5F1GEGDMD&state=WA'
    $.get(ownershipCost).then(function (response) {
      console.log(response)
      if (!response.success) {
        $(".incorrectVIN").show()
        $('#VinCheck').hide();
        $('#carouselExampleSlidesOnly').show();
      }
        let depreciation = response.depreciation_cost;
      console.log(depreciation);
      let totalDepreciation = 0;
      for (i = 0; i < depreciation.length; i++) {
        totalDepreciation += depreciation[i]
      }
      console.log(totalDepreciation)
      
      
    })


    //   Market Value AJAX
    let marketValue = 'http://marketvalue.vinaudit.com/getmarketvalue.php?key=0UCAOK5F1GEGDMD&vin=' + userVinNumber + '&format=json&period=90&mileage=average'

    $.get(marketValue).then(function (response) {
      console.log(response)
      let meanPrice = response.mean;
      console.log(meanPrice)
      thousands_separators(meanPrice)
      function thousands_separators(num) {
        //   Market Value operator for comma
        var num_parts = num.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        console.log(num_parts.join("."))
      }
    })

    //This is the api for the first Vin only check starts
    let objectVin =
      "https://specifications.vinaudit.com/v3/specifications?key=0UCAOK5F1GEGDMD&format=json&include=attributes,equipment,colors,recalls,warranties,photos&vin=" +
      userVinNumber +
      "";

    $.get(objectVin).then(function (response) {
      console.log(response);
      var checkVINimage1 = response.photos[0].url;
      $("#vinCheckImageCompare1").attr("src", checkVINimage1);

      var checkVINimage2 = response.photos[1].url;
      $("#vinCheckImageCompare2").attr("src", checkVINimage2);

      var checkVINmake = response.attributes.make;

      var checkVINmodel = response.attributes.model;

      var checkVINyear = response.attributes.year;
      $("#theVinCarEl").text(checkVINmake + " " + checkVINmodel + " " + checkVINyear);

      var checkVINtrim = response.attributes.trim;
      $("#theVinTrimEl").text("Trim: " + checkVINtrim);

      var checkVINprice =
        response.attributes.manufacturer_suggested_retail_price;
      $("#theVinPriceEl").text("Price: " + checkVINprice)

      var checkVINengine = response.attributes.engine;
      $("#theVinEngineEl").text("engine: " + checkVINengine)

      var checkVINcityMpg = response.attributes.city_mileage;
      $("#theVinCItyMlgEl").text("City mileage: " + checkVINcityMpg)

      var checkVINhighwayMpg = response.attributes.highway_mileage;
      $("#theVinHeighwayMlgEl").text("Highway mileage: " + checkVINhighwayMpg)

      var checkVINweight = response.attributes.curb_weight;
      $("#theVinWeightEl").text("Weight: " + checkVINweight)

      var checkVINtransmission = response.attributes.transmission;
      $("#theVinTransmissionEl").text("Transmission: " + checkVINtransmission);

      var checkVINfuel = response.attributes.fuel_type;
      $("#theVinFuelEl").text("Type of Fuel: " + checkVINfuel)

      var checkVINrecallObject = response.recalls.length;
      $("#theVinRecallEl").text("Previous Recalls: " + checkVINrecallObject);

      //This is the api for the fuel cost 
      let ownershipCost = 'http://ownershipcost.vinaudit.com/getownershipcost.php?vin=' + userVinNumber + '&key=0UCAOK5F1GEGDMD&state=WA'
      $.get(ownershipCost).then(function (response) {
        console.log(response)
        var fuelCostLibrary = response.fuel_cost;
        var lastFuelCost = fuelCostLibrary.length-1;
        console.log(lastFuelCost)
      })
    });
  });
  //This is Miguels inforation and his functions
  //hide this untill clicked
  $("#compareForm").hide();
  $("#compareContainer1").hide()
  $("#finalSaving").hide()
  $("#compareContainer2").hide()
  $(".incorrectVIN").hide()
  
  //This is the click on the first compare
  $("#compareTwo").click(function () {
    $("#compareForm").show();
    $('#vinApiInput').hide();
    //this is the click on the ready compare
    $("#readyCompare").click(function () {
      $('#VinCheck').hide();
      $("#carouselExampleSlidesOnly").show()
      var firstContainerCompare = $("#compareContainer1").show()
      firstContainerCompare.addClass("six wide column");
      var finalSaving = $("#finalSaving").show();
      finalSaving.addClass("four wide column");
      var secondContainerCompare = $("#compareContainer2").show()
      secondContainerCompare.addClass("six wide column");
      
      $("#carouselContainer").append(firstContainerCompare, finalSaving ,secondContainerCompare)

      var firstVehicleVIN = $("#firstVehicle").val();
      var secondVehicleVIN = $("#secondVehicle").val();

      console.log(firstVehicleVIN + secondVehicleVIN);
      //here i start the api for the first vehicle
      var firstCarURL =
        "https://specifications.vinaudit.com/v3/specifications?key=0UCAOK5F1GEGDMD&format=json&include=attributes,equipment,colors,recalls,warranties,photos&vin=" +
        firstVehicleVIN +
        "";

      console.log(firstCarURL);
      //This is the information for the first vehicle
      $.get(firstCarURL).then(function (response1) {
        console.log(response1);
       
        if(!response1.success){ 
          $(".incorrectVIN").show()
          $('#compareContainer1').hide();
          $('#compareContainer2').hide();
          $("#finalSaving").hide()
        }
        $(".incorrectVIN").hide()
              //here are the variables for my first vehicle
        var firstVINimage1 = response1.photos[0].url;
        console.log(response1.photos[0].url)
        $("#firstImageCompare1").attr("src", firstVINimage1);

        var firstVINimage2 = response1.photos[1].url;
        console.log(response1.photos[0].url)
        $("#firstImageCompare2").attr("src", firstVINimage2);

        var firstVINmake = response1.attributes.make;
        console.log("Make: " + firstVINmake);

        var firstVINmodel = response1.attributes.model;
        console.log("Model: " + firstVINmodel);

        var firstVINyear = response1.attributes.year;
        console.log("Year: " + firstVINyear);
        $("#theCarEl1").text(firstVINmake + " " + firstVINmodel + " " + firstVINyear);

        var firstVINtrim = response1.attributes.trim;
        console.log("Trim: " + firstVINtrim);
        $("#theTrimEl1").text("Trim: " + firstVINtrim);

        var firstVINprice =
          response1.attributes.manufacturer_suggested_retail_price;
        console.log("Price: " + firstVINprice);
        $("#thePriceEl1").text("Price: " + firstVINprice)

        var firstVINengine = response1.attributes.engine;
        console.log("engine: " + firstVINengine);
        $("#theEngineEl1").text("engine: " + firstVINengine)

        var firstVINcityMpg = response1.attributes.city_mileage;
        console.log("City mileage: " + firstVINcityMpg + " City");
        $("#theCItyMlgEl1").text("City mileage: " + firstVINcityMpg)

        var firstVINhighwayMpg = response1.attributes.highway_mileage;
        console.log("Highway mileage: " + firstVINhighwayMpg + " Highway");
        $("#theHeighwayMlgEl1").text("Highway mileage: " + firstVINhighwayMpg)

        var firstVINweight = response1.attributes.curb_weight;
        console.log("Weight: " + firstVINweight);
        $("#theWeightEl1").text("Weight: " + firstVINweight)

        var firstVINtransmission = response1.attributes.transmission;
        console.log("Transmission: " + firstVINtransmission);
        $("#theTransmissionEl1").text("Transmission: " + firstVINtransmission);

        var firstVINfuel = response1.attributes.fuel_type;
        console.log("Type of Fuel: " + firstVINfuel);
        $("#theFuelEl1").text("Type of Fuel: " + firstVINfuel)

        var firstVINrecallObject = response1.recalls.length;
        console.log("Previous Recalls: " + firstVINrecallObject + " Total Recalls");
        $("#theRecallEl1").text("Previous Recalls: " + firstVINrecallObject)
        
    
      });

      //here i start the api for the second vehicle
      var secondCarURL =
        "https://specifications.vinaudit.com/v3/specifications?key=0UCAOK5F1GEGDMD&format=json&include=attributes,equipment,colors,recalls,warranties,photos&vin=" +
        secondVehicleVIN +
        "";

      //duane vin JTHBA1D27G5004260
      //marcos vin 1vwcm7a34fc006570
      console.log(secondCarURL);
      //This is the information for the first vehicle
      $.get(secondCarURL).then(function (response2) {
        console.log(response2);
        if (!response1.success) {
          $(".incorrectVIN").show()
          $('#compareContainer1').hide();
          $('#compareContainer2').hide();
          $("#finalSaving").hide()
        }else{
          $(".incorrectVIN").hide()
          //here are the variables for my second vehicle
        var secondVINimage1 = response2.photos[0].url;
        console.log(response2.photos[0].url)
        $("#secondImageCompare1").attr("src", secondVINimage1);

        var secondVINimage2 = response2.photos[1].url;
        console.log(response2.photos[0].url)
        $("#secondImageCompare2").attr("src", secondVINimage2);

        var secondVINmake = response2.attributes.make;
        console.log("Make: " + secondVINmake);

        var secondVINmodel = response2.attributes.model;
        console.log("Model: " + secondVINmodel);

        var secondVINyear = response2.attributes.year;
        console.log("Year: " + secondVINyear);
        $("#theCarEl2").text(secondVINmake + " " + secondVINmodel + " " + secondVINyear);

        var secondVINtrim = response2.attributes.trim;
        console.log("Trim: " + secondVINtrim);
        $("#theTrimEl2").text("Trim: " + secondVINtrim);

        var secondVINprice =
          response2.attributes.manufacturer_suggested_retail_price;
        console.log("Price: " + secondVINprice);
        $("#thePriceEl2").text("Price: " + secondVINprice)

        var secondVINengine = response2.attributes.engine;
        console.log("engine: " + secondVINengine);
        $("#theEngineEl2").text("engine: " + secondVINengine)

        var secondVINcityMpg = response2.attributes.city_mileage;
        console.log("City mileage: " + secondVINcityMpg + " City");
        $("#theCItyMlgEl2").text("City mileage: " + secondVINcityMpg)

        var secondVINhighwayMpg = response2.attributes.highway_mileage;
        console.log("Highway mileage: " + secondVINhighwayMpg + " Highway");
        $("#theHeighwayMlgEl2").text("Highway mileage: " + secondVINhighwayMpg)

        var secondVINweight = response2.attributes.curb_weight;
        console.log("Weight: " + secondVINweight);
        $("#theWeightEl2").text("Weight: " + secondVINweight)

        var secondVINtransmission = response2.attributes.transmission;
        console.log("Transmission: " + secondVINtransmission);
        $("#theTransmissionEl2").text("Transmission: " + secondVINtransmission);

        var secondVINfuel = response2.attributes.fuel_type;
        console.log("Type of Fuel: " + secondVINfuel);
        $("#theFuelEl2").text("Type of Fuel: " + secondVINfuel)

        var secondVINrecallObject = response2.recalls.length;
        console.log("Previous Recalls: " + secondVINrecallObject + " Total Recalls");
        $("#theRecallEl2").text("Previous Recalls: " + secondVINrecallObject)
        }
        
      });


    });
  });

});

  //cost
  //engine size
  //miles per gallon
  //weight
  //over market value,under market value, market value;
  //transmition
  //fuel type
  //recalls
  //top 3 in bolder and bigger 
  //recall bold and red
  //price dollar sign 
  //try look for icons for the transmition and fuel 
