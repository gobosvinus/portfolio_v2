import { POLICY_DATA } from "@/data/static";

export default function Services() {
  return (
    <section className="h-max min-h-screen w-screen bg-black-500">
      <div className="container pb-20 pt-40">
        <h1 className="mb-20 font-main text-4xl leading-[48px] text-yellow">
          Политика обработки персональных данных
        </h1>
        {POLICY_DATA.map((element, index) => {
          return <TextBlock data={element} key={index} />;
        })}
      </div>
    </section>
  );
}

export interface TextBlockProps {
  title: string;
  listItems: String[];
}

const TextBlock = ({ data }: { data: TextBlockProps }) => {
  return (
    <article className="mt-10 flex flex-col gap-4 font-secondary text-white">
      <h2 className="text-xl font-bold">{data.title}</h2>
      <ul className="flex flex-col gap-2 text-base text-white/70">
        {data.listItems.map((element, index) => {
          return <li key={index}>{element}</li>;
        })}
      </ul>
    </article>
  );
};
