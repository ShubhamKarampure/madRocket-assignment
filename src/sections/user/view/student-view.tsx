import { useState, useEffect } from 'react';
import { collection, getFirestore, onSnapshot } from 'firebase/firestore';
import {
  Box,
  Card,
  Table,
  Button,
  TableBody,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { TableNoData } from '../table-no-data';
import { UserTableHead } from '../user-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { UserTableToolbar } from '../user-table-toolbar';
import { AddStudentModal } from '../add-student-modal';
import { StudentTableRow } from '../student-table-row';
import { ViewStudentModal } from '../view-student-modal';
import { EditStudentModal } from '../edit-student-modal';
import { Student } from '../type';
import { useTable, filterStudents, deleteStudent, deleteMultipleStudents } from '../utils';

const firestore = getFirestore();

interface FilterState {
  name: string;
  class: string;
  section: string;
}

export function StudentsView() {
  const [students, setStudents] = useState<Student[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    name: '',
    class: '',
    section: ''
  });
  const [viewStudent, setViewStudent] = useState<Student | null>(null);
  const [editStudent, setEditStudent] = useState<Student | null>(null);

  const table = useTable();
  
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'students'), (snapshot) => {
      const studentData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Student[];
      setStudents(studentData);
    });

    return () => unsubscribe();
  }, []);

  const handleView = (student: Student) => {
    setViewStudent(student);
  };

  const handleEdit = (student: Student) => {
    setEditStudent(student);
  };

  const handleSuccess = () => {
    setEditStudent(null);
  };

  const handleDelete = async (id: string) => {
      const success = await deleteStudent(id);
      if (!success) {
        alert('Failed to delete student. Please try again.');
      }
  };

  const handleBulkDelete = async () => {
    if (table.selected.length === 0) return;
      const success = await deleteMultipleStudents(table.selected);
      if (success) {
        table.onSelectAllRows(false, []);
      } else {
        alert('Failed to delete selected students. Please try again.');
      }
  };

  const handleFilterChange = (field: keyof FilterState) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilters((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const filteredStudents = filterStudents(students, filters);

  return (
    <>
      <Box display="flex" alignItems="center" mb={5} m={3}>
        <Typography variant="h4" flexGrow={1}>
          Students
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={() => setOpenModal(true)}
        >
          Add Student
        </Button>
      </Box>

      <Box m={3}>
        <Card>
          <UserTableToolbar
            numSelected={table.selected.length}
            filterName={filters.name}
            onFilterName={handleFilterChange('name')}
            selectedIds={table.selected}
            onDeleteSelected={handleBulkDelete}
          />

          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 700 }}>
                <UserTableHead
                  order={table.order}
                  orderBy={table.orderBy}
                  rowCount={students.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      students.map((student) => student.id!)
                    )
                  }
                  headLabel={[
                    { id: 'uid', label: 'UID' },
                    { id: 'name', label: 'Name' },
                    { id: 'class', label: 'Class' },
                    { id: 'section', label: 'Section' },
                    { id: 'rollNumber', label: 'Roll Number' },
                    { id: 'actions', label: 'Actions' },
                  ]}
                />
                <TableBody>
                  {filteredStudents
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((student) => (
                      <StudentTableRow
                        key={student.id}
                        student={student}
                        selected={table.selected.includes(student.id!)}
                        onSelectRow={() => table.onSelectRow(student.id!)}
                        onView={handleView}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    ))}

                  <TableEmptyRows
                    height={68}
                    emptyRows={table.emptyRows(students.length)}
                  />

                  {!filteredStudents.length && (
                    <TableNoData searchQuery={filters.name} />
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            page={table.page}
            count={filteredStudents.length}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </Card>
      </Box>

      {/* Modals */}
      <AddStudentModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={() => setOpenModal(false)}
      />

      <ViewStudentModal
        student={viewStudent}
        open={!!viewStudent}
        onClose={() => setViewStudent(null)}
      />

      <EditStudentModal
        student={editStudent}
        open={!!editStudent}
        onClose={() => setEditStudent(null)}
        onSuccess={handleSuccess}
      />
    </>
  );
}