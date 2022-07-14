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
