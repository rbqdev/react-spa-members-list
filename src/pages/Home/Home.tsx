import Content from "@components/Content";
import { Footer } from "@components/Footer/Footer";
import { Header } from "@components/Header/Header";
import PageTitle from "@components/PageTitle";
import { useMemo, useState } from "react";
import { SidebarFilter } from "./components/SidebarFilter/SidebarFilter";
import { defaultLimitStates } from "./constants";
import { useStates } from "hooks/useStates";
import { MembersListController } from "./components/MembersList/MembersListController";
import { v4 as uuidv4 } from "uuid";
import { SidebarFilterController } from "./components/SidebarFilter/SidebarFilterController";

export function Home() {
  const [membersListControllerKey, setMembersListControllerKey] = useState(
    uuidv4()
  );

  return (
    <div className="relative">
      <Header />
      <PageTitle breadcrumbs={["Home", "Usuários"]} title="Lista de membros" />
      <div className="flex justify-center min-h-[600px]">
        <Content className="flex gap-4">
          <SidebarFilterController
            onSetMembersListControllerKey={() =>
              setMembersListControllerKey(uuidv4())
            }
          />
          <MembersListController
            key={membersListControllerKey}
            statesSelected={[]}
          />
        </Content>
      </div>
      <Footer />
    </div>
  );
}
