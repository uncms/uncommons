function home(){
    window.scrollTo(0,0);
}

const portfolioFilterItems = document.querySelectorAll(".portfolio-filter-item");
const portfolioWrapper = document.querySelector(".portfolio-wrapper");

function filterPortfolio(_num){
    portfolioFilterItems.forEach(el => el.classList.remove("active-filter"));

    while(portfolioWrapper.firstChild) {
        portfolioWrapper.removeChild(portfolioWrapper.firstChild);
    }

    switch(_num){
        case 0:
            portfolioFilterItems[0].classList.add("active-filter");
            
            for(let i = 0; i < 8; i++){
                generatePortfolio(portfolioDatas[i]);
            }
            break;
        case 1:
            portfolioFilterItems[1].classList.add("active-filter");

            for(let i = 0; i < 8; i++){
                generatePortfolio(webPortfolios[i]);
            }
            break;
        case 2:
            portfolioFilterItems[2].classList.add("active-filter");

            for(let i = 0; i < 8; i++){
                generatePortfolio(nftPortfolios[i]);
            }
            break;
        default:
            portfolioFilterItems[0].classList.add("active-filter");
            
            for(let i = 0; i < 8; i++){
                generatePortfolio(portfolioDatas[i]);
            }
            break;
    }
}

let portfolioDatas = [];
let webPortfolios = [];
let nftPortfolios = [];

window.addEventListener("load", function () {
    portfolioDatas = [];
    webPortfolios = [];
    nftPortfolios = [];

    portfolioDatas = JSON.parse(JSON.stringify(portfolioList));

    for (let i = 0; i < portfolioDatas.length; i++) {
        if (portfolioDatas[i].nft == "true") {
            nftPortfolios.push(portfolioDatas[i]);
        } else if (portfolioDatas[i].nft == "false" && portfolioDatas[i].web == "true") {
            webPortfolios.push(portfolioDatas[i]);
        }
    }

    for(let i = 0; i < 8; i++){
        generatePortfolio(portfolioDatas[i]);
    }
})

function generatePortfolio(_obj){
    let el_link = document.createElement("a");
    el_link.setAttribute("href", "/portfolio?id=" + _obj.id);
    el_link.setAttribute("class", "portfolio-link");
    el_link.setAttribute("data-aos", "fade-up");

    let el_item = document.createElement("div");
    el_item.setAttribute("class", "portfolio-item");

    let el_img_wrapper = document.createElement("div");
    el_img_wrapper.setAttribute("class", "portfolio-image");

    let el_img = document.createElement("img");
    el_img.src = "img/" + _obj.thumbnail;
    el_img.alt = _obj.title;

    let el_tag_wrapper = document.createElement("div");
    el_tag_wrapper.setAttribute("class", "portfolio-tag");

    let el_tag_web = document.createElement("p");
    el_tag_web.setAttribute("class", "tag-web");
    el_tag_web.innerHTML = "#반응형웹";

    let el_tag_nft = document.createElement("p");
    el_tag_nft.setAttribute("class", "tag-nft");
    el_tag_nft.innerHTML = "#NFT/블록체인";

    let el_title = document.createElement("h3");
    el_title.innerHTML = "<span>" + _obj.title + "</span> | " + _obj.desc;


    if(_obj.nft == "true" && _obj.web == "false"){
        el_tag_wrapper.appendChild(el_tag_nft);
    }else if(_obj.nft == "true" && _obj.web == "true"){
        el_tag_wrapper.appendChild(el_tag_web);
        el_tag_wrapper.appendChild(el_tag_nft);
    }else if(_obj.nft == "false" && _obj.web == "true"){
        el_tag_wrapper.appendChild(el_tag_web);
    }

    el_img_wrapper.appendChild(el_img);

    el_item.appendChild(el_img_wrapper);
    el_item.appendChild(el_tag_wrapper);
    el_item.appendChild(el_title);

    el_link.appendChild(el_item);

    portfolioWrapper.appendChild(el_link);
}

emailjs.init('HtV-Ci83zySmHXvEb')

const btn = document.getElementById('button');

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    if(document.getElementById('name').value.trim() != "" && document.getElementById('email').value.trim() != "" && document.getElementById('task').value.trim() != ""){
        if(document.getElementById('privacy').checked){
            btn.value = '보내는 중...';
            const serviceID = 'default_service';
            const templateID = 'template_bcawdjb';

            emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btn.value = '문의 보내기 →';
                alert('정상적으로 문의 내용이 접수되었습니다. 확인 후 빠른 시일 내에 회신드리겠습니다.');
                document.getElementById('name').value = "";
                document.getElementById('email').value = "";
                document.getElementById('phone').value = "";
                document.getElementById('task').value = "";
            }, (err) => {
                btn.value = '문의 보내기 →';
                alert('문의 접수 과정에서 일시적 오류가 발생하였습니다. 새로고침 후 다시 한 번 시도해주세요.');
            });
        }else{
            alert('개인정보 처리방침에 동의해주셔야 문의 내용이 접수됩니다.');
        }
    }else{
        alert('모든 필수 항목(*)들을 입력하신 뒤 문의 보내기 버튼을 눌러주세요.');
        return;
    }
});

AOS.init({
    offset: 250,
    duration: 1000,
    once: true,
    anchorPlacement: "top-bottom",
});