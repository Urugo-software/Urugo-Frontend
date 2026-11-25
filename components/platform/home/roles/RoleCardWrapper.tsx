import { getTranslations } from "next-intl/server";

import { userTypes } from "@/data/home-data";
import RoleCard from "./RoleCard";

type RoleCardKey = "1" | "2" | "3";

async function RoleCardWrapper() {
  const t = await getTranslations("public.home.rolesSection.cards");

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {userTypes.map((userType) => {
        const key = String(userType.id) as RoleCardKey;
        const benefits = [
          t(`${key}.features.1`),
          t(`${key}.features.2`),
          t(`${key}.features.3`),
        ];
        return (
          <RoleCard
            key={userType.id}
            title={t(`${key}.title`)}
            description={t(`${key}.description`)}
            benefits={benefits}
            addedBy={t(`${key}.onboarding`)}
            Icon={userType.Icon}
            isHighlighted={userType.id === 2}
          />
        );
      })}
    </div>
  );
}

export default RoleCardWrapper;
