  import React, { useState } from 'react';
  import { uploadPlantImage } from '../../services/herbarium.service';

  const PlantImageUpload: React.FC<{ plantId: number }> = ({ plantId }) => {
    const [file, setFile] = useState<File | null>(null);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!file) return;

      setLoading(true);
      try {
        const result = await uploadPlantImage(plantId, file, description);
        console.log('Image uploaded:', result);
        // Limpiar formulario
        setFile(null);
        setDescription('');
      } catch (error) {
        console.error('Upload failed:', error);
      } finally {
        setLoading(false);
      }
    };

    return (
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-2 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Descripción (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-2 p-2 border rounded block"
        />
        <button 
          type="submit" 
          disabled={!file || loading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          {loading ? 'Subiendo...' : 'Subir imagen'}
        </button>
      </form>
    );
  };

  const AdminDashboard = () => {
    return (
      <div className="p-6">
      <h1 className="text-2xl font-bold">Panel de Administración</h1>
      <p className="mt-2">Aquí puedes gestionar la información del sistema.</p>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Subir Imagen de Planta</h2>
        <PlantImageUpload plantId={7} /> {/* Asegúrate de pasar el plantId correcto */}
      </div>
      </div>
    );
  };
    
  export default AdminDashboard;