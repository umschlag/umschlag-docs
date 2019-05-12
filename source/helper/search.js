import Fuse from 'fuse.js'
import Handlebars from 'handlebars'

export default function search(query, source, target) {
  if (query !== '' && source !== undefined) {
    $.getJSON('/index.json', function(data) {
      let options = {
        shouldSort: true,
        threshold: 0.0,
        tokenize: true,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          { name: 'title', weight: 0.8 },
          { name: 'contents', weight: 0.5 },
          { name: 'tags', weight: 0.3 },
          { name: 'categories', weight: 0.3 }
        ]
      }

      let result = new Fuse(data, options).search(query)
      let template = Handlebars.compile(source)
      let rendered = template({ matches: result })

      console.log(rendered)
      target.html(rendered)
    })
  }
}
