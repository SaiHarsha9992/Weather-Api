import express from "express";
import axios from "axios";
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use('/images', express.static('images'));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { weather: null, error: null });
});

app.get("/weather", async (req, res) => {
  const city = req.query.city;
  const apiKey = "4f5bd5b2cacff7a878053f17537e2bd9";

  // Add your logic here to fetch weather data from the API
  const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  let weather;
  let error = null;
  

  try {
    const response = await axios.get(APIUrl);
    weather = response.data;
  } catch (error) {
    weather = null;
    error = "Error, Please try again";
  }
    let imageUrl = ""; 
    const weatherMain = weather.weather[0].main;
    switch (weatherMain) {
      case "Clear":
        imageUrl = "http://localhost:3000/images/clear.png";
        break;
      case "Rain":
        imageUrl = "http://localhost:3000/images/rain.png";
        break;
      case "Snow":
        imageUrl = "http://localhost:3000/images/snow.png";
        break;
      case "Clouds":
        imageUrl = "http://localhost:3000/images/cloud.png";
        break;
      case "Mist":
        imageUrl = "http://localhost:3000/images/mist.png";
        break;
      case "Haze":
        imageUrl = "http://localhost:3000/images/mist.png";
        break;
      case "Haze":
        imageUrl = "http://localhost:3000/images/snow.png";
        break;
      default:
        imageUrl = "http://localhost:3000/images/snow.png";
        console.log(weatherMain);
        break;
    }

  
  res.render("index.ejs", { weather, error, imageUrl: imageUrl });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
