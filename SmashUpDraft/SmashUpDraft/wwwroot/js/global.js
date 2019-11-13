$(document).ready(function () {
    $('[rel=qs-item]').closest('div').addClass('float-right');
    $('[rel=qs-item]').on('click', QSItemClick);
});

function QSItemClick(e) {
    e.stopPropagation();

    if ($(e.target).closest('button').data('exp') == 'all') {
        if ($('input.img-checkbox:not(:checked)').length > 0) {
            $('div.dropdown-menu input[data-toggle="toggle"]').prop('checked', true).change();
            $('input.img-checkbox').each(function (k, v) {
                $(v).prop('checked', true);
            });
        } else {
            $('div.dropdown-menu input[data-toggle="toggle"]').prop('checked', false).change();
            $('input.img-checkbox').each(function (k, v) {
                $(v).prop('checked', false);
            });
        }
    } else {
        if ($('[rel=exp-' + $(e.target).closest('button').data('exp') + '] input[type="checkbox"]:not(:checked)').length > 0) {
            $($(e.target).find('input[data-toggle="toggle"]')[0]).prop('checked', true).change();
            $('[rel=exp-' + $(e.target).closest('button').data('exp') + '] input[type="checkbox"]').each(function (k, v) {
                $(v).prop('checked', true);
            });
        } else {
            $($(e.target).find('input[data-toggle="toggle"]')[0]).prop('checked', false).change();
            $('[rel=exp-' + $(e.target).closest('button').data('exp') + '] input[type="checkbox"]').each(function (k, v) {
                $(v).prop('checked', false);
            });
        }
    }
}