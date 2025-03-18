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

enum Role {
  patient,
  doctor,
}

@example("$3cureP@ssw0rd")
scalar Password extends string;

@example("mary.slessor@mail.com")
scalar Email extends string;

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
    @statusCode code: 500;

    @example("An unexpected error occurred")
    message: string;
  }

  @error
  model NoTokenProvidedError {
    @statusCode code: 401;

    @example("Authentication credentials were not provided or are invalid.")
    message: string;
  }

  @error
  model BadRequestError {
    @statusCode code: 400;

    @example("Required fields missing")
    message: string;
  }

  @error
  model NotFoundError<T extends valueof string> {
    @statusCode code: 404;

    @example("${T} not found")
    message: string;
  }

  @error
  model VerifyOtpError {
    @statusCode code: 404;

    @example("Invalid verification OTP or OTP has expired.")
    message: string;
  }

  @error
  model AuthenticationRequiredError {
    @statusCode code: 401;

    @example("Authentication required")
    message: string;
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
      password2: Password;
      phone_number: PhoneNumber;
      date_of_birth: DateOfBirth;

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
      @example("Please check your email address for a password reset link")
      message: string;
    }

    model ForgotPasswordPayload {
      email: Email;
    }

    model ConfirmForgotPasswordPayload {
      password: Password;
      password2: Password;
    }

    @doc("Authentication token")
    model AuthCredentials {
      @example("745731af4484f323968969eda289aeee")
      access: string;

      @example("745731af4484f323968969eda289aeee")
      refresh: string;

      user: Doctor.Doctor;
    }

    model WelcomeMessage {
      @example("Please check your email address for a verification code")
      message: string;
    }

    model VerifyEmailPayload {
      @example("123456")
      otp: string;
    }

    model VerificationSuccessful {
      @example("Email verified successfully")
      message: string;
    }

    model VerificationError {
      @statusCode code: 202;

      @example("User Registered Successfully, Verification Otp wasn't sent please resend")
      message: string;
    }

    model ResendVerificationEmailPayload {
      @example("mary.slessor@mail.com")
      email: string;
    }

    model SignOutSuccessful {
      @example("Sign out successful")
      message: string;
    }

    @route("/sign-up")
    @post
    @doc("Sign up new user")
    op signUp(@body payload: SignUpPayload):
      | WelcomeMessage
      | VerificationError
      | BadRequestError
      | UnexpectedError;

    @route("/verify-email")
    @post
    @doc("Verify email address")
    op verifyEmail(@body payload: VerifyEmailPayload):
      | VerificationSuccessful
      | VerifyOtpError
      | BadRequestError
      | UnexpectedError;

    @route("/resend-verify-email")
    @post
    @doc("Resend verification email")
    op resendVerificationEmail(
      @body payload: ResendVerificationEmailPayload,
    ): WelcomeMessage | BadRequestError | UnexpectedError;

    @route("/forget-password")
    @post
    @doc("""
        Initiates the password reset process.
        
        Receives an email address and generates a password reset token if the email exists in the database.
        Returns a UID and reset key that will be used to verify the reset request.
      """)
    op initiatePasswordReset(
      @body payload: ForgotPasswordPayload,
    ): PasswordResetInitResponse | BadRequestError;

    @route("/forget-password/{uid}/{otp}")
    @post
    @doc("""
        Confirms password reset request and updates the password.
        
        Validates the provided UID and OTP token, then updates the user's password if:
        - The reset token hasn't expired
        - The provided passwords match
        - The user exists and token is valid
      """)
    op confirmPasswordReset(
      @path uid: string,
      @path otp: string,
      @body payload: ConfirmForgotPasswordPayload,
    ): WelcomeMessage | BadRequestError | UnexpectedError;

    @route("/sign-in")
    @post
    @doc("Sign in user")
    op signIn(
      @body payload: SignInPayload,
    ): AuthCredentials | BadRequestError | UnexpectedError;

    @route("/reset-password/send-email")
    @post
    @doc("Send reset password email")
    op sendResetPasswordEmail(
      @body payload: SendResetPasswordEmailPayload,
    ): WelcomeMessage | BadRequestError | UnexpectedError;

    @route("/reset-password")
    @put
    @doc("Reset password")
    op resetPassword(
      @body payload: ResetPasswordPayload,
    ): WelcomeMessage | BadRequestError | UnexpectedError;

    @route("/sign-out")
    @doc("Sign out user")
    op signOut(): SignOutSuccessful | UnexpectedError;
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

    model Patient {
      id: Id;

      @example("Mary")
      first_name: string;

      @example("Slessor")
      last_name: string;

      other_names: string | null;
      phone_number: PhoneNumber;
      date_of_birth: DateOfBirth;
      email: Email;
      profile_picture_url: string;
    }

    model PaginatedPatients {
      results: {
        @example("Successful")
        message: string;

        data: Patient[];
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
    op fetchProfile(): Patient | AuthenticationRequiredError | UnexpectedError;

    @route("/{id}")
    @get
    @doc("Fetch patient by ID")
    op fetchPatientById(@path id: string):
      | Patient
      | PatientNotFoundError
      | AuthenticationRequiredError
      | UnexpectedError;

    @route("/profile/")
    @patch
    @doc("Update patient profile")
    op updatePatientById(@body patient: Patient):
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
      end_date?: string;
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
      coordinates?: string;

      @example("Owerri")
      city: string;

      @example("Imo")
      state: string;
    }

    model SuccessMessage {
      @example("Successful")
      message: string;
    }

    model Doctor {
      id: Id;

      @example("https://example.com/image.jpg")
      profile_picture_url: string;

      @example("John")
      first_name: string;

      @example("Doe")
      last_name: string;

      email: Email;
      phone_number: PhoneNumber;
      date_of_birth: DateOfBirth;
      specialization: Specialization | null;
      patients_treated: int64;
      years_of_experience: int64;
      reviews: int64;
      rating: float64;
      description: string | null;
      other_names: string | null;
      is_doctor: boolean;

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
    }

    model DoctorNotFoundError extends NotFoundError<"Doctor"> {}
    model PaginatedDoctors {
      results: {
        @example("Successful")
        message: string;

        data: Doctor[];
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
    op fetchProfile(): Doctor | AuthenticationRequiredError | UnexpectedError;

    @route("profile/{id}")
    @get
    @doc("Fetch doctor by ID")
    op fetchDoctorById(@path id: string):
      | Doctor
      | DoctorNotFoundError
      | AuthenticationRequiredError
      | UnexpectedError;

    @route("/profile")
    @patch
    @useAuth(BearerAuth)
    @doc("Update doctor profile")
    op updateDoctorById(@body doctor: Doctor):
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
      status: "pending" | "accepted" | "rejected";
      doctor_notes: DoctorNote[] | null;
      chats: Chat[] | null;
      video_room_id: string | null;
      start_time: DateTime;
      end_time: DateTime;
      created_at: DateTime;
      updated_at: DateTime;
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

