/**
 *
 * Fifteen game jQuery plugin
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2012, Script Tutorials
 * http://www.script-tutorials.com/
 */

// This is a JavaScript event. It means - once DOM is finished loading,
// execute everything inside the callback function scope
// This is where we initialize the game
$(document).ready(function() {
    // Initialize the game and create the plugin

    // When the squares swap places, the moving square must always appear on top
    var zi = 1; // We increment z-index each time a square is shifted

    // The index of the empty square by default, the 9th square
    var EmptySquare =9;

    // Now, this is where we create the plugin and call it fifteen.
 
    $.fn.extend({ fifteen:
 
        function(square_size) {
            // Grab the id of the HTML element into which we are placing the game,
            // it is the selector - "#game_object" from  $("#game_object").fifteen(300);
            var gameObjectElement = '#' + $(this).attr('id'); 
 
            var sqSize = square_size + 'px';
            var boardSize = (square_size * 3) + 'px';

            // Inject DIV into game_object, this is our game board
            $(gameObjectElement).html('<div id="board"></div>'); 

            $('#board').css({ position:'absolute', width: boardSize, height: boardSize, border: '1px solid gray' });

            // Populate the game board's HTML container with 15 squares
            for (var i = 0; i < 9; i++) {
                // A dirty way to create an arbitrary DIV and append it into HTML dynamically
                // Notice each square uses the same image. It just uses a different x/y offset for each square
                $('#board').append("<div style='left: " + ((i % 3) * square_size) + "px; top: " + Math.floor(i / 3) * square_size + "px; width: " + square_size + "px; height: " + square_size + "px; background-position: " + (-(i % 3) * square_size) + "px " + -Math.floor(i / 3) * square_size + "px '></div>");
            }
 
            // Empty up the 9th square, as the starting point
            // EmptySquare = 9
            $('#board').children("div:nth-child(" + EmptySquare + ")").css({backgroundImage: "", background: "#ffffff"});

            // Attach click event to each square
            $('#board').children('div').click(function() {
                Move(this, square_size);
            });
        }
    });

    // Move() is the function that is called when a square is clicked
    // Note that it is independent of the plugin itself which is described above
    // It takes two parameters,
    //     1. object handle to the square that was clicked, and
    //     2. the width of the square
    function Move(clicked_square, square_size) {
        // We need to locate movable tiles based on where the empty spot is,
        // We can only move the four surrounding squares
        var movable = false;
 
        // Swap x/y between the clicked square and the currently empty square
        var oldx = $('#board').children("div:nth-child(" + EmptySquare + ")").css('left');
        var oldy = $('#board').children("div:nth-child(" + EmptySquare + ")").css('top');

        var newx = $(clicked_square).css('left');
        var newy = $(clicked_square).css('top');
 
        // The clicked square is north of the empty square
        if (oldx == newx && newy == (parseInt(oldy) - square_size) + 'px')
            movable = true;
 
        // The clicked square is south of the empty square
        if (oldx == newx && newy == (parseInt(oldy) + square_size) + 'px')
            movable = true;
 
        // The clicked square is west of the empty square
        if ((parseInt(oldx) - square_size) + 'px' == newx && newy == oldy)
            movable = true;
 
        // The clicked square is east of the empty square
        if ((parseInt(oldx) + square_size) + 'px' == newx && newy == oldy)
            movable = true;
 
        if (movable) {
            // Increment zindex so the new tile is always on top of all others
            $(clicked_square).css('z-index', zi++);
 
            // Swap squares... Animate new square into old square position
            $(clicked_square).animate({ left: oldx, top: oldy }, 200, function() {
                //Move old square into new square position
                $('#board').children("div:nth-child(" + EmptySquare + ")").css('left', newx);
                $('#board').children("div:nth-child(" + EmptySquare + ")").css('top', newy);
            });
        }
    }

    // Ok, we're ready to initialize the game, let's do it.
    // Create a game with 300 by 300 squares inside "#game_object" div:
    $('#game_object').fifteen(300);
});