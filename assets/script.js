

let btnAdd = document.querySelectorAll(".btn-primary");
let BasketCount = document.getElementById("countbasket");
btnAdd.forEach(btn => {
    btn.addEventListener("click", function (e) {
        e.preventDefault();
        let id = btn.parentNode.getAttribute("data-id");
        if (localStorage.getItem("basket") == null) {
            localStorage.setItem("basket", JSON.stringify([]))
        }
        let basketArr = JSON.parse(localStorage.getItem("basket"));
        let existBasket = basketArr.find(f => f.id == id)

        if (existBasket == undefined) {
            basketArr.push({
                id: id,
                imgUrl: btn.parentNode.previousElementSibling.getAttribute("src"),
                name: btn.parentNode.firstElementChild.innerText,
                price: btn.previousElementSibling.innerText,
                count: 1
            })
        }
        else {
            existBasket.count++;
        }

        localStorage.setItem("basket", JSON.stringify(basketArr));
        CaculateCount();

    })

})

function CaculateCount() {
    if (localStorage.getItem("basket") != null) {
        let arr = JSON.parse(localStorage.getItem("basket"));
        BasketCount.innerText = arr.length

    }
}

CaculateCount();


