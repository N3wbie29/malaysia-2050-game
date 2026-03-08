let happiness = 50;
let health = 50;
let economy = 50;
let sustainability = 50;
let population = 0;

let currentMonth = 1;
let decisionsLeft = 3;
let gameOver = false;
let CenterBuilt = false;

let countFlat = 0;
let countHospital = 0;
let countTree = 0;
let countCompany = 0;
let countResearchCenter = 0;

function showBuilding(id) {
  var el = document.getElementById(id);
  if (el) {
    el.style.display = "block";
    el.style.opacity = "0";
    setTimeout(function() { el.style.opacity = "1"; }, 10);
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

function updateUI() {
  document.getElementById("happy").innerText = happiness;
  document.getElementById("health").innerText = health;
  document.getElementById("eco").innerText = economy;
  document.getElementById("stn").innerText = sustainability;
  document.getElementById("month").innerText = currentMonth;
  document.getElementById("decisions").innerText = decisionsLeft;
  document.getElementById("pop").innerText = population;

  document.getElementById("CountFlat").innerText = countFlat;
  document.getElementById("CountHospital").innerText = countHospital;
  document.getElementById("CountCompany").innerText = countCompany;
  document.getElementById("CountTree").innerText = countTree;
  document.getElementById("CountResearchCenter").innerText = countResearchCenter;

  document.getElementById("bar-happy").style.width = happiness + "%";
  document.getElementById("bar-health").style.width = health + "%";
  document.getElementById("bar-eco").style.width = economy + "%";
  document.getElementById("bar-sus").style.width = sustainability + "%";
  document.getElementById("bar-month").style.width = (currentMonth / 12 * 100) + "%";
  document.getElementById("bar-pop").style.width = population + "%";

  updateBarColor("bar-happy", happiness);
  updateBarColor("bar-health", health);
  updateBarColor("bar-eco", economy);
  updateBarColor("bar-sus", sustainability);

  checkRCConditions();
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

function getTitle() {
  var max = Math.max(happiness, health, economy, sustainability);
  var min = Math.min(happiness, health, economy, sustainability);

  if (max - min <= 15) return "Symphony of Harmony";
  if (happiness == max) return "Symphony of Joy";
  if (health == max)    return "Symphony of Vitality";
  if (economy == max)   return "Symphony of Wealth";
  if (sustainability == max)     return "Symphony of Eternity";

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

  if (happiness <= 0 || health <= 0 || economy <= 0 || sustainability <= 0) {
    gameOver = true;
    var stat = "a stat";
    if (happiness <= 0) stat = "Happiness";
    if (health <= 0)    stat = "Health";
    if (economy <= 0)   stat = "Economy";
    if (sustainability <= 0)     stat = "Environment";
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
    setTimeout(() => nextMonth(), 800); 
  }
  return true;
}

function nextMonth() {
  if (gameOver) return;

  
  happiness = Math.max(0, happiness - 3);
  health    = Math.max(0, health    - 2);
  economy   = Math.max(0, economy   - 2);
  sustainability     = Math.max(0, sustainability - 3);

  
  if (currentMonth >= 12) {
    gameOver = true;
    var title = getTitle();
    updateUI();
    showEndScreen("🎉 Year Complete!", 'You earned the title: "' + title + '"');
    return;
  }
  currentMonth++;
  decisionsLeft = 3;
  if (CenterBuilt){
    giveCenterBonus();
  }
  document.getElementById("message").innerText = `📅 Month ${currentMonth} begins. You have 3 decisions.`;
  updateUI();
}

function restartGame() {
  happiness = 50;
  health = 50;
  economy = 50;
  sustainability = 50;
  currentMonth = 1;
  decisionsLeft = 3;
  gameOver = false;
  CenterBuilt = false;
  countFlat   = 0;
  countHospital = 0;
  countCompany = 0;
  countTree  = 0;
  countResearchCenter = 0;
  population = 0;

  hideAllBuildings();
  document.getElementById("endScreen").style.display = "none";
  document.getElementById("message").innerText = "🔄 Game restarted! Good luck.";

  var buttons = document.querySelectorAll(".btn-row button");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].disabled = false;
  }

  updateUI();
}

function buildFlat() {
  if (!spendDecision()) return;
  happiness += 10;
  economy -= 7;
  population += 10;
  countFlat++;
  showBuilding("flat1", "badge-flat", countFlat);
  showBuilding("flat2", "badge-flat", countFlat);
  showBuilding("flat3", "badge-flat", countFlat);
  document.getElementById("message").innerText = "Flat built!";
  updateUI();
}

function buildHospital() {
  if (!spendDecision()) return;
  health += 12;
  economy -= 5;
  happiness += 5;
  countHospital++;
  showBuilding("hpt");
  document.getElementById("message").innerText = "Hospital built!";
  updateUI();
}

function buildTree() {
  if (!spendDecision()) return;
  sustainability += 7;
  happiness += 3;
  economy -= 5;
  countTree++;
  showBuilding("tree1");
  showBuilding("tree2");
  showBuilding("tree3");
  document.getElementById("message").innerText = "Sustainability project launched!";
  updateUI();
}

function buildCompany() {
  if (!spendDecision()) return;
  economy += 20;
  happiness -= 10;
  health -= 5;
  countCompany++;
  showBuilding("cpy");
  document.getElementById("message").innerText = "New company invested!";
  updateUI();
}

function checkRCConditions() {
  if(CenterBuilt){
      document.getElementById('rcBtn').classList.remove('show');
      return;
  }
    let peopleExist = parseInt(document.getElementById('pop').innerText);
    let btn = document.getElementById('rcBtn');

    // Condition: Show button only if population is 20 or higher
    if (peopleExist >= 20) {
        document.getElementById('rcBtn').classList.add('show');    
      } 
}

function buildResearchCenter() {
  if (!spendDecision()) return;

  CenterBuilt = true;
  countResearchCenter += 1;
  showBuilding("rc");
  document.getElementById("message").innerText = "Research_center invested! It will give random stat every month!";
  updateUI();
}

function giveCenterBonus() {

  let stats = ["happy", "eco", "stn", "health"];
  let randomStat = stats[Math.floor(Math.random() * stats.length)];

  let messageCenter = "";

  if (randomStat === "happy") {
    happiness += 10;
    messageCenter = "Citizens feel happier! +10 Happiness 😊";
  } 
  else if (randomStat === "eco") {
    economy += 10;
    messageCenter = "Businesses are booming! +10 Economy 📈";
  } 
  else if (randomStat === "stn") {
    sustainability += 10;
    messageCenter = "City becomes more sustainable! +10 Sustainability 🌱";
  } 
  else if (randomStat === "health") {
    health += 10;
    messageCenter = "Healthcare improves! +10 Health 🏥";
  }

  updateUI();

  alert(messageCenter);
}
