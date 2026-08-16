import { userTypes } from "@/data/home-data";
import RoleCard from "./RoleCard";

function RoleCardWrapper() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {userTypes.map((userType) => (
        <RoleCard
          key={userType.id}
          title={userType.title}
          description={userType.description}
          benefits={userType.features}
          addedBy={userType.onboarding}
          Icon={userType.Icon}
          isHighlighted={userType.title.toLocaleLowerCase() === "guests"}
        />
      ))}
    </div>
  );
}

export default RoleCardWrapper;
