import { Heading, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import ItemsCarousel from "react-items-carousel";
import "./CarouselSection1.css";
import {
  ChevronRightIcon,
  AddIcon,
  WarningIcon,
  ChevronLeftIcon,
} from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const CarouselSection1 = () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 8;
  const items = [
    {
      title: "Must-Have Minis",
      image:
        "https://www.sephora.com/contentimages/homepage/040423/Homepage/RWD/2023-03-06-slotting-minis-v2-march-hybrid-site-rwd-home-page-hero-banner-us-ca-handoff_01-1280x1280.jpeg?imwidth=545",
      desc: "Small but mighty picks to pocket right now.",
      color: "#F6CABF",
    },
    {
      title: "NEW Glow Recipe Strawberry Blur Drops",
      image:
        "https://www.sephora.com/contentimages/2023-3-31-glow-recipe-strawberry-bha-pore-smooth-blur-drops-site-desktop-home-page-rwd-hero-1000x750-banner-en-us-can.jpg?imwidth=545",
      desc: "Visibly refine pores with this multitasking primer. Only at Sephora.",
      color: "#DF535E",
    },
    {
      title: "NEW GXVE BY GWEN STEFANI",
      image:
        "https://www.sephora.com/contentimages/2023-3-23-gxve-eye-story-site-desktop-mobile-home-page-rwd-hero-banner-1000x750-en-us-can.jpg?imwidth=545",
      desc: "Rock iconic eye looks with pigment-packed formulas that won't flake, crease, or smudge.",
      color: "#8EB6D0",
    },
    {
      title: "This Just In",
      image:
        "https://www.sephora.com/contentimages/2023-03-25-slotting-just-arrived-v2-standard-site-rwd-home-page-hero-banner-4-product-english-US-CA_01.jpg?imwidth=545",
      desc: "The latest beauty from the hottest brands.",
      color: "#E07271",
    },
  ];
  return (
    <div
      style={{ padding: `${chevronWidth}px 2px` }}
      className="card_container"
    >
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={2.7}
        gutter={8}
        leftChevron={
          <div className="carousel_btn_box_L">
            {" "}
            <ChevronLeftIcon boxSize={10} color="white" />{" "}
          </div>
        }
        rightChevron={
          <div className="carousel_btn_box_R">
            {" "}
            <ChevronRightIcon boxSize={10} color="white" />{" "}
          </div>
        }
        outsideChevron
        chevronWidth={chevronWidth}
      >
        {items.map((item, index) => {
          return (
            <Link to="/products">
              <div className="card_item" key={item.image}>
                <div className="card_item_img_box">
                  <img alt="test product" src={item.image} />
                </div>
                <div
                  style={{ backgroundColor: `${item.color}` }}
                  className="card_item_txt_box"
                >
                  <Heading as="h4" size="md" mt="-5px">
                    {item.title}
                  </Heading>
                  <Text fontSize="sm" ml="0px" mt="5px">
                    <Link to="#">{item.desc}</Link>
                  </Text>
                  <button>
                    {" "}
                    <Link to="#">SHOP NOW▸</Link>
                  </button>
                </div>
              </div>
            </Link>
          );
        })}
      </ItemsCarousel>
    </div>
  );
};

export default CarouselSection1;
