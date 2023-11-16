const portfolioFavicon = document.querySelector(".portfolio-favicon");
const portfolioTitle = document.querySelector(".portfolio-title");
const portfolioTags = document.querySelectorAll(".portfolio-tag");

const projectClient = document.querySelector(".project-client");
const projectTime = document.querySelector(".project-time");
const projectTask = document.querySelector(".project-task");
const projectScreenshot = document.querySelector(".project-screenshot");

let portfolioDatas = [];
let urlSearch = null;
let portfolioID = 0;

function home(){
    location.href="/";
}

window.addEventListener("load", function () {
    portfolioDatas = [];
    portfolioDatas = JSON.parse(JSON.stringify(portfolioList));

    urlSearch = new URLSearchParams(location.search);

    portfolioID = parseInt(urlSearch.get("id"));

    if(portfolioID >= 0 && portfolioID <= portfolioDatas.length){
    }else{
        portfolioID = 0;
    }

    generateProject(portfolioDatas[portfolioID]);
});

function generateProject(_obj){
    portfolioFavicon.src = "img/" + _obj.favicon;
    portfolioFavicon.alt =  _obj.title;

    portfolioTitle.innerHTML = _obj.title + "<br class='pc-hidden'><span class='mo-hidden'> | </span><span>" + _obj.desc + "</span>";

    if(_obj.web == "true" && _obj.nft == "false"){
        portfolioTags[0].innerHTML = "#Website";
        portfolioTags[1].innerHTML = "";
    }else if(_obj.web == "false" && _obj.nft == "true"){
        portfolioTags[0].innerHTML = "#NFT/Blockchain";
        portfolioTags[1].innerHTML = "";
    }else if(_obj.web == "true" && _obj.nft == "true"){
        portfolioTags[0].innerHTML = "#Website";
        portfolioTags[1].innerHTML = "#NFT/Blockchain";
    }

    projectClient.innerHTML = _obj.client;
    projectTime.innerHTML = _obj.time;
    projectTask.innerHTML = _obj.task;

    projectScreenshot.src = "img/" + _obj.screenshot;
    projectScreenshot.alt = _obj.title;
}

AOS.init({
    offset: 250,
    duration: 1000,
    once: true,
    anchorPlacement: "top-bottom",
});