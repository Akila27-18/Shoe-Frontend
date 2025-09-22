import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const pages = ["womens", "mens", "kids", "brands", "offers"];
  const [activePage, setActivePage] = useState(""); 
  const [history, setHistory] = useState([]);
  const [isOpen, setIsOpen] = useState(false); 

  const navigate = useNavigate(); // hook to navigate

  const handleNavClick = (page) => {
    navigate(`/${page}`); // navigate to the page route
    if (page !== activePage) {
      if (activePage) setHistory([...history, activePage]);
      setActivePage(page);
      setIsOpen(true);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleBack = () => {
    const previousPage = history[history.length - 1];
    if (previousPage) {
      setActivePage(previousPage);
      setHistory(history.slice(0, -1));
      setIsOpen(true);
      navigate(`/${previousPage}`);
    } else {
      setActivePage("");
      setIsOpen(false);
      navigate("/"); // go to homepage if no history
    }
  };

  const handleClose = () => {
    setHistory([]);
    setActivePage("");
    setIsOpen(false);
    navigate("/"); // close dropdown and go home
  };

  const renderContent = () => {
    switch (activePage) {
      case "womens":
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 text-md">
            <div><h3 className="font-bold mb-1">New Arrivals</h3><ul><li>View all</li></ul></div>
            <div><h3 className="font-bold mb-1">Sandals</h3><ul><li>View all</li><li>Flat</li><li>Flip Flop</li><li>Slider</li><li>Strappy</li></ul></div>
            <div><h3 className="font-bold mb-1">Trainers</h3><ul><li>View all</li><li>Chunky</li><li>Lace Up</li><li>Slip On</li></ul></div>
            <div><h3 className="font-bold mb-1">Canvas</h3><ul><li>View all</li><li>Lace Up</li><li>Slip On</li></ul></div>
            <div><h3 className="font-bold mb-1">Shoes</h3><ul><li>View all</li><li>Ballerina</li><li>Brogue</li><li>Flat</li><li>Heel</li><li>Leather</li><li>Party</li><li>School</li></ul></div>
            <div><h3 className="font-bold mb-1">Boots</h3><ul><li>View all</li><li>Ankle</li><li>Biker</li><li>Heel</li><li>Knee High</li><li>Lace up</li><li>Leather</li></ul></div>
            <div><h3 className="font-bold mb-1">Slippers</h3><ul><li>View all</li><li>Full</li><li>Moccasin</li><li>Mule</li><li>Slipper Boots</li></ul></div>
          </div>
        );
      case "mens":
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 text-sm">
            <div><h3 className="font-bold mb-1">New Arrivals</h3><ul><li>View all</li></ul></div>
            <div><h3 className="font-bold mb-1">Sandals</h3><ul><li>View all</li><li>Flip Flop</li><li>Mule</li><li>Slider</li><li>Sport</li></ul></div>
            <div><h3 className="font-bold mb-1">Trainers</h3><ul><li>View all</li><li>Easy Fasten</li></ul></div>
            <div><h3 className="font-bold mb-1">Canvas</h3><ul><li>View all</li><li>Lace Up</li><li>Slip On</li></ul></div>
            <div><h3 className="font-bold mb-1">Shoes</h3><ul><li>View all</li><li>Brogue</li><li>Causal</li><li>Easy Fasten</li><li>Lace Up</li><li>Leather</li><li>Loafer</li><li>Oxford</li></ul></div>
            <div><h3 className="font-bold mb-1">Safety Footwear</h3><ul><li>View all</li><li>Boots</li><li>Shoes</li><li>Steel toe cap</li><li>Trainers</li></ul></div>
            <div><h3 className="font-bold mb-1">Boots</h3><ul><li>View all</li><li>Ankle</li><li>Chelsea</li><li>Desert</li><li>Lace up</li><li>Leather</li><li>Pull on</li></ul></div>
            <div><h3 className="font-bold mb-1">Slippers</h3><ul><li>View all</li><li>Full</li><li>Moccasin</li><li>Mule</li></ul></div>
          </div>
        );
      case "kids":
       return (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 text-sm">
    <div>
      <h3 className="font-bold mb-1">Girls</h3>
      <ul>
        <li>View all</li>
        <li>Sandals</li>
        <li>Canvas</li>
        <li>Trainers</li>
        <li>Shoes</li>
        <li>Boots</li>
        <li>Wellies</li>
        <li>Slippers</li>
      </ul>
    </div>
    <div>
      <h3 className="font-bold mb-1">Girls Trending</h3>
      <ul>
        <li>Save</li>
        <li>New arrivals</li>
        <li>Character footwear</li>
        <li>Online exclusive</li>
        <li>Back to school</li>
      </ul>
    </div>
    <div>
      <h3 className="font-bold mb-1">Back to schools</h3>
      <ul>
        <li>View all</li>
        <li>Girls school shoes</li>
        <li>Boys school shoes</li>
      </ul>
    </div>
    <div>
      <h3 className="font-bold mb-1">Canvas</h3>
      <ul>
        <li>View all</li>
        <li>Lace Up</li>
        <li>Slip On</li>
      </ul>
    </div>
    <div>
      <h3 className="font-bold mb-1">Boys</h3>
      <ul>
        <li>View all</li>
        <li>Sandals</li>
        <li>Canvas</li>
        <li>Trainers</li>
        <li>Shoes</li>
        <li>Boots</li>
        <li>Wellies</li>
        <li>Slippers</li>
      </ul>
    </div>
    <div>
      <h3 className="font-bold mb-1">Safety Footwear</h3>
      <ul>
        <li>View all</li>
      </ul>
    </div>
    <div>
      <h3 className="font-bold mb-1">Boys Trending</h3>
      <ul>
        <li>Save</li>
        <li>New arrivals</li>
        <li>Character exclusive</li>
        <li>Online exclusive</li>
        <li>Back to school</li>
      </ul>
    </div>
    <div>
      <h3 className="font-bold mb-1">Slippers</h3>
      <ul>
        <li>Boys slippers</li>
        <li>Girls slippers</li>
      </ul>
    </div>
  </div>
);

      case "brands":
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <div>
              <h3 className="font-bold mb-1">B</h3><ul><li>Barbie</li><li>Beckett</li><li>Bluey</li></ul>
              <h3 className="font-bold mt-2 mb-1">C</h3><ul><li>Comfort Plus</li><li>Comfy steps</li><li>Crocs</li><li>Cushion Walk</li></ul>
            </div>
            <div>
              <h3 className="font-bold mb-1">D</h3><ul><li>Disney frozen</li><li>Disney stitch</li><li>Divaz</li><li>Dunlop</li></ul>
              <h3 className="font-bold mt-2 mb-1">E</h3><ul><li>EarthWorks</li></ul>
              <h3 className="font-bold mt-2 mb-1">G</h3><ul><li>Gabbys Dollhouse</li></ul>
            </div>
            <div>
              <h3 className="font-bold mb-1">H</h3><ul><li>Heart</li><li>Heavenly feet</li><li>Hobos</li><li>Hush puppies</li></ul>
              <h3 className="font-bold mt-2 mb-1">J</h3><ul><li>Jo&Joe</li><li>JuJu</li></ul>
              <h3 className="font-bold mt-2 mb-1">K</h3><ul><li>Kickers</li><li>Krush</li></ul>
            </div>
            <div>
              <h3 className="font-bold mb-1">L</h3><ul><li>Lambretta</li><li>Lilley</li><li>LoL</li><li>Lotus</li><li>Lunar</li></ul>
              <h3 className="font-bold mt-2 mb-1">M</h3><ul><li>Marco Lozzi</li><li>Marvel</li><li>Maya grace</li></ul>
            </div>
            <div>
              <h3 className="font-bold mb-1">P</h3><ul><li>Paw patrol</li><li>Pokemon</li></ul>
              <h3 className="font-bold mt-2 mb-1">O</h3><ul><li>Original penguin</li><li>Osaga</li></ul>
              <h3 className="font-bold mt-2 mb-1">R</h3><ul><li>Red fish</li><li>Red level</li><li>Regatta</li><li>Rieker</li><li>Rocket Dog</li></ul>
            </div>
            <div>
              <h3 className="font-bold mb-1">S</h3><ul><li>Skechers</li><li>Soft line</li><li>Softlites</li><li>Spider-man</li><li>Stone creek</li><li>Super mario</li></ul>
              <h3 className="font-bold mt-2 mb-1">T</h3><ul><li>Totes isotoner</li><li>Trespass</li><li>Truffle</li><li>Trux</li></ul>
            </div>
            <div>
              <h3 className="font-bold mb-1">W</h3><ul><li>Walkright</li><li>Wednesday</li><li>Wrangler</li></ul>
              <h3 className="font-bold mt-2 mb-1">X</h3><ul><li>XL</li></ul>
              <h3 className="font-bold mt-2 mb-1">U</h3><ul><li>Umbro</li></ul>
            </div>
          </div>
        );
      case "offers":
        return (
          <div className="space-y-2 text-sm">
            <h2 className="font-bold mb-1">Offers</h2>
            <ul className="list-disc list-inside">
              <li>SAVE</li>
              <li>Two pairs for thousand</li>
              <li>Clerance Outlet</li>
              <li>Boots Sale</li>
              <li>View all offers</li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

    return (
    <div className="w-full max-w-6xl mx-auto py-4 px-2">
      <div className="flex items-center justify-center relative">
        <button onClick={handleBack} className="absolute left-0 text-gray-800 text-xl hover:text-gray-600">←</button>
        <h1 className="text-3xl font-bold text-center">StepUp.in</h1>
        <button onClick={handleClose} className="absolute right-0 text-gray-800 text-xl hover:text-gray-600"></button>
      </div>
      <hr className="border-t border-black mt-6 mb-6" />
      <nav className="flex justify-center space-x-6 text-xl mt-2">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handleNavClick(page)}
            className={`hover:text-gray-600 ${activePage === page ? "text-red-500 font-bold" : "text-gray-800"}`}
          >
            {page.charAt(0).toUpperCase() + page.slice(1)}
          </button>
        ))}
      </nav>
      <hr className="border-t border-back mt-6" />
      {/* Dropdown content, only visible if isOpen is true */}
      {isOpen && <div className="mt-2 text-sm">{renderContent()}</div>}
    </div>
  );
}