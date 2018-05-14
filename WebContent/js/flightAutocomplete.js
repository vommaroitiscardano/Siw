
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


//            /*passenger details toggle*/
//            container.find('.twidget-passengers-detail').click(function(){
//                $(this).toggleClass('active');
//                container.find('#twidget-passenger-form').fadeToggle(65);
//            });
//
//            /* passengers details ready button */
//            container.find('.twidget-passengers-ready-button').click(function(){
//                container.find('.twidget-passengers-detail').trigger('click');
//            });
//
//
//            /*quantity increment*/
//            $(document).on("click", "#"+this.element.id+" .twidget-q-btn", function() {
//                var button = $(this),
//                    input = button.parent().find("input"),
//                    newVal = parseFloat(input.val()),
//                    adults_pas_count = parseFloat(adults_pas_input.val()),
//                    children_pas_count = parseFloat(children_pas_input.val()),
//                    infants_pas_count = parseFloat(infants_pas_input.val());
//
//                if (button.text() == "+") {
//                    if((button.attr('data-age') == 'adults' || button.attr('data-age') == 'children')  && (adults_pas_count + children_pas_count + infants_pas_count ) < 9) { // max 9 passengers (adults+children)
//                        newVal++;
//                    }
//                    if(button.attr('data-age') == 'infants'  && newVal < adults_pas_count && (adults_pas_count + children_pas_count + infants_pas_count ) < 9) { // max infants = current adults
//                        newVal++;
//                    }
//                    if(button.attr('data-age') == 'adults-g' && newVal < 4) { // max 4 adult guests
//                        newVal++;
//                    }
//                    if(button.attr('data-age') == 'children-g' && newVal < 3) { // max 3 children guests
//                        newVal++;
//                        container.find('#twidget-guest-form .twidget-pas-class ul').append( // add +1 child guest age selection
//                            '<li>' +
//                            '<div class="twidget-cell twidget-age-select">' +
//                            '<span class="twidget-dec twidget-q-btn" data-age="one-child">-</span><span class="twidget-num"><input type="text" name="children['+newVal+']" value="8"></span><span class="twidget-inc twidget-q-btn" data-age="one-child">+</span>' +
//                            '</div>' +
//                            '</li>'
//                        );
//                        container.find('#twidget-guest-form .twidget-pas-class').show();
//                    }
//                    if(button.attr('data-age') == 'one-child' && newVal < 17) { // children guests max age = 17
//                        newVal++;
//                    }
//                } else {
//                    // Don't allow decrementing below zero
//                    if (input.val() > 0) {
//                        // Don't allow decrementing adultrs below 1
//                        if((button.attr('data-age') == 'adults' || button.attr('data-age') == 'adults-g') && input.val() == 1) {
//                            return false;
//                        }
//                        newVal--;
//                        if(button.attr('data-age') == 'adults' && infants_pas_count > newVal ) { // correct infants count when decrementing adults count
//                            infants_pas_input.val(newVal);
//                        }
//                        if(button.attr('data-age') == 'children-g') { // remove children age selectors when decrementing children count
//                            container.find('#twidget-guest-form .twidget-pas-class li:last-child').remove();
//                            if(newVal == 0) {
//                                container.find('#twidget-guest-form .twidget-pas-class').hide();
//                            }
//                        }
//                    } else {
//                        newVal = 0;
//                    }
//                }
//                input.val(newVal);
//                pas_count_label.html(0);
//                container.find('#twidget-passenger-form input[name="adults"], #twidget-passenger-form input[name="children"], input[name="infants"]').trigger('change');
//                guests_count_label.html(0);
//                container.find('#twidget-guest-form input[name="adults"], #twidget-guest-form input[name="children_sum"]').trigger('change');
//            });
//
//            /* calculate passengers count label */
//            container.find('#twidget-passenger-form input[name="adults"], #twidget-passenger-form input[name="children"], input[name="infants"]').on('change', function() {
//                var current_count = parseFloat(pas_count_label.html()),
//                    input_count = parseFloat($(this).val());
//                pas_count_label.html(current_count+input_count);
//                if(current_count+input_count >= 5) {
//                    container.find('.twidget-pas-caption').text(_this.settings.localization.avia_passengers_caption_5);
//                } else if(current_count+input_count != 1){
//                    container.find('.twidget-pas-caption').text(_this.settings.localization.avia_passengers_caption_2);
//                } else {
//                    container.find('.twidget-pas-caption').text(_this.settings.localization.avia_passengers_caption_1);
//                }
//            });
//
//
//            /*passenger flight class selection*/
//            container.find('.twidget-pass-class+label').click(function(){
//                container.find(".twidget-pass-class").trigger('click');
//            });
//            container.find(".twidget-pass-class").change(function() {
//                if(this.checked) {
//                    container.find('.twidget-form-list li .twidget-passengers-detail .twidget-class').html(_this.settings.localization.avia_passengers_business_class);
//                    trip_class_input.val(1);
//                }
//                else{
//                    container.find('.twidget-form-list li .twidget-passengers-detail .twidget-class').html(_this.settings.localization.avia_passengers_economy_class);
//                    trip_class_input.val(0);
//                }
//            });
//
//            /*datepicker flight*/
//            var dateSelect     = container.find('#twidget-flight-datepicker'),
//                dateDepart     = container.find('input[name="depart_date"]'),
//                dateReturn     = container.find('input[name="return_date"]'),
//                iconReturnCal  = container.find('.twidget-return-date .twidget-icon-cal'),
//                iconReturnDel  = container.find('.twidget-return-date .twidget-icon-delete'),
//                spanDepart     = container.find('.twidget-date-depart'),
//                spanReturn     = container.find('.twidget-date-return'),
//                spanDateFormat = 'MMMM D';
//
//            $.fn.datepicker.dates['en'].daysMin = ["<span style='color: red;'>Su</span>","Mo","Tu","We","Th","Fr","<span style='color: red;'>Sa</span>"];
//
//            $.fn.datepicker.dates['ru'] = {
//                days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
//                daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
//                daysMin:["<span style='color: red;'>Вс</span>","Пн","Вт","Ср","Чт","Пт","<span style='color: red;'>Сб</span>"],
//                months:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],
//                monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
//                today: "Today",
//                clear: "Clear",
//                format: "mm/dd/yyyy",
//                titleFormat: "MM yyyy", /* Leverages same syntax as 'format' */
//                weekStart: 1
//            };
//            var yearFromNow = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
//            dateSelect.datepicker({
//                autoclose: true,
//                format: "yyyy-mm-dd",
//                maxViewMode: 0,
//                startDate: "now",
//                endDate: yearFromNow,
//                disableTouchKeyboard: true,
//                language: _this.settings.localization.datepicker_language
//            }).on('change', function() {
//                if(dateDepart.val()){
//                    var start = dateDepart.datepicker('getDate').getDate() + ' ' + _this.settings.localization.month_names[dateDepart.datepicker('getDate').getMonth()] + ', ' + _this.settings.localization.weekdays_short[dateDepart.datepicker('getDate').getDay()];
//                    spanDepart.text(start.toLowerCase());
//                }
//                if(dateReturn.val()){
//                    var end = dateReturn.datepicker('getDate').getDate() + ' ' + _this.settings.localization.month_names[dateReturn.datepicker('getDate').getMonth()] + ', ' + _this.settings.localization.weekdays_short[dateReturn.datepicker('getDate').getDay()];
//                    spanReturn.text(end.toLowerCase());
//                    iconReturnCal.hide();
//                    iconReturnDel.show();
//                    dateReturn.css('font-size', '0');
//                    oneway_input.val(0);
//                }
//                $(document).find('.datepicker tbody').removeClass('with-return-button');
//            }).on('click', function() {
//                if(container.find('.twidget-passengers-detail').hasClass('active')){
//                    container.find('.twidget-passengers-detail').trigger('click');
//                }
//            });
//            dateSelect.trigger('change');
//
//            dateDepart.change(function(){
//                dateReturn.focus();
//            });
//
//            /* datepicker flight - cancel return date*/
//            iconReturnDel.click(function() {
//                $(document).find('.datepicker').hide();
//                $(this).hide();
//                iconReturnCal.show();
//                dateReturn.val('').css('font-size', '14px');
//                spanReturn.text('');
//                oneway_input.val(1);
//                oneway_input.removeAttr('disabled');
//            });
//            dateReturn.focus(function(){
//                setTimeout(function(){
//                    if(!$(document).find('.datepicker tbody').hasClass('with-return-button')){
//                            $(document).find('.datepicker tbody .datepicker-cancel-return-date').parent().remove();
//                            $(document).find('.datepicker tbody').append('<tr><td class="datepicker-cancel-return-date">'+_this.settings.localization.datepicker_return_ticket_caption+'</td></tr>');
//                            $(document).find('.datepicker tbody').addClass('with-return-button');
//                            $(document).find('.datepicker-cancel-return-date').click(function(){
//                                iconReturnDel.click()
//                            });
//                            dateReturn.datepicker('show');
//                        }
//                    }, 1);
//            });
//            dateReturn.datepicker()
//                .on('changeMonth', function() {
//                    setTimeout(function(){
//                        $(document).find('.datepicker tbody').removeClass('with-return-button');
//                        //dateReturn.focus();
//                        $(document).find('.datepicker tbody .datepicker-cancel-return-date').parent().remove();
//                        $(document).find('.datepicker tbody').append('<tr><td class="datepicker-cancel-return-date">'+_this.settings.localization.datepicker_return_ticket_caption+'</td></tr>');
//                        $(document).find('.datepicker tbody').addClass('with-return-button');
//                        $(document).find('.datepicker-cancel-return-date').click(function(){
//                            iconReturnDel.click()
//                        });
//                    }, 1);
//                });
//
//
//            /*datepicker hotel*/
//            var dateSelect1     = container.find('#twidget-hotel-datepicker');
//            var dateDepart1     = container.find('input[name="checkIn"]');
//            var dateReturn1     = container.find('input[name="checkOut"]');
//            var spanDepart1     = container.find('.twidget-date-checkin');
//            var spanReturn1     = container.find('.twidget-date-checkout');
//            var spanDateFormat1 = 'MMMM d';
//
//            /* datepicker inner buttons */
//            $('.twidget-icon-cal, .twidget-date-text').click(function(){
//                $(this).parent().find('input').trigger('focus');
//            });

            /* origin city from parameters */
            if(_this.settings.default_origin) {
                $.getJSON("https://autocomplete.travelpayouts.com/jravia?locale="+_this.settings.locale+"&with_countries=false&q="+_this.settings.default_origin, function (data) {
                    /* input focusout update */
                    if(data){
                        container.find("#twidget-origin").off('focusout').on('focusout', function(){
                            container.find('#twidget-origin').val(data[0].city_name);
                            container.find('.twidget-origin-iata').text(data[0].code);
                            container.find(".twidget-origin .twidget-pseudo-name").text(data[0].city_name);
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
                            this_input.parent().find('.twidget-pseudo-country-name').text(', '+country);
                            /* input focusout update start */
                            container.find("#twidget-origin").off('focusout').on('focusout', function(){
                                this_input.val(city);
                                container.find('.twidget-origin-iata').text(iata);
                                origin_iata_input.val(iata);
                                this_input.parent().find('.twidget-pseudo-name').text(city);
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
                            this_input.parent().find('.twidget-pseudo-country-name').text(', '+country);
                            /* input focusout update start */
                            container.find("#twidget-destination").off('focusout').on('focusout', function(){
                                container.find('#twidget-destination').val(city);
                                container.find('.twidget-destination-iata').text(iata);
                                destination_iata_input.val(iata);
                                this_input.parent().find('.twidget-pseudo-name').text(city);
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


