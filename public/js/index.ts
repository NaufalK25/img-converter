const fromExt = <HTMLSelectElement>document.querySelector("select#from-ext");
const toExt = <HTMLSelectElement>document.querySelector("select#to-ext");
const fileInput = <HTMLInputElement>document.querySelector("input#image");
const convertButton = <HTMLButtonElement>document.querySelector("button#convert");

fromExt.addEventListener("change", (): void => {
    const fromExtValue = fromExt.value;
    fileInput.accept = `.${fromExtValue.toLowerCase()}`;
    const toExtOptions = toExt.querySelectorAll("option");
    toExtOptions.forEach((option: HTMLOptionElement): void => {
        if (option.innerText !== "--Choose image type--") {
            option.disabled = option.value === fromExtValue;
        }
    });
    toExt.disabled = false;
});

toExt.addEventListener("change", (): void => {
    const fromExtOptions = fromExt.querySelectorAll("option");
    fromExtOptions.forEach((option: HTMLOptionElement): void => {
        if (option.innerText !== "--Choose image type--") {
            option.disabled = option.value === toExt.value;
        }
    });
    fileInput.disabled = false;
});

fileInput.addEventListener("change", ():void => {
    convertButton.disabled = false;
});
