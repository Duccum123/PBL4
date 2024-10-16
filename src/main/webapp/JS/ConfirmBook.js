



// Kết nối WebSocket
const ws = new WebSocket("ws://localhost:8080/demo/hello");
ws.onopen = function () {
    console.log("WebSocket is open now.");
};

ws.onerror = function(error) {
  console.error('Không thể kết nối tới WebSocket endpoint:', error);
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


const buttonContinues = document.querySelectorAll(".confirmbook");
console.log(buttonContinues);
buttonContinues.forEach(buttonContinue => {
	buttonContinue.addEventListener('click', function() {
		console.log("aa");
		fetch('confirmbook',{
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			
		})
		.then(response => {
			if(!response.ok) console.log("LỖIIII");
			return response.text()
		})
		.then(data => {
			console.log(data);
			if(data === "ok") {
				// chuyển trang
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
				// truyền ghế vào url....
				window.location.href = "reviewbooking.jsp";
			}
		})
		.catch(error => {
			console.log(error);
		})
	});
});