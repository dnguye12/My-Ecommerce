'use client'

import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import Image from 'next/image'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { UploadButton } from '@/lib/uploadthing'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { createProduct } from '@/app/_actions/products'

const productSchema = z.object({
  name: z.string().min(1, 'Required'),
  description: z.string().min(1, 'Required'),
  price: z.string().min(1, 'Required'),
  imageUrl: z.string().url('Upload an image'),
  category: z.string().min(1, 'Required'),
  stock: z.coerce.number<number>().int().min(0)
})

export function AdminProductForm() {
  const [imageUrl, setImageUrl] = useState('')

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      imageUrl: '',
      category: '',
      stock: 0
    }
  })

  const onSubmit = async (values: z.infer<typeof productSchema>) => {
    try {
      createProduct(values)
      toast.success('Product created')
      form.reset()
      setImageUrl('')
    } catch {
      toast.error('Failed to create')
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
      <FieldGroup>
        <Controller
          control={form.control}
          name='name'
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Name</FieldLabel>
              <Input {...field} id={field.name} aria-invalid={fieldState.invalid} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name='description'
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Description</FieldLabel>
              <Textarea {...field} id={field.name} aria-invalid={fieldState.invalid} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className='grid grid-cols-2 gap-4'>
          <Controller
            control={form.control}
            name='price'
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Price</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type='number'
                  step='0.01'
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name='stock'
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Stock</FieldLabel>
                <Input {...field} id={field.name} type='number' aria-invalid={fieldState.invalid} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>

        <Controller
          control={form.control}
          name='category'
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Category</FieldLabel>
              <Input {...field} id={field.name} aria-invalid={fieldState.invalid} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name='imageUrl'
          render={({ fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Image</FieldLabel>

              {imageUrl && (
                <div className='relative mt-2 h-32 w-32'>
                  <Image src={imageUrl} alt='preview' fill className='rounded object-cover' />
                </div>
              )}

              <UploadButton
                endpoint='imageUploader'
                onClientUploadComplete={(res) => {
                  const url = res?.[0]?.url

                  if (!url) {
                    toast.error('Upload failed')
                    return
                  }

                  setImageUrl(url)

                  form.setValue('imageUrl', url, {
                    shouldValidate: true,
                    shouldDirty: true
                  })

                  toast.success('Image uploaded')
                }}
                onUploadError={(error: Error) => {
                  toast.error(`${error.message}`)
                }}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Button type='submit' className='w-full'>
        Create Product
      </Button>
    </form>
  )
}
