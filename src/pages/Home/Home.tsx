import { useState } from "react";
import { MembersListController } from "./components/MembersList/MembersListController";
import { MembersListSidebarController } from "./components/MembersListSidebar/MembersListSidebarController";
import { HomeContextProvider } from "./contexts/HomeContext";
import { PageContainer } from "@components/PageContainer/PageContainer";
import { v4 as uuid } from "uuid";
import { MembersListHeader } from "./components/MembersListHeader/MembersHeader";

export function Home() {
  const [membersListControllerKey, setMembersListControllerKey] = useState(
    uuid()
  );
  const handleResetMembersListControllerByOrderByChange = () => {
    console.log("Chamou", uuid());
    setMembersListControllerKey(uuid());
  };
  return (
    <PageContainer breadcrumbs={["Home", "Membros"]} title="Lista de membros">
      <HomeContextProvider>
        <div className="flex gap-4">
          <MembersListSidebarController />

          <div className="flex flex-col gap-4 flex-1">
            <MembersListHeader
              onOrderChange={handleResetMembersListControllerByOrderByChange}
            />
            <MembersListController key={membersListControllerKey} />
          </div>
        </div>
      </HomeContextProvider>
    </PageContainer>
  );
}
