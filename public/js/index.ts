const getImageDescription = (imageType: string) => {
    if (imageType === 'BMP') {
        return 'The BMP file format, also known as bitmap image file, device independent bitmap (DIB) file format and bitmap, is a raster graphics image file format used to store bitmap digital images, independently of the display device (such as a graphics adapter), especially on Microsoft Windows and OS/2 operating systems.';
    }
    if (imageType === 'GIF') {
        return 'The Graphics Interchange Format (GIF; /ɡɪf/ GHIF or /dʒɪf/ JIF, see pronunciation) is a bitmap image format that was developed by a team at the online services provider CompuServe led by American computer scientist Steve Wilhite and released on 15 June 1987. It has since come into widespread usage on the World Wide Web due to its wide support and portability between applications and operating systems.';
    }
    if (imageType === 'JPEG') {
        return 'JPEG (/ˈdʒeɪpɛɡ/ JAY-peg) is a commonly used method of lossy compression for digital images, particularly for those images produced by digital photography. The degree of compression can be adjusted, allowing a selectable tradeoff between storage size and image quality. JPEG typically achieves 10:1 compression with little perceptible loss in image quality. Since its introduction in 1992, JPEG has been the most widely used image compression standard in the world, and the most widely used digital image format, with several billion JPEG images produced every day as of 2015.';
    }
    if (imageType === 'PNG') {
        return 'Portable Network Graphics (PNG, officially pronounced /pɪŋ/ PING, sometimes pronounced /ˌpiːɛnˈdʒiː/ PEE-en-JEE) is a raster-graphics file format that supports lossless data compression. PNG was developed as an improved, non-patented replacement for Graphics Interchange Format (GIF) — unofficially, the initials PNG stood for the recursive acronym "PNG\'s not GIF\'s".';
    }
    if (imageType === 'TIFF') {
        return 'Tag Image File Format, abbreviated TIFF or TIF, is an image file format for storing raster graphics images, popular among graphic artists, the publishing industry, and photographers. TIFF is widely supported by scanning, faxing, word processing, optical character recognition, image manipulation, desktop publishing, and page-layout applications. The format was created by the Aldus Corporation for use in desktop publishing. It published the latest version 6.0 in 1992, subsequently updated with an Adobe Systems copyright after the latter acquired Aldus in 1994. Several Aldus or Adobe technical notes have been published with minor extensions to the format, and several specifications have been based on TIFF 6.0, including TIFF/EP (ISO 12234-2), TIFF/IT (ISO 12639), TIFF-F (RFC 2306) and TIFF-FX (RFC 3949).';
    }
    return 'Unknown image type';
}

const fromExt = <HTMLSelectElement>document.querySelector("select#from-ext");
const toExt = <HTMLSelectElement>document.querySelector("select#to-ext");
const fileInput = <HTMLInputElement>document.querySelector("input#image");
const convertButton = <HTMLButtonElement>document.querySelector("button#convert-button");

const descriptionSection = <HTMLElement>document.querySelector("section#image-type-description");
const fromTypeArticle = <HTMLElement>document.querySelector("article#from-type-description");
const toTypeArticle = <HTMLElement>document.querySelector('article#to-type-description');

fromExt.addEventListener("change", () => {
    const fromExtValue = fromExt.value;
    fileInput.accept = `.${fromExtValue.toLowerCase()}`;

    const toExtOptions = toExt.querySelectorAll("option");
    toExtOptions.forEach((option: HTMLOptionElement): void => {
        if (option.value !== '--Choose image type--') {
            option.disabled = option.value === fromExtValue;
        }
    });
    toExt.disabled = false;
    toExt.focus();
    toExt.classList.add('cursor-pointer');

    descriptionSection.classList.remove('hidden');
    descriptionSection.classList.add(...['flex', 'flex-row', 'p-5', 'w-full', 'bg-[#EBE0D0]', 'gap-3']);

    const fromDescriptionH2 = <HTMLHeadingElement>document.querySelector('h2#from-description-h2');
    const fromDescriptionP = <HTMLParagraphElement>document.querySelector('p#from-description-p');
    fromDescriptionH2.innerText = fromExtValue;
    fromDescriptionP.innerText = getImageDescription(fromExtValue);

});

toExt.addEventListener("change", () => {
    const fromExtOptions = fromExt.querySelectorAll("option");
    fromExtOptions.forEach((option: HTMLOptionElement): void => {
        if (option.value !== '--Choose image type--') {
            option.disabled = option.value === toExt.value;
        }
    });

    fileInput.disabled = false;
    fileInput.focus();
    fileInput.classList.add('cursor-pointer');

    toTypeArticle.classList.remove('hidden');
    toTypeArticle.classList.add(...['break-words', 'w-1/2']);

    const toDescriptionH2 = <HTMLHeadingElement>document.querySelector('h2#to-description-h2');
    const toDescriptionP = <HTMLParagraphElement>document.querySelector('p#to-description-p');
    toDescriptionH2.innerText = toExt.value;
    toDescriptionP.innerText = getImageDescription(toExt.value);
});

fileInput.addEventListener("change", () => {
    convertButton.disabled = false;
    convertButton.focus();
    convertButton.classList.remove(...['text-gray-500', 'bg-gray-100', 'border-gray-500']);
    convertButton.classList.add(...['cursor-pointer', 'border', 'border-black', 'hover:bg-white', "hover:text-black"]);
});

const closeFlashMsg = <HTMLSpanElement>document.querySelector('span#close-flash-msg');
const flashMsg = <HTMLElement>document.querySelector('section#flash-msg');

closeFlashMsg?.addEventListener('click', (): void => {
    flashMsg.classList.remove(...['flex', 'absolute', 'top-2', 'gap-x-3', 'bg-red-200', 'bg-[#EC9EC0]', 'rounded', "p-2", 'border', 'border-red-200', 'border-[#EC9EC0]']);
    flashMsg.classList.add('hidden');
});
