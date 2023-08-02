// Select required elements from the DOM
const currentTime = document.querySelector("h1"),
    content = document.querySelector(".content"),
    selectMenu = document.querySelectorAll("select"),
    setAlarmBtn = document.querySelector("button");

let alarmTime, isAlarmSet,
    ringtone = new Audio("./files/Audio.mp3");

// Generate options for selecting hours (12-hour format)
for (let i = 12; i > 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

// Generate options for selecting minutes
for (let i = 59; i >= 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

// Generate options for selecting AM/PM
for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

// Update the current time every second
setInterval(() => {
    let date = new Date(),
        h = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds(),
        ampm = "AM";

    // Convert hours to 12-hour format and set AM/PM accordingly
    if (h >= 12) {
        h = h - 12;
        ampm = "PM";
    }
    h = h == 0 ? h = 12 : h;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    // Display the formatted time with AM/PM
    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

    // Check if the alarm time matches the current time and play the ringtone
    if (alarmTime === `${h}:${m} ${ampm}`) {
        ringtone.play();
        ringtone.loop = true;
    }
});

// Function to set or clear the alarm
function setAlarm() {
    if (isAlarmSet) {
        alarmTime = "";
        ringtone.pause();
        content.classList.remove("disable");
        setAlarmBtn.innerText = "Set Alarm";
        return isAlarmSet = false;
    }

    // Get the selected time from the dropdowns
    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;

    // Check if a valid time is selected to set the alarm
    if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
        return alert("Please, select a valid time to set Alarm!");
    }

    // Set the alarm time and update the UI
    alarmTime = time;
    isAlarmSet = true;
    content.classList.add("disable");
    setAlarmBtn.innerText = "Clear Alarm";
}

// Add click event listener to the "Set Alarm" button
setAlarmBtn.addEventListener("click", setAlarm);
