
export function dialogScrollTop() {

    const dialogEl = document.querySelector(".custom-dialog");
    
    if (dialogEl) {
        dialogEl.scrollTop = 0;
    }
}