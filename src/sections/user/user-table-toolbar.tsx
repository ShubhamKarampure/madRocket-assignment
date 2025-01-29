import { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Iconify } from 'src/components/iconify';
import { deleteMultipleStudents } from './utils';

interface UserTableToolbarProps {
  numSelected: number;
  filterName: string;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedIds?: string[];
  onDeleteSelected?: () => void;
}


export function UserTableToolbar({
  numSelected,
  filterName,
  onFilterName,
  selectedIds = [],
  onDeleteSelected,
}: UserTableToolbarProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setFilterMenuOpen(true);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
    setFilterMenuOpen(false);
  };

  const handleDelete = async () => {
    if (selectedIds.length > 0 && window.confirm('Are you sure you want to delete the selected students?')) {
      const success = await deleteMultipleStudents(selectedIds);
      if (success && onDeleteSelected) {
        onDeleteSelected();
      }
    }
  };

  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <OutlinedInput
          fullWidth
          value={filterName}
          onChange={onFilterName}
          placeholder="Search by name..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                width={20}
                icon="eva:search-fill"
                sx={{ color: 'text.disabled' }}
              />
            </InputAdornment>
          }
          sx={{ maxWidth: 320 }}
        />
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete selected">
          <IconButton onClick={handleDelete}>
            <Iconify icon="solar:trash-bin-trash-bold" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton onClick={handleFilterClick}>
            <Iconify icon="ic:round-filter-list" />
          </IconButton>
        </Tooltip>
      )}

      <Menu
        anchorEl={anchorEl}
        open={filterMenuOpen}
        onClose={handleFilterClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleFilterClose}>
          Filter by Class
        </MenuItem>
        <MenuItem onClick={handleFilterClose}>
          Filter by Section
        </MenuItem>
      </Menu>
    </Toolbar>
  );
}