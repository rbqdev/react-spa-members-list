import { api } from "@api/api";
import { Member } from "@api/sharedTypes";
import { PageContainer } from "@components/PageContainer/PageContainer";
import { AvatarFallback, AvatarImage } from "@lib/shadcn/components/ui/avatar";
import { Separator } from "@lib/shadcn/components/ui/separator";
import { Avatar } from "@radix-ui/react-avatar";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  MemberDetailsItem,
  MemberDetailsItemSkeleton,
} from "./MemberDetailsItem";

const getDetailsItems = (member?: Member) => [
  {
    label: "Perfil",
    content: (
      <Avatar className="w-[100px] h-[100px]">
        <AvatarImage
          src={member?.picture.large}
          alt={`${member?.name.first}-${member?.name.last}`}
          className="rounded-full border"
        />
        <AvatarFallback className="uppercase font-bold">
          {member?.name.first.charAt(0)}
          {member?.name.last.charAt(0)}
        </AvatarFallback>
      </Avatar>
    ),
  },
  {
    label: "Idade",
    content: <span>{member?.dob.age} anos</span>,
  },
  {
    label: "Email",
    content: <span>{member?.email}</span>,
  },
  {
    label: "Números de telefone",
    content: (
      <div className="flex flex-col items-center gap-2">
        <span>{member?.phone}</span>
        <span>{member?.cell}</span>
      </div>
    ),
  },
  {
    label: "Endereço",
    content: (
      <div className="flex items-center gap-2">
        <span className="capitalize">{member?.location.street}</span>
        <Separator orientation="vertical" className="min-h-4" />
        <span className="capitalize ">{member?.location.city}</span>
        <Separator orientation="vertical" className="min-h-4" />
        <span>CEP: {member?.location.postcode}</span>
      </div>
    ),
  },
];

export function MemberDetails() {
  const [member, setMember] = useState<Member | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const { email: emailEncoded } = useParams();
  const detailsItems = useMemo(() => getDetailsItems(member), [member]);

  const getMember = async () => {
    setIsLoading(true);
    const email = atob(emailEncoded ?? "");
    const { data } = await api.getMemberByEmail({ email });
    setMember(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getMember();
  }, [emailEncoded]);

  return (
    <PageContainer
      breadcrumbs={["Home", "Membros", "Detalhes"]}
      title={`${member?.name.first} ${member?.name.last}`}
      isLoading={isLoading}
    >
      {detailsItems.map(({ label, content }) => {
        if (isLoading) {
          return (
            <MemberDetailsItemSkeleton
              customContentClass={
                label === "Perfil" ? "h-[100px] w-[100px] rounded-full" : ""
              }
            />
          );
        }
        return <MemberDetailsItem label={label}>{content}</MemberDetailsItem>;
      })}
    </PageContainer>
  );
}
