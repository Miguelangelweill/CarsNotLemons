$(document).ready(function () {
	console.log('ready!');
	$('#VinCheck').hide();
	$('#vinApiInput').hide();
	$('#checkVin').on('click', function (e) {
		e.preventDefault();
		$('#vinApiInput').show();
		$('#vinApiInput').css('display', 'block');
	});
	//This is marcos onclick on the check vin and his informaition
	$('#checkOneVin').on('click', function (e) {
		$('#VinCheck').show();
		let userVinNumber = $('#vinNumber').val();
		e.preventDefault();

		let objectVin =
			'https://specifications.vinaudit.com/v3/specifications?key=0UCAOK5F1GEGDMD&format=json&include=attributes,equipment,colors,recalls,warranties,photos&vin=' +
			userVinNumber +
			'';

		$.get(objectVin).then(function (response) {
			console.log(response);
			var checkVINimage1 = response.photos[0].url;
			console.log(response.photos[0].url);
			$('#vinCheckImageCompare1').attr('src', checkVINimage1);

			var checkVINimage2 = response.photos[1].url;
			console.log(response.photos[0].url);
			$('#vinCheckImageCompare2').attr('src', checkVINimage2);

			var checkVINmake = response.attributes.make;
			console.log('Make: ' + checkVINmake);

			var checkVINmodel = response.attributes.model;
			console.log('Model: ' + checkVINmodel);

			var checkVINyear = response.attributes.year;
			console.log('Year: ' + checkVINyear);
			$('#theVinCarEl').text(
				checkVINmake + ' ' + checkVINmodel + ' ' + checkVINyear
			);

			var checkVINtrim = response.attributes.trim;
			console.log('Trim: ' + checkVINtrim);
			$('#theVinTrimEl').text('Trim: ' + checkVINtrim);

			var checkVINprice =
				response.attributes.manufacturer_suggested_retail_price;
			console.log('Price: ' + checkVINprice);
			$('#theVinPriceEl').text('Price: ' + checkVINprice);

			var checkVINengine = response.attributes.engine;
			console.log('engine: ' + checkVINengine);
			$('#theVinEngineEl').text('engine: ' + checkVINengine);

			var checkVINcityMpg = response.attributes.city_mileage;
			console.log('City mileage: ' + checkVINcityMpg + ' City');
			$('#theVinCItyMlgEl').text('City mileage: ' + checkVINcityMpg);

			var checkVINhighwayMpg = response.attributes.highway_mileage;
			console.log('Highway mileage: ' + checkVINhighwayMpg + ' Highway');
			$('#theVinHeighwayMlgEl').text('Highway mileage: ' + checkVINhighwayMpg);

			var checkVINweight = response.attributes.curb_weight;
			console.log('Weight: ' + checkVINweight);
			$('#theVinWeightEl').text('Weight: ' + checkVINweight);

			var checkVINtransmission = response.attributes.transmission;
			console.log('Transmission: ' + checkVINtransmission);
			$('#theVinTransmissionEl').text('Transmission: ' + checkVINtransmission);

			var checkVINfuel = response.attributes.fuel_type;
			console.log('Type of Fuel: ' + checkVINfuel);
			$('#theVinFuelEl').text('Type of Fuel: ' + checkVINfuel);

			var checkVINrecallObject = response.recalls.length;
			console.log(
				'Previous Recalls: ' + checkVINrecallObject + ' Total Recalls'
			);
			$('#theVinRecallEl').text('Previous Recalls: ' + checkVINrecallObject);
		});
	});
	//This is Miguels inforation and his functions
	//hide this untill clicked
	$('#compareForm').hide();
	$('#compareContainer1').hide();
	$('#compareContainer2').hide();
	//This is the click on the first compare
	$('#compareTwo').click(function () {
		$('#compareForm').show();

		//this is the click on the fready compare
		$('#readyCompare').click(function () {
			$('#compareContainer1').show();
			$('#compareContainer2').show();
			var firstVehicleVIN = $('#firstVehicle').val();
			var secondVehicleVIN = $('#secondVehicle').val();

			console.log(firstVehicleVIN + secondVehicleVIN);
			//here i start the api for the first vehicle
			var firstCarURL =
				'https://specifications.vinaudit.com/v3/specifications?key=0UCAOK5F1GEGDMD&format=json&include=attributes,equipment,colors,recalls,warranties,photos&vin=' +
				firstVehicleVIN +
				'';

			console.log(firstCarURL);
			//This is the information for the first vehicle
			$.get(firstCarURL).then(function (response1) {
				console.log(response1);
				//here are the variables for my first vehicle
				var firstVINimage1 = response1.photos[0].url;
				console.log(response1.photos[0].url);
				$('#firstImageCompare1').attr('src', firstVINimage1);

				var firstVINimage2 = response1.photos[1].url;
				console.log(response1.photos[0].url);
				$('#firstImageCompare2').attr('src', firstVINimage2);

				var firstVINmake = response1.attributes.make;
				console.log('Make: ' + firstVINmake);

				var firstVINmodel = response1.attributes.model;
				console.log('Model: ' + firstVINmodel);

				var firstVINyear = response1.attributes.year;
				console.log('Year: ' + firstVINyear);
				$('#theCarEl1').text(
					firstVINmake + ' ' + firstVINmodel + ' ' + firstVINyear
				);

				var firstVINtrim = response1.attributes.trim;
				console.log('Trim: ' + firstVINtrim);
				$('#theTrimEl1').text('Trim: ' + firstVINtrim);

				var firstVINprice =
					response1.attributes.manufacturer_suggested_retail_price;
				console.log('Price: ' + firstVINprice);
				$('#thePriceEl1').text('Price: ' + firstVINprice);

				var firstVINengine = response1.attributes.engine;
				console.log('engine: ' + firstVINengine);
				$('#theEngineEl1').text('engine: ' + firstVINengine);

				var firstVINcityMpg = response1.attributes.city_mileage;
				console.log('City mileage: ' + firstVINcityMpg + ' City');
				$('#theCItyMlgEl1').text('City mileage: ' + firstVINcityMpg);

				var firstVINhighwayMpg = response1.attributes.highway_mileage;
				console.log('Highway mileage: ' + firstVINhighwayMpg + ' Highway');
				$('#theHeighwayMlgEl1').text('Highway mileage: ' + firstVINhighwayMpg);

				var firstVINweight = response1.attributes.curb_weight;
				console.log('Weight: ' + firstVINweight);
				$('#theWeightEl1').text('Weight: ' + firstVINweight);

				var firstVINtransmission = response1.attributes.transmission;
				console.log('Transmission: ' + firstVINtransmission);
				$('#theTransmissionEl1').text('Transmission: ' + firstVINtransmission);

				var firstVINfuel = response1.attributes.fuel_type;
				console.log('Type of Fuel: ' + firstVINfuel);
				$('#theFuelEl1').text('Type of Fuel: ' + firstVINfuel);

				var firstVINrecallObject = response1.recalls.length;
				console.log(
					'Previous Recalls: ' + firstVINrecallObject + ' Total Recalls'
				);
				$('#theRecallEl1').text('Previous Recalls: ' + firstVINrecallObject);
			});

			//here i start the api for the second vehicle
			var secondCarURL =
				'https://specifications.vinaudit.com/v3/specifications?key=0UCAOK5F1GEGDMD&format=json&include=attributes,equipment,colors,recalls,warranties,photos&vin=' +
				secondVehicleVIN +
				'';
			//duane vin JTHBA1D27G5004260
			//marcos vin 1vwcm7a34fc006570
			console.log(secondCarURL);
			//This is the information for the first vehicle
			$.get(secondCarURL).then(function (response2) {
				console.log(response2);
				//here are the variables for my second vehicle
				var secondVINimage1 = response2.photos[0].url;
				console.log(response2.photos[0].url);
				$('#secondImageCompare1').attr('src', secondVINimage1);

				var secondVINimage2 = response2.photos[1].url;
				console.log(response2.photos[0].url);
				$('#secondImageCompare2').attr('src', secondVINimage2);

				var secondVINmake = response2.attributes.make;
				console.log('Make: ' + secondVINmake);

				var secondVINmodel = response2.attributes.model;
				console.log('Model: ' + secondVINmodel);

				var secondVINyear = response2.attributes.year;
				console.log('Year: ' + secondVINyear);
				$('#theCarEl2').text(
					secondVINmake + ' ' + secondVINmodel + ' ' + secondVINyear
				);

				var secondVINtrim = response2.attributes.trim;
				console.log('Trim: ' + secondVINtrim);
				$('#theTrimEl2').text('Trim: ' + secondVINtrim);

				var secondVINprice =
					response2.attributes.manufacturer_suggested_retail_price;
				console.log('Price: ' + secondVINprice);
				$('#thePriceEl2').text('Price: ' + secondVINprice);

				var secondVINengine = response2.attributes.engine;
				console.log('engine: ' + secondVINengine);
				$('#theEngineEl2').text('engine: ' + secondVINengine);

				var secondVINcityMpg = response2.attributes.city_mileage;
				console.log('City mileage: ' + secondVINcityMpg + ' City');
				$('#theCItyMlgEl2').text('City mileage: ' + secondVINcityMpg);

				var secondVINhighwayMpg = response2.attributes.highway_mileage;
				console.log('Highway mileage: ' + secondVINhighwayMpg + ' Highway');
				$('#theHeighwayMlgEl2').text('Highway mileage: ' + secondVINhighwayMpg);

				var secondVINweight = response2.attributes.curb_weight;
				console.log('Weight: ' + secondVINweight);
				$('#theWeightEl2').text('Weight: ' + secondVINweight);

				var secondVINtransmission = response2.attributes.transmission;
				console.log('Transmission: ' + secondVINtransmission);
				$('#theTransmissionEl2').text('Transmission: ' + secondVINtransmission);

				var secondVINfuel = response2.attributes.fuel_type;
				console.log('Type of Fuel: ' + secondVINfuel);
				$('#theFuelEl2').text('Type of Fuel: ' + secondVINfuel);

				var secondVINrecallObject = response2.recalls.length;
				console.log(
					'Previous Recalls: ' + secondVINrecallObject + ' Total Recalls'
				);
				$('#theRecallEl2').text('Previous Recalls: ' + secondVINrecallObject);
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

//chat js

//when page open chat box will not display
$(document).ready(function () {
	$('#hide').click(function () {
		$('#myForm').hide();
	});
	$('#chat-Live').click(function () {
		$('#myForm').show();
	});
});

//when click on chat live now window will display
function openForm() {
	document.getElementById('myForm').style.display = 'block';
}

function closeForm() {
	document.getElementById('myForm').style.display = 'none';
}

//when page open contact will display
$(document).ready(function () {
	$('#about-click').click(function () {
		$('#about-us').css('display', 'block');
	});
});

function openLink() {
	document.getElementByID('contact-link').onclick = function () {
		document.getElementById('contact-info').style.display = 'block';
	};
}

//when page open about us will display
$(document).ready(function () {
	$('#contact-link').click(function () {
		$('.contactInfo').css('display', 'block')
	});
});

function openLink() {
	document.getElementByID('contact-link').onclick = function () {
		document.getElementById('about-us').style.display = 'block';
	};
}
