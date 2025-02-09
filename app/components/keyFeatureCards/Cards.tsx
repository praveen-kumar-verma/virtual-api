
interface CardsProps {
    title: string;
    description: string;
}

export default function Cards( { title, description} : CardsProps ) {
  return (
    <div className="max-w-sm p-6 bg-white border text-center border-gray-200 rounded-lg shadow-sm dark:bg-[#ECDFCC] dark:border-gray-700">
        <h5 className="mb-2 text-2xl font-bold text-[#ff8433] dark:text-[#ff8433]">
            {title}
        </h5>
      <p className="mb-3 font-normal text-black dark:text-black">
        {description}
      </p>
      
    </div>
  );
}
