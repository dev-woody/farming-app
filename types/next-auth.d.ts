import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      uuid: string;
      user_id: string;
      name: string;
      zip_code: string;
      address: string;
      address_detail: string;
      phone: string;
      email: string;
      created_at: string;
      updated_at: string;
      deleted_at: string;
      accessToken: string;
    };
  }
}