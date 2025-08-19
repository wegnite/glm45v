"use client";

import { useState } from "react";
import { Metadata } from "next";
import { Mail, MessageSquare, Clock, Send, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

/**
 * Contact Us Page
 * 
 * Purpose: Provide multiple contact channels to prevent payment disputes
 * Essential for building trust and handling customer inquiries before they escalate
 */

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "general",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // TODO: Implement actual form submission to backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Message sent successfully! We'll respond within 24 hours.");
      setFormData({ name: "", email: "", subject: "general", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Have questions or need help? We're here for you. Choose your preferred way to reach us.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Contact Methods */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium mb-2">support@aigenerator.com</p>
              <p className="text-sm text-muted-foreground">
                For technical issues and account help
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Live Chat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Chat with our support team in real-time
              </p>
              <Button className="w-full" variant="outline">
                Start Live Chat
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Response Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span>Within 24 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Live Chat:</span>
                  <span>2-5 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Business Hours:</span>
                  <span>24/7</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Community Support</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <a 
                href="https://discord.gg/aigenerator" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <MessageSquare className="h-4 w-4" />
                Join our Discord
              </a>
              <a 
                href="https://twitter.com/aigenerator" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <MessageSquare className="h-4 w-4" />
                Follow on Twitter
              </a>
              <a 
                href="https://facebook.com/aigenerator" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <MessageSquare className="h-4 w-4" />
                Facebook Page
              </a>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Select 
                    value={formData.subject} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="technical">Technical Support</SelectItem>
                      <SelectItem value="billing">Billing & Payments</SelectItem>
                      <SelectItem value="refund">Refund Request</SelectItem>
                      <SelectItem value="feature">Feature Request</SelectItem>
                      <SelectItem value="bug">Bug Report</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Please describe your inquiry in detail..."
                    rows={6}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Minimum 20 characters
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <input 
                      type="checkbox" 
                      id="privacy" 
                      required 
                      className="mt-1"
                    />
                    <label htmlFor="privacy" className="text-sm text-muted-foreground">
                      I agree to the{" "}
                      <a href="/privacy-policy" className="text-primary hover:underline">
                        Privacy Policy
                      </a>{" "}
                      and understand that my information will be used to respond to my inquiry.
                    </label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>
              Quick answers to common questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">How do I get a refund?</h3>
                <p className="text-sm text-muted-foreground">
                  You can request a refund within 7 days of purchase. Please see our{" "}
                  <a href="/refund-policy" className="text-primary hover:underline">
                    Refund Policy
                  </a>{" "}
                  for details.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">How do I cancel my subscription?</h3>
                <p className="text-sm text-muted-foreground">
                  You can cancel your subscription anytime from your account settings. 
                  The cancellation will take effect at the end of your current billing period.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-sm text-muted-foreground">
                  We accept all major credit cards, PayPal, and various regional payment 
                  methods through Stripe.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">How do I report a bug?</h3>
                <p className="text-sm text-muted-foreground">
                  Please use the contact form above and select "Bug Report" as the subject. 
                  Include as much detail as possible about the issue.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Contact */}
      <div className="mt-8 text-center p-6 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <h3 className="font-semibold mb-2 text-red-600 dark:text-red-400">
          Urgent Issues?
        </h3>
        <p className="text-sm mb-3">
          For urgent matters requiring immediate attention:
        </p>
        <p className="font-medium">
          Emergency Email: urgent@aigenerator.com
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          (Response within 2-4 hours during business hours)
        </p>
      </div>
    </div>
  );
}