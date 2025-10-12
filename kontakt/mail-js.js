var allowedToSend = true;
var isOverButton = false;
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
    if (document.querySelector("#form input[name='fornavn']").value != ""
            && document.querySelector("#form input[name='efternavn']").value != ""
            && document.querySelector("#form input[name='email']").value != ""
            && document.querySelector("#form textarea[name='besked']").value != ""
// Her kan du tilføje dine egne obligatoriske felter i henhold til samme skema
            && document.querySelector("#form input[name='pot']").value == ""
        && isOverButton) { // honningkrukken
        const regexMail = /[!#$%&'\*\+\-\/=\?^_`\.{\|}~\w].*@[\w\-\._~]*\.[a-z]{2,}$/g;
        const checkMail = regexMail.test(document.querySelector("#form input[name='email']").value);
        if (checkMail) {
            const data = new FormData(form);
            fetch("https://jgmolnit.dk/mail.php", {// stien til PHP- filen
                method: "POST",
                body: data
            })
                    .then(function () {
                        for (let el of document.querySelectorAll("#form input,#form textarea")) {
                            el.value = "";
                        }
                        setPopup("Tak, Emailen er sendt!");
                    })
                    .catch(function () {
                        allowedToSend = true;
                        alert("Fejler");
                    });
        } else {
            setPopup("Email ikke valid!");
        }
    } else {

        setPopup("Udfyld venligst de obligatoriske felter!");
    }
}); 