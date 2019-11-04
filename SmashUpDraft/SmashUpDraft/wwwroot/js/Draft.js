﻿var direction_change = false;
var direction = '+';
var max_turns = null;
var turn_count = 0;

$(document).ready(function () {
    $('#startdraft-btn').on('click', StartDraft);
    $('#repick-div button').on('click', DraftReset);
});

function StartDraft(e) {
    var players = parseInt($('#players').val());
    var selection = $('input.img-checkbox:checked');
    var factions = parseInt($('#factions').val());
    if (players < 2 || players > 16) {
        $.alert({
            title: false,
            content: 'You have not entered a player count greater than 2 and less than 17'
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
                        StartDraft(null);
                    }
                },
                'Back': {}
            }
        });
    } else {
        max_turns = players * factions;
        turn_count = 0;
        $('#options').addClass('d-none');
        $('#current-selector-title').removeClass('d-none');
        $('#faction-list').addClass('d-none');
        $('#draft-list').removeClass('d-none');

        for (var i = 1; i <= players; i++) {
            $('#player-' + i).removeClass('d-none');
        }

        selection.each(function (index, item) {
            // put selected factions into the draft pool
            var faction = $(item.closest('div')).clone();
            $(faction.children('input')[0]).prop('id', $(faction.children('input')[0]).prop('id') + '2');
            $(faction.children('label')[0]).prop('for', $(faction.children('label')[0]).prop('for') + '2');
            $(faction.children('label')[0]).on('click', ChooseFaction);
            $('#draft-list .card-body').append(faction);
        });
    }
}

function ChooseFaction(e) {
    var players = parseInt($('#players').val());
    var current = parseInt($('#active_player').text());
    var next = current;

    $(e.target).closest('div').addClass('d-none');
    var img = $('<div>', {
        'class': 'col-6 img img' + ($('#player-' + current + ' div.card div.row div.img').length + 1),
        'style': 'background:' + $(e.target).closest('label').css('background')
    });
    $('#player-' + current + ' div.card div.row').append(img);
    turn_count = turn_count + 1;

    if (turn_count == max_turns) {
        $('#draft-list').addClass('d-none');
        $('#current-selector-title').addClass('d-none');
        $('#repick-draft').removeClass('d-none');
        return;
    }

    if (direction_change) {
        direction_change = false;
        direction = (direction == '+' ? '-' : '+');
    } else if (direction == '+') {
        next = next + 1;
        if (next == players) { direction_change = true; }
    } else if (direction == '-') {
        next = next - 1;
        if (next == 1) { direction_change = true; }
    }
    
    for (var i = 1; i <= 16; i++) {
        $('#current-selector-title').removeClass('player-' + i + '-color');
    }
    $('#current-selector-title').addClass('player-' + next + '-color');
    $('#active_player').text(next);
}

function DraftReset(e) {
    $('#options').removeClass('d-none');
    $('#faction-list').removeClass('d-none');
    $('#draft-list .card-body').empty();

    direction_change = false;
    direction = '+';

    $('#active_player').text(1);
    for (var i = 1; i <= 16; i++) {
        $('#current-selector-title').removeClass('player-' + i + '-color');
        $('#player-' + i + ' div.card div.row').empty();
    }
    $('#current-selector-title').addClass('player-' + 1 + '-color');

    for (var i = 1; i <= 16; i++) {
        $('#player-' + i).addClass('d-none');
    }
}