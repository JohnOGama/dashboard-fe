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
  companySize: z.number().optional().default(10),
  industry: z.string().optional().default(""),
  name: z.string().min(1, "Name is required"),
  subscription: SubscriptionSchema.optional().default({ type: "free" }),
});
