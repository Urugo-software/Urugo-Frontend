import { getTranslations } from "next-intl/server";

async function BrandLogo() {
  const t = await getTranslations("auth.brand");

  return (
    <div className="hidden flex-col items-center justify-center border-r border-line/70 bg-white px-10 text-body lg:flex">
      <span
        aria-hidden="true"
        style={{
          WebkitTextStroke: "2px #040200",
          WebkitTextFillColor: "#ffffff",
        }}
        className="select-none text-9xl font-extrabold leading-none"
      >
        U
      </span>

      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.25em] text-brand">
        {t("subtitle")}
      </p>
      <p className="mt-4 max-w-xs text-center text-sm leading-relaxed text-body">
        {t("tagline")}
      </p>
    </div>
  );
}

export default BrandLogo;
