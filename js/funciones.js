/**
 * Borra las card del video y el mapa
 */
const borrarCard = () => {
  if (videoPlayer.childElementCount) {
    videoPlayer.children[0].remove();
  }
  if (mapa.childElementCount) {
    mapa.children[0].remove();
  }
};

/**
 * Calcula la dirección de viento en base a los grados
 * @param {Number} grados Número que representa la dirección del viento en grados
 * @returns {String} Dirección del viento en puntos cardinales
 */
const calcDirViento = (grados) => {
  for (let i = 0; i < viento.length; i++) {
    if (grados >= Number(viento[i].ini) && grados < Number(viento[i].fin))
      return viento[i].dir;
  }
};

/**
 * Muestra la card de error
 * @param {HTMLObjectElement} videoPlayer Elemento HTML que representa el video
 * @param {HTMLObjectElement} mapa Elemento HTML que representa el mapa
 * @returns {String} Código HTML para poner en la card
 */
const cardError = (videoPlayer, mapa) => {
  let HTML = `
              <div class="bg-white container-error rounded">
              <h3 class="text-center">Lo siento no pudimos encontrar la ciudad ingresada</h3>
              <img class="img-fluid mx-auto d-block" src="./img/cruz.png" alt="Icono de error" />
              </div>
              `;
  borrarCard();
  return HTML;
};

/**
 * Muestra la card de warning por ingreso incorrecto de errores
 * @param {HTMLObjectElement} videoPlayer Elemento HTML que representa el video
 * @param {HTMLObjectElement} mapa Elemento HTML que representa el mapa
 * @returns {String} Código HTML para poner en la card
 */
const cardWarning = (videoPlayer, mapa) => {
  let HTML = `
    <div class="bg-white container-error rounded">
    <h3 class="text-center">Se debe ingresar el nombre de una ciudad</h3>
    <img class="img-fluid mx-auto d-block" src="./img/advertencia.png" alt="Icono de advertencia" />
    </div>
    `;
  borrarCard();
  return HTML;
};

/**
 * Muestra la card de error
 * @param {Object} datos Contiene los datos a mostrar en la card
 * @returns {String} Código HTML para poner en la card
 */
const cardInfoClima = (datos) => {
  let HTML;
  let dirViento = calcDirViento(datos.dir);

  HTML = `      
      <div class="card" >              
        <div class="card-body">
          <div class="d-flex flex-row flex-wrap justify-content-between">
              <div class="p-2">
                  <p class="card-title city">Ciudad: <span>${datos.nombre}</span></p>
              </div>
              <div class="p-2">
                  <p class="card-text temp"> ${datos.temp}°C</p>
              </div>
          </div>
          <div class="d-flex flex-row justify-content-around align-items-center">
            <div class="p-2">    
              <img class="img-fluid bg-img" src="https://openweathermap.org/img/wn/${datos.img}.png" alt="Card image cap" />
            </div>
            <div class="p-2">
                  <p class="card-text desc"> Estado: ${datos.desc}</p>
              </div>
          </div>

          <div class="d-flex flex-row flex-wrap justify-content-between">
              <div class="p-2">
                  <p class="card-text tmin"> MIN: <span>${datos.tmin}°C</span></p>
              </div>
              <div class="p-2">
                  <p class="card-text term"> Térmica: ${datos.term}°C</p>
              </div>
              <div class="p-2">
                  <p class="card-text tmax"> MAX: <span>${datos.tmax}°C</span></p>
              </div>
          </div>
          <div class="d-flex flex-row flex-wrap justify-content-between">
              <div class="p-2">
                  <p class="card-text complemento"> Humedad: <span class="bold">${datos.hum}%</span></p>
              </div>
              <div class="p-2">
                  <p class="card-text complemento"> Presión: <span class="bold">${datos.presion}hPa</span></p>
              </div>
              </div>
          <div class="d-flex flex-row flex-wrap justify-content-center">
              <div class="p-2">
                  <p class="card-text complemento "> Viento: <span class="bold">${dirViento} a ${datos.vel}m/s</span></p>
              </div>
          </div>
        </div>      
      </div>      
      `;
  return HTML;
};

/**
 * Calcula la dirección de viento en base a los grados
 * @param {Object} datos Contiene los datos a mostrar en la card
 * @returns {String} Dirección del viento en puntos cardinales
 */
const cargarTodaInfo = (datos) => {
  // Carga información del clima
  resultElement.innerHTML = cardInfoClima(datos);

  //Para mostrar el video
  var div = document.createElement("div");
  div.id = "player";
  div.class = "card bg-dark";
  if (videoPlayer.childElementCount) {
    videoPlayer.children[0].remove();
  }
  videoPlayer.append(div);
  videoPlay = videos[datos.clima];
  onYouTubeIframeAPIReady();
  
  document.getElementById("player").style.display = "block";

  //Para mostrar el mapa
  let respuesta = `https://api.tomtom.com/map/1/staticimage?key=${API_TT}&zoom=9&center=${datos["lon"]},${datos["lat"]}&format=jpg&layer=basic&style=main&width=1305&height=748&view=Unified&language=es-ES`;
  HTML = `
    <div class="card card-body ">             
       <img src="${respuesta}" alt="" />      
    </div>
`;
  mapa.innerHTML = HTML;
};

/**
 * Carga los productos al carrito desde el localStorage
 */
const cargarUltimoClima = () => {
  var lsdata = window.localStorage.getItem('AWP');
  if (lsdata!="{}"){
      console.log('cargue el elemento de localStorage');      
      datos=JSON.parse(lsdata);
      inputElement.value=datos.nombre;
      buttonSearch.click();      
    }
 }