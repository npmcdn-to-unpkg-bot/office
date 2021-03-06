import { Component, OnInit } from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_DIRECTIVES} from 'angular2/common';
import {Http, Response} from 'angular2/http';
import {Injectable } from 'angular2/core';
import {Router} from 'angular2/router';
declare var google: any;

@Component({
  selector: 'map',
  templateUrl: 'dev/home/map.component.html',
  directives: [ROUTER_DIRECTIVES],
})
export class MapComponent implements OnInit {
constructor(private _router: Router) {}

  ngOnInit() {
  var ths=this._router
  $.ajax({
					url:"api/users/tabmarker",
					type: "POST",
					beforeSend:function()
					{},
					success: function(response)
					{
						var obj = $.parseJSON(response);
						if(obj.status=="success")
						{
						var decoded = $("<div/>").html(obj.html).text();
						$('#aftertabmarker').html(decoded);
						}
						else if(obj.status=="fail")
						{
						
						}
					}
	
				})
  
  
                // Basic options for a simple Google Map
                // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
                var mapOptions = {
                    // How zoomed in you want the map to start at (always required)
                    zoom: 13,

                    // The latitude and longitude to center the map (always required)
                    center: new google.maps.LatLng(26.8531, 75.7981), // New York

                    // How you would like to style the map. 
                    // This is where you would paste any style found on Snazzy Maps.
                    styles: [{"featureType":"all","elementType":"labels.text","stylers":[{"color":"#a1f7ff"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},{"featureType":"administrative","elementType":"labels.text","stylers":[{"visibility":"simplified"},{"color":"#a1f7ff"}]},{"featureType":"administrative.province","elementType":"labels.text","stylers":[{"visibility":"simplified"},{"color":"#a1f7ff"}]},{"featureType":"administrative.locality","elementType":"labels.text","stylers":[{"visibility":"simplified"},{"color":"#a1f7ff"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text","stylers":[{"visibility":"simplified"},{"color":"#a1f7ff"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"poi.attraction","elementType":"labels","stylers":[{"invert_lightness":true}]},{"featureType":"poi.attraction","elementType":"labels.text","stylers":[{"visibility":"simplified"},{"color":"#a1f7ff"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"invert_lightness":true}]},{"featureType":"poi.park","elementType":"labels.text","stylers":[{"visibility":"simplified"},{"color":"#a1f7ff"}]},{"featureType":"road","elementType":"labels.text","stylers":[{"color":"#a1f7ff"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"lightness":"0"},{"saturation":"0"},{"invert_lightness":true},{"visibility":"simplified"},{"hue":"#00e9ff"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"visibility":"simplified"},{"color":"#a1f7ff"}]},{"featureType":"road.highway.controlled_access","elementType":"labels.text","stylers":[{"color":"#a1f7ff"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"invert_lightness":true}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"road.local","elementType":"labels","stylers":[{"visibility":"simplified"},{"invert_lightness":true}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}]
                };

                // Get the HTML DOM element that will contain your map 
                // We are using a div with id="map" seen below in the <body>
                var mapElement = document.getElementById('map');

                // Create the Google Map using our element and options defined above
                var map = new google.maps.Map(mapElement, mapOptions);

                // Let's also add a marker while we're at it
               // var marker = new google.maps.Marker({
                  //  position: new google.maps.LatLng(40.6700, -73.9400),
                   // map: map,
                    //title: 'Snazzy!'
               // });
				var marker ='';
				$.ajax({
					url:"api/users/getmarker",
					type: "POST",
					beforeSend:function()
					{},
					success: function(response)
					{
						var obj = $.parseJSON(response);
						if(obj.status=="success")
						{
							$(obj.vals).each(function (index) {
							var title     = $(this)['0'].name;
							var id     = $(this)['0'].id;
							 var point     = new google.maps.LatLng(parseFloat($(this)['0'].lat),parseFloat($(this)['0'].long));
                  			//create_marker(point, false, false, false, false, false, "http://PATH-TO-YOUR-WEBSITE-ICON/icons/pin_blue.png");
							create_marker(point, title, false, false, false, false,false,id);
							 });
						}
						else if(obj.status=="fail")
						{
						
						}
					}
	
				})
				
			
			
			//############### Create Marker Function ##############
function create_marker(MapPos, MapTitle, MapDesc,  InfoOpenDefault, DragAble, Removable, iconPath,markerId)
{               
    //new marker
    var marker = new google.maps.Marker({
        position: MapPos,
        map: map,
        draggable:DragAble,
        //animation: google.maps.Animation.DROP,
        title:MapTitle,
        icon: 'src/img/whhite-marker.png',
		id: markerId
    });

    
    //add click listner to save marker button        
    google.maps.event.addListener(marker, 'click', function() {
	//alert(marker.id);
	$('#tabmarker').hide();
	$('#aftertabmarker').show();
	$('#aftertabmarker').attr('rel',marker.id);
	$('.hidden_marler_value').hide();
	$('#marker_'+marker.id).show();
           // infowindow.open(map,marker); // click on marker opens info window 
    });
      
    

				
            }
			
		
		
			
$(document).on('click','#aftertabmarker', function ()
		{
		//alert($(this).attr('rel'));
		var Ids=$(this).attr('rel');
		ths.navigate(['/MapPicker', { id: Ids}]);
		});			
}
Home(event) {
			event.preventDefault();
			this.router.navigate(['Home']);
			}

}