import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core'
import { z } from 'zod'

const Id = z.string()
const Email = z.string()
const Role = z.enum(['patient', 'doctor'])
const PhoneNumber = z.string()
const DateTime = z.string()
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
    updated_at: DateTime.nullable()
  })
  .passthrough()
const Api_Authentication_Profile_response_Success = z
  .object({ code: z.literal('FETCHED_PROFILE'), data: Api_Authentication_User })
  .passthrough()
const Api_UnauthorizedError = z
  .object({ code: z.literal('UNAUTHORIZED_ERROR') })
  .passthrough()
const Api_UserNotVerifiedError = z
  .object({ code: z.literal('USER_NOT_VERIFIED') })
  .passthrough()
const Api_UnexpectedError = z
  .object({ code: z.literal('UNEXPECTED_ERROR') })
  .passthrough()
const Api_Authentication_PasswordReset_Initialize_Body = z
  .object({ email: Email })
  .passthrough()
const Api_Authentication_PasswordReset_Initialize_response_Success = z
  .object({ code: z.literal('CHECK_EMAIL_FOR_RESET_LINK') })
  .passthrough()
const Api_Authentication_PasswordReset_Initialize_response_PasswordResetMailAlreadySentError =
  z
    .object({
      code: z.literal('PASSWORD_RESET_MAIL_ALREADY_SENT_ERROR'),
      data: z.object({ expires_at: DateTime }).passthrough()
    })
    .passthrough()
const Api_BadRequestError = z
  .object({ code: z.literal('EXPECTED_DATA_NOT_RECEIVED_ERROR') })
  .passthrough()
const Password = z.string()
const Api_Authentication_PasswordReset_Confirm_Body = z
  .object({ password: Password })
  .passthrough()
const Api_Authentication_PasswordReset_Confirm_response_PasswordResetSuccessful =
  z.object({ code: z.literal('PASSWORD_RESET_SUCCESSFUL') }).passthrough()
const Api_Authentication_PasswordReset_Confirm_response_InvalidOrExpiredTokenError =
  z.object({ code: z.literal('INVALID_OR_EXPIRED_TOKEN_ERROR') }).passthrough()
const Api_Authentication_SendVerificationEmail_Body = z
  .object({ email: Email })
  .passthrough()
const Api_Authentication_SendVerificationEmail_response_Success = z
  .object({
    code: z.literal('VERIFICATION_MAIL_SENT'),
    data: z.object({ expires_at: DateTime }).passthrough()
  })
  .passthrough()
const Api_Authentication_SendVerificationEmail_response_VerificationMailAlreadySentError =
  z
    .object({
      code: z.literal('VERIFICATION_MAIL_ALREADY_SENT_ERROR'),
      data: z.object({ expires_at: DateTime }).passthrough()
    })
    .passthrough()
const Api_Authentication_SendVerificationEmail_response_UserNotFoundError = z
  .object({ code: z.literal('USER_NOT_FOUND_ERROR') })
  .passthrough()
const Api_Authentication_SignIn_Body = z
  .object({ email: Email, password: Password })
  .passthrough()
const Token = z.string()
const Api_Authentication_SignIn_response_AuthCredentials = z
  .object({
    code: z.literal('AUTH_CREDENTIALS'),
    data: z.object({ access_token: Token, refresh_token: Token }).passthrough()
  })
  .passthrough()
const Api_Authentication_SignUp_Body = z
  .object({
    first_name: z.string(),
    last_name: z.string(),
    email: Email,
    password: Password,
    phone_number: PhoneNumber,
    is_doctor: z.boolean()
  })
  .passthrough()
const Api_Authentication_SignUp_response_SignupSuccessful = z
  .object({ code: z.literal('SIGNUP_SUCCESSFUL') })
  .passthrough()
const Api_Authentication_SignUp_response_EmailAlreadyInUseError = z
  .object({ code: z.literal('EMAIL_ALREADY_IN_USE_ERROR') })
  .passthrough()
const Otp = z.string()
const Api_Authentication_VerifyEmail_Body = z
  .object({ email: Email, otp: Otp })
  .passthrough()
const Api_Authentication_VerifyEmail_response_VerificationSuccessful = z
  .object({ code: z.literal('VERIFICATION_SUCCESSFUL') })
  .passthrough()
const Api_Authentication_VerifyEmail_response_InvalidOrExpiredOtpError = z
  .object({ code: z.literal('INVALID_OR_EXPIRED_OTP_ERROR') })
  .passthrough()
const Api_Consultation_AccessToken = z
  .object({ token: z.string() })
  .passthrough()
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
    updated_at: DateTime.nullable()
  })
  .passthrough()
const Api_Pagination_Meta = z
  .object({
    page: z.number().int(),
    per_page: z.number().int(),
    total: z.number().int()
  })
  .passthrough()
const Api_Consultation_List_response_Success = z
  .object({
    code: z.literal('FETCH_CONSULTATIONS_SUCCESSFUL'),
    data: z
      .object({
        data: z.array(Api_Consultation_Consultation),
        meta: Api_Pagination_Meta
      })
      .passthrough()
  })
  .passthrough()
const Api_Consultation_Request_ConsultationRequestPayload = z
  .object({
    doctor: Id,
    start_time: DateTime,
    end_time: DateTime,
    message: z.string()
  })
  .passthrough()
const Api_Consultation_Request_Request_Create_response_Success = z
  .object({ code: z.literal('CONSULTATION_REQUEST_CREATED_SUCCESSFULLY') })
  .passthrough()
const DateOfBirth = z.string()
const Media = z.object({ public_id: Id, url: z.string() }).passthrough()
const Api_Doctor_Specialization = z.string()
const Api_Doctor_Certification = z
  .object({ name: z.string(), institution: z.string(), date: z.string() })
  .passthrough()
const Api_Doctor_Experience = z
  .object({
    title: z.string(),
    institution: z.string(),
    start_date: z.string(),
    end_date: z.string().nullable()
  })
  .passthrough()
const Api_Doctor_WorkingHour = z
  .object({
    day: z.enum([
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday'
    ]),
    start_time: z.string(),
    end_time: z.string()
  })
  .passthrough()
const Api_Doctor_Location = z
  .object({
    landmark: z.string(),
    street: z.string(),
    coordinates: z.string().nullable(),
    city: z.string(),
    state: z.string()
  })
  .passthrough()
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
    location: Api_Doctor_Location.nullable(),
    created_at: DateTime,
    updated_at: DateTime.nullable()
  })
  .passthrough()
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
    updated_at: DateTime.nullable()
  })
  .passthrough()
const Api_Consultation_Request_ConsultationRequest = z
  .object({
    id: Id,
    doctor: Id,
    patient: Id,
    status: z.enum(['pending', 'accepted', 'rejected']),
    message: z.string(),
    doctor_profile: Api_Doctor_DoctorProfile.optional(),
    patient_profile: Api_Patient_PatientProfile.optional(),
    start_time: DateTime,
    end_time: DateTime,
    created_at: DateTime,
    updated_at: DateTime
  })
  .passthrough()
const Api_Consultation_Request_Request_List_response_Success = z
  .object({
    code: z.literal('FETCH_CONSULTATION_REQUESTS_SUCCESSFUL'),
    data: z
      .object({
        data: z.array(Api_Consultation_Request_ConsultationRequest),
        meta: Api_Pagination_Meta
      })
      .passthrough()
  })
  .passthrough()
const Api_Consultation_Request_NotFoundError = z
  .object({ code: z.literal('CONSULTATION_REQUEST_NOT_FOUND') })
  .passthrough()
const Api_Consultation_Request_Request_Accept_response_Success = z
  .object({ code: z.literal('CONSULTATION_REQUEST_ACCEPTED_SUCCESSFULLY') })
  .passthrough()
const Api_Consultation_Request_Request_Accept_response_AlreadyDeclinedError = z
  .object({ code: z.literal('CONSULTATION_REQUEST_ALREADY_DECLINED_ERROR') })
  .passthrough()
const Api_Consultation_Request_Request_Accept_response_AlreadyAcceptedError = z
  .object({ code: z.literal('CONSULTATION_REQUEST_ALREADY_ACCEPTED_ERROR') })
  .passthrough()
const Api_Consultation_Request_Request_Reject_response_Success = z
  .object({ code: z.literal('CONSULTATION_REQUEST_REJECTED_SUCCESSFULLY') })
  .passthrough()
const Api_Consultation_Request_Request_Reject_response_AlreadyDeclinedError = z
  .object({ code: z.literal('CONSULTATION_REQUEST_ALREADY_DECLINED_ERROR') })
  .passthrough()
const Api_Consultation_Request_Request_Reject_response_AlreadyAcceptedError = z
  .object({ code: z.literal('CONSULTATION_REQUEST_ALREADY_ACCEPTED_ERROR') })
  .passthrough()
const Api_Consultation_Get_NotFoundError = z
  .object({ code: z.literal('CONSULTATION_NOT_FOUND') })
  .passthrough()
const Api_Dev_CreateUser_response_UserCreatedMessage = z
  .object({ message: z.string() })
  .passthrough()
const Api_Doctor_Create_request_Body = z
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
    location: Api_Doctor_Location.nullable()
  })
  .passthrough()
const Api_Doctor_Create_response_Success = z
  .object({ code: z.literal('DOCTOR_PROFILE_CREATED') })
  .passthrough()
const Api_Doctor_List_response_Success = z
  .object({
    code: z.literal('FETCH_DOCTOR_PROFILES_SUCCESSFUL'),
    data: z
      .object({
        data: z.array(Api_Doctor_DoctorProfile),
        meta: Api_Pagination_Meta
      })
      .passthrough()
  })
  .passthrough()
const Api_Doctor_Profile_Get_response_Success = z
  .object({
    code: z.literal('FETCH_DOCTOR_PROFILE_SUCCESSFUL'),
    data: Api_Doctor_DoctorProfile
  })
  .passthrough()
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
    location: Api_Doctor_Location.nullable(),
    created_at: DateTime,
    updated_at: DateTime.nullable()
  })
  .partial()
  .passthrough()
const Api_Doctor_Profile_Update_response_Success = z
  .object({ code: z.literal('DOCTOR_PROFILE_UPDATED') })
  .passthrough()
const Api_Doctor_Get_response_Success = z
  .object({
    code: z.literal('FETCH_DOCTOR_PROFILE_SUCCESSFUL'),
    data: Api_Doctor_DoctorProfile
  })
  .passthrough()
const Api_Doctor_Get_response_ProfileNotFoundError = z
  .object({ code: z.literal('DOCTOR_PROFILE_NOT_FOUND_ERROR') })
  .passthrough()
const Api_Patient_Create_request_Body = z
  .object({ date_of_birth: DateOfBirth })
  .passthrough()
const Api_Patient_Create_response_Success = z
  .object({ code: z.literal('PATIENT_PROFILE_CREATED') })
  .passthrough()
const Api_Patient_List_response_Success = z
  .object({
    code: z.literal('FETCH_PATIENT_PROFILES_SUCCESSFUL'),
    data: z
      .object({
        data: z.array(Api_Patient_PatientProfile),
        meta: Api_Pagination_Meta
      })
      .passthrough()
  })
  .passthrough()
const Api_Patient_Profie_Get_response_Success = z
  .object({
    code: z.literal('FETCH_PATIENT_PROFILE_SUCCESSFUL'),
    data: Api_Patient_PatientProfile
  })
  .passthrough()
const Api_Patient_Profie_Get_response_ProfileNotFoundError = z
  .object({ code: z.literal('PATIENT_PROFILE_NOT_FOUND_ERROR') })
  .passthrough()
const MediaUpdate = z
  .object({ public_id: Id, url: z.string() })
  .partial()
  .passthrough()
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
    updated_at: DateTime.nullable()
  })
  .partial()
  .passthrough()
const Api_Patient_Profie_Update_response_Success = z
  .object({ code: z.literal('PATIENT_PROFILE_UPDATED') })
  .passthrough()
const Api_Patient_Get_response_Success = z
  .object({
    code: z.literal('FETCH_PATIENT_PROFILE_SUCCESSFUL'),
    data: Api_Patient_PatientProfile
  })
  .passthrough()
const Api_Patient_Get_response_ProfileNotFoundError = z
  .object({ code: z.literal('PATIENT_PROFILE_NOT_FOUND_ERROR') })
  .passthrough()
const Api_Waitlist_Body = z.object({ email: Email }).passthrough()
const Api_Waitlist_response_Success = z
  .object({ code: z.literal('WAITLIST_JOINED_SUCCESSFULLY') })
  .passthrough()
const Api_Waitlist_response_AlreadyJoinedError = z
  .object({ code: z.literal('WAITLIST_ALREADY_JOINED_ERROR') })
  .passthrough()
const Api_Wallet_Wallet = z
  .object({ id: Id, balance: z.number() })
  .passthrough()
const Api_Wallet_Get_response_Success = z
  .object({
    code: z.literal('FETCH_WALLET_SUCCESSFUL'),
    data: Api_Wallet_Wallet
  })
  .passthrough()
const Api_Wallet_Topup_Body = z.object({ amount: z.number() }).passthrough()
const Api_Wallet_Topup_response_Success = z
  .object({ url: z.string() })
  .passthrough()
const Api_Wallet_Transaction = z
  .object({
    id: Id,
    type: z.enum(['credit', 'debit']),
    amount: z.number(),
    description: z.string(),
    note: z.string(),
    created_at: DateTime
  })
  .passthrough()
const Api_Wallet_Transactions_response_Success = z
  .object({
    code: z.literal('FETCH_TRANSACTIONS_SUCCESSFUL'),
    data: z
      .object({
        data: z.array(Api_Wallet_Transaction),
        meta: Api_Pagination_Meta
      })
      .passthrough()
  })
  .passthrough()
const Api_Consultation_Request_PaginatedConsultationRequest = z
  .object({
    results: Api_Consultation_Request_ConsultationRequest,
    count: z.number().int(),
    next: z.string().nullable(),
    previous: z.string().nullable()
  })
  .passthrough()
const Api_Doctor_SuccessMessage = z
  .object({ message: z.string() })
  .passthrough()
const Api_NoTokenProvidedError = z
  .object({ code: z.literal('UNAUTHORIZED_ERROR') })
  .passthrough()
const Paginated = z
  .object({
    count: z.number().int(),
    next: z.string().nullable(),
    previous: z.string().nullable()
  })
  .passthrough()

export const schemas = {
  Id,
  Email,
  Role,
  PhoneNumber,
  DateTime,
  Api_Authentication_User,
  Api_Authentication_Profile_response_Success,
  Api_UnauthorizedError,
  Api_UserNotVerifiedError,
  Api_UnexpectedError,
  Api_Authentication_PasswordReset_Initialize_Body,
  Api_Authentication_PasswordReset_Initialize_response_Success,
  Api_Authentication_PasswordReset_Initialize_response_PasswordResetMailAlreadySentError,
  Api_BadRequestError,
  Password,
  Api_Authentication_PasswordReset_Confirm_Body,
  Api_Authentication_PasswordReset_Confirm_response_PasswordResetSuccessful,
  Api_Authentication_PasswordReset_Confirm_response_InvalidOrExpiredTokenError,
  Api_Authentication_SendVerificationEmail_Body,
  Api_Authentication_SendVerificationEmail_response_Success,
  Api_Authentication_SendVerificationEmail_response_VerificationMailAlreadySentError,
  Api_Authentication_SendVerificationEmail_response_UserNotFoundError,
  Api_Authentication_SignIn_Body,
  Token,
  Api_Authentication_SignIn_response_AuthCredentials,
  Api_Authentication_SignUp_Body,
  Api_Authentication_SignUp_response_SignupSuccessful,
  Api_Authentication_SignUp_response_EmailAlreadyInUseError,
  Otp,
  Api_Authentication_VerifyEmail_Body,
  Api_Authentication_VerifyEmail_response_VerificationSuccessful,
  Api_Authentication_VerifyEmail_response_InvalidOrExpiredOtpError,
  Api_Consultation_AccessToken,
  Api_Consultation_Consultation,
  Api_Pagination_Meta,
  Api_Consultation_List_response_Success,
  Api_Consultation_Request_ConsultationRequestPayload,
  Api_Consultation_Request_Request_Create_response_Success,
  DateOfBirth,
  Media,
  Api_Doctor_Specialization,
  Api_Doctor_Certification,
  Api_Doctor_Experience,
  Api_Doctor_WorkingHour,
  Api_Doctor_Location,
  Api_Doctor_DoctorProfile,
  Api_Patient_PatientProfile,
  Api_Consultation_Request_ConsultationRequest,
  Api_Consultation_Request_Request_List_response_Success,
  Api_Consultation_Request_NotFoundError,
  Api_Consultation_Request_Request_Accept_response_Success,
  Api_Consultation_Request_Request_Accept_response_AlreadyDeclinedError,
  Api_Consultation_Request_Request_Accept_response_AlreadyAcceptedError,
  Api_Consultation_Request_Request_Reject_response_Success,
  Api_Consultation_Request_Request_Reject_response_AlreadyDeclinedError,
  Api_Consultation_Request_Request_Reject_response_AlreadyAcceptedError,
  Api_Consultation_Get_NotFoundError,
  Api_Dev_CreateUser_response_UserCreatedMessage,
  Api_Doctor_Create_request_Body,
  Api_Doctor_Create_response_Success,
  Api_Doctor_List_response_Success,
  Api_Doctor_Profile_Get_response_Success,
  Api_Doctor_Profile_Update_Body,
  Api_Doctor_Profile_Update_response_Success,
  Api_Doctor_Get_response_Success,
  Api_Doctor_Get_response_ProfileNotFoundError,
  Api_Patient_Create_request_Body,
  Api_Patient_Create_response_Success,
  Api_Patient_List_response_Success,
  Api_Patient_Profie_Get_response_Success,
  Api_Patient_Profie_Get_response_ProfileNotFoundError,
  MediaUpdate,
  Api_Patient_Profie_Update_Body,
  Api_Patient_Profie_Update_response_Success,
  Api_Patient_Get_response_Success,
  Api_Patient_Get_response_ProfileNotFoundError,
  Api_Waitlist_Body,
  Api_Waitlist_response_Success,
  Api_Waitlist_response_AlreadyJoinedError,
  Api_Wallet_Wallet,
  Api_Wallet_Get_response_Success,
  Api_Wallet_Topup_Body,
  Api_Wallet_Topup_response_Success,
  Api_Wallet_Transaction,
  Api_Wallet_Transactions_response_Success,
  Api_Consultation_Request_PaginatedConsultationRequest,
  Api_Doctor_SuccessMessage,
  Api_NoTokenProvidedError,
  Paginated
}

const endpoints = makeApi([
  {
    method: 'get',
    path: '/api/auth/profile',
    description: `Fetch details of currently signed in user`,
    requestFormat: 'json',
    response: Api_Authentication_Profile_response_Success,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: z.union([Api_UnauthorizedError, Api_UserNotVerifiedError])
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError
      }
    ]
  },
  {
    method: 'post',
    path: '/api/auth/reset-password',
    description: `Initiates the password reset process.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: Api_Authentication_PasswordReset_Initialize_Body
      }
    ],
    response: Api_Authentication_PasswordReset_Initialize_response_Success,
    errors: [
      {
        status: 400,
        description: `The server could not understand the request due to invalid syntax.`,
        schema: z.union([
          Api_Authentication_PasswordReset_Initialize_response_PasswordResetMailAlreadySentError,
          Api_BadRequestError
        ])
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError
      }
    ]
  },
  {
    method: 'post',
    path: '/api/auth/reset-password/:token',
    description: `Confirms password reset request and updates the password.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: Api_Authentication_PasswordReset_Confirm_Body
      },
      {
        name: 'token',
        type: 'Path',
        schema: z.string()
      }
    ],
    response:
      Api_Authentication_PasswordReset_Confirm_response_PasswordResetSuccessful,
    errors: [
      {
        status: 400,
        description: `The server could not understand the request due to invalid syntax.`,
        schema: z.union([
          Api_Authentication_PasswordReset_Confirm_response_InvalidOrExpiredTokenError,
          Api_BadRequestError
        ])
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError
      }
    ]
  },
  {
    method: 'post',
    path: '/api/auth/send-verification-email',
    description: `Send verification email`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: Api_Authentication_SendVerificationEmail_Body
      }
    ],
    response: Api_Authentication_SendVerificationEmail_response_Success,
    errors: [
      {
        status: 400,
        description: `The server could not understand the request due to invalid syntax.`,
        schema:
          Api_Authentication_SendVerificationEmail_response_VerificationMailAlreadySentError
      },
      {
        status: 404,
        description: `The server cannot find the requested resource.`,
        schema:
          Api_Authentication_SendVerificationEmail_response_UserNotFoundError
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError
      }
    ]
  },
  {
    method: 'post',
    path: '/api/auth/sign-in',
    description: `Sign in user`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: Api_Authentication_SignIn_Body
      }
    ],
    response: Api_Authentication_SignIn_response_AuthCredentials,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError
      }
    ]
  },
  {
    method: 'post',
    path: '/api/auth/sign-up',
    description: `Sign up new user`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: Api_Authentication_SignUp_Body
      }
    ],
    response: Api_Authentication_SignUp_response_SignupSuccessful,
    errors: [
      {
        status: 400,
        description: `The server could not understand the request due to invalid syntax.`,
        schema: Api_BadRequestError
      },
      {
        status: 409,
        description: `The request conflicts with the current state of the server.`,
        schema: Api_Authentication_SignUp_response_EmailAlreadyInUseError
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError
      }
    ]
  },
  {
    method: 'post',
    path: '/api/auth/verify-email',
    description: `Verify email address`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: Api_Authentication_VerifyEmail_Body
      }
    ],
    response: Api_Authentication_VerifyEmail_response_VerificationSuccessful,
    errors: [
      {
        status: 400,
        description: `The server could not understand the request due to invalid syntax.`,
        schema: z.union([
          Api_Authentication_VerifyEmail_response_InvalidOrExpiredOtpError,
          Api_BadRequestError
        ])
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError
      }
    ]
  },
  {
    method: 'get',
    path: '/api/consultation',
    description: `Fetch many consultations`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'page',
        type: 'Query',
        schema: z.number().int().optional()
      },
      {
        name: 'per_page',
        type: 'Query',
        schema: z.number().int().optional()
      }
    ],
    response: Api_Consultation_List_response_Success,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError
      }
    ]
  },
  {
    method: 'get',
    path: '/api/consultation/:id',
    description: `Fetch consultation by ID`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'id',
        type: 'Path',
        schema: z.string()
      }
    ],
    response: Api_Consultation_Consultation,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError
      },
      {
        status: 404,
        description: `The server cannot find the requested resource.`,
        schema: Api_Consultation_Get_NotFoundError
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError
      }
    ]
  },
  {
    method: 'post',
    path: '/api/consultation/request',
    description: `Request consultation`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: Api_Consultation_Request_ConsultationRequestPayload
      }
    ],
    response: Api_Consultation_Request_Request_Create_response_Success,
    errors: [
      {
        status: 400,
        description: `The server could not understand the request due to invalid syntax.`,
        schema: Api_BadRequestError
      },
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError
      }
    ]
  },
  {
    method: 'get',
    path: '/api/consultation/request',
    description: `Fetch many consultation requests`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'page',
        type: 'Query',
        schema: z.number().int().optional()
      },
      {
        name: 'per_page',
        type: 'Query',
        schema: z.number().int().optional()
      },
      {
        name: 'profile',
        type: 'Query',
        schema: z.string().optional()
      }
    ],
    response: Api_Consultation_Request_Request_List_response_Success,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError
      }
    ]
  },
  {
    method: 'get',
    path: '/api/consultation/request/:id',
    description: `Fetch consultation request by ID`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'id',
        type: 'Path',
        schema: z.string()
      }
    ],
    response: Api_Consultation_Request_ConsultationRequest,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError
      },
      {
        status: 404,
        description: `The server cannot find the requested resource.`,
        schema: Api_Consultation_Request_NotFoundError
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError
      }
    ]
  },
  {
    method: 'post',
    path: '/api/consultation/request/:id/accept',
    description: `Accept consultation request`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'id',
        type: 'Path',
        schema: z.string()
      }
    ],
    response: Api_Consultation_Request_Request_Accept_response_Success,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError
      },
      {
        status: 404,
        description: `The server cannot find the requested resource.`,
        schema: Api_Consultation_Request_NotFoundError
      },
      {
        status: 406,
        description: `Client error`,
        schema: z.union([
          Api_Consultation_Request_Request_Accept_response_AlreadyDeclinedError,
          Api_Consultation_Request_Request_Accept_response_AlreadyAcceptedError
        ])
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError
      }
    ]
  },
  {
    method: 'post',
    path: '/api/consultation/request/:id/reject',
    description: `Reject consultation request`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'id',
        type: 'Path',
        schema: z.string()
      }
    ],
    response: Api_Consultation_Request_Request_Reject_response_Success,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError
      },
      {
        status: 404,
        description: `The server cannot find the requested resource.`,
        schema: Api_Consultation_Request_NotFoundError
      },
      {
        status: 406,
        description: `Client error`,
        schema: z.union([
          Api_Consultation_Request_Request_Reject_response_AlreadyDeclinedError,
          Api_Consultation_Request_Request_Reject_response_AlreadyAcceptedError
        ])
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError
      }
    ]
  },
  {
    method: 'post',
    path: '/api/dev/user',
    description: `Create a user`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: Api_Authentication_SignUp_Body
      }
    ],
    response: z.object({ message: z.string() }).passthrough(),
    errors: [
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError
      }
    ]
  },
  {
    method: 'post',
    path: '/api/doctors',
    description: `Create doctor profile`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: Api_Doctor_Create_request_Body
      }
    ],
    response: Api_Doctor_Create_response_Success,
    errors: [
      {
        status: 400,
        description: `The server could not understand the request due to invalid syntax.`,
        schema: Api_BadRequestError
      },
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError
      }
    ]
  },
  {
    method: 'get',
    path: '/api/doctors',
    description: `Fetch many doctor profiles`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'page',
        type: 'Query',
        schema: z.number().int().optional()
      },
      {
        name: 'per_page',
        type: 'Query',
        schema: z.number().int().optional()
      }
    ],
    response: Api_Doctor_List_response_Success,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError
      }
    ]
  },
  {
    method: 'get',
    path: '/api/doctors/:id',
    description: `Fetch doctor profile by ID`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'id',
        type: 'Path',
        schema: z.string()
      }
    ],
    response: Api_Doctor_Get_response_Success,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError
      },
      {
        status: 404,
        description: `The server cannot find the requested resource.`,
        schema: Api_Doctor_Get_response_ProfileNotFoundError
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError
      }
    ]
  },
  {
    method: 'get',
    path: '/api/doctors/profile',
    description: `Fetch doctor profile`,
    requestFormat: 'json',
    response: Api_Doctor_Profile_Get_response_Success,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError
      }
    ]
  },
  {
    method: 'put',
    path: '/api/doctors/profile',
    description: `Update doctor profile`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: Api_Doctor_Profile_Update_Body
      }
    ],
    response: Api_Doctor_Profile_Update_response_Success,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError
      }
    ]
  },
  {
    method: 'post',
    path: '/api/patients',
    description: `Create patient profile`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: Api_Patient_Create_request_Body
      }
    ],
    response: Api_Patient_Create_response_Success,
    errors: [
      {
        status: 400,
        description: `The server could not understand the request due to invalid syntax.`,
        schema: Api_BadRequestError
      },
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError
      }
    ]
  },
  {
    method: 'get',
    path: '/api/patients/',
    description: `Fetch many patient profiles`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'page',
        type: 'Query',
        schema: z.number().int().optional()
      },
      {
        name: 'per_page',
        type: 'Query',
        schema: z.number().int().optional()
      }
    ],
    response: Api_Patient_List_response_Success,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError
      }
    ]
  },
  {
    method: 'get',
    path: '/api/patients/:id',
    description: `Fetch patient by ID`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'id',
        type: 'Path',
        schema: z.string()
      }
    ],
    response: Api_Patient_Get_response_Success,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError
      },
      {
        status: 404,
        description: `The server cannot find the requested resource.`,
        schema: Api_Patient_Get_response_ProfileNotFoundError
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError
      }
    ]
  },
  {
    method: 'get',
    path: '/api/patients/profile',
    description: `Fetch patient profile`,
    requestFormat: 'json',
    response: Api_Patient_Profie_Get_response_Success,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError
      },
      {
        status: 404,
        description: `The server cannot find the requested resource.`,
        schema: Api_Patient_Profie_Get_response_ProfileNotFoundError
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError
      }
    ]
  },
  {
    method: 'patch',
    path: '/api/patients/profile',
    description: `Update patient profile`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: Api_Patient_Profie_Update_Body
      }
    ],
    response: Api_Patient_Profie_Update_response_Success,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError
      }
    ]
  },
  {
    method: 'post',
    path: '/api/waitlist',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: Api_Waitlist_Body
      }
    ],
    response: Api_Waitlist_response_Success,
    errors: [
      {
        status: 406,
        description: `Client error`,
        schema: Api_Waitlist_response_AlreadyJoinedError
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError
      }
    ]
  },
  {
    method: 'get',
    path: '/api/wallet',
    requestFormat: 'json',
    response: Api_Wallet_Get_response_Success,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError
      }
    ]
  },
  {
    method: 'post',
    path: '/api/wallet',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({ amount: z.number() }).passthrough()
      }
    ],
    response: z.object({ url: z.string() }).passthrough(),
    errors: [
      {
        status: 400,
        description: `The server could not understand the request due to invalid syntax.`,
        schema: Api_BadRequestError
      },
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError
      }
    ]
  },
  {
    method: 'get',
    path: '/api/wallet/transactions',
    requestFormat: 'json',
    parameters: [
      {
        name: 'page',
        type: 'Query',
        schema: z.number().int().optional()
      },
      {
        name: 'per_page',
        type: 'Query',
        schema: z.number().int().optional()
      }
    ],
    response: Api_Wallet_Transactions_response_Success,
    errors: [
      {
        status: 401,
        description: `Access is unauthorized.`,
        schema: Api_UnauthorizedError
      },
      {
        status: 500,
        description: `Server error`,
        schema: Api_UnexpectedError
      }
    ]
  }
])

export const api = new Zodios(endpoints)

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options)
}
