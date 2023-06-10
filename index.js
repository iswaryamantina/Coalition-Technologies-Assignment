window.onscroll = function () {
  offsetFunction();
};
let sticky = document.getElementById("navbar");
let topStick = sticky.offsetTop;

function offsetFunction() {
  if (window.pageYOffset >= topStick) {
    sticky.classList.add("sticky");
    sticky.classList.remove("non-sticky");
  } else {
    sticky.classList.remove("sticky");
    sticky.classList.add("non-sticky");
  }
}

const fetchImages = async () => {
  let url = "./carousel-images.json";
  try {
    let response = await fetch(url);
    const images = await response.json();
    return images;
  } catch (error) {
    console.log(error);
  }
};
const displayCarousel = async () => {
  let imgs = await fetchImages();
  let j = ``;
  for (let i = 0; i < imgs.length; i++) {
    j += `<img class="img-display" alt="images" src=${imgs[i].image}>`;
  }
  return j;
};

const displayItemHolder = async () => {
  let imgs = await fetchImages();
  let k = ``;
  for (let i = 0; i < imgs.length - 1; i++) {
    let index = i;
    k += `<div class="carousel-item ${index == 0 ? "active" : ""
      }" id="carousel${i}">
        <div class="row">
        <div class="row-md-4">
        ${await displayCarousel()}
        </div> 
    </div>
    </div>
        `;
  }
  return k;
};

let holder = document.getElementById("holder");
let slideholder = document.getElementById("slideholder");
const displayed = async () => {
  let hello = await displayItemHolder();
  return (holder.innerHTML += hello);
};
displayed();

const indicatorsCount = async () => {
  let imgs = await fetchImages();
  let l = ``;
  for (let i = 0; i < imgs.length - 1; i++) {
    l += `<li data-target="#myCarousel" data-slide-to='${i}' class="${i == 0 ? "active" : ""
      }"></li>`;
  }
  return l;
};

const indicators = async () => {
  let displayIndicator = await indicatorsCount();
  return (slideholder.innerHTML += displayIndicator);
};
indicators();

let highrange = document.getElementById("displayClimb");
let mountmob1 = document.getElementById("displayClimbMobile1");
let mountmob2 = document.getElementById("displayClimbMobile2");
let mount1 = document.getElementById("mount1");
let mount2 = document.getElementById("mount2");
let mounts = document.getElementsByClassName("tab-title");

const clickedMount = (mount) => {
  if (mount == "mount1") {
    mount1.classList.add("activeColor");
    mount2.classList.remove("activeColor");
    checkTabs();
  } else if (mount == "mount2") {
    mount2.classList.add("activeColor");
    mount1.classList.remove("activeColor");
    checkTabs();
  }
};

const fetchSchedule = async () => {
  let url = "./schedules.json";
  try {
    let response = await fetch(url);
    const schedule = await response.json();
    return schedule;
  } catch (error) {
    console.log(error);
  }
};

const displaySchedule = async (mountain) => {
  let schedule = await fetchSchedule();
  let k = ``;
  for (let i = 0; i < schedule.length; i++) {
    if (schedule[i].mountain == mountain) {
      k += `
            <div class="row-table">
            <p class="scheduled-font">${schedule[i].date}</p>
            <p class="scheduled-font">${schedule[i].event}</p>
            </div>
            `;
    }
  }

  return k;
};

displaySchedule();

const checkTabs = async () => {
  for (let i = 0; i < mounts.length; i++) {
    let screenTab = "";
    if (
      mounts[i].classList.contains("activeColor") &
      (mounts[i].id == "mount1")
    ) {
      if (window.screen.width > 600) {
        screenTab = highrange;
        mountmob1.style.display = "none";
        mountmob2.style.display = "none";
      } else {
        screenTab = mountmob1;
        mountmob2.style.display = "none";
        mountmob1.style.display = "block";
      }
      screenTab.innerHTML = `<div class="sectionc-banner" style="background: url('/assets/images/mountain-1.png') no-repeat">
      
            <div class="schedules">
            <div class="scheduleHolder">
            <h1 class="titlehead scheduledTitle">
            SCHEDULE
            </h1>
            <div class="schedules-table">
            ${await displaySchedule("Mountain 1")}
            </div>
            </div>
            </div>
            </div>`;
    } else if (
      mounts[i].classList.contains("activeColor") &
      (mounts[i].id == "mount2")
    ) {
      if (window.screen.width > 600) {
        screenTab = highrange;
        mountmob1.style.display = "none";
        mountmob2.style.display = "none";
      } else {
        screenTab = mountmob2;
        mountmob1.style.display = "none";
        mountmob2.style.display = "block";
      }
      screenTab.innerHTML = `<div class="sectionc-banner" style="background: url('/assets/images/mountain-2.png') no-repeat">
                
                <div class="schedules">
                <div class="scheduleHolder">
                <h1 class="titlehead scheduledTitle">
                SCHEDULE
                </h1>
                <div class="schedules-table">
                ${await displaySchedule("Mountain 2")}
                </div>
                </div>
                </div>
                </div>`;
    }
  }
};

checkTabs();

let bodydiv = document.getElementById("footer");
bodydiv.innerHTML += `<div class="footer">
<div class="footer-logo">
    <img class="footer-img" src="./assets/images/footer-logo.png" alt="footer-logo"/>
</div>
<div class="attribution">
    <p class="footer-text">COPYRIGHT ${new Date().getFullYear()} ALL RIGHTS RESERVED</p>
</div>
</div>`;
