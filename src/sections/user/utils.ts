import { useState, useCallback } from 'react';
import { doc, deleteDoc, getFirestore } from 'firebase/firestore';
import { Student } from './type';

const firestore = getFirestore();

export function useTable() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<string[]>([]);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectRow = useCallback(
    (id: string) => {
      const selectedIndex = selected.indexOf(id);
      let newSelected: string[] = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }
      setSelected(newSelected);
    },
    [selected]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const emptyRows = (total: number) => page > 0 ? Math.max(0, (1 + page) * rowsPerPage - total) : 0;

  return {
    page,
    order,
    orderBy,
    selected,
    rowsPerPage,
    onSort,
    onSelectRow,
    onSelectAllRows,
    onChangePage,
    onChangeRowsPerPage,
    emptyRows,
  };
}

// Extended filter types
interface FilterState {
  name: string;
  class: string;
  section: string;
}

// Filter utility function
export const filterStudents = (students: Student[], filters: FilterState) => 
  students.filter((student) => {
    const nameMatch = student.name.toLowerCase().includes(filters.name.toLowerCase());
    const classMatch = !filters.class || student.class === filters.class;
    const sectionMatch = !filters.section || student.section === filters.section;
    return nameMatch && classMatch && sectionMatch;
  });


// Delete utility function
export const deleteStudent = async (studentId: string) => {
  try {
    await deleteDoc(doc(firestore, 'students', studentId));
    return true;
  } catch (error) {
    console.error('Error deleting student:', error);
    return false;
  }
};

// Bulk delete utility function
export const deleteMultipleStudents = async (studentIds: string[]) => {
  try {
    const deletePromises = studentIds.map((id) => 
      deleteDoc(doc(firestore, 'students', id))
    );
    await Promise.all(deletePromises);
    return true;
  } catch (error) {
    console.error('Error deleting multiple students:', error);
    return false;
  }
};