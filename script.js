function setup() {
    createPixelCanvas(DEFAULT_PIXELS_PER_SIDE);
    bindButtons();
}

function createPixelCanvas(pixels_per_side) {
    newPixelCanvas(pixels_per_side);
    bindPixelHovers();
    updateGap(calculateGap(pixels_per_side));
}

function getWindowHeight() {
    return document.documentElement.clientHeight;
}

function calculateGap(pixels_per_side) {
    const wrapper_side_length = document.querySelector(".pixel-wrapper").clientWidth;
    const GAPS = pixels_per_side + 1;

    const wrapper_by_pixel_widths = pixels_per_side + (GAPS * PIXEL_TO_GAP_PERCENT);
    const pixel_width = (wrapper_side_length / wrapper_by_pixel_widths);
    const gap_width = pixel_width * PIXEL_TO_GAP_PERCENT;

    const GAP_UNITS = `${100 * Math.max(gap_width, 1) / getWindowHeight()}vh`;
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

function bindButtons() {
    const update_button = document.querySelector("#update-pixel-canvas");

    update_button.addEventListener("click", updatePixelSides);
}

function updatePixelSides() {
    const new_pixel_sides = Number(prompt("How many pixels per side?"));
    if (new_pixel_sides === NaN || new_pixel_sides <= 0) return;

    if (new_pixel_sides > 100) {
        alert("Pixel side is too big, doing nothing...");
        return;
    }

    createPixelCanvas(new_pixel_sides);
}

function newPixelCanvas(pixels_per_side) {
    const wrapper = document.querySelector(".pixel-wrapper");
    wrapper.textContent = "";
    
    const row_wrapper = document.createElement("div");
    row_wrapper.classList.add("row-wrapper");
    
    const pixel = document.createElement("div");
    pixel.classList.add("pixel");
    for (let i=0; i<pixels_per_side; i++) {
        const new_pixel = pixel.cloneNode();
        row_wrapper.appendChild(new_pixel);
    }

    for (let j=0; j<pixels_per_side; j++) {
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
