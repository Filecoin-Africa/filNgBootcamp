
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAccount } from 'wagmi';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { uploadPublisherApplication, storeFilecoinDealStatus, PublisherApplication } from '@/services/lighthouseService';

const applicationSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  sportsFocus: z.array(z.string()).min(1, { message: "Select at least one sport" }),
  experience: z.string().min(50, { message: "Please provide more details about your experience" }),
  sampleWork: z.string().url({ message: "Please provide a valid URL to your sample work" }),
  reason: z.string().min(50, { message: "Please elaborate on why you want to join" }),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

const sports = [
  { id: "basketball", label: "Basketball" },
  { id: "football", label: "Football" },
  { id: "soccer", label: "Soccer" },
  { id: "baseball", label: "Baseball" },
  { id: "hockey", label: "Hockey" },
  { id: "cricket", label: "Cricket" },
  { id: "tennis", label: "Tennis" },
  { id: "golf", label: "Golf" },
  { id: "esports", label: "Esports" },
  { id: "other", label: "Other" },
];

const PublisherApplicationForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cid, setCid] = useState<string | null>(null);
  const { address } = useAccount();

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: "",
      email: "",
      sportsFocus: [],
      experience: "",
      sampleWork: "",
      reason: "",
    },
  });

  const onSubmit = async (data: ApplicationFormData) => {
    if (!address) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to submit an application",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Ensure all required fields are properly typed
      const applicationData: PublisherApplication = {
        name: data.name,
        email: data.email,
        sportsFocus: data.sportsFocus,
        experience: data.experience,
        sampleWork: data.sampleWork, 
        reason: data.reason,
        walletAddress: address,
        timestamp: new Date().toISOString(),
      };
      
      const contentId = await uploadPublisherApplication(applicationData);
      
      setCid(contentId);
      storeFilecoinDealStatus(contentId, 'submitted');
      
      toast({
        title: "Application Submitted!",
        description: "Your application has been stored on Filecoin via Lighthouse.",
      });
      
      form.reset();
    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        title: "Submission Error",
        description: "There was an error storing your application on Filecoin.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Publisher Application</CardTitle>
        <CardDescription>
          Join the Khela Onchain Arena as a sports content publisher. Your application will be 
          stored on the Filecoin network via Lighthouse.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="sportsFocus"
              render={() => (
                <FormItem>
                  <FormLabel>Sports Focus</FormLabel>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {sports.map((sport) => (
                      <FormField
                        key={sport.id}
                        control={form.control}
                        name="sportsFocus"
                        render={({ field }) => {
                          return (
                            <FormItem key={sport.id} className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(sport.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, sport.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== sport.id
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {sport.label}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sports Analysis Experience</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your experience with sports analysis and content creation..." 
                      rows={4}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="sampleWork"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sample Work</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="URL to your portfolio, article, or sample work" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Why do you want to join Khela?</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us why you're interested in contributing to Khela..." 
                      rows={4}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Storing on Filecoin...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </form>
        </Form>
        
        {cid && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="font-semibold text-green-700">Application stored on Filecoin!</p>
            <p className="text-sm text-green-600 mt-1">Content ID (CID): {cid}</p>
            <p className="text-xs text-green-600 mt-1">Your application will be reviewed by our team.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PublisherApplicationForm;
