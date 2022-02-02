const fromExt = <HTMLSelectElement>document.querySelector("select#from-ext");
const toExt = <HTMLSelectElement>document.querySelector("select#to-ext");
const fileInput = <HTMLInputElement>document.querySelector("input#image");
const convertButton = <HTMLButtonElement>document.querySelector("button#convert");

const descriptionSection = <HTMLDivElement>document.querySelector("section#image-type-description");
const fromTypeArticle = <HTMLDivElement>document.querySelector("article#from-type-description");
const toTypeArticle = <HTMLDivElement>document.querySelector('article#to-type-description');

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
    toExt.focus();
    toExt.classList.add('cursor-pointer');
    const toExtLabel = <HTMLLabelElement>document.querySelector("label#to-ext-label");
    toExtLabel.classList.add('cursor-pointer');

    descriptionSection.classList.remove('hidden');
    descriptionSection.classList.add(...['flex', 'flex-row', 'border', 'border-black', 'mt-3', 'p-2']);

    const fromDescriptionH2 = <HTMLHeadingElement>document.querySelector('h2#from-description-h2');
    const fromDescriptionP = <HTMLParagraphElement>document.querySelector('p#from-description-p');
    fromDescriptionH2.innerText = fromExt.value;
    fromDescriptionP.innerText = `Lorem ipsum dolor sit amet consectetur, adipisicing
    elit.Expedita perferendis voluptatum deserunt natus
    iusto quia vitae animi reiciendis.Nihil fugiat suscipit
    vero odit in odio quaerat autem officiis voluptatum,
        tempore possimus eius, unde impedit reiciendis similique
    nostrum repudiandae ipsa dolores sed vitae ut ? Eveniet
    porro laboriosam consequatur voluptate harum eius!`;

});

toExt.addEventListener("change", (): void => {
    const fromExtOptions = fromExt.querySelectorAll("option");
    fromExtOptions.forEach((option: HTMLOptionElement): void => {
        if (option.innerText !== "--Choose image type--") {
            option.disabled = option.value === toExt.value;
        }
    });
    fileInput.disabled = false;
    fileInput.focus();
    fileInput.classList.add('cursor-pointer');
    const fileInputLabel = <HTMLLabelElement>document.querySelector('label#image-label');
    fileInputLabel.classList.add('cursor-pointer');

    toTypeArticle.classList.remove('hidden');

    const toDescriptionH2 = <HTMLHeadingElement>document.querySelector('h2#to-description-h2');
    const toDescriptionP = <HTMLParagraphElement>document.querySelector('p#to-description-p');
    toDescriptionH2.innerText = toExt.value;
    toDescriptionP.innerText = `Lorem ipsum dolor sit amet consectetur, adipisicing
    elit.Expedita perferendis voluptatum deserunt natus
    iusto quia vitae animi reiciendis.Nihil fugiat suscipit
    vero odit in odio quaerat autem officiis voluptatum,
        tempore possimus eius, unde impedit reiciendis similique
    nostrum repudiandae ipsa dolores sed vitae ut ? Eveniet
    porro laboriosam consequatur voluptate harum eius!`;
});

fileInput.addEventListener("change", (): void => {
    convertButton.disabled = false;
    convertButton.focus();
    convertButton.classList.add('cursor-pointer');
});
