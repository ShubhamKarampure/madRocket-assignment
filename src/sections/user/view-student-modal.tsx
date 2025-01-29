import React from "react";
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
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SchoolIcon from "@mui/icons-material/School";
import type { Student } from "./type";

interface ViewStudentModalProps {
  student: Student | null;
  open: boolean;
  onClose: () => void;
}

export function ViewStudentModal({ student, open, onClose }: ViewStudentModalProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  if (!student) return null;

  const InfoField = ({ label, value }: { label: string; value: string | number }) => (
    <Box
      sx={{
        p: 2,
        mb: 2,
        border: 1,
        borderColor: 'divider',
        borderRadius: 1,
        bgcolor: 'background.paper'
      }}
    >
      <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
        {label}
      </Typography>
      <Typography variant="body1">
        {value}
      </Typography>
    </Box>
  );

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
          <Typography variant="h6">View Student</Typography>
        </Box>
        <IconButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Paper elevation={0} sx={{ p: 3, mb: 3, mt: 3, bgcolor: 'background.neutral', borderRadius: 2 }}>
          <InfoField
            label="Student ID"
            value={student.uid}
          />
          <InfoField
            label="Full Name"
            value={student.name}
          />
        </Paper>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <InfoField
              label="Email"
              value={student.email}
            />
            <InfoField
              label="Phone"
              value={student.phone}
            />
            <InfoField
              label="Date of Birth"
              value={student.dob}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <InfoField
              label="Gender"
              value={student.gender}
            />
            <InfoField
              label="Guardian Name"
              value={student.guardianName}
            />
            
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <InfoField
                  label="Class"
                  value={student.class}
                />
              </Grid>
              <Grid item xs={4}>
                <InfoField
                  label="Section"
                  value={student.section}
                />
              </Grid>
              <Grid item xs={4}>
                <InfoField
                  label="Roll No"
                  value={student.rollNumber}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <InfoField
              label="Address"
              value={student.address}
            />
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <IconButton
            onClick={onClose}
            size="large"
            sx={{
              bgcolor: 'background.neutral',
              '&:hover': {
                bgcolor: 'background.default'
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
}