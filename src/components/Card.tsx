interface CardProps {
    title: string;
    description: string;
  }
  
  const Card = ({ title, description }: CardProps) => {
    return (
      <div className="max-w-sm rounded-xl shadow-lg bg-white p-5 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    );
  };
  
  export default Card;
  