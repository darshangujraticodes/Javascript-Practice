// console.log("Cart Js page ");

// console.log(items);

// console.log(bagitems);

const bagItemCounter = (items) => {
  let cartCount = document.querySelector(".cartCounter");
  cartCount.innerHTML = items.length;
};

const displayCartList = () => {
  let cartProductList = "";

  //   let cartHtmlItem = document.

  items.forEach((item) => {
    cartProductList += ``;
  });
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

  console.log(fetchDataList(bagitems));
}

onLoad();
