import './styles/home.css';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800">Bienvenido a la App</h1>
      <p className="text-gray-600 mt-2">Explora la información disponible.</p>
      <table className="bg-white mt-4">
        <thead>
          <tr>
        <th className="border px-4 py-2">Index</th>
        <th className="border px-4 py-2">Número</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 40 }, (_, index) => (
        <tr key={index}>
          <td className="border px-4 py-2">{index + 1}</td>
          <td className="border px-4 py-2">{['UNO', 'DOS', 'TRES', 'CUATRO', 'CINCO', 'SEIS', 'SIETE', 'OCHO', 'NUEVE', 'DIEZ', 'ONCE', 'DOCE', 'TRECE', 'CATORCE', 'QUINCE', 'DIECISÉIS', 'DIECISIETE', 'DIECIOCHO', 'DIECINUEVE', 'VEINTE'][index]}</td>
        </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
