export type {
  SpinningLogosData,
  ServiceCardData,
  FooterBlock,
  IconItem,
  UpdatedServiceCardData,
  InputProps,
  NavbarMobileData,
};
import { UseFormRegister } from "react-hook-form";
import { IconType } from "react-icons";

interface SpinningLogosData {
  Icon: IconType;
  classNames: string;
}

interface ServiceCardData {
  title: string;
  description: string;
  id: number;
  src: string;
}

// Интерфейс для элементов с текстом
interface TextItem {
  name: string;
  href: string;
}

// Интерфейс для элементов с иконкой
interface IconItem {
  name: string;
  Icon: IconType;
  className?: string; // Используем className, так как это основной атрибут
  href?: string;
}

interface NavbarMobileData {
  title: string;
  content?: string[];
  id: number;
  href: string;
}

// Универсальный интерфейс для контента
type ContentItem = TextItem | IconItem;

// Интерфейс для блоков в FOOTER_DATA
interface FooterBlock {
  title: string;
  content: ContentItem[];
}

type UpdatedServiceCardData = {
  id: number;
  url: string;
  title: string;
  description: string;
};

interface InputProps {
  label: string;
  htmlFor: string;
  placeholder: string;
  type: string;
  id: string;
  name: string;
  classNames?: string;
  register?: UseFormRegister<any>;
  validation?: {};
}
