var nameInputEl = document.querySelector("#username");
var userFormEl = document.querySelector("#user-form");

var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var getUserRepos = function (user) {

  var apiUrl = "https://api.github.com/users/" + user + "/repos";

  fetch(apiUrl).then(function(response) {
    // request was successful
    if (response.ok) {
      response.json().then(function(data) {
        displayRepos(data, user);
      });
    } else {
      alert('Error: GitHub User Not Found');
    }
  })
  .catch(function(error) {  //catch for network errors
    // Notice this `.catch()` getting chained onto the end of the `.then()` method
    alert("Unable to connect to GitHub");
  });
};

//form on submit 
var formSubmitHandeler = function (event) {
  event.preventDefault();

  var username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);   //passe scurrent username to the getUserRepose function call
    nameInputEl.value = "";
  } else {
    alert("Please enter a GitHub username!");
  }
  console.log(event);
};

var displayRepos = function (repos, searchTerm) {

  //error handling
  // check if api returned any repos
  if (repos.length === 0) {
    repoContainerEl.textContent = "No repositories found.";
    return;
  }

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

    //create a stutus element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row alighn-center";

    //check to see if there is any issues still open
    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    //append to the container
    repoEl.appendChild(statusEl);

    // append container and every thing in it to the dom
    repoContainerEl.appendChild(repoEl);
  }
};

userFormEl.addEventListener("submit", formSubmitHandeler);
