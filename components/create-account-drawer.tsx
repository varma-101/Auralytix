"use client";
import React, { useEffect } from 'react'
import {Drawer , DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from './ui/drawer';
import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { accountSchema } from '@/app/lib/schema.js';
import { Input } from './ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import useFetch from '../hooks/use-fetch.jsx';
import { Loader2 } from 'lucide-react';
import { createAccount } from "@/actions/dashboard";
import { toast } from 'sonner';
interface CreateAccountDrawerProps {
  children: React.ReactNode;
}

const CreateAccountDrawer = ({children}: CreateAccountDrawerProps) => {
    const [open, setOpen] = React.useState(false);

    // Import or define your Zod schema here
    // Example:
    // import { z } from "zod";
    // const schema = z.object({ /* your fields */ });

    const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm({
      resolver: zodResolver(accountSchema),
      defaultValues: {
        name: '',
        type: 'CURRENT',
        balance: '',
        isDefault: false,
      },
    });

    const {data:newAccount,error,fn:createAccountFn,loading:createAccountLoading}=useFetch(createAccount);

    useEffect(() => {
    if (newAccount) {
      toast.success("Account created successfully");
      reset();
      setOpen(false);
    }
  }, [createAccountLoading, newAccount]);


    const onSubmit=async(data: any) => {
      await createAccountFn(data);
    }

    

  return (
    <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent>
            <DrawerHeader>
            <DrawerTitle>Create New Account</DrawerTitle>
            </DrawerHeader>
            <div className='px-4 pb-4'>
                <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
                  <div className='space-y-2'>
                    <label htmlFor="name" className='text-sm font-medium'>Account name</label>
                    <Input id='name' placeholder='e.g., Jack' {...register("name")}/>
                    {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                  </div>
                  <div className='space-y-2'>
                    <label htmlFor="type" className='text-sm font-medium'>Account Type</label>
                    <Select onValueChange={(value: "CURRENT" | "SAVINGS") => setValue("type", value)} defaultValue={watch("type")}>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CURRENT">CURRENT</SelectItem>
                        <SelectItem value="SAVINGS">SAVINGS</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.type && <p className="text-sm text-red-500">{errors.type.message}</p>}
                  </div>
                  <div className='space-y-2'>
                    <label htmlFor="balance" className='text-sm font-medium'>Initial Balance</label>
                    <Input id='balance' type="number" step="0.01" placeholder='0.00' {...register("balance")}/>
                    {errors.balance && <p className="text-sm text-red-500">{errors.balance.message}</p>}
                  </div>

                  <div className='flex items-center justify-between rounded-lg border p-3'>
                    <div className='space-y-0.5'>
                      <label htmlFor="isDefault" className='text-sm font-medium pr-5 cursor-pointer'>Set As Default</label>
                      <p className='text-sm text-muted-foreground'>This Account will be selected by default for Transactions</p>
                    </div>
                    <Switch id="isDefault" checked={watch("isDefault")} onCheckedChange={(checked) => setValue("isDefault", checked)} />
                  </div>

                  <div className='flex gap-4 pt-4'>
                    <DrawerClose asChild>
                      <Button type="button" variant="outline" className="flex-1">
                        Cancel
                      </Button>
                    </DrawerClose>
                    <Button
                      type="submit"
                      className="flex-1"
                      disabled={!!createAccountLoading}
                    >
                      {createAccountLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  </div>
                </form>
            </div>
        </DrawerContent>
    </Drawer>
  )
}

export default CreateAccountDrawer

