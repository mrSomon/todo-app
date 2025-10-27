import SimpleDragger from "@/components/SimpleDragger/SimpleDragger";
import SimpleTasksDragger from "@/components/SimpleDragger/SimpleTasksDragger";

export default function Home() {
  return (
    <div className="container mx-auto py-5">
      <SimpleDragger />
      <SimpleTasksDragger />
    </div>
  );
}
