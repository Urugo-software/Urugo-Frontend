import { getTranslations } from "next-intl/server";

import { ListData } from "@/data/home-data";
import { ListCard } from "./howItWorks/ListCard";

type ItemKey = "1" | "2" | "3" | "4" | "5" | "6";

async function ListWrapper() {
  const t = await getTranslations("public.home.landlordShowcase.items");

  return (
    <div>
      {ListData.map((item) => {
        const key = String(item.id) as ItemKey;
        return (
          <div key={item.id} className="mb-6">
            <ListCard
              title={t(`${key}.title`)}
              description={t(`${key}.description`)}
            />
          </div>
        );
      })}
    </div>
  );
}

export default ListWrapper;
