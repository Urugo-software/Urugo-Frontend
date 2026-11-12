function BrandLogo() {
  return (
    <div className=" hidden lg:flex flex-col text-body bg-white  items-center justify-center">
      <h1
        style={{
          WebkitTextStroke: "2px #040200",
          WebkitTextFillColor: "#ffffff",
        }}
        className="text-9xl font-extrabold  "
      >
        U
      </h1>

      <p
        style={{
          WebkitTextStroke: "0.5px black",
          WebkitTextFillColor: "transparent",
        }}
        className="text-md text-brand font-medium tracking-widest uppercase "
      >
        Rental Platform
      </p>
      <p className="max-w-sm text-[12.5px] uppercase text-center mt-4 leading-7 text-gray-400 ">
        {`  Rwanda's verified rental platform for landlords, renters, and guests.`}
      </p>
    </div>
  );
}

export default BrandLogo;
