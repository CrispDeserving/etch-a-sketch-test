function setup() {
    addPixels();
    bindPixelHovers();
    updateGap(calculateGap());
}

function calculateGap() {
    const wrapper_side_length = document.querySelector(".wrapper").clientWidth;

    return wrapper_side_length * GAP_PERCENT;
}

function updateGap(gap_length) {
    const wrapper = document.querySelector(".wrapper");
    const row_wrappers = document.querySelectorAll(".row-wrapper");
    const GAP_UNITS = `${gap_length}px`;

    wrapper.style["padding"] = GAP_UNITS;
    wrapper.style["gap"] = GAP_UNITS;
    
    for (let row of row_wrappers) {
        row.style["gap"] = GAP_UNITS;
    }
}

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
