"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";

// Validation schema using Zod
const FormSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  job_title: z.string().optional(),
  company_name: z.string().min(1, "Company name is required"),
  help: z.enum(["Evaluate Bird for my company", "Learn More", "Get a Quote", "Other"]),
  services: z.enum([
    "Mobile App Development",
    "Social Media Marketing",
    "UI/UX Design",
    "Branding",
    "Website Development",
  ]),
  info: z.string().optional(),
  terms: z.boolean(),
});

type FormValues = z.infer<typeof FormSchema>;

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      company_name: "",
      help: "Learn More",
      services: "Website Development",
      info: "",
      terms: false,
    },
  });

  async function onSubmit(data: FormValues) {
    try {
      setLoading(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      setSubmitted(true);
      toast({
        title: "Success",
        description: "Form submitted successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full min-h-screen bg-black/[0.96] antialiased relative">
      <Navbar
        scrollToWebsiteDesign={() => {}}
        scrollToGraphicDesign={() => {}}
        scrollToShopifyStores={() => {}}
        scrollToBrands={() => {}}
        scrollToServices={() => {}}
      />
      <div className="flex flex-col md:flex-row items-start justify-center md:py-20 px-6">
        {/* Left Content */}
        <div className="md:w-1/2">
          <h1 className="text-5xl font-medium pb-5 md:text-7xl text-white">
            Contact our sales team
          </h1>
          <p className="py-4 text-gray-100">
            Let&apos;s talk about how Bird can help your team work better.
          </p>
        </div>

        {/* Form Section */}
        <div className="md:w-1/3">
          <Form {...form}>
            {!submitted ? (
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 h-full border border-gray-600 rounded-3xl p-10"
              >
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-100" htmlFor="first_name">
                        First name *
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="first_name"
                          {...field}
                          placeholder="Enter your first name"
                          className="placeholder-gray-300 text-gray-100 border border-gray-400 focus:border-gray-100"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="terms"
                        />
                      </FormControl>
                      <FormLabel className="text-gray-100" htmlFor="terms">
                        I agree to Bird&apos;s sending marketing communications.
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white bg-gray-700 hover:bg-gray-800"
                >
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </form>
            ) : (
              <p className="text-gray-100">Thank you for contacting us!</p>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
}
