import $ from 'jquery'

import queryvar from './helper/queryvar'
import search from './helper/search'

window.$ = $
window.jQuery = $

$(document).ready(() => {
  $('#search [name=q]').val(queryvar('q'))
})

$('#results').ready(() => {
  let query = queryvar('q')
  let template = $('#template').html()

  search(query, template, $('#results'))
})
