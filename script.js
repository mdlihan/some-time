let sing_in = document.querySelector("#sing-in");

let sing_up = document.querySelector("#sing-up");

let right = document.querySelector("#right");
let left = document.querySelector("#left");
let option_ul = document.querySelector(".option-ul");
let parent = document.querySelector("#parent");


let card_slider_left = document.querySelector('.card-slider-left');
let card_slider_right = document.querySelector('.card-slider-right');
let card_slider_left_top_rated = document.querySelector('.card-slider-left-top-rated ');
let card_slider_right_top_rated = document.querySelector('.card-slider-right-top-rated ');


let top_rated = document.querySelector('#top-parent'); 
let nav_search = document.querySelector("#nav-search");
var typingTimer;

nav_search.addEventListener("input", (e) => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(function () {
    console.log(e.target.value);
  }, 1000);
});

right.addEventListener("click", () => {
  option_ul.scrollLeft += 400;
});
left.addEventListener("click", () => {
  option_ul.scrollLeft -= 400;
});

// image slider start
let intervalId;

async function fetchMovies() {
  try {
    const response = await axios.get("https://api.themoviedb.org/3/discover/movie", {
      params: {
        api_key: "16577b7748de50b107a670fa1093a557",
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}

async function startSlider() {
  const movies = await fetchMovies();
  const slider = document.getElementById("slider");
  let currentIndex = 0;

  const createSlide = (movie) => {
    const img = document.createElement("img");
    img.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    img.alt = movie.title;
    img.classList.add("slide");
    return img;
  };

  const slides = movies.map((movie) => createSlide(movie));
  slides[0].classList.add("active");
  slides.forEach((slide) => slider.appendChild(slide));

  const handleButtonClick = (increment) => {
    clearInterval(intervalId);
    currentIndex = (currentIndex + increment + slides.length) % slides.length;
    slides.forEach((slide) => slide.classList.remove("active"));
    slides[currentIndex].classList.add("active");
    autoSlide();
  };

  const prevButton = document.createElement("button");
  prevButton.innerHTML = "&#10094;";
  prevButton.classList.add("prev");
  prevButton.addEventListener("click", () => handleButtonClick(-1));
  slider.appendChild(prevButton);

  const nextButton = document.createElement("button");
  nextButton.innerHTML = "&#10095;";
  nextButton.classList.add("next");
  nextButton.addEventListener("click", () => handleButtonClick(1));
  slider.appendChild(nextButton);

  const autoSlide = () => {
    intervalId = setInterval(() => handleButtonClick(1), 3000);
  };

  autoSlide();
}

startSlider();

// image slider end

// MOVIE LISTS start
function movieslist(apiKey, listType) {
  const apiUrl = `https://api.themoviedb.org/3/movie/${listType}?api_key=${apiKey}`;

  return axios
    .get(apiUrl)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
}

// Example usage:
const apiKey = "16577b7748de50b107a670fa1093a557";

// Fetch Now Playing movies

// now plying start

// Example usage:
movieslist(apiKey, "now_playing").then((data) => {
  const results = data.results;
  let html = "";
  results.forEach((e) => {
    const vote = Math.ceil(e.vote_average * 10); // Calculate vote percentage
    html += `<div> 
    <div class="card select-none flex justify-center items-center w-64 m-2 p-2 border-2 rounded-xl shadow-md">
      <div>
        <img id='${e.id}' height="100px" width="230px" src="https://image.tmdb.org/t/p/w500${e.poster_path}" alt="img">

            <div class="flex justify-center items-center">
              <div>
                <h1 class="text-1xl text-center text-centerfont-bold">${e.original_title}</h1>
                <h1 class="text-2xl text-center text-centerfont-bold">${e.release_date}</h1>
              </div>
            </div>
            
       </div>
      </div>
  </div>`;
  });
  parent.innerHTML = html;
});

card_slider_right.addEventListener('click',()=>{
  parent.scrollLeft += 400;
})
card_slider_left.addEventListener('click',()=>{
  parent.scrollLeft -= 400;
});

// now plying end

// popular start
movieslist(apiKey, "popular").then((data) => {
  console.log("popular Movies:", data.results);
});
// popular end

// top rated start
movieslist(apiKey, "top_rated").then((data) => {

  const results = data.results;

  let html = "";
  results.forEach((e) => {
    const vote = Math.ceil(e.vote_average * 10); // Calculate vote percentage
    html += `<div> 
    <div class="card select-none flex justify-center items-center w-64 m-2 p-2 border-2 rounded-xl shadow-md">
      <div>
        <img id='${e.id}' height="100px" width="230px" src="https://image.tmdb.org/t/p/w500${e.poster_path}" alt="img">

            <div class="flex justify-center items-center">
              <div>
                <h1 class="text-1xl text-center text-centerfont-bold">${e.original_title}</h1>
                <h1 class="text-2xl text-center text-centerfont-bold">${e.release_date}</h1>
              </div>
            </div>
            
       </div>
      </div>
  </div>`;
  });
  top_rated.innerHTML = html;
});
card_slider_right_top_rated.addEventListener('click',()=>{

  top_rated.scrollLeft += 500;

})
card_slider_left_top_rated.addEventListener('click',()=>{
  top_rated.scrollLeft -= 500;
});
// top rated end

// upcomeing start
movieslist(apiKey, "upcoming").then((data) => {
  console.log("upcoming Movies:", data.results);
});
// upcomeing end

// MOVIE LISTS end