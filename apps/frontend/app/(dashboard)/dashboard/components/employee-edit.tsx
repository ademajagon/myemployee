import React, { useState, useEffect } from 'react';
import { Button } from '../../../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../../components/ui/dialog';
import { Input } from '../../../../components/ui/input';
import { Label } from '../../../../components/ui/label';
import { Calendar } from '../../../../components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../../components/ui/popover';
import { format } from 'date-fns';
import axios from 'axios';
import { useToast } from '../../../../components/ui/use-toast';

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  birthdate: string;
  jobTitle: string;
  startDate: string;
  photo: string;
}

interface EmployeeEditModalProps {
  employee: Employee | null;
  onClose: () => void;
  onUpdate: (employee: Employee) => void;
}

export function EmployeeEditModal({
  employee,
  onClose,
  onUpdate,
}: EmployeeEditModalProps) {
  const [selectedBirthdate, setSelectedBirthdate] = useState<Date | undefined>(
    undefined
  );
  const [selectedStartDate, setSelectedStartDate] = useState<Date | undefined>(
    undefined
  );
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    if (employee) {
      setFirstName(employee.firstName);
      setLastName(employee.lastName);
      setJobTitle(employee.jobTitle);
      setSelectedBirthdate(new Date(employee.birthdate));
      setSelectedStartDate(new Date(employee.startDate));
      setIsOpen(true);
    }
  }, [employee]);

  const getToken = () => localStorage.getItem('access_token');

  const handleSubmit = async () => {
    if (!employee) return;

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append(
      'birthdate',
      selectedBirthdate ? selectedBirthdate.toISOString() : ''
    );
    formData.append(
      'startDate',
      selectedStartDate ? selectedStartDate.toISOString() : ''
    );
    formData.append('jobTitle', jobTitle);
    if (photo) formData.append('photo', photo);

    try {
      const response = await axios.put(
        `http://localhost:3000/api/employees/${employee.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      console.log('Employee updated:', response.data);

      toast({
        title: 'Employee Updated',
        description: 'The employee has been updated successfully.',
      });

      onUpdate(response.data); // Pass updated employee data
      onClose(); // Close the modal
    } catch (error) {
      console.error('Failed to update employee:', error);
      toast({
        title: 'Error',
        description: 'Failed to update employee. Please try again.',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Employee</DialogTitle>
          <DialogDescription>
            Please update the employee details. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="firstName" className="text-right">
              First Name
            </Label>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lastName" className="text-right">
              Last Name
            </Label>
            <Input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="birthdate" className="text-right">
              Birthdate
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start col-span-3"
                >
                  {selectedBirthdate
                    ? format(selectedBirthdate, 'PPP')
                    : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={selectedBirthdate}
                  onSelect={setSelectedBirthdate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="jobTitle" className="text-right">
              Job Title
            </Label>
            <Input
              id="jobTitle"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="startDate" className="text-right">
              Start Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start col-span-3"
                >
                  {selectedStartDate
                    ? format(selectedStartDate, 'PPP')
                    : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={selectedStartDate}
                  onSelect={setSelectedStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="photo" className="text-right">
              Photo
            </Label>
            <Input
              type="file"
              id="photo"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files?.[0] || null)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
