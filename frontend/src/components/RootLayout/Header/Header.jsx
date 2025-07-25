import React, { useState } from "react";
import Slider from "react-slick";
import getSymbolFromCurrency from "currency-symbol-map";
import { GB, US, FR, DE, ES, BD } from "country-flag-icons/react/3x2";

// const currencies = ["USD ($)", "EUR (€)", "Rupee (₹)"];

const languages = [
  // { code: 'bn', label: 'বাংলা', flag: Bd },
  { code: "bn", label: "বাংলা", flag: BD },
  { code: "en-US", label: "English (US)", flag: US },
  { code: "en-GB", label: "English (UK)", flag: GB },
  { code: "fr", label: "Français", flag: FR },
  { code: "de", label: "Deutsch", flag: DE },
  { code: "es", label: "Español", flag: ES },
];

const Header = () => {
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [languageOpen, setLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const currencies = [
    "USD",
    "EUR",
    "BDT",
    "GBP",
    "JPY",
    "AUD",
    "CAD",
    "CHF",
    "CNY",
    "INR",
  ];

  // console.log(getSymbolFromCurrency("GBP"));

  const PrevArrow = ({ onClick }) => (
    <div
      className="absolute left-0 top-[-15px] z-10 cursor-pointer text-4xl bg-white text-black-600 hover:text-black px-3"
      onClick={onClick}
    >
      ‹
    </div>
  );

  const NextArrow = ({ onClick }) => (
    <div
      className="absolute right-0 top-[-15px] z-10 cursor-pointer text-4xl bg-white text-black-600 hover:text-black px-3"
      onClick={onClick}
    >
      ›
    </div>
  );

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };
  return (
    <>
      <div className="bg-[#f4f4f5] py-1">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-between">
            <div className="w-1/6"></div>

            <div className="w-3/6 relative">
              <Slider {...settings} className="">
                <div>
                  <h3 className="text-red-600">
                    Delivery charge free over $100!
                  </h3>
                </div>
                <div>
                  <h3 className="text-red-600">
                    Get 20% off on your first order!
                  </h3>
                </div>
                <div>
                  <h3 className="text-red-600">Free returns within 30 days!</h3>
                </div>
              </Slider>
              {/* <div className="next">n</div> */}
            </div>
            <div className="w-2/6 flex justify-end items-center gap-4">
              <button>Order Tracking</button>

              <div className="relative">
                <button
                  className=" cursor-pointer"
                  onClick={() => setCurrencyOpen(!currencyOpen)}
                >
                  <span className="font-medium">{selectedCurrency}</span>
                  <span className="text-lg">
                    ({getSymbolFromCurrency(selectedCurrency)})
                  </span>
                </button>
                {currencyOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border rounded shaodow-md z-50">
                    {currencies.map((currency) => (
                      <div
                        className="cursor-pointer hover:bg-gray-100 p-2"
                        key={currency}
                        onClick={() => {
                          setSelectedCurrency(currency);
                          setCurrencyOpen(false);
                        }}
                      >
                        <span className="font-medium">{currency}</span>
                        <span className="text-lg">
                          ({getSymbolFromCurrency(currency)})
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  className="cursor-pointer flex items-center"
                  onClick={() => setLanguageOpen(!languageOpen)}
                >
                  <selectedLanguage.flag className="inline-block w-5 h-4 mr-2" />
                  {selectedLanguage.label}
                </button>
                {languageOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border rounded shaodow-md z-50">
                    {languages.map((language) => (
                      <div
                        className="cursor-pointer hover:bg-gray-100 p-2 flex items-center"
                        key={language.code}
                        onClick={() => {
                          setSelectedLanguage(language);
                          setLanguageOpen(false);
                        }}
                      >
                        <language.flag className="inline-block w-5 h-4" />
                        {language.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
