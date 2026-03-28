import { CompanyData } from "@/types";

export const company: CompanyData = {
  name: "ПромСтрой",
  shortName: "ПромСтрой",
  founded: 2015,
  phone: "+79277111103",
  phoneDisplay: "+7 (927) 711-11-03",
  telegram: "@skpromstroy_samara",
  email: "alimbekov.promstroy@gmail.com",
  address: "443124, г. Самара, Просека 6-я, д. 144, кв. 11",
  inn: "632507052478",
  ogrn: "324632700128069",
  stats: [
    { value: "11",       label: "лет на рынке",   sublabel: "с 2015 года в Самаре"     },
    { value: "50+",      label: "объектов сдано",  sublabel: "офисы, склады, рестораны"  },
    { value: "10 000+",  label: "м² построено",   sublabel: "коммерческая недвижимость" },
  ],
};
