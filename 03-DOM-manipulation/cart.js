// console.log("Cart Js page ");

// console.log(items);

const allProductItems = items;

// console.log(bagitems);

const bagItemCounter = () => {
  let cartCount = document.querySelector(".cartCounter");
  // cartCount.innerHTML = items.length;

  const storageQuantityBagItems = JSON.parse(
    localStorage.getItem("bagItemsQuantity")
  );

  const totalQuantity = storageQuantityBagItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  console.log("total quantity = ", totalQuantity);

  cartCount.innerHTML = totalQuantity;
};

const displayCartlist = (data) => {
  let cartProductList = "";

  data.forEach((item) => {
    cartProductList += `
      <div class="cartItemWrap mb-4">
                <div class="cartItemCard  row mb-3 ">
                  <div class="col-3 ">
                    <img src="${item.image}" class="imgfluid rounded-2" alt="${item.name}" />
                  </div>
                  <div class="col-8">
                    <div class="productContentWrap position-relative">
                      <h2 class="productName">${item.name}</h2>
                      <p class="productInfo mb-1">
                            ${item.info}
                      </p>
                      <p class="mb-1">
                        <span class="discountPrice"> ₹ ${item.price.discountPrice} </span>

                        <span class="originalPrice">MRP <s>₹ ${item.price.originalPrice}  </s> </span>

                        <span class="discountOff mb-1">(${item.discountOff}% OFF)</span>

                      </p>
                      <p class="mb-1">
                      <span class="fw-semibold">  ${item.return_period}  Days </span>  
 Replacement Policy
                      </p>
                       <p class="mb-1">
                        <span class="fw-semibold">   ${item.delivery_date} Days </span>  
 Required to Deliver Product 
                      </p>
                      <p class="mb-1">
                        <span class="fw-semibold">  Ordered Quantity : ${item.quantity}  </span>  
                      </p>
                      <div class="crossImgWrap">
                        <button onClick="removeItem(${item.id})" class="crossBtn">X</button>
                      </div>

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
        // console.log(fetchList);
      }
    });
  });

  //   console.log(fetchList);

  return fetchList;
};

const quantityFetchList = (itemdata) => {
  // console.log(itemdata);

  const fetchnewData = [];

  itemdata.map((item) => {
    // console.log("id =", item.id, "quantity = ", item.quantity);

    allProductItems.map((productItem) => {
      // console.log(productItem.id);

      if (item.id == productItem.id) {
        fetchnewData.push({ ...productItem, quantity: item.quantity });
      }
    });
  });

  // console.log(fetchnewData);

  return fetchnewData;
};

const removeItem = (deleteItemId) => {
  console.log("delete Item Id = ", deleteItemId);

  const storageQuantityBagItems = JSON.parse(
    localStorage.getItem("bagItemsQuantity")
  );

  const storageBagItems = JSON.parse(localStorage.getItem("bagItems"));

  console.log(storageQuantityBagItems, storageBagItems);

  const newQuantityBagItems = storageQuantityBagItems.filter(
    (item) => item.id != deleteItemId
  );
  const newBagItems = storageBagItems.filter((item) => item != deleteItemId);

  console.log(newQuantityBagItems, newBagItems);

  localStorage.setItem("bagItemsQuantity", JSON.stringify(newQuantityBagItems));
  localStorage.setItem("bagItems", JSON.stringify(newBagItems));

  bagItemCounter();

  const data = fetchDataList(newBagItems);

  displayCartlist(data);

  location.reload();
};

function onLoad() {
  // this was without quantity
  // const bagitems = JSON.parse(localStorage.getItem("bagItems"));
  // const data = fetchDataList(bagitems);

  const bagItemsQuantity = JSON.parse(localStorage.getItem("bagItemsQuantity"));

  bagItemCounter(bagItemsQuantity);

  const newData = quantityFetchList(bagItemsQuantity);

  displayCartlist(newData);
}

onLoad();
