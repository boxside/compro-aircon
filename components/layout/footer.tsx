import { Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image"
import logo from "@/public/next.svg"

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <Image src={logo} alt="Logo" width={80} height={80} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Logistic company</h3>
                <p className="text-sm text-muted-foreground">Professional Logistic Services</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Your trusted partner for all heating and cooling needs. Licensed, insured, 
              and committed to your comfort since 2008.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span>(555) 123-HVAC</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span>service@aircomfortpro.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Metro Area & Surrounding Counties</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Tronton Wingbox</li>
              <li>Fuso</li>
              <li>Double Long</li>
              <li>Double Standard</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>About Us</li>
              <li>Service</li>
              <li>Project</li>
              <li>Contact</li>
              <li>Tract your Delivery</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 AirComfort Pro. All rights reserved. Licensed HVAC Contractor.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;