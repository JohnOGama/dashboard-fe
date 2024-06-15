import { z } from "zod";

export type TUser = {
  url: string;
  name: string;
  deployStatus: string;
  users: string;
  role: string;
};

const SubscriptionSchema = z.object({
  type: z.enum(["free", "paid"]),
});

const UserSchema = z.object({
  userId: z.string(),
  actionRole: z.string(),
});

export const CompanySchema = z.object({
  _id: z.string().optional().default(""),
  companySize: z.number().optional().default(0),
  createdAt: z.string().optional().default(""),
  createdBy: z.string().optional().default(""),
  industry: z.string().optional().default(""),
  name: z.string().min(1, "Name is required"),
  primaryContact: z.string().min(1, "Primary Contact is required"),
  sameBillingAndPostal: z.boolean().optional().default(true),
  secondaryContact: z.string().min(1, "Secondary Contact is required"),
  status: z.string().optional().default("active"),
  subscription: SubscriptionSchema.optional().default({ type: "free" }),
  updatedAt: z.string().optional().default(""),
  users: z.array(UserSchema).optional().default([]),
});
