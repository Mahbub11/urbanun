"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const items = [
  { id: "air_condition", label: "Air Condition" },
  { id: "cable_tv", label: "Cable TV" },
  { id: "ceiling_height", label: "Ceiling Height" },
  { id: "construction_year", label: "Construction Year" },
  { id: "disabled_access", label: "Disabled Access" },
  { id: "elevator", label: "Elevator" },
  { id: "fence", label: "Fence" },
  { id: "fireplace", label: "Fireplace" },
  { id: "floor", label: "Floor" },
  { id: "furnishing", label: "Furnishing" },
  { id: "garage", label: "Garage" },
  { id: "garden", label: "Garden" },
  { id: "heating", label: "Heating" },
  { id: "intercom", label: "Intercom" },
  { id: "parking", label: "Parking" },
  { id: "pet_friendly", label: "Pet Friendly" },
  { id: "renovation", label: "Renovation" },
  { id: "security", label: "Security" },
  { id: "swimming_pool", label: "Swimming Pool" },
  { id: "wifi", label: "WiFi" },
  { id: "window_type", label: "Window Type" },
] as const;

const FormSchema = z.object({
  items: z.array(z.string()),
});

interface PropertyFeatureCheckboxProps {
  onFormDataChange: (data: string[]) => void; // This is the callback function to pass the form data to the parent
}

export function PropertyFeatureCheckbox({
  onFormDataChange,
}: PropertyFeatureCheckboxProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  }
  const handleCheckedChange = (itemId: string, checked: boolean) => {
    const newItems = checked
      ? [...form.getValues("items"), itemId]
      : form.getValues("items").filter((value) => value !== itemId);

    console.log(newItems);
    onFormDataChange(newItems);

    // Update the form values with the new array of selected items
    form.setValue("items", newItems);

    // Trigger form submission
    form.handleSubmit(onSubmit)();
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem className="grid grid-cols-2">
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex space-x-2 w-full h-full"
                      >
                        <FormControl className="mt-[7px]">
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) =>
                              handleCheckedChange(
                                item.id,
                                checked ? true : false
                              )
                            }
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
