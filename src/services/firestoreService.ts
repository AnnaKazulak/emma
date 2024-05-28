import { db } from "@/firebase/init";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { Employee } from "@/types/types";

const employeesCollection = collection(db, "employees");

export const getEmployees = async (): Promise<Employee[]> => {
    const snapshot = await getDocs(employeesCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Employee[];
};

export const addEmployee = async (employee: Employee): Promise<string> => {
    const docRef = await addDoc(employeesCollection, employee);
    return docRef.id;
};

export const updateEmployee = async (id: string, employee: Employee): Promise<void> => {
    const employeeDoc = doc(db, "employees", id);
    await updateDoc(employeeDoc, employee);
};

export const deleteEmployee = async (id: string): Promise<void> => {
    const employeeDoc = doc(db, "employees", id);
    await deleteDoc(employeeDoc);
};
