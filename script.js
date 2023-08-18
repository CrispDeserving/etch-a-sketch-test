const ELEMENTS = 16;

window.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.querySelector(".wrapper");
    
    const pixel = document.createElement("div");
    pixel.classList.add("pixel");

    for (let i=0; i<ELEMENTS; i++) {
        const new_pixel = pixel.cloneNode();
        wrapper.appendChild(new_pixel);
    }
});
