import Loader from "@/components/ui/Loader";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="grid size-full place-items-center bg-black-500">
      <Loader />
    </div>
  );
}
