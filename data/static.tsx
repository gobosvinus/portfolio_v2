import {
  FooterBlock,
  InputProps,
  NavbarMobileData,
  ServiceCardData,
  UpdatedServiceCardData,
} from "@/types/types.config";
import { SiInstagram, SiVk, SiWhatsapp } from "react-icons/si";
import { FiCopy } from "react-icons/fi";
import { FaTelegram } from "react-icons/fa6";

export const NAVBAR_DATA: { id: number; title: string; href: string }[] = [
  { id: 1, title: "Главная", href: "/" },
  { id: 2, title: "Услуги", href: "/services" },
  { id: 3, title: "Проекты", href: "/projects" },
];

export const NAVBAR_MOBILE_DATA: NavbarMobileData[] = [
  {
    title: "Главная",
    content: ["Главная", "Услуги", "Проекты"],
    id: 1,
    href: "/",
  },
  {
    title: "Услуги",
    content: [
      "Сайты",
      "Визитки",
      "Интернет-магазины",
      "MODERN AI",
      "Приглашения",
      "Телеграм-боты",
    ],
    id: 2,
    href: "/services",
  },
  {
    title: "Проекты",
    content: ["Список"],
    id: 3,
    href: "/projects",
  },
];

export const SERVICES_DATA: ServiceCardData[] = [
  {
    title: "сайты",
    description:
      "Создаем сайты для онлайн и оффлайн бизнеса с адаптивным дизайном",
    id: 1,
    src: "/assets/serviceSites.png",
  },
  {
    title: "ТЕЛЕГРАМ БОТЫ",
    description: "Создаем умных телеграм-ботов любой сложности",
    id: 2,
    src: "/assets/serviceTelegram.png",
  },
  {
    title: "Modern AI",
    description: "Интегрируем искуственный интеллект в ваши проекты",
    id: 3,
    src: "/assets/serviceAi.png",
  },
  {
    title: "ВИЗИТКИ",
    description:
      "Создаем визитки и приглашения с главной информацией с минимальными вложениями",
    id: 4,
    src: "/assets/serviceVisitka.png",
  },
];

export const FOOTER_DATA: FooterBlock[] = [
  {
    title: "Навигация",
    content: [
      { name: "Главная", href: "/" },
      { name: "Услуги", href: "/services" },
      { name: "Проекты", href: "/projects" },
    ],
  },
  {
    title: "Социальные сети",
    content: [
      {
        name: "Telegram",
        Icon: FaTelegram,
        className: "text-xl",
        href: "https://t.me/gobosvin",
      },
      {
        name: "Instagram",
        Icon: SiInstagram,
        className: "text-xl",
        href: "https://www.instagram.com/vludik_i/?img_index=1",
      },
      {
        name: "VK",
        Icon: SiVk,
        className: "text-xl",
        href: "https://vk.com/id146875636",
      },
      {
        name: "Whatsapp",
        Icon: SiWhatsapp,
        className: "text-xl",
        href: "https://api.whatsapp.com/send/?phone=79041527074&text&type=phone_number&app_absent=0",
      },
    ],
  },
  {
    title: "Email",
    content: [{ name: "vlad22420@gmail.com", Icon: FiCopy }],
  },
];

export const UPDATED_SERVICE_CARDS_DATA: UpdatedServiceCardData[] = [
  {
    title: "сайты",
    description:
      "Создаю сайты для онлайн и оффлайн бизнеса с адаптивным дизайном",
    id: 1,
    url: "/assets/newSites.jpeg",
  },
  {
    title: "ТЕЛЕГРАМ БОТЫ",
    description: "Программирую умных телеграм-ботов любой сложности",
    id: 2,
    url: "/assets/newTelegram.png",
  },
  {
    title: "Modern AI",
    description: "Интегрирую искуственный интеллект в ваши проекты",
    id: 3,
    url: "/assets/newAi.gif",
  },
  {
    title: "ВИЗИТКИ",
    description:
      "Делаю визитки и приглашения с главной информацией с минимальными вложениями",
    id: 4,
    url: "/assets/newVisitka.png",
  },
];

export const FORM_DATA: InputProps[] = [
  {
    label: "Имя",
    htmlFor: "first-name",
    placeholder: "Павел",
    type: "text",
    id: "first-name",
    name: "firstName",
  },
  {
    label: "Фамилия",
    htmlFor: "second-name",
    placeholder: "Дуров",
    type: "text",
    id: "second-name",
    name: "secondName",
  },
  {
    label: "Телефон",
    htmlFor: "phone-number",
    placeholder: "+7",
    type: "text",
    id: "phone-number",
    name: "phoneNumber",
  },
  {
    label: "Email",
    htmlFor: "email",
    placeholder: "paveldurov@france.com",
    type: "email",
    id: "email",
    name: "email",
  },
  {
    label: "Описание",
    htmlFor: "description",
    placeholder: "Расскажите о свое проекте (опиционально)",
    type: "text-area",
    id: "description",
    name: "description",
  },
  {
    label: "Описание",
    htmlFor: "privacy-consent",
    placeholder: "Расскажите о свое проекте (опиционально)",
    type: "chekbox",
    id: "privacy-consent",
    name: "privacConsent",
  },
];
