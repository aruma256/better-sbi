const TITLE_PORTFOLIO = "ポートフォリオ｜SBI証券";

function is_date_text(text) {
    return text === "--/--/--" || text.match(/^[0-9]{2}\/[0-9]{2}\/[0-9]{2}$/g)
}

function overwrite_text(target, text) {
    if (target.children.length === 0) {
        target.textContent = text;
    } else {
        overwrite_text(target.children[0], text);
    }
}

window.onload = function() {
    if (document.title !== TITLE_PORTFOLIO) {
        return;
    }
    let middleAreaM2 = document.body.getElementsByClassName("middleAreaM2");
    if (middleAreaM2.length !== 1) {
        return;
    }
    middleAreaM2 = middleAreaM2[0];
    for (const tr of middleAreaM2.getElementsByTagName("tr")) {
        let date = null;
        for (let i = 0; i < tr.children.length; i++) {
            const td = tr.children[i];
            if (is_date_text(td.textContent)) {
                date = i;
            } else if (date !== null && date + 6 <= i && i <= date + 9) {
                if (td.textContent.match(/\.[0-9]$/g)) {
                    // xxx.x のケース
                    overwrite_text(td, td.textContent + "0");
                } else if (!td.textContent.match(/\.[0-9]{2}$/g)) {
                    // 整数のケース
                    overwrite_text(td, td.textContent + ".00");
                }
            }
        };
    }
};
