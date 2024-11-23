import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { users } from './Employees'; 

export const migrateData = async () => {
  try {
    const employeesCol = collection(db, 'employees');
    let migratedCount = 0;
    
    for (const user of users) {
      await addDoc(employeesCol, user);
      migratedCount++;
      console.log(`Migrado ${migratedCount} de ${users.length} empleados`);
    }
    
    console.log('Migración completada exitosamente');
    return { success: true, count: migratedCount };
  } catch (error) {
    console.error('Error en la migración:', error);
    return { success: false, error: error.message };
  }
};