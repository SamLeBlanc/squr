const format_board_text = () => {

  // Set font size for filled and empty squares
  for (let i = 0; i < 25; i++) {
    font_size = $(`#sq-${i}`).text() != '●' ? '45px' : '8px';
    $(`#sq-${i}`).css('color','white').css('font-size',font_size)
  }

<<<<<<< HEAD
=======
  // Color active square differently than the board
  $(`#sq-${active_sq_num()}`).css('color','gold')

  // If empty, active square empty, make dot larger than others
  if ($(`#sq-${active_sq_num()}`).text() == '●'){
    $(`#sq-${active_sq_num()}`).css('font-size','26px')
  }

>>>>>>> f3642421974a4179178886e437661afa632eaf16
  // Set color of locked squares
  for (let i = 0; i < 25; i++) {
    if (locked.substring(i,i+1) != '●'){
      $(`#sq-${i}`).css('color','green')
    }
  }

  // Color active square differently than the board
  $(`#sq-${active_sq_num()}`).css('color','gold')

  // If empty, active square empty, make dot larger than others
  if ($(`#sq-${active_sq_num()}`).text() == '●'){
    $(`#sq-${active_sq_num()}`).css('font-size','26px')
  }
}

const active_sq_num = () => {
  // Caclulate square number from active square array
  return active_square[1]*5 + active_square[0]
}

const get_sq_nums_in_word = () => {
  // Returns all of the square numbers in the active word
  start = orient == 0 ? active_sq_num()%5 : Math.floor(active_sq_num()/5)*5
  step = orient == 0 ? 5 : 1
  sq_nums_in_word = [start, step+start, 2*step+start, 3*step+start, 4*step+start]
  return sq_nums_in_word
}

const is_current_word_full = () => {
  // Boolean if no squares in current word are empty
  return get_sq_nums_in_word().every(elem => get_filled_sqaures().includes(elem));
}

const is_current_word_empty = () => {
  // Boolean if all squares in current word are empty
  return !get_sq_nums_in_word().some(elem => get_filled_sqaures().includes(elem));
}

const rotate_orient = () => {
  // Flip the active orientation from across to down (or v.v.)
  orient = (orient+1) % 2
  update()
}
<<<<<<< HEAD

const get_filled_sqaures = () => {
  // Returns array of all non-empty square numbers
  filled = []
  for (let i = 0; i < 25; i++) {
    if ($(`#sq-${i}`).text() != "●") filled.push(i)
  }
  return filled
}

const shake_board = () => {
  // Shake the game board when checking for correct answers
  let board = document.querySelector('#board');
  board.animate([
      { transform: 'translate(3px, 0px)' },
      { transform: 'translate(-6px, 0px)'},
      { transform: 'translate(6px, 0px)' },
      { transform: 'translate(-6px, 0px)'},
      { transform: 'translate(6px, 0px)' },
      { transform: 'translate(-3px, 0px)'},
    ], { duration: 300 });
}

const get_current_guess = () => {
  sqs = get_sq_nums_in_word()
  guess = ''
  sqs.forEach(sq_num => {
      guess += $(`#sq-${sq_num}`).text()
  })
  return guess
}

const clear_current_guess = () => {
  sqs = get_sq_nums_in_word()
  sqs.forEach(sq_num => {
    if (locked.slice(sq_num,sq_num+1) == "●") {
      $(`#sq-${sq_num}`).text("●")
    }
  })
}

const check_guess_against_grid = guess => {
    old_locked = locked
    locked = ''
    for (let ii = 0; ii < 25; ii++) {
      solution_letter = solution.slice(ii,ii+1)
      if (old_locked.slice(ii,ii+1) == "●"){
        if (guess.includes(solution_letter)){
          $(`#sq-${ii}`).text(solution_letter).css('color','green')
          locked += solution_letter
        } else {
          $(`#sq-${ii}`).text("●").css('color','white')
          locked += "●"
        }
      } else {
        locked += old_locked.slice(ii,ii+1)
      }
    }
    update()
}

const color_locked_keys = guess => {
  guess.split('').forEach(g => {
    if (solution.includes(g)) $(`#${g.toLowerCase()}`).css('background','green')
    if (!solution.includes(g)) $(`#${g.toLowerCase()}`).css('background','red')
  })
}

const move_with_keys = e => {
  // Use event keycodes to trigger board changes
  if(e.keyCode == 37) move_left()
  if(e.keyCode == 38) move_up()
  if(e.keyCode == 39) move_right()
  if(e.keyCode == 40) move_down()
  if(e.keyCode == 8)  delete_letter() // backspace
  if(e.keyCode == 13) enter_key()     // enter
  if(e.keyCode == 32) rotate_orient() // space
}

const move_triangles = () => {
  sqaure_size = Math.min(.25 * window.innerWidth, 160)
  color = 'gold'
  if (orient == 0){
    $('#tri-left').css('border-right','11px solid transparent')
    $('#tri-right').css('border-left','11px solid transparent')
    $('#tri-up').css('border-bottom','11px solid ' + color)
    $('#tri-down').css('border-top','11px solid ' + color)
    $('#tri-col').css('margin-left',`${sqaure_size*(active_square[0]-2)}px`)
  } else {
    $('#tri-up').css('border-bottom','11px solid transparent')
    $('#tri-down').css('border-top','11px solid transparent')
    $('#tri-left').css('border-right','11px solid ' + color)
    $('#tri-right').css('border-left','11px solid ' + color)
    $('#tri-row').css('margin-top',`${sqaure_size*(active_square[1]-2)}px`)
  }
}

=======

const get_filled_sqaures = () => {
  // Returns array of all non-empty square numbers
  filled = []
  for (let i = 0; i < 25; i++) {
    if ($(`#sq-${i}`).text() != "●") filled.push(i)
  }
  return filled
}

const set_clue_text = () => {
  // Update clue text to reflect active word
  clue_number = orient == 0 ? active_square[0] : active_square[1]
  $(`#clue`).text(clues[orient][clue_number])
}

const shake_board = () => {
  // Shake the game board when checking for correct answers
  let board = document.querySelector('#board');
  board.animate([
      { transform: 'translate(3px, 0px)' },
      { transform: 'translate(-6px, 0px)'},
      { transform: 'translate(6px, 0px)' },
      { transform: 'translate(-6px, 0px)'},
      { transform: 'translate(6px, 0px)' },
      { transform: 'translate(-3px, 0px)'},
    ], { duration: 300 });
}


const move_with_keys = e => {
  // Use event keycodes to trigger board changes
  if(e.keyCode == 37) move_left()
  if(e.keyCode == 38) move_up()
  if(e.keyCode == 39) move_right()
  if(e.keyCode == 40) move_down()
  if(e.keyCode == 8)  delete_letter() // backspace
  if(e.keyCode == 13) enter_key()     // enter
  if(e.keyCode == 32) rotate_orient() // space
}

const get_current_answers = () => {
  // Return string of all user answers (including blanks)
  string = ''
  for (let i = 0; i < 25; i++) {
    string += ($(`#sq-${i}`).text())
  }
  return string
}

const check_answer = () => {

  if (get_current_answers() == solution){
      $(`.square`).css('color','green').css('font-weight','bold')
  }
}

const move_triangles = () => {
  sqaure_size = Math.min(.25 * window.innerWidth, 160)
  color = get_current_answers() == solution ? 'green' : 'gold'
  if (orient == 0){
    $('#tri-left').css('border-right','11px solid transparent')
    $('#tri-right').css('border-left','11px solid transparent')
    $('#tri-up').css('border-bottom','11px solid ' + color)
    $('#tri-down').css('border-top','11px solid ' + color)
    $('#tri-col').css('margin-left',`${sqaure_size*(active_square[0]-2)}px`)
  } else {
    $('#tri-up').css('border-bottom','11px solid transparent')
    $('#tri-down').css('border-top','11px solid transparent')
    $('#tri-left').css('border-right','11px solid ' + color)
    $('#tri-right').css('border-left','11px solid ' + color)
    $('#tri-row').css('margin-top',`${sqaure_size*(active_square[1]-2)}px`)
  }
}

>>>>>>> f3642421974a4179178886e437661afa632eaf16
/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////

const move_to_next_square = () => {
<<<<<<< HEAD
  orient == 0 ? move_down() : move_right()
=======
  if (orient == 1){
  	if (active_square[0] == 4) { move_down(); move_to_word_start(); }
  	else { move_right(); }
  } else if (orient == 0){
  	if (active_square[1] == 4) { move_right(); move_to_word_start(); }
  	else { move_down(); }
  }
  if (is_sq_filled(active_sq_num()) && get_filled_sqaures().length < 25){
    move_to_next_square()
  }
>>>>>>> f3642421974a4179178886e437661afa632eaf16
}

const set_letter = letter => {
  if (locked.substring(active_sq_num(), active_sq_num()+1) == '●'){
    $(`#sq-${active_sq_num()}`).text(letter).css('color','black')
  }
<<<<<<< HEAD
  if (active_square[(1+orient)%2] != 4) move_to_next_square()
=======
  move_to_next_square()
>>>>>>> f3642421974a4179178886e437661afa632eaf16
  update()
}

const delete_letter = () => {
  // Remove letter from grid
  if ($(`#sq-${active_sq_num()}`).text() == "●"){
      active_square[(orient+1)%2] = (4+active_square[(orient+1)%2]) % 5
      if (is_current_word_empty() && active_square[(orient+1)%2] == 4){
        active_square[orient] = (4+active_square[orient])%5
      }
  }
  if (locked.substring(active_sq_num(),active_sq_num()+1) == '●'){
    $(`#sq-${active_sq_num()}`).text("●")
  }
  update()
}

const enter_key = () => {
  let guess = get_current_guess()
  if (guess == "●●●●●"){
    if (active_square[orient] == 4){
      active_square[(orient+1)%2] = 0
      rotate_orient()
    } else {
      active_square[orient] = (active_square[orient]+1) % 5
    }
    active_square[(orient+1)%2] = 0
  } else if (!full_words.includes(guess)){
    shake_board()
    clear_current_guess()
    move_to_word_start()
  }
  else {
    check_guess_against_grid(guess)
    color_locked_keys(guess)
  }
  update()
}

const remove_wrong_answers = () => {
  shake_board()
  locked = ''
  for (let i = 0; i < 25; i++) {
    if (solution.substring(i,i+1) != $(`#sq-${i}`).text()){
      $(`#sq-${i}`).text("●")
      locked += '●'
    } else {
      locked += $(`#sq-${i}`).text()
    }
  }
  update()
}

const is_sq_filled = n => {
  return $(`#sq-${n}`).text() != '●'
}

const move_left = () =>  { active_square[0] = (active_square[0]+4) % 5; update(); }
const move_up = () =>    { active_square[1] = (active_square[1]+4) % 5; update(); }
const move_down = () =>  { active_square[1] = (active_square[1]+1) % 5; update(); }
const move_right = () => { active_square[0] = (active_square[0]+1) % 5; update(); }
const move_to_word_start = () => { active_square[(orient+1)%2] = 0; update() }
const move_to_next_word = () => {
  active_square[orient] = (active_square[orient]+1)%5
  move_to_word_start()
  if (active_square[orient] == 0) orient = (orient+1)%2
  update()
}

const setup = () => {
  disableScroll()
  create_squares()
  initial_dots()
  keyboard_setup()
  setup_sqaure_click()
  adjust_icon_size()
  initial_triangles()
  update()
}

const update = () => {
  format_board_text()
  move_triangles()
}

document.addEventListener("DOMContentLoaded", () => {

  orient = 1
  active_square = [0,0]

  $( "body" ).keydown(function(e) {
    move_with_keys(e)
    update()
  });

  if (window.innerWidth < 400){
    $(".keyboard-row button.wide-button") .css('flex-grow','0').css('width',1.5*(1+$('#q').width()))
  }

  $('button').on('mousedown',
     /** @param {!jQuery.Event} event */
     function(event) {
         event.preventDefault();
     }
  );

  $( "body" ).keydown(function(e) {
    if((e.keyCode >= 65 && e.keyCode <= 90)||(e.keyCode >= 97 && e.keyCode <= 122)){
        letter = e.key.toUpperCase()
        set_letter(letter)
      }
  });

   solution = "OLIVENADIRTULSAAREASPASSE"
   locked = "●●●●●●●●●●●●●●●●●●●●●●●●●"

   // F A M E R
   // A Z O L E
   // C O V E N
   // E L E C T
   // R E S T S

  setup()

});
