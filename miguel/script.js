// api key 0UCAOK5F1GEGDMD

var queryURL ="https://specifications.vinaudit.com/v3/specifications?format=json&key=0UCAOK5F1GEGDMD&vin=1vwcm7a34fc006570";


$.get(queryURL).then(function(response){
    console.log(response)
})