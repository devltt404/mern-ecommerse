//Officedepot
console.log({
  name: document
    .querySelector(".od-heading.od-heading-h1.sku-heading")
    .innerText.slice(
      0,
      document
        .querySelector(".od-heading.od-heading-h1.sku-heading")
        .innerText.indexOf(",")
    ),
  description: document.querySelector('span[itemprop="description"]').firstChild
    .innerText,
  price: Number(
    document.querySelector(".od-graphql-price-big-price").innerText.slice(1)
  ),
  images: [document.querySelector(".image-gallery-image").firstChild.src],
  category: {
    $oid: "65f71d74170cb72c383386f1",
  },
  stock: Math.floor(Math.random() * (60 - 30 + 1)) + 30,
  rating: 0,
  numOfReviews: 0,
  numSold: 0,
  reviews: [],
});
