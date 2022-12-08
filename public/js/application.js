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
      let myMap;
      ymaps.ready(init);

      function init() {
        myMap = new ymaps.Map(`${event.target.dataset.map}`, {
            center: coord,
            zoom: 19
          }),
          myMap.controls.remove('geolocationControl'); // удаляем геолокацию
        myMap.controls.remove('searchControl'); // удаляем поиск
        myMap.controls.remove('rulerControl'); // удаляем контрол правил 
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

// document.addEventListener('click', async (event) => {
//   if (event.target.dataset.count) {
//     const id = event.target.dataset.count
//     console.log(id)
//     try {
//       const response = await fetch(`/party/spisok/${id}`)
//       const {
//         users
//       } = await response.json()
//       const array = []
//       users
//       const template = `
//       <div class='listDiv'>
//       <div class='listOfUchastnikov'>
//               <h2>Список участников</h2>
//               <ol>${users.map((el)=>(
//                 <li>
//                   <div class='cart' id='qwer'>
//                     <p style={{color: 'black'}}>{el.name}</p>
//                     <button class='btn btn-outline'>удалить</button>
//                   </div>
//                 </li>))}
//               </ol>
//             </div>
//           </div> 
//       `;
//       countDiv.insertAdjacentHTML('beforeend', template)

//     } catch (error) {
//       console.log(error)
//     }
//   }
// })