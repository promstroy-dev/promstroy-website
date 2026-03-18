import { CompanyData } from "@/types";

export const company: CompanyData = {
  name: "ПромСтрой",
  shortName: "ПромСтрой",
  founded: 2008,
  phone: "+79277111103",
  phoneDisplay: "+7 (927) 711-11-03",
  telegram: "@skpromstroy_samara",
  email: "alimbekov.promstroy@gmail.com",
  address: "",      // TODO: add real office address
  inn: "",          // TODO: add ИНН
  ogrn: "",         // TODO: add ОГРН
  stats: [
    { value: "18",      label: "лет на рынке"       },
    { value: "4",       label: "направления работ"   },
    { value: "Самара",  label: "и область"            },
    // TODO: add завершённых объектов when real count is confirmed
  ],
};
