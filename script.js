const layout = document.querySelector(".layout");
const boxes = document.querySelectorAll(".box");

let lockedBox = null;

/* -----------------------------
   HOVER (DESKTOP)
----------------------------- */
boxes.forEach(box => {
  box.addEventListener("mouseenter", () => {
    if (lockedBox) return;
    layout.classList.add("active");
    box.classList.add("active");
  });

  box.addEventListener("mouseleave", () => {
    if (lockedBox) return;
    layout.classList.remove("active");
    box.classList.remove("active");
  });
});

/* -----------------------------
   CLICK / TAP TO LOCK (MOBILE)
----------------------------- */
boxes.forEach(box => {
  box.addEventListener("click", e => {
    e.stopPropagation();

    // If clicking the same box → unlock
    if (lockedBox === box) {
      unlock();
      return;
    }

    lock(box);
  });
});

/* -----------------------------
   CLICK OUTSIDE TO UNLOCK
----------------------------- */
document.addEventListener("click", () => {
  unlock();
});

/* -----------------------------
   FUNCTIONS
----------------------------- */
function lock(box) {
  unlock();
  lockedBox = box;
  layout.classList.add("active");
  box.classList.add("active");
}

function unlock() {
  layout.classList.remove("active");
  boxes.forEach(b => b.classList.remove("active"));
  lockedBox = null;
}
