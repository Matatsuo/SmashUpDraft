$(document).ready(function () {
    $('[rel=qs-item]').closest('div').addClass('float-right');
    $('[rel=qs-item]').on('click', QSItemClick);

    var load_factions = Cookies.get('Factions');
    if (load_factions == 'all') {
        $('button[data-exp="all"]').trigger('click');
    } else if (load_factions == 'none') {

    } else if (load_factions != undefined) {
        load_factions = JSON.parse(load_factions);

        $.each(load_factions, function (k, v) {
            $('#' + v).prop('checked', true);
            var exp = $('#' + v).closest('div').attr('rel').substring(4);
            var selector = '[rel=exp-' + exp + '] input[type="checkbox"]';
            if ($(selector).length == $(selector + ':checked').length) {
                $('button.dropdown-item[data-exp="' + exp + '"] input[data-toggle="toggle"]').prop('checked', true).change();
            }
        });
    }
});

function QSItemClick(e) {
    e.stopPropagation();
    var button = $(e.target).closest('button');

    if ($(e.target).closest('button').data('exp') == 'all') {
        if ($('input.img-checkbox:not(:checked)').length > 0) {
            $('input[data-toggle="toggle"]').prop('checked', true).change();
            $('input.img-checkbox').each(function (k, v) {
                $(v).prop('checked', true);
            });
            Cookies.set('Factions', 'all');
        } else {
            $('input[data-toggle="toggle"]').prop('checked', false).change();
            $('input.img-checkbox').each(function (k, v) {
                $(v).prop('checked', false);
            });
            Cookies.set('Factions', 'none');
        }
    } else {
        if ($('[rel=exp-' + $(button).data('exp') + '] input[type="checkbox"]:not(:checked)').length > 0) {
            $(button).find('input[data-toggle="toggle"]').prop('checked', true).change();
            $('[rel=exp-' + $(button).data('exp') + '] input[type="checkbox"]').each(function (k, v) {
                $(v).prop('checked', true);
            });
            if ($('input.img-checkbox:not(:checked)').length == 0) {
                $('input[data-toggle="toggle"]').prop('checked', true).change();
                Cookies.set('Factions', 'all');
            } else {
                var factions_array = [];
                $('input.img-checkbox:checked').each(function (k, v) {
                    factions_array.push($(v).attr('id'));
                });
                Cookies.set('Factions', JSON.stringify(factions_array));
            }
        } else {
            $('[data-exp="all"] input[data-toggle="toggle"]').prop('checked', false).change();
            $(button).find('input[data-toggle="toggle"]').prop('checked', false).change();
            $('[rel=exp-' + $(button).data('exp') + '] input[type="checkbox"]').each(function (k, v) {
                $(v).prop('checked', false);
            });
            if ($('input.img-checkbox:checked').length == 0) {
                $('input[data-toggle="toggle"]').prop('checked', false).change();
                Cookies.set('Factions', 'none');
            } else {
                var factions_array = [];
                $('input.img-checkbox:checked').each(function (k, v) {
                    factions_array.push($(v).attr('id'));
                });
                Cookies.set('Factions', JSON.stringify(factions_array));
            }
        }
    }
}