
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;( function( $, window, document, undefined ) {

    "use strict";

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = "twidget",
        defaults = {
            locale: "en",
            type: 'avia_hotel',
            hide_logos: false,
            open_in_new_tab: true,
            default_origin: '',
            default_destination: '',
			lock_destination: false,
            localization: {
                avia_input_origin_label: 'Origin',
                avia_input_destination_label: 'Destination',
                avia_input_date_start: 'Depart date',
                avia_input_date_end: 'Return date',
                avia_passengers_select_caption: 'Passengers/Class',
                avia_passengers_caption_1: 'passenger',
                avia_passengers_caption_2: 'passengers',
                avia_passengers_caption_5: 'passengers',
                avia_passengers_select_adults: 'Adults',
                avia_passengers_select_children: 'Children to 12<br>years',
                avia_passengers_select_infants: 'Infants to 2<br>years',
                avia_passengers_economy_class: 'economy class',
                avia_passengers_business_class: 'business class',
                avia_passengers_business_class_checkbox: 'Business class',
                avia_passengers_select_ready_button: 'Done',
                avia_submit_button_text: 'Search',
                avia_all_airports_caption: 'All airports',
                datepicker_language: 'en',
                datepicker_return_ticket_caption: 'Return ticket not needed',
                weekdays_short: ["su", "mo", "tu", "we", "th", "fr", "sa"],
                month_names: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                avia_submit_domain : ''
            }
        },
        // globals
        date = new Date(),
        dateOneWeekLater = new Date(),
        dateTwoWeekLater = new Date();

    dateOneWeekLater.setDate(date.getDate() + 7);
    dateTwoWeekLater.setDate(date.getDate() + 14);

    // The actual plugin constructor
    function Plugin ( element, options ) {
        this.element = element;
        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend( {}, defaults, options );

        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend( Plugin.prototype, {
        init: function() {
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.settings
            // you can add more functions like the one below and
            // call them like the example bellow
            //this.yourOtherFunction( "jQuery Boilerplate" );

            this.widget_html();

            var container = $( this.element),
                _this = this; 

            /* flight vars */
            var origin_iata_input       = container.find('input[name="origin_iata"]'),
                destination_iata_input  = container.find('input[name="destination_iata"]'),
                oneway_input            = container.find('input[name="oneway"]'),
                trip_class_input        = container.find('input[name="trip_class"]'),
                pas_count_label         = container.find('#twidget-pas'),
                adults_pas_input        = container.find('#twidget-passenger-form input[name="adults"]'),
                children_pas_input      = container.find('#twidget-passenger-form input[name="children"]'),
                infants_pas_input       = container.find('input[name="infants"]'),
                guests_count_label      = container.find('#twidget-g-no');
            var dep_name = container.find('input[name="dep_name"]');
            var arr_name = container.find('input[name="arr_name"]');

            /* origin city from parameters */
            if(_this.settings.default_origin) {
                $.getJSON("https://autocomplete.travelpayouts.com/jravia?locale="+_this.settings.locale+"&with_countries=false&q="+_this.settings.default_origin, function (data) {
                    /* input focusout update */
                    if(data){
                        container.find("#twidget-origin").off('focusout').on('focusout', function(){
                            container.find('#twidget-origin').val(data[0].city_name);
                            container.find('.twidget-origin-iata').text(data[0].code);
                            container.find(".twidget-origin .twidget-pseudo-name").text(data[0].city_name);
                            dep_name.val(data[0].city_name);
                            container.find(".twidget-origin .twidget-pseudo-country-name").text(', '+data[0].country_name);
                            origin_iata_input.val(data[0].code);
                        });
                        container.find('#twidget-origin').trigger('focusout');
                    }
                });
            } else {
            /* or getting user origin city from whereami */
                $.getJSON("https://www.travelpayouts.com/whereami?locale="+_this.settings.locale, function (data) {
                    /* input focusout update */
                    if(data){
                        container.find("#twidget-origin").off('focusout').on('focusout', function(){
                            container.find('#twidget-origin').val(data.name);
                            container.find('.twidget-origin-iata').text(data.iata);
                            container.find(".twidget-origin .twidget-pseudo-name").text(data.name);
                            container.find(".twidget-origin .twidget-pseudo-country-name").text(', '+data.country_name);
                            origin_iata_input.val(data.iata);
                        });
                        container.find('#twidget-origin').trigger('focusout');
                    }
                });
            }


            /* origin city auto complete */
            container.find("#twidget-origin").keydown(function() {
                container.find(".twidget-origin .twidget-pseudo-name").html('');
                container.find(".twidget-origin .twidget-pseudo-country-name").html('');
                origin_iata_input.val('');
                dep_name.val('');
                container.find('.twidget-origin-iata').text('');
            });
            container.find("#twidget-origin").keyup(function(){
                var v = $(this).val(),
                    this_input = $(this),
                    citiesSortedArr = [],
                    citiesOrigSort = [];
                $.getJSON("https://autocomplete.travelpayouts.com/jravia?locale="+_this.settings.locale+"&with_countries=false&q="+v, function (data) {
                    container.find(".twidget-origin .twidget-auto-fill-wrapper ul li").remove();
                    $.each(data, function(key, value){
                        if(value.city_name) {
                            if(!citiesSortedArr[value.city_code]){
                                citiesSortedArr[value.city_code] = [];
                            }
                            if(!value.name){
                                citiesSortedArr[value.city_code].main = value;
                            } else {
                                citiesSortedArr[value.city_code].push(value);
                            }
                            citiesOrigSort.push(value.city_code);
                        }
                    });
                    citiesOrigSort = $.grep(citiesOrigSort, function(v, k){
                        return $.inArray(v ,citiesOrigSort) === k;
                    });
                    $.each(citiesOrigSort, function(key, value){
                        if(citiesSortedArr[value].main) {
                            container.find(".twidget-origin .twidget-auto-fill-wrapper ul").append(
                                '<li class="clearfix">' +
                                '<span class="twidget-city-name" data-name="' + citiesSortedArr[value].main.city_name + '" data-country="' + citiesSortedArr[value].main.country_name + '">' + citiesSortedArr[value].main.city_name + ', <span>' + citiesSortedArr[value].main.country_name + '</span></span>' +
                                '<span class="twidget-num-hotel">' + citiesSortedArr[value].main.code + '</span><br>' +
                                '<span class="twidget-city-airport-name">' +  _this.settings.localization.avia_all_airports_caption + '</span></li>'
                            );
                        }
                        $.each(citiesSortedArr[value], function(childKey, childValue){
                            container.find(".twidget-origin .twidget-auto-fill-wrapper ul").append(
                               '<li class="clearfix" ' + (citiesSortedArr[value].main && childKey != 'main' ? 'style="padding-left:30px;"' : '') + '>' +
                               '<span class="twidget-city-name" data-name="' + childValue.city_name + '" data-country="' + childValue.country_name + '">' + childValue.city_name + (citiesSortedArr[value].main && childKey != 'main' ? '' : ', <span>' + childValue.country_name + '</span>') + '</span>' +
                               '<span class="twidget-num-hotel">' + childValue.code + '</span><br>' +
                               '<span class="twidget-city-airport-name">' + (childValue.name ? childValue.name : _this.settings.localization.avia_all_airports_caption ) + '</span></li>'
                            );
                        });
                    });
                    /* input focusout update start */
                    var focus_timeout = 0;
                    if(data[0]){
                        container.find("#twidget-origin").off('focusout').on('focusout', function(){
                            focus_timeout = setTimeout(function(){
                                this_input.val(data[0].city_name);
                                container.find('.twidget-origin-iata').text(data[0].code);
                                origin_iata_input.val(data[0].code);
                                this_input.parent().find('.twidget-pseudo-name').text(data[0].city_name);
                                dep_name.val(data[0].city_name);
                                this_input.parent().find('.twidget-pseudo-country-name').text(', '+data[0].country_name);
                                container.find(".twidget-origin .twidget-auto-fill-wrapper ul li").remove();
                                container.find(".twidget-origin .twidget-auto-fill-wrapper").removeClass('active');
                            }, 200);
                        });
                    }
                    /* input focusout update end */
                    container.find(".twidget-origin .twidget-auto-fill-wrapper").removeClass('active');
                    container.find(".twidget-origin .twidget-auto-fill-wrapper ul li").each(function(){
                        $(this).parent().parent().addClass('active');
                        $(this).click(function(){
                            clearTimeout(focus_timeout);
                            var city = $(this).find('.twidget-city-name').attr('data-name'),
                                country = $(this).find('.twidget-city-name').attr('data-country'),
                                iata = $(this).find('.twidget-num-hotel').text();
                            this_input.val(city);
                            container.find('.twidget-origin-iata').text(iata);
                            origin_iata_input.val(iata);
                            this_input.parent().find('.twidget-pseudo-name').text(city);
                            dep_name.val(city);
                            this_input.parent().find('.twidget-pseudo-country-name').text(', '+country);
                            /* input focusout update start */
                            container.find("#twidget-origin").off('focusout').on('focusout', function(){
                                this_input.val(city);
                                container.find('.twidget-origin-iata').text(iata);
                                origin_iata_input.val(iata);
                                this_input.parent().find('.twidget-pseudo-name').text(city);
                                origin_iata_input.val(iata);
                                this_input.parent().find('.twidget-pseudo-country-name').text(', '+country);
                            });
                            /* input focusout update end */
                            container.find(".twidget-origin .twidget-auto-fill-wrapper ul li").remove();
                            container.find(".twidget-origin .twidget-auto-fill-wrapper").removeClass('active');
                        });
                    });
                    if(!container.find("#twidget-origin").is(':focus')){
                        container.find("#twidget-origin").trigger('focusout');
                    }
                });

            });
            /* destination from parameters */
            if(_this.settings.default_destination) {
                $.getJSON("https://autocomplete.travelpayouts.com/jravia?locale="+_this.settings.locale+"&with_countries=false&q="+_this.settings.default_destination, function (data) {
                    /* input focusout update start */
                    if(data){
                        container.find("#twidget-destination").off('focusout').on('focusout', function(){
                            container.find('#twidget-destination').val(data[0].city_name);
                            arr_name.val(data[0].city_name);
                            container.find('.twidget-destination-iata').text(data[0].code);
                            container.find(".twidget-destination .twidget-pseudo-name").text(data[0].city_name);
                            container.find(".twidget-destination .twidget-pseudo-country-name").text(', '+data[0].country_name);
                            destination_iata_input.val(data[0].code);
                        });
                    }
                    /* input focusout update end */
                    container.find('#twidget-destination').trigger('focusout');
                });
            }
				
            /* destination city auto complete */
           if(_this.settings.lock_destination == false){
			container.find("#twidget-destination").keydown(function() {
                container.find(".twidget-destination .twidget-pseudo-name").text('');
                container.find(".twidget-destination .twidget-pseudo-country-name").text('');
                destination_iata_input.val('');
                arr_name.val('');
                container.find('.twidget-destination-iata').text('');
            });
            container.find("#twidget-destination").keyup(function(){
                var v = $(this).val(),
                    this_input = $(this),
                    citiesSortedArr = [],
                    citiesOrigSort = [];
                $.getJSON("https://autocomplete.travelpayouts.com/jravia?locale="+_this.settings.locale+"&with_countries=false&q="+v, function (data) {
                    container.find(".twidget-destination .twidget-auto-fill-wrapper ul li").remove();
                    $.each(data, function(key, value){
                        if(value.city_name) {
                            if(!citiesSortedArr[value.city_code]){
                                citiesSortedArr[value.city_code] = [];
                            }
                            if(!value.name){
                                citiesSortedArr[value.city_code].main = value;
                            } else {
                                citiesSortedArr[value.city_code].push(value);
                            }
                            citiesOrigSort.push(value.city_code);
                        }
                    });
                    citiesOrigSort = $.grep(citiesOrigSort, function(v, k){
                        return $.inArray(v ,citiesOrigSort) === k;
                    });
                    $.each(citiesOrigSort, function(key, value){
                        if(citiesSortedArr[value].main) {
                            container.find(".twidget-destination .twidget-auto-fill-wrapper ul").append(
                                '<li class="clearfix">' +
                                '<span class="twidget-city-name" data-name="' + citiesSortedArr[value].main.city_name + '" data-country="' + citiesSortedArr[value].main.country_name + '">' + citiesSortedArr[value].main.city_name + ', <span>' + citiesSortedArr[value].main.country_name + '</span></span>' +
                                '<span class="twidget-num-hotel">' + citiesSortedArr[value].main.code + '</span><br>' +
                                '<span class="twidget-city-airport-name">' +  _this.settings.localization.avia_all_airports_caption + '</span></li>'
                            );
                        }
                        $.each(citiesSortedArr[value], function(childKey, childValue){
                            container.find(".twidget-destination .twidget-auto-fill-wrapper ul").append(
                                '<li class="clearfix" ' + (citiesSortedArr[value].main && childKey != 'main' ? 'style="padding-left:30px;"' : '') + '>' +
                                '<span class="twidget-city-name" data-name="' + childValue.city_name + '" data-country="' + childValue.country_name + '">' + childValue.city_name + (citiesSortedArr[value].main && childKey != 'main' ? '' : ', <span>' + childValue.country_name + '</span>') + '</span>' +
                                '<span class="twidget-num-hotel">' + childValue.code + '</span><br>' +
                                '<span class="twidget-city-airport-name">' + (childValue.name ? childValue.name : _this.settings.localization.avia_all_airports_caption ) + '</span></li>'
                            );
                        });
                    });
                    /* input focusout update start */
                    var focus_timeout = 0;
                    if(data[0]){
                        container.find("#twidget-destination").off('focusout').on('focusout', function(){
                            focus_timeout = setTimeout(function(){
                                this_input.val(data[0].city_name);
                                container.find('.twidget-destination-iata').text(data[0].code);
                                destination_iata_input.val(data[0].code);
                                this_input.parent().find('.twidget-pseudo-name').text(data[0].city_name);
                                arr_name.val(data[0].city_name);
                                this_input.parent().find('.twidget-pseudo-country-name').text(', '+data[0].country_name);
                                container.find(".twidget-destination .twidget-auto-fill-wrapper ul li").remove();
                                container.find(".twidget-destination .twidget-auto-fill-wrapper").removeClass('active');
                            }, 200);
                        });
                    }
                    /* input focusout update end */
                    container.find(".twidget-destination .twidget-auto-fill-wrapper").removeClass('active');
                    container.find(".twidget-destination .twidget-auto-fill-wrapper ul li").each(function(){
                        $(this).parent().parent().addClass('active');
                        $(this).click(function(){
                            clearTimeout(focus_timeout);
                            var city = $(this).find('.twidget-city-name').attr('data-name'),
                                country = $(this).find('.twidget-city-name').attr('data-country'),
                                iata = $(this).find('.twidget-num-hotel').text();
                            container.find('#twidget-destination').val(city);
                            container.find('.twidget-destination-iata').text(iata);
                            destination_iata_input.val(iata);
                            this_input.parent().find('.twidget-pseudo-name').text(city);
                            arr_name.val(city);
                            this_input.parent().find('.twidget-pseudo-country-name').text(', '+country);
                            /* input focusout update start */
                            container.find("#twidget-destination").off('focusout').on('focusout', function(){
                                container.find('#twidget-destination').val(city);
                                container.find('.twidget-destination-iata').text(iata);
                                destination_iata_input.val(iata);
                                this_input.parent().find('.twidget-pseudo-name').text(city);
                                arr_name.val(city);
                                this_input.parent().find('.twidget-pseudo-country-name').text(', '+country);
                            });
                            /* input focusout update end */
                            container.find(".twidget-destination .twidget-auto-fill-wrapper ul li").remove();
                            container.find(".twidget-destination .twidget-auto-fill-wrapper").removeClass('active');
                        });
                    });
                    if(!container.find("#twidget-destination").is(':focus')){
                        container.find("#twidget-destination").trigger('focusout');
                    }
                });
            });
		   }


            /* pseudo-inputs */
            container.find('.twidget-pseudo-input').click(function(){
                $(this).parent().find('input[type="text"]').select();
            });
            $('#twidget-origin, #twidget-destination, #twidget-city-hotel').click(function(){
                $(this).select();
            });

        },
        widget_html: function() {}
    } );

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function( options ) {
        return this.each( function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" +
                pluginName, new Plugin( this, options ) );
            }
        } );
    };

    /* handler for clicks outside active autofill */
    $('html').click(function(){
        $('.twidget-auto-fill-wrapper.active ul li:first-child').trigger('click');
    });
    
   

} )( jQuery, window, document );

/* Controllo data di partenza / ritorno */
$( function() {
	  var dateToday = new Date();
	  var dates = $("#start-date, #end-date").datepicker({
	    dateFormat: 'dd/mm/yy',
		defaultDate: "+2d",
	    changeMonth: true,
	    numberOfMonths: 1,
	    minDate: dateToday,
	    onSelect: function(selectedDate) {
	        var option = this.id == "start-date" ? "minDate" : "maxDate",
	        instance = $(this).data("datepicker"),
	        date = $.datepicker.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
	        dates.not(this).datepicker("option", option, date);
	    }
  });
});

function getValue(element,type){
	var selected = $(element).find(":selected").text();
	$('body').find("input[name="+'"'+type+'"'+"]").val(selected);
}


