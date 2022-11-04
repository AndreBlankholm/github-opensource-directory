var nameInputEl = document.querySelector("#username");
var userFormEl = document.querySelector("#user-form");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var getUserRepos = function (user) {
  var apiUrl = "https://api.github.com/users/" + user + "/repos";
  fetch(apiUrl).then(function (response) {
    response.json().then(function (data) {
      displayRepos(data, user);
    });
  });
};

//form on submit
var formSubmitHandeler = function (event) {
  event.preventDefault();

  var username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);
    nameInputEl.value = "";
  } else {
    alert("Please enter a GitHub username!");
  }
  console.log(event);
};

var displayRepos = function (repos, searchTerm) {
  // clears out old content (first thing)
  repoContainerEl.textContent = "";
  repoSearchTerm.textContent = searchTerm;

  console.log(repos);
  console.log(searchTerm);

  for (var i = 0; i < repos.length; i++) {
    //loop over the repos
    var repoName = repos[i].owner.login + "/" + repos[i].name;

    //create a container for each repos to be displayed
    var repoEl = document.createElement("div");
    repoEl.classList = "list-item flex-row justify-space-between align-center";

    //create a span to hold repository names
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    //append child to container
    repoEl.appendChild(titleEl);

    // append container to the dom
    repoContainerEl.appendChild(repoEl);
  }
};

userFormEl.addEventListener("submit", formSubmitHandeler);
