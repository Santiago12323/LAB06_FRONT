import React, { useState, useEffect } from 'react';
import Analitica from './Analitica'; 

const TaskForm = ({ addTask, updateTask, updateIndex, taskToUpdate }) => {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [showAnalitica, setShowAnalitica] = useState(false); // Estado para mostrar el modal
    //e
    // Efecto para manejar el llenado del formulario al editar
    useEffect(() => {
        if (taskToUpdate) {
            setTaskName(taskToUpdate.nombre);
            setTaskDescription(taskToUpdate.descripcion);
        } else {
            resetForm();
        }
    }, [taskToUpdate]);

    const resetForm = () => {
        setTaskName('');
        setTaskDescription('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = {
            nombre: taskName,
            descripcion: taskDescription,
        };

        if (updateIndex >= 0) {
            // Si hay un índice de actualización, actualiza la tarea
            updateTask({ ...newTask, id: taskToUpdate.id }); // Incluye el id para la actualización
        } else {
            // Si no, agrega una nueva tarea
            addTask(newTask);
        }

        resetForm();
    };

    return (
        <form className="row g-3 justify-content-center" onSubmit={handleSubmit}>
            <div className="col-md-5">
                <input
                    type="text"
                    className="form-control"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    placeholder="Nombre de la tarea"
                    required
                />
            </div>
            <div className="col-md-5">
                <input
                    type="text"
                    className="form-control"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    placeholder="Descripción"
                    required
                />
            </div>
            <div className="col-md-2 d-flex">
                <button type="submit" className="btn btn-success me-2">
                    {updateIndex >= 0 ? 'Actualizar' : 'Agregar'}
                </button>
                <button type="button" className="btn btn-success w-100" onClick={() => setShowAnalitica(true)}>
                    Analítica
                </button>
            </div>
        </form>
    );
};

export default TaskForm;
