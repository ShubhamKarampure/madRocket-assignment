import React from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Typography,
  Divider,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
  Paper,
  Chip
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import SchoolIcon from "@mui/icons-material/School"
import EmailIcon from "@mui/icons-material/Email"
import PhoneIcon from "@mui/icons-material/Phone"
import HomeIcon from "@mui/icons-material/Home"
import PersonIcon from "@mui/icons-material/Person"
import type { Student } from "./type"

interface ViewStudentModalProps {
  student: Student | null
  open: boolean
  onClose: () => void
}

export function ViewStudentModal({ student, open, onClose }: ViewStudentModalProps) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"))

  if (!student) return null

  const InfoItem = ({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) => (
    <Box mb={2} sx={{ display: 'flex', alignItems: 'flex-start' }}>
      {icon && (
        <Box sx={{ mr: 1, mt: 0.5, color: 'primary.main' }}>
          {icon}
        </Box>
      )}
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          {label}
        </Typography>
        <Typography variant="body1">{value}</Typography>
      </Box>
    </Box>
  )

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
          boxShadow: theme.customShadows?.dialog
        }
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: 'background.neutral'
        }}
      >
        <Box display="flex" alignItems="center">
          <SchoolIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6">Student Details</Typography>
        </Box>
        <IconButton
          aria-label="close"
          onClick={onClose}
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            mb: 3,
            mt:3,
            bgcolor: 'background.neutral',
            borderRadius: 2 
          }}
        >
          <Typography variant="h5" gutterBottom color="text.primary">
            {student.name}
          </Typography>
          <Box display="flex" gap={1} alignItems="center" flexWrap="wrap">
            <Chip 
              label={`Class ${student.class} - Section ${student.section}`}
              size="small"
              color="primary"
            />
            <Chip 
              label={`Roll No: ${student.rollNumber}`}
              size="small"
              variant="outlined"
            />
          </Box>
        </Paper>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <InfoItem 
              label="Email"
              value={student.email}
              icon={<EmailIcon fontSize="small" />}
            />
            <InfoItem 
              label="Phone"
              value={student.phone}
              icon={<PhoneIcon fontSize="small" />}
            />
            <InfoItem 
              label="Date of Birth"
              value={student.dob}
              icon={<PersonIcon fontSize="small" />}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoItem 
              label="Guardian Name"
              value={student.guardianName}
              icon={<PersonIcon fontSize="small" />}
            />
            <InfoItem 
              label="Gender"
              value={student.gender}
              icon={<PersonIcon fontSize="small" />}
            />
            <InfoItem 
              label="Joining Date"
              value={student.joiningDate}
              icon={<SchoolIcon fontSize="small" />}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <InfoItem 
              label="Address"
              value={student.address}
              icon={<HomeIcon fontSize="small" />}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}