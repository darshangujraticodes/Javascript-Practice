// console.log("index js integrated successfully");

// sample

const data = {
  image: "image/1.png",
  name: "Men Denim Zipper",
  info: "V3E Men's Hooded Denim Jacket Zipper Coat Outerwear",
  price: { discountPrice: "1259", originalPrice: "2999" },
  discountOff: "65",
};

// console.log(itemWrapper);

let genericHtmlContent = `
    <div class="colWrap col-md-3">
        <div class="productCard">
                <div class="productImgWrap">
                  <img src="${data.image}" alt="${data.name}" class="imgfluid rounded-2" alt="" />
                </div>

                <div class="productContentWrap">
                  <h2 class="productName">${data.name}</h2>
                  <p class="productInfo mb-1">
                    ${data.info}
                  </p>
                  <p>
                    <span class="discountPrice"> ₹ ${data.price.discountPrice} </span>

                    <span class="originalPrice">MRP <s>₹ ${data.price.originalPrice}</s> </span>

                    <span class="discountOff">( ${data.discountOff}% OFF)</span>
                  </p>

                  <div>
                    <button class="cartBtn" onClick="addToBag()">Add To Cart</button>
                  </div>
                </div>
        </div>
    </div>
`;

// -------------------------------

let itemWrapper = document.querySelector(".colWrap");

const displayItemOnHomepage = () => {
  let itemProductData = "";
  items.forEach((data) => {
    // console.log(data);

    itemProductData += `
      <div class="colWrap col-md-3">
          <div class="productCard">
                  <div class="productImgWrap">
                    <img src="${data.image}" alt="${data.name}" class="imgfluid rounded-2" alt="" />
                  </div>
  
                  <div class="productContentWrap">
                    <h2 class="productName">${data.name}</h2>
                    <p class="productInfo mb-1">
                      ${data.info}
                    </p>
                    <p>
                      <span class="discountPrice"> ₹ ${data.price.discountPrice} </span>
  
                      <span class="originalPrice">MRP <s>₹ ${data.price.originalPrice}</s> </span>
  
                      <span class="discountOff">( ${data.discountOff}% OFF)</span>
                    </p>
  
                    <div>
                      <button class="cartBtn"  onClick="addToBag(${data.id})" >   <span class="me-2">
                <i class="fa-solid fa-bag-shopping"></i>
              </span>   Add To Cart</button>
                    </div>
                  </div>
          </div>
      </div>
  `;
  });

  itemWrapper.innerHTML = itemProductData;
};

let bagItems = [];
let bagItemsQuantity = [];

if (localStorage.getItem("bagItems")) {
  bagItems = JSON.parse(localStorage.getItem("bagItems"));
  bagItemsQuantity = JSON.parse(localStorage.getItem("bagItemsQuantity"));
}

const bagItemCounter = () => {
  let cartCount = document.querySelector(".cartCounter");

  let totalQuantity;

  if (bagItemsQuantity.length) {
    cartCount.style.visibility = "visible";
    totalQuantity = bagItemsQuantity.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    // console.log(totalQuantity, bagItems);

    cartCount.innerHTML = totalQuantity;
  } else {
    cartCount.style.visibility = "hidden";
  }
};

const addToBag = (itemId) => {
  // console.log(bagItemsQuantity);

  if (!bagItems.includes(itemId)) {
    console.log("new item added");
    bagItems.push(itemId);
    bagItemsQuantity.push({ id: itemId, quantity: 1 });
  } else {
    console.log("It is Already there");

    bagItemsQuantity.map((item) => {
      // console.log(item.id, itemId);

      if (item.id == itemId) {
        item.quantity += 1;
      }

      // console.log(item);
    });
  }

  localStorage.setItem("bagItems", JSON.stringify(bagItems));

  localStorage.setItem("bagItemsQuantity", JSON.stringify(bagItemsQuantity));

  bagItemCounter();

  // console.log(bagItemsQuantity);
};

function onLoad() {
  bagStorageItems = JSON.parse(localStorage.getItem("bagItems"));
  bagStorageQuantityItems = JSON.parse(
    localStorage.getItem("bagItemsQuantity")
  );

  bagItems = bagStorageItems ? bagStorageItems : [];
  bagItemsQuantity = bagStorageQuantityItems ? bagStorageQuantityItems : [];
  displayItemOnHomepage();
  bagItemCounter();
}

onLoad();
