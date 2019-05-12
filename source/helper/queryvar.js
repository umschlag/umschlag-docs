export default function queryvar(name) {
  let query = window.location.search.substring(1);
  let variables = query.split('&');

  if (query === '') {
    return ''
  }

  for (var i = 0; i < variables.length; i++) {
    let pair = variables[i].split('=');

    if (pair[0] === name) {
      return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
    }
  }

  return ''
}
