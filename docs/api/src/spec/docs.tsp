import "@typespec/rest";

using TypeSpec.Http;

@service({
  title: "API Documentation",
})
namespace ApiDocs;

@example("f47ac10b-58cc-4372-a567-0e02b2c3d479")
scalar Id extends string;

@example("2021-09-01T12:00:00Z")
scalar Date extends string;

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
  model PermissionDeniedError {
    @statusCode code: 401;
    @example("Permission denied")
    message: string
  }


  @tag("Auth")
  @route("/auth")
  namespace Authentication {

    model SignInPayload {
      @example("mary.slessor@mail.com")
      email: string;
      @example("$3cureP@ssw0rd")
      password: string;
    }

    model SignUpPayload {
      @example("Mary")
      first_name: string;
      @example("Slessor")
      last_name: string;
      @example("mary.slessor@mail.com")
      email: string;
      @example("$3cureP@ssw0rd")
      password: string;
      role: "patient" | "doctor";
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
      @example("mary.slessor@mail.com")
      email: string;
    }

    alias PatientNotFoundError = NotFoundError<"Patient">;
    
    @route("/")
    @get
    @doc("Fetch all patients")
    op fetchPatients(): Patient[] | PermissionDeniedError | UnexpectedError;
    

    @route("/profile")
    @get
    @doc("Fetch patient profile")
    op fetchProfile(): Patient | PermissionDeniedError | UnexpectedError;
    
    @route("/{id}")
    @get
    @doc("Fetch patient by ID")
    op fetchPatientById(@path id: string): Patient | PatientNotFoundError | PermissionDeniedError | UnexpectedError;
    
    @route("/{id}")
    @patch
    @doc("Update patient by ID")
    op updatePatientById(@path id: string, @body patient: Patient): Patient | PatientNotFoundError | PermissionDeniedError | UnexpectedError;
  }

  @tag("Doctor")
  @route("/doctors")
  @useAuth(BearerAuth)
  namespace Doctor {
    model Doctor {
      id: Id;
      @example("John")
      first_name: string;
      @example("Doe")
      last_name: string;
      @example("john.doe@mail.com")
      email: string;
    }

    alias DoctorNotFoundError = NotFoundError<"Doctor">;
    
    @route("/")
    @get
    @doc("Fetch all doctors")
    op fetchDoctors(): Doctor[] | PermissionDeniedError | UnexpectedError;
    

    @route("/profile")
    @get
    @doc("Fetch doctor profile")
    op fetchProfile(): Doctor | PermissionDeniedError | UnexpectedError;
    
    @route("/{id}")
    @get
    @doc("Fetch doctor by ID")
    op fetchDoctorById(@path id: string): Doctor | DoctorNotFoundError | PermissionDeniedError | UnexpectedError;
    
    @route("/{id}")
    @patch
    @doc("Update doctor by ID")
    op updateDoctorById(@path id: string, @body doctor: Doctor): Doctor | DoctorNotFoundError | PermissionDeniedError | UnexpectedError;
  }

  @tag("Consultation")
  @route("/consultation")
  @useAuth(BearerAuth)
  namespace Consultation {

    model DoctorNote {
      id: Id;
      @example("Patient is suffering from a cold")
      content: string;
      created_at: Date;
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
      sent_by: "doctor" | "patient";
      created_at: Date;
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
    op fetchConsultationById(@path id: string): Consultation | ConsultationNotFoundError | PermissionDeniedError | UnexpectedError;

    @route("/{id}/access-token")
    @get
    @doc("Generate access token")
    op generateAccessToken(@path id: string): AccessToken | ConsultationNotFoundError | PermissionDeniedError | UnexpectedError;

    @route("/{id}/note")
    @post
    @doc("Add doctors notes")
    op addDoctorsNotes(@path id: string, @body note: string): ConsultationNoteAdded | ConsultationNotFoundError | PermissionDeniedError | UnexpectedError;

    @route("/{id}/chat")
    @post
    @doc("Add chat")
    op fetchChat(@path id: string): ConsultationChatAdded | ConsultationNotFoundError | PermissionDeniedError | UnexpectedError;

    @route("/request")
    namespace Request {
      model ConsultationRequestPayload {
        doctor_id: Id;
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
      }
      
      model ConsultationRequestAccepted {
        message: "Consultation request accepted";
      }

      @route("/")
      @post
      @doc("Request consultation")
      op requestConsultation(@body body: ConsultationRequestPayload): ConsultationRequestCreated | PermissionDeniedError | UnexpectedError;

      @route("/")
      @get
      @doc("Fetch consultation requests")
      op fetchConsultationRequests(): ConsultationRequest[] | PermissionDeniedError | UnexpectedError;

      @route("/{id}")
      @get
      @doc("Fetch consultation request by ID")
      op fetchConsultationRequestById(@path id: string): ConsultationRequest | ConsultationNotFoundError | PermissionDeniedError | UnexpectedError;

      @route("/{id}/accept")
      @post
      @doc("Accept consultation request")
      op acceptConsultationRequest(@path id: string): ConsultationRequestAccepted[] | ConsultationNotFoundError | PermissionDeniedError | UnexpectedError;
    }
  }
}