//This page was inspired by Stephen Grider's instructional react video on Udemy
//I decided to completely rebuild it with Vanilla JS and make the calls from server side
//this version makes calls from client side with a quick get to server for api key


const videoSearchBar = document.getElementById('videoSearch');
const videoListDiv = document.getElementById('videoList');
const mainVidScreen = document.getElementById('mainVidScreen');


document.addEventListener("DOMContentLoaded", function(){

  getVideos('javascript');

}, false)

mainVidScreen.addEventListener('mouseover', function() {
  const vidFrame = document.getElementById('vidFrame');
  setTimeout(() => {

    vidFrame.style = 'position:relative; z-index: 1; width: 960px; height: 720px; bottom: 210px';
  }, 35);
})

mainVidScreen.addEventListener('mouseout', function() {
  const vidFrame = document.getElementById('vidFrame');
  setTimeout(() => {
      vidFrame.style = 'position:static; width:480px; height:360px;';
    })
  }, 35);


videoSearchBar.addEventListener('input', event => {

  const term = event.target.value || 'javascript';

  if(term!=='') getVideos(term);

}, false)


async function getVideos(term) {
  //get api key and url
  const res = await fetch('/getKey');
  const json = await res.json();
  let params = `?part=snippet&key=${json.API_KEY}&q=${term}&maxResults=50&type=video`;

  //call to youtube for videos
  const res2 = await fetch(json.ROOT_URL + params);
  const json2 = await res2.json();

  // console.log("return data from youtube: ", json);

  videoListDiv.innerHTML = '';
  constructVideoList(json2);
  updateSelectedVideo(json2.items[0].id.videoId);

}


function constructVideoList(data) {
  let videoList = '';
  for(let elem of data.items) {

    let vidThumbnail = `<div width="100%" data-id="${elem.id.videoId}" style="background-color: #ecf5f3; margin-left: 10px; text-align:right; margin-right:10px;" class="selectableVids">
                          ${elem.snippet.title}
                          <img width="120px" height="90px" src='${elem.snippet.thumbnails.default.url}'/>
                        </div>`;
    videoList += vidThumbnail;
  }
  videoListDiv.innerHTML = videoList;

  for(let elem of videoListDiv.children) {

    elem.addEventListener('click', function(event) {
      updateSelectedVideo(event.target.dataset.id)

    }, false);
  }
}


function updateSelectedVideo(id) {

  const url = `https://www.youtube.com/embed/${id}`;
  const height = '360px'; //360px 720px
  const width = '480px';  //480px 960px

  let mainVid = `<iframe id="vidFrame" allowfullscreen="true" height=${height} width=${width} class="iframeClass" src=${url}></iframe>`;

  mainVidScreen.innerHTML = mainVid;

}







// // //This page was inspired by Stephen Grider's instructional react video on Udemy
// // //I decided to completely rebuild it with Vanilla JS and make the calls from server side
// //  //This version makes calls to youtube from the server
//
//
// const videoSearchBar = document.getElementById('videoSearch');
// const videoListDiv = document.getElementById('videoList');
// const mainVidScreen = document.getElementById('mainVidScreen');
//
//
// document.addEventListener("DOMContentLoaded", function(){
//
//   getVideos('javascript');
//
// }, false)
//
// mainVidScreen.addEventListener('mouseover', function() {
//   const vidFrame = document.getElementById('vidFrame');
//   setTimeout(() => {
//
//     vidFrame.style = 'position:relative; z-index: 1; width: 960px; height: 720px; bottom: 210px';
//   }, 35);
// })
//
// mainVidScreen.addEventListener('mouseout', function() {
//   const vidFrame = document.getElementById('vidFrame');
//   setTimeout(() => {
//       vidFrame.style = 'position:static; width:480px; height:360px;';
//     })
//   }, 35);
//
//
// videoSearchBar.addEventListener('input', event => {
//
//   const term = event.target.value || 'javascript';
//
//   if(term!=='') getVideos(term);
//
// }, false)
//
//
// async function getVideos(term) {
//
//   //send info to server to make the call to youTube
//
//   const response = await fetch('/you_tube_server', {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ term })
//   });
//   const content = await response;
//   let contentAsText = await content.text();
//   let json = JSON.parse(contentAsText);
//   console.log('parsed return data: ', json);
//
//   videoListDiv.innerHTML = '';
//   constructVideoList(json);
//   updateSelectedVideo(json.items[0].id.videoId);
//
// }
//
//
// function constructVideoList(data) {
//   let videoList = '';
//   for(let elem of data.items) {
//
//     let vidThumbnail = `<div width="100%" data-id="${elem.id.videoId}" style="background-color: #ecf5f3; margin-left: 10px; text-align:right; margin-right:10px;" class="selectableVids">
//                           ${elem.snippet.title}
//                           <img width="120px" height="90px" src='${elem.snippet.thumbnails.default.url}'/>
//                         </div>`;
//     videoList += vidThumbnail;
//   }
//   videoListDiv.innerHTML = videoList;
//
//   for(let elem of videoListDiv.children) {
//
//     elem.addEventListener('click', function(event) {
//       updateSelectedVideo(event.target.dataset.id)
//
//     }, false);
//   }
// }
//
//
// function updateSelectedVideo(id) {
//
//   const url = `https://www.youtube.com/embed/${id}`;
//   const height = '360px'; //360px 720px
//   const width = '480px';  //480px 960px
//
//   let mainVid = `<iframe id="vidFrame" height=${height} width=${width} class="iframeClass" src=${url}></iframe>`;
//   // allowfullscreen="true"
//   mainVidScreen.innerHTML = mainVid;
//
// }
