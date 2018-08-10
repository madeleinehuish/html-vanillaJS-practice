const API_KEY = 'AIzaSyACaJJh05-lMN9DbO0cvnorV5sKFyO91TM';
const ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';

const videoSearchBar = document.getElementById('videoSearch');
const videoListDiv = document.getElementById('videoList');
const mainVidScreen = document.getElementById('mainVidScreen');
// let selectableVideos = document.getElementsByClass('selectableVids');
let currentSelected = '';

document.addEventListener("DOMContentLoaded", function(){
  const params = `?part=snippet&key=${API_KEY}&q=javascript&type=video`;
  getVideos('javascript', params);
}, false)



videoSearchBar.addEventListener('input', event => {
  // console.log('event.target.value SearchBar: ', event.target.value);
  let term = event.target.value || 'javascript';
  // term = 'javascript'; //change this later

  const params = `?part=snippet&key=${API_KEY}&q=${term}&type=video`;
  if(term!=='') getVideos(term, params);

}, false)


async function getVideos(term, params) {

  videoListDiv.innerHTML = '';

  let response = await fetch(ROOT_URL + params);

  let json = await response.json();
  console.log('json: ', json);
  constructVideoList(json);
  updateSelectedVideo(json.items[0].id.videoId);
  // console.log("json response: ", json);

}


function constructVideoList(data) {
  let videoList = '';
  for(let elem of data.items) {

    let vidThumbnail = `<div width="100%" data-id="${elem.id.videoId}" style="text-align:right; margin-right:90px;" class="selectableVids">
                          ${elem.snippet.title}
                          <img width="120px" height="90px" src='${elem.snippet.thumbnails.default.url}'/>
                        </div>`;
    // console.log('vidThumbnail: ', vidThumbnail);
    videoList += vidThumbnail;
  }
  videoListDiv.innerHTML = videoList;
  for(let elem of videoListDiv.children) {
    elem.addEventListener('click', function(event) {
      console.log('selected video event target: ', event.target);
      updateSelectedVideo(event.target.dataset.id)
    }, false);
  }
}

function updateSelectedVideo(id) {
  // currentSelected = video;
  // console.log('current selected: ', currentSelected);

  // const videoId = video.id.videoId;
  const url = `https://www.youtube.com/embed/${id}`;
  const height = '360px';
  const width = '480px';


  let mainVid = `<iframe height=${height} width=${width} class="iframeClass" src=${url}></iframe>`;
  mainVidScreen.innerHTML = mainVid;

}
