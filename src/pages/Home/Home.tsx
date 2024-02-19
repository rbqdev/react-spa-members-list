import { useState } from "react";
import { MembersListController } from "./components/MembersList/MembersListController";
import { MembersSidebarController } from "./components/MembersSidebar/MembersSidebarController";
import { HomeContextProvider } from "./contexts/HomeContext";
import { PageContainer } from "@components/PageContainer/PageContainer";
import { v4 as uuid } from "uuid";
import { MembersHeader } from "./components/MembersHeader/MembersHeader";

export function Home() {
  const [membersListControllerKey, setMembersListControllerKey] = useState(
    uuid()
  );
  const handleResetMembersListControllerByOrderByChange = () => {
    setMembersListControllerKey(uuid());
  };
  return (
    <PageContainer breadcrumbs={["Home", "Membros"]} title="Lista de membros">
      <HomeContextProvider>
        <div className="flex gap-4">
          <MembersSidebarController />
          <div className="flex flex-col gap-4 flex-1">
            <MembersHeader
              onOrderChange={handleResetMembersListControllerByOrderByChange}
            />
            <MembersListController key={membersListControllerKey} />
          </div>
        </div>
      </HomeContextProvider>
    </PageContainer>
  );
}
