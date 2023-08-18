function setup() {
    addPixels();
    bindPixelHovers();
    updateGap(calculateGap());
}

function getWindowHeight() {
    return document.documentElement.clientHeight;
}

function calculateGap() {
    const wrapper_side_length = document.querySelector(".pixel-wrapper").clientWidth;
    const GAPS = ROWS + 1;

    const wrapper_by_pixel_widths = ROWS + (GAPS * PIXEL_TO_GAP_PERCENT);
    const pixel_width = (wrapper_side_length / wrapper_by_pixel_widths);
    const gap_width = pixel_width * PIXEL_TO_GAP_PERCENT;

    const GAP_UNITS = `${100 * Math.max(gap_width, 2) / getWindowHeight()}vh`;
    return GAP_UNITS;
}

function updateGap(gap_length) {
    const wrapper = document.querySelector(".pixel-wrapper");
    const row_wrappers = document.querySelectorAll(".row-wrapper");

    wrapper.style["padding"] = gap_length;
    wrapper.style["gap"] = gap_length;
    
    for (let row of row_wrappers) {
        row.style["gap"] = gap_length;
    }
}

function addPixels() {
    const wrapper = document.querySelector(".pixel-wrapper");
    
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

function bindPixelHovers() {
    const pixels = document.querySelectorAll(".pixel");

    for (let pixel of pixels) {
        pixel.addEventListener("mouseenter", (e) => {
            e.target.classList.add("highlight");
        });

        pixel.addEventListener("mouseout", (e) => {
            setTimeout(() => {
                e.target.classList.remove("highlight");
            }, HIGHLIGHT_UNBIND_DELAY);
        });
    }
}
