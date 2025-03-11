import React, { useState } from "react";
import Banner from "./components/Banner";
import NFt2 from "../../../assets/plants/Nft2.png";
import NFt4 from "../../../assets/plants/Nft4.png";
import NFt3 from "../../../assets/plants/Nft3.png";
import NFt5 from "../../../assets/plants/Nft5.png";
import NFt6 from "../../../assets/plants/Nft6.png";
import guanabana from "../../../assets/plants/guanabana.jpeg";
import cocota from "../../../assets/plants/Cocota.jpg";
import apio from "../../../assets/plants/Apio.jpg";
import eneldo from "../../../assets/plants/Eneldo.jpg";
import cilantro from "../../../assets/plants/Cilantro.jpg";
import hinojo from "../../../assets/plants/Hinojo.jpg";
import perejil from "../../../assets/plants/Perejil.jpg";
import zanahoria from "../../../assets/plants/Zanahoria.jpg";
import avatar1 from "../../../assets/avatars/avatar1.png";
import avatar2 from "../../../assets/avatars/avatar2.png";
import avatar3 from "../../../assets/avatars/avatar3.png";

import tableDataTopCreators from "../marketplace/variables/tableDataTopCreators";
import HistoryCard from "./components/HistoryCard";
import TopCreatorTable from "./components/TableTopCreators";
import NftCard from "../../../components/card/NftCard";

const ListHerbario = () => {
  const [selectedSection, setSelectedSection] = useState("Annonaceae");

  const nftData = [
    {
      section: "Annonaceae",
      title: "Abstract Colors",
      author: "Esthera Jackson",
      price: "0.91",
      image: guanabana,
      bidders: [avatar1, avatar2, avatar3],
    },
    {
      section: "Anacardiaceae",
      title: "ETH AI Brain",
      author: "Nick Wilson",
      price: "0.7",
      image: cocota,
      bidders: [avatar1, avatar2, avatar3],
    },
    {
      section: "Apiaceae",
      title: "Apio",
      author: "Apium graveolens L.",
      price: "8",
      image: apio,
      bidders: [avatar1, avatar2, avatar3],
    },
    {
      section: "Apiaceae",
      title: "Eneldo Brain",
      author: "Anethum graveolens L.",
      price: "1",
      image: eneldo,
      bidders: [avatar1, avatar2, avatar3],
    },
    {
      section: "Apiaceae",
      title: "Cilantro Brain",
      author: "Coriandrum sativum L.",
      price: "7",
      image: cilantro,
      bidders: [avatar1, avatar2, avatar3],
    },
    {
      section: "Apiaceae",
      title: "Hinojo Brain",
      author: "Foeniculum vulgare Mill.",
      price: "1",
      image: hinojo,
      bidders: [avatar1, avatar2, avatar3],
    },
    {
      section: "Apiaceae",
      title: "Perejil",
      author: "Petroselinum crispum (Miller) A.W. Hill.",
      price: "6",
      image: perejil,
      bidders: [avatar1, avatar2, avatar3],
    },
    {
      section: "Apiaceae",
      title: "Zanahoria",
      author: "Daucus carota L.",
      price: "5",
      image: zanahoria,
      bidders: [avatar1, avatar2, avatar3],
    },
    
  ];

  const filteredNftData = nftData.filter((nft) => nft.section === selectedSection);

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-1 2xl:grid-cols-1">
      <div className="col-span-1 h-fit w-full">
      {/* NFt Banner */}
      <Banner />

      {/* NFt Header */}
      <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
        <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
        Tipo de Herbario
        </h4>
        <ul className="mt-4 flex items-center justify-between md:mt-0 md:justify-center md:!gap-5 2xl:!gap-12">
        {["Annonaceae", "Anacardiaceae", "Apiaceae", "Mas"].map((section) => (
          <li key={section}>
          <button
            className={`text-base font-medium ${
            selectedSection === section
              ? "text-brand-500"
              : "text-gray-600"
            } hover:text-brand-500 dark:text-white`}
            onClick={() => setSelectedSection(section)}
          >
            {section}
          </button>
          </li>
        ))}
        </ul>
      </div>

      {/* NFTs trending card */}
      <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-4">
        {filteredNftData.map((nft, index) => (
        <NftCard
          key={index}
          bidders={nft.bidders}
          title={nft.title}
          author={nft.author}
          price={nft.price}
          image={nft.image}
        />
        ))}
      </div>
      </div>
    </div>
  );
};

export default ListHerbario;
