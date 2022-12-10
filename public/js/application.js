const countDiv = document.querySelector('[data-count]')
const map = document.querySelectorAll('.map')
const inputCode = document.querySelector('.inputCode')
const {
  body
} = document
const partyCode = document.querySelector('.partyCode')

document.addEventListener('click', (event) => {
  if (event.target.className === 'map1') {
    event.target.nextSibling.style.display = 'block'
    if (event.target.nextSibling.style.display === 'block') {
      const newDiv = document.createElement('div');
      newDiv.className = 'timeDiv';
      const temp = event.target.closest('.cart');
      temp.insertAdjacentElement('afterbegin', newDiv);
      event.target.nextSibling.style.zIndex = 100;
      body.style.overflow = 'hidden';
      body.style.height = '100%';
      let coord = event.target.innerText.split(', ').map((el) => +el)
      console.log('coord', coord)
      let myMap;
      ymaps.ready(init);

      function init() {
        myMap = new ymaps.Map(`${event.target.dataset.map}`, {
            center: coord,
            zoom: 19
          }),
          myGeoObject = new ymaps.GeoObject({
            // Описание геометрии.
            geometry: {
                type: "Point",
                coordinates: coord
            },
            // Свойства.
            properties: {
                // Контент метки.
                iconContent: 'Ваша туса будет тут',
                hintContent: coord
            }
        }, {
            // Опции.
            // Иконка метки будет растягиваться под размер ее содержимого.
            preset: 'islands#blackStretchyIcon',
        }),
        myMap.geoObjects
        .add(myGeoObject)
      }
    }
  } else if (event.target.className === 'timeDiv') {
    event.target.closest('.cart').lastElementChild.style.display = 'none'
    event.target.closest('.cart').lastElementChild.firstChild.remove()
    event.target.remove()
    body.style.overflow = 'visible';
    body.style.height = '0%';
  }
})

document.addEventListener('click', (event) => {
  if (event.target.dataset.generatecode === 'generateCode') {
    event.preventDefault()
    let st = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < 20; i++) {
      let n = Math.floor(Math.random() * 62)
      result += st[n]
    }
    inputCode.value = result
  }
})

document.addEventListener('click', async (event) => {
  if (event.target.dataset.delete) {
    const partyId = event.target.dataset.delete;
    try {
      const response = await fetch(`/profile/delete/${partyId}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          partyId,
        }),
      });
      if (response.ok) {
        event.target.closest('.box').remove()
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (event.target.dataset.exit) {
    const partyId = event.target.dataset.exit;
    try {
      const response = await fetch(`/profile/exit/${partyId}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          partyId,
        }),
      });
      if (response.ok) {
        event.target.closest('.box').remove()
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  if (event.target.dataset.del) {
    const userId = event.target.dataset.del;
    const partyId = event.target.dataset.dele
    try {
      const response = await fetch(`/party/del/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          partyId,
        }),
      });
      if (response.ok) {
        event.target.closest('.box').remove()
      }
    } catch (error) {
      console.log(error);
    }
  }
})

document.addEventListener('click', async (event) => {
  if (event.target.className === 'mapForCreate') {
    event.preventDefault()
    event.target.nextSibling.style.display = 'block'
    if (event.target.nextSibling.style.display === 'block') {
      const newDiv = document.createElement('div');
      newDiv.className = 'timeDiv';
      const temp = event.target.closest('.ryad');
      temp.insertAdjacentElement('afterbegin', newDiv);
      event.target.nextSibling.style.zIndex = 100;
      body.style.overflow = 'hidden';
      body.style.height = '100%';
      let myMap;
      const coord = [54.755786, 56.004981]
      ymaps.ready(init);
      function init() {
        let myPlacemark
        myMap = new ymaps.Map('map', {
            center: coord,
            zoom: 19
          }),
          myMap.events.add('click', function (e) {
            var coords = e.get('coords');
    
            // Если метка уже создана – просто передвигаем ее.
            if (myPlacemark) {
                myPlacemark.geometry.setCoordinates(coords);
            }
            // Если нет – создаем.
            else {
                myPlacemark = createPlacemark(coords);
                myMap.geoObjects.add(myPlacemark);
                // Слушаем событие окончания перетаскивания на метке.
                myPlacemark.events.add('dragend', function () {
                    getAddress(myPlacemark.geometry.getCoordinates());
                });
            }
            getAddress(coords);
        });
    
        // Создание метки.
        function createPlacemark(coords) {
            return new ymaps.Placemark(coords, {
                iconCaption: 'поиск...'
            }, {
                preset: 'islands#violetDotIconWithCaption',
                draggable: true
            });
        }
    
        // Определяем адрес по координатам (обратное геокодирование).
        function getAddress(coords) {
            myPlacemark.properties.set('iconCaption', 'поиск...');
            ymaps.geocode(coords).then(function (res) {
                var firstGeoObject = res.geoObjects.get(0);
    
                myPlacemark.properties
                    .set({
                        // Формируем строку с данными об объекте.
                        iconCaption: [
                            coord
                        ].filter(Boolean).join(', '),
                        // В качестве контента балуна задаем строку с адресом объекта.
                        balloonContent: coord
                    });
            });
        }
    }
  }
  } else if (event.target.className === 'timeDiv') {
    event.target.closest('.ryad').lastElementChild.style.display = 'none'
    event.target.closest('.ryad').lastElementChild.firstChild.remove()
    event.target.remove()
    body.style.overflow = 'visible';
    body.style.height = '0%';
}})
