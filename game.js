let happiness = 50;
let health = 50;
let economy = 50;
let green = 50;

let currentMonth = 1;
let decisionsLeft = 3;
let gameOver = false;

let countCampus = 0;
let countHospital = 0;
let countTransport = 0;
let countSustain = 0;

function updateUI() {
  document.getElementById("happy").innerText = happiness;
  document.getElementById("health").innerText = health;
  document.getElementById("eco").innerText = economy;
  document.getElementById("green").innerText = green;
  document.getElementById("month").innerText = currentMonth;
  document.getElementById("decisions").innerText = decisionsLeft;

  document.getElementById("bar-happy").style.width = happiness + "%";
  document.getElementById("bar-health").style.width = health + "%";
  document.getElementById("bar-eco").style.width = economy + "%";
  document.getElementById("bar-green").style.width = green + "%";
  document.getElementById("bar-month").style.width = (currentMonth / 12 * 100) + "%";

  updateBarColor("bar-happy", happiness);
  updateBarColor("bar-health", health);
  updateBarColor("bar-eco", economy);
  updateBarColor("bar-green", green);

  checkWinLose();
}

function updateBarColor(barId, value) {
  var bar = document.getElementById(barId);
  if (value < 20) {
    bar.style.background = "#e74c3c";
  } else if (value < 40) {
    bar.style.background = "#f39c12";
  } else {
    bar.style.background = "#2ecc71";
  }
}

function showBuilding(id) {
  var el = document.getElementById(id);
  if (el) {
    el.style.display = "block";
    el.style.opacity = "0";
    setTimeout(function() { el.style.opacity = "1"; }, 10);
  }
}

function showAndCount(imgId, badgeId, count) {
  showBuilding(imgId);
  var badge = document.getElementById(badgeId);
  if (badge && count > 1) {
    badge.innerText = "x" + count;
    badge.style.display = "block";
  }
}

function hideAllBuildings() {
  var ids = ["rc","cpy","hpt","flat1","flat2","flat3","tree1","tree2","tree3"];
  for (var i = 0; i < ids.length; i++) {
    var el = document.getElementById(ids[i]);
    if (el) el.style.display = "none";
  }
  var badges = ["badge-rc","badge-cpy","badge-hpt","badge-flat","badge-tree"];
  for (var i = 0; i < badges.length; i++) {
    var el = document.getElementById(badges[i]);
    if (el) { el.style.display = "none"; el.innerText = ""; }
  }
}

function getTitle() {
  var max = Math.max(happiness, health, economy, green);
  var min = Math.min(happiness, health, economy, green);

  if (max - min <= 15) return "Symphony of Harmony";
  if (happiness == max) return "Symphony of Joy";
  if (health == max)    return "Symphony of Vitality";
  if (economy == max)   return "Symphony of Wealth";
  if (green == max)     return "Symphony of Eternity";

  return "Symphony of Harmony";
}

function showEndScreen(title, msg) {
  document.getElementById("endTitle").innerText = title;
  document.getElementById("endMsg").innerText = msg;
  document.getElementById("endScreen").style.display = "flex";

  var buttons = document.querySelectorAll(".btn-row button");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }
}

function checkWinLose() {
  if (gameOver) return;

  if (happiness <= 0 || health <= 0 || economy <= 0 || green <= 0) {
    gameOver = true;
    var stat = "a stat";
    if (happiness <= 0) stat = "Happiness";
    if (health <= 0)    stat = "Health";
    if (economy <= 0)   stat = "Economy";
    if (green <= 0)     stat = "Environment";
    showEndScreen("💀 City Collapsed!", stat + " hit zero after " + currentMonth + " month(s).");
    return;
  }
}

function spendDecision() {
  if (gameOver) return false;
  if (decisionsLeft <= 0) return false;

  decisionsLeft--;
  document.getElementById("decisions").innerText = decisionsLeft;

  if (decisionsLeft === 0) {
    setTimeout(function() { nextMonth(); }, 800);
  }

  return true;
}

function nextMonth() {
  if (gameOver) return;

  happiness = Math.max(0, happiness - 2);
  health    = Math.max(0, health    - 2);
  economy   = Math.max(0, economy   - 2);
  green     = Math.max(0, green     - 2);

  if (currentMonth >= 12) {
    gameOver = true;
    var title = getTitle();
    updateUI();
    showEndScreen("🎉 Year Complete!", 'You earned the title: "' + title + '"');
    return;
  }

  currentMonth++;
  decisionsLeft = 3;
  document.getElementById("message").innerText = "📅 Month " + currentMonth + " begins!";
  updateUI();
}

function restartGame() {
  happiness = 50;
  health    = 50;
  economy   = 50;
  green     = 50;
  currentMonth  = 1;
  decisionsLeft = 3;
  gameOver      = false;
  countCampus   = 0;
  countHospital = 0;
  countTransport = 0;
  countSustain  = 0;

  hideAllBuildings();
  document.getElementById("endScreen").style.display = "none";
  document.getElementById("message").innerText = "🔄 Game restarted! Good luck.";

  var buttons = document.querySelectorAll(".btn-row button");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].disabled = false;
  }

  updateUI();
}

function buildTransport() {
  if (!spendDecision()) return;
  happiness += 8;
  economy   += 6;
  health    += 2;
  green     -= 3;
  countTransport++;
  showAndCount("flat1", "badge-flat", countTransport);
  showAndCount("flat2", "badge-flat", countTransport);
  showAndCount("flat3", "badge-flat", countTransport);
  document.getElementById("message").innerText = "🚆 Transport improved!";
  updateUI();
}

function buildHospital() {
  if (!spendDecision()) return;
  health    += 12;
  happiness += 4;
  economy   -= 4;
  green     += 2;
  countHospital++;
  showAndCount("hpt", "badge-hpt", countHospital);
  document.getElementById("message").innerText = "🏥 Hospital built!";
  updateUI();
}

function buildCampus() {
  if (!spendDecision()) return;
  happiness += 6;
  economy   += 8;
  health    += 2;
  green     -= 2;
  countCampus++;
  showAndCount("rc", "badge-rc", countCampus);
  document.getElementById("message").innerText = "🎓 Campus opened!";
  updateUI();
}

function buildSustainability() {
  if (!spendDecision()) return;
  green     += 12;
  health    += 4;
  happiness += 3;
  economy   -= 3;
  countSustain++;
  showAndCount("tree1", "badge-tree", countSustain);
  showAndCount("tree2", "badge-tree", countSustain);
  showAndCount("tree3", "badge-tree", countSustain);
  document.getElementById("message").innerText = "♻️ Sustainability project launched!";
  updateUI();
}
