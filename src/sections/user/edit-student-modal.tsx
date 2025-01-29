import React, { useState, useCallback, useEffect } from 'react';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Typography,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Divider,
  SelectChangeEvent,
  FormHelperText
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SchoolIcon from '@mui/icons-material/School';
import type { Student } from './type';

const firestore = getFirestore();

interface EditStudentModalProps {
  student: Student | null;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface ValidationErrors {
  [key: string]: string;
}

const validateForm = (formData: Student): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (/\d/.test(formData.name)) {
    errors.name = 'Name should not contain numbers';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(formData.phone)) {
    errors.phone = 'Phone number must be exactly 10 digits';
  }

  if (/\d/.test(formData.guardianName)) {
    errors.guardianName = 'Guardian name should not contain numbers';
  }

  const classNum = parseInt(formData.class, 10);
  if (Number.isNaN(classNum) || classNum < 1 || classNum > 12) {
    errors.class = 'Class should be between 1 and 12';
  }

  if (formData.section.length !== 1) {
    errors.section = 'Section should be a single character';
  }

  if (formData.rollNumber <= 0) {
    errors.rollNumber = 'Roll number should be greater than 0';
  }

  const dob = new Date(formData.dob);
  const today = new Date();
  const age = today.getFullYear() - dob.getFullYear();
  if (age < 4 || age > 20) {
    errors.dob = 'Student age should be between 4 and 20 years';
  }

  if (formData.address.length < 10) {
    errors.address = 'Address should be at least 10 characters long';
  }

  return errors;
};

export function EditStudentModal({ student, open, onClose, onSuccess }: EditStudentModalProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [formData, setFormData] = useState<Student | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (student && open) {
      setFormData(student);
      setErrors({});
      setTouched({});
    }
  }, [student, open]);

  const handleBlur = useCallback((field: string) => {
    if (!formData) return;
    
    setTouched(prev => ({ ...prev, [field]: true }));
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
  }, [formData]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;

    const { name, value } = e.target;
    setFormData(prev => {
      if (!prev) return prev;
      return { ...prev, [name]: value };
    });

    if (touched[name]) {
      const validationErrors = validateForm({
        ...formData,
        [name]: value,
      });
      setErrors(validationErrors);
    }
  }, [formData, touched]);

  const handleSelectChange = useCallback((e: SelectChangeEvent<string>) => {
    if (!formData) return;
    
    setFormData(prev => {
      if (!prev) return prev;
      return { ...prev, gender: e.target.value as string };
    });
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData?.id) return;

    const validationErrors = validateForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
      return;
    }

    try {
      const studentRef = doc(firestore, 'students', formData.id);
      await updateDoc(studentRef, { ...formData });
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  if (!formData) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={fullScreen}
      PaperProps={{
        sx: {
          borderRadius: 2,
          bgcolor: 'background.paper',
        }
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: 'background.neutral'
        }}
      >
        <Box display="flex" alignItems="center">
          <SchoolIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6">Edit Student</Typography>
        </Box>
        <IconButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Paper elevation={0} sx={{ p: 3, mb: 3, mt: 3, bgcolor: 'background.neutral', borderRadius: 2 }}>
            <TextField
              label="Student ID"
              name="uid"
              value={formData.uid}
              onChange={handleChange}
              onBlur={() => handleBlur('uid')}
              error={touched.uid && !!errors.uid}
              helperText={touched.uid && errors.uid}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={() => handleBlur('name')}
              error={touched.name && !!errors.name}
              helperText={touched.name && errors.name}
              required
              fullWidth
              margin="normal"
            />
          </Paper>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={() => handleBlur('phone')}
                error={touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                label="Date of Birth"
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                onBlur={() => handleBlur('dob')}
                error={touched.dob && !!errors.dob}
                helperText={touched.dob && errors.dob}
                InputLabelProps={{ shrink: true }}
                required
                fullWidth
                margin="normal"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl 
                fullWidth 
                margin="normal" 
                error={touched.gender && !!errors.gender}
                sx={{
                  '& .MuiInputLabel-root': {
                    backgroundColor: 'background.paper',
                    px: 1
                  }
                }}
              >
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleSelectChange}
                  onBlur={() => handleBlur('gender')}
                  required
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
                {touched.gender && errors.gender && (
                  <FormHelperText>{errors.gender}</FormHelperText>
                )}
              </FormControl>
              
              <TextField
                label="Guardian Name"
                name="guardianName"
                value={formData.guardianName}
                onChange={handleChange}
                onBlur={() => handleBlur('guardianName')}
                error={touched.guardianName && !!errors.guardianName}
                helperText={touched.guardianName && errors.guardianName}
                required
                fullWidth
                margin="normal"
              />
              
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    label="Class"
                    name="class"
                    value={formData.class}
                    onChange={handleChange}
                    onBlur={() => handleBlur('class')}
                    error={touched.class && !!errors.class}
                    helperText={touched.class && errors.class}
                    required
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Section"
                    name="section"
                    value={formData.section}
                    onChange={handleChange}
                    onBlur={() => handleBlur('section')}
                    error={touched.section && !!errors.section}
                    helperText={touched.section && errors.section}
                    required
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Roll No"
                    type="number"
                    name="rollNumber"
                    value={formData.rollNumber}
                    onChange={handleChange}
                    onBlur={() => handleBlur('rollNumber')}
                    error={touched.rollNumber && !!errors.rollNumber}
                    helperText={touched.rollNumber && errors.rollNumber}
                    required
                    fullWidth
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <TextField
                label="Address"
                name="address"
                multiline
                rows={3}
                value={formData.address}
                onChange={handleChange}
                onBlur={() => handleBlur('address')}
                error={touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                required
                fullWidth
                margin="normal"
              />
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
            <Button onClick={onClose} variant="outlined">
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Update Student
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
}