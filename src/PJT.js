// 영화 객체를 받아서 해당 영화의 카드 요소를 생성
function createMovieCard(movie) {
  // createElement를 통해 각 요소를 생성함
  const card = document.createElement('div');
  card.className = 'card';

  const img = document.createElement('img');
  img.src = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
  card.appendChild(img);

  const title = document.createElement('h2');
  title.textContent = movie.title;
  card.appendChild(title);

  const vote = document.createElement('p');
  vote.textContent = '평점 : ' + movie.vote_average;
  vote.className = 'vote';
  card.appendChild(vote);

  const overview = document.createElement('p');
  overview.textContent = movie.overview;
  card.appendChild(overview);

  // card 요소에 클릭 이벤트 리스너를 추가하고, 
  // 클릭이 발생하면 해당 card에 연결된 영화의 ID를 경고창으로 표시하는 기능
  card.addEventListener('click', () => {
    alert('Movie ID: ' + movie.id);
  });

  return card;
}

// 영화 데이터 배열을 받아서 각 영화별로 createMovieCard 함수를 호출하여 카드 요소를 생성하고 카드 요소들을 배열로 반환
// movies라는 매개변수를 받음 => 영화들의 배열
// map() 메서드로 각 요소에 대해 주어진 콜백 함수를 호출, 콜백 함수의 반환값들로 새로운 배열을 생성
// 반환된 카드들로 이루어진 배열은 "movieCards" 변수에 할당
function createMovieCards(movies) {
  const movieCards = movies.map((movie) => {
    return createMovieCard(movie);
  });

  return movieCards;
}

// 초기에 빈 배열로 선언 => 영화 데이터를 담을 공간을 미리 마련
const movies = [];

// movieCards를 추가할 컨테이너 요소를 getElementById를 사용하여 가져옴
// "getElementById" 함수는HTML 문서에서 특정 id 값을 가진 요소를 찾는 메서드
const container = document.getElementById('movie-container');

// "createMovieCards" 함수를 사용하여 movies 배열의 영화 데이터로부터 카드 요소들을 생성 
// forEach => movieCards 배열을 순회하면서 각각의 카드에 대해 주어진 콜백 함수를 실행, 각 카드는 card 매개변수로 전달
// 콜백함수 내부에서 appendChild를 사용하여 card를 container에 추가 => container 요소에 모든 영화 카드들이 추가됨
const movieCards = createMovieCards(movies);
movieCards.forEach((card) => {
  container.appendChild(card);
});

// "displayMovies" 함수는 영화 데이터 배열을 받아와서 각 영화별로 카드 요소를 생성하고 화면에 표시하는 역할
function displayMovies(movies) {
  const movieList = document.getElementById('movie-container');
  // 유효성 확인 => 'movie-container'의; id를 찾지 못하면 null을 반환
  // card 요소를 movieList 요소에 추가하므로 각 영화 카드가 movieList 요소에 순서대로 추가
  if (movieList) {
    movies.forEach((movie) => {
      const card = createMovieCard(movie);
      movieList.appendChild(card);
    });
  } else {
    console.log('Error: Cannot find movieList element');
  }
}


// fetch를 사용하여 API를 통해 영화 데이터를 가져와 영화 배열을 추출하고
// 추출된 영화 배열을 "displayMovies" 함수로 전달
const apiKey = 'd2cb7a26ef8dcb6fe631fff062f6d166';
const apiUrl = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&language=ko-Kr';

// fetch 함수를 호출할 때, 완전한 API 요청 URL을 생성
// then 메소드를 사용하여 응답을 json 형식으로
// then메소드에서 파싱된 데이터에서 results프로퍼티를 movies라는 변수에 할당
function fetchMovies() {
  fetch(apiUrl + '&api_key=' + apiKey)
    .then((response) => response.json())
    .then((data) => {
      const movies = data.results;
      displayMovies(movies);
    })
    .catch((error) => {
      console.log('Error:', error);
    });
}

fetchMovies();





// 'movie-container'라는 id를 가진 요소를 'movieList' 변수에 저장함.
function displayMovies(movies) {
  const movieList = document.getElementById('movie-container');

  // 기존에 표시된 영화 카드를 모두 제거
  while (movieList.firstChild) {
    movieList.removeChild(movieList.firstChild);
  }
  // 'createMovieCards' 함수를 사용하여 영화 카드를 생성하고 'movieList'에 추가
  if (movies.length > 0) {
    const movieCards = createMovieCards(movies);
    movieCards.forEach((card) => {
      movieList.appendChild(card); 
    });
  // 영화가 없는 경우 '검색 결과가 없습니다.'라는 메세지를 표시  
  } else {
    const message = document.createElement('p');
    message.textContent = '검색 결과가 없습니다.';
    movieList.appendChild(message);
  }
}

// 'searchMovies(searchKeyword)' 는 영화 검색 및 필터링을 수행
// 'searchKeyword' 매개변수로 전달된 검색어를 사용하여 'moviesData'배열을 검색하고,
// 제목에 검색어를 사용하여 'moviesData' 배열을 검색하고,
// 제목에 검색어가 포함된 영화들로 이루어진 'filteredMovies' 배열을 생성
function searchMovies(searchKeyword) {
  const filteredMovies = moviesData.filter((movie) => {
    return movie.title.toLowerCase().includes(searchKeyword.toLowerCase());
  });
// 'displayMovies' 함수를 호출하여 'filteredMovies' 배열을 표시
  displayMovies(filteredMovies);
}

// 'handleSearch(event)' 검색 버튼 클릭 또는 폼 제출 이벤트 처리 함수
function handleSearch(event) {
  event.preventDefault(); 
  const searchInput = document.getElementById('search_input');
  const searchKeyword = searchInput.value.trim();

  // search_input이라는 id를 가진 HTML 입력 요소에서 검색어를 가져옴
  // 검색어가 있는 경우 =>'searchMovies' 함수를 호출하여 검색어를 수행
  if (searchKeyword !== '') {
    searchMovies(searchKeyword);
  // 검색어가 없는 경우 =>'displayMovies' 함수를 호출하여 전체 영화 목록을 표시
  } else {
    displayMovies(moviesData);
  }

  // 검색 입력 필드를 비움
  searchInput.value = '';
}
// const searchForm = document.getElementById('search_form');
// searchForm.addEventListener('submit', handleSearch);
// 초기 영화 목록 로딩하는 역할
function fetchMovies() {
  // apiKey, apiUrl 변수를 사용하여 API 요청을 보냄
  const apiKey = 'd2cb7a26ef8dcb6fe631fff062f6d166';
  const apiUrl = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&language=ko-KR';

  // JSON 형식을 변환한 뒤, 'data.results'를 'moviesData' 배열에 저장
  fetch(apiUrl + '&api_key=' + apiKey)
    .then((response) => response.json())
    .then((data) => {
      moviesData = data.results;
      displayMovies(moviesData);
    })
    .catch((error) => {
      console.log('Error:', error);
    });
}

// 초기 영화 목록 로딩
fetchMovies();







