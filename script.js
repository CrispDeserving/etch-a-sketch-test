function addPixels() {
    const wrapper = document.querySelector(".wrapper");
    
    const row_wrapper = document.createElement("div");
    row_wrapper.classList.add("row-wrapper");
    
    const pixel = document.createElement("div");
    pixel.classList.add("pixel");
    for (let i=0; i<COLUMNS; i++) {
        const new_pixel = pixel.cloneNode();
        row_wrapper.appendChild(new_pixel);
    }

    for (let j=0; j<ROWS; j++) {
        const new_wrapper = row_wrapper.cloneNode(true);
        wrapper.appendChild(new_wrapper);
    }
}
