var allowedToSend = true;
var isOverButton = false;
function getParameter(parameterName) {
    let parameters = new URLSearchParams(window.location.search);
    return parameters.get(parameterName);
}

/*if (getParameter("fornavn").value === undefined) {
    document.getElementById("vorname").value = "";
}
else if (getParameter("fornavn").value != "") {
    //console.log(getParameter("fornavn"));
    document.getElementById("vorname").value = getParameter("fornavn");
}*/
if (getParameter("omraade").value != "") {
    //console.log(getParameter("omraade"));
    document.getElementById("omraade").value = getParameter("omraade");
}
function setPopup(text) {
    var isOver = false;
    const popup = document.createElement("div");
    popup.className = "bg-underlay";
    popup.innerHTML = '<div class="popup"><div class="popup-inner">' + text + '</div><div id="closer">×</div></div>';
    document.querySelector("body").appendChild(popup);

    setTimeout(function () {
        document.querySelector(".popup").classList.add("opacity");
    }, 0);

    function getOut() {
        document.querySelector(".popup").classList.remove("opacity");
        setTimeout(function () {
            document.querySelector(".bg-underlay").remove();
            allowedToSend = true;
        }, 400);
    }
    document.querySelector("#closer").addEventListener("click", function () {
        getOut();
    });
    document.querySelector(".bg-underlay").addEventListener("click", function () {

        if (!isOver) {
            getOut();
        }
    })
    document.querySelector(".popup").addEventListener("mouseenter", function () {
        isOver = true;
    })
    document.querySelector(".popup").addEventListener("mouseleave", function () {
        isOver = false;
    })
}
document.querySelector("#submit").addEventListener("mouseover", function (event) {
    isOverButton = true;
    });
document.querySelector("#submit").addEventListener("mouseout", function (event) {
    isOverButton = false;
    });    



document.querySelector("#submit").addEventListener("click", function (event) {
    //event.preventDefault();
    if (!allowedToSend) {
        return false;
    }
    if (allowedToSend) {
        allowedToSend = false;
    }
    if (document.querySelector("#form input[name='vorname']").value != ""
            && document.querySelector("#form input[name='nachname']").value != ""
            && document.querySelector("#form input[name='email']").value != ""
        && document.querySelector("#form textarea[name='nachricht']").value != ""
        && document.querySelector("#form select[name='omraade']").value != ""
        && document.querySelector("#form input[name='bdate']").value != ""
        && document.querySelector("#form select[name='tid']").value != ""
    // Her kan du tilføje dine egne obligatoriske felter i henhold til samme skema
            && document.querySelector("#form input[name='pot']").value == ""
            && isOverButton) { // der Honeypot
        const regexMail = /[!#$%&'\*\+\-\/=\?^_`\.{\|}~\w].*@[\w\-\._~]*\.[a-z]{2,}$/g;
        const checkMail = regexMail.test(document.querySelector("#form input[name='email']").value);
        if (checkMail) {
            const data = new FormData(form);

            //data.append("bdate", date("24-12-2025"))
            fetch("mail.php", {// stien til PHP-filen
                method: "POST",
                body: data
            })
                    .then(function () {
                        for (let el of document.querySelectorAll("#form input,#form textarea")) {
                            el.value = "";
                        }
                        setPopup("Tak, e-mail sendt!");
                    })
                    .catch(function () {
                        allowedToSend = true;
                        alert("Fejler");
                    });
        } else {
            setPopup("E-mail er ikke gyldig!");
        }
    } else {

        setPopup("Udfyld venligst de obligatoriske felter!");
    }
});