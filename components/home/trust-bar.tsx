import React from "react";
import { CheckCircle2 } from "lucide-react";

const trustItems = [
  "100% Pure",
  "Bilona Method",
  "No Chemicals",
  "Farm Fresh",
  "Small Batch Production",
  "Pan India Delivery"
];

export default function TrustBar() {
  return (
    <div className="bg-sky-50 text-[#0078BE] border-y border-sky-100 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Mobile Marquee, Desktop Flex */}
        <div className="flex md:flex-wrap items-center justify-start md:justify-center gap-x-6 gap-y-2 animate-marquee md:animate-none min-w-max md:min-w-0">
          {trustItems.map((item, index) => (
            <div key={index} className="flex items-center gap-1.5 shrink-0">
              <CheckCircle2 className="w-4 h-4 fill-sky-200 text-[#0078BE]" />
              <span className="text-xs md:text-sm font-bold uppercase tracking-wider whitespace-nowrap">
                {item}
              </span>
            </div>
          ))}
          {/* Duplicate for mobile marquee seamless scrolling */}
          <div className="flex md:hidden items-center gap-x-6">
            {trustItems.map((item, index) => (
              <div key={`dup-${index}`} className="flex items-center gap-1.5 shrink-0">
                <CheckCircle2 className="w-4 h-4 fill-sky-200 text-[#0078BE]" />
                <span className="text-xs md:text-sm font-bold uppercase tracking-wider whitespace-nowrap">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
