$(document).ready(function(){
    $('button').click(function(){
        var newRad = $('input').val() <= 300 ? $('input').val():300,
            oldRad = $('.laboite').css('border-top-left-radius').match(/\d+/);
            dur = Math.abs(newRad-oldRad) * 10;
        $(".laboite").animate({
            'border-top-left-radius': newRad, 
            'border-top-right-radius': newRad, 
            'border-bottom-left-radius': newRad, 
            'border-bottom-right-radius': newRad,
            '-webkit-border-top-left-radius': newRad, 
            '-webkit-border-top-right-radius': newRad, 
            '-webkit-border-bottom-left-radius': newRad, 
            '-webkit-border-bottom-right-radius': newRad, 
            '-moz-border-top-left-radius':newRad,
            '-moz-border-top-right-radius':newRad,
            '-moz-border-bottom-left-radius':newRad,
            '-moz-border-bottom-right-radius':newRad
        },dur); 
        $('#leresultat').val(
            'Current Radius: ' + newRad + 'px;\n' +
            'Previous Radius: ' + oldRad + 'px;\n' +
            'Duration: ' + dur + ' milliseconds;'
        );
    });
});