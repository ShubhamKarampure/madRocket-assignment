import { useState, useEffect } from 'react';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
    MenuItem,
  Box,
} from '@mui/material';
import { Student } from './type';
const firestore = getFirestore();
const storage = getStorage();

interface EditStudentModalProps {
  student: Student | null;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function EditStudentModal({ student, open, onClose, onSuccess }: EditStudentModalProps) {
  const [formData, setFormData] = useState<Student | null>(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (student) {
      setFormData(student);
    }
  }, [student]);

  if (!formData) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!student?.id) return;

    try {
      
      const studentRef = doc(firestore, 'students', student.id);
      await updateDoc(studentRef, {
        ...formData,
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Student</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            
            {/* Add all form fields similar to AddStudentModal */}
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Grid>
            {/* Add all other form fields here */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit" variant="contained">Update Student</Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
}