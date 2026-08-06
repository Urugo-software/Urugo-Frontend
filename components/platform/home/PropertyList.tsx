import { ListData } from "@/data/data";
import { ListCard } from "./howItWorks/ListCard";

function ListWrapper() {
  return (
    <div>
      {ListData.map((item) => (
        <div key={item.id} className="mb-6">
          <ListCard title={item.title} description={item.description} />
        </div>
      ))}
    </div>
  );
}

export default ListWrapper;
