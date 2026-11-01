import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const SectionHeader = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
  <div className="mb-10 space-y-2">
    <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent">{eyebrow}</p>
    <h2 className="text-3xl font-bold leading-[1.2] tracking-tight text-foreground md:text-4xl">{title}</h2>
  </div>
);

export const Reveal = ({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

export const SkeletonList = ({ count = 3, className }: { count?: number; className?: string }) => (
  <div className={cn("space-y-3", className)} aria-busy="true" aria-label="Loading">
    {Array.from({ length: count }, (_, index) => (
      <Skeleton key={index} className="h-24 w-full rounded-xl" />
    ))}
  </div>
);

export const ContentError = ({ message }: { message: string }) => (
  <div role="alert" className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
    {message}
  </div>
);

export const EmptyState = ({ message }: { message: string }) => (
  <p className="rounded-xl border border-dashed border-border bg-secondary p-6 text-center text-sm text-muted-foreground">
    {message}
  </p>
);
