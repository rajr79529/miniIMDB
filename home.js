var homeFu = (function () {
   let movies;
   let favList = JSON.parse(localStorage.getItem("favMovies")) || [];
   const searchBar = document.getElementById("searchBar");
   const mainContent = document.getElementById("mainContent");
   const favouritesNav = document.getElementById("Favourites");
   const home = document.getElementById("home");

   searchBar.addEventListener("input", handleSearchBar);
   favouritesNav.addEventListener("click", addFavToLocalStorage);
   home.addEventListener("click", renderAllMovies);

   function addFavToLocalStorage() {
      //JSON.stringfy will convet into json format as we cannot store array/object directly
      localStorage.setItem("favMovies", JSON.stringify(favList));
   }

   function renderAllMovies() {
      renderMovies(movies);
   }

   function handleSearchBar(event) {
      const filteredMovies = movies.filter((movie) => {
         if (
            movie.title
               .toLowerCase()
               .includes(event.target.value.toLowerCase())
         ) {
            return movie;
         }
      });
      renderMovies(filteredMovies);
   }

   function getMovies() {
      const options = {
         method: "GET",
         headers: {
            "X-RapidAPI-Key": "your_api_key",
            "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
         },
      };

      fetch("https://imdb-top-100-movies.p.rapidapi.com/", options)
         .then((response) => response.json())
         .then((response) => {
            movies = response;
            renderMovies(movies);
         })
         .catch((err) => console.error(err));
   }
   getMovies();

   function renderMovies(movies) {
      mainContent.innerHTML = "";
      movies.map((movie) => {
         let li = document.createElement("li");
         li.setAttribute("id", `${movie.imdbid}`);
         li.innerHTML = `<strong id=${movie.imdbid}>${movie.title}</strong> <br><img id=${movie.imdbid} src=${movie.image}/>
        <br><button id=${movie.imdbid}>Add to Fav</button>`;
         mainContent.append(li);
      });

      //it will add eventListner for each movie tile button
      addMovieTileClickedListner();
      //it will add eventListner for each fav button
      addFavButtonListner();
   }

   function addMovieTileClickedListner() {
      const movieTiles = document.querySelectorAll("#mainContent li");
      movieTiles.forEach((movieTile) => {
         movieTile.addEventListener("click", handleMovieTileClick);
      });
   }

   function handleMovieTileClick(event) {
      let id = event.target.getAttribute("id");
      const selectedMovie = getMovieWithByID(id);
      var params = new URLSearchParams();
      params.append("movie", JSON.stringify(selectedMovie));
      var url = "/movie.html?" + params.toString();
      location.href = url;
   }

   function addFavButtonListner() {
      const favButtons = document.querySelectorAll(
         "#mainContent li button"
      );
      favButtons.forEach((button) => {
         button.addEventListener("click", handleFavButtonClick);
      });
   }

   function getMovieWithByID(id) {
      const selectedMovie = movies.find((movie) => {
         if (movie.imdbid === id) {
            return movie;
         }
      });
      return selectedMovie;
   }
   function handleFavButtonClick(event) {
      event.stopPropagation();
      const buttonId = event.target.getAttribute("id");
      const selectedMovie = getMovieWithByID(buttonId);
      //   here filter will not work as it return array for single element
      //map and forEach will not work as it does not return.

      for (let i = 0; i < favList.length; i++) {
         if (favList[i]?.imdbid === selectedMovie.imdbid) {
            alert("Already in Favourite List");
            return;
         }
      }
      favList.push(selectedMovie);
   }
})();
