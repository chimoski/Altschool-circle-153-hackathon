const header = document.querySelector(".header");
const hamburgerBtn = document.querySelector(".hamburger-btn");

const innerWidth = window.innerWidth;

// stats
const studentStat = document.querySelector(".student-stat");
const avgAgeStat = document.querySelector(".avgAge-stat");

// line-charts
const chartLines = document.querySelectorAll(".line-charts li");
const segments = document.querySelectorAll(".segment");
const xAxis = document.querySelectorAll(".x-axis small");

// piecharts
const pieTrack = document.querySelector(".piechart__tracks li");
const piebackendStat = document.querySelector(".pie-backend-stat");
const piefrontendStat = document.querySelector(".pie-frontend-stat");
const piecloudStat = document.querySelector(".pie-cloud-stat");

// pie charts gender
const pieGender = document.querySelector(".piechart__gender li");
const pieMaleStat = document.querySelector(".pie-male-stat");
const pieFemaleStat = document.querySelector(".pie-female-stat");
const pieOtherStat = document.querySelector(".pie-other-stat");

// colors get colors from :root in css
let green = getComputedStyle(document.documentElement).getPropertyValue(
  "--green"
);
let orange = getComputedStyle(document.documentElement).getPropertyValue(
  "--orange"
);
let purple = getComputedStyle(document.documentElement).getPropertyValue(
  "--purple"
);
let deepPurple = getComputedStyle(document.documentElement).getPropertyValue(
  "--deepPurple"
);
let deepGreen = getComputedStyle(document.documentElement).getPropertyValue(
  "--deepGreen"
);

let blue = getComputedStyle(document.documentElement).getPropertyValue(
  "--blue"
);

// menu open & close
hamburgerBtn.addEventListener("click", () => {
  header.classList.toggle("open");
});

const studentData = async () => {
  const res = await fetch("./student.json");
  const data = await res.json();

  let ageGrade1 = data.filter((el) => el.age > 17 && el.age <= 20).length;
  let ageGrade2 = data.filter((el) => el.age > 20 && el.age <= 25).length;
  let ageGrade3 = data.filter((el) => el.age > 26 && el.age <= 30).length;
  let ageGrade4 = data.filter((el) => el.age > 31 && el.age <= 35).length;

  let maxAgeLength = Math.max(ageGrade1, ageGrade2, ageGrade3, ageGrade4);

  let ageHeight1 = ((ageGrade1 / maxAgeLength) * 90).toFixed(2);
  let ageHeight2 = ((ageGrade2 / maxAgeLength) * 90).toFixed(2);
  let ageHeight3 = ((ageGrade3 / maxAgeLength) * 90).toFixed(2);
  let ageHeight4 = ((ageGrade4 / maxAgeLength) * 90).toFixed(2);

  const cloud = data.filter((el) => el.track === "cloud").length;
  const frontend = data.filter((el) => el.track === "frontend").length;
  const backend = data.filter((el) => el.track === "backend").length;

  const male = data.filter((el) => el.gender === "M").length;
  const female = data.filter((el) => el.gender === "F").length;
  const other = data.filter((el) => el.gender === "O").length;

  console.log({
    male,
    female,
    other,
  });

  const avgAge = data.reduce((prev, curr, _, { length }) => {
    return prev + curr.age / length;
  }, 0);

  studentStat.textContent = data.length;
  avgAgeStat.textContent = Math.floor(avgAge);

  const positionForEachAge = [ageHeight1, ageHeight2, ageHeight3, ageHeight4];

  // load line chart
  lineChart(positionForEachAge);

  // listen for resize on line-chart for responsive chart
  window.addEventListener(
    "resize",
    throttle(() => {
      lineChart(positionForEachAge);
    })
  );

  // pieTrack
  pieChart(
    pieTrack,
    backend,
    frontend,
    cloud,
    piebackendStat,
    piefrontendStat,
    piecloudStat,
    green,
    orange,
    purple,
    data
  );

  // pieGender
  pieChart(
    pieGender,
    male,
    female,
    other,
    pieMaleStat,
    pieFemaleStat,
    pieOtherStat,
    deepGreen,
    deepPurple,
    blue,
    data
  );

  // loadtable
  loadTable(data);
};

studentData();

//linechart func
function lineChart(arr) {
  const chartElWidth = document.querySelector(".line-charts").clientWidth;
  for (let i = 0; i < chartLines.length; i++) {
    let line = chartLines[i];
    let segment = segments[i];
    let x = xAxis[i];

    // set propery for clip-path
    line.style.setProperty("--value", `${arr[i]}%`);
    line.style.setProperty("--previous-value", `${i === 0 ? 0 : arr[i - 1]}%`);

    // position each point
    segment.style.bottom = `${arr[i]}%`;
    segment.style.left = `${(chartElWidth / chartLines.length) * (i + 1)}px`;

    x.style.left = `${(chartElWidth / chartLines.length) * (i + 1)}px`;
  }
}

// piefunc
function pieChart(
  wrapper,
  firstEl,
  secondEl,
  thirdEl,
  firstCont,
  secondCont,
  thirdCont,
  color1,
  color2,
  color3,
  data
) {
  // convert to degree for conic-gradient
  let firstElStat = (firstEl / data.length) * 100 * 3.6;
  let secondElStat = (secondEl / data.length) * 100 * 3.6;
  let thirdElStat = (thirdEl / data.length) * 100 * 3.6;

  // set Conic gradient
  wrapper.style.backgroundImage = `conic-gradient(from 0deg, ${color1} 0deg ${secondElStat}deg, ${color2} ${secondElStat}deg ${
    secondElStat + thirdElStat
  }deg , ${color3} ${secondElStat + thirdElStat}deg ${
    secondElStat + thirdElStat + firstElStat
  }deg  )`;

  firstCont.textContent = `${(firstElStat / 3.6).toFixed(1)}%`;
  secondCont.textContent = `${(secondElStat / 3.6).toFixed(1)}%`;
  thirdCont.textContent = `${(thirdElStat / 3.6).toFixed(1)}%`;
}

// func loadTable
function loadTable(data) {
  let tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    let row = `<tr>
      <td class="avatar">
        <img src=${data[i].picture} />
        <span>${data[i].name}</span>
      </td>
      <td>${data[i].altId}</td>
      <td>${data[i].track}</td>
      <td>${data[i].gender}</td>
      <td>${data[i].email}</td>

    </tr>`;

    tableBody.innerHTML += row;
  }
}

// resize
function throttle(cb, delay = 400) {
  let lastTime = 0;
  return (...args) => {
    let now = Date.now();
    if (now - lastTime < delay) return;
    cb(...args);
    lastTime = now;
  };
}
