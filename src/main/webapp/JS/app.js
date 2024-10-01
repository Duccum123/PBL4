

// Kết nối WebSocket
const ws = new WebSocket("ws://localhost:8080/demo/chat");
ws.onopen = function () {
    console.log("WebSocket is open now.");
};
ws.onmessage = function (event) {
    let listChairHold = JSON.parse(event.data);
    const Chairs = document.querySelectorAll(".item-square");

    Chairs.forEach(tmp => {
        const style = window.getComputedStyle(tmp);
        for (let i = 0; i < listChairHold.length; i++) {           
            if(tmp.id == listChairHold[i]) {
                setTimeout(function () {
                    tmp.style.backgroundColor = "rgb(196, 196, 196)";
                },300);
                tmp.style.cursor = "not-allowed";
            }
        }
    });
};


function GoNextPage() {
    let chairHold = [];
    const Chairs = document.querySelectorAll(".item-square");
    Chairs.forEach(tmp => {
        const style = window.getComputedStyle(tmp);
        if(style.backgroundColor === "rgb(245, 148, 92)" && tmp.id !== "") {
            chairHold.push(tmp.id);
        }
    });
    console.log(chairHold);
    ws.send(JSON.stringify(chairHold));
    window.location.href = "reviewbooking.jsp";
}

