orient = 1
active_square = [0,0]


const create_rows_and_cols = () => {
  ['row','col'].forEach( z => {
    const gameBoard = document.getElementById(`board-${z}s`);
    for (let index = 0; index < 5; index++) {
      let div = document.createElement("div");
      div.classList.add(z);
      div.setAttribute("id", `${z}-${index}`);
      gameBoard.appendChild(div);
    }
  })
}

const create_squares = () => {
  const gameBoardL = document.getElementById("board-letters");
  for (let row_index = 0; row_index < 5; row_index++) {
    let row = document.createElement("div");
    row.classList.add("row2");
    row.setAttribute("id", `letter-holder-${row_index}`);
    gameBoardL.appendChild(row);
    for (let index = 0; index < 5; index++) {
      let square = document.createElement("div");
      square.classList.add("square");
      square.setAttribute("id", `sq-${row_index*5 + index}`);
      row.appendChild(square);
    }
  }
}

function disableScroll() {
    // Get the current page scroll position
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,

        // if any scroll is attempted, set this to the previous value
        window.onscroll = function() {
            window.scrollTo(scrollLeft, scrollTop);
        };
}

const highlight_active_square = () => {
  for (let i = 0; i < 25; i++) {
    $(`#sq-${i}`).css('color','white').css('font-size','6px')
    if ($(`#sq-${i}`).text() != '●'){
      $(`#sq-${i}`).css('font-size','45px')
    }

  }
  sq_num = active_square[1]*5 + active_square[0]
  $(`#sq-${sq_num}`).css('color','gold')
  if ($(`#sq-${sq_num}`).text() == '●'){
    $(`#sq-${sq_num}`).css('font-size','26px')
  }

}

const color_locked_squares = () => {
  for (let i = 0; i < 25; i++) {
    if (locked.substring(i,i+1) != '●'){
      $(`#sq-${i}`).css('color','green')
    }
  }
}

const initial_dots = () => {
  for (let i = 0; i < 25; i++) {
    $(`#sq-${i}`).text('●').css('color','white')
  }
}

const fill_dots = () => {
  for (let i = 0; i < 25; i++) {
    $(`#sq-${i}`).css('color','white')
  }
}

const color_active_word = () => {
  for (let i = 0; i < 25; i++) {
    $(`#sq-${i}`).css('color','white')
  }
  for (let i = 0; i < 5; i++) {
    sq = orient == 0 ? active_square[0] + 5*i : active_square[1]*5 + i
    $(`#sq-${sq}`).css('color','white')
  }
}

const get_word_square_numbers = () => {
  sq_num = active_square[1]*5 + active_square[0]
  let nums_in_word = []
  if (orient ==1 ){
      start = Math.floor(sq_num/5)*5
      nums_in_word = [start,start+1,start+2,start+3,start+4]
  } else {
      start = sq_num%5
      nums_in_word = [start,start+5,start+10,start+15,start+20]
  }
  return nums_in_word
}

const is_current_word_full = () => {
  f = filled_squares()
  w = get_word_square_numbers()
  return w.every(elem => f.includes(elem));
}

const is_current_word_empty = () => {
  f = filled_squares()
  w = get_word_square_numbers()
  return !w.some(elem => f.includes(elem));
}

const move_to_next_square = () => {
  if (((orient==1 && active_square[0] == 4) ||
  (orient==0 && active_square[1] == 4)) && word_finished()){
    active_square[0] = (active_square[0]+1) % 5
    active_square[1] = (active_square[1]+1) % 5
  } else if (orient == 1){
    active_square[0] = (active_square[0]+1) % 5
  } else {
    active_square[1] = (active_square[1]+1) % 5
  }

  sq_num = active_square[1]*5 + active_square[0]
  if (!is_current_word_full() && $(`#sq-${sq_num}`).text() != '●'){
    move_to_next_square()
  }

}

const set_letter = letter => {
  sq_num = active_square[1]*5 + active_square[0]
  if (locked.substring(sq_num,sq_num+1) == '●'){
    $(`#sq-${sq_num}`).text(letter).css('color','black')
  }
  move_to_next_square()
  update()
}

const filled_squares = () => {
  filled = []
  for (let i = 0; i < 25; i++) {
    if ($(`#sq-${i}`).text() != "●"){
      filled.push(i)
    }
  }
  return filled
}

const word_finished = () => {
  finished = true
  filled = filled_squares()
  for (let i = 0; i < 5; i++) {
    sq = orient == 0 ? active_square[0] + 5*i : active_square[1]*5 + i
    if (!filled.includes(sq)){
      finished = false
    }
  }
  return finished
  }


const full_rotate = () => {
  orient = (orient+1) % 2
  update()
}



const delete_letter = () => {
  sq = active_square[1]*5 + active_square[0]
  if ($(`#sq-${sq}`).text() == "●"){
      active_square[(orient+1)%2] = (4+active_square[(orient+1)%2]) % 5
      if (is_current_word_empty() && active_square[(orient+1)%2] == 4){
        active_square[orient] = (4+active_square[orient])%5
      }
  }

  $(`#sq-${sq}`).text("●")
  update()
}

const set_clue_text = () => {
  clue_number = orient == 0 ? active_square[0] : active_square[1]
  $(`#clue`).text(clues[orient][clue_number])
}

const enter_key = () => {
  active_square[orient] = (active_square[orient]+1) % 5
  active_square[(orient+1)%2] = 0
  update()
}

const remove_wrong_answers = () => {
  shake_board()
  nums = [...Array(25).keys()]
  locked = ''
  nums.forEach(n => {
    if (solution.substring(n,n+1) != $(`#sq-${n}`).text()){
      $(`#sq-${n}`).text("●")
      locked += '●'
    } else {
      locked += $(`#sq-${n}`).text()
    }

  })
  update()
}

const shake_board = () => {
  var board = document.querySelector('#board-container');
  board.animate([
      // keyframes
      { transform: 'translate(3px, 0px)' },
      { transform: 'translate(-6px, 0px)'},
      { transform: 'translate(6px, 0px)' },
      { transform: 'translate(-6px, 0px)'},
      { transform: 'translate(6px, 0px)' },
      { transform: 'translate(-3px, 0px)'},
    ], {
      // timing options
      duration: 250,
    });
}

const move_left = () =>  { active_square[0] = (active_square[0]+4) % 5; update(); }
const move_up = () =>    { active_square[1] = (active_square[1]+4) % 5; update(); }
const move_down = () =>  { active_square[0] = (active_square[0]+1) % 5; update(); }
const move_right = () => { active_square[1] = (active_square[1]+1) % 5; update(); }

const move_with_keys = e => {
  if(e.keyCode == 37) move_left()
  if(e.keyCode == 38) move_up()
  if(e.keyCode == 39) move_down()
  if(e.keyCode == 40) move_down()
  if(e.keyCode == 8)  delete_letter() // backspace
  if(e.keyCode == 13) enter_key()
}

const adjust_icon_size = () => {
  key_width = parseInt($('.keyboard-row button').css('width').substring(0,2))
  key_height = parseInt($('.keyboard-row button').css('height').substring(0,2))

  icon_size = Math.min(0.7*key_width,24)
  $('img').css('width', icon_size).css('height', icon_size)
}


const keyboard_setup = () => {
  const keys = document.querySelectorAll(".keyboard-row button");
  for (let i = 0; i < keys.length; i++) {
    keys[i].onclick = ({ target }) => {
      const letter = target.getAttribute("data-key").toUpperCase();
      if (letter == "DEL") {
        delete_letter()
      } else if (letter == "ROTATE") {
        full_rotate()
      } else if (letter == 'CHECK'){
        remove_wrong_answers()
      }
      else if (letter == 'ENTER'){
        enter_key()
      } else if (letter == '*'){

      }
      else {
        set_letter(letter)
      }
    }
  }
}

const get_current_answers = () => {
  string = ''
  nums = [...Array(25).keys()]
  nums.forEach( n => {
    string += ($(`#sq-${n}`).text())
  })
  return string
}

const setup_sqaure_click = () => {
  [...Array(25).keys()].forEach(n => {
    $(`#sq-${n}`).click(() => {
      active_square = [n%5,Math.floor(n/5)]
      update()
    })
    $(`#sq-${n}`).dblclick(() => {
      full_rotate()
    })

  })
}

const check_answer = () => {
  if (get_current_answers() == solution){
    [...Array(25).keys()].forEach(n => {
      $(`#sq-${n}`).css('color','green').css('font-weight','bold')
    })
  }
}

const initial_triangles = () => {
  board_width = Math.min(window.innerWidth*.625, 400)

  starting_margin = parseInt($('#triangle-left').css('margin-left'))
  $('#triangle-left').css('margin-left',starting_margin+board_width/2)

  starting_margin = parseInt($('#triangle-right').css('margin-left'))
  $('#triangle-right').css('margin-left',starting_margin-board_width/2)

  starting_margin = parseInt($('#triangle-up').css('margin-top'))
  $('#triangle-up').css('margin-top',starting_margin+board_width/2)

  starting_margin = parseInt($('#triangle-down').css('margin-top'))
  $('#triangle-down').css('margin-top',starting_margin-board_width/2)
}

const move_triangles = () => {
  sqaure_size = Math.min(.25 * window.innerWidth, 160)
  color = get_current_answers() == solution ? 'green' : 'gold'
  if (orient == 0){
    $('#triangle-left').css('border-right','11px solid transparent')
    $('#triangle-right').css('border-left','11px solid transparent')
    $('#triangle-up').css('border-bottom','11px solid ' + color)
    $('#triangle-down').css('border-top','11px solid ' + color)
    $('#triangles-col').css('margin-left',`${sqaure_size*(active_square[0]-2)}px`)
    // $('#triangles-row').css('margin-top',`${128*(active_square[0]-2)}px`)
  } else {
    $('#triangle-up').css('border-bottom','11px solid transparent')
    $('#triangle-down').css('border-top','11px solid transparent')
    $('#triangle-left').css('border-right','11px solid ' + color)
    $('#triangle-right').css('border-left','11px solid ' + color)
    $('#triangles-row').css('margin-top',`${sqaure_size*(active_square[1]-2)}px`)
    // $('#triangles-col').css('margin-left',`${128*(active_square[1]-2)}px`)
  }

}

const setup = () => {
  disableScroll()
  create_rows_and_cols();
  create_squares();
  initial_dots()
  fill_dots()
  keyboard_setup()
  setup_sqaure_click()
  adjust_icon_size()
  initial_triangles()
  update()
}

const update = () => {
  highlight_active_square()
  move_triangles()
  set_clue_text()
  check_answer()
  color_locked_squares()

}

document.addEventListener("DOMContentLoaded", () => {
  $('button').on('mousedown',
     /** @param {!jQuery.Event} event */
     function(event) {
         event.preventDefault();
     }
 );

  orient = 1
  active_square = [0,0]

  $( "body" ).keydown(function(e) {
    move_with_keys(e)
    update()
  });

  $( "body" ).keydown(function(e) {
    if(e.keyCode == 32){
        full_rotate()
      }
  });

  if (window.innerWidth < 400){
  $('#title').css('font-size','18px')
    $('#theme').css('font-size','18px')
    $('#clue-box').css('font-size','18px')
    $(".keyboard-row button").css('flex-grow','0').css('width','25px')
}


  $( "body" ).keydown(function(e) {
    if((e.keyCode >= 65 && e.keyCode <= 90)||(e.keyCode >= 97 && e.keyCode <= 122)){
        letter = e.key.toUpperCase()
        set_letter(letter)
      }
  });

   solution = "ORBITCHEMOCOLONUNIFYREEFS"
   locked = "●●●●●●●●●●●●●●●●●●●●●●●●●"


  clues = [['Happen',
      'River in France and Switzerland',
      'Contradict',
      '5 p.m. phrase, for some',
      'Awards on Broadway'],
      ["Elliptic curve in space",
      "Cancer treat.",
      'Large intestine',
      'Bring together',
      'Victims of ocean acidification']
      ]

  setup()

});
