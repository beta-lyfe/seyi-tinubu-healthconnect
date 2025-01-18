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
  doctor
}

@example("$3cureP@ssw0rd")
scalar Password extends string;

@example("mary.slessor@mail.com")
scalar Email extends string;

model PaginatedMeta {
  @example(100)
  total: int64;
  @example(1)
  page: int64;
  @example(10)
  per_page: int64;
}

model Paginated<T> {
  data: T[];
  meta: PaginatedMeta;
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
  model BadRequestError {
    @statusCode code: 400;
    @example("Invalid data")
    message: string;
  }
  
  @error
  model NotFoundError<T extends valueof string> {
    @statusCode code: 404;
    @example("${T} not found")
    message: string
  }

  @error
  model AuthenticationRequiredError {
    @statusCode code: 401;
    @example("Authentication required")
    message: string
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
      phone_number: PhoneNumber;
      date_of_birth: DateOfBirth;
      password: Password;
      role: Role;
    } 
    
    model SendResetPasswordEmailPayload {
      @example("mary.slessor@mail.com")
      email: string
    }

    model ResetPasswordPayload {
      @example("mary.slessor@mail.com")
      email: string;
      @example("NewP@ssw0rd")
      password: string
    }
    
    @doc("Authentication token")
    model AuthCredentials {
      @example("745731af4484f323968969eda289aeee")
      token: string;
    }

    model WelcomeMessage {
      @example("Please check your email address for a verification code")
      message: string;
    }
    
    model VerifyEmailPayload {
      @example("mary.slessor@mail.com")
      email: string;
      @example("123456")
      otp: string;
    }

    model VerificationSuccessful {
      @example("Email verified successfully")
      message: string;
    }
    
    model ResendVerificationEmailPayload {
      @example("mary.slessor@mail.com")
      email: string
    }
    
    model SignOutSuccessful {
      @example("Sign out successful")
      message: string;
    }
    
    @route("/sign-up")
    @post
    @doc("Sign up new user")
    op signUp(@body payload: SignUpPayload): WelcomeMessage | BadRequestError | UnexpectedError;
    
    @route("/verify-email")
    @post
    @doc("Verify email address")
    op verifyEmail(@body payload: VerifyEmailPayload): VerificationSuccessful | BadRequestError | UnexpectedError;
    
    @route("/resend-verification-email")
    @post
    @doc("Resend verification email")
    op resendVerificationEmail(@body payload: ResendVerificationEmailPayload): WelcomeMessage | BadRequestError | UnexpectedError;

    @route("/sign-in")
    @post
    @doc("Sign in user")
    op signIn(@body payload: SignInPayload): AuthCredentials | BadRequestError | UnexpectedError;

    @route("/reset-password/send-email")
    @post
    @doc("Send reset password email")
    op sendResetPasswordEmail(@body payload: SendResetPasswordEmailPayload): WelcomeMessage | BadRequestError | UnexpectedError;

    @route("/reset-password")
    @put
    @doc("Reset password")
    op resetPassword(@body payload: ResetPasswordPayload): WelcomeMessage | BadRequestError | UnexpectedError;

    @route("/sign-out")
    @doc("Sign out user")
    op signOut(): SignOutSuccessful | UnexpectedError;
  }

  @tag("Profile")
  @route("/profile")
  @useAuth(BearerAuth)
  namespace Profile {
    @route("/")
    @get
    op fetchProfile(): Patient.Patient | Doctor.Doctor | AuthenticationRequiredError | UnexpectedError;
  }

  
  @tag("Patient")
  @route("/patients")
  @useAuth(BearerAuth)
  namespace Patient {
    model Patient {
      id: Id;
      @example("Mary")
      first_name: string;
      @example("Slessor")
      last_name: string;
      phone_number: PhoneNumber;
      date_of_birth: DateOfBirth;
      email: Email;
    }

    alias PatientNotFoundError = NotFoundError<"Patient">;
    
    @route("/")
    @get
    @doc("Fetch all patients")
    op fetchPatients(): Patient[] | AuthenticationRequiredError | UnexpectedError;
    

    @route("/profile")
    @get
    @doc("Fetch patient profile")
    op fetchProfile(): Patient | AuthenticationRequiredError | UnexpectedError;
    
    @route("/{id}")
    @get
    @doc("Fetch patient by ID")
    op fetchPatientById(@path id: string): Patient | PatientNotFoundError | AuthenticationRequiredError | UnexpectedError;
    
    @route("/{id}")
    @patch
    @doc("Update patient by ID")
    op updatePatientById(@path id: string, @body patient: Patient): Patient | PatientNotFoundError | AuthenticationRequiredError | UnexpectedError;
  }

  @tag("Doctor")
  @route("/doctors")
  @useAuth(BearerAuth)
  namespace Doctor {
    @example("General Practitioner")
    scalar Specialization extends string;

    model Certification {
      id: Id;
      @example("MBBS")
      name: string;
      @example("University of Lagos")
      institution: string;
      @example("January 2000")
      date: string;
    }

    model Experience {
      id: Id;
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
      day: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
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
      Specialization: Specialization;
      patients_treated: int64;
      years_of_experience: int64;
      reviews: int64;
      rating: float64;
      description: string;
      @example(500.00)
      home_consultation_charge: float64;
      @example(100.00)
      video_consultation_charge: float64;
      @example(300.00)
      clinic_consultation_charge: float64;
      certifications: Certification[];
      experiences: Experience[];
      working_hours: WorkingHour[];
      location: Location;
      role: Role;
    }

    alias DoctorNotFoundError = NotFoundError<"Doctor">;
    
    @route("/")
    @get
    @doc("Fetch all doctors")
    op fetchDoctors(): Paginated<Doctor> | AuthenticationRequiredError | UnexpectedError;
    

    @route("/profile")
    @get
    @doc("Fetch doctor profile")
    op fetchProfile(): Doctor | AuthenticationRequiredError | UnexpectedError;
    
    @route("/{id}")
    @get
    @doc("Fetch doctor by ID")
    op fetchDoctorById(@path id: string): Doctor | DoctorNotFoundError | AuthenticationRequiredError | UnexpectedError;
    
    @route("/{id}")
    @patch
    @doc("Update doctor by ID")
    op updateDoctorById(@path id: string, @body doctor: Doctor): Doctor | DoctorNotFoundError | AuthenticationRequiredError | UnexpectedError;
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

    model Consultation {
      doctors_notes: DoctorNote[];
      chats: Chat[];
      room_id: Id;
      doctor_id: Id;
      patient_id: Id;
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
    
    @route("/{id}")
    @get
    @doc("Fetch consultation by ID")
    op fetchConsultationById(@path id: string): Consultation | ConsultationNotFoundError | AuthenticationRequiredError | UnexpectedError;

    @route("/{id}/access-token")
    @get
    @doc("Generate access token")
    op generateAccessToken(@path id: string): AccessToken | ConsultationNotFoundError | AuthenticationRequiredError | UnexpectedError;

    @route("/{id}/note")
    @post
    @doc("Add doctors notes")
    op addDoctorsNotes(@path id: string, @body note: string): ConsultationNoteAdded | ConsultationNotFoundError | AuthenticationRequiredError | UnexpectedError;

    @route("/{id}/chat")
    @post
    @doc("Add chat")
    op fetchChat(@path id: string): ConsultationChatAdded | ConsultationNotFoundError | AuthenticationRequiredError | UnexpectedError;

    @route("/request")
    namespace Request {
      model ConsultationRequestPayload {
        doctor_id: Id;
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
        doctor_id: Id;
        patient_id: Id;
        status: "pending" | "accepted" | "rejected";
        @example("I am feeling unwell")
        message: string;
        start_time: DateTime;
        end_time: DateTime;
        created_at: DateTime;
      }
      
      model ConsultationRequestAccepted {
        message: "Consultation request accepted";
      }

      @route("/")
      @post
      @doc("Request consultation")
      op requestConsultation(@body body: ConsultationRequestPayload): ConsultationRequestCreated | AuthenticationRequiredError | UnexpectedError;

      @route("/")
      @get
      @doc("Fetch consultation requests")
      op fetchConsultationRequests(): Paginated<ConsultationRequest> | AuthenticationRequiredError | UnexpectedError;

      @route("/{id}")
      @get
      @doc("Fetch consultation request by ID")
      op fetchConsultationRequestById(@path id: string): ConsultationRequest | ConsultationNotFoundError | AuthenticationRequiredError | UnexpectedError;

      @route("/{id}/accept")
      @post
      @doc("Accept consultation request")
      op acceptConsultationRequest(@path id: string): ConsultationRequestAccepted[] | ConsultationNotFoundError | AuthenticationRequiredError | UnexpectedError;
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

    model WalletTransaction {
      id: Id;
      type: "credit" | "debit";
      @example(500.00)
      amount: float64;
      @example("Booked consultation")
      description: string;
      @example("Booked a consultation with Dr. Mark")
      note: string;
      created_at: DateTime;
    }


    model WalletTopupPayload {
      amount: float64;
    }

    model WalletTopupResponse {
      @example("https://checkout.paystack.com/5mz7yvom8rzo498")
      url: string;
    }

    op fetchWallet(): Wallet | AuthenticationRequiredError | UnexpectedError;
    op topUpWallet(@body req: WalletTopupPayload): WalletTopupResponse | BadRequestError | AuthenticationRequiredError | UnexpectedError;

    @route("/transactions")
    op fetchWalletTransactions(): Paginated<WalletTransaction> | AuthenticationRequiredError | UnexpectedError;
  }
}
