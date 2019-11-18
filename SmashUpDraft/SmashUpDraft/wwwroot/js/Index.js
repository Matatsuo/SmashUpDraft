$(document).ready(function () {
    $('#rd-btn').on('click', RandomizeDraft);
    Options = Cookies.get('RandomOptions');
    if (Options != undefined) {
        Options = JSON.parse(Options);
        $('input[name="players"][value=' + Options.players + ']').prop('checked', true);
        $('#select-three').prop('checked', Options.three);
        $('#select-first').prop('checked', Options.highlight);
        $('#no-repeat').prop('checked', Options.repeats);
    }
});

function RandomizeDraft(e) {
    var players = $('input[name="players"]:checked').val();
    var selection = $('input.img-checkbox:checked');
    var factions = 2;
    if ($('#select-three').prop('checked')) { factions = 3; }

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
    } else if (selection.length < (players * factions)) {
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

        // Save Options
        Options = {};
        Options.players = players;
        Options.three = $('#select-three').prop('checked');
        Options.highlight = $('#select-first').prop('checked');
        Options.repeats = $('#no-repeat').prop('checked');
        Cookies.set('RandomOptions', JSON.stringify(Options));

        var data = [];
        for (var i = 0; i < (players * factions); i++) {
            var x = $(selection.pop());
            if ($('#no-repeat').prop('checked')) {
                $(x).prop('checked', false);
            }
            
            data.push(x.prop('class').substring(13, x.prop('class').indexOf('-bg')));
        }

        $('div[id^="player-"]').addClass('d-none');
        $('div[id^="player-"] div.row').empty();
        $('div[id^="player-"] div').removeClass('bg-success');

        if ($('#select-first').prop('checked')) {
            var starter = Math.floor((Math.random() * players) + 1);
            $('#player-' + starter + ' div').first().addClass('bg-success');
        }

        for (var j = 0; j < players; j++) {
            $('#player-' + (j + 1)).removeClass('d-none');
            for (var k = 0; k < factions; k++) {
                var faction = $('label[for="' + data[(j + (players * k))] + '-cb"]').css('background');
                $('#player-' + (j + 1) + ' div.row').append(
                    $('<div>', {
                        'class': 'img col',
                        style: 'background:' + faction
                    })
                );
            }
        }
    }
}

function shuffle(arr) {
    for (var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
    return arr;
}