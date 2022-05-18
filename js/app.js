const searchBox = document.querySelector(".search-bar");
const videoContainer = document.querySelector(".video-container");
const videoItem = document.querySelector(".videoItem");

const KEY = "AIzaSyDYMpYv_AianLl7R_b3JmU4O4bKUOBz5MA";
const URL = "https://www.googleapis.com/youtube/v3/search?";

async function getData(query) {
  const request = await fetch(
    `${URL}q=${query}&key=${KEY}&part=snippet&maxResults=100`
  );
  const response = await request.json();
  sendDisplay(response.items);
}

searchBox.addEventListener("keypress", (e) => {
  if (e.keyCode == 13) {
    getData(searchBox.value);
    videoContainer.style.display = "flex";
  }
});

function sendDisplay(res) {
  videoContainer.innerHTML = "";
  res.map((item) => {
    console.log(item);
    const div = document.createElement("div");
    div.dataset.link = item.id.videoId;
    div.classList.add("vidId");
    div.innerHTML = `

      <div class="video">
        <img src="${
          item.snippet.thumbnails.high.url
        }" class="thumbnail" alt="" />
        <div class="content">
          <img src="${
            item.snippet.thumbnails.high.url
          }" class="channel-icon" alt="" />
          <div class="info">
            <h4 class="title">
              ${item.snippet.description ? item.snippet.description : ""}
            </h4>
            <p class="channel-name">${
              item.snippet.channelTitle ? item.snippet.channelTitle : ""
            }</p>
          </div>
        </div>
      </div>

      `;

    videoContainer.prepend(div);
  });

  setVideo();
}

function setVideo() {
  const vid = document.querySelectorAll(".vidId");

  vid.forEach((item) => {
    console.log(item);

    item.addEventListener("click", async () => {
      const req = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?id=${item.dataset.link}&key=${KEY}&part=snippet`
      );

      const res = await req.json();
      videoContainer.style.display = "none";

      sendVideo(res);
    });
  });
}

function sendVideo(item) {
  console.log(item);
  videoItem.classList.remove("hide");
}
