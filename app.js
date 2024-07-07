setInterval(()=>{
    var now = new Date();
    var datetime = now.toLocaleString();
    document.getElementById("datetime").innerHTML = datetime;
},1000)

let query= "trending"
let page="1"
let sort="rank"
createURL(query, page, sort);

document.querySelector('#search').addEventListener('input', event => {
    query = event.target.value;
    return query
})
document.getElementById("search").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      createURL(query, page, sort);
    }
});
let q=""
function category(q){
    query=q;
    page=1;
    createURL(query, page, sort);
}

// let apikey_og="fa44e389028348a9ae450d82bbe0ecd8" /e001fd764a0841b3822c6fa4a1c31baf
// bJwwJHQuL30pWOAfubI5Ac5eNvVxiB

//news Catcher  : dthmXh3OZgJP8QLU8BCLTu2dXqv1_tmwlrRL50btdBc

// [sort by] can only be 'relevancy', 'date', 'rank'"

function createURL(query, page, sort){
    let size=16
    if(query=="most+read"){
        size=5
        page=1
        sort='rank'
        
    }
    let url='https://api.newscatcherapi.com/v2/search?' +
        `q=${query}&` +
        `page_size=${size}&`+
        `page=${page}&`+
        `sort_by=${sort}&`+
        'lang=en&'+
        'countries=in';
        // 'x_api_key:dthmXh3OZgJP8QLU8BCLTu2dXqv1_tmwlrRL50btdBc';
        console.log(url)
        data(url);
}


let tPages=0;

async function data(url){
    try{
        const response=await fetch(url,{
            method:'GET',
            headers:{
                'x_api_key':'dthmXh3OZgJP8QLU8BCLTu2dXqv1_tmwlrRL50btdBc'
            }
        })
        let n = await response.json()
        // console.log(news);
        let news=n.articles ;
        console.log(news);
        tPages=n.total_pages;
        if(news.length==5){
            sideHeading(news)
            alert("news sent")
        }else{
            dom(news);
        }
        // return tPages;
    }catch(e){
        console.log("error- ",e);
        return "no news found";
    }
}


function checkControl(){
    if(page==1){
        document.querySelector(".back").style.display="none"
        document.querySelector('#page').style.display="none"
    }else{
        document.querySelector(".back").style.display="block"
        document.querySelector('#page').style.display="block"
    }
}

function back(){
    page=page-1
    createURL(query, page, sort)
}


function next(){
    page=parseInt(page)+1
    // console.log(page)
    document.querySelector('#page').innerHTML=`<p id="page">Page ${page} out of ${tPages} </p>`
    createURL(query, page, sort)
}

let s=""
function sortBy(s){
    sort=s;
    createURL(query, page, sort);
    // let list= document.querySelectorAll(".dropdown-item")
    // for(let index=0; index<list.length; index++){
    //     // list[index].className=`dropdown-item `
    //     list[index].removeClass('active');
    //     console.log(list[index].className)
    // }
    // console.log("--")
    // console.log(document.querySelector(`.${s}`).className=document.querySelector(`.${s}`).className+" active")
    // console.log("--")
}

// link="https://newsapi.org/v2/everything?q=most+read&pageSize=5&apiKey=e001fd764a0841b3822c6fa4a1c31baf";
// lcall();
// async function lcall(link){
//     try{
//         const response=await fetch(link)
//         let news = await response.json()
//         // console.log(news);
//         news=news.articles ;
//         console.log(news);
//         sideHeading(news);
//     }catch(e){
//         console.log("error- ",e);
//         return "no news found";
//     }
// }

function dom(news){
    str=""
    // createURL("most+read");
    for(let i=0; i<=news.length; i++){
        let img=news[i].media
        if (img==null |img=='https://static.toiimg.com/thumb/msid-47529300,width-1070,height-580,imgsize-110164,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg'){
            img="https://i0.wp.com/sketchweb.net/wp-content/uploads/2021/09/Is-it-okay-to-remove-old-news-article-from-the-website.png?fit=1200%2C675&ssl=1https://i0.wp.com/sketchweb.net/wp-content/uploads/2021/09/Is-it-okay-to-remove-old-news-article-from-the-website.png"
        }
        let ti=news[i].title;
        if (ti=="[Removed]"){
            ti='Oops! There Was A Problem!' 
            news[i].description="Sorry, News Got Removed From Source... "
            news[i].url="#"
            img="./Removed.png"
        }
        str=str+`<div class="card" style="width: 18rem;">
                <img src=${img} class="card-img-top" alt="No Image Available">
                <div class="card-body">
                    <div class= "cont">
                        <p style="color: #9D4BFF">${news[i].rights}</p>
                        <h5 class="card-title">${ti}</h5>
                        <div class="extra">
                            <p>by: ${news[i].author}</p>
                            <!-- <p>${news[i].published_date}</p>-->
                        </div>
                        <p class="card-text">${news[i].excerpt}</p>
                    </div>
                    <div class="btnDiv">
                        <a href="${news[i].link}" class="btn btn-primary" target="_blank">Read More  <i class="fa-solid fa-angles-right"></i></a>
                    </div>
                </div>
            </div>`

        document.querySelector("#news").innerHTML=str;
        checkControl()
    }
}

function side(){
    createURL("most+read");
    document.querySelector('.hdg3').style.display='block'
}

function sideHeading(lftNews){
    n=""
    for(let i=0; i<=lftNews.length; i++){
        n=n+`<h3 class="hdg3">
                <a href="${lftNews[i].link}" target="_blank">${lftNews[i].title}</a>
            </h3>
            <hr class="line">`
        document.querySelector(".track").innerHTML=n;
    }
}