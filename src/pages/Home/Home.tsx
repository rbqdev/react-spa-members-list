import { useState } from "react";
import { MembersListController } from "./components/MembersList/MembersListController";
import { MembersSidebarFilterController } from "./components/MembersSidebarFilter/MembersSidebarFilterController";
import { HomeContextProvider } from "./contexts/HomeContext";
import { PageContainer } from "@components/PageContainer/PageContainer";
import { v4 as uuid } from "uuid";
import { MembersHeader } from "./components/MembersHeader/MembersHeader";
import "./Home.styles.css";
import { useMediaQueries } from "@hooks/useMediaQueries";

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
        <div className="home-content">
          <MembersSidebarFilterController />

          <div className="home-content__list">
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
