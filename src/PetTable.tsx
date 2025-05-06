import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import { FormValues } from "./PetForm"
import { Button } from "./components/ui/button";

interface PetTableProps {
    formData: FormValues[];
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  }

const PetTable = ({formData, setShowForm}: PetTableProps) => {
  return (
    <>
        <Table className=" w-10/12 m-auto">
            <TableCaption>Pet Data</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="border text-center border-gray-300">Pet Name</TableHead>
                    <TableHead className="border text-center border-gray-300">Pet Type</TableHead>
                    <TableHead className="border text-center border-gray-300">Breed</TableHead>
                    <TableHead className="border text-center border-gray-300">Adopter Name</TableHead>
                    <TableHead className="border text-center border-gray-300">Email</TableHead>
                    <TableHead className="border text-center border-gray-300">Phone</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
            {formData.map((entry:FormValues,index:number) => (
                    <TableRow key={index}>
                    <TableCell className="border text-center border-gray-300">{entry.petname}</TableCell>
                    <TableCell className="border text-center border-gray-300">{entry.pettype}</TableCell>
                    <TableCell className="border text-center border-gray-300">{entry.breed}</TableCell>
                    <TableCell className="border text-center border-gray-300">{entry.username}</TableCell>
                    <TableCell className="border text-center border-gray-300">{entry.email}</TableCell>
                    <TableCell className="border text-center border-gray-300">{entry.phone}</TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
        <div className="flex justify-center mt-4">
            <Button onClick={() => setShowForm(true)}>Add Another Pet</Button>
        </div>
    </>
  )
}

export default PetTable