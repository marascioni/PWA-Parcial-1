const APIKEY = "ec5e1c1617fbdd808f5921a5c078f500";
const API_TT='v4t3veacWvzPAtZiplyRopQ2nTPzHK0h';
const buttonSearch = document.getElementById("buscar");
const inputElement = document.getElementById("inputCiudad");
const resultElement = document.getElementById("resultado1");
const videoPlayer = document.getElementById("contVideo");
const mapa = document.getElementById("contMapa");  



/**
 * Array con los puntos cardinales por grados
 */
const viento = [
    { dir: "N", ini: "348.75", fin: "360" },
    { dir: "N", ini: "0", fin: "11.24" },
    { dir: "N/NE", ini: "11.25", fin: "33.75" },
    { dir: "NE", ini: "33.75", fin: "56.25" },
    { dir: "E/NE", ini: "56.25", fin: "78.75" },
    { dir: "E", ini: "78.75", fin: "101.25" },
    { dir: "E/SE", ini: "101.25", fin: "123.75" },
    { dir: "SE", ini: "123.75", fin: "146.25" },
    { dir: "S/SE", ini: "146.25", fin: "168.75" },
    { dir: "S", ini: "168.75", fin: "191.25" },
    { dir: "S/SO", ini: "191.25", fin: "213.75" },
    { dir: "SO", ini: "213.75", fin: "236.25" },
    { dir: "O/SO", ini: "236.25", fin: "258.75" },
    { dir: "O", ini: "258.75", fin: "281.25" },
    { dir: "O/NO", ini: "281.25", fin: "303.75" },
    { dir: "NO", ini: "303.75", fin: "326.25" },
    { dir: "N/NO", ini: "326.25", fin: "348.75" },
  ];
  
  /**
   * Array con los videos relacionados con el clima
   */
  const videos = [];
  videos["Thunderstorm"] = "gVKEM4K8J8A";
  videos["Drizzle"] = "bRkoHdLxLVQ";
  videos["Rain"] = "ynLpZGegiJE";
  videos["Snow"] = "ADDFmfOeihU";
  videos["Mist"] = "ZMTeCjNCOJY";
  videos["Smoke"] = "YB-Q2loyYAk";
  videos["Haze"] = "hVFyBLaEcWM";
  videos["Dust"] = "THSm-I790H0";
  videos["Fog"] = "vOTTTX-tHKQ";
  videos["Sand"] = "w9UaCi0CQyU";
  videos["Ash"] = "aQtkoLxqUNQ";
  videos["Squall"] = "WnsxAXowu3g";
  videos["Tornado"] = "aacHWoB7cmY";
  videos["Clear"] = "6roOcbgt-yI";
  videos["Clouds"] = "TQxweJj33Hk";
  
  var videoPlay;
  var HTML = "";
  var datos;
