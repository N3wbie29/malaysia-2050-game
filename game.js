let happiness = 50;
let health = 50;
let economy = 50;
let green = 50;

let currentMonth = 1;
let decisionsLeft = 3;
let gameOver = false;


const buildCount = { campus: 0, hospital: 0, transport: 0, park: 0 };


function showAndCount(imgId, badgeId, count) {
  const img = document.getElementById(imgId);
  const badge = document.getElementById(badgeId);
  if (img) img.style.display = "block";
  if (badge) {
    if (count > 1) {
      badge.innerText = "x" + count;
      badge.style.display = "block";
    }
  }
}

function hideAllBuildings() {
  ["rc","cpy","hpt","flat1","flat2","flat3","tree1","tree2","tree3"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });
  ["badge-rc","badge-cpy","badge-hpt","badge-flat","badge-tree"].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.style.display = "none"; el.innerText = ""; }
  });
  buildCount.campus = 0;
  buildCount.hospital = 0;
  buildCount.transport = 0;
  buildCount.park = 0;
}

function updateUI() {
  document.getElementById("happy").innerText = happiness;
  document.getElementById("health").innerText = health;
  document.getElementById("eco").innerText = economy;
  document.getElementById("green").innerText = green;
  document.getElementById("month").innerText = currentMonth;
  document.getElementById("decisions").innerText = decisionsLeft;
  checkWinLose();
}

function getTitle() {
  const stats = { happiness, health, economy, green };
  const max = Math.max(...Object.values(stats));
  const min = Math.min(...Object.values(stats));
  if (max - min <= 15) return "Symphony of Harmony";
  const dominant = Object.keys(stats).find(k => stats[k] === max);
  switch (dominant) {
    case "happiness": return "Symphony of Joy";
    case "health":    return "Symphony of Vitality";
    case "economy":   return "Symphony of Wealth";
    case "green":     return "Symphony of Eternity";
    default:          return "Symphony of Harmony";
  }
}

function checkWinLose() {
  if (gameOver) return;

  if (happiness <= 0 || health <= 0 || economy <= 0 || green <= 0) {
    gameOver = true;
    const stat = happiness <= 0 ? "Happiness" : health <= 0 ? "Health" : economy <= 0 ? "Economy" : "Environment";
    document.getElementById("message").innerText = `💀 GAME OVER! ${stat} collapsed after ${currentMonth} month(s).`;
    document.getElementById("restartBtn").style.display = "inline";
    document.querySelectorAll("button:not(#restartBtn)").forEach(btn => btn.disabled = true);
    return;
  }

  if (currentMonth > 12) {
    gameOver = true;
    const title = getTitle();
    document.getElementById("message").innerText = `🎉 Year complete! You earned the title: "${title}"`;
    document.getElementById("restartBtn").style.display = "inline";
    document.querySelectorAll("button:not(#restartBtn)").forEach(btn => btn.disabled = true);
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
  green     = Math.max(0, green     - 3);

  
  if (currentMonth >= 12) {
    gameOver = true;
    const title = getTitle();
    document.getElementById("message").innerText = `🎉 Year complete! You earned the title: "${title}"`;
    document.getElementById("restartBtn").style.display = "inline";
    document.querySelectorAll("button:not(#restartBtn)").forEach(btn => btn.disabled = true);
    updateUI();
    return;
  }

  currentMonth++;
  decisionsLeft = 3;
  document.getElementById("message").innerText = `📅 Month ${currentMonth} begins. You have 3 decisions.`;
  updateUI();
}

function restartGame() {
  happiness = 50;
  health = 50;
  economy = 50;
  green = 50;
  currentMonth = 1;
  decisionsLeft = 3;
  gameOver = false;
  hideAllBuildings();
  document.getElementById("message").innerText = "🔄 Game restarted! Good luck.";
  document.getElementById("restartBtn").style.display = "none";
  document.querySelectorAll("button").forEach(btn => btn.disabled = false);
  updateUI();
}

function buildTransport() {
  if (!spendDecision()) return;
  happiness += 5;
  economy += 10;
  green -+ 10;
  buildCount.transport++;
  showAndCount("flat1", "badge-flat", buildCount.transport);
  showAndCount("flat2", "badge-flat", buildCount.transport);
  showAndCount("flat3", "badge-flat", buildCount.transport);
  document.getElementById("message").innerText = "Transport improved!";
  updateUI();
}

function buildHospital() {
  if (!spendDecision()) return;
  health += 15;
  economy -= 5;
  green -= 5;
  buildCount.hospital++;
  showAndCount("hpt", "badge-hpt", buildCount.hospital);
  document.getElementById("message").innerText = "Hospital built!";
  updateUI();
}

function buildCampus() {
  if (!spendDecision()) return;
  happiness += 5;
  economy += 5;
  green -= 10;
  buildCount.campus++;
  showAndCount("rc", "badge-rc", buildCount.campus);
  document.getElementById("message").innerText = "Campus opened!";
  updateUI();
}

function buildSustainability() {
  if (!spendDecision()) return;
  green += 15;
  happiness += 10;
  buildCount.park++;
  showAndCount("tree1", "badge-tree", buildCount.park);
  showAndCount("tree2", "badge-tree", buildCount.park);
  showAndCount("tree3", "badge-tree", buildCount.park);
  document.getElementById("message").innerText = "Sustainability project launched!";
  updateUI();
}
