const header = document.querySelector(".header");
const hamburgerBtn = document.querySelector(".hamburger-btn");
const select = document.querySelector("select");
const options = document.querySelectorAll("option");
const tableArrowRight = document.querySelector(".arrow-right");
const tableArrowLeft = document.querySelector(".arrow-left");
const paginationLists = document.querySelectorAll(".pagination-list span");
const sortBtns = document.querySelectorAll(".sort-btn");
const controls = document.querySelectorAll(".btn-control");
const studentsTable = document.querySelector(".students__table");
const teachersTable = document.querySelector(".teachers__table");
const paginationEl = document.querySelector(".pagination");

// stats
const studentStat = document.querySelector(".student-stat");
const teacherStat = document.querySelector(".teacher-stat");
const minAgeStat = document.querySelector(".minAge-stat");
const maxAgeStat = document.querySelector(".maxAge-stat");
const avgAgeStat = document.querySelector(".avgAge-stat");

// bar-charts
const chartBars = document.querySelectorAll(".bar-charts li");
const xAxis = document.querySelectorAll(".x-axis small");

// AgeStat
const age1Stat = document.querySelector(".age1");
const age2Stat = document.querySelector(".age2");
const age3Stat = document.querySelector(".age3");
const age4Stat = document.querySelector(".age4");

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

// profiles
let profileImage = document.querySelector(".profile__image");
let profileName = document.querySelector(".profile__name");
let profileAge = document.querySelector(".profile__age");
let profileGender = document.querySelector(".profile__gender");
let profileTrack = document.querySelector(".profile__track");

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

// header background
const scrollTrigger = header.clientHeight + 100;
window.addEventListener(
  "scroll",
  throttle(() => {
    if (window.scrollY >= scrollTrigger) {
      header.classList.add("active");
    } else {
      header.classList.remove("active");
    }
  }, 200)
);

controls.forEach((control) => {
  control.addEventListener("click", (e) => {
    controls.forEach((btn) => {
      btn.classList.remove("active");
    });

    control.classList.add("active");
    if (
      control.classList.contains("active") &&
      control.classList.contains("studentBtn")
    ) {
      studentsTable.style.display = "table";
      paginationEl.style.display = "flex";
      teachersTable.style.display = "none";
    }
    if (
      control.classList.contains("active") &&
      control.classList.contains("teacherBtn")
    ) {
      studentsTable.style.display = "none";
      paginationEl.style.display = "none";
      teachersTable.style.display = "table";
    }
  });
});

const studentData = async () => {
  const res = await fetch("./students.json");
  const data = await res.json();

  let ageGrade1 = data.filter((el) => el.age > 17 && el.age <= 20).length;
  let ageGrade2 = data.filter((el) => el.age > 20 && el.age <= 25).length;
  let ageGrade3 = data.filter((el) => el.age > 26 && el.age <= 30).length;
  let ageGrade4 = data.filter((el) => el.age > 31 && el.age <= 35).length;

  age1Stat.textContent = ageGrade1;
  age2Stat.textContent = ageGrade2;
  age3Stat.textContent = ageGrade3;
  age4Stat.textContent = ageGrade4;

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

  const avgAge = data.reduce((prev, curr, _, { length }) => {
    return prev + curr.age / length;
  }, 0);

  const age = data.map((el) => el.age);
  const minAge = Math.min(...age);
  const maxAge = Math.max(...age);

  studentStat.textContent = data.length;
  avgAgeStat.textContent = Math.floor(avgAge);
  minAgeStat.textContent = minAge;
  maxAgeStat.textContent = maxAge;

  const positionForEachAge = [ageHeight1, ageHeight2, ageHeight3, ageHeight4];

  // load line chart
  BarChart(positionForEachAge);

  // listen for resize on line-chart for responsive chart
  window.addEventListener(
    "resize",
    throttle(() => {
      BarChart(positionForEachAge);
    })
  );

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

  let idx = 0;
  let sliced = 8;
  let perPage = 8;

  let tableData = data.slice(idx * perPage, sliced);

  // loadtable
  loadTable(tableData);

  let students = document.querySelector("#tableBody").querySelectorAll("tr");

  // pagination

  tableArrowRight.addEventListener("click", () => {
    idx++;
    // sliced += 8;
    changeTable(idx, paginationLists, data, sliced, perPage);
    clickStudents(students, data, idx, perPage, sliced);
  });

  tableArrowLeft.addEventListener("click", () => {
    idx--;
    // sliced -= 8;
    changeTable(idx, paginationLists, data, sliced, perPage);
    clickStudents(students, data, idx, perPage, sliced);
  });

  paginationLists.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      idx = +e.target.dataset.index;
      changeTable(idx, paginationLists, data, sliced, perPage);
      clickStudents(students, data, idx, perPage, sliced);
    });
  });

  sortBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      sortBtns.forEach((btns) => {
        if (btn !== btns) btns.classList.remove("rotate");
      });

      btn.classList.toggle("rotate");
      sortTable(e, data, idx, perPage, sliced);
      clickStudents(students, data, idx, perPage, sliced);
    });
  });

  profileImage.src = tableData[0].picture;
  profileName.textContent = tableData[0].name;
  profileAge.textContent = `Age: ${tableData[0].age}`;
  profileGender.textContent = `Gender: ${tableData[0].gender}`;

  clickStudents(students, data, idx, perPage, sliced);

  // select.addEventListener("click", (e) => {
  //   console.log(e.target);
  //   sortTable(e, data, idx, perPage, sliced);
  // });
};

studentData();

function BarChart(arr) {
  const chartElWidth = document.querySelector(".bar-charts").clientWidth;
  for (let i = 0; i < chartBars.length; i++) {
    let bar = chartBars[i];
    let x = xAxis[i];
    const leftPosition = `${
      (chartElWidth / chartBars.length) * (i + 1) - 60
    }px`;

    // set propery for clip-path
    bar.style.setProperty("--value", `${arr[i]}%`);
    bar.style.setProperty("--previous-value", `${i === 0 ? 0 : arr[i - 1]}%`);
    bar.style.left = leftPosition;

    // position each point
    // segment.style.bottom = `${arr[i]}%`;
    // segment.style.left = leftPosition;

    x.style.left = leftPosition;
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
    let row = `<tr data-id=${data[i].altId}>
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

// sort table
function sortTable(e, arrayData, idx, perPage, sliced) {
  let value = e.target.dataset.value;

  switch (value) {
    case "name":
      arrayData = arrayData.sort((a, b) => {
        return a.name > b.name ? 1 : -1;
      });
      e.target.dataset.value = "name-rev";
      break;
    case "name-rev":
      arrayData = arrayData.sort((a, b) => {
        return a.name > b.name ? -1 : 1;
      });
      e.target.dataset.value = "name";

      break;
    case "track":
      arrayData = arrayData.sort((a, b) => {
        return b.track > a.track ? 1 : -1;
      });

      e.target.dataset.value = "track-rev";

      break;
    case "track-rev":
      arrayData = arrayData.sort((a, b) => {
        return b.track > a.track ? -1 : 1;
      });
      e.target.dataset.value = "track";
      break;
    case "id":
      arrayData = arrayData.sort((a, b) => {
        return a.altId.localeCompare(b.altId, undefined, {
          numeric: true,
          sensitivity: "base",
        });
      });
      e.target.dataset.value = "id-rev";
      break;
    case "id-rev":
      arrayData = arrayData.sort((a, b) => {
        return b.altId.localeCompare(a.altId, undefined, {
          numeric: true,
          sensitivity: "base",
        });
      });
      e.target.dataset.value = "id";
    default:
      arrayData = arrayData;
  }
  let tableData = arrayData.slice(idx * perPage, sliced);

  loadTable(tableData);
}

function changeTable(idx, paginationLists, data, sliced, perPage) {
  let tableData = data.slice(idx * perPage, sliced * (idx + 1));
  paginationLists.forEach((btns) => {
    btns.classList.remove("active");
  });
  paginationLists[idx].classList.add("active");
  if (idx > 0) {
    tableArrowLeft.classList.remove("blur");
    tableArrowLeft.disabled = false;
  } else {
    tableArrowLeft.classList.add("blur");
    tableArrowLeft.disabled = true;
  }

  if (idx >= paginationLists.length - 1) {
    tableArrowRight.classList.add("blur");
    tableArrowRight.disabled = true;
  } else {
    tableArrowRight.classList.remove("blur");
    tableArrowRight.disabled = false;
  }

  loadTable(tableData);
}

function clickStudents(
  students,
  data,
  idx,
  perPage,
  sliced,
  table = "tableBody"
) {
  let tableData = data.slice(idx * perPage, sliced * (idx + 1));
  students = document.getElementById(`${table}`).querySelectorAll("tr");

  students.forEach((student) => {
    student.addEventListener("click", (e) => {
      students.forEach((el) => {
        if (el.dataset.id !== student.dataset.id) {
          el.classList.remove("active");
        }
      });

      student.classList.add("active");
      let singleStudent = tableData.filter(
        (el) => el.altId === student.dataset.id
      );

      profileImage.src = singleStudent[0].picture;
      profileName.textContent = singleStudent[0].name;
      profileAge.textContent = `Age: ${singleStudent[0].age}`;
      profileGender.textContent = `Gender: ${singleStudent[0].gender}`;
      profileTrack.textContent = singleStudent[0].track;

      if (table === "tableTeacher") {
        document.querySelector(".instructor").style.display = "block";
        document.querySelector(".profile__tracks").style.display = "block";
      }
    });
  });
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

// students.forEach((student) => {
//   student.addEventListener("click", (e) => {
//     student.parentNode.style.backgroundColor = green;
//     console.log("student");
//   });
// });

async function teachersData() {
  const res = await fetch("./teachers.json");
  let data = await res.json();

  teacherStat.textContent = data.length;
  loadTeachers(data);

  let teachers = document.getElementById("tableTeacher").querySelectorAll("tr");
  clickStudents(teachers, data, 0, 0, teachers.length, "tableTeacher");
  let btn = document.querySelector('[data-value="teacher-name"]');

  btn.addEventListener("click", (e) => {
    if (e.target.dataset.value === "teacher-name") {
      data = data.sort((a, b) => {
        return a.name > b.name ? 1 : -1;
      });
      e.target.dataset.value = "teacher-name-rev";
    } else if (e.target.dataset.value === "teacher-name-rev") {
      data = data.sort((a, b) => {
        return a.name > b.name ? -1 : 1;
      });
      e.target.dataset.value = "teacher-name";
    } else {
      data = data;
    }

    loadTeachers(data);
  });
}

teachersData();

function loadTeachers(data) {
  let tableBody = document.getElementById("tableTeacher");
  tableBody.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    let row = `<tr data-id=${data[i].altId}>
      <td class="avatar">
        <img src=${data[i].picture} />
        <span>${data[i].name}</span>
      </td>
      <td>${data[i].trackNumber}</td>
      <td>${data[i].track}</td>

    </tr>`;

    tableBody.innerHTML += row;
  }
}

// Intersection Observer (Scroll Animation)
let observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.25 }
);

document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});