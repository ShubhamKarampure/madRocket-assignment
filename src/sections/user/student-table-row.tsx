import { useState, useCallback } from 'react';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';
import {
  Avatar,
  Box,
  Checkbox,
  IconButton,
  MenuItem,
  MenuList,
  Popover,
  TableCell,
  TableRow,
} from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { Student } from './type';
const firestore = getFirestore();

interface StudentTableRowProps {
  student: Student;
  selected: boolean;
  onSelectRow: () => void;
  onEdit: (student: Student) => void;
  onView: (student: Student) => void;
  onDelete: (id: string) => void;
}

export function StudentTableRow({
  student,
  selected,
  onSelectRow,
  onEdit,
  onView,
  onDelete,
}: StudentTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleDelete = async () => {
    if (student.id) {
      try {
        await deleteDoc(doc(firestore, 'students', student.id));
        onDelete(student.id);
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
    handleClosePopover();
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell>{student.id}</TableCell>
        <TableCell>{student.name}</TableCell>
        <TableCell>{student.class}</TableCell>
        <TableCell>{student.section}</TableCell>
        <TableCell>{student.rollNumber}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList sx={{ p: 0.5, gap: 0.5, width: 140, display: 'flex', flexDirection: 'column' }}>
          <MenuItem onClick={() => { onView(student); handleClosePopover(); }}>
            <Iconify icon="solar:eye-bold" />
            View
          </MenuItem>
          <MenuItem onClick={() => { onEdit(student); handleClosePopover(); }}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}