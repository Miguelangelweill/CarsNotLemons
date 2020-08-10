$(document).ready(function () {
    console.log("ready!");
    $('#checkVin').on('click', function () {
        console.log('it worked')
        //    $('#carouselExampleSlidesOnly').html('')
        $('.vin-compare').css('display', 'block')
        userInputVin();
    })
    function userInputVin() {
        let userVinNumber = $('#vinNumber').val()
        let objecVin = 'https://specifications.vinaudit.com/v3/specifications?key=0UCAOK5F1GEGDMD&format=xml&include=attributes,equipment,colors,recalls,warranties,photos&vin=' + userVinNumber;
        $.ajax({
            url: objecVin,
            type: "GET"
        }).then(function (response) {
            console.log(response)
        });
    }
})