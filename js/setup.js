const create_squares = () => {
  const gameBoardL = document.getElementById("board-letters");
  for (let row_index = 0; row_index < 5; row_index++) {
    let row = document.createElement("div");
    row.classList.add("board-row");
    gameBoardL.appendChild(row);
    for (let index = 0; index < 5; index++) {
      let square = document.createElement("div");
      square.classList.add("square");
      square.setAttribute("id", `sq-${row_index*5 + index}`);
      row.appendChild(square);
    }
  }
}

const initial_triangles = () => {
  board_width = Math.min(window.innerWidth*.625, 400)
  starting_margin = parseInt($('#tri-left').css('margin-left'))
  $('#tri-left').css('margin-left',starting_margin+board_width/2)
  starting_margin = parseInt($('#tri-right').css('margin-left'))
  $('#tri-right').css('margin-left',starting_margin-board_width/2)
  starting_margin = parseInt($('#tri-up').css('margin-top'))
  $('#tri-up').css('margin-top',starting_margin+board_width/2)
  starting_margin = parseInt($('#tri-down').css('margin-top'))
  $('#tri-down').css('margin-top',starting_margin-board_width/2)
}

const keyboard_setup = () => {
  const keys = document.querySelectorAll(".keyboard-row button");
  for (let i = 0; i < keys.length; i++) {
    keys[i].onclick = ({ target }) => {
      const letter = target.getAttribute("data-key").toUpperCase();
      if (letter == "ROTATE")     rotate_orient()
      else if (letter == "DEL")   delete_letter()
      else if (letter == 'CHECK') remove_wrong_answers()
      else if (letter == 'ENTER') enter_key()
      else if (letter == '*') false
      else set_letter(letter)
    }
  }
}

const adjust_icon_size = () => {
  key_width = parseInt($('.keyboard-row button').css('width').substring(0,2))
  key_height = parseInt($('.keyboard-row button').css('height').substring(0,2))
  icon_size = Math.min(0.6*key_width,24)
  $('img').css('width', icon_size).css('height', icon_size)
}

const setup_sqaure_click = () => {
  for (let i = 0; i < 25; i++) {
    $(`#sq-${i}`).click(() => { active_square = [i%5, Math.floor(i/5)]; update(); });
    $(`#sq-${i}`).dblclick(() => { rotate_orient() })
  }
}

const initial_dots = () => {
  for (let i = 0; i < 25; i++) {
    $(`#sq-${i}`).text('●').css('color','white')
  }
}

const disableScroll = () => {
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    window.onscroll = function() {
        window.scrollTo(scrollLeft, scrollTop);
    };
}
