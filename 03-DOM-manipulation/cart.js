// console.log("Cart Js page ");

// console.log(items);

// console.log(bagitems);

const bagItemCounter = (items) => {
  let cartCount = document.querySelector(".cartCounter");
  cartCount.innerHTML = items.length;
};

const displayCartlist = (data) => {
  let cartProductList = "";

  data.forEach((item) => {
    cartProductList += `
      <div class="cartItemWrap mb-4">
                <div class="cartItemCard row">
                  <div class="col-2">
                    <img src="${item.image}" class="imgfluid rounded-2" alt="${item.name}" />
                  </div>
                  <div class="col-8">
                    <div class="productContentWrap">
                      <h2 class="productName">${item.name}</h2>
                      <p class="productInfo mb-1">
                            ${item.info}
                      </p>
                      <p>
                        <span class="discountPrice"> ₹ ${item.price.discountPrice} </span>

                        <span class="originalPrice">MRP <s>₹ ${item.price.originalPrice}  </s> </span>

                        <span class="discountOff">(${item.discountOff}% OFF)</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
    `;
  });

  let cartHtmlItem = document.querySelector(".cartList");

  cartHtmlItem.innerHTML = cartProductList;
};

const fetchDataList = (bagList) => {
  //   console.log(bagList);

  let fetchList = [];

  items.map((item) => {
    bagList.map((bagItem) => {
      if (bagItem === parseInt(item.id)) {
        fetchList.push(item);
        console.log(fetchList);
      }
    });
  });

  //   console.log(fetchList);

  return fetchList;
};

function onLoad() {
  const bagitems = JSON.parse(localStorage.getItem("bagItems"));

  bagItemCounter(bagitems);

  const data = fetchDataList(bagitems);

  displayCartlist(data);
}

onLoad();
