import React , { useState }from 'react';
import { useRouter} from 'next/router';
import Link from 'next/link';
import Sneaker from '@/types/sneaker';


interface ProductCardProps {
  sneaker: Sneaker;
  index: number;
}

const SneakerCard: React.FC<ProductCardProps> = ({ sneaker }) => {
  const router = useRouter();

  const handleViewProduct = (index: string) => {
    router.push(`/product/${index}`);
  };


  const handleBuyNow = (id:string) => {
    if (id && typeof id === 'string') {
      router.push(`/checkout/${id}`);
    }
  };
  const [selectedImage, setSelectedImage] = useState(0);

const handleImageSelect = (index: number) => {
  setSelectedImage(index);
};

const sneakerImages = sneaker.imageUrl[0].split("png,http")

// iterate through the list and for every image add to the list "http{sneakerImages[i]}"

  const images = [
    sneakerImages[0],
    "http" + sneakerImages[1],
    "http" + sneakerImages[2],
    // "http" + sneakerImages[3],
  ];



  return (
    <>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&display=swap');\n\n*{\n    box-sizing: border-box;\n    padding: 0;\n    margin: 0;\n    font-family: 'Open Sans', sans-serif;\n}\nbody{\n    line-height: 1.5;\n}\n.card-wrapper{\n    max-width: 1100px;\n    margin: 0 auto;\n}\nimg{\n    width: 100%;\n    display: block;\n}\n.img-display{\n    overflow: hidden;\n}\n.img-showcase{\n    display: flex;\n    width: 100%;\n    transition: all 0.5s ease;\n}\n.img-showcase img{\n    min-width: 100%;\n}\n.img-select{\n    display: flex;\n}\n.img-item{\n    margin: 0.3rem;\n}\n.img-item:nth-child(1),\n.img-item:nth-child(2),\n.img-item:nth-child(3){\n    margin-right: 0;\n}\n.img-item:hover{\n    opacity: 0.8;\n}\n.product-content{\n    padding: 2rem 1rem;\n}\n.product-title{\n    font-size: 3rem;\n    text-transform: capitalize;\n    font-weight: 700;\n    position: relative;\n    color: #12263a;\n    margin: 1rem 0;\n}\n.product-title::after{\n    content: \"\";\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    height: 4px;\n    width: 80px;\n    background: #12263a;\n}\n.product-link{\n    text-decoration: none;\n    text-transform: uppercase;\n    font-weight: 400;\n    font-size: 0.9rem;\n    display: inline-block;\n    margin-bottom: 0.5rem;\n    background: #256eff;\n    color: #fff;\n    padding: 0 0.3rem;\n    transition: all 0.5s ease;\n}\n.product-link:hover{\n    opacity: 0.9;\n}\n.product-rating{\n    color: #ffc107;\n}\n.product-rating span{\n    font-weight: 600;\n    color: #252525;\n}\n.product-price{\n    margin: 1rem 0;\n    font-size: 1rem;\n    font-weight: 700;\n}\n.product-price span{\n    font-weight: 400;\n}\n.last-price span{\n    color: #f64749;\n    text-decoration: line-through;\n}\n.new-price span{\n    color: #256eff;\n}\n.product-detail h2{\n    text-transform: capitalize;\n    color: #12263a;\n    padding-bottom: 0.6rem;\n}\n.product-detail p{\n    font-size: 0.9rem;\n    padding: 0.3rem;\n    opacity: 0.8;\n}\n.product-detail ul{\n    margin: 1rem 0;\n    font-size: 0.9rem;\n}\n.product-detail ul li{\n    margin: 0;\n    list-style: none;\n    background: url(https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/checked.png) left center no-repeat;\n    background-size: 18px;\n    padding-left: 1.7rem;\n    margin: 0.4rem 0;\n    font-weight: 600;\n    opacity: 0.9;\n}\n.product-detail ul li span{\n    font-weight: 400;\n}\n.purchase-info{\n    margin: 1.5rem 0;\n}\n.purchase-info input,\n.purchase-info .btn{\n    border: 1.5px solid #ddd;\n    border-radius: 25px;\n    text-align: center;\n    padding: 0.45rem 0.8rem;\n    outline: 0;\n    margin-right: 0.2rem;\n    margin-bottom: 1rem;\n}\n.purchase-info input{\n    width: 60px;\n}\n.purchase-info .btn{\n    cursor: pointer;\n    color: #fff;\n}\n.purchase-info .btn:first-of-type{\n    background: #256eff;\n}\n.purchase-info .btn:last-of-type{\n    background: #f64749;\n}\n.purchase-info .btn:hover{\n    opacity: 0.9;\n}\n.social-links{\n    display: flex;\n    align-items: center;\n}\n.social-links a{\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 32px;\n    height: 32px;\n    color: #000;\n    border: 1px solid #000;\n    margin: 0 0.2rem;\n    border-radius: 50%;\n    text-decoration: none;\n    font-size: 0.8rem;\n    transition: all 0.5s ease;\n}\n.social-links a:hover{\n    background: #000;\n    border-color: transparent;\n    color: #fff;\n}\n\n@media screen and (min-width: 992px){\n    .card{\n        display: grid;\n        grid-template-columns: repeat(2, 1fr);\n        grid-gap: 1.5rem;\n    }\n    .card-wrapper{\n        height: 100vh;\n        display: flex;\n        justify-content: center;\n        align-items: center;\n    }\n    .product-imgs{\n        display: flex;\n        flex-direction: column;\n        justify-content: center;\n    }\n    .product-content{\n        padding-top: 0;\n    }\n}\n    "
    }}
  />
  <div className="card-wrapper">
    <div className="card">
      {/* card left */}
      <h2 className="product-title">{sneaker.brand}</h2>
      <h2>{sneaker.colorway}</h2>

      <div className="product-imgs">
    <div className="img-display">
      <div className="img-showcase">
        {/* Display the currently selected image */}
        <img src={images[selectedImage]} alt="shoe image" />
      </div>
    </div>
    <div className="img-select">
      {/* Map through images and add an onClick event to update the selected image */}
      {images.map((img, index) => (
        <div className="img-item" key={index} onClick={() => handleImageSelect(index)}>
          <a href="#" data-id={index + 1}>
            <img src={img} alt="shoe image" />
          </a>
        </div>
      ))}
    </div>
  </div>
      {/* card right */}
      <div className="product-content">
        {/* <a href="#" className="product-link">
          visit nike store
        </a> */}
        <div className="product-rating">
          <i className="fas fa-star" />
          <i className="fas fa-star" />
          <i className="fas fa-star" />
          <i className="fas fa-star" />
          <i className="fas fa-star-half-alt" />
          <h2>Seller Rating </h2>
          <span>4.7(21)</span>
        </div>
        <div className="product-price">
          {/* <p class = "last-price">Old Price: <span>$257.00</span></p> */}
          <p className="new-price">
            Price: <span>${sneaker.price}</span>
          </p>
        </div>
        <div className="product-detail">
          <p>
            {sneaker.brand}
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequatur, perferendis eius. Dignissimos, labore suscipit. Unde.
          </p>
          <ul>
            <li>
              Color: <span>{sneaker.colorway}</span>
            </li>
            <li>
              Available: <span>{sneaker.stockAvailable}</span>
            </li>
            {/* <li>
              Category: <span>Shoes</span>
            </li> */}
            {/* <li>
              Shipping Area: <span>All over the world</span>
            </li> */}
            <li>
              Shipping Fee: <span>Free</span>
            </li>
          </ul>
        </div>
        <div className="purchase-info">
          <input type="number" min={0} defaultValue={1} />
          <button type="button" className="btn">
            Add to Cart <i className="fas fa-shopping-cart" />
          </button>
          <button type="button" className="btn">
            Compare
          </button>
        </div>
        <div className="social-links">
          <p>Share At: </p>
          <a href="#">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#">
            <i className="fab fa-twitter" />
          </a>
          <a href="#">
            <i className="fab fa-instagram" />
          </a>
          <a href="#">
            <i className="fab fa-whatsapp" />
          </a>
          <a href="#">
            <i className="fab fa-pinterest" />
          </a>
        </div>
      </div>
    </div>
  </div>
</>

  );
};

export default SneakerCard;