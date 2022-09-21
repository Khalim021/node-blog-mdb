const toCurrency = (price) => {
    return new  Intl.NumberFormat("us-US", {
        currency: 'usd',
        style: 'currency',
    }).format(price)
};

const toDate = (date) => {
    return new Intl.DateTimeFormat("uz-UZ", {
        day: "2-digit",
        month: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",

    }).format(new Date(date));
};

document.querySelectorAll(".price").forEach((s) => {
    s.textContent = toCurrency(s.textContent);
});

document.querySelectorAll(".date").forEach((a) => {
    a.textContent = toDate(s.textContent)
})

const $card = document.querySelector("#card");
if($card) {
    $card.addEventListener("click", (e) => {
        if(e.target.classList.contains("count-remove")) {
            const id = e.target.dataset.id;
            
            fetch("/card/remove/" + id, {
                method: "delete"
            })
            .then((res) => res.json())
            .then((card) => {
                if(card.teslaX.length) {
                    const dynamicHtml = card.teslaX.map((s) => {
                        return`
                        <tr>
                            <td>${s.title}</td>
                            <td>${s.count}</td>
                            <td>
                                <button class="btn btn-danger count-remove" data-id="${s.id}">Delete</button>
                            </td>
                        </tr>
                        
                        `;
                    })
                    .join("");
                    $card.querySelector("tbody").innerHTML = dynamicHtml;
                    $card.querySelector(".price").textContent = toCurrency(card.price);
                } else {
                    $card.innerHTML = "<h4>Basket is Empty</h4>"
                }
            })
        }
    })
}











