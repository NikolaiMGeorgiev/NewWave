function Item(name, price, img, id) {
    this.name = name;
    this.price = price;
    this.img = img;
    this.qty = 1;
    this.id = id;
}

const items = [
    new Item("Shirt oldschool", 19.99, "img/men/t_shirts/oldschool2_sh.jpg", 0),
    new Item("T-Shirt with skull", 24.99, "img/men/t_shirts/skull_t.jpg", 1),
    new Item("Black liquid T-Shirt", 24.99, "img/men/t_shirts/black_liq_t.jpg", 2),
    new Item("Floral Shirt", 19.99, "img/men/t_shirts/floral_sh.jpg", 3),
    new Item("T-Shirt with rose nd print", 24.99, "img/men/t_shirts/romance_t.jpg", 4),
    new Item("T-Shirt with print", 19.99, "img/men/t_shirts/game_t.jpg", 5),
    new Item("T-Shirt with undershirt effect", 19.99, "img/men/t_shirts/oversized_b_t.jpg", 6),
    new Item("T-Shirt with print", 24.99, "img/men/t_shirts/mountain_t.jpg", 7)];

function Cart() {
    this.sum = 0;
    this.items = [];
}

Cart.prototype.add = function (item) {
    if (!this.hasItem(item.id)) {
        this.items.push(item);
        //Number.parseFloat ... toFixed(2)
        this.sum = parseFloat(this.sum) + item.price;

        updateSum(this.sum);
        showItem(item);
    } else {
        alert("Item already added to cart");
    }
};

Cart.prototype.hasItem = function (id) {
    for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].id === id) {
            return true;
        }
    }

    return false;
};

Cart.prototype.delete = function (item) {
    for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].id === item) {
            this.sum -= this.items[i].price;
            this.sum = this.sum.toFixed(2);
            this.items.splice(i, 1);
            document.getElementById("purchase").removeChild(document.getElementById("product" + item));
            break;
        }
    }

    updateSum(this.sum);
    localStorage.setItem("cart", dataToString(this.items));
};

let cartData = localStorage.getItem("cart");
let cart = new Cart();
let dataArray = [];

if (cartData !== null) {
    dataArray = dataToArray(cartData);

    window.onload = function () {
        for (let i = 0; i < dataArray.length; i++) {
            addToCart(dataArray[i].id);
        }
    }
}

function dataToArray(data) {
    let result = [];
    let item;
    let qty = -1;
    let id = -1;

    for (let i = 0; i < data.length; i++) {
        id = build(data, i);
        i += id.length + 1;
        qty = build(data, i);
        i += qty.length;

        if (id > -1 && qty > 0) {
            item = items[parseInt(id)];
            item.qty = parseInt(qty);
            result.push(item);
        }
    }

    return result;
}

function build(data, i) {
    let result = "";
    while (data[i] !== ',' && data[i] !== '\n') {
        result += data[i];
        i++;
    }

    return result;
}

function dataToString(data) {
    let result = "";

    for (let i = 0; i < data.length; i++) {
        result += data[i].id + "," + data[i].qty + "\n";
    }

    return result;
}

function addToCart(id) {
    cart.add(items[id]);
    localStorage.setItem("cart", dataToString(cart.items));
}

function showItem(item) {
    let node = document.createElement("DIV");
    let inner = document.createElement("DIV");
    let name = document.createElement("P");
    let quantity = document.createElement("P");
    let btnRemove = document.createElement("BUTTON");
    quantity.innerText = "Quantity: " + item.qty;
    btnRemove.innerText = "Remove";
    btnRemove.onclick = function () {
        cart.delete(item.id);
    };
    name.innerText = item.name;
    let price = document.createElement("P");
    price.innerHTML = "Price: " + item.price + "lv";
    let img = document.createElement("IMG");
    img.src = item.img;
    inner.appendChild(name);
    inner.appendChild(price);
    inner.appendChild(quantity);
    inner.appendChild(btnRemove);
    node.appendChild(inner);
    node.appendChild(img);
    node.setAttribute("id", "product" + item.id);
    document.getElementById("purchase").appendChild(node);
}

function updateSum(sum) {
    document.getElementById("sum").innerText = sum;
}

function openSidebar() {
    document.getElementById("sidebar").style.display = "flex";
}

function closeSidebar() {
    document.getElementById("sidebar").style.display = "none";
}

function showCart() {
    document.getElementById("cart").style.display = "block";
}

function hideCart() {
    document.getElementById("cart").style.display = "none";
}

let previouslyClicked = null;

function showCategory(category) {
    if (previouslyClicked != null) {
        previouslyClicked.style.color = "grey";
        previouslyClicked.style.fontWeight = "normal";
    }

    previouslyClicked = document.getElementById(category);
    previouslyClicked.style.color = "#cc0000";
    previouslyClicked.style.fontWeight = "bold";

    let shop = document.getElementById("shop");
    let items = shop.getElementsByClassName("item");

    if (category !== "all") {
        for (let i = 0; i < items.length; i++) {
            if (!items[i].classList.contains(category)) {
                items[i].style.display = "none";
            } else {
                items[i].style.display = "block";
            }
        }
    } else {
        for (let i = 0; i < items.length; i++) {
            items[i].style.display = "block";
        }
    }
}