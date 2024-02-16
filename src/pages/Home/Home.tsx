import { MembersListController } from "./components/MembersList/MembersListController";
import { SidebarFilterController } from "./components/SidebarFilter/SidebarFilterController";
import { HomeContextProvider } from "./contexts/HomeContext";
import { PageContainer } from "@components/PageContainer/PageContainer";

export function Home() {
  return (
    <PageContainer breadcrumbs={["Home", "Membros"]} title="Lista de membros">
      <HomeContextProvider>
        <div className="flex gap-4">
          <SidebarFilterController />
          <MembersListController />
        </div>
      </HomeContextProvider>
    </PageContainer>
  );
}
