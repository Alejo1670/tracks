import axios from "axios";

export default axios.create({
  baseURL: "http://9b43f879.ngrok.io"
});

//Use Ngrok, to create a connection between the API & our App

//REMINDER: IF YOU CONTINUE BUILDING THE APP WITH PAUSES OF 8 HOURS,
//YO WILL NEED TO START NGROK AND PUT THE NEW URL INTO THE AXIOS baseURL
