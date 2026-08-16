function BrandLogo() {
  return (
    <div className=" hidden lg:flex flex-col text-body bg-white  items-center justify-center">
      <h1
        style={{
          WebkitTextStroke: "2px #1d4ed8",
          WebkitTextFillColor: "#1d4ed8",
        }}
        className="text-9xl font-extrabold  "
      >
        U
      </h1>
      <p className="text-xs mb-4 font-medium tracking-widest text-brand-deep">
        URUGO
      </p>
      <p
        style={{
          WebkitTextStroke: "0.5px #445c9c",
          WebkitTextFillColor: "transparent",
        }}
        className="text-md text-gray-400 font-medium tracking-widest uppercase "
      >
        Rental Platform
      </p>
      <p className="max-w-sm text-[12px] uppercase text-center mt-4 leading-7 text-gray-400 ">
        {`  Rwanda's verified rental platform for landlords, renters, and guests.`}
      </p>
    </div>
  );
}

export default BrandLogo;
