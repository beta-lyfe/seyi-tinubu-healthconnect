import "@typespec/rest";

using TypeSpec.Http;

@service({
  title: "API Documentation",
})
namespace ApiDocs;

@example("f47ac10b-58cc-4372-a567-0e02b2c3d479")
scalar Id extends string;

@example("2000-01-01")
scalar DateOfBirth extends string;

@example("+2348123456789")
scalar PhoneNumber extends string;

@example("2021-09-01T12:00:00Z")
scalar DateTime extends string;

@example("745731af4484f323968969eda289aeee")
scalar Token extends string;

@example("123456")
scalar Otp extends string;

enum Role {
  patient,
  doctor,
}

@example("$3cureP@ssw0rd")
scalar Password extends string;

@example("mary.slessor@mail.com")
scalar Email extends string;

model Media {
  public_ic: Id;

  @example("https://google.com")
  url: string;
}

model Paginated {
  @example(100)
  count: int64;

  @example("http://localhost:8000/api/consultation/request/?page=2")
  next: string | null;

  @example("http://localhost:8000/api/consultation/request/?page=1")
  previous: string | null;
}

@route("/api")
@doc("API")
namespace Api {
  @error
  model UnexpectedError {
    @statusCode _code: 500;
    code: "UNEXPECTED_ERROR";
  }

  @error
  model NoTokenProvidedError {
    @statusCode _code: 401;
    code: "UNAUTHORIZED_ERROR";
  }

  @error
  model BadRequestError {
    @statusCode _code: 400;
    code: "EXPECTED_DATA_NOT_RECEIVED_ERROR";
  }

  @error
  model UnauthorizedError {
    @statusCode _code: 401;
    code: "UNAUTHORIZED_ERROR";
  }

  @error
  model NotFoundError<T extends valueof string> {
    @statusCode _code: 404;

    @example("${T} not found")
    message: string;
  }

  @error
  model AuthenticationRequiredError {
    @statusCode _code: 401;
    code: "AUTHENTICATION_REQUIRED_ERROR";
  }

  @tag("Auth")
  @route("/auth")
  namespace Authentication {
    model SignInPayload {
      email: Email;
      password: Password;
    }

    model SignUpPayload {
      @example("Mary")
      first_name: string;

      @example("Slessor")
      last_name: string;

      email: Email;
      password: Password;
      phone_number: PhoneNumber;

      @example(true)
      is_doctor: boolean;
    }

    model SendResetPasswordEmailPayload {
      email: Email;
    }

    model ResetPasswordPayload {
      email: Email;
      password: Password;
    }

    model PasswordResetInitResponse {
      code: "CHECK_EMAIL_FOR_RESET_LINK";
    }

    @error
    model PasswordResetMailAlreadySentError {
      @statusCode _code: 400;
      code: "PASSWORD_RESET_MAIL_ALREADY_SENT_ERROR";
      data: {
        expires_at: DateTime;
      };
    }

    model PasswordResetPayload {
      email: Email;
    }

    model ConfirmPasswordResetPayload {
      password: Password;
    }

    model PasswordResetSuccessful {
      code: "PASSWORD_RESET_SUCCESSFUL";
    }

    @error
    model InvalidOrExpiredTokenError {
      @statusCode _code: 400;
      code: "INVALID_OR_EXPIRED_TOKEN_ERROR";
    }

    @doc("Authentication token")
    model AuthCredentials {
      code: "AUTH_CREDENTIALS";
      data: {
        access_token: Token;
        refresh_token: Token;
      };
    }

    model SignupSuccessful {
      code: "SIGNUP_SUCCESSFUL";
    }

    model EmailAlreadyInUseError {
      @statusCode _code: 409;
      code: "EMAIL_ALREADY_IN_USE_ERROR";
    }

    model VerifyEmailPayload {
      email: Email;
      otp: Otp;
    }

    model VerificationSuccessful {
      code: "VERIFICATION_SUCCESSFUL";
    }

    model SendVerificationEmailPayload {
      email: Email;
    }

    model VerificationMailSentSuccessfully {
      code: "VERIFICATION_MAIL_SENT";
    }

    model VerificationMailAlreadySentError {
      @statusCode _code: 400;
      code: "VERIFICATION_MAIL_ALREADY_SENT_ERROR";
      data: {
        expires_at: DateTime;
      };
    }

    @error
    model InvalidOrExpiredOtpError {
      @statusCode _code: 400;
      code: "INVALID_OR_EXPIRED_OTP_ERROR";
    }

    @route("/sign-up")
    @post
    @doc("Sign up new user")
    op signUp(@body payload: SignUpPayload):
      | SignupSuccessful
      | EmailAlreadyInUseError
      | BadRequestError
      | UnexpectedError;

    @route("/verify-email")
    @post
    @doc("Verify email address")
    op verifyEmail(@body payload: VerifyEmailPayload):
      | VerificationSuccessful
      | InvalidOrExpiredOtpError
      | BadRequestError
      | UnexpectedError;

    @route("/send-verification-email")
    @post
    @doc("Send verification email")
    op sendVerificationEmail(
      @body payload: SendVerificationEmailPayload,
    ): VerificationMailSentSuccessfully | VerificationMailAlreadySentError | UnexpectedError;

    @route("/reset-password")
    @post
    @doc("Initiates the password reset process.")
    op initiatePasswordReset(@body payload: PasswordResetPayload):
      | PasswordResetInitResponse
      | PasswordResetMailAlreadySentError
      | BadRequestError
      | UnexpectedError;

    @route("/reset-password/{token}")
    @post
    @doc("Confirms password reset request and updates the password.")
    op confirmPasswordReset(
      @path token: string,
      @body payload: ConfirmPasswordResetPayload,
    ):
      | PasswordResetSuccessful
      | InvalidOrExpiredTokenError
      | BadRequestError
      | UnexpectedError;

    @route("/sign-in")
    @post
    @doc("Sign in user")
    op signIn(
      @body payload: SignInPayload,
    ): AuthCredentials | UnauthorizedError | UnexpectedError;
  }

  model EmailPayload {
    email: Email;
  }

  @tag("Patient")
  @route("/patients")
  @useAuth(BearerAuth)
  namespace Patient {
    model PatientProfileUpdatedResponse {
      @example("Successful")
      message: string;
    }

    model PatientProfile {
      id: Id;

      @example("Mary")
      first_name: string;

      @example("Slessor")
      last_name: string;

      other_names: string | null;
      email: Email;
      phone_number: PhoneNumber;
      date_of_birth: DateOfBirth;
      profile_picture: Media;
      created_at: DateTime;
      updated_at: DateTime | null;
    }

    model PaginatedPatients {
      results: {
        @example("Successful")
        message: string;

        data: PatientProfile[];
      };

      @example(18)
      count: int64;

      @example("http://localhost:8000/api/patients?page=3")
      next: string | null;

      @example("http://localhost:8000/api/patients?page=2")
      previous: string | null;
    }

    alias PatientNotFoundError = NotFoundError<"Patient">;

    @route("/")
    @get
    @doc("Fetch all patients")
    op fetchPatients(
    ): PaginatedPatients | AuthenticationRequiredError | UnexpectedError;

    @route("/profile/")
    @get
    @useAuth(BearerAuth)
    @doc("Fetch patient profile")
    op fetchProfile(
    ): PatientProfile | AuthenticationRequiredError | UnexpectedError;

    @route("/{id}")
    @get
    @doc("Fetch patient by ID")
    op fetchPatientById(@path id: string):
      | PatientProfile
      | PatientNotFoundError
      | AuthenticationRequiredError
      | UnexpectedError;

    @route("/profile/")
    @patch
    @doc("Update patient profile")
    op updatePatientById(@body patient: PatientProfile):
      | PatientProfileUpdatedResponse
      | PatientNotFoundError
      | AuthenticationRequiredError
      | UnexpectedError;
  }

  @tag("Doctor")
  @route("/doctors")
  @useAuth(BearerAuth)
  namespace Doctor {
    model DoctorProfileUpdatedResponse {
      @example("Successful")
      message: string;
    }

    @example("General Practitioner")
    scalar Specialization extends string;

    model Certification {
      @example("MBBS")
      name: string;

      @example("University of Lagos")
      institution: string;

      @example("January 2000")
      date: string;
    }

    model Experience {
      @example("General Practitioner")
      title: string;

      @example("University of Lagos")
      institution: string;

      @example("January 2020")
      start_date: string;

      @example("January 2021")
      end_date: string | null;
    }

    model WorkingHour {
      day:
        | "monday"
        | "tuesday"
        | "wednesday"
        | "thursday"
        | "friday"
        | "saturday"
        | "sunday";

      @example("08:00")
      start_time: string;

      @example("17:00")
      end_time: string;
    }

    model Location {
      @example("Federal Univeristy Teaching Hospital, Owerri")
      landmark: string;

      @example("105 Hospital Road")
      street: string;

      @example("5.4836, 7.0336")
      coordinates: string | null;

      @example("Owerri")
      city: string;

      @example("Imo")
      state: string;
    }

    model SuccessMessage {
      @example("Successful")
      message: string;
    }

    model DoctorProfile {
      id: Id;

      @example("John")
      first_name: string;

      @example("Doe")
      last_name: string;

      other_names: string | null;
      email: Email;
      phone_number: PhoneNumber;
      date_of_birth: DateOfBirth;
      profile_picture: Media;
      specialization: Specialization | null;
      patients_treated: int64;
      years_of_experience: int64;
      number_of_reviews: int64;
      rating: float64;
      description: string | null;

      @example(500.00)
      home_consultation_charge: float64;

      @example(100.00)
      video_consultation_charge: float64;

      @example(300.00)
      clinic_consultation_charge: float64;

      certifications: Certification[] | null;
      experiences: Experience[] | null;
      working_hours: WorkingHour[] | null;
      location: Location | null;
      created_at: DateTime;
      updated_at: DateTime | null;
    }

    model DoctorNotFoundError extends NotFoundError<"Doctor"> {}
    model PaginatedDoctors {
      results: {
        @example("Successful")
        message: string;

        data: DoctorProfile[];
      };

      @example(18)
      count: int64;

      @example("http://localhost:8000/api/doctors/?page=3")
      next: string | null;

      @example("http://localhost:8000/api/doctors/?page=2")
      previous: string | null;
    }

    @route("/")
    @get
    @doc("Fetch all doctors")
    op fetchDoctors(
      @query page?: string,
    ): PaginatedDoctors | AuthenticationRequiredError | UnexpectedError;

    @route("/profile")
    @get
    @useAuth(BearerAuth)
    @doc("Fetch doctor profile")
    op fetchProfile(
    ): DoctorProfile | AuthenticationRequiredError | UnexpectedError;

    @route("profile/{id}")
    @get
    @doc("Fetch doctor by ID")
    op fetchDoctorById(@path id: string):
      | DoctorProfile
      | DoctorNotFoundError
      | AuthenticationRequiredError
      | UnexpectedError;

    @route("/profile")
    @patch
    @useAuth(BearerAuth)
    @doc("Update doctor profile")
    op updateDoctorById(@body doctor: DoctorProfile):
      | DoctorProfileUpdatedResponse
      | DoctorNotFoundError
      | AuthenticationRequiredError
      | UnexpectedError;
  }

  @tag("Consultation")
  @route("/consultation")
  @useAuth(BearerAuth)
  namespace Consultation {
    model DoctorNote {
      id: Id;

      @example("Patient is suffering from a cold")
      content: string;

      created_at: DateTime;
    }

    model Media {
      type: "image" | "video";

      @example("https://example.com/image.jpg")
      url: string;
    }

    model Chat {
      id: Id;

      @example("Hello, how are you feeling today?")
      content: string;

      media: Media[];
      sent_by: Role;
      created_at: DateTime;
    }

    alias ConsultationNotFoundError = NotFoundError<"Consultation">;

    model ConsultationNoteAdded {
      @example("Doctors notes added")
      message: string;
    }

    model ConsultationChatAdded {
      @example("Chat added")
      message: string;
    }

    model AccessToken {
      @example("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1hcnkgU2xlc3NvciIsImlhdCI6MTUxNjIzOTAyMn0.UFI1B6pCOrqlpaFHV58dqqTLYCCC8hukJAVY8Wb1Z9o")
      token: string;
    }

    model Consultation {
      id: Id;
      doctor: Id;
      patient: Id;

      // status: "pending" | "accepted" | "rejected";
      doctor_notes: DoctorNote[] | null;

      chats: Chat[] | null;
      room_name: string | null;
      doctor_token: string | null;
      patient_token: string | null;
      start_time: DateTime;
      end_time: DateTime;
      created_at: DateTime;
      updated_at: DateTime | null;
    }

    @error
    model ConsultationAlreadyAccepted {
      @statusCode code: 406;

      @example("Already accepted this request.")
      message: string;
    }

    @error
    model ConsultationDeclined {
      @statusCode code: 406;

      @example("Already declined this request.")
      message: string;
    }
    @error
    model UnauthorisedRequest {
      @statusCode code: 403;

      @example("User Does Not have Permission to Access this Information")
      message: string;
    }

    model PaginatedConsultations {
      results: Consultation;

      @example(18)
      count: int64;

      @example("http://localhost:8000/api/doctors/?page=3")
      next: string | null;

      @example("http://localhost:8000/api/doctors/?page=2")
      previous: string | null;
    }

    @route("/")
    @get
    @doc("Fetch all consultations")
    op fetchConsultations(
    ): PaginatedConsultations | AuthenticationRequiredError | UnexpectedError;

    @route("/{id}")
    @get
    @doc("Fetch consultation by ID")
    op fetchConsultationById(@path id: string):
      | Consultation
      | ConsultationNotFoundError
      | AuthenticationRequiredError
      | UnexpectedError;

    @route("/{id}/access-token")
    @get
    @doc("Generate access token")
    op generateAccessToken(@path id: string):
      | AccessToken
      | UnauthorisedRequest
      | ConsultationNotFoundError
      | AuthenticationRequiredError
      | UnexpectedError;

    @route("/{id}/note")
    @post
    @doc("Add doctors notes")
    op addDoctorsNotes(@path id: string, @body note: string):
      | ConsultationNoteAdded
      | ConsultationNotFoundError
      | AuthenticationRequiredError
      | UnexpectedError;

    @route("/{id}/chat")
    @post
    @doc("Add chat")
    op fetchChat(@path id: string):
      | ConsultationChatAdded
      | ConsultationNotFoundError
      | AuthenticationRequiredError
      | UnexpectedError;

    @route("/request")
    namespace Request {
      model ConsultationRequestPayload {
        doctor: Id;
        start_time: DateTime;
        end_time: DateTime;

        @example("I am feeling unwell")
        message: string;
      }

      model ConsultationRequestCreated {
        @example("Consultation request created")
        message: string;
      }

      model ConsultationRequest {
        id: Id;
        doctor: Id;
        patient: Id;
        status: "pending" | "accepted" | "rejected";

        @example("I am feeling unwell")
        message: string;

        start_time: DateTime;
        end_time: DateTime;
        created_at: DateTime;
        updated_at: DateTime;
      }

      model PaginatedConsultationRequest {
        results: ConsultationRequest;

        @example(18)
        count: int64;

        @example("http://localhost:8000/api/doctors/?page=3")
        next: string | null;

        @example("http://localhost:8000/api/doctors/?page=2")
        previous: string | null;
      }

      @error
      model ConsultationRequestPendingError {
        @statusCode code: 406;

        @example("Already a Pending request")
        message: string;
      }
      @error
      model UnauthorisedRequestID {
        @statusCode code: 403;

        @example("User Does Not have Permission to Access this Information")
        message: string;
      }

      model ConsultationRequestAccepted {
        message: "Consultation request accepted";
      }

      @route("/")
      @post
      @doc("Request consultation")
      op requestConsultation(@body body: ConsultationRequestPayload):
        | ConsultationRequestCreated
        | BadRequestError
        | AuthenticationRequiredError
        | UnexpectedError;

      @route("/")
      @get
      @doc("Fetch consultation requests")
      op fetchConsultationRequests(
      ): PaginatedConsultationRequest | AuthenticationRequiredError | UnexpectedError;

      @route("/{id}")
      @get
      @doc("Fetch consultation request by ID")
      op fetchConsultationRequestById(@path id: string):
        | ConsultationRequest
        | NotFoundError<"Consultation Request">
        | UnauthorisedRequestID
        | AuthenticationRequiredError
        | UnexpectedError;

      @route("/{id}/accept")
      @post
      @doc("Accept consultation request")
      op acceptConsultationRequest(@path id: string):
        | ConsultationRequestAccepted[]
        | NotFoundError<"Consultation Request">
        | ConsultationNotFoundError
        | ConsultationDeclined
        | ConsultationAlreadyAccepted
        | AuthenticationRequiredError
        | UnexpectedError;
    }
  }

  @tag("Wallet")
  @route("/wallet")
  @useAuth(BearerAuth)
  namespace Wallet {
    model Wallet {
      id: Id;

      @example(5000.00)
      balance: float64;
    }

    model PaginatedWalletTransaction {
      id: Id;
      type: "credit" | "debit";

      @example(500.00)
      amount: float64;

      @example("Booked consultation")
      description: string;

      @example("Booked a consultation with Dr. Mark")
      note: string;

      created_at: DateTime;

      @example(18)
      count: int64;

      @example("http://localhost:8000/api/doctors/?page=3")
      next: string | null;

      @example("http://localhost:8000/api/doctors/?page=2")
      previous: string | null;
    }

    model WalletTopupPayload {
      amount: float64;
    }

    model WalletTopupResponse {
      @example("https://checkout.paystack.com/5mz7yvom8rzo498")
      url: string;
    }

    op fetchWallet(): Wallet | AuthenticationRequiredError | UnexpectedError;
    op topUpWallet(@body req: WalletTopupPayload):
      | WalletTopupResponse
      | BadRequestError
      | AuthenticationRequiredError
      | UnexpectedError;

    @route("/transactions")
    op fetchWalletTransactions(
    ): PaginatedWalletTransaction | AuthenticationRequiredError | UnexpectedError;
  }

  @tag("Waitlist")
  @route("/waitlist")
  namespace Waitlist {
    @error
    model WaitlistAlreadyJoinedError {
      @statusCode code: 406;

      @example("You're already in the waitlist")
      message: string;
    }

    model JoinWaitlistPayload {
      email: Email;
    }

    model WaitlistJoined {
      @example("You have been added to the waitlist")
      message: string;
    }

    op joinWaitlist(
      @body req: JoinWaitlistPayload,
    ): WaitlistJoined | WaitlistAlreadyJoinedError | UnexpectedError;
  }

  @tag("Dev")
  @route("/dev")
  namespace Dev {
    model UserCreatedMessage {
      @example("User created successfully")
      message: string;
    }

    @route("/user")
    @post
    @doc("Create a user")
    op createUser(
      @body payload: Authentication.SignUpPayload,
    ): UserCreatedMessage | UnexpectedError;
  }
}
