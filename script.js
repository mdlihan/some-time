let first_data = document.querySelector('#first-data');

let sing_in = document.querySelector("#sing-in");

let sing_up = document.querySelector("#sing-up");

let right = document.querySelector("#right");
let left = document.querySelector("#left");
let option_ul = document.querySelector(".option-ul");
let parent = document.querySelector("#parent");
let center_card = document.querySelector('#center-card');
let search_data = document.querySelector('#search-data');

let card_slider_left = document.querySelector('.card-slider-left');
let card_slider_right = document.querySelector('.card-slider-right');
let card_slider_left_top_rated = document.querySelector('.card-slider-left-top-rated ');
let card_slider_right_top_rated = document.querySelector('.card-slider-right-top-rated ');
let card_slider_left_upcoming = document.querySelector('.card-slider-left-upcoming');
let card_slider_right_upcoming = document.querySelector('.card-slider-right-upcoming');

let card_slider_right_popular = document.querySelector('.card-slider-right-popular');
let card_slider_left_popular = document.querySelector('.card-slider-left-popular');  


let top_rated = document.querySelector('#top-parent'); 
let popular = document.querySelector('#popular');
let upcoming = document.querySelector('#upcoming');

let nav_search = document.querySelector("#nav-searc");
let search = document.querySelector('#search'); 

function realtimedata(search_value) {
  if (!search_value==''||!search_value=='null')

    {

      first_data.style.display='none';
      axios(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&&query=${search_value}`)
      .then((res)=>{
        let html = ''
        let results = res.data.results
        if (results=='') {
          html=`<h1 class='text-2xl text-center text-white mb-2'>No Movie Found please current move name</h1>`
          search_data.innerHTML=html;
        } else {
        results.forEach((e)=>{
          html +=`<div> 
    <div class="card select-none flex justify-center items-center max-sm:w-full sm:w-64 m-2 p-2 border-2 rounded-xl shadow-md">
      <div>
        <img id='${e.id}' height="100px" max-sm:w-full sm:w-60 src="https://image.tmdb.org/t/p/w500${e.poster_path}" alt="img">

            <div class="flex justify-center items-center">
              <div>
                <h1 class="text-1xl text-center text-centerfont-bold">${e.original_title}</h1>
                <h1 class="text-2xl text-center text-centerfont-bold">${e.release_date}</h1>
              </div>
            </div>
            
       </div>
      </div>
  </div>`
        })
   }
 search_data.innerHTML=html;
      })
      .catch((err)=>{
        console.log(`erros was${err}`)
      })
    } else {
      first_data.style.display='block'
    }
}
function center_cards(movieId) {
 const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
axios.get(url)

  .then(response => {
    // Handle successful response
    const data = response.data;
   center_card.style.display='block';
   center_card.innerHTML=`<div class="flex max-sm:hidden justify-end top-0 mb-96">
            <i class="fa-solid fa-xmark fa-2x x-icon1  m-4 py-2 px-3 bg-gray-500 focus:bg-gray-400 text-white rounded-full z-50"></i>

            </div>
   
   <div class="h-screen overflow-auto  w-full fixed top-0 left-0 z-50 sm:flex sm:mt-16 p-2 mb-20  bg-black">
            
            <div class="flex sm:hidden justify-end top-0">
            <i class="fa-solid fa-xmark fa-2x x-icon2 m-4 py-2 px-3 bg-gray-500 focus:bg-gray-400 text-white rounded-full z-50"></i>
            </div>
              
              
              
                 <div class="sm:w-2/5">

                 <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="/IMG20240322175607_01.jpg">

              </div>
              
              <div class="sm:w-3/5 sm:mt-4 p-2">
             <div class="w-full ml-2">
               <h2 class="py-2 text-5xl">${data.original_title}</h2>
               <h3 class='text-3xl my-4'>${data.release_date}</h3>
               <h3 class='my-2 text-2xl'>tagline</h3>
               <p class='text-xl'>${data.tagline}</p>
               <h4 class="py-2 text-4xl">overview</h4>
               <p class='text-2xl'>${data.overview}</p>
             </div>
   
             </div>
             
          </div>`
    let x_icon1 = document.querySelector('.x-icon1');
    let x_icon2 = document.querySelector('.x-icon2')
x_icon1.addEventListener('click',(e)=>{
  if (true) {
    center_card.style.display='none'
  }
})

x_icon2.addEventListener('click',(e)=>{
  if (true) {
    center_card.style.display='none'
  }
}
)

  })
  .catch(error => {
    // Handle error
    alert('please click picture')
  });
}

var typingTimer;
nav_search.addEventListener("input", (e) => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(function () {
    let search_value = e.target.value
    //search data start
    realtimedata(search_value)
 search_data.addEventListener('click',(e)=>{
  e.preventDefault();
let movieId = e.target.id;
center_cards(movieId)
})
//center card end
    //search data end
  }, 1000);
});
search.addEventListener("input", (e) => {

  clearTimeout(typingTimer);

  typingTimer = setTimeout(function () {
    let search_value = e.target.value
    //search data start
    realtimedata(search_value)
search_data.addEventListener('click',(e)=>{
  e.preventDefault();
let movieId = e.target.id;
center_cards(movieId)
})
    //search data end
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
//center card start
parent.addEventListener('click',(e)=>{
  e.preventDefault();
let movieId = e.target.id;
center_cards(movieId)
})
//center card end
card_slider_right.addEventListener('click',()=>{
  parent.scrollLeft += 400;
})
card_slider_left.addEventListener('click',()=>{
  parent.scrollLeft -= 400;
});

// now plying end

// popular start
movieslist(apiKey,"popular").then((data) => {

  const results = data.results;

  let html = "";
  results.forEach((e) => {
  
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
  popular.innerHTML = html;
});
//center card start
popular.addEventListener('click',(e)=>{

  e.preventDefault();
let movieId = e.target.id;
center_cards(movieId)
})
//center card end
card_slider_right_popular.addEventListener('click',()=>{
  popular.scrollLeft += 500;
})
card_slider_left_popular.addEventListener('click',()=>{
  popular.scrollLeft -= 500;
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
//center card start
top_rated.addEventListener('click',(e)=>{

  e.preventDefault();
let movieId = e.target.id;
center_cards(movieId)
})
//center card end
card_slider_right_top_rated.addEventListener('click',()=>{
  top_rated.scrollLeft += 500;
})
card_slider_left_top_rated.addEventListener('click',()=>{
  top_rated.scrollLeft -= 500;
});
// top rated end

// upcomeing start
movieslist(apiKey, "upcoming").then((data) => {
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
  upcoming.innerHTML = html;
});
//center card start
upcoming.addEventListener('click',(e)=>{
  e.preventDefault();
let movieId = e.target.id;
center_cards(movieId)
})
//center card end
card_slider_right_upcoming.addEventListener('click',()=>{
  upcoming.scrollLeft += 500;

})
card_slider_left_upcoming.addEventListener('click',()=>{
  upcoming.scrollLeft -= 500;
});
// upcomeing end

// MOVIE LISTS end