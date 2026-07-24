    export function scrollToHashOrTop(hash) {
    if (hash) {
        const id = hash.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
        setTimeout(
            () => el.scrollIntoView({ behavior: "smooth", block: "start" }),
            100
        );
        return;
        }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }