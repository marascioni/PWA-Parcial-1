

/**
 * Guarda los datos de la última ciudad en el localStorage
 */
window.addEventListener("beforeunload", () => {
  //guardo toda la información de la última ciudad y no solo el nombre
  window.localStorage.setItem('AWP', JSON.stringify(datos));  
}); 

/**
 * Levanto los datos de la última ciudad visitada
 */
window.addEventListener("load", cargarUltimoClima);
 

inputElement.addEventListener("click", (e) =>{
  inputElement.value='';
  resultElement.innerHTML='';
  videoPlayer.innerHTML='';
  mapa.innerHTML='';
  datos={};  
});

buttonSearch.addEventListener("click", (event) => {
  event.preventDefault();

  if (!isNaN(inputElement.value)) {
    resultElement.innerHTML = cardWarning(videoPlayer,mapa); ;
  } else {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputElement.value}&appid=${APIKEY}&units=metric&lang=sp`
    )
      .then((respuesta) => {
        if (respuesta.ok) {
          return respuesta.json(); // retorno al siguiente then el response como json
        } else {           
          resultElement.innerHTML = cardError(videoPlayer,mapa);          
        }
      })
      .then((json) => {
      datos = { 
                  'nombre':inputElement.value.toUpperCase(),
                  'clima':json.weather[0].main,
                  'temp':Math.floor(json.main.temp),
                  'img':json.weather[0].icon,
                  'desc':json.weather[0].description,
                  'tmin':Math.floor(json.main.temp_min),
                  'term':Math.floor(json.main.feels_like),
                  'tmax':Math.floor(json.main.temp_max),
                  'hum':Math.floor(json.main.humidity),
                  'presion':Math.floor(json.main.pressure),
                  'vel':Math.floor(json.wind.speed),
                  'dir':json.wind.deg,
                  'lat':json.coord.lat,
                  'lon':json.coord.lon
                }

        cargarTodaInfo(datos);        
      })
      
      .catch((err) => {
        console.log(`Hubo un error: ${err}`);
      })
      .finally((final) => {
        // borra el loading
        console.log("ejecuto el finally");
      });
  }
});
