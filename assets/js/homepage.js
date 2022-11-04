var nameInputEl = document.querySelector("#username");
var userFormEl = document.querySelector("#user-form");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");


var getUserRepos = function (user) {
  var apiUrl = "https://api.github.com/users/" + user + "/repos";
  fetch(apiUrl).then(function (response) {
    response.json().then(function(data) {
        displayRepos(data, user);
      });
  });
};






//form on submit
var formSubmitHandeler = function(event) {
  event.preventDefault();

  var username = nameInputEl.value.trim();

  if(username){
    getUserRepos(username);
    nameInputEl.value = "";
  } else {
    alert("Please enter a GitHub username!");
  }
  console.log(event);
};

var displayRepos = function(repos, searchTerm) {
    console.log(repos);
    console.log(searchTerm);
  };


userFormEl.addEventListener("submit", formSubmitHandeler);