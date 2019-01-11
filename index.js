$(document).ready(function (){
});
function searchRepositories() {
    const searchTerms = $('#searchTerms').val();
    const uri = 'https://api.github.com/search/repositories?q=' + searchTerms
    $.get(uri, function(data) {
        console.log(data.items)
        $('#results').html(renderSearchResults(data.items))
    }).fail(function(error) {displayError(error)})
};

function displayError(error) {
    $('#errors').html("There is an error." + error);
}

function renderSearchResults(result) {
    const src = $('#repository-template').html();
    const template = Handlebars.compile(src);
    return template(result);
}

function showCommits(el) {
    const repo = el.dataset.repo;
    const uri = 'https://api.github.com/repos/' + repo +'/commits';
    $.get(uri, function(data) {
        console.log(data)
        $('#details').html(renderCommits(data))
    })
}

function renderCommits(commits) {
    const src = $('#commits-template').html();
    const template = Handlebars.compile(src);
    return template(commits);
}