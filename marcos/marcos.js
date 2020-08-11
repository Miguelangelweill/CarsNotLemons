$(document).ready(function () {
    console.log("ready!");

    $('#UsersChoice').on('click', function (e) {
        e.preventDefault()

        $('#vinApiInput').css('display', 'block')

    })

    $('#checkOneVin').on('click', function (e) {
        let userVinNumber = $('#vinNumber').val();
        e.preventDefault();

        let ownershipCost = 'http://ownershipcost.vinaudit.com/getownershipcost.php?vin='+userVinNumber+'&key=0UCAOK5F1GEGDMD&state=WA'

        $.get(ownershipCost).then(function(response){
            console.log(response)
            let depreciation = response.depreciation_cost;
            console.log(depreciation);
            let totalDepreciation = 0;
            for(i = 0; i<depreciation.length;i++){
            totalDepreciation += depreciation[i]
            }
            console.log(totalDepreciation)
        })



        let marketValue = 'http://marketvalue.vinaudit.com/getmarketvalue.php?key=0UCAOK5F1GEGDMD&vin='+userVinNumber+'&format=json&period=90&mileage=average'

        $.get(marketValue).then(function(response){
            console.log(response)
            let meanPrice = response.mean;
            console.log(meanPrice)
        })
        
        let objectVin = 'https://specifications.vinaudit.com/v3/specifications?key=0UCAOK5F1GEGDMD&format=json&include=attributes,equipment,colors,recalls,warranties,photos&vin=' + userVinNumber + '';

        $.get(objectVin).then(function (response) {
            $('#vinApiInput').empty();
            console.log(response)
            let price = response.attributes.manufacturer_suggested_retail_price;
            $('#vinApiInput').append(price);
            $('#vinApiInput').append('<br/>');
            let engine = response.attributes.engine;
            $('#vinApiInput').append(engine);
            $('#vinApiInput').append('<br/>');
            let cityMpg = response.attributes.city_mileage;
            $('#vinApiInput').append(cityMpg + ' City');
            $('#vinApiInput').append('<br/>');
            let highwayMpg = response.attributes.highway_mileage;
            $('#vinApiInput').append(highwayMpg + ' Highway');
            $('#vinApiInput').append('<br/>');
            let weight = response.attributes.curb_weight;
            $('#vinApiInput').append(weight);
            $('#vinApiInput').append('<br/>');
            let transmission = response.attributes.transmission;
            $('#vinApiInput').append(transmission);
            $('#vinApiInput').append('<br/>');
            let fuel = response.attributes.fuel_type;
            $('#vinApiInput').append(fuel);
            $('#vinApiInput').append('<br/>');
            let recallObject = response.recalls.length;
            $('#vinApiInput').append(recallObject + ' Total Recalls')

        });

        // let xmlFile = 'https://specifications.vinaudit.com/v3/specifications?key=0UCAOK5F1GEGDMD&format=json&include=attributes,equipment,colors,recalls,warranties,photos&vin='+objectVin+'';

        // $.get(xmlFile).then(function (response2) {
        //     console.log(response2)
        //     let engine = response2.attributes.engine
        //     $('#vinApiInput').text(engine)
        //     console.log(engine)
        // });

        // let carMyM = 'https://specifications.vinaudit.com/v3/specifications?format=json&key=0UCAOK5F1GEGDMD&include=attributes,colors,equipment,recalls,warranties,photos&year=2018&make=bmw&model=m3&trim=base';

        // $.get(carMyM).then(function (response3) {
        //     console.log(response3)
        //     let test = response3.vehicle
        //     $('#vinApiInput').text(test)
        //     console.log(test)
        // });
        
        // let carMake = 'https://specifications.vinaudit.com/v3/selections?format=json&key=0UCAOK5F1GEGDMD&list=make+model&year=2013&make=honda'

        // $.get(carMake).then(function (response4) {
        //     console.log(response4)
        //     let car = response4
        //     $('#vinApiInput').text(car)
        //     console.log(car)
        // });



    })


})





