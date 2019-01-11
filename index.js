const base = "https://api.github.com"

function displayError() {
  $("#errors").html("I'm sorry, there's been an error. Please try again.");
}

function searchRepositories() {
  const searchTerms = $("#searchTerms").val();
  const searchUrl = `${base}/search/repositories?q=${searchTerms}`;

  $.get(searchUrl, data => displaySearchResults(data)).fail(error => displayError());
}

function displaySearchResults(results) {
  const resultString = results.items.map(result => {
    return `
      <div>
        <h2><a href="${result.html_url}">${result.name}</a></h2>
        <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
        <p>${result.description}</p>
      </div>
      <hr>
      `
  });

  console.log(resultString);

  $("#results").html(resultString);
}

function showCommits(el) {
  const owner = el.dataset.owner;
  const repo = el.dataset.repository;
  const url = `${base}/repos/${owner}/${repo}/commits`;
  $.get(url, data => displayCommits(data)).fail(error => displayError());
}

function displayCommits(data) {
  const commits = data.map(commit => `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>`).join("");
  const commitsString = `<ul>${commits}</ul>`
  $("#details").html(commitsString);
}