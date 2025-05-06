// "use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select"
import { useState } from "react"
import PetTable from "./PetTable"

const petTypes= ['Dog', 'Cat', 'Fish', 'Rabbit', 'Bird'] as const

const breedTypes: Record<(typeof petTypes)[number], string[]> = {
    Dog: ["Labrador Retriever", "German Shepherd", "Golden Retriever", "French Bulldog", "Poodle", "English Bulldog", "Beagle", "Dachshund", "Yorkshire Terrier", "Shih Tzu"],
    Cat: ["Persian", "Maine Coon", "Siamese", "Ragdoll", "Bengal", "Sphynx", "British Shorthair", "Scottish Fold", "Abyssinian", "Russian Blue"],
    Fish: ["Betta", "Goldfish", "Guppy", "Neon Tetra", "Angelfish", "Discus", "Molly", "Zebra Danio", "Oscar", "Platy"],
    Rabbit: ["Holland Lop", "Mini Rex", "Netherland Dwarf", "Flemish Giant", "Lionhead", "English Lop", "Dutch", "Angora", "Harlequin", "Checkered Giant"],
    Bird: ["Budgerigar", "Cockatiel", "African Grey Parrot", "Macaw", "Lovebird", "Canary", "Finch", "Parakeet", "Cockatoo", "Conure"]
}

const formSchema = z.object({
    petname: z.string().min(3, "Pet name is Required"),
    pettype: z.enum(petTypes, {
        errorMap: () => ({message: "Select a valid pet type"})
    }),
    breed: z.string().min(1, "Breed is Required"),
    username: z.string().min(1, "User name is Required"),
    email: z.string().email("Invalid Email Address"),
    phone: z.string().trim().regex(
        /^\d{10}$/, {
            message: "Phone number must be exactly 10 digits"
        }
    ).refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
        message: "Phone number must be a non-negative value"
    })
})

export type FormValues = z.infer<typeof formSchema>

const PetForm = () => {

    const [allSubmittedData, setAllSubmittedData] = useState<FormValues[]>([])
    const [showForm, setShowForm] = useState<boolean>(true)

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            petname: '',
            pettype: undefined,
            breed: '',
            username: '',
            email: '',
            phone: ''
        }
    })

    const selectedPettype = form.watch("pettype")
    const breedOptions = selectedPettype ? breedTypes[selectedPettype] : []

    function onSubmit(values:FormValues) {
        setAllSubmittedData(prev => [...prev, values])
        setShowForm(false)
        form.reset()
    }
  return (
    <div>
        {!showForm ? <PetTable formData={allSubmittedData} setShowForm={setShowForm}/> :
            <div className="max-w-md mx-auto">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField 
                            control={form.control}
                            name='petname'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Pet Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your pet name" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name='pettype'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Pet Type</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={value => {
                                                field.onChange(value)
                                                form.setValue("breed","")}}
                                            value={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select pet type"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {petTypes.map(type => (
                                                    <SelectItem key={type} value={type}>
                                                        {type}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name='breed'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Breed</FormLabel>
                                    <FormControl>
                                        <Select disabled={!selectedPettype} onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select pet breed"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {breedOptions.map(breed => (
                                                    <SelectItem key={breed} value={breed}>
                                                        {breed}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name='username'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Your Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your name" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name='email'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="Enter your email" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name='phone'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your phone" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">Submit</Button>
                    </form>
                </Form>
            </div>
        }
    </div>
  )
}

export default PetForm