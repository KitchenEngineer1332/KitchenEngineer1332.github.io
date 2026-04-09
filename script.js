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
    // Don't lock/unlock if a contact link was tapped
    if (e.target.closest('.contact-icon')) return;
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

/* -----------------------------
   TOUCH: TAP-TO-EXPAND ICONS
----------------------------- */
const isTouchDevice = matchMedia('(hover: none) and (pointer: coarse)').matches;
if (isTouchDevice) {
  document.querySelectorAll('.contact-icon').forEach(icon => {
    icon.addEventListener('click', e => {
      if (!icon.classList.contains('expanded')) {
        e.preventDefault();
        document.querySelectorAll('.contact-icon.expanded').forEach(i => i.classList.remove('expanded'));
        icon.classList.add('expanded');
      }
    });
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.contact-icon')) {
      document.querySelectorAll('.contact-icon.expanded').forEach(i => i.classList.remove('expanded'));
    }
  });
}

