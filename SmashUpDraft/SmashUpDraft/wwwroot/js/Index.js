$(document).ready(function () {
    $('[rel=qs-item]').on('click', QSItemClick);
    $('#rd-btn').on('click', RandomizeDraft);
});

function QSItemClick(e) {
    e.stopPropagation();
    if ($(e.target).closest('button').data('exp') == 'all') {
        if ($('input.img-checkbox:not(:checked)').length > 0) {
            $('input.img-checkbox').each(function (k, v) {
                $(v).prop('checked', true);
            });
        } else {
            $('input.img-checkbox').each(function (k, v) {
                $(v).prop('checked', false);
            });
        }
    } else {
        if ($('[rel=exp-' + $(e.target).closest('button').data('exp') + '] input[type="checkbox"]:not(:checked)').length > 0) {
            $('[rel=exp-' + $(e.target).closest('button').data('exp') + '] input[type="checkbox"]').each(function (k, v) {
                $(v).prop('checked', true);
            });
        } else {
            $('[rel=exp-' + $(e.target).closest('button').data('exp') + '] input[type="checkbox"]').each(function (k, v) {
                $(v).prop('checked', false);
            });
        }
    }
}

function RandomizeDraft(e) {
    var players = $('input[name="players"]:checked').val();
    var selection = $('input.img-checkbox:checked');
    if (players == undefined) {
        $.confirm({
            title: false,
            content: 'You have not selected a player count',
            buttons: {
                '2': {
                    action: function () {
                        $('#radio-2').prop('checked', true);
                        RandomizeDraft(null);
                    }
                },
                '3': {
                    action: function () {
                        $('#radio-3').prop('checked', true);
                        RandomizeDraft(null);
                    }
                },
                '4': {
                    action: function () {
                        $('#radio-4').prop('checked', true);
                        RandomizeDraft(null);
                    }
                }
            }
        });
    } else if (selection.length < (players * 2)) {
        $.confirm({
            title: false,
            content: 'There are not enough factions selected ',
            buttons: {
                'Select All': {
                    action: function () {
                        $('input.img-checkbox').each(function (k, v) {
                            $(v).prop('checked', true);
                        });
                        RandomizeDraft(null);
                    }
                },
                'Back': {}
            }
        });
    } else {
        players = parseInt(players);
        selection = shuffle(selection).toArray();
        var data = [];
        for (var i = 0; i < (players * 2); i++) {
            var x = $(selection.pop());
            if ($('#no-repeat').prop('checked')) {
                $(x).prop('checked', false);
            }
            
            data.push(x.prop('class').substring(13, x.prop('class').indexOf('-bg')));
        }

        $('div[id^="player-"]').addClass('d-none');
        $('div[id^="player-"] div').removeClass('bg-success');

        if ($('#select-first').prop('checked')) {
            var starter = Math.floor((Math.random() * players) + 1);
            $('#player-' + starter + ' div').first().addClass('bg-success');
        }

        for (var j = 0; j < players; j++) {
            $('#player-' + (j + 1)).removeClass('d-none');
            var faction1 = $('label[for="' + data[j] + '-cb"]').css('background');
            var faction2 = $('label[for="' + data[(j + players)] + '-cb"]').css('background');
            $('#player-' + (j + 1) + ' div.img1').css('background', faction1);
            $('#player-' + (j + 1) + ' div.img2').css('background', faction2);
        }
    }
}

function shuffle(arr) {
    for (var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
    return arr;
}