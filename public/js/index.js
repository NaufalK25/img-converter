const fromExt = document.querySelector("select#from-ext");
const toExt = document.querySelector("select#to-ext");
const fileInput = document.querySelector("input#image");
const convertButton = document.querySelector("button#convert");

fromExt.addEventListener("change", () => {
    const fromExtValue = fromExt.value;
    fileInput.accept = `.${fromExtValue.toLowerCase()}`;
    const toExtOptions = toExt.querySelectorAll("option");
    toExtOptions.forEach((option) => {
        if (option.innerText !== "--Choose image type--") {
            option.disabled = option.value === fromExtValue;
        }
    });
    toExt.disabled = false;
});

toExt.addEventListener("change", () => {
    const fromExtOptions = fromExt.querySelectorAll("option");
    fromExtOptions.forEach((option) => {
        if (option.innerText !== "--Choose image type--") {
            option.disabled = option.value === toExt.value;
        }
    });
    fileInput.disabled = false;
});

fileInput.addEventListener("change", () => {
    convertButton.disabled = false;
});
