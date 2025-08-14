import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f6f6f6] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col md:flex-row overflow-hidden">
        {/* Left Section */}
        <section className="flex-1 p-8 md:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-gray-100">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-special-gothic text-gray-900">Contact Us</h1>
            <p className="text-gray-500 mb-8 font-ubuntu">Department of Computer Science | Adamas University</p>
            <div className="space-y-6 text-gray-700 text-base">
              <div>
                <div className="font-semibold mb-1">Find us</div>
                <div className="flex gap-4 text-gray-400 text-sm">
                  <a href="https://www.facebook.com/adamasuniversitywestbengal" target="_blank" rel="noopener noreferrer">FB</a>
                  <a href="https://instagram.com/adamasuniversity" target="_blank" rel="noopener noreferrer">IG</a>
                  <a href="https://linkedin.com/school/adamas-university" target="_blank" rel="noopener noreferrer">LN</a>
                  <a href="aucse.vercel.app" target="_blank" rel="noopener noreferrer">WEB</a>
                </div>
              </div>
              <div className="mt-8">
                <div className="font-semibold mb-1">Address</div>
                <div className="flex items-center gap-2 text-gray-500">
                  <MapPin className="w-4 h-4" />
                  Adamas University, Barasat - Barrackpore Rd, Jagannathpur, Kolkata, West Bengal 700126
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-gray-500">
                  <Phone className="w-4 h-4" />
                  +91 98765 43210
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Mail className="w-4 h-4" />
                  cse@adamasuniversity.ac.in
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Section: Contact Form */}
        <section className="flex-1 p-8 md:p-12 flex flex-col justify-center bg-[#fafbfc]">
          <form className="w-full max-w-md mx-auto space-y-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Say hello</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Your name" autoComplete="name" required className="mt-1" />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Select name="subject">
                  <SelectTrigger id="subject" className="mt-1 w-full">
                    <SelectValue placeholder="Choose subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admission">Admission</SelectItem>
                    <SelectItem value="collaboration">Collaboration</SelectItem>
                    <SelectItem value="research">Research</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input id="company" name="company" placeholder="Dept/Company" autoComplete="organization" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="Email address" autoComplete="email" required className="mt-1" />
              </div>
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <textarea
                id="message"
                name="message"
                placeholder="Start typing here"
                className="mt-1 min-h-[80px] w-full file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
              />
            </div>
            <div className="pt-2">
              <Button type="submit" className="group flex items-center gap-2 font-semibold">
                Submit <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
