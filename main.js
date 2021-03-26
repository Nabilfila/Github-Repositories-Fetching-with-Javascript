let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");

getButton.onclick = function(){
    getRepos();
}

//Get Repos Function
function getRepos()
{
if (theInput.value == "") {
    reposData.innerHTML = "<span>Please Write Github Username . </<span>";
}
else{
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
    .then((response)=>response.json())
    .then((repositeries)=>{
        //Empty The container 
        reposData.innerHTML = '';
        //Loop on Repositories
        repositeries.forEach(repo => {
            //Create the Main Div Element
            let mainDiv = document.createElement("Div");
            //Create Repo Name Text 
            let repoName = document.createTextNode(repo.name);
            //Append the Text to Main Div
            mainDiv.appendChild(repoName);
            //Create repos URL
            let theUrl = document.createElement('a');
            //create repo url text
            let theUrlText = document.createTextNode("Visit");
            //Append the repo url Text to Url tag 
            theUrl.appendChild(theUrlText);
            //Add the hypertext references "href"
            theUrl.href = `https://github.com/${theInput.value}/${repo.name}`
            //Set Attribute Blank
            theUrl.setAttribute('target','_blank');
            //Append URL To Main Div
            mainDiv.appendChild(theUrl)
            //create Starts count Span
            let startsSpan = document.createElement("span");
            //create the Starts Count Text
            let startsText = document.createTextNode(`Starts ${repo.stargazers_count}`);
            //Add Starts Count text to starts Span
            startsSpan.appendChild(startsText);

            //Append Starts count span to Main Div
            mainDiv.appendChild(startsSpan);
            //add class on Main Div
            mainDiv.className='repo-box';

            //Append the Main Div to Container
            reposData.appendChild(mainDiv);

        });
    });
}
}