(function(){
  const flickrKey = 'a79dbdd1d24bbdf97f202f74ff0b63ec'
  const flickerBaseURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key='
  const sufixURL = 'q'


  function getPhotos(searchTerm){
    const URL = `${flickerBaseURL}${flickrKey}&text=${searchTerm}`
    return (
      fetch(URL).then(res => {
        return res.json()
      }).then(data => {
        console.log(data.photos)
        return data.photos.photo
      })
    )
  }

  const app = document.querySelector('#app')
  const searchForm = app.querySelector('.search-form')
  const searchTerm = app.querySelector('.search-input')
  const result = app.querySelector('#result')

  function createFlickerThumb(photoData){
    const link = document.createElement('a')
    link.setAttribute('href', photoData.large)
    link.setAttribute('target', '_blank')

    const image = document.createElement('img')
    image.setAttribute('src', photoData.thumb)
    image.setAttribute('alt', photoData.title)

    link.appendChild(image)

    return link
  }

  searchForm.addEventListener('submit', function(e){
    e.preventDefault()
    const filter = searchTerm.value
    result.innerHTML = '<span style="color:#ffffff">Carregando...</span>'

    getPhotos(filter)
    .then(function(results){
      result.innerHTML = ''
      results.forEach(function(photo){
        console.log(photo)
        const url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`
        const thumbnail = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${sufixURL}.jpg`
        const item = createFlickerThumb({
          thumb: thumbnail,
          large: url,
          title: photo.title,
        })
        
        result.appendChild(item)
      })
    })
})

})();

