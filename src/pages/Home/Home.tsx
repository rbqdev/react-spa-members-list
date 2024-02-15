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
import { HomeContextProvider } from "./contexts/HomeContext";

export function Home() {
  return (
    <HomeContextProvider>
      <div className="relative">
        <Header />
        <PageTitle
          breadcrumbs={["Home", "Usuários"]}
          title="Lista de membros"
        />
        <div className="flex justify-center">
          <Content className="flex gap-4">
            <SidebarFilterController />
            <MembersListController />
          </Content>
        </div>
        <Footer />
      </div>
    </HomeContextProvider>
  );
}
