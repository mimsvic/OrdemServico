import React, { useState, useEffect } from 'react';
import axios from '../services/axios';

const ManagerCrud = () => {
    const [gestores, setGestores] = useState([]);
    const [newGestor, setNewGestor] = useState({
        ni: '',
        nome: '',
        area: '',
        cargo: '',
    });
    const [editingGestor, setEditingGestor] = useState(null);

    const fetchGestores = async () => {
        try {
            const response = await axios.get('/data/gestor/');
            setGestores(response.data);
        } catch (error) {
            console.error('Error fetching gestores:', error);
        }
    };

    useEffect(() => {
        fetchGestores();
    }, []);

    const handleCreateGestor = async () => {
        try {
            await axios.post('/data/gestor/', newGestor);
            fetchGestores();
            setNewGestor({ ni: '', nome: '', area: '', cargo: '' });
        } catch (error) {
            console.error('Error creating gestor:', error);
        }
    };

    const handleUpdateGestor = async () => {
        try {
            await axios.put(`/data/gestor/${editingGestor.id}/`, newGestor);
            fetchGestores();
            setEditingGestor(null);
            setNewGestor({ ni: '', nome: '', area: '', cargo: '' });
        } catch (error) {
            console.error('Error updating gestor:', error);
        }
    };

    const handleDeleteGestor = async (id) => {
        try {
            await axios.delete(`/data/gestor/${id}/`);
            fetchGestores();
        } catch (error) {
            console.error('Error deleting gestor:', error);
        }
    };

    const handleEditGestor = (gestor) => {
        setEditingGestor(gestor);
        setNewGestor(gestor);
    };

    const listChildren = () => {
        if (Array.isArray(gestores) && gestores.length > 0) {
            return gestores.map((gestor) => (
                <li
                    key={gestor.id}
                    className="flex justify-between items-center bg-white shadow p-4 rounded-lg mb-2"
                >
                    <span className="text-gray-700">
                        {gestor.nome} - {gestor.ni} - {gestor.area} - {gestor.cargo}
                    </span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleEditGestor(gestor)}
                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDeleteGestor(gestor.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ));
        } else {
            return <p className="text-gray-500 mt-4">Nenhum gestor encontrado.</p>;
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded shadow mt-10">
            <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Gestores</h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                    type="text"
                    placeholder="NI"
                    value={newGestor.ni}
                    onChange={(e) => setNewGestor({ ...newGestor, ni: e.target.value })}
                    className="p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    placeholder="Nome"
                    value={newGestor.nome}
                    onChange={(e) => setNewGestor({ ...newGestor, nome: e.target.value })}
                    className="p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    placeholder="Área"
                    value={newGestor.area}
                    onChange={(e) => setNewGestor({ ...newGestor, area: e.target.value })}
                    className="p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    placeholder="Cargo"
                    value={newGestor.cargo}
                    onChange={(e) => setNewGestor({ ...newGestor, cargo: e.target.value })}
                    className="p-2 border border-gray-300 rounded"
                />
            </div>

            <button
                onClick={editingGestor ? handleUpdateGestor : handleCreateGestor}
                className={`w-full mb-6 py-2 rounded text-white ${
                    editingGestor
                        ? 'bg-blue-500 hover:bg-blue-600'
                        : 'bg-green-500 hover:bg-green-600'
                }`}
            >
                {editingGestor ? 'Atualizar Gestor' : 'Criar Gestor'}
            </button>

            <ul>{listChildren()}</ul>
        </div>
    );
};

export default ManagerCrud;
