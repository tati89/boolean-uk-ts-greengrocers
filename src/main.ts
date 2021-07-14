import "./styles/index.css";

type GroceryItem = {
  id: string;
  name: string;
  price: number;
};

type CartItem = {
  id: string;
  name: string;
  amount: number;
};
const state: {
  groceries: GroceryItem[];
  cart: CartItem[];
} = {
  groceries: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.45,
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.55,
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.75,
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.83,
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 1.7,
    },
    {
      id: "007-bell-pepper",
      name: "bell-pepper",
      price: 0.9,
    },
    {
      id: "008-berry",
      name: "cherry",
      price: 1.9,
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 2.75,
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.83,
    },
  ],
  cart: [],
};

const storeListEl = document.querySelector(".store--item-list");
const cartListEl = document.querySelector(".cart--item-list");

function renderGroceries() {
  for (const item of state.groceries) {
    const listitemEl = createGroceriItem(item);
    storeListEl && storeListEl.append(listitemEl);
  }
}

function createGroceriItem(item: GroceryItem) {
  console.log(item);
  const listitemEl = document.createElement("li");
  const storeItemIconEl = document.createElement("div");
  storeItemIconEl.setAttribute("class", "store--item-icon");

  const buttonEl = document.createElement("button");
  buttonEl.innerText = "Add to cart";

  const imgEl = document.createElement("img");
  imgEl.setAttribute("alt", item.name);
  imgEl.src = `assets/icons/${item.id}.svg`;

  buttonEl.addEventListener("click", function () {
    addItemToCart(item);
    renderCartItems();
  });

  storeItemIconEl.append(imgEl);
  listitemEl.append(storeItemIconEl, buttonEl);

  return listitemEl;
}

function addItemToCart(clickedItem: GroceryItem) {
  let itemIsInCart = false;
  for (const item of state.cart) {
    if (item.id === clickedItem.id) {
      itemIsInCart = true;
      item.amount += 1;
    }
  }

  if (!itemIsInCart) {
    const cartItem = {
      id: clickedItem.id,
      name: clickedItem.name,
      amount: 1,
    };
    state.cart.push(cartItem);
  }
}

function cartItem(item: CartItem) {
  //li
  const cartItemEl = document.createElement("li");
  //img
  const cartImg = document.createElement("img");
  cartImg.setAttribute("class", "cart--item-icon");
  cartImg.setAttribute("alt", item.name);
  cartImg.src = `assets/icons/${item.id}.svg`;

  //p
  const titleEl = document.createElement("p");
  titleEl.innerText = item.name;

  //quantity btn
  const quantityBtnRemove = document.createElement("button");
  quantityBtnRemove.setAttribute("class", "quantity-btn");
  quantityBtnRemove.classList.add("remove-btn");
  quantityBtnRemove.classList.add("center");
  quantityBtnRemove.innerText = "-";

  //span
  const spanEl = document.createElement("span");
  spanEl.setAttribute("class", "quantity-text");
  spanEl.classList.add("center");
  spanEl.innerText = item.amount.toString();

  //quantity btn right
  const quantityBtnRight = document.createElement("button");
  quantityBtnRight.setAttribute("class", "quantity-btn");
  quantityBtnRight.classList.add("add-btn");
  quantityBtnRight.classList.add("center");
  quantityBtnRight.innerText = "+";

  quantityBtnRight.addEventListener("click", function () {
    spanEl.innerText = String((item.amount += 1));
    renderCartItems();
  });

  quantityBtnRemove.addEventListener("click", function () {
    if (item.amount === 1) {
      cartItemEl.remove();
      let indexOfItem = state.cart.findIndex(function (element) {
        return element.id === item.id;
      });
      state.cart.splice(indexOfItem, 1);
      renderCartItems();
    } else {
      spanEl.innerText = String((item.amount -= 1));
    }
  });

  cartItemEl.append(
    cartImg,
    titleEl,
    quantityBtnRemove,
    spanEl,
    quantityBtnRight
  );

  return cartItemEl;
}

function calculateTotal() {
  const totalEl = document.querySelector(".total-number");
  if (totalEl === null) return;

  let total = 0;
  for (const itemFromCArt of state.cart) {
    const foundItem = state.groceries.find(function (itemFromStore) {
      return itemFromCArt.id === itemFromStore.id;
    });
    total += foundItem.price * itemFromCArt.amount;
  }

  totalEl.textContent = `£${total.toFixed(2)}`;
}

function renderCartItems() {
  if (cartListEl === null) return;
  cartListEl.innerHTML = "";
  for (const item of state.cart) {
    const cartItemEl = cartItem(item);
    cartListEl.append(cartItemEl);
  }
  calculateTotal();
}

renderGroceries();
renderCartItems();
