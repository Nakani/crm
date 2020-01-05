import axios from "axios";

const axiosConfig = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Authorization",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    "Content-Type": "application/json;charset=UTF-8"
    //     'Content-Type': 'application/json;charset=UTF-8',
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Request-Headers":"origin, x-requested-with",
    //     "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
    //    "Access-Control-Allow-Headers":" Origin, Content-Type, Accept, Authorization, X-Request-With"
  }
};

export const getName = upc => {
  axios
    .get("https://www.upcindex.com/" + upc, axiosConfig, { crossdomain: true })
    .then(response => {
      console.log("requisitions", response.data);
    })
    .catch(error => {
      console.log(error);
    });
  return "teste";
};
