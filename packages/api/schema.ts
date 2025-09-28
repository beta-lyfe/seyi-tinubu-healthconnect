import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const Id = z.string();
const Email = z.string();
const Role = z.enum(["patient", "doctor"]);
const PhoneNumber = z.string();
const DateTime = z.string();
const Api_Authentication_User = z
  .object({
    id: Id,
    first_name: z.string(),
    last_name: z.string(),
    email: Email,
    role: Role,
    phone_number: PhoneNumber,
    is_verified: z.boolean(),
    created_at: DateTime,
    updated_at: DateTime.nullable(),
  })
  .passthrough();
const Api_Authentication_Profile_Response_Success = z
  .object({ code: z.literal("FETCHED_PROFILE"), data: Api_Authentication_User })
  .passthrough();
const Api_UnauthorizedError = z
  .object({ code: z.literal("UNAUTHORIZED_ERROR") })
  .passthrough();
const Api_UserNotVerifiedError = z
  .object({ code: z.literal("USER_NOT_VERIFIED") })
  .passthrough();
const Api_UnexpectedError = z
  .object({ code: z.literal("UNEXPECTED_ERROR") })
  .passthrough();
const Api_Authentication_PasswordReset_Initialize_Body = z
  .object({ email: Email })
  .passthrough();
const Api_Authentication_PasswordReset_Initialize_Response_Success = z
  .object({ code: z.literal("CHECK_EMAIL_FOR_RESET_LINK") })
  .passthrough();
const Api_Authentication_PasswordReset_Initialize_Response_PasswordResetMailAlreadySentError =
  z
    .object({
      code: z.literal("PASSWORD_RESET_MAIL_ALREADY_SENT_ERROR"),
      data: z.object({ expires_at: DateTime }).passthrough(),
    })
    .passthrough();
const Api_BadRequestError = z
  .object({ code: z.literal("EXPECTED_DATA_NOT_RECEIVED_ERROR") })
  .passthrough();
const Password = z.string();
const Api_Authentication_PasswordReset_Confirm_Body = z
  .object({ password: Password })
  .passthrough();
const Api_Authentication_PasswordReset_Confirm_Response_PasswordResetSuccessful =
  z.object({ code: z.literal("PASSWORD_RESET_SUCCESSFUL") }).passthrough();
const Api_Authentication_PasswordReset_Confirm_Response_InvalidOrExpiredTokenError =
  z.object({ code: z.literal("INVALID_OR_EXPIRED_TOKEN_ERROR") }).passthrough();
const Api_Authentication_SendVerificationEmail_Body = z
  .object({ email: Email })
  .passthrough();
const Api_Authentication_SendVerificationEmail_Response_Success = z
  .object({
    code: z.literal("VERIFICATION_MAIL_SENT"),
    data: z.object({ expires_at: DateTime }).passthrough(),
  })
  .passthrough();
const Api_Authentication_SendVerificationEmail_Response_VerificationMailAlreadySentError =
  z
    .object({
      code: z.literal("VERIFICATION_MAIL_ALREADY_SENT_ERROR"),
      data: z.object({ expires_at: DateTime }).passthrough(),
    })
    .passthrough();
const Api_Authentication_SendVerificationEmail_Response_UserNotFoundError = z
  .object({ code: z.literal("USER_NOT_FOUND_ERROR") })
  .passthrough();
const Api_Authentication_SignIn_Body = z
  .object({ email: Email, password: Password })
  .passthrough();
const Token = z.string();
const Api_Authentication_SignIn_Response_AuthCredentials = z
  .object({
    code: z.literal("AUTH_CREDENTIALS"),
    data: z.object({ access_token: Token, refresh_token: Token }).passthrough(),
  })
  .passthrough();
const Api_Authentication_SignUp_Body = z
  .object({
    first_name: z.string(),
    last_name: z.string(),
    email: Email,
    password: Password,
    phone_number: PhoneNumber,
    is_doctor: z.boolean(),
  })
  .passthrough();
const Api_Authentication_SignUp_Response_SignupSuccessful = z
  .object({ code: z.literal("SIGNUP_SUCCESSFUL") })
  .passthrough();
const Api_Authentication_SignUp_Response_EmailAlreadyInUseError = z
  .object({ code: z.literal("EMAIL_ALREADY_IN_USE_ERROR") })
  .passthrough();
const Otp = z.string();
const Api_Authentication_VerifyEmail_Body = z
  .object({ email: Email, otp: Otp })
  .passthrough();
const Api_Authentication_VerifyEmail_Response_VerificationSuccessful = z
  .object({ code: z.literal("VERIFICATION_SUCCESSFUL") })
  .passthrough();
const Api_Authentication_VerifyEmail_Response_InvalidOrExpiredOtpError = z
  .object({ code: z.literal("INVALID_OR_EXPIRED_OTP_ERROR") })
  .passthrough();
const Api_Consultation_AccessToken = z
  .object({ token: z.string() })
  .passthrough();
const Api_Consultation_Consultation = z
  .object({
    id: Id,
    doctor: Id,
    patient: Id,
    room_name: z.string().nullable(),
    doctor_token: Api_Consultation_AccessToken,
    patient_token: Api_Consultation_AccessToken,
    start_time: DateTime,
    end_time: DateTime,
    created_at: DateTime,
    updated_at: DateTime.nullable(),
  })
  .passthrough();
const Api_Pagination_Meta = z
  .object({
    page: z.number().int(),
    per_page: z.number().int(),
    total: z.number().int(),
  })
  .passthrough();
const Api_Consultation_List_Response_Success = z
  .object({
    code: z.literal("FETCH_CONSULTATIONS_SUCCESSFUL"),
    data: z
      .object({
        data: z.array(Api_Consultation_Consultation),
        meta: Api_Pagination_Meta,
      })
      .passthrough(),
  })
  .passthrough();
const Api_Consultation_Request_ConsultationRequestPayload = z
  .object({
    doctor: Id,
    start_time: DateTime,
    end_time: DateTime,
    message: z.string(),
  })
  .passthrough();
const Api_Consultation_Request_Request_Create_Response_Success = z
  .object({ code: z.literal("CONSULTATION_REQUEST_CREATED_SUCCESSFULLY") })
  .passthrough();
const DateOfBirth = z.string();
const Media = z
  .object({ public_id: z.string(), url: z.string() })
  .passthrough();
const Api_Doctor_Specialization = z.string();
const Api_Doctor_Certification = z
  .object({ name: z.string(), institution: z.string(), date: z.string() })
  .passthrough();
const Api_Doctor_Experience = z
  .object({
    title: z.string(),
    institution: z.string(),
    start_date: z.string(),
    end_date: z.string().nullable(),
  })
  .passthrough();
const Api_Doctor_WorkingHour = z
  .object({
    day: z.enum([
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ]),
    start_time: z.string(),
    end_time: z.string(),
  })
  .passthrough();
const Address = z
  .object({
    landmark: z.string(),
    street: z.string(),
    coordinates: z.string().nullish(),
    city: z.string(),
    state: z.string(),
  })
  .passthrough();
const Api_Doctor_DoctorProfile = z
  .object({
    id: Id,
    first_name: z.string(),
    last_name: z.string(),
    other_names: z.string().nullable(),
    email: Email,
    phone_number: PhoneNumber,
    date_of_birth: DateOfBirth,
    profile_picture: Media,
    specialization: Api_Doctor_Specialization.nullable(),
    patients_treated: z.number().int(),
    years_of_experience: z.number().int(),
    number_of_reviews: z.number().int(),
    rating: z.string(),
    description: z.string(),
    home_consultation_charge: z.string(),
    video_consultation_charge: z.string(),
    clinic_consultation_charge: z.string(),
    certifications: z.array(Api_Doctor_Certification).nullable(),
    experiences: z.array(Api_Doctor_Experience).nullable(),
    working_hours: z.array(Api_Doctor_WorkingHour).nullable(),
    location: Address.nullable(),
    created_at: DateTime,
    updated_at: DateTime.nullable(),
  })
  .passthrough();
const Api_Patient_PatientProfile = z
  .object({
    id: Id,
    first_name: z.string(),
    last_name: z.string(),
    other_names: z.string().nullable(),
    email: Email,
    phone_number: PhoneNumber,
    date_of_birth: DateOfBirth.nullable(),
    profile_picture: Media.nullable(),
    created_at: DateTime,
    updated_at: DateTime.nullable(),
  })
  .passthrough();
const Api_Consultation_Request_ConsultationRequest = z
  .object({
    id: Id,
    doctor: Id,
    patient: Id,
    status: z.enum(["pending", "accepted", "rejected"]),
    message: z.string(),
    doctor_profile: Api_Doctor_DoctorProfile.optional(),
    patient_profile: Api_Patient_PatientProfile.optional(),
    start_time: DateTime,
    end_time: DateTime,
    created_at: DateTime,
    updated_at: DateTime,
  })
  .passthrough();
const Api_Consultation_Request_Request_List_Response_Success = z
  .object({
    code: z.literal("FETCH_CONSULTATION_REQUESTS_SUCCESSFUL"),
    data: z
      .object({
        data: z.array(Api_Consultation_Request_ConsultationRequest),
        meta: Api_Pagination_Meta,
      })
      .passthrough(),
  })
  .passthrough();
const Api_Consultation_Request_NotFoundError = z
  .object({ code: z.literal("CONSULTATION_REQUEST_NOT_FOUND") })
  .passthrough();
const Api_Consultation_Request_Request_Accept_Response_Success = z
  .object({ code: z.literal("CONSULTATION_REQUEST_ACCEPTED_SUCCESSFULLY") })
  .passthrough();
const Api_Consultation_Request_Request_Accept_Response_AlreadyDeclinedError = z
  .object({ code: z.literal("CONSULTATION_REQUEST_ALREADY_DECLINED_ERROR") })
  .passthrough();
const Api_Consultation_Request_Request_Accept_Response_AlreadyAcceptedError = z
  .object({ code: z.literal("CONSULTATION_REQUEST_ALREADY_ACCEPTED_ERROR") })
  .passthrough();
const Api_Consultation_Request_Request_Reject_Response_Success = z
  .object({ code: z.literal("CONSULTATION_REQUEST_REJECTED_SUCCESSFULLY") })
  .passthrough();
const Api_Consultation_Request_Request_Reject_Response_AlreadyDeclinedError = z
  .object({ code: z.literal("CONSULTATION_REQUEST_ALREADY_DECLINED_ERROR") })
  .passthrough();
const Api_Consultation_Request_Request_Reject_Response_AlreadyAcceptedError = z
  .object({ code: z.literal("CONSULTATION_REQUEST_ALREADY_ACCEPTED_ERROR") })
  .passthrough();
const Api_Consultation_Get_NotFoundError = z
  .object({ code: z.literal("CONSULTATION_NOT_FOUND") })
  .passthrough();
const Api_Doctor_Create_Request_Body = z
  .object({
    other_names: z.string().nullable(),
    date_of_birth: DateOfBirth,
    profile_picture: Media,
    specialization: Api_Doctor_Specialization.nullable(),
    patients_treated: z.number().int(),
    years_of_experience: z.number().int(),
    number_of_reviews: z.number().int(),
    rating: z.string(),
    description: z.string(),
    home_consultation_charge: z.string(),
    video_consultation_charge: z.string(),
    clinic_consultation_charge: z.string(),
    certifications: z.array(Api_Doctor_Certification).nullable(),
    experiences: z.array(Api_Doctor_Experience).nullable(),
    working_hours: z.array(Api_Doctor_WorkingHour).nullable(),
    location: Address.nullable(),
  })
  .passthrough();
const Api_Doctor_Create_Response_Success = z
  .object({ code: z.literal("DOCTOR_PROFILE_CREATED") })
  .passthrough();
const Api_Doctor_List_Response_Success = z
  .object({
    code: z.literal("FETCH_DOCTOR_PROFILES_SUCCESSFUL"),
    data: z
      .object({
        data: z.array(Api_Doctor_DoctorProfile),
        meta: Api_Pagination_Meta,
      })
      .passthrough(),
  })
  .passthrough();
const Api_Doctor_Profile_Get_Response_Success = z
  .object({
    code: z.literal("FETCH_DOCTOR_PROFILE_SUCCESSFUL"),
    data: Api_Doctor_DoctorProfile,
  })
  .passthrough();
const Api_Doctor_Profile_Update_Body = z
  .object({
    id: Id,
    first_name: z.string(),
    last_name: z.string(),
    other_names: z.string().nullable(),
    email: Email,
    phone_number: PhoneNumber,
    date_of_birth: DateOfBirth,
    profile_picture: Media,
    specialization: Api_Doctor_Specialization.nullable(),
    patients_treated: z.number().int(),
    years_of_experience: z.number().int(),
    number_of_reviews: z.number().int(),
    rating: z.string(),
    description: z.string(),
    home_consultation_charge: z.string(),
    video_consultation_charge: z.string(),
    clinic_consultation_charge: z.string(),
    certifications: z.array(Api_Doctor_Certification).nullable(),
    experiences: z.array(Api_Doctor_Experience).nullable(),
    working_hours: z.array(Api_Doctor_WorkingHour).nullable(),
    location: Address.nullable(),
    created_at: DateTime,
    updated_at: DateTime.nullable(),
  })
  .partial()
  .passthrough();
const Api_Doctor_Profile_Update_Response_Success = z
  .object({ code: z.literal("DOCTOR_PROFILE_UPDATED") })
  .passthrough();
const Api_Doctor_Get_Response_Success = z
  .object({
    code: z.literal("FETCH_DOCTOR_PROFILE_SUCCESSFUL"),
    data: Api_Doctor_DoctorProfile,
  })
  .passthrough();
const Api_Doctor_Get_Response_ProfileNotFoundError = z
  .object({ code: z.literal("DOCTOR_PROFILE_NOT_FOUND_ERROR") })
  .passthrough();
const Api_Patient_Create_Request_Body = z
  .object({ date_of_birth: DateOfBirth })
  .passthrough();
const Api_Patient_Create_Response_Success = z
  .object({ code: z.literal("PATIENT_PROFILE_CREATED") })
  .passthrough();
const Api_Patient_List_Response_Success = z
  .object({
    code: z.literal("FETCH_PATIENT_PROFILES_SUCCESSFUL"),
    data: z
      .object({
        data: z.array(Api_Patient_PatientProfile),
        meta: Api_Pagination_Meta,
      })
      .passthrough(),
  })
  .passthrough();
const Api_Patient_Profie_Get_Response_Success = z
  .object({
    code: z.literal("FETCH_PATIENT_PROFILE_SUCCESSFUL"),
    data: Api_Patient_PatientProfile,
  })
  .passthrough();
const Api_Patient_Profie_Get_Response_ProfileNotFoundError = z
  .object({ code: z.literal("PATIENT_PROFILE_NOT_FOUND_ERROR") })
  .passthrough();
const MediaUpdate = z
  .object({ public_id: z.string(), url: z.string() })
  .partial()
  .passthrough();
const Api_Patient_Profie_Update_Body = z
  .object({
    id: Id,
    first_name: z.string(),
    last_name: z.string(),
    other_names: z.string().nullable(),
    email: Email,
    phone_number: PhoneNumber,
    date_of_birth: DateOfBirth.nullable(),
    profile_picture: MediaUpdate.nullable(),
    created_at: DateTime,
    updated_at: DateTime.nullable(),
  })
  .partial()
  .passthrough();
const Api_Patient_Profie_Update_Response_Success = z
  .object({ code: z.literal("PATIENT_PROFILE_UPDATED") })
  .passthrough();
const Api_Patient_Upload_Response_Success = z
  .object({
    code: z.literal("PROFILE_IMAGE_UPLOAD_SUCCESSFUL"),
    data: z.object({ url: z.string() }).passthrough(),
  })
  .passthrough();
const Api_Patient_Get_Response_Success = z
  .object({
    code: z.literal("FETCH_PATIENT_PROFILE_SUCCESSFUL"),
    data: Api_Patient_PatientProfile,
  })
  .passthrough();
const Api_Patient_Get_Response_ProfileNotFoundError = z
  .object({ code: z.literal("PATIENT_PROFILE_NOT_FOUND_ERROR") })
  .passthrough();
const Time = z.string();
const Api_Pharmacy_Create_Request_Body = z
  .object({
    name: z.string(),
    description: z.string(),
    phone_number: PhoneNumber,
    email: Email,
    address: Address,
    opening_time: Time,
    closing_time: Time,
    cover_image: Media,
  })
  .passthrough();
const Api_Pharmacy_Create_Response_Success = z
  .object({ code: z.literal("PHARMACY_STORE_CREATED") })
  .passthrough();
const Api_Pharmacy_Cart_Set_Request_Body = z
  .object({ pharmacy_store_item_id: Id, quantity: z.number().int() })
  .passthrough();
const Api_Pharmacy_Cart_Set_Response_Success = z
  .object({ code: z.literal("PHARMACY_STORE_ITEM_SET_IN_CART") })
  .passthrough();
const Api_Pharmacy_Item_Category = z.string();
const Api_Pharmacy_Item_Brand = z.string();
const Api_Pharmacy_Item_Create_Request_Body = z
  .object({
    id: Id,
    name: z.string(),
    description: z.string(),
    usage: z.string(),
    side_effects: z.string(),
    warnings: z.string(),
    images: z.array(Media),
    type: z.enum(["OTC", "PRESCRIPTION"]),
    quantity_in_stock: z.number().int(),
    categories: z.array(Api_Pharmacy_Item_Category),
    brands: z.array(Api_Pharmacy_Item_Brand),
    price: z.number(),
    selling_price: z.number(),
    batch_number: z.string(),
    manufacturer: z.string(),
    expiry_date: z.number().int(),
    requires_prescription: z.boolean(),
  })
  .passthrough();
const Api_Pharmacy_Item_Create_Response_Success = z
  .object({ code: z.literal("PHARMACY_STORE_ITEM_CREATED") })
  .passthrough();
const Api_Pharmacy_Item_PharmacyStoreItem = z
  .object({
    id: Id,
    name: z.string(),
    description: z.string(),
    usage: z.string(),
    side_effects: z.string(),
    warnings: z.string(),
    images: z.array(Media),
    pharmacy_store_id: Id,
    type: z.enum(["OTC", "PRESCRIPTION"]),
    quantity_in_stock: z.number().int(),
    categories: z.array(Api_Pharmacy_Item_Category),
    brands: z.array(Api_Pharmacy_Item_Brand),
    price: z.number(),
    selling_price: z.number(),
    batch_number: z.string(),
    manufacturer: z.string(),
    is_available: z.boolean(),
    expiry_date: z.number().int(),
    requires_prescription: z.boolean(),
    is_featured: z.boolean(),
    created_at: DateTime,
    updated_at: DateTime,
    deleted_at: DateTime,
  })
  .passthrough();
const Api_Pharmacy_Item_List_Response_Success = z
  .object({
    code: z.literal("PHARMACY_STORE_ITEMS_RETRIEVED"),
    data: z
      .object({
        data: z.array(Api_Pharmacy_Item_PharmacyStoreItem),
        meta: Api_Pagination_Meta,
      })
      .passthrough(),
  })
  .passthrough();
const Api_Pharmacy_Item_ById_Get_Response_Success = z
  .object({
    code: z.literal("PHARMACY_STORE_ITEM_RETRIEVED"),
    data: Api_Pharmacy_Item_PharmacyStoreItem,
  })
  .passthrough();
const Api_Pharmacy_Item_ById_Update_Request_Body = z
  .object({
    name: z.string(),
    description: z.string(),
    usage: z.string(),
    side_effects: z.string(),
    warnings: z.string(),
    images: z.array(Media),
    pharmacy_store_id: Id,
    type: z.enum(["OTC", "PRESCRIPTION"]),
    quantity_in_stock: z.number().int(),
    categories: z.array(Api_Pharmacy_Item_Category),
    brands: z.array(Api_Pharmacy_Item_Brand),
    price: z.number(),
    selling_price: z.number(),
    batch_number: z.string(),
    manufacturer: z.string(),
    is_available: z.boolean(),
    expiry_date: z.number().int(),
    requires_prescription: z.boolean(),
    is_featured: z.boolean(),
  })
  .partial()
  .passthrough();
const Api_Pharmacy_Item_ById_Update_Response_Success = z
  .object({
    code: z.literal("PHARMACY_STORE_ITEM_UPDATED"),
    data: Api_Pharmacy_Item_PharmacyStoreItem,
  })
  .passthrough();
const Api_Pharmacy_Item_ById_Delete_Response_Success = z
  .object({
    code: z.literal("PHARMACY_STORE_ITEM_DELETED"),
    data: Api_Pharmacy_Item_PharmacyStoreItem,
  })
  .passthrough();
const Api_Pharmacy_Order_Order = z
  .object({
    id: Id,
    pharmacy_store_id: Id,
    owner_id: Id,
    total_amount: z.number(),
    items: z
      .object({
        order_id: Id,
        pharmacy_store_item_id: Id,
        quantity: z.number().int(),
        price: z.number(),
      })
      .passthrough(),
    address: Address,
    status: z.enum([
      "AWAITING_PAYMENT",
      "AWAITING_ACKNOWLEDGEMENT",
      "PROCESSING",
      "IN_TRANSIT",
      "DELIVERED",
      "CANCELLED",
    ]),
    created_at: DateTime,
    updated_at: DateTime.nullable(),
  })
  .passthrough();
const Api_Pharmacy_Order_List_Response_Success = z
  .object({
    code: z.literal("PHARMACY_STORE_ORDERS_RETRIEVED"),
    data: z
      .object({
        data: z.array(Api_Pharmacy_Order_Order),
        meta: Api_Pagination_Meta,
      })
      .passthrough(),
  })
  .passthrough();
const Api_Pharmacy_Order_ById_Get_Response_Success = z
  .object({
    code: z.literal("PHARMACY_STORE_ORDER_RETRIEVED"),
    data: Api_Pharmacy_Order_Order,
  })
  .passthrough();
const Api_Pharmacy_Order_ById_Pay_UpdateStatus_Request_Body = z
  .object({
    status: z.enum([
      "AWAITING_PAYMENT",
      "AWAITING_ACKNOWLEDGEMENT",
      "PROCESSING",
      "IN_TRANSIT",
      "DELIVERED",
      "CANCELLED",
    ]),
  })
  .partial()
  .passthrough();
const Api_Pharmacy_Order_ById_Pay_UpdateStatus_Response_Success_Success = z
  .object({
    code: z.literal("PHARMACY_STORE_ORDER_STATUS_UPDATED"),
    data: Api_Pharmacy_Order_Order,
  })
  .passthrough();
const Api_Pharmacy_Order_ById_Pay_UpdateStatus_Response_Error_InvalidStatusTransition =
  z
    .object({ code: z.literal("INVALID_STATUS_TRANSITION_ERROR") })
    .passthrough();
const PaymentUrl = z.string();
const Api_Pharmacy_Order_ById_Pay_Response_Online_Response_Success_Success = z
  .object({
    code: z.literal("PHARMACY_STORE_ORDER_INVOICE_GENERATION_SUCCESSFUL"),
    data: z.object({ url: PaymentUrl }).passthrough(),
  })
  .passthrough();
const Api_Pharmacy_Order_ById_Pay_Response_Error_PaymentAlreadyMadeError = z
  .object({
    code: z.literal("PHARMACY_STORE_ORDER_PAYMENT_ALREADY_MADE_ERROR"),
  })
  .passthrough();
const Api_Pharmacy_Order_ById_Pay_Response_Wallet_Response_Success_Success = z
  .object({ code: z.literal("PHARMACY_STORE_ORDER_PAYMENT_SUCCESSFUL") })
  .passthrough();
const Api_Pharmacy_Order_ById_Pay_Response_Wallet_Response_Error_InsufficientBalanceError =
  z.object({ code: z.literal("INSUFFICIENT_BALANCE_ERROR") }).passthrough();
const Api_Pharmacy_PharmacyStore = z
  .object({
    name: z.string(),
    description: z.string(),
    phone_number: PhoneNumber,
    email: Email,
    address: Address,
    opening_time: Time,
    closing_time: Time,
    cover_image: Media,
    rating: z.number(),
    reviews: z.number().int(),
    is_active: z.boolean(),
    owner_id: Id,
    created_at: DateTime,
    updated_at: DateTime,
    deleted_at: DateTime.nullable(),
  })
  .passthrough();
const Api_Pharmacy_ById_Get_Response_Success = z
  .object({
    code: z.literal("PHARMACY_STORE_RETRIEVED"),
    data: Api_Pharmacy_PharmacyStore,
  })
  .passthrough();
const AddressUpdate = z
  .object({
    landmark: z.string(),
    street: z.string(),
    coordinates: z.string().nullable(),
    city: z.string(),
    state: z.string(),
  })
  .partial()
  .passthrough();
const Api_Pharmacy_ById_Update_Request_Body = z
  .object({
    name: z.string(),
    description: z.string(),
    phone_number: PhoneNumber,
    email: Email,
    address: AddressUpdate,
    opening_time: Time,
    closing_time: Time,
    cover_image: MediaUpdate,
    rating: z.number(),
    reviews: z.number().int(),
    is_active: z.boolean(),
    owner_id: Id,
    created_at: DateTime,
    updated_at: DateTime,
    deleted_at: DateTime.nullable(),
  })
  .partial()
  .passthrough();
const Api_Pharmacy_ById_Update_Response_Success = z
  .object({
    code: z.literal("PHARMACY_STORE_UPDATED"),
    data: Api_Pharmacy_PharmacyStore,
  })
  .passthrough();
const Api_Pharmacy_ById_Delete_Response_Success = z
  .object({
    code: z.literal("PHARMACY_STORE_DELETED"),
    data: Api_Pharmacy_PharmacyStore,
  })
  .passthrough();
const Api_Waitlist_Body = z.object({ email: Email }).passthrough();
const Api_Waitlist_Response_Success = z
  .object({ code: z.literal("WAITLIST_JOINED_SUCCESSFULLY") })
  .passthrough();
const Api_Waitlist_Response_AlreadyJoinedError = z
  .object({ code: z.literal("WAITLIST_ALREADY_JOINED_ERROR") })
  .passthrough();
const Api_Wallet_Wallet = z
  .object({ id: Id, balance: z.number() })
  .passthrough();
const Api_Wallet_Get_Response_Success = z
  .object({
    code: z.literal("FETCH_WALLET_SUCCESSFUL"),
    data: Api_Wallet_Wallet,
  })
  .passthrough();
const Api_Wallet_Topup_Body = z.object({ amount: z.number() }).passthrough();
const Api_Wallet_Topup_Response_Success = z
  .object({ url: PaymentUrl })
  .passthrough();
const Api_Wallet_Transaction = z
  .object({
    id: Id,
    type: z.enum(["credit", "debit"]),
    amount: z.number(),
    description: z.string(),
    note: z.string(),
    created_at: DateTime,
  })
  .passthrough();
const Api_Wallet_Transactions_Response_Success = z
  .object({
    code: z.literal("FETCH_TRANSACTIONS_SUCCESSFUL"),
    data: z
      .object({
        data: z.array(Api_Wallet_Transaction),
        meta: Api_Pagination_Meta,
      })
      .passthrough(),
  })
  .passthrough();
const Api_Consultation_Request_PaginatedConsultationRequest = z
  .object({
    results: Api_Consultation_Request_ConsultationRequest,
    count: z.number().int(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
  })
  .passthrough();
const Api_Doctor_SuccessMessage = z
  .object({ message: z.string() })
  .passthrough();
const Api_NoTokenProvidedError = z
  .object({ code: z.literal("UNAUTHORIZED_ERROR") })
  .passthrough();
const Api_Pharmacy_ById_Delete_Request_Path = z
  .object({})
  .partial()
  .passthrough();
const Api_Pharmacy_ById_Get_Request_Path = z.object({}).partial().passthrough();
const Api_Pharmacy_ById_Update_Request_Path = z
  .object({})
  .partial()
  .passthrough();
const Api_Pharmacy_Cart_CartItem = z
  .object({
    id: Id,
    pharmacy_store_item_id: Id,
    owner_id: Id,
    quantity: z.number().int(),
    price: z.number(),
    created_at: DateTime,
    updated_at: DateTime.nullable(),
  })
  .passthrough();
const Api_Pharmacy_Cart_Checkout_Request_Body = z
  .object({ pharmacy_store_id: Id, address: Address })
  .passthrough();
const Api_Pharmacy_Item_ById_Delete_Request_Path = z
  .object({})
  .partial()
  .passthrough();
const Api_Pharmacy_Item_ById_Get_Request_Path = z
  .object({})
  .partial()
  .passthrough();
const Api_Pharmacy_Item_ById_Update_Request_Path = z
  .object({})
  .partial()
  .passthrough();
const Api_Pharmacy_Item_List_Request_Query = z
  .object({})
  .partial()
  .passthrough();
const Api_Pharmacy_Order_ById_Get_Request_Path = z
  .object({})
  .partial()
  .passthrough();
const Api_Pharmacy_Order_ById_Pay_Response_Online_Request_Path = z
  .object({})
  .partial()
  .passthrough();
const Api_Pharmacy_Order_ById_Pay_Response_Wallet_Request_Path = z
  .object({})
  .partial()
  .passthrough();
const Api_Pharmacy_Order_ById_Pay_UpdateStatus_Request_Path = z
  .object({})
  .partial()
  .passthrough();
const Paginated = z
  .object({
    count: z.number().int(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
  })
  .passthrough();

export const schemas = {
  Id,
  Email,
  Role,
  PhoneNumber,
  DateTime,
  Api_Authentication_User,
  Api_Authentication_Profile_Response_Success,
  Api_UnauthorizedError,
  Api_UserNotVerifiedError,
  Api_UnexpectedError,
  Api_Authentication_PasswordReset_Initialize_Body,
  Api_Authentication_PasswordReset_Initialize_Response_Success,
  Api_Authentication_PasswordReset_Initialize_Response_PasswordResetMailAlreadySentError,
  Api_BadRequestError,
  Password,
  Api_Authentication_PasswordReset_Confirm_Body,
  Api_Authentication_PasswordReset_Confirm_Response_PasswordResetSuccessful,
  Api_Authentication_PasswordReset_Confirm_Response_InvalidOrExpiredTokenError,
  Api_Authentication_SendVerificationEmail_Body,
  Api_Authentication_SendVerificationEmail_Response_Success,
  Api_Authentication_SendVerificationEmail_Response_VerificationMailAlreadySentError,
  Api_Authentication_SendVerificationEmail_Response_UserNotFoundError,
  Api_Authentication_SignIn_Body,
  Token,
  Api_Authentication_SignIn_Response_AuthCredentials,
  Api_Authentication_SignUp_Body,
  Api_Authentication_SignUp_Response_SignupSuccessful,
  Api_Authentication_SignUp_Response_EmailAlreadyInUseError,
  Otp,
  Api_Authentication_VerifyEmail_Body,
  Api_Authentication_VerifyEmail_Response_VerificationSuccessful,
  Api_Authentication_VerifyEmail_Response_InvalidOrExpiredOtpError,
  Api_Consultation_AccessToken,
  Api_Consultation_Consultation,
  Api_Pagination_Meta,
  Api_Consultation_List_Response_Success,
  Api_Consultation_Request_ConsultationRequestPayload,
  Api_Consultation_Request_Request_Create_Response_Success,
  DateOfBirth,
  Media,
  Api_Doctor_Specialization,
  Api_Doctor_Certification,
  Api_Doctor_Experience,
  Api_Doctor_WorkingHour,
  Address,
  Api_Doctor_DoctorProfile,
  Api_Patient_PatientProfile,
  Api_Consultation_Request_ConsultationRequest,
  Api_Consultation_Request_Request_List_Response_Success,
  Api_Consultation_Request_NotFoundError,
  Api_Consultation_Request_Request_Accept_Response_Success,
  Api_Consultation_Request_Request_Accept_Response_AlreadyDeclinedError,
  Api_Consultation_Request_Request_Accept_Response_AlreadyAcceptedError,
  Api_Consultation_Request_Request_Reject_Response_Success,
  Api_Consultation_Request_Request_Reject_Response_AlreadyDeclinedError,
  Api_Consultation_Request_Request_Reject_Response_AlreadyAcceptedError,
  Api_Consultation_Get_NotFoundError,
  Api_Doctor_Create_Request_Body,
  Api_Doctor_Create_Response_Success,
  Api_Doctor_List_Response_Success,
  Api_Doctor_Profile_Get_Response_Success,
  Api_Doctor_Profile_Update_Body,
  Api_Doctor_Profile_Update_Response_Success,
  Api_Doctor_Get_Response_Success,
  Api_Doctor_Get_Response_ProfileNotFoundError,
  Api_Patient_Create_Request_Body,
  Api_Patient_Create_Response_Success,
  Api_Patient_List_Response_Success,
  Api_Patient_Profie_Get_Response_Success,
  Api_Patient_Profie_Get_Response_ProfileNotFoundError,
  MediaUpdate,
  Api_Patient_Profie_Update_Body,
  Api_Patient_Profie_Update_Response_Success,
  Api_Patient_Upload_Response_Success,
  Api_Patient_Get_Response_Success,
  Api_Patient_Get_Response_ProfileNotFoundError,
  Time,
  Api_Pharmacy_Create_Request_Body,
  Api_Pharmacy_Create_Response_Success,
  Api_Pharmacy_Cart_Set_Request_Body,
  Api_Pharmacy_Cart_Set_Response_Success,
  Api_Pharmacy_Item_Category,
  Api_Pharmacy_Item_Brand,
  Api_Pharmacy_Item_Create_Request_Body,
  Api_Pharmacy_Item_Create_Response_Success,
  Api_Pharmacy_Item_PharmacyStoreItem,
  Api_Pharmacy_Item_List_Response_Success,
  Api_Pharmacy_Item_ById_Get_Response_Success,
  Api_Pharmacy_Item_ById_Update_Request_Body,
  Api_Pharmacy_Item_ById_Update_Response_Success,
  Api_Pharmacy_Item_ById_Delete_Response_Success,
  Api_Pharmacy_Order_Order,
  Api_Pharmacy_Order_List_Response_Success,
  Api_Pharmacy_Order_ById_Get_Response_Success,
  Api_Pharmacy_Order_ById_Pay_UpdateStatus_Request_Body,
  Api_Pharmacy_Order_ById_Pay_UpdateStatus_Response_Success_Success,
  Api_Pharmacy_Order_ById_Pay_UpdateStatus_Response_Error_InvalidStatusTransition,
  PaymentUrl,
  Api_Pharmacy_Order_ById_Pay_Response_Online_Response_Success_Success,
  Api_Pharmacy_Order_ById_Pay_Response_Error_PaymentAlreadyMadeError,
  Api_Pharmacy_Order_ById_Pay_Response_Wallet_Response_Success_Success,
  Api_Pharmacy_Order_ById_Pay_Response_Wallet_Response_Error_InsufficientBalanceError,
  Api_Pharmacy_PharmacyStore,
  Api_Pharmacy_ById_Get_Response_Success,
  AddressUpdate,
  Api_Pharmacy_ById_Update_Request_Body,
  Api_Pharmacy_ById_Update_Response_Success,
  Api_Pharmacy_ById_Delete_Response_Success,
  Api_Waitlist_Body,
  Api_Waitlist_Response_Success,
  Api_Waitlist_Response_AlreadyJoinedError,
  Api_Wallet_Wallet,
  Api_Wallet_Get_Response_Success,
  Api_Wallet_Topup_Body,
  Api_Wallet_Topup_Response_Success,
  Api_Wallet_Transaction,
  Api_Wallet_Transactions_Response_Success,
  Api_Consultation_Request_PaginatedConsultationRequest,
  Api_Doctor_SuccessMessage,
  Api_NoTokenProvidedError,
  Api_Pharmacy_ById_Delete_Request_Path,
  Api_Pharmacy_ById_Get_Request_Path,
  Api_Pharmacy_ById_Update_Request_Path,
  Api_Pharmacy_Cart_CartItem,
  Api_Pharmacy_Cart_Checkout_Request_Body,
  Api_Pharmacy_Item_ById_Delete_Request_Path,
  Api_Pharmacy_Item_ById_Get_Request_Path,
  Api_Pharmacy_Item_ById_Update_Request_Path,
  Api_Pharmacy_Item_List_Request_Query,
  Api_Pharmacy_Order_ById_Get_Request_Path,
  Api_Pharmacy_Order_ById_Pay_Response_Online_Request_Path,
  Api_Pharmacy_Order_ById_Pay_Response_Wallet_Request_Path,
  Api_Pharmacy_Order_ById_Pay_UpdateStatus_Request_Path,
  Paginated,
};

const endpoints = makeApi([
  {
    method: "get",
    path: "/api/auth/profile",
    description: `Fetch details of currently signed in user`,
    requestFormat: "json",
    response: Api_Authentication_Profile_Response_Success,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: z.union([Api_UnauthorizedError, Api_UserNotVerifiedError]),
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError,
      },
    ],
  },
  {
    method: "post",
    path: "/api/auth/reset-password",
    description: `Initiates the password reset process.`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Api_Authentication_PasswordReset_Initialize_Body,
      },
    ],
    response: Api_Authentication_PasswordReset_Initialize_Response_Success,
    errors: [
      {
        status: 400,
        description: `The server could not understand the request due to invalid syntax.`,
        schema: z.union([
          Api_Authentication_PasswordReset_Initialize_Response_PasswordResetMailAlreadySentError,
          Api_BadRequestError,
        ]),
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError,
      },
    ],
  },
  {
    method: "post",
    path: "/api/auth/reset-password/:token",
    description: `Confirms password reset request and updates the password.`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Api_Authentication_PasswordReset_Confirm_Body,
      },
      {
        name: "token",
        type: "Path",
        schema: z.string(),
      },
    ],
    response:
      Api_Authentication_PasswordReset_Confirm_Response_PasswordResetSuccessful,
    errors: [
      {
        status: 400,
        description: `The server could not understand the request due to invalid syntax.`,
        schema: z.union([
          Api_Authentication_PasswordReset_Confirm_Response_InvalidOrExpiredTokenError,
          Api_BadRequestError,
        ]),
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError,
      },
    ],
  },
  {
    method: "post",
    path: "/api/auth/send-verification-email",
    description: `Send verification email`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Api_Authentication_SendVerificationEmail_Body,
      },
    ],
    response: Api_Authentication_SendVerificationEmail_Response_Success,
    errors: [
      {
        status: 400,
        description: `The server could not understand the request due to invalid syntax.`,
        schema:
          Api_Authentication_SendVerificationEmail_Response_VerificationMailAlreadySentError,
      },
      {
        status: 404,
        description: `The server cannot find the requested resource.`,
        schema:
          Api_Authentication_SendVerificationEmail_Response_UserNotFoundError,
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError,
      },
    ],
  },
  {
    method: "post",
    path: "/api/auth/sign-in",
    description: `Sign in user`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Api_Authentication_SignIn_Body,
      },
    ],
    response: Api_Authentication_SignIn_Response_AuthCredentials,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError,
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError,
      },
    ],
  },
  {
    method: "post",
    path: "/api/auth/sign-up",
    description: `Sign up new user`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Api_Authentication_SignUp_Body,
      },
    ],
    response: Api_Authentication_SignUp_Response_SignupSuccessful,
    errors: [
      {
        status: 400,
        description: `The server could not understand the request due to invalid syntax.`,
        schema: Api_BadRequestError,
      },
      {
        status: 409,
        description: `The request conflicts with the current state of the server.`,
        schema: Api_Authentication_SignUp_Response_EmailAlreadyInUseError,
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError,
      },
    ],
  },
  {
    method: "post",
    path: "/api/auth/verify-email",
    description: `Verify email address`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Api_Authentication_VerifyEmail_Body,
      },
    ],
    response: Api_Authentication_VerifyEmail_Response_VerificationSuccessful,
    errors: [
      {
        status: 400,
        description: `The server could not understand the request due to invalid syntax.`,
        schema: z.union([
          Api_Authentication_VerifyEmail_Response_InvalidOrExpiredOtpError,
          Api_BadRequestError,
        ]),
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError,
      },
    ],
  },
  {
    method: "get",
    path: "/api/consultation",
    description: `Fetch many consultations`,
    requestFormat: "json",
    parameters: [
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional(),
      },
      {
        name: "per_page",
        type: "Query",
        schema: z.number().int().optional(),
      },
    ],
    response: Api_Consultation_List_Response_Success,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError,
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError,
      },
    ],
  },
  {
    method: "get",
    path: "/api/consultation/:id",
    description: `Fetch consultation by ID`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: Api_Consultation_Consultation,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError,
      },
      {
        status: 404,
        description: `The server cannot find the requested resource.`,
        schema: Api_Consultation_Get_NotFoundError,
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError,
      },
    ],
  },
  {
    method: "post",
    path: "/api/consultation/request",
    description: `Request consultation`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Api_Consultation_Request_ConsultationRequestPayload,
      },
    ],
    response: Api_Consultation_Request_Request_Create_Response_Success,
    errors: [
      {
        status: 400,
        description: `The server could not understand the request due to invalid syntax.`,
        schema: Api_BadRequestError,
      },
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError,
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError,
      },
    ],
  },
  {
    method: "get",
    path: "/api/consultation/request",
    description: `Fetch many consultation requests`,
    requestFormat: "json",
    parameters: [
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional(),
      },
      {
        name: "per_page",
        type: "Query",
        schema: z.number().int().optional(),
      },
      {
        name: "profile",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: Api_Consultation_Request_Request_List_Response_Success,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError,
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError,
      },
    ],
  },
  {
    method: "get",
    path: "/api/consultation/request/:id",
    description: `Fetch consultation request by ID`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: Api_Consultation_Request_ConsultationRequest,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError,
      },
      {
        status: 404,
        description: `The server cannot find the requested resource.`,
        schema: Api_Consultation_Request_NotFoundError,
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError,
      },
    ],
  },
  {
    method: "post",
    path: "/api/consultation/request/:id/accept",
    description: `Accept consultation request`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: Api_Consultation_Request_Request_Accept_Response_Success,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError,
      },
      {
        status: 404,
        description: `The server cannot find the requested resource.`,
        schema: Api_Consultation_Request_NotFoundError,
      },
      {
        status: 406,
        description: `Client error`,
        schema: z.union([
          Api_Consultation_Request_Request_Accept_Response_AlreadyDeclinedError,
          Api_Consultation_Request_Request_Accept_Response_AlreadyAcceptedError,
        ]),
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError,
      },
    ],
  },
  {
    method: "post",
    path: "/api/consultation/request/:id/reject",
    description: `Reject consultation request`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: Api_Consultation_Request_Request_Reject_Response_Success,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError,
      },
      {
        status: 404,
        description: `The server cannot find the requested resource.`,
        schema: Api_Consultation_Request_NotFoundError,
      },
      {
        status: 406,
        description: `Client error`,
        schema: z.union([
          Api_Consultation_Request_Request_Reject_Response_AlreadyDeclinedError,
          Api_Consultation_Request_Request_Reject_Response_AlreadyAcceptedError,
        ]),
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError,
      },
    ],
  },
  {
    method: "post",
    path: "/api/doctors",
    description: `Create doctor profile`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Api_Doctor_Create_Request_Body,
      },
    ],
    response: Api_Doctor_Create_Response_Success,
    errors: [
      {
        status: 400,
        description: `The server could not understand the request due to invalid syntax.`,
        schema: Api_BadRequestError,
      },
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError,
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError,
      },
    ],
  },
  {
    method: "get",
    path: "/api/doctors",
    description: `Fetch many doctor profiles`,
    requestFormat: "json",
    parameters: [
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional(),
      },
      {
        name: "per_page",
        type: "Query",
        schema: z.number().int().optional(),
      },
    ],
    response: Api_Doctor_List_Response_Success,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError,
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError,
      },
    ],
  },
  {
    method: "get",
    path: "/api/doctors/:id",
    description: `Fetch doctor profile by ID`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: Api_Doctor_Get_Response_Success,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError,
      },
      {
        status: 404,
        description: `The server cannot find the requested resource.`,
        schema: Api_Doctor_Get_Response_ProfileNotFoundError,
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError,
      },
    ],
  },
  {
    method: "get",
    path: "/api/doctors/profile",
    description: `Fetch doctor profile`,
    requestFormat: "json",
    response: Api_Doctor_Profile_Get_Response_Success,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError,
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError,
      },
    ],
  },
  {
    method: "put",
    path: "/api/doctors/profile",
    description: `Update doctor profile`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Api_Doctor_Profile_Update_Body,
      },
    ],
    response: Api_Doctor_Profile_Update_Response_Success,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError,
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError,
      },
    ],
  },
  {
    method: "post",
    path: "/api/patients",
    description: `Create patient profile`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Api_Patient_Create_Request_Body,
      },
    ],
    response: Api_Patient_Create_Response_Success,
    errors: [
      {
        status: 400,
        description: `The server could not understand the request due to invalid syntax.`,
        schema: Api_BadRequestError,
      },
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError,
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError,
      },
    ],
  },
  {
    method: "get",
    path: "/api/patients/",
    description: `Fetch many patient profiles`,
    requestFormat: "json",
    parameters: [
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional(),
      },
      {
        name: "per_page",
        type: "Query",
        schema: z.number().int().optional(),
      },
    ],
    response: Api_Patient_List_Response_Success,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError,
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError,
      },
    ],
  },
  {
    method: "get",
    path: "/api/patients/:id",
    description: `Fetch patient by ID`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: Api_Patient_Get_Response_Success,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError,
      },
      {
        status: 404,
        description: `The server cannot find the requested resource.`,
        schema: Api_Patient_Get_Response_ProfileNotFoundError,
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError,
      },
    ],
  },
  {
    method: "get",
    path: "/api/patients/profile",
    description: `Fetch patient profile`,
    requestFormat: "json",
    response: Api_Patient_Profie_Get_Response_Success,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError,
      },
      {
        status: 404,
        description: `The server cannot find the requested resource.`,
        schema: Api_Patient_Profie_Get_Response_ProfileNotFoundError,
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError,
      },
    ],
  },
  {
    method: "patch",
    path: "/api/patients/profile",
    description: `Update patient profile`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Api_Patient_Profie_Update_Body,
      },
    ],
    response: Api_Patient_Profie_Update_Response_Success,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError,
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError,
      },
    ],
  },
  {
    method: "post",
    path: "/api/patients/profile/upload/profile-image",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.unknown(),
      },
    ],
    response: Api_Patient_Upload_Response_Success,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError,
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError,
      },
    ],
  },
  {
    method: "post",
    path: "/api/pharmacy/",
    description: `Create a pharmacy store`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Api_Pharmacy_Create_Request_Body,
      },
    ],
    response: Api_Pharmacy_Create_Response_Success,
    errors: [
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError,
      },
    ],
  },
  {
    method: "get",
    path: "/api/pharmacy/:id",
    description: `Fetch a pharmacy store by ID`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: Api_Pharmacy_ById_Get_Response_Success,
    errors: [
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError,
      },
    ],
  },
  {
    method: "patch",
    path: "/api/pharmacy/:id",
    description: `Update a pharmacy store by ID`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Api_Pharmacy_ById_Update_Request_Body,
      },
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: Api_Pharmacy_ById_Update_Response_Success,
    errors: [
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError,
      },
    ],
  },
  {
    method: "delete",
    path: "/api/pharmacy/:id",
    description: `Delete a pharmacy store by ID`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: Api_Pharmacy_ById_Delete_Response_Success,
    errors: [
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError,
      },
    ],
  },
  {
    method: "put",
    path: "/api/pharmacy/carts",
    description: `Item set to cart`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Api_Pharmacy_Cart_Set_Request_Body,
      },
    ],
    response: Api_Pharmacy_Cart_Set_Response_Success,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError,
      },
      {
        status: 404,
        description: `The server cannot find the requested resource.`,
        schema: z
          .object({ code: z.literal("PHARMACY_STORE_ITEM_NOT_FOUND_ERROR") })
          .passthrough(),
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError,
      },
    ],
  },
  {
    method: "post",
    path: "/api/pharmacy/items",
    description: `Create a pharmacy store item`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Api_Pharmacy_Item_Create_Request_Body,
      },
    ],
    response: Api_Pharmacy_Item_Create_Response_Success,
    errors: [
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError,
      },
    ],
  },
  {
    method: "get",
    path: "/api/pharmacy/items",
    description: `Fetch many pharmacy store items`,
    requestFormat: "json",
    parameters: [
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional(),
      },
      {
        name: "per_page",
        type: "Query",
        schema: z.number().int().optional(),
      },
      {
        name: "pharmacy_store_id",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "query",
        type: "Query",
        schema: z.object({}).partial().passthrough(),
      },
    ],
    response: Api_Pharmacy_Item_List_Response_Success,
    errors: [
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError,
      },
    ],
  },
  {
    method: "get",
    path: "/api/pharmacy/items/:id",
    description: `Fetch a pharmacy store item by ID`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: Api_Pharmacy_Item_ById_Get_Response_Success,
    errors: [
      {
        status: 404,
        description: `The server cannot find the requested resource.`,
        schema: z
          .object({ code: z.literal("PHARMACY_STORE_ITEM_NOT_FOUND_ERROR") })
          .passthrough(),
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError,
      },
    ],
  },
  {
    method: "patch",
    path: "/api/pharmacy/items/:id",
    description: `Update a pharmacy store item by ID`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Api_Pharmacy_Item_ById_Update_Request_Body,
      },
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: Api_Pharmacy_Item_ById_Update_Response_Success,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError,
      },
      {
        status: 404,
        description: `The server cannot find the requested resource.`,
        schema: z
          .object({ code: z.literal("PHARMACY_STORE_ITEM_NOT_FOUND_ERROR") })
          .passthrough(),
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError,
      },
    ],
  },
  {
    method: "delete",
    path: "/api/pharmacy/items/:id",
    description: `Delete a pharmacy store item by ID`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: Api_Pharmacy_Item_ById_Delete_Response_Success,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError,
      },
      {
        status: 404,
        description: `The server cannot find the requested resource.`,
        schema: z
          .object({ code: z.literal("PHARMACY_STORE_ITEM_NOT_FOUND_ERROR") })
          .passthrough(),
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError,
      },
    ],
  },
  {
    method: "get",
    path: "/api/pharmacy/orders",
    description: `Fetch many pharmacy store orders`,
    requestFormat: "json",
    parameters: [
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional(),
      },
      {
        name: "per_page",
        type: "Query",
        schema: z.number().int().optional(),
      },
    ],
    response: Api_Pharmacy_Order_List_Response_Success,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError,
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError,
      },
    ],
  },
  {
    method: "get",
    path: "/api/pharmacy/orders/:id",
    description: `Fetch a pharmacy store order by ID`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: Api_Pharmacy_Order_ById_Get_Response_Success,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError,
      },
      {
        status: 404,
        description: `The server cannot find the requested resource.`,
        schema: z
          .object({ code: z.literal("PHARMACY_STORE_ORDER_NOT_FOUND_ERROR") })
          .passthrough(),
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError,
      },
    ],
  },
  {
    method: "patch",
    path: "/api/pharmacy/orders/:id/pay",
    description: `Update a pharmacy store order status by ID`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Api_Pharmacy_Order_ById_Pay_UpdateStatus_Request_Body,
      },
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: Api_Pharmacy_Order_ById_Pay_UpdateStatus_Response_Success_Success,
    errors: [
      {
        status: 400,
        description: `The server could not understand the request due to invalid syntax.`,
        schema:
          Api_Pharmacy_Order_ById_Pay_UpdateStatus_Response_Error_InvalidStatusTransition,
      },
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError,
      },
      {
        status: 404,
        description: `The server cannot find the requested resource.`,
        schema: z
          .object({ code: z.literal("PHARMACY_STORE_ORDER_NOT_FOUND_ERROR") })
          .passthrough(),
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError,
      },
    ],
  },
  {
    method: "post",
    path: "/api/pharmacy/orders/:id/pay/online",
    description: `Pay for a pharmacy store order online`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response:
      Api_Pharmacy_Order_ById_Pay_Response_Online_Response_Success_Success,
    errors: [
      {
        status: 400,
        description: `The server could not understand the request due to invalid syntax.`,
        schema:
          Api_Pharmacy_Order_ById_Pay_Response_Error_PaymentAlreadyMadeError,
      },
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError,
      },
      {
        status: 404,
        description: `The server cannot find the requested resource.`,
        schema: z
          .object({ code: z.literal("PHARMACY_STORE_ORDER_NOT_FOUND_ERROR") })
          .passthrough(),
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError,
      },
    ],
  },
  {
    method: "post",
    path: "/api/pharmacy/orders/:id/pay/wallet",
    description: `Pay for a pharmacy store order with wallet`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response:
      Api_Pharmacy_Order_ById_Pay_Response_Wallet_Response_Success_Success,
    errors: [
      {
        status: 400,
        description: `The server could not understand the request due to invalid syntax.`,
        schema: z.union([
          Api_Pharmacy_Order_ById_Pay_Response_Wallet_Response_Error_InsufficientBalanceError,
          Api_Pharmacy_Order_ById_Pay_Response_Error_PaymentAlreadyMadeError,
        ]),
      },
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError,
      },
      {
        status: 404,
        description: `The server cannot find the requested resource.`,
        schema: z
          .object({ code: z.literal("PHARMACY_STORE_ORDER_NOT_FOUND_ERROR") })
          .passthrough(),
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError,
      },
    ],
  },
  {
    method: "post",
    path: "/api/waitlist",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Api_Waitlist_Body,
      },
    ],
    response: Api_Waitlist_Response_Success,
    errors: [
      {
        status: 406,
        description: `Client error`,
        schema: Api_Waitlist_Response_AlreadyJoinedError,
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError,
      },
    ],
  },
  {
    method: "get",
    path: "/api/wallet",
    requestFormat: "json",
    response: Api_Wallet_Get_Response_Success,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError,
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError,
      },
    ],
  },
  {
    method: "post",
    path: "/api/wallet",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ amount: z.number() }).passthrough(),
      },
    ],
    response: Api_Wallet_Topup_Response_Success,
    errors: [
      {
        status: 400,
        description: `The server could not understand the request due to invalid syntax.`,
        schema: Api_BadRequestError,
      },
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError,
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError,
      },
    ],
  },
  {
    method: "get",
    path: "/api/wallet/transactions",
    requestFormat: "json",
    parameters: [
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional(),
      },
      {
        name: "per_page",
        type: "Query",
        schema: z.number().int().optional(),
      },
    ],
    response: Api_Wallet_Transactions_Response_Success,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError,
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError,
      },
    ],
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
