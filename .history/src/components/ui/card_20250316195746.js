export function Card({ children }) {
    return <div className="bg-white shadow-md rounded-lg p-6">{children}</div>;
  }
  
  export function CardContent({ children }) {
    return <div className="mt-4">{children}</div>;
  }