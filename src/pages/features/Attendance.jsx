import React, { useState, useMemo, useEffect } from 'react';
import "./Employees.css";
import { useTable, useGlobalFilter, useAsyncDebounce } from 'react-table';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from 'src/pages/features/config.js';
import Header from '../../components/Header';


// Componente para el buscador (filtro global)
function EmployeesFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) {
  const totalEmployees = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);

  const onFilterChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  const handleInputChange = (e) => {
    setValue(e.target.value);
    onFilterChange(e.target.value);
  };

  return (
    <span className="employees-filter">
      Buscador global: 
      <input
        size={50}
        value={value || ""}
        onChange={handleInputChange}
        placeholder={`${totalEmployees} empleados`}
      />
    </span>
  );
}

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener los empleados de Firebase
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const employeesCol = collection(db, 'employees');
      const employeeSnapshot = await getDocs(employeesCol);
      const employeeList = employeeSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEmployees(employeeList);
      setError(null);
    } catch (error) {
      console.error("Error al obtener empleados:", error);
      setError("Error al cargar los empleados. Por favor, intenta más tarde.");
    } finally {
      setLoading(false);
    }
  };

  // Cargar empleados cuando el componente se monta
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Función para agregar un empleado
  const addEmployee = async (employeeData) => {
    try {
      const docRef = await addDoc(collection(db, 'employees'), employeeData);
      console.log("Empleado agregado con ID: ", docRef.id);
      await fetchEmployees(); // Actualizar la lista
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error("Error al agregar empleado:", error);
      return { success: false, error: error.message };
    }
  };

  // Función para actualizar un empleado
  const updateEmployee = async (id, employeeData) => {
    try {
      const employeeDoc = doc(db, 'employees', id);
      await updateDoc(employeeDoc, employeeData);
      await fetchEmployees(); // Actualizar la lista
      return { success: true };
    } catch (error) {
      console.error("Error al actualizar empleado:", error);
      return { success: false, error: error.message };
    }
  };

  // Función para eliminar un empleado
  const deleteEmployee = async (id) => {
    try {
      const employeeDoc = doc(db, 'employees', id);
      await deleteDoc(employeeDoc);
      await fetchEmployees(); // Actualizar la lista
      return { success: true };
    } catch (error) {
      console.error("Error al eliminar empleado:", error);
      return { success: false, error: error.message };
    }
  };

  // Definir las columnas para la tabla
  const columns = useMemo(
    () => [
      {
        Header: 'Tipo de ID',
        accessor: 'id_type',
      },
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Nombre(s)',
        accessor: 'name',
      },
      {
        Header: 'Apellido(s)',
        accessor: 'last_name',
      },
      {
        Header: 'Fecha de Nacimiento',
        accessor: 'birthdate',
      },
      {
        Header: 'Edad',
        accessor: 'age',
      },
      {
        Header: 'Ciudad',
        accessor: 'city',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Teléfono',
        accessor: 'phone',
      },
      {
        Header: 'Fecha de Contratación',
        accessor: 'hiring_date',
      },
      {
        Header: 'Cargo',
        accessor: 'post',
      },
      {
        Header: 'Departamento',
        accessor: 'department',
      },
      {
        Header: 'Acciones',
        accessor: 'actions',
        Cell: ({ row }) => (
          <div className="action-buttons">
            <button
              onClick={() => handleEdit(row.original)}
              className="edit-button"
            >
              Editar
            </button>
            <button
              onClick={() => handleDelete(row.original.id)}
              className="delete-button"
            >
              Eliminar
            </button>
          </div>
        ),
      },
    ],
    []
  );

  // Manejadores para las acciones de editar y eliminar
  const handleEdit = (employee) => {
    // Aquí puedes implementar la lógica para editar
    console.log('Editando empleado:', employee);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este empleado?')) {
      const result = await deleteEmployee(id);
      if (result.success) {
        alert('Empleado eliminado con éxito');
      } else {
        alert('Error al eliminar empleado: ' + result.error);
      }
    }
  };

  // Usar los datos de Firebase
  const data = useMemo(
    () => employees,
    [employees]
  );

  // Configuración de la tabla
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { globalFilter },
  } = useTable(
    {
      columns,
      data
    },
    useGlobalFilter
  );

  if (loading) {
    return (
      <div className="loading-container">
        <p>Cargando empleados...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={fetchEmployees}>Reintentar</button>
      </div>
    );
  }

  return (
    <div className="employees-container">
      <Header/>
      <h1>Tabla de Empleados</h1>

      <div className="table-controls">
        <EmployeesFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <button 
          className="add-employee-button"
          onClick={() => {/* Implementar lógica para agregar empleado */}}
        >
          Agregar Empleado
        </button>
      </div>

      <div className="table-container">
        <table {...getTableProps()} className="employees-table">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {rows.length === 0 && !loading && (
        <div className="no-data">
          No hay empleados para mostrar
        </div>
      )}
    </div>
  );
};

export default Employees;