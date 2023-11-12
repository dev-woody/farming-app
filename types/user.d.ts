declare interface IUser {
  uuid: string;
  user_id: string;
  name: string;
  profile_img: string;
  zip_code: number;
  address: string;
  address_detail: string;
  email: string;
  phone: string;
  createdAt: string;
  deletedAt: string | null;
  updatedAt: string;
}