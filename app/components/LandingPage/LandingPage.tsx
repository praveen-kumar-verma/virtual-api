import DynamicButton from "../dynamicButton/DynamicButton";
import Cards from "../keyFeatureCards/Cards";

export default function LandingPage() {
  const cardDetails = [
    {
      title: "Mock API Generation",
      description:
        "Create mock APIs instantly to speed up your development process.",
    },
    {
      title: "Seamless Integration",
      description:
        "Easily integrate with your frontend applications without backend dependencies.",
    },
    {
      title: "Customizable Responses",
      description:
        "Modify response data, status codes, and delays for testing edge cases.",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center  px-4">
      <div className="flex flex-col justify-center hero-container text-center max-w-4xl h-[50vh]">
        <h1 className="text-6xl font-bold text-white mb-4">
          Instant Mock APIs for Faster Development
        </h1>
        <p className="text-2xl py-4 text-[#ff8433]">
          Create, test, and prototype APIs in seconds—no backend required! Fully
          customizable responses, delays, and errors to streamline your
          workflow.
        </p>
        <DynamicButton />
      </div>

      <div>
        <h1 className="text-4xl font-bold text-white py-8">Key Features</h1>
        <div className="flex flex-wrap justify-center gap-4 py-4">
          {cardDetails.map((card) => (
            <Cards
              key={card.title}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
