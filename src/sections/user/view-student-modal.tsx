import { Dialog, DialogTitle, DialogContent, Grid, Typography } from '@mui/material';
import { Student } from './type';

interface ViewStudentModalProps {
  student: Student | null;
  open: boolean;
  onClose: () => void;
}

export function ViewStudentModal({ student, open, onClose }: ViewStudentModalProps) {
  if (!student) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Student Details</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="text.secondary">Name</Typography>
            <Typography variant="body1">{student.name}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="text.secondary">Email</Typography>
            <Typography variant="body1">{student.email}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="text.secondary">Date of Birth</Typography>
            <Typography variant="body1">{student.dob}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="text.secondary">Phone</Typography>
            <Typography variant="body1">{student.phone}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle2" color="text.secondary">Class</Typography>
            <Typography variant="body1">{student.class}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle2" color="text.secondary">Section</Typography>
            <Typography variant="body1">{student.section}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle2" color="text.secondary">Roll Number</Typography>
            <Typography variant="body1">{student.rollNumber}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="text.secondary">Gender</Typography>
            <Typography variant="body1">{student.gender}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="text.secondary">Guardian Name</Typography>
            <Typography variant="body1">{student.guardianName}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary">Address</Typography>
            <Typography variant="body1">{student.address}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="text.secondary">Joining Date</Typography>
            <Typography variant="body1">{student.joiningDate}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}