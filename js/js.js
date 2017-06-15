/**

 * Created by IntelliJ IDEA.

 * User: roma_i387

 * Date: 29.08.2012

 * Time: 23:25:57

 */



function isNumeric(number) {



    return !isNaN(parseFloat(number)) && parseFloat(number) == number;

}



function validateCalcFromErrorMessage(message) {

    alert(message);

}



function calcFromMessage(message) {

    alert(message);

}



function validateCalcForm() {



    if(!$('#diameter').val()) {

        validateCalcFromErrorMessage('Укажите Диаметр отверстий!');

        return false;

    }



    if(!$('#drilling-depth').val()) {

        validateCalcFromErrorMessage('Укажите Глубину бурения!');

        return false;

    }



    if(!isNumeric($('#drilling-depth').val())) {

        $('#drilling-depth').val('');

        validateCalcFromErrorMessage('Глубина бурения должна быть числом!');

        return false;

    }



    if(!$('#number-openings').val()) {

        validateCalcFromErrorMessage('Укажите Количество отверстий!');

        return false;

    }



    if(!isNumeric($('#number-openings').val())) {

        $('#number-openings').val('');

        validateCalcFromErrorMessage('Количество отверстий должно быть числом!');

        return false;

    }



    if(!$('#distance').val()) {

        validateCalcFromErrorMessage('Укажите Удаленность от МКАД!');

        return false;

    }



    if(!isNumeric($('#distance').val())) {

        $('#distance').val('');

        validateCalcFromErrorMessage(' Удаленность от МКАД должно быть числом!');

        return false;

    }



    if(!$('.checkbox-group input[type=checkbox]:checked').length){



        validateCalcFromErrorMessage('Укажите Тип техники!');

        return false;

    }



    return true;

}



function checkTypeTechnique(type_t, jCheck, alert) {



    if(!calculatorObject) {

        validateCalcFromErrorMessage('Ошибка в данных расчёта. Cooщите админитратору!');

        return false;

    }



    if(!$('#diameter').val()) {

        return false;

    }



    var max_diameter = 0;



    $.each(calculatorObject[type_t].number_openings_on_shift, function(diameter) {

        max_diameter = diameter;

    });



    if($('#diameter').val() > max_diameter) {



        var need_checked = false;

        var break_value = false;



        $.each(calculatorObject, function(the_type) {

            if(!break_value) {



                if(need_checked) {



                    jCheck.removeAttr('checked');

                    $('.checkbox-group input[name='+the_type+']').attr('checked', 'checked');



                    if(checkTypeTechnique(the_type, $('.checkbox-group input[name='+the_type+']')), alert) {

                        if(alert)

                            calcFromMessage('Для заданного диаметра необходим следующий тип техники!');

                    }

                    break_value = true;

                }



                if(the_type == type_t) {

                    need_checked = true;

                }

            }

        });



        if(break_value) {

            return false;

        }

    }



    if(!$('#drilling-depth').val()) {

        return false;

    }



    var max_drilling_depth = calculatorObject[type_t].maximum_drilling_depth;



    if($('#drilling-depth').val() > max_drilling_depth) {



        if(type_t == 'automobile_wagon') {



            $('.checkbox-group input[type=checkbox]').removeAttr('checked');

            if(alert)

                calcFromMessage('Глубина превышает максимально-допустимую, измените параметры расчёта!');

            return false;



        } else {

            var need_checked = false;

            var break_value = false;



            $.each(calculatorObject, function(the_type) {

                if(!break_value) {



                    if(need_checked) {



                        jCheck.removeAttr('checked');

                        $('.checkbox-group input[name='+the_type+']').attr('checked', 'checked');



                        if(checkTypeTechnique(the_type, $('.checkbox-group input[name='+the_type+']')), alert) {

                            if(alert)

                                calcFromMessage('Для заданной глубины необходим следующий тип техники!');

                        }

                        break_value = true;

                    }



                    if(the_type == type_t) {

                        need_checked = true;

                    }

                }

            });



            if(break_value) {

                return false;

            }



        }

    }



    return true;

}



function calcAmountDrilling() {



    if(!validateCalcForm()) { return false;}







    checkTypeTechnique($('.checkbox-group input[type=checkbox]:checked').attr('name'), $('.checkbox-group input[type=checkbox]:checked'), true);



    if($('.checkbox-group input[type=checkbox]:checked').length) {



        var type_t = $('.checkbox-group input[type=checkbox]:checked').attr('name');



        if(parseFloat($('#drilling-depth').val()) < 3.5) {

            var cost = (calculatorObject[type_t].cost_one_shift / calculatorObject[type_t].number_openings_on_shift[$('#diameter').val()]) * $('#drilling-depth').val() * $('#number-openings').val();

        } else {

            var cost = $('#diameter').val() * $('#drilling-depth').val() * $('#number-openings').val();

        }



        cost =  Math.ceil(cost/100)*100;

        if(cost < calculatorObject[type_t].day_price) {

            cost = calculatorObject[type_t].day_price;

        }

        var shipping_cost = calculatorObject[type_t].cost_feeding_equipment + calculatorObject[type_t].additional_1_km * $('#distance').val();

        shipping_cost =  Math.ceil(shipping_cost/100)*100;



        $('#comments').val("Диамет: "+$('#diameter').val()+" ??.; <br> Глубина бурения: "+$('#drilling-depth').val()+" ?.; <br> Количество отверстий: "+$('#number-openings').val()+" ??.; <br> Расстояние от МКАД: "+$('#distance').val()+" ??.");



        $('#calculation-cost').html(cost);

        $('#transportation-cost').html(shipping_cost);

        $('#summary-cost').html(cost+shipping_cost);

        $('#calculator-form-submit').hide();

        $('#calculator-to-order').show();



    }

    return true;

}



function selectType() {

    if($('input[name="yamobur_type"]').length) {

        $('input[name="yamobur_type"]').remove();

    }



    if($('#order-form-wrapper form ul.yamobur-type li .selected-type').length) {

        $('#order-form-wrapper form ul.yamobur-type li .selected-type').remove();

    }



    if($('#order-form-wrapper form ul.yamobur-type li.active').length) {

        $('.ordered-selected-item').hide();

        $('.ordered-related-item').hide();



        var selected_item_id = '#selected-' + $('#order-form-wrapper form ul.yamobur-type li.active').attr('id');



        if($(selected_item_id).length) {

           $(selected_item_id).show();

        }



        var related_item_id = '#related-' + $('#order-form-wrapper form ul.yamobur-type li.active').attr('id');



        if($(related_item_id).length) {

           $(related_item_id).show();

        }



        $('#order-form-wrapper form ul.yamobur-type li.active').prepend('<div class="selected-type">' +

                '<input type="hidden" name="yamobur_type" value="'+$('#order-form-wrapper form ul.yamobur-type li.active .caption').html()+'"/>'+

                '<strong>Вы выбрали</strong>'+

                '</div>');

    }

}



$(document).ready(function () {



    if($("#calculator-form-submit").length) {



        $('.checkbox-group input[type=checkbox]').live('click', function(){

            $('#calculator-form-submit').show();

            $('#calculator-to-order').hide();

            var check = $(this).attr('checked');



            $('.checkbox-group input[type=checkbox]').removeAttr('checked');



            if(check) {



                $(this).attr('checked', 'checked');

                checkTypeTechnique($(this).attr('name'), $(this), true);

            }

        });



        $('#diameter').change(function() {



            var jCheck = $('.checkbox-group input[type=checkbox][checked=checked]');

            if(!jCheck.length) {

                jCheck = $('.checkbox-group .checkbox-item:first input[type=checkbox]');

            }

            jCheck.attr('checked', 'checked');

            checkTypeTechnique(jCheck.attr('name'), jCheck, false);

            $('#calculator-form-submit').show();

            $('#calculator-to-order').hide();

        });



        $('#drilling-depth').keyup(function() {



            var jCheck = $('.checkbox-group input[type=checkbox][checked=checked]');

            if(!jCheck.length) {

                jCheck = $('.checkbox-group .checkbox-item:first input[type=checkbox]');

            }

            jCheck.attr('checked', 'checked');

            checkTypeTechnique(jCheck.attr('name'), jCheck, false);



            $(this).val($(this).val().replace(',', '.'));

            $('#calculator-form-submit').show();

            $('#calculator-to-order').hide();

        });



        $('#number-openings, #distance').keyup(function() {



            var jCheck = $('.checkbox-group input[type=checkbox][checked=checked]');

            if(!jCheck.length) {

                jCheck = $('.checkbox-group .checkbox-item:first input[type=checkbox]');

            }

            jCheck.attr('checked', 'checked');

            checkTypeTechnique(jCheck.attr('name'), jCheck, false);



            $('#calculator-form-submit').show();

            $('#calculator-to-order').hide();

        });

        $("#calculator-form-submit").click(calcAmountDrilling);

    }



    if($('#content .catalog .list .block-type-1').length) {

        $('#content .catalog .list .block-type-1:nth-child(2n)').addClass('second');

        $('#content .catalog .list .block-type-1').show();

    }

});



$(window).load(function(){



    $("a.fancybox").fancybox();



    if(!$('#order-form-wrapper form ul.yamobur-type li.active').length) {

        $('#order-form-wrapper form ul.yamobur-type li.type-mini').addClass('active');

    }



    if($('#order-form-wrapper form ul.yamobur-type li.active').length) {

        selectType();

    }



    if($('#order-form-wrapper form ul.yamobur-type li').length) {



        if(!$('#order-form-wrapper form ul.yamobur-type li.active').length) {

            $('#order-form-wrapper form ul.yamobur-type li:last').addClass('active');

            selectType();

        }



        $('#order-form-wrapper form ul.yamobur-type li').bind('click', function() {

            $('#order-form-wrapper form ul.yamobur-type li').removeClass('active');

            $(this).addClass('active');

            selectType();

            $('#ordered-info').remove();

        })

    }



    if($('.city-info').length) {

        $.each($('.city-info img'), function() {

            if(!$(this).parents('#ordered-related-info').length) {

              $(this).wrap('<div class="city-image"></div>');

              $(this).after('<div class="city-image-frame"></div>');

            }

        });

        

        if($('#ordered-related-info ul li').length) {

            var maxHeight = $('#ordered-related-info ul li:first').height();

            $.each($('#ordered-related-info ul li'), function() {

                if(maxHeight < $(this).height()) {

                    maxHeight = $(this).height();

                }

            });

            $('#ordered-related-info ul li').height(maxHeight);

        }

    }





    if ($('.city-description').length) {

        $('.city-info .gallery ul li').eq(1).css('float', 'right');

        if (($('.city-info .gallery ul li').length % 2)) {

        $('.city-info .gallery ul li:last').addClass('no-eq');

        }

        $.each($('.gallery ul li'), function () {

        var padding_top = ($(this).height() - $('img', this).height()) / 2 - 10;

        $('img', this).css('padding-top', padding_top);

        });

   }



    $('body').append('<div id ="get-question-button"> <div class="arrow open">&nbsp;<\/div><div class="text">&nbsp;<\/div><\/div>');



    if($.cookie("quetion_form_close")) {

       $('#get-question-button').css('right',-85 + 'px');

       $('#get-question-button .arrow').toggleClass('open');

    }



    $('#get-question-button .arrow').live('click', function() {

        $(this).parent().animate({ right: ($(this).hasClass('open') ? -85 : 0) }, 'fast');

         if($(this).hasClass('open')) {

            $.cookie("quetion_form_close", true, {path: "/"});

         } else {

            $.cookie("quetion_form_close", null, {path: "/"});

         }

        $(this).toggleClass('open');

    });



    $('.wrapper-popup-window .close-btn').live('click', function() {

        $('.wrapper-popup-window').hide();

        $('.wrapper-popup-window').toggleClass('show');

    });



    $('#get-question-button .text').live('click', function() {

        if($('.wrapper-popup-window').hasClass('show')) {

            $('.wrapper-popup-window').hide();

        } else {

            $('.wrapper-popup-window').show();

        var winPopUpLeft = ($(window).width() - $('.wrapper-popup-window').width()) / 2;

        $('.wrapper-popup-window').css('left', winPopUpLeft + 'px');

        }

        $('.wrapper-popup-window').toggleClass('show');

    });

});