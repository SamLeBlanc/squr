const format_board_text = () => {
  // Set font size for filled and empty squares
  for (let i = 0; i < 25; i++) {
    font_size = $(`#sq-${i}`).text() != '●' ? '45px' : '8px';
    $(`#sq-${i}`).css('color','white').css('font-size',font_size)
  }

  // Color active square differently than the board
  $(`#sq-${active_sq_num()}`).css('color','gold')

  // If empty, make active square a large gold dot
  if ($(`#sq-${active_sq_num()}`).text() == '●'){
    $(`#sq-${active_sq_num()}`).css('font-size','26px')
  }

  // Set color of locked squares
  for (let i = 0; i < 25; i++) {
    if (locked.substring(i,i+1) != '●'){
      $(`#sq-${i}`).css('color','green')
    }
  }
}

const active_sq_num = () => {
  return active_square[1]*5 + active_square[0]
}

const get_sq_nums_in_word = () => {
  start = orient == 0 ? active_sq_num()%5 : Math.floor(active_sq_num()/5)*5
  step = orient == 0 ? 5 : 1
  sq_nums_in_word = [start,start+(1*step),start+(2*step),start+(3*step),start+(4*step)]
  return sq_nums_in_word
}

const is_current_word_full = () => {
  return get_sq_nums_in_word().every(elem => get_filled_sqaures().includes(elem));
}

const is_current_word_empty = () => {
  return !get_sq_nums_in_word().some(elem => get_filled_sqaures().includes(elem));
}

const move_to_next_square = () => {
  if (((orient==1 && active_square[0] == 4) ||
  (orient==0 && active_square[1] == 4)) && is_current_word_full()){
    active_square[0] = (active_square[0]+1) % 5
    active_square[1] = (active_square[1]+1) % 5
  } else if (orient == 1){
    active_square[0] = (active_square[0]+1) % 5
  } else {
    active_square[1] = (active_square[1]+1) % 5
  }

  if (!is_current_word_full() && $(`#sq-${active_sq_num()}`).text() != '●'){
    move_to_next_square()
  }

}

const set_letter = letter => {
  if (locked.substring(active_sq_num(), active_sq_num()+1) == '●'){
    $(`#sq-${active_sq_num()}`).text(letter).css('color','black')
  }
  move_to_next_square()
  update()
}

const get_filled_sqaures = () => {
  filled = []
  for (let i = 0; i < 25; i++) {
    if ($(`#sq-${i}`).text() != "●"){
      filled.push(i)
    }
  }
  return filled
}

const rotate_orient = () => {
  orient = (orient+1) % 2
  update()
}

const delete_letter = () => {
  if ($(`#sq-${active_sq_num()}`).text() == "●"){
      active_square[(orient+1)%2] = (4+active_square[(orient+1)%2]) % 5
      if (is_current_word_empty() && active_square[(orient+1)%2] == 4){
        active_square[orient] = (4+active_square[orient])%5
      }
  }
  if (locked.substring(active_sq_num(),active_sq_num()+1) == '●'){
    $(`#sq-${sq}`).text("●")
  }
  update()
}

const set_clue_text = () => {
  clue_number = orient == 0 ? active_square[0] : active_square[1]
  $(`#clue`).text(clues[orient][clue_number])
}

const enter_key = () => {
  if (active_square[orient] == 4){
    active_square[(orient+1)%2] = 0
    rotate_orient()
  } else {
    active_square[orient] = (active_square[orient]+1) % 5
  }
  active_square[(orient+1)%2] = 0
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

const shake_board = () => {
  let board = document.querySelector('#board');
  board.animate([
      { transform: 'translate(3px, 0px)' },
      { transform: 'translate(-6px, 0px)'},
      { transform: 'translate(6px, 0px)' },
      { transform: 'translate(-6px, 0px)'},
      { transform: 'translate(6px, 0px)' },
      { transform: 'translate(-3px, 0px)'},
    ], { duration: 250 });
}

const move_left = () =>  { active_square[0] = (active_square[0]+4) % 5; update(); }
const move_up = () =>    { active_square[1] = (active_square[1]+4) % 5; update(); }
const move_down = () =>  { active_square[0] = (active_square[0]+1) % 5; update(); }
const move_right = () => { active_square[1] = (active_square[1]+1) % 5; update(); }
const move_to_word_start = () => { active_square[(orient+1)%2] = 0; update() }
const move_to_next_word = () => {
  active_square[orient] = (active_square[orient]+1)%5
  move_to_word_start()
  if (active_square[orient] == 0) orient = (orient+1)%2
  update()
}

const move_with_keys = e => {
  if(e.keyCode == 37) move_left()
  if(e.keyCode == 38) move_up()
  if(e.keyCode == 39) move_down()
  if(e.keyCode == 40) move_right()
  if(e.keyCode == 8)  delete_letter() // backspace
  if(e.keyCode == 13) enter_key() // enter
  if(e.keyCode == 32) rotate_orient() // space
}

const get_current_answers = () => {
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
  set_clue_text()
  check_answer()
}

document.addEventListener("DOMContentLoaded", () => {

  orient = 1
  active_square = [0,0]

  $( "body" ).keydown(function(e) {
    move_with_keys(e)
    update()
  });

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

   solution = "CARLOOCEANSHIPSTENSEASSET"
   locked = "●●●●●●●●●●●●●●●●●●●●●●●●●"

  clues = [
          ["_____ Rica",
          'Pains',
          'Means of control',
          'Expire',
          'Beginning'],
          ["Monte _____",
          "Neptune's realm",
          'Vessels',
          'Wound up',
          'Plus']
          ]

  setup()

});
