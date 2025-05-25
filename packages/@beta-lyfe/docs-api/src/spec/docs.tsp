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

@example("08:00")
scalar Time extends string;

@example("745731af4484f323968969eda289aeee")
scalar Token extends string;

@example("123456")
scalar Otp extends string;

model ImageFile extends File {
  contentType: "image/jpeg" | "image/png" | "image/webp";
}

model Address {
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

enum Role {
  patient,
  doctor,
}

@example("$3cureP@ssw0rd")
scalar Password extends string;

@example("mary.slessor@mail.com")
scalar Email extends string;

model Media {
  @example("h93suhw7mzyujf9tbugy")
  public_id: string;

  @example("https://res.cloudinary.com/dyirc2dvg/image/upload/v1747581547/foodhut/h93suhw7mzyujf9tbugy.jpg")
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
  namespace Pagination {
    model Meta {
      page: int64;
      per_page: int64;
      total: int64;
    }

    model Paginated<T> {
      data: T[];
      meta: Meta;
    }
  }

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
  model UserNotVerifiedError {
    @statusCode _code: 401;
    code: "USER_NOT_VERIFIED";
  }

  @error
  model UnauthorizedError {
    @statusCode _code: 401;
    code: "UNAUTHORIZED_ERROR";
  }

  @tag("Auth")
  @route("/auth")
  namespace Authentication {
    model User {
      id: Id;

      @example("Mary")
      first_name: string;

      @example("Slessor")
      last_name: string;

      email: Email;
      role: Role;
      phone_number: PhoneNumber;
      is_verified: boolean;
      created_at: DateTime;
      updated_at: DateTime | null;
    }

    @route("/sign-in")
    namespace SignIn {
      model Body {
        email: Email;
        password: Password;
      }

      namespace Response {
        model AuthCredentials {
          code: "AUTH_CREDENTIALS";
          data: {
            access_token: Token;
            refresh_token: Token;
          };
        }

        alias Success = AuthCredentials;
        alias Error = Api.UnauthorizedError | Api.UnexpectedError;

        alias Response = Success | Error;
      }

      @post
      @doc("Sign in user")
      op signIn(@body body: Body): Response.Response;
    }

    @route("/sign-up")
    namespace SignUp {
      model Body {
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

      namespace Response {
        model SignupSuccessful {
          code: "SIGNUP_SUCCESSFUL";
        }

        @error
        model EmailAlreadyInUseError {
          @statusCode _code: 409;
          code: "EMAIL_ALREADY_IN_USE_ERROR";
        }

        alias Success = SignupSuccessful;

        alias Error = EmailAlreadyInUseError | Api.BadRequestError | Api.UnexpectedError;

        alias Response = Success | Error;
      }

      @post
      @doc("Sign up new user")
      op signUp(@body body: Body): Response.Response;
    }

    @route("/reset-password")
    namespace PasswordReset {
      namespace Initialize {
        model Body {
          email: Email;
        }

        namespace Response {
          model Success {
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

          alias Error = PasswordResetMailAlreadySentError | Api.BadRequestError | Api.UnexpectedError;

          alias Response = Success | Error;
        }

        @post
        @doc("Initiates the password reset process.")
        op initializePasswordReset(@body body: Body): Response.Response;
      }

      @route("/{token}")
      namespace Confirm {
        model Body {
          password: Password;
        }

        namespace Response {
          model PasswordResetSuccessful {
            code: "PASSWORD_RESET_SUCCESSFUL";
          }

          @error
          model InvalidOrExpiredTokenError {
            @statusCode _code: 400;
            code: "INVALID_OR_EXPIRED_TOKEN_ERROR";
          }

          alias Success = PasswordResetSuccessful;
          alias Error = InvalidOrExpiredTokenError | Api.BadRequestError | Api.UnexpectedError;

          alias Response = Success | Error;
        }

        @post
        @doc("Confirms password reset request and updates the password.")
        op confirmPasswordReset(
          @path token: string,
          @body body: Body,
        ): Response.Response;
      }
    }

    @route("/send-verification-email")
    namespace SendVerificationEmail {
      model Body {
        email: Email;
      }

      namespace Response {
        model Success {
          code: "VERIFICATION_MAIL_SENT";
          data: {
            expires_at: DateTime;
          };
        }

        @error
        model VerificationMailAlreadySentError {
          @statusCode _code: 400;
          code: "VERIFICATION_MAIL_ALREADY_SENT_ERROR";
          data: {
            expires_at: DateTime;
          };
        }

        @error
        model UserNotFoundError {
          @statusCode _code: 404;
          code: "USER_NOT_FOUND_ERROR";
        }

        alias Error = VerificationMailAlreadySentError | UserNotFoundError | Api.UnexpectedError;

        alias Response = Success | Error;
      }

      @post
      @doc("Send verification email")
      op sendVerificationEmail(@body body: Body): Response.Response;
    }

    @route("/verify-email")
    namespace VerifyEmail {
      model Body {
        email: Email;
        otp: Otp;
      }

      namespace Response {
        model VerificationSuccessful {
          code: "VERIFICATION_SUCCESSFUL";
        }

        @error
        model InvalidOrExpiredOtpError {
          @statusCode _code: 400;
          code: "INVALID_OR_EXPIRED_OTP_ERROR";
        }

        alias Success = VerificationSuccessful;
        alias Error = InvalidOrExpiredOtpError | Api.BadRequestError | Api.UnexpectedError;
        alias Response = Success | Error;
      }

      @post
      @doc("Verify email address")
      op verifyEmail(@body body: Body): Response.Response;
    }

    @route("/profile")
    namespace Profile {
      namespace Response {
        model Success {
          code: "FETCHED_PROFILE";
          data: User;
        }

        alias Error = Api.UnauthorizedError | Api.UnexpectedError | Api.UserNotVerifiedError;

        alias Response = Success | Error;
      }

      @useAuth(BearerAuth)
      @doc("Fetch details of currently signed in user")
      op fetchUserDetails(): Response.Response;
    }
  }

  @tag("Patient")
  @route("/patients")
  @useAuth(BearerAuth)
  namespace Patient {
    model PatientProfile {
      id: Id;

      @example("Mary")
      first_name: string;

      @example("Slessor")
      last_name: string;

      other_names: string | null;
      email: Email;
      phone_number: PhoneNumber;
      date_of_birth: DateOfBirth | null;
      profile_picture: Media | null;
      created_at: DateTime;
      updated_at: DateTime | null;
    }

    namespace Create {
      namespace Request {
        model Body {
          date_of_birth: DateOfBirth;
        }
      }

      namespace Response {
        model Success {
          @statusCode _code: 201;
          code: "PATIENT_PROFILE_CREATED";
        }

        alias Error = Api.BadRequestError | Api.UnauthorizedError | Api.UnexpectedError;
        alias Response = Success | Error;
      }

      @post
      @doc("Create patient profile")
      op createPatientProfile(@body body: Request.Body): Response.Response;
    }

    @route("/")
    namespace List {
      namespace Response {
        model Success {
          code: "FETCH_PATIENT_PROFILES_SUCCESSFUL";
          data: Pagination.Paginated<PatientProfile>;
        }

        alias Error = Api.UnauthorizedError | Api.UnexpectedError;
        alias Response = Success | Error;
      }

      @get
      @doc("Fetch many patient profiles")
      op fetchManyPatientProfiles(
        @query page?: int64,
        @query per_page?: int64,
      ): Response.Response;
    }

    @route("/{id}")
    namespace Get {
      namespace Response {
        model Success {
          code: "FETCH_PATIENT_PROFILE_SUCCESSFUL";
          data: PatientProfile;
        }

        @error
        model ProfileNotFoundError {
          @statusCode _code: 404;
          code: "PATIENT_PROFILE_NOT_FOUND_ERROR";
        }

        alias Error = ProfileNotFoundError | UnauthorizedError | UnexpectedError;
        alias Response = Success | Error;
      }

      @get
      @doc("Fetch patient by ID")
      op fetchPatientProfileById(@path id: string): Response.Response;
    }

    @route("/profile")
    namespace Profie {
      namespace Get {
        namespace Response {
          model Success {
            code: "FETCH_PATIENT_PROFILE_SUCCESSFUL";
            data: PatientProfile;
          }

          @error
          model ProfileNotFoundError {
            @statusCode _code: 404;
            code: "PATIENT_PROFILE_NOT_FOUND_ERROR";
          }

          alias Error = Api.UnauthorizedError | Api.UnexpectedError | ProfileNotFoundError;
          alias Response = Success | Error;
        }

        @get
        @doc("Fetch patient profile")
        op fetchPatientProfile(): Response.Response;
      }

      namespace Update {
        model Body {
          ...OptionalProperties<PatientProfile>;
        }

        namespace Response {
          model Success {
            code: "PATIENT_PROFILE_UPDATED";
          }

          alias Error = Api.UnauthorizedError | Api.UnexpectedError;
          alias Response = Success | Error;
        }

        @patch
        @doc("Update patient profile")
        op updatePatientProfile(@body body: Body): Response.Response;
      }
    }
  }

  @tag("Doctor")
  @route("/doctors")
  @useAuth(BearerAuth)
  namespace Doctor {
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

      @example(43)
      patients_treated: int64;

      @example(5)
      years_of_experience: int64;

      number_of_reviews: int64;
      rating: string;
      description: string;

      @example("500.00")
      home_consultation_charge: string;

      @example("100.00")
      video_consultation_charge: string;

      @example("300.00")
      clinic_consultation_charge: string;

      certifications: Certification[] | null;
      experiences: Experience[] | null;
      working_hours: WorkingHour[] | null;
      location: Address | null;
      created_at: DateTime;
      updated_at: DateTime | null;
    }

    namespace Create {
      namespace Request {
        model Body {
          other_names: string | null;
          date_of_birth: DateOfBirth;
          profile_picture: Media;
          specialization: Specialization | null;

          @example(43)
          patients_treated: int64;

          @example(5)
          years_of_experience: int64;

          number_of_reviews: int64;
          rating: string;
          description: string;

          @example("500.00")
          home_consultation_charge: string;

          @example("100.00")
          video_consultation_charge: string;

          @example("300.00")
          clinic_consultation_charge: string;

          certifications: Certification[] | null;
          experiences: Experience[] | null;
          working_hours: WorkingHour[] | null;
          location: Address | null;
        }
      }

      namespace Response {
        model Success {
          @statusCode _code: 201;
          code: "DOCTOR_PROFILE_CREATED";
        }

        alias Error = Api.BadRequestError | Api.UnauthorizedError | Api.UnexpectedError;
        alias Response = Success | Error;
      }

      @post
      @doc("Create doctor profile")
      op createDoctorProfile(@body body: Request.Body): Response.Response;
    }

    namespace List {
      namespace Response {
        model Success {
          code: "FETCH_DOCTOR_PROFILES_SUCCESSFUL";
          data: Pagination.Paginated<DoctorProfile>;
        }

        alias Error = Api.UnauthorizedError | Api.UnexpectedError;
        alias Response = Success | Error;
      }

      @get
      @doc("Fetch many doctor profiles")
      op fetchManyDoctorProfiles(
        @query page?: int64,
        @query per_page?: int64,
      ): Response.Response;
    }

    @route("/profile")
    namespace Profile {
      namespace Get {
        namespace Response {
          model Success {
            code: "FETCH_DOCTOR_PROFILE_SUCCESSFUL";
            data: DoctorProfile;
          }

          alias Error = Api.UnauthorizedError | Api.UnexpectedError;
          alias Response = Success | Error;
        }

        @get
        @useAuth(BearerAuth)
        @doc("Fetch doctor profile")
        op fetchDoctorProfile(): Response.Response;
      }

      namespace Update {
        model Body {
          ...OptionalProperties<DoctorProfile>;
        }

        namespace Response {
          model Success {
            code: "DOCTOR_PROFILE_UPDATED";
          }

          alias Error = Api.UnauthorizedError | Api.UnexpectedError;
          alias Response = Success | Error;
        }

        @useAuth(BearerAuth)
        @put
        @doc("Update doctor profile")
        op updateDoctorProfile(@body body: Body): Response.Response;
      }
    }

    namespace Get {
      namespace Response {
        model Success {
          code: "FETCH_DOCTOR_PROFILE_SUCCESSFUL";
          data: DoctorProfile;
        }

        @error
        model ProfileNotFoundError {
          @statusCode _code: 404;
          code: "DOCTOR_PROFILE_NOT_FOUND_ERROR";
        }

        alias Error = ProfileNotFoundError | Api.UnauthorizedError | Api.UnexpectedError;
        alias Response = Success | Error;
      }

      @route("/{id}")
      @get
      @doc("Fetch doctor profile by ID")
      op fetchDoctorProfileById(@path id: string): Response.Response;
    }
  }

  @tag("Consultation")
  @route("/consultation")
  @useAuth(BearerAuth)
  namespace Consultation {
    // model DoctorNote {
    //   id: Id;

    //   @example("Patient is suffering from a cold")
    //   content: string;

    //   created_at: DateTime;
    // }

    model AccessToken {
      @example("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1hcnkgU2xlc3NvciIsImlhdCI6MTUxNjIzOTAyMn0.UFI1B6pCOrqlpaFHV58dqqTLYCCC8hukJAVY8Wb1Z9o")
      token: string;
    }

    model Consultation {
      id: Id;
      doctor: Id;
      patient: Id;

      // status: "pending" | "accepted" | "rejected";
      // doctor_notes: DoctorNote[] | null;

      // chats: Chat[] | null;
      room_name: string | null;

      doctor_token: AccessToken;
      patient_token: AccessToken;
      start_time: DateTime;
      end_time: DateTime;
      created_at: DateTime;
      updated_at: DateTime | null;
    }

    namespace List {
      namespace Response {
        model Success {
          code: "FETCH_CONSULTATIONS_SUCCESSFUL";
          data: Pagination.Paginated<Consultation>;
        }

        alias Error = Api.UnauthorizedError | Api.UnexpectedError;
        alias Response = Success | Error;
      }

      @get
      @doc("Fetch many consultations")
      op fetchManyConsultations(
        @query page?: int64,
        @query per_page?: int64,
      ): Response.Response;
    }

    @route("/{id}")
    namespace Get {
      @error
      model NotFoundError {
        @statusCode _code: 404;
        code: "CONSULTATION_NOT_FOUND";
      }

      namespace Response {
        alias Success = Consultation;
        alias Error = NotFoundError | Api.UnauthorizedError | Api.UnexpectedError;
        alias Response = Success | Error;
      }

      @get
      @doc("Fetch consultation by ID")
      op fetchConsultationById(@path id: string): Response.Response;
    }

    @route("/request")
    namespace Request {
      model ConsultationRequestPayload {
        doctor: Id;
        start_time: DateTime;
        end_time: DateTime;

        @example("I am feeling unwell")
        message: string;
      }

      model ConsultationRequest {
        id: Id;
        doctor: Id;
        patient: Id;
        status: "pending" | "accepted" | "rejected";

        @example("I am feeling unwell")
        message: string;

        doctor_profile?: Api.Doctor.DoctorProfile;
        patient_profile?: Api.Patient.PatientProfile;
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
      model NotFoundError {
        @statusCode _code: 404;
        code: "CONSULTATION_REQUEST_NOT_FOUND";
      }

      namespace Request {
        namespace Create {
          namespace Response {
            model Success {
              @statusCode _code: 201;
              code: "CONSULTATION_REQUEST_CREATED_SUCCESSFULLY";
            }

            alias Error = Api.BadRequestError | Api.UnauthorizedError | Api.UnexpectedError;
            alias Response = Success | Error;
          }

          @post
          @doc("Request consultation")
          op requestConsultation(
            @body body: ConsultationRequestPayload,
          ): Response.Response;
        }

        namespace List {
          namespace Response {
            model Success {
              code: "FETCH_CONSULTATION_REQUESTS_SUCCESSFUL";
              data: Pagination.Paginated<ConsultationRequest>;
            }

            alias Error = Api.UnauthorizedError | Api.UnexpectedError;
            alias Response = Success | Error;
          }

          @get
          @doc("Fetch many consultation requests")
          op fetchManyConsultationRequests(
            @query page?: int64,
            @query per_page?: int64,
            @query profile?: string,
          ): Response.Response;
        }

        @route("/{id}")
        namespace Get {
          namespace Response {
            alias Success = ConsultationRequest;
            alias Error = Api.Consultation.Request.NotFoundError | Api.UnauthorizedError | Api.UnexpectedError;
            alias Response = Success | Error;
          }

          @get
          @doc("Fetch consultation request by ID")
          op fetchConsultationRequestById(@path id: string): Response.Response;
        }

        @route("/{id}/reject")
        namespace Reject {
          namespace Response {
            model AlreadyAcceptedError {
              @statusCode _code: 406;
              code: "CONSULTATION_REQUEST_ALREADY_ACCEPTED_ERROR";
            }

            @error
            model AlreadyDeclinedError {
              @statusCode _code: 406;
              code: "CONSULTATION_REQUEST_ALREADY_DECLINED_ERROR";
            }

            model Success {
              code: "CONSULTATION_REQUEST_REJECTED_SUCCESSFULLY";
            }

            alias Error =
              | Api.Consultation.Request.NotFoundError
              | AlreadyDeclinedError
              | AlreadyAcceptedError
              | Api.UnauthorizedError
              | Api.UnexpectedError;

            alias Response = Success | Error;
          }

          @post
          @doc("Reject consultation request")
          op rejectConsultationRequest(@path id: string): Response.Response;
        }

        @route("/{id}/accept")
        namespace Accept {
          namespace Response {
            model AlreadyAcceptedError {
              @statusCode _code: 406;
              code: "CONSULTATION_REQUEST_ALREADY_ACCEPTED_ERROR";
            }

            @error
            model AlreadyDeclinedError {
              @statusCode _code: 406;
              code: "CONSULTATION_REQUEST_ALREADY_DECLINED_ERROR";
            }

            model Success {
              code: "CONSULTATION_REQUEST_ACCEPTED_SUCCESSFULLY";
            }

            alias Error =
              | Api.Consultation.Request.NotFoundError
              | AlreadyDeclinedError
              | AlreadyAcceptedError
              | Api.UnauthorizedError
              | Api.UnexpectedError;

            alias Response = Success | Error;
          }

          @post
          @doc("Accept consultation request")
          op acceptConsultationRequest(@path id: string): Response.Response;
        }
      }
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

    model Transaction {
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

    namespace Get {
      namespace Response {
        model Success {
          code: "FETCH_WALLET_SUCCESSFUL";
          data: Wallet;
        }
        alias Error = Api.UnauthorizedError | Api.UnexpectedError;
        alias Response = Success | Error;
      }

      op fetchWallet(): Response.Response;
    }

    namespace Topup {
      model Body {
        amount: float64;
      }

      namespace Response {
        model Success {
          @example("https://checkout.paystack.com/5mz7yvom8rzo498")
          url: string;
        }
        alias Error = BadRequestError | UnauthorizedError | UnexpectedError;
        alias Response = Success | Error;
      }

      op topup(@body body: Body): Response.Response;
    }

    @route("/transactions")
    namespace Transactions {
      namespace Response {
        model Success {
          code: "FETCH_TRANSACTIONS_SUCCESSFUL";
          data: Pagination.Paginated<Api.Wallet.Transaction>;
        }

        alias Error = Api.UnauthorizedError | Api.UnexpectedError;
        alias Response = Success | Error;
      }

      namespace List {
        op fetchWalletTransactions(
          @query page?: int64,
          @query per_page?: int64,
        ): Response.Response;
      }
    }
  }

  @tag("Waitlist")
  @route("/waitlist")
  namespace Waitlist {
    model Body {
      email: Email;
    }

    namespace Response {
      @error
      model AlreadyJoinedError {
        @statusCode _code: 406;
        code: "WAITLIST_ALREADY_JOINED_ERROR";
      }

      model Success {
        code: "WAITLIST_JOINED_SUCCESSFULLY";
      }

      alias Error = AlreadyJoinedError | Api.UnexpectedError;

      alias Response = Success | Error;
    }

    op join(@body body: Body): Response.Response;
  }

  @tag("Pharmacy")
  @route("/pharmacy")
  namespace Pharmacy {
    model PharmacyStore {
      @example("HealthPlus Pharma")
      name: string;

      description: string;
      phone_number: PhoneNumber;
      email: Email;
      address: Address;

      @doc("Time formatted in 24-hour format")
      @example("08:00")
      opening_time: Time;

      @doc("Time formatted in 24-hour format")
      @example("20:00")
      closing_time: Time;

      cover_image: Media;
    }

    @route("/")
    namespace Create {
      namespace Request {
        model Body {
          ...PharmacyStore;
        }
      }

      namespace Response {
        model Success {
          @statusCode _code: 201;
          code: "PHARMACY_CREATED";
        }

        alias Error = UnexpectedError;

        alias Response = Success | Error;
      }

      @post
      @doc("Create a pharmacy")
      op createPharmacy(@body body: Request.Body): Response.Response;
    }

    @route("/{id}")
    namespace ById {
      namespace Get {
        namespace Request {
          model Path {
            @path
            id: string;
          }
        }

        namespace Response {
          model Success {
            code: "PHARMACY_RETRIEVED";
            data: PharmacyStore;
          }

          alias Error = UnexpectedError;

          alias Response = Success | Error;
        }

        @get
        @doc("Fetch a pharmacy by ID")
        op getPharmacyById(@path id: Request.Path): Response.Response;
      }

      namespace Update {
        namespace Request {
          model Path {
            @path
            id: string;
          }

          model Body {
            ...OptionalProperties<PharmacyStore>;
          }
        }

        namespace Response {
          model Success {
            code: "PHARMACY_UPDATED";
            data: PharmacyStore;
          }

          alias Error = UnexpectedError;

          alias Response = Success | Error;
        }

        @patch
        @doc("Update a pharmacy by ID")
        op updatePharmacyById(
          @path id: Request.Path,
          @body body: Request.Body,
        ): Response.Response;
      }

      namespace Delete {
        namespace Request {
          model Path {
            @path
            id: string;
          }
        }

        namespace Response {
          model Success {
            code: "PHARMACY_DELETED";
            data: PharmacyStore;
          }

          alias Error = UnexpectedError;

          alias Response = Success | Error;
        }

        @delete
        @doc("Delete a pharmacy by ID")
        op deletePharmacyById(@path id: Request.Path): Response.Response;
      }
    }
  }

  @tag("Dev")
  @route("/dev")
  namespace Dev {
    @route("/user")
    namespace CreateUser {
      namespace Response {
        model UserCreatedMessage {
          @example("User created successfully")
          message: string;
        }

        alias Success = UserCreatedMessage;
        alias Error = UnexpectedError;

        alias Response = Success | Error;
      }

      @post
      @doc("Create a user")
      op create(@body body: Api.Authentication.SignUp.Body): Response.Response;
    }
  }
}

