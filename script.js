let sing_in = document.querySelector("#sing-in");
let sing_up = document.querySelector("#sing-up");
let right = document.querySelector("#right");
let left = document.querySelector("#left");
let option_ul = document.querySelector(".option-ul");
let parent = document.querySelector("#parent");

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
async function fetchMovies() {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/discover/movie",
      {
        params: {
          api_key: "16577b7748de50b107a670fa1093a557",
        },
      }
    );
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
  movies.forEach((movie, index) => {
    const img = document.createElement("img");
    img.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    img.alt = movie.title;
    img.classList.add("slide");

    if (index === 0) {
      img.classList.add("active"); // Show the first image
    }
    slider.appendChild(img);
  });

  const slides = document.querySelectorAll(".slider .slide");
  const prevButton = document.createElement("button");
  prevButton.classList.add("prev");
  prevButton.innerHTML = "&#10094;";
  prevButton.addEventListener("click", () => {
    slides[currentIndex].classList.remove("active");
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    slides[currentIndex].classList.add("active");
  });
  slider.appendChild(prevButton);

  const nextButton = document.createElement("button");
  nextButton.classList.add("next");
  nextButton.innerHTML = "&#10095;";
  nextButton.addEventListener("click", () => {
    slides[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add("active");
  });
  slider.appendChild(nextButton);

  // Automatically slide every 3 seconds
  setInterval(() => {
    slides[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add("active");
  }, 3000);
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
    let vote = Math.ceil(e.vote_average) * 10;
    html += `<div> 
    <div class="card select-none flex justify-center items-center w-64 m-2 p-2 border-2 rounded-xl">
      <div>
        <img src="https://image.tmdb.org/t/p/w500${e.poster_path}" height="auto" width="230px" alt="img">
       <div class="flex justify-left items-center mt-4">
         <svg class="progress-circle" width="80" height="80">
          <circle class="progress-background shadow-lg" cx="40" cy="40" r="35" />
          <circle id="${e.id}" class="progress-bar" shadow-lg" cx="40" cy="40" r="35" />
            <text  class="progress-text" x="50%" y="50%" text-anchor="middle" alignment-baseline="middle">${vote}%</text>
        </svg>
       </div> 
            <h2 class="">User Score</h2>
            <div class="flex justify-center items-center">
              <div>
                <h1 class="text-1xl text-center text-centerfont-bold">${e.original_title}</h1>
                <h1 class="text-2xl text-center text-centerfont-bold">${e.release_date}</h1>
              </div>
            </div>
       </div>

      </div>
  </div>`;
  setProgress(vote);
  });
  parent.innerHTML = html;
  function setProgress(percent) {

    console.log(percent);
    let progress = document.querySelectorAll(".progress-bar");
    progress.forEach((e) => {
      const just_element = e;
      const circumference = 280; // Circumference of the circle (2 * π * radius)
      const offset = circumference - (percent / 100) * circumference;
      just_element.style.strokeDashoffset = offset;
    });
    
  }
  setProgress(80);
});
// now plying end

// popular start
movieslist(apiKey, "popular").then((data) => {
  console.log("popular Movies:", data.results);
});
// popular end

// top rated start
movieslist(apiKey, "top_rated").then((data) => {
  console.log("top rated Movies:", data.results);
});
// top rated end

// upcomeing start
movieslist(apiKey, "upcoming").then((data) => {
  console.log("upcoming Movies:", data.results);
});
// upcomeing end

// MOVIE LISTS end
