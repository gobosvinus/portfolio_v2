import Loader from "@/components/ui/Loader";

export default function Services() {
  return (
    <div className="grid h-screen w-screen place-items-center bg-black-500">
      <div className="relative col-span-1 row-span-1 flex flex-col">
        <p className="font-secondary text-2xl text-white">
          Данная страница еще в разработке :)
        </p>
        <Loader
          className="top-[200%] bg-black-300"
          childrenClassName="bg-yellow"
        />
      </div>
    </div>
  );
}
