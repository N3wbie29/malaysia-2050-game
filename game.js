let happiness = 50;
let health = 50;
let economy = 50;
let green = 50;

function updateUI() {
  document.getElementById("happy").innerText = happiness;
  document.getElementById("health").innerText = health;
  document.getElementById("eco").innerText = economy;
  document.getElementById("green").innerText = green;
  if (happiness >= 70) {
  document.getElementById("tower").style.display = "block";
}
}

function buildTransport() {
  happiness += 10;
  economy += 5;
  document.getElementById("message").innerText = "Transport improved!";
  updateUI();
}

function buildHospital() {
  health += 15;
  economy -= 5;
  document.getElementById("message").innerText = "Hospital built!";
  updateUI();
}

function buildCampus() {
  happiness += 5;
  economy += 5;
  document.getElementById("message").innerText = "Campus opened!";
  updateUI();
}

function buildPark() {
  green += 15;
  document.getElementById("message").innerText = "Eco park created!";
  updateUI();
}
