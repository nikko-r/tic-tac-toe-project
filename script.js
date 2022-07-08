var r = document.querySelector(":root");
const bDarkLightMode = document.querySelector(".buttons__item--2"); //darkmode button

let colorMode = "dark";
const fnDarkLightMode = () => {
    if (colorMode == "dark") {
        r.style.setProperty("--color-1", "#f1f1f1");
        r.style.setProperty("--color-2", "#272727");
        colorMode = "light";
        bDarkLightMode.innerText = "DARK MODE";
        console.log("Light mode enabled");
        //        console.dir(bDarkLightMode);
    } else if (colorMode == "light") {
        r.style.setProperty("--color-2", "#f1f1f1");
        r.style.setProperty("--color-1", "#272727");
        colorMode = "dark";
        bDarkLightMode.innerText = "LIGHT MODE";
        console.log("Dark mode enabled");
    }
};
bDarkLightMode.addEventListener("click", fnDarkLightMode);