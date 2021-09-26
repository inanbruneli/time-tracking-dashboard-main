const $btn = document.querySelectorAll('.btn-change');
const timeframe = ['daily', 'weekly', 'monthly']
const $previous = document.querySelectorAll('.previous');
const $current = document.querySelectorAll('.current');

for (let z = 0; z < $btn.length; z++) {
  $btn[z].addEventListener('click', () => {
    axios('./assets/data.json')
      .then(resposta => changeText(z, resposta.data))
  })
}

axios('./assets/data.json')
  .then(resposta => changeText(0, resposta.data))

function changeText(cod, json) {
  btnColor(cod);
  opacityContent(0);
  setTimeout(() => {
    for (let x = 0; x < json.length; x++) {
      $current[x].innerHTML = json[x]['timeframes'][timeframe[cod]]['current'].
        toString().padStart(2, '0') + 'hrs';

      $previous[x].innerHTML = 'Previous - ' +
        json[x]['timeframes'][timeframe[cod]]['previous'].
          toString().padStart(2, '0') + 'hrs';
    }
    opacityContent(1);
  }, 500);
}

function btnColor(cod) {
  for (let x = 0; x <= 2; x++) {
    $btn[x].style.color = cod == x ? 'white' : 'rgba(189, 193, 255, .5)';
  }
}

function opacityContent(cod) {
  for (let x = 0; x < $previous.length; x++) {
    $previous[x].style.opacity = cod;
    $current[x].style.opacity = cod;
  }
}