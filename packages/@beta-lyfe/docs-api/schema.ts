import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const Email = z.string();
const Api_Authentication_ForgotPasswordPayload = z
  .object({ email: Email })
  .passthrough();
const Api_Authentication_PasswordResetInitResponse = z
  .object({ message: z.string() })
  .passthrough();
const Api_BadRequestError = z.object({ message: z.string() }).passthrough();
const Password = z.string();
const Api_Authentication_ConfirmForgotPasswordPayload = z
  .object({ password: Password, password2: Password })
  .passthrough();
const Api_Authentication_WelcomeMessage = z
  .object({ message: z.string() })
  .passthrough();
const Api_UnexpectedError = z.object({ message: z.string() }).passthrough();
const Api_Authentication_ResendVerificationEmailPayload = z
  .object({ email: z.string() })
  .passthrough();
const Api_Authentication_ResetPasswordPayload = z
  .object({ email: Email, password: Password })
  .passthrough();
const Api_Authentication_SendResetPasswordEmailPayload = z
  .object({ email: Email })
  .passthrough();
const Api_Authentication_SignInPayload = z
  .object({ email: Email, password: Password })
  .passthrough();
const Id = z.string();
const PhoneNumber = z.string();
const DateOfBirth = z.string();
const Api_Doctor_Specialization = z.string();
const Api_Doctor_Certification = z
  .object({ name: z.string(), institution: z.string(), date: z.string() })
  .passthrough();
const Api_Doctor_Experience = z
  .object({
    title: z.string(),
    institution: z.string(),
    start_date: z.string(),
    end_date: z.string().optional(),
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
const Api_Doctor_Location = z
  .object({
    landmark: z.string(),
    street: z.string(),
    coordinates: z.string().optional(),
    city: z.string(),
    state: z.string(),
  })
  .passthrough();
const Api_Doctor_Doctor = z
  .object({
    id: Id,
    profile_picture_url: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    email: Email,
    phone_number: PhoneNumber,
    date_of_birth: DateOfBirth,
    specialization: Api_Doctor_Specialization.nullable(),
    patients_treated: z.number().int(),
    years_of_experience: z.number().int(),
    reviews: z.number().int(),
    rating: z.number(),
    description: z.string().nullable(),
    home_consultation_charge: z.number(),
    video_consultation_charge: z.number(),
    clinic_consultation_charge: z.number(),
    certifications: z.array(Api_Doctor_Certification).nullable(),
    experiences: z.array(Api_Doctor_Experience).nullable(),
    working_hours: z.array(Api_Doctor_WorkingHour).nullable(),
    location: Api_Doctor_Location,
  })
  .passthrough();
const Api_Authentication_AuthCredentials = z
  .object({ access: z.string(), refresh: z.string(), user: Api_Doctor_Doctor })
  .passthrough();
const Api_Authentication_SignOutSuccessful = z
  .object({ message: z.string() })
  .passthrough();
const Api_Authentication_SignUpPayload = z
  .object({
    first_name: z.string(),
    last_name: z.string(),
    email: Email,
    password: Password,
    password2: Password,
    is_doctor: z.boolean(),
  })
  .passthrough();
const Api_Authentication_VerificationError = z
  .object({ message: z.string() })
  .passthrough();
const Api_Authentication_VerifyEmailPayload = z
  .object({ otp: z.string() })
  .passthrough();
const Api_Authentication_VerificationSuccessful = z
  .object({ message: z.string() })
  .passthrough();
const Api_VerifyOtpError = z.object({ message: z.string() }).passthrough();
const DateTime = z.string();
const Api_Consultation_Request_ConsultationRequestPayload = z
  .object({
    doctor_id: Id,
    start_time: DateTime,
    end_time: DateTime,
    message: z.string(),
  })
  .passthrough();
const Api_Consultation_Request_ConsultationRequestCreated = z
  .object({ message: z.string() })
  .passthrough();
const Api_AuthenticationRequiredError = z
  .object({ message: z.string() })
  .passthrough();
const Api_Consultation_Request_ConsultationRequest = z
  .object({
    doctor_id: Id,
    patient_id: Id,
    status: z.enum(["pending", "accepted", "rejected"]),
    message: z.string(),
    start_time: DateTime,
    end_time: DateTime,
    created_at: DateTime,
  })
  .passthrough();
const PaginatedMeta = z
  .object({
    total: z.number().int(),
    page: z.number().int(),
    per_page: z.number().int(),
  })
  .passthrough();
const Api_Consultation_Request_ConsultationRequestAccepted = z
  .object({ message: z.literal("Consultation request accepted") })
  .passthrough();
const Api_Consultation_DoctorNote = z
  .object({ id: Id, content: z.string(), created_at: DateTime })
  .passthrough();
const Api_Consultation_Media = z
  .object({ type: z.enum(["image", "video"]), url: z.string() })
  .passthrough();
const Role = z.enum(["patient", "doctor"]);
const Api_Consultation_Chat = z
  .object({
    id: Id,
    content: z.string(),
    media: z.array(Api_Consultation_Media),
    sent_by: Role,
    created_at: DateTime,
  })
  .passthrough();
const Api_Consultation_Consultation = z
  .object({
    doctors_notes: z.array(Api_Consultation_DoctorNote),
    chats: z.array(Api_Consultation_Chat),
    room_id: Id,
    doctor_id: Id,
    patient_id: Id,
  })
  .passthrough();
const Api_Consultation_AccessToken = z
  .object({ token: z.string() })
  .passthrough();
const Api_Consultation_ConsultationChatAdded = z
  .object({ message: z.string() })
  .passthrough();
const Api_Consultation_ConsultationNoteAdded = z
  .object({ message: z.string() })
  .passthrough();
const Api_Dev_UserCreatedMessage = z
  .object({ message: z.string() })
  .passthrough();
const Api_Doctor_PaginatedDoctors = z
  .object({
    results: z
      .object({ message: z.string(), data: z.array(Api_Doctor_Doctor) })
      .passthrough(),
    count: z.number().int(),
    next: z.string(),
    previous: z.string(),
  })
  .passthrough();
const Api_Doctor_LocationUpdate = z
  .object({
    landmark: z.string(),
    street: z.string(),
    coordinates: z.string(),
    city: z.string(),
    state: z.string(),
  })
  .partial()
  .passthrough();
const Api_Doctor_DoctorUpdate = z
  .object({
    id: Id,
    profile_picture_url: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    email: Email,
    phone_number: PhoneNumber,
    date_of_birth: DateOfBirth,
    specialization: Api_Doctor_Specialization.nullable(),
    patients_treated: z.number().int(),
    years_of_experience: z.number().int(),
    reviews: z.number().int(),
    rating: z.number(),
    description: z.string().nullable(),
    home_consultation_charge: z.number(),
    video_consultation_charge: z.number(),
    clinic_consultation_charge: z.number(),
    certifications: z.array(Api_Doctor_Certification).nullable(),
    experiences: z.array(Api_Doctor_Experience).nullable(),
    working_hours: z.array(Api_Doctor_WorkingHour).nullable(),
    location: Api_Doctor_LocationUpdate,
  })
  .partial()
  .passthrough();
const Api_Doctor_DoctorNotFoundError = z
  .object({ message: z.string() })
  .passthrough();
const Api_Patient_Patient = z
  .object({
    id: Id,
    first_name: z.string(),
    last_name: z.string(),
    phone_number: PhoneNumber,
    date_of_birth: DateOfBirth,
    email: Email,
  })
  .passthrough();
const Api_Patient_PatientUpdate = z
  .object({
    id: Id,
    first_name: z.string(),
    last_name: z.string(),
    phone_number: PhoneNumber,
    date_of_birth: DateOfBirth,
    email: Email,
  })
  .partial()
  .passthrough();
const Api_Waitlist_JoinWaitlistPayload = z
  .object({ email: Email })
  .passthrough();
const Api_Waitlist_WaitlistJoined = z
  .object({ message: z.string() })
  .passthrough();
const Api_Waitlist_WaitlistAlreadyJoinedError = z
  .object({ message: z.string() })
  .passthrough();
const Api_Wallet_Wallet = z
  .object({ id: Id, balance: z.number() })
  .passthrough();
const Api_Wallet_WalletTopupPayload = z
  .object({ amount: z.number() })
  .passthrough();
const Api_Wallet_WalletTopupResponse = z
  .object({ url: z.string() })
  .passthrough();
const Api_Wallet_WalletTransaction = z
  .object({
    id: Id,
    type: z.enum(["credit", "debit"]),
    amount: z.number(),
    description: z.string(),
    note: z.string(),
    created_at: DateTime,
  })
  .passthrough();
const Api_EmailPayload = z.object({ email: Email }).passthrough();
const Api_NoTokenProvidedError = z
  .object({ message: z.string() })
  .passthrough();

export const schemas = {
  Email,
  Api_Authentication_ForgotPasswordPayload,
  Api_Authentication_PasswordResetInitResponse,
  Api_BadRequestError,
  Password,
  Api_Authentication_ConfirmForgotPasswordPayload,
  Api_Authentication_WelcomeMessage,
  Api_UnexpectedError,
  Api_Authentication_ResendVerificationEmailPayload,
  Api_Authentication_ResetPasswordPayload,
  Api_Authentication_SendResetPasswordEmailPayload,
  Api_Authentication_SignInPayload,
  Id,
  PhoneNumber,
  DateOfBirth,
  Api_Doctor_Specialization,
  Api_Doctor_Certification,
  Api_Doctor_Experience,
  Api_Doctor_WorkingHour,
  Api_Doctor_Location,
  Api_Doctor_Doctor,
  Api_Authentication_AuthCredentials,
  Api_Authentication_SignOutSuccessful,
  Api_Authentication_SignUpPayload,
  Api_Authentication_VerificationError,
  Api_Authentication_VerifyEmailPayload,
  Api_Authentication_VerificationSuccessful,
  Api_VerifyOtpError,
  DateTime,
  Api_Consultation_Request_ConsultationRequestPayload,
  Api_Consultation_Request_ConsultationRequestCreated,
  Api_AuthenticationRequiredError,
  Api_Consultation_Request_ConsultationRequest,
  PaginatedMeta,
  Api_Consultation_Request_ConsultationRequestAccepted,
  Api_Consultation_DoctorNote,
  Api_Consultation_Media,
  Role,
  Api_Consultation_Chat,
  Api_Consultation_Consultation,
  Api_Consultation_AccessToken,
  Api_Consultation_ConsultationChatAdded,
  Api_Consultation_ConsultationNoteAdded,
  Api_Dev_UserCreatedMessage,
  Api_Doctor_PaginatedDoctors,
  Api_Doctor_LocationUpdate,
  Api_Doctor_DoctorUpdate,
  Api_Doctor_DoctorNotFoundError,
  Api_Patient_Patient,
  Api_Patient_PatientUpdate,
  Api_Waitlist_JoinWaitlistPayload,
  Api_Waitlist_WaitlistJoined,
  Api_Waitlist_WaitlistAlreadyJoinedError,
  Api_Wallet_Wallet,
  Api_Wallet_WalletTopupPayload,
  Api_Wallet_WalletTopupResponse,
  Api_Wallet_WalletTransaction,
  Api_EmailPayload,
  Api_NoTokenProvidedError,
};

const endpoints = makeApi([
  {
    method: "post",
    path: "/api/auth/forget-password",
    description: `  Initiates the password reset process.
  
  Receives an email address and generates a password reset token if the email exists in the database.
  Returns a UID and reset key that will be used to verify the reset request.`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Api_Authentication_ForgotPasswordPayload,
      },
    ],
    response: z.object({ message: z.string() }).passthrough(),
    errors: [
      {
        status: 400,
        description: `The server could not understand the request due to invalid syntax.`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
    ],
  },
  {
    method: "post",
    path: "/api/auth/forget-password/:uid/:otp",
    description: `  Confirms password reset request and updates the password.
  
  Validates the provided UID and OTP token, then updates the user&#x27;s password if:
  - The reset token hasn&#x27;t expired
  - The provided passwords match
  - The user exists and token is valid`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Api_Authentication_ConfirmForgotPasswordPayload,
      },
      {
        name: "uid",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "otp",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.object({ message: z.string() }).passthrough(),
    errors: [
      {
        status: 400,
        description: `The server could not understand the request due to invalid syntax.`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 500,
        description: `Server error`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
    ],
  },
  {
    method: "post",
    path: "/api/auth/resend-verify-email",
    description: `Resend verification email`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ email: z.string() }).passthrough(),
      },
    ],
    response: z.object({ message: z.string() }).passthrough(),
    errors: [
      {
        status: 400,
        description: `The server could not understand the request due to invalid syntax.`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 500,
        description: `Server error`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
    ],
  },
  {
    method: "put",
    path: "/api/auth/reset-password",
    description: `Reset password`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Api_Authentication_ResetPasswordPayload,
      },
    ],
    response: z.object({ message: z.string() }).passthrough(),
    errors: [
      {
        status: 400,
        description: `The server could not understand the request due to invalid syntax.`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 500,
        description: `Server error`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
    ],
  },
  {
    method: "post",
    path: "/api/auth/reset-password/send-email",
    description: `Send reset password email`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Api_Authentication_SendResetPasswordEmailPayload,
      },
    ],
    response: z.object({ message: z.string() }).passthrough(),
    errors: [
      {
        status: 400,
        description: `The server could not understand the request due to invalid syntax.`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 500,
        description: `Server error`,
        schema: z.object({ message: z.string() }).passthrough(),
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
        schema: Api_Authentication_SignInPayload,
      },
    ],
    response: Api_Authentication_AuthCredentials,
    errors: [
      {
        status: 400,
        description: `The server could not understand the request due to invalid syntax.`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 500,
        description: `Server error`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
    ],
  },
  {
    method: "get",
    path: "/api/auth/sign-out",
    description: `Sign out user`,
    requestFormat: "json",
    response: z.object({ message: z.string() }).passthrough(),
    errors: [
      {
        status: 500,
        description: `Server error`,
        schema: z.object({ message: z.string() }).passthrough(),
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
        schema: Api_Authentication_SignUpPayload,
      },
    ],
    response: z.object({ message: z.string() }).passthrough(),
    errors: [
      {
        status: 400,
        description: `The server could not understand the request due to invalid syntax.`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 500,
        description: `Server error`,
        schema: z.object({ message: z.string() }).passthrough(),
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
        schema: z.object({ otp: z.string() }).passthrough(),
      },
    ],
    response: z.object({ message: z.string() }).passthrough(),
    errors: [
      {
        status: 400,
        description: `The server could not understand the request due to invalid syntax.`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 404,
        description: `The server cannot find the requested resource.`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 500,
        description: `Server error`,
        schema: z.object({ message: z.string() }).passthrough(),
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
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 404,
        description: `The server cannot find the requested resource.`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 500,
        description: `Server error`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
    ],
  },
  {
    method: "get",
    path: "/api/consultation/:id/access-token",
    description: `Generate access token`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.object({ token: z.string() }).passthrough(),
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 404,
        description: `The server cannot find the requested resource.`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 500,
        description: `Server error`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
    ],
  },
  {
    method: "post",
    path: "/api/consultation/:id/chat",
    description: `Add chat`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.object({ message: z.string() }).passthrough(),
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 404,
        description: `The server cannot find the requested resource.`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 500,
        description: `Server error`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
    ],
  },
  {
    method: "post",
    path: "/api/consultation/:id/note",
    description: `Add doctors notes`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.string(),
      },
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.object({ message: z.string() }).passthrough(),
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 404,
        description: `The server cannot find the requested resource.`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 500,
        description: `Server error`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
    ],
  },
  {
    method: "post",
    path: "/api/consultation/request/",
    description: `Request consultation`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Api_Consultation_Request_ConsultationRequestPayload,
      },
    ],
    response: z.object({ message: z.string() }).passthrough(),
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 500,
        description: `Server error`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
    ],
  },
  {
    method: "get",
    path: "/api/consultation/request/",
    description: `Fetch consultation requests`,
    requestFormat: "json",
    response: z
      .object({
        data: z.array(Api_Consultation_Request_ConsultationRequest),
        meta: PaginatedMeta,
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 500,
        description: `Server error`,
        schema: z.object({ message: z.string() }).passthrough(),
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
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 404,
        description: `The server cannot find the requested resource.`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 500,
        description: `Server error`,
        schema: z.object({ message: z.string() }).passthrough(),
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
    response: z.array(Api_Consultation_Request_ConsultationRequestAccepted),
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 404,
        description: `The server cannot find the requested resource.`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 500,
        description: `Server error`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
    ],
  },
  {
    method: "post",
    path: "/api/dev/user",
    description: `Create a user`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Api_Authentication_SignUpPayload,
      },
    ],
    response: z.object({ message: z.string() }).passthrough(),
    errors: [
      {
        status: 500,
        description: `Server error`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
    ],
  },
  {
    method: "get",
    path: "/api/doctors/",
    description: `Fetch all doctors`,
    requestFormat: "json",
    response: Api_Doctor_PaginatedDoctors,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 500,
        description: `Server error`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
    ],
  },
  {
    method: "get",
    path: "/api/doctors/profile",
    description: `Fetch doctor profile`,
    requestFormat: "json",
    response: Api_Doctor_Doctor,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 500,
        description: `Server error`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
    ],
  },
  {
    method: "patch",
    path: "/api/doctors/profile",
    description: `Update doctor profile`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Api_Doctor_DoctorUpdate,
      },
    ],
    response: z
      .object({ message: z.string(), data: Api_Doctor_Doctor })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 500,
        description: `Server error`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
    ],
  },
  {
    method: "get",
    path: "/api/doctors/profile/:id",
    description: `Fetch doctor by ID`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z
      .object({ message: z.string(), data: Api_Doctor_Doctor })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 500,
        description: `Server error`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
    ],
  },
  {
    method: "get",
    path: "/api/patients/",
    description: `Fetch all patients`,
    requestFormat: "json",
    response: z.array(Api_Patient_Patient),
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 500,
        description: `Server error`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
    ],
  },
  {
    method: "get",
    path: "/api/patients/profile",
    description: `Fetch patient profile`,
    requestFormat: "json",
    response: Api_Patient_Patient,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 500,
        description: `Server error`,
        schema: z.object({ message: z.string() }).passthrough(),
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
        schema: Api_Patient_PatientUpdate,
      },
    ],
    response: Api_Patient_Patient,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 404,
        description: `The server cannot find the requested resource.`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 500,
        description: `Server error`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
    ],
  },
  {
    method: "get",
    path: "/api/patients/profile/:id",
    description: `Fetch patient by ID`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: Api_Patient_Patient,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 404,
        description: `The server cannot find the requested resource.`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 500,
        description: `Server error`,
        schema: z.object({ message: z.string() }).passthrough(),
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
        schema: Api_Waitlist_JoinWaitlistPayload,
      },
    ],
    response: z.object({ message: z.string() }).passthrough(),
    errors: [
      {
        status: 406,
        description: `Client error`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 500,
        description: `Server error`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
    ],
  },
  {
    method: "get",
    path: "/api/wallet",
    requestFormat: "json",
    response: Api_Wallet_Wallet,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 500,
        description: `Server error`,
        schema: z.object({ message: z.string() }).passthrough(),
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
    response: z.object({ url: z.string() }).passthrough(),
    errors: [
      {
        status: 400,
        description: `The server could not understand the request due to invalid syntax.`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 500,
        description: `Server error`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
    ],
  },
  {
    method: "get",
    path: "/api/wallet/transactions",
    requestFormat: "json",
    response: z
      .object({
        data: z.array(Api_Wallet_WalletTransaction),
        meta: PaginatedMeta,
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
      {
        status: 500,
        description: `Server error`,
        schema: z.object({ message: z.string() }).passthrough(),
      },
    ],
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
