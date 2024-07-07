import { cn } from "@beta-lyfe/webapp/shad/lib/utils"
import React from "react"

export const Typography = {
  PageHeading: React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ children, className, ...props }, ref) => (
    <header className={cn("text-xl font-bold", className)} ref={ref} {...props}>
      {children}
    </header>
  )),
  Heading: React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ children, className, ...props }, ref) => (
    <h2 className={cn("font-semibold text-slate-500", className)} ref={ref} {...props}>
      {children}
    </h2>
  )),
  HeadingLead: React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ children, className, ...props }, ref) => (
    <header className={cn("text-xs font-semibold text-slate-500", className)} ref={ref} {...props}>
      {children}
    </header>
  )),
  CardHeading: React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ children, className, ...props }, ref) => (
    <h2 className={cn("text-sm font-semibold", className)} ref={ref} {...props}>
      {children}
    </h2>
  )),
  CardHeadingLead: React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ children, className, ...props }, ref) => (
    <h2 className={cn("text-xs font-semibold text-slate-500", className)} ref={ref} {...props}>
      {children}
    </h2>
  )),
  ChatHeading: React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ children, className, ...props }, ref) => (
    <h2 className={cn("text-lg font-semibold", className)} ref={ref} {...props}>
      {children}
    </h2>
  )),
  Title: React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ children, className, ...props }, ref) => (
    <h3 className={cn("font-bold text-[15px] xl:text-2xl", className)} ref={ref} {...props}>
      {children}
    </h3>
  )),
  Paragraph: React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ children, className, ...props }, ref) => (
    <p {...props} className={cn("text-[13px] xl:text-2xl font-medium", className)} ref={ref}>
      {children}
    </p>
  )),
  Info: React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ children, className, ...props }, ref) => (
    <p {...props} className={cn("text-slate-300", className)} ref={ref}>
      {children}
    </p>
  )),
  Pill: React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(({ children, className, ...props }, ref) => (
    <span {...props} className={cn("text-heNeutral-foreground font-medium text-[7px] xl:text-xl", className)} ref={ref}>
      {children}
    </span>
  )),
}

