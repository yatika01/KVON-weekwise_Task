const cardsData = [
    {
      title: "Matte Liquid Lipstick",
      text: "Long-lasting, smudge-proof formula .",
      img: "images/lipstick.avif",
      price: "$12.99"
    },
    {
      title: "Hydrating Face Cream",
      text: "Deeply nourishes and locks in moisture all day.",
      img: "images/facecream.avif",
      price: "$24.50"
    },
    {
      title: "Vitamin C Serum",
      text: "Brightens skin and reduces dark spots naturally.",
      img: "images/vitaminc.avif",
      price: "$18.75"
    },
    {
      title: "Velvet Bloom Blush",
      text: "Gives a soft, rosy glow for a fresh finish.",
      img: "images/blush.avif",
      price: "$14.20"
    },
    {
      title: "Eyeliner Pen",
      text: "Waterproof and ultra-precise for all-day drama.",
      img: "images/eyeliner.avif",
      price: "$9.99"
    },
    {
      title: "EyeShadow",
      text: "Waterproof and ultra-precise for all-day drama.",
      img: "images/eyeliner.avif",
      price: "$9.99"
    }
  ];
  const moreCards = [
    {
      title: "Radiant Skin Serum",
      text: "Glow-enhancing serum with vitamin C.",
      img: "images/vitaminc.avif",
      price: "$29.99"
    },
    {
      title: "Hydrating Lip Balm",
      text: "Keeps your lips smooth and soft all day.",
      img: "images/lipstick.avif",
      price: "$9.99"
    },
    {
      title: "Gentle Face Wash",
      text: "Cleanses without drying your skin.",
      img: "images/facewash.avif",
      price: "$15.99"
    }
  ];
    $(document).ready(function () {
      const $container = $("#card-container");
      cardsData.forEach((card, i) => {
        const cardHTML = `
          <div class="col-md-6 col-lg-4 mb-4">
            <div class="card show" style="animation-delay: ${i * 0.2}s;">
              <img src="${card.img}" class="card-img-top" alt="${card.title}">
              <div class="card-body">
                <h5 class="card-title">${card.title}</h5>
                <p class="card-text">${card.text}</p>
                <h6 class="text-primary">${card.price}</h6>
                <button class="btn btn-outline-primary w-100 mt-2">Buy Now</button>
              </div>
            </div>
          </div>`;
        $container.append(cardHTML);
      });
    });
    $("#loadMoreBtn").on("click", function () {
      moreCards.forEach((card, i) => {
        const cardHTML = `
          <div class="col-md-6 col-lg-4 mb-4">
            <div class="card show" style="animation-delay: ${i * 0.2}s;">
              <img src="${card.img}" class="card-img-top" alt="${card.title}">
              <div class="card-body">
                <h5 class="card-title">${card.title}</h5>
                <p class="card-text">${card.text}</p>
                <h6 class="text-primary">${card.price}</h6>
                <button class="btn btn-outline-primary w-100 mt-2">Buy Now</button>
              </div>
            </div>
          </div>`;
        $("#card-container").append(cardHTML);
      });
    
      $(this).hide(); 
    });
    $(document).ready(function () {
      $('.counter').each(function () {
        var $this = $(this),
            countTo = $this.attr('data-count');
        $({ countNum: $this.text() }).animate({
          countNum: countTo
        },
        {
          duration: 3000,
          easing: 'swing',
          step: function () {
            $this.text(Math.floor(this.countNum));
          },
          complete: function () {
            $this.text(this.countNum);
          }
        });
      });
    });