"use client";
import React from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  title: z.string().min(1).min(1).max(100),
});

interface AddTaskFormProps {
  add: (title: string) => void;
  loading: boolean;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ add, loading }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      title: ""
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      add(values.title);
      toast.success(
        "Success"
      );
      form.resetField("title");
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        id="add-task-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-3xl mx-auto py-10 flex flex-row items-center gap-1"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="mb-0" >
              <FormControl>
                <Input type="text" {...field} placeholder="Title" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        
      </form>
    </Form>
  );
};

export default AddTaskForm;
