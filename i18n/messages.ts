import type { AppLocale } from "./config";

export async function loadLocaleMessages(locale: AppLocale) {
  const [common, publicSite, properties, auth, landlord, renter, admin] =
    await Promise.all([
      import(`@/messages/${locale}/common.json`),
      import(`@/messages/${locale}/public.json`),
      import(`@/messages/${locale}/properties.json`),
      import(`@/messages/${locale}/auth.json`),
      import(`@/messages/${locale}/landlord.json`),
      import(`@/messages/${locale}/renter.json`),
      import(`@/messages/${locale}/admin.json`),
    ]);

  return {
    common: common.default,
    public: publicSite.default,
    properties: properties.default,
    auth: auth.default,
    landlord: landlord.default,
    renter: renter.default,
    admin: admin.default,
  };
}
