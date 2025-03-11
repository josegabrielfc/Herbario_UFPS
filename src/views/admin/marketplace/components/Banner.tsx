import nft1 from "../../../../assets/plants/banner.webp";


//Color texto: [#E3DAFF]
const Banner1 = () => {
  return (
    <div
      className="flex w-full flex-col rounded-md bg-cover px-[30px] py-[30px] md:px-[64px] md:py-[56px]"
      style={{ backgroundImage: `url(${nft1})` }}
    >
      <div className="w-full">
        <h4 className="mb-[14px] max-w-full text-xl font-bold text-white md:w-[64%] md:text-3xl md:leading-[42px] lg:w-[46%] xl:w-[85%] 2xl:w-[75%] 3xl:w-[52%]">
          Descubre, todas las plantas extraordinarias del herbario de la universidad
        </h4>
        <p className="mb-[40px] max-w-full text-base font-medium text-white md:w-[64%] lg:w-[40%] xl:w-[72%] 2xl:w-[60%] 3xl:w-[45%]">
          Explora el inventario de plantas de la Universidad Francisco de Paula Santander y descubre especies únicas y fascinantes.
        </p>

        <div className="mt-[36px] flex items-center justify-between gap-4 sm:justify-start 2xl:gap-10">
          <button className="text-black linear rounded-md bg-white px-4 py-2 text-center text-base font-medium transition duration-200 hover:!bg-white/80 active:!bg-white/70">
            Descubrir Ahora
          </button>
          <button className="text-base font-medium text-lightPrimary hover:text-lightPrimary 2xl:ml-2">
            Agronomia UFPS
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner1;
