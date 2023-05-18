export type UserType = {
  nickname:string,
  email?:string,
  password:string,
  roles:string,
  rank:string
}

export type PrivilegeType = {
  roles_type : string,
  admin_panel : string,
  vip_zone : string,
  special_coupon : string,
  primary_service : string,
  basic_service : string
}